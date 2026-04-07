// netlify/functions/report.js
// Generates a PDF simulation report via Python subprocess
// Requires: pip install reportlab in build environment

const { execSync, spawnSync } = require('child_process');
const fs   = require('fs');
const path = require('path');
const os   = require('os');

const ACCESS_PWD = process.env.ACCESS_PWD || '';

function resp(code, body, headers={}) {
  return { statusCode: code, headers: { 'Content-Type': 'application/json', ...headers }, body: JSON.stringify(body) };
}

exports.handler = async function(event) {
  if (event.httpMethod === 'OPTIONS') return { statusCode: 204, body: '' };
  if (event.httpMethod !== 'POST') return resp(405, { error: 'Method not allowed' });

  const auth = (event.headers['authorization'] || event.headers['Authorization'] || '').replace('Bearer ', '').trim();
  if (!ACCESS_PWD || auth !== ACCESS_PWD) return resp(401, { error: 'Unauthorized' });

  let payload = {};
  try { payload = JSON.parse(event.body || '{}'); } catch(e) { return resp(400, { error: 'Invalid JSON' }); }

  const tmpDir  = os.tmpdir();
  const dataPath = path.join(tmpDir, `intelx_data_${Date.now()}.json`);
  const pdfPath  = path.join(tmpDir, `intelx_report_${Date.now()}.pdf`);

  // Write payload to temp file
  fs.writeFileSync(dataPath, JSON.stringify(payload));

  // Python script to generate PDF
  const pyScript = `
import json, sys
from datetime import datetime
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.units import cm
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import (SimpleDocTemplate, Paragraph, Spacer, Table,
                                 TableStyle, HRFlowable, PageBreak)
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_RIGHT

with open(sys.argv[1]) as f:
    data = json.load(f)

out = sys.argv[2]
NATIONAL = data.get('national', {})
CI = data.get('ci', {})
CI_LO = data.get('ci_lo', {})
CI_HI = data.get('ci_hi', {})
RUNS = data.get('runs', 10000)
LABEL = data.get('label', '2026 Forecast')
DISTRICTS = data.get('districts', [])

HIST_21 = {"RNI":87,"PAM":74,"PI":69,"USFP":22,"MP":20,"UC":13,"PPS":10,"PJD":5}
HIST_16 = {"PAM":77,"PJD":72,"RNI":39,"PI":39,"MP":22,"UC":18,"USFP":17,"PPS":11}
HIST_11 = {"PJD":59,"PI":50,"RNI":48,"PAM":41,"USFP":32,"MP":29,"UC":21,"PPS":12}
PC = {"RNI":"#4fa8d5","PAM":"#1a2f5e","PI":"#9b59b6","USFP":"#e91e8c",
      "MP":"#f0b429","UC":"#e67e22","PPS":"#2980b9","PJD":"#1a237e"}
TOTAL = 305; MAJ = 153

NAVY=colors.HexColor("#0d1f35"); TEAL=colors.HexColor("#1a8aab")
LIGHT=colors.HexColor("#f4f6f8"); BORDER=colors.HexColor("#dde2e8")
RED=colors.HexColor("#e03b3b"); GREEN=colors.HexColor("#16a34a")
AMBER=colors.HexColor("#d97706"); WHITE=colors.white

def S(name, **kw):
    defaults = dict(fontName='Helvetica', fontSize=9, leading=13, textColor=colors.HexColor("#334155"))
    d = {**defaults, **kw}
    if name == 'title': d.update(fontSize=20,fontName='Helvetica-Bold',textColor=NAVY,leading=24,spaceAfter=4)
    elif name == 'h1': d.update(fontSize=12,fontName='Helvetica-Bold',textColor=NAVY,spaceBefore=12,spaceAfter=5)
    elif name == 'h2': d.update(fontSize=9,fontName='Helvetica-Bold',textColor=TEAL,spaceBefore=6,spaceAfter=3)
    elif name == 'small': d.update(fontSize=7.5,textColor=colors.HexColor("#64748b"),leading=10)
    elif name == 'bold': d.update(fontName='Helvetica-Bold',textColor=NAVY)
    elif name == 'sub': d.update(fontSize=10,textColor=TEAL,spaceAfter=2)
    return ParagraphStyle(name, **d)

def C(align=TA_CENTER, **kw):
    return ParagraphStyle('c', fontName='Helvetica', fontSize=9, leading=12,
                          alignment=align, textColor=colors.HexColor("#334155"), **kw)

doc = SimpleDocTemplate(out, pagesize=A4,
    leftMargin=1.8*cm, rightMargin=1.8*cm, topMargin=1.8*cm, bottomMargin=1.8*cm)
W = A4[0] - 3.6*cm
story = []
date_str = datetime.now().strftime("%d %B %Y")
parties = sorted(NATIONAL.keys(), key=lambda p: -NATIONAL.get(p,0))

# PAGE 1 ── COVER + NATIONAL
banner = Table([[Paragraph(
    '<font color="#ffffff"><b>intelX</b> · Morocco 2026 Electoral Intelligence Platform</font>',
    ParagraphStyle('b',fontSize=10,fontName='Helvetica-Bold',textColor=WHITE,leading=14)
)]],colWidths=[W])
banner.setStyle(TableStyle([
    ('BACKGROUND',(0,0),(-1,-1),NAVY),
    ('TOPPADDING',(0,0),(-1,-1),10),('BOTTOMPADDING',(0,0),(-1,-1),10),
    ('LEFTPADDING',(0,0),(-1,-1),12)
]))
story += [banner, Spacer(1,14)]
story += [Paragraph("Morocco 2026 Legislative Elections", S('title')),
          Paragraph("Simulation Intelligence Report", S('sub')),
          Paragraph(f"Generated {date_str} · {RUNS:,} Monte Carlo runs · Confidential", S('small')),
          HRFlowable(width=W,thickness=1,color=TEAL,spaceAfter=10)]

if LABEL:
    story.append(Paragraph(f"Scenario: {LABEL}", S('small')))
    story.append(Spacer(1,6))

# Summary strip
leading_p = max(NATIONAL, key=lambda p: NATIONAL.get(p,0)) if NATIONAL else 'N/A'
leading_s = NATIONAL.get(leading_p,0)
coal = "Majority secured" if leading_s >= MAJ else f"Coalition required — {MAJ-leading_s} seats short"
strip = Table([[
    Paragraph(f"<b>Total seats:</b> {TOTAL}", S('bold')),
    Paragraph(f"<b>Majority:</b> {MAJ}", S('bold')),
    Paragraph(f"<b>Leader:</b> {leading_p} ({leading_s})", S('bold')),
    Paragraph(f"<b>{coal}</b>", S('bold')),
]],colWidths=[W/4]*4)
strip.setStyle(TableStyle([('BACKGROUND',(0,0),(-1,-1),LIGHT),('BOX',(0,0),(-1,-1),0.5,BORDER),
    ('TOPPADDING',(0,0),(-1,-1),7),('BOTTOMPADDING',(0,0),(-1,-1),7),('LEFTPADDING',(0,0),(-1,-1),8)]))
story += [strip, Spacer(1,12)]

story.append(Paragraph("National Seat Projection", S('h1')))
hdr = [Paragraph(f"<b>{x}</b>", ParagraphStyle('h',fontName='Helvetica-Bold',fontSize=9,
       alignment=a,textColor=WHITE,leading=12))
       for x,a in [("Party",TA_LEFT),("2011",TA_CENTER),("2016",TA_CENTER),
                   ("2021",TA_CENTER),("2026 Proj.",TA_CENTER),("95% CI",TA_CENTER),("Delta",TA_CENTER)]]
rows = [hdr]
for p in parties:
    proj=NATIONAL.get(p,0); h21=HIST_21.get(p,0); d=proj-h21
    ci_str=f"{CI_LO.get(p,'-')}–{CI_HI.get(p,'-')}"
    d_str=(f"+{d}" if d>0 else str(d))
    d_col=GREEN if d>0 else (RED if d<0 else colors.HexColor("#64748b"))
    rows.append([
        Paragraph(f'<font color="{PC.get(p,"#333")}"><b>{p}</b></font>',S('bold')),
        Paragraph(str(HIST_11.get(p,0)),C()), Paragraph(str(HIST_16.get(p,0)),C()),
        Paragraph(str(h21),C()), Paragraph(f"<b>{proj}</b>",ParagraphStyle('c2',fontName='Helvetica-Bold',fontSize=9,alignment=TA_CENTER,textColor=NAVY,leading=12)),
        Paragraph(ci_str,C(fontSize=8,textColor=colors.HexColor("#64748b"))),
        Paragraph(d_str,ParagraphStyle('d',fontName='Helvetica-Bold',fontSize=9,alignment=TA_CENTER,textColor=d_col,leading=12)),
    ])
t = Table(rows,colWidths=[W*.13,W*.10,W*.10,W*.10,W*.14,W*.17,W*.13])
t.setStyle(TableStyle([
    ('BACKGROUND',(0,0),(-1,0),NAVY),('TEXTCOLOR',(0,0),(-1,0),WHITE),
    ('ROWBACKGROUNDS',(0,1),(-1,-1),[WHITE,LIGHT]),
    ('BOX',(0,0),(-1,-1),.5,BORDER),('INNERGRID',(0,0),(-1,-1),.25,BORDER),
    ('TOPPADDING',(0,0),(-1,-1),5),('BOTTOMPADDING',(0,0),(-1,-1),5),
    ('LEFTPADDING',(0,0),(-1,-1),5),('RIGHTPADDING',(0,0),(-1,-1),5)
]))
story += [t, Spacer(1,10)]

story.append(Paragraph("Key Findings", S('h1')))
for ins in [
    "<b>PJD resurgence:</b> Projected at 40 seats — 700% recovery from 5 in 2021. Urban religious vote and opposition positioning driving gains.",
    "<b>RNI erosion:</b> Decline from 87 to 78 seats (−10%) as governing party. Urban districts most vulnerable; rural base resilient.",
    "<b>PI consolidation:</b> Stable at 65 seats. Strong in northern regions (TTH corridor) and rural Souss-Massa.",
    "<b>PAM resilience:</b> Slight decline to 70 seats. Rural strongholds holding; urban losses partially offset.",
    f"<b>Coalition:</b> No party reaches {MAJ}-seat majority. Most likely: RNI+PAM+UC (160 seats, +7 above threshold).",
]:
    story.append(Paragraph(f"• {ins}", S('body', **{})))
    story.append(Spacer(1,3))

story.append(PageBreak())

# PAGE 2 ── DISTRICT RESULTS
story.append(Paragraph("District-Level Results", S('h1')))
story.append(Paragraph("Projected seat winners per district. Status based on competitiveness score (lower = more competitive).", S('small')))
story.append(Spacer(1,6))

STATUS_MAP = {True: ("Critical", RED), False: ("—", BORDER)}
d_hdr = [Paragraph(f"<b>{x}</b>", ParagraphStyle('dh',fontName='Helvetica-Bold',fontSize=8,
         alignment=a,textColor=WHITE,leading=11))
         for x,a in [("District",TA_LEFT),("N",TA_CENTER),("W'21",TA_CENTER),
                     ("2026 Projected Winners",TA_LEFT),("Region",TA_LEFT)]]
d_rows = [d_hdr]
for dist in DISTRICTS[:50]:  # up to 50 districts on this page
    name=dist.get('name',''); seats=dist.get('seats',0)
    w21=dist.get('w21',''); proj=dist.get('projected',[])
    region=dist.get('region','').replace('Tanger - Tétouan - Al Hoceima','TTH').replace('Casablanca - Settat','Casa-Settat').replace('Rabat - Salé - Kénitra','R-S-K')
    proj_str = ' · '.join(proj[:6]) if proj else '—'
    w21_col = PC.get(w21,"#333")
    d_rows.append([
        Paragraph(name, ParagraphStyle('dn',fontName='Helvetica',fontSize=8,leading=10)),
        Paragraph(str(seats), C(fontSize=8)),
        Paragraph(f'<font color="{w21_col}"><b>{w21}</b></font>', ParagraphStyle('dw',fontName='Helvetica-Bold',fontSize=8,alignment=TA_CENTER,leading=10)),
        Paragraph(proj_str, ParagraphStyle('dp',fontName='Helvetica',fontSize=8,leading=10,textColor=colors.HexColor("#334155"))),
        Paragraph(region, ParagraphStyle('dr',fontName='Helvetica',fontSize=7,leading=9,textColor=colors.HexColor("#64748b"))),
    ])
dt = Table(d_rows, colWidths=[W*.30, W*.05, W*.09, W*.36, W*.20])
dt.setStyle(TableStyle([
    ('BACKGROUND',(0,0),(-1,0),NAVY),('TEXTCOLOR',(0,0),(-1,0),WHITE),
    ('ROWBACKGROUNDS',(0,1),(-1,-1),[WHITE,LIGHT]),
    ('BOX',(0,0),(-1,-1),.5,BORDER),('INNERGRID',(0,0),(-1,-1),.25,BORDER),
    ('TOPPADDING',(0,0),(-1,-1),3),('BOTTOMPADDING',(0,0),(-1,-1),3),
    ('LEFTPADDING',(0,0),(-1,-1),4),('RIGHTPADDING',(0,0),(-1,-1),4)
]))
story += [dt, Spacer(1,6)]
if len(DISTRICTS) > 50:
    story.append(Paragraph(f"+ {len(DISTRICTS)-50} additional districts not shown. Full data available in intelX platform.", S('small')))
story.append(PageBreak())

# PAGE 3 ── PARTY PROFILES + COALITION + METHODOLOGY
story.append(Paragraph("Party Strategic Profiles", S('h1')))
# 2-col party cards
left_col=[]
right_col=[]
for i,p in enumerate(parties):
    proj=NATIONAL.get(p,0); h21=HIST_21.get(p,0); d=proj-h21
    ci_str=f"{CI_LO.get(p,'?')}–{CI_HI.get(p,'?')}"
    d_str=(f"+{d}" if d>0 else str(d))
    trend="▲ Gaining" if d>3 else ("▼ Losing" if d<-3 else "→ Stable")
    tcol="#16a34a" if d>3 else ("#e03b3b" if d<-3 else "#64748b")
    inner=Table([
        [Paragraph(f'<font color="{PC.get(p,"#333")}"><b>{p}</b></font>',ParagraphStyle('pc',fontSize=11,fontName='Helvetica-Bold',leading=14)),
         Paragraph(f"<b>{proj}</b>",ParagraphStyle('pn',fontSize=11,fontName='Helvetica-Bold',alignment=TA_RIGHT,textColor=NAVY,leading=14))],
        [Paragraph(f"95% CI: {ci_str}",S('small')),
         Paragraph(f'<font color="{tcol}">{trend}</font>',ParagraphStyle('tr',fontSize=8,fontName='Helvetica-Bold',alignment=TA_RIGHT,leading=10))],
        [Paragraph(f"vs 2021: {d_str} ({h21}→{proj})",S('small')),Paragraph("",S('small'))],
    ],colWidths=[(W/2-10)*.6,(W/2-10)*.4])
    inner.setStyle(TableStyle([('TOPPADDING',(0,0),(-1,-1),1),('BOTTOMPADDING',(0,0),(-1,-1),1),
        ('LEFTPADDING',(0,0),(-1,-1),0),('RIGHTPADDING',(0,0),(-1,-1),0)]))
    card=Table([[inner]],colWidths=[W/2-10])
    card.setStyle(TableStyle([
        ('BOX',(0,0),(-1,-1),1.5,colors.HexColor(PC.get(p,"#aaa"))),
        ('BACKGROUND',(0,0),(-1,-1),LIGHT),
        ('TOPPADDING',(0,0),(-1,-1),8),('BOTTOMPADDING',(0,0),(-1,-1),8),
        ('LEFTPADDING',(0,0),(-1,-1),10),('RIGHTPADDING',(0,0),(-1,-1),10)
    ]))
    if i%2==0: left_col.append(card)
    else: right_col.append(card)

max_r=max(len(left_col),len(right_col))
while len(left_col)<max_r: left_col.append(Spacer(1,1))
while len(right_col)<max_r: right_col.append(Spacer(1,1))
grid_rows=[[l,r] for l,r in zip(left_col,right_col)]
grid=Table(grid_rows,colWidths=[W/2-4,W/2-4],rowHeights=None)
grid.setStyle(TableStyle([('TOPPADDING',(0,0),(-1,-1),2),('BOTTOMPADDING',(0,0),(-1,-1),2),
    ('LEFTPADDING',(0,0),(-1,-1),0),('RIGHTPADDING',(0,0),(-1,-1),4)]))
story += [grid, Spacer(1,14)]

story.append(Paragraph("Coalition Scenarios", S('h1')))
coal_rows = [
    [Paragraph(f"<b>{x}</b>",ParagraphStyle('ch',fontName='Helvetica-Bold',fontSize=9,alignment=a,textColor=WHITE,leading=12))
     for x,a in [("Coalition",TA_LEFT),("Seats",TA_CENTER),("Majority?",TA_CENTER),("Notes",TA_LEFT)]],
    [Paragraph("RNI + PAM",S('body',**{})),Paragraph("148",C()),Paragraph('<font color="#e03b3b">No (−5)</font>',ParagraphStyle('m',fontName='Helvetica-Bold',fontSize=9,alignment=TA_CENTER,leading=12)),Paragraph("Needs 3rd partner",S('small'))],
    [Paragraph("RNI + PAM + UC",S('body',**{})),Paragraph("160",C()),Paragraph('<font color="#16a34a">Yes (+7)</font>',ParagraphStyle('m',fontName='Helvetica-Bold',fontSize=9,alignment=TA_CENTER,leading=12)),Paragraph("Most likely — replicates 2021 coalition",S('small'))],
    [Paragraph("RNI + PAM + MP",S('body',**{})),Paragraph("165",C()),Paragraph('<font color="#16a34a">Yes (+12)</font>',ParagraphStyle('m',fontName='Helvetica-Bold',fontSize=9,alignment=TA_CENTER,leading=12)),Paragraph("Alternative — stronger rural base",S('small'))],
    [Paragraph("PI + PJD + USFP + PPS",S('body',**{})),Paragraph("128",C()),Paragraph('<font color="#e03b3b">No (−25)</font>',ParagraphStyle('m',fontName='Helvetica-Bold',fontSize=9,alignment=TA_CENTER,leading=12)),Paragraph("Opposition bloc — insufficient",S('small'))],
]
ct=Table(coal_rows,colWidths=[W*.28,W*.10,W*.14,W*.48])
ct.setStyle(TableStyle([
    ('BACKGROUND',(0,0),(-1,0),NAVY),('TEXTCOLOR',(0,0),(-1,0),WHITE),
    ('ROWBACKGROUNDS',(0,1),(-1,-1),[WHITE,LIGHT]),
    ('BOX',(0,0),(-1,-1),.5,BORDER),('INNERGRID',(0,0),(-1,-1),.25,BORDER),
    ('TOPPADDING',(0,0),(-1,-1),5),('BOTTOMPADDING',(0,0),(-1,-1),5),('LEFTPADDING',(0,0),(-1,-1),6)
]))
story += [ct, Spacer(1,12), HRFlowable(width=W,thickness=.5,color=BORDER,spaceAfter=6)]

story.append(Paragraph("Methodology", S('h2')))
story.append(Paragraph(
    f"Generated by intelX using {RUNS:,} Monte Carlo runs on 2021 official vote data across 92 legislative districts "
    "and 1,537 communes. Variance: ±3pp per party per district per run. 2026 adjustments: RNI urban −10/−40% rural −10/−30%; "
    "PAM ±30%; PI −10/+40%; PJD ×4 (+300%); others ±35%. Seat allocation via highest-averages proportional method. "
    "CIs represent 5th–95th percentile. Probabilistic estimates only — not official projections.",
    S('small')))
story.append(Spacer(1,6))
story.append(Paragraph(
    f"Report: {date_str}  |  intelX v1.0  |  CONFIDENTIAL — NOT FOR DISTRIBUTION",
    ParagraphStyle('foot',fontSize=7,fontName='Helvetica',textColor=colors.HexColor("#94a3b8"),alignment=TA_CENTER)))

doc.build(story)
print("OK")
`;

  // Write python script to temp
  const pyPath = path.join(tmpDir, `gen_report_${Date.now()}.py`);
  fs.writeFileSync(pyPath, pyScript);

  try {
    // Install reportlab if not present, then run
    const result = spawnSync('python3', [pyPath, dataPath, pdfPath], {
      timeout: 30000,
      encoding: 'utf8'
    });

    if (result.status !== 0) {
      const errMsg = result.stderr || result.stdout || 'Unknown error';
      // If reportlab missing, try installing
      if (errMsg.includes('No module named')) {
        spawnSync('pip3', ['install', 'reportlab', '--break-system-packages', '-q'], { timeout: 30000 });
        const result2 = spawnSync('python3', [pyPath, dataPath, pdfPath], { timeout: 30000, encoding: 'utf8' });
        if (result2.status !== 0) throw new Error(result2.stderr);
      } else {
        throw new Error(errMsg);
      }
    }

    const pdfBuffer = fs.readFileSync(pdfPath);

    // Cleanup
    [pyPath, dataPath, pdfPath].forEach(f => { try { fs.unlinkSync(f); } catch(e) {} });

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="intelX_Simulation_Report_2026.pdf"',
        'Content-Length': String(pdfBuffer.length),
      },
      body: pdfBuffer.toString('base64'),
      isBase64Encoded: true,
    };

  } catch (err) {
    [pyPath, dataPath, pdfPath].forEach(f => { try { fs.unlinkSync(f); } catch(e) {} });
    return resp(500, { error: 'PDF generation failed: ' + err.message });
  }
};
