const ACCESS_PWD='%%ACCESS_PWD%%';

// ── STATIC CONFIG ─────────────────────────────────────────────
const PC={RNI:'#4fa8d5',PAM:'#1a2f5e',PI:'#9b59b6',USFP:'#e91e8c',
  MP:'#f0b429',UC:'#e67e22',PPS:'#2980b9',PJD:'#1a237e',JSAP:'#0891b2',DEFAULT:'#94a3b8'};
const MAJOR=['RNI','PAM','PI','USFP','MP','UC','PPS','PJD'];
const pc=p=>PC[p]||PC.DEFAULT;
const HIST_NAT={
  '2011':{PJD:59,PI:50,RNI:48,PAM:41,USFP:32,MP:29,UC:21,PPS:12},
  '2015':{PAM:55,PJD:50,PI:48,RNI:38,MP:21,UC:16,USFP:16,PPS:5},
  '2016':{PAM:77,PJD:72,RNI:39,PI:39,MP:22,UC:18,USFP:17,PPS:11},
  '2021':{RNI:87,PAM:74,PI:69,USFP:22,MP:20,UC:13,PPS:10,PJD:5}};

// ── SUPABASE CONFIG ────────────────────────────────────────────
const SB_URL='%%SUPABASE_URL%%';
const SB_KEY='%%SUPABASE_ANON_KEY%%';

// ── DATA STUBS — filled by loadAppData() ──────────────────────
let D={};
let TO_MAP={};
let COMMUNES={};
let BASELINE_SIM={_national:{},_ci:{},_ci_lo:{},_ci_hi:{},_runs:0,_label:''};
const ALL_REGIONS=()=>[...new Set(Object.values(D).map(d=>d.r))].sort();
const TOTAL=()=>Object.values(D).reduce((a,d)=>a+d.s,0);
const MAJ=()=>Math.ceil(TOTAL()/2);

// ── SUPABASE LOADER ────────────────────────────────────────────
async function loadAppData(){
  const ov=document.getElementById('loading-overlay');
  const setMsg=m=>{if(ov)ov.querySelector('#ld-msg').textContent=m;};
  if(ov)ov.style.display='flex';
  const H={'apikey':SB_KEY,'Authorization':'Bearer '+SB_KEY};
  const base=SB_URL+'/rest/v1';
  try{
    setMsg('Loading districts…');
    const [dR,tR,bR]=await Promise.all([
      fetch(base+'/districts?select=*',{headers:H}),
      fetch(base+'/turnout?select=*',{headers:H}),
      fetch(base+'/baseline_sim?select=*&limit=1',{headers:H}),
    ]);
    const [districts,turnout,baseline]=await Promise.all([dR.json(),tR.json(),bR.json()]);

    setMsg('Loading communes…');
    // Communes: fetch in two pages (1537 rows, Supabase default limit 1000)
    const [c1R,c2R]=await Promise.all([
      fetch(base+'/communes?select=*&limit=1000&offset=0',{headers:H}),
      fetch(base+'/communes?select=*&limit=1000&offset=1000',{headers:H}),
    ]);
    const communes=[...await c1R.json(),...await c2R.json()];

    // Populate D
    districts.forEach(d=>{
      D[d.name]={r:d.region,u:d.urban,s:d.seats,v:d.votes,
        w11:d.winner_11,w15:d.winner_15,w16:d.winner_16,w21:d.winner_21,
        m:d.margin,yth:d.youth_pct};
    });
    // Populate TO_MAP
    turnout.forEach(t=>{
      TO_MAP[t.district]={to11:t.to11,to15:t.to15,to16:t.to16,to21:t.to21,
        to_leg:t.to_leg,delta:t.delta,elas:t.elas,voixAdd:t.voix_add,prog:t.prog};
    });
    // Populate BASELINE_SIM
    if(baseline[0]){
      const b=baseline[0];
      Object.assign(BASELINE_SIM,{_national:b.national,_ci:b.ci,
        _ci_lo:b.ci_lo,_ci_hi:b.ci_hi,_runs:b.runs,_label:b.label||'',...b.districts});
    }
    // Populate COMMUNES
    communes.forEach(c=>{
      if(!COMMUNES[c.district])COMMUNES[c.district]=[];
      COMMUNES[c.district].push({n:c.name,w:c.winner,t:c.total_votes,m:c.margin,u:c.urban,v:c.votes});
    });

    if(ov)ov.style.display='none';
    return true;
  }catch(err){
    if(ov)ov.innerHTML=`<div style="text-align:center;padding:40px">
      <div style="font-size:32px;margin-bottom:12px">⚠️</div>
      <div style="font-weight:700;color:#e03b3b;margin-bottom:6px">Failed to load data</div>
      <div style="font-size:11px;color:#8a96a3;margin-bottom:16px">${err.message}</div>
      <button onclick="location.reload()" style="padding:8px 20px;background:#0d1f35;color:#fff;border:none;border-radius:6px;cursor:pointer;font-family:Inter,sans-serif">Retry</button>
    </div>`;
    return false;
  }
}

let swings={};MAJOR.forEach(p=>swings[p]=0);
let distSwings={};// {distName: {party: pp}}
let jsapForce=0;
let simResults=null;
let intelLog=[];
let selDist=null;
let selParty=null;
let selRegion='';
let activeTopTab='forecast';
let activeViewTab='overview';
let searchQuery='';
let evolChart=null;
// Guaranteed seats: {distName: {party: nSeats}} - locked before simulation
let guaranteedSeats={};
// Scenario sets: multi-district interconnected scenarios
let scenarioSets=[]; // [{name, districts:{distName:{party:pp}}, to:{}, sap:0, result:null}]
let activeScenSet=null;
// Commune-level scenarios: {distName: {communeName: {party:pp}}}
let communeSwings={};
// Head-to-head state
let activeCommsSubTab='chat';
let h2hPartyA='RNI', h2hPartyB='PAM', h2hPartyC='', h2hScope='national', h2hDistrict='';

//  HELPERS 
// Competitiveness: seats/active_parties + gap%(lastSeat vs firstLoser). Lower = more competitive.
function compScore(name,d){
  const ranked=Object.entries(d.v).filter(([,v])=>v>0).sort((a,b)=>b[1]-a[1]);
  const nActive=ranked.length||1;
  const tot=ranked.reduce((a,[,v])=>a+v,0)||1;
  const lastSeatV=ranked[d.s-1]?.[1]||0;
  const firstLoserV=ranked[d.s]?.[1]||0;
  const gapPct=(lastSeatV-firstLoserV)/tot*100;
  return d.s/nActive+Math.max(0,gapPct);
}
// Score thresholds calibrated on real 2021 data distribution:
// <1.5 = Critical (~12 districts), <4 = Battleground (~15), <9 = Lean (~27), else Safe (~38)
function getStatus(m,name,d){
  if(d&&name&&simResults&&simResults[name]){
    const ms=simResults[name].meanSeats||{};
    const w=d.w21;
    const wc=ms[w]||0;
    if(wc<0.35)return'tossup';
    if(wc<0.60)return'battleground';
    if(wc<0.85)return'lean';
    return'safe';
  }
  if(d){const cs=compScore(name,d);if(cs<1.5)return'tossup';if(cs<4)return'battleground';if(cs<9)return'lean';return'safe';}
  return m<3?'tossup':m<7?'battleground':m<15?'lean':'safe';
}
function statusLabel(s){return{tossup:'Critical',battleground:'Battleground',lean:'Lean',safe:'Safe'}[s]||s}
function statusPillClass(s){return{tossup:'pill-red',battleground:'pill-amber',lean:'pill-green',safe:'pill-blue'}[s]||'pill-gray'}
function flipPill(d){return d.w11&&d.w21&&d.w11!==d.w21}
function rankBySeats(v,n){return Object.entries(v).filter(([,x])=>x>0).sort((a,b)=>b[1]-a[1]).slice(0,n).map(([p])=>p)}
function calcBase(){const t={};Object.values(D).forEach(d=>rankBySeats(d.v,d.s).forEach(p=>t[p]=(t[p]||0)+1));return t}
// Unified seat source — sim results when available, otherwise base 2021
function getSeats(){return simResults?simResults._national:calcBase();}
// Unified per-district seat winners — sim when available, respects guaranteed seats
function getDistSeats(name,d){
  if(simResults&&simResults[name])return simResults[name].seats||rankBySeats(d.v,d.s);
  // Apply guaranteed seats deterministically if set
  const g=guaranteedSeats[name]||{};
  if(Object.keys(g).length>0){
    const ranked=Object.entries(d.v).sort((a,b)=>b[1]-a[1]);
    let seatsLeft=d.s; const alloc=[];
    for(const[gp,gn]of Object.entries(g)){for(let i=0;i<Math.min(gn,seatsLeft);i++){alloc.push(gp);seatsLeft--;}}
    const gPs=new Set(Object.keys(g));
    for(const[p]of ranked){if(seatsLeft<=0)break;if(!gPs.has(p)){alloc.push(p);seatsLeft--;}}
    return alloc;
  }
  return rankBySeats(d.v,d.s);
}
// Baseline forecast: 10,000 MC runs from actual 2021 vote data, 3pp variance, no swings
function getJSAPscore(d,name){
  const t=name?(TO_MAP[name]||{to21:0.45}):{to21:0.45};
  const toScore=Math.max(0,(0.4-(t.to21||0.45))/0.3);
  const baseScore=Math.max(0,Math.min(1,toScore*0.4+(d.yth||14)/30*0.35+(d.u||0)*0.25));
  // Force slider amplifies score for high-potential districts
  const forceBoost=jsapForce/20*0.3*baseScore;
  return Math.min(1,baseScore+forceBoost);
}
function getDistTO(name){return (TO_MAP[name]||{}).to21||0.45;}

//  INIT 
function init(){
  loadAppData().then(ok=>{if(ok)_initApp();});
}
function _initApp(){
  // Populate region dropdown
  const rSel=document.getElementById('region-filter-sel');
  ALL_REGIONS().forEach(r=>{const o=document.createElement('option');o.value=r;o.textContent=r;rSel.appendChild(o);});
  // Load baseline forecast as initial state
  simResults=BASELINE_SIM;
  buildSidebar();
  renderRightPanel();
  setTopTab('forecast');
}

function setRegionFilter(region){
  selRegion=region;
  buildSidebar();
  // If viewing national overview, re-render to show filtered context
  if(!selDist&&!selParty)renderNationalOverview();
}

//  SIDEBAR 
function buildSidebar(){
  const body=document.getElementById('sb-body');
  const byRegion={};
  Object.entries(D).forEach(([name,d])=>{
    // Apply region filter
    if(selRegion&&d.r!==selRegion)return;
    if(!byRegion[d.r])byRegion[d.r]=[];
    byRegion[d.r].push({name,...d});
  });
  const sorted=Object.entries(byRegion).sort((a,b)=>a[0].localeCompare(b[0]));
  let html='';
  sorted.forEach(([region,dists])=>{
    const filteredDists=dists.filter(d=>!searchQuery||d.name.toLowerCase().includes(searchQuery)||d.r.toLowerCase().includes(searchQuery));
    if(!filteredDists.length)return;
    html+=`<div class="sb-section">
      <div class="sb-section-hd">${region}</div>
      ${filteredDists.sort((a,b)=>a.name.localeCompare(b.name)).map(d=>{
        const st=getStatus(d.m,d.name,d);
        const isFlip=flipPill(d);
        const simSeat=(getDistSeats(d.name,d)||[d.w21])[0]||d.w21;
        return `<div class="sb-item${selDist===d.name?' on':''}" onclick="selectDist('${d.name.replace(/'/g,"\\'")}')">
          <span class="sb-item-name">${d.name}</span>
          <div class="sb-item-right">
            ${isFlip?'<span class="pill pill-amber" style="font-size:9px">FLIP</span>':''}
            <span class="pill ${statusPillClass(st)}">${statusLabel(st)}</span>
          </div>
        </div>`;
      }).join('')}
    </div>`;
  });
  html+=`<div class="sb-section">
    <div class="sb-section-hd">Quick filters</div>
    <div class="sb-item" onclick="filterView('tossup')"><span class="sb-item-name">Toss-up districts</span><span class="pill pill-red">${Object.entries(D).filter(([n,d])=>getStatus(d.m,n,d)==='tossup').length}</span></div>
    <div class="sb-item" onclick="filterView('battleground')"><span class="sb-item-name">Battleground</span><span class="pill pill-amber">${Object.entries(D).filter(([n,d])=>getStatus(d.m,n,d)==='battleground').length}</span></div>
    <div class="sb-item" onclick="filterView('flips')"><span class="sb-item-name">Flipped since 2011</span><span class="pill pill-teal">${Object.keys(D).filter(n=>D[n].w11&&D[n].w21&&D[n].w11!==D[n].w21).length}</span></div>
    <div class="sb-item" onclick="filterView('highpot')"><span class="sb-item-name">High mobilization potential</span><span class="pill pill-navy">${Object.entries(TO_MAP).filter(([,t])=>t.voixAdd>15000).length}</span></div>
  </div>`;
  body.innerHTML=html;
}

function filterSidebar(){
  searchQuery=document.getElementById('sb-search').value.toLowerCase();
  buildSidebar();
}

function filterView(type){
  selDist=null;
  const dists=Object.entries(D).filter(([n,d])=>{
    if(type==='tossup')return getStatus(d.m,n,d)==='tossup';
    if(type==='battleground')return getStatus(d.m,n,d)==='battleground';
    if(type==='flips')return d.w11&&d.w21&&d.w11!==d.w21;
    if(type==='highpot')return(TO_MAP[n]||{}).voixAdd>15000;
  });
  renderFilteredView(type,dists);
}

//  TOP TABS 
function setTopTab(tab){
  activeTopTab=tab;
  document.querySelectorAll('.tnav').forEach(b=>b.classList.toggle('on',b.getAttribute('onclick').includes("'"+tab+"'")));
  if(!selDist||tab==='battleground'||tab==='intel'||tab==='jsap'||tab==='party'||tab==='scensets'||tab==='h2h'||tab==='strategic'||tab==='comms'||tab==='news'||tab==='orga'){
    if(tab==='battleground')renderBattlegroundOverview();
    else if(tab==='intel')renderIntelView();
    else if(tab==='jsap')renderJSAPview();
    else if(tab==='party')renderPartyProfileView(selParty);
    else if(tab==='scensets')renderScenSetsView();
    else if(tab==='h2h')renderH2HView();
    else if(tab==='strategic')renderStrategicView();
    else if(tab==='comms')renderCommsView();
    else if(tab==='orga')renderOrgaView();
    else if(tab==='news'){activeCommsSubTab='news';renderCommsView();}
    else renderNationalOverview();
  } else {
    renderDistrictView(selDist);
  }
}

function goNational(){
  selDist=null;
  selParty=null;
  selRegion='';
  const rSel=document.getElementById('region-filter-sel');
  if(rSel)rSel.value='';
  document.getElementById('party-profile-sel').value='';
  activeViewTab='overview';
  buildSidebar();
  setTopTab('forecast');
}

function setPartyProfile(party){
  selParty=party;
  selDist=null;
  activeTopTab='party';
  document.querySelectorAll('.tnav').forEach(b=>b.classList.toggle('on',b.getAttribute('onclick').includes("'party'")));
  buildSidebar();
  renderPartyProfileView(party);
}

//  SELECT DISTRICT 
function selectDist(name){
  selDist=name;
  buildSidebar();
  renderDistrictView(name);
}

function renderDistrictView(name){
  const d=D[name];if(!d)return;
  const to=TO_MAP[name]||{};
  const communes=COMMUNES[name]||[];
  const tabs=['overview','communes','scenario','com-scenario','guaranteed'];
  const tabLabels={'overview':'Overview','communes':'Communes','scenario':'Scenario','com-scenario':'Commune Scenario','guaranteed':'Guaranteed Seats'};
  document.getElementById('view-tabs').innerHTML=tabs.map(t=>`<button class="vtab${activeViewTab===t?' on':''}" onclick="setViewTab('${t}')">${tabLabels[t]}</button>`).join('');
  if(activeViewTab==='overview')renderDistOverview(name,d,to,communes);
  else if(activeViewTab==='communes')renderDistCommunes(name,d,communes);
  else if(activeViewTab==='scenario')renderDistScenario(name,d);
  else if(activeViewTab==='com-scenario'){document.getElementById('view-content').innerHTML=`<div class="card"><div class="card-title">Commune-level scenario — ${name}</div>${renderCommuneScenarios(name)}</div>`;}
  else if(activeViewTab==='guaranteed'){document.getElementById('view-content').innerHTML=`<div class="card"><div class="card-title">Guaranteed seats — ${name}</div><div id="guar-box-${name.replace(/[^a-zA-Z0-9]/g,'')}">${renderGuaranteedBox(name)}</div></div>`;}
}

function setViewTab(tab){
  activeViewTab=tab;
  if(selDist)renderDistrictView(selDist);
}

//  DISTRICT OVERVIEW 
function renderDistOverview(name,d,to,communes){
  const tot=Object.values(d.v).reduce((a,b)=>a+b,0)||1;
  const sorted=Object.entries(d.v).sort((a,b)=>b[1]-a[1]);
  const st=getStatus(d.m,name,d);
  const flipped=flipPill(d);
  const to21=to.to21||getDistTO(name);
  const effTO=getEffTO(d,name);
  const jsapScore=getJSAPscore(d,name);
  // Projected winner
  const projWinner=simResults?getSimWinner(name):d.w21;

  // Strategic communes
  const strategicComms=communes.filter(c=>c.w===d.w21).sort((a,b)=>b.t-a.t).slice(0,4);
  const targetComms=communes.filter(c=>c.w!==d.w21&&c.m<10).sort((a,b)=>a.m-b.m).slice(0,4);

  const html=`
  <div class="dist-header">
    <div class="dist-title">${name}</div>
    <div class="dist-meta">
      <span class="pill ${statusPillClass(st)}">${statusLabel(st)} +${d.m}pp</span>
      <span class="pill pill-navy">${d.s} seats · ${d.r}</span>
      ${flipped?`<span class="pill pill-amber">Flipped ${d.w11}→${d.w21}</span>`:''}
      ${d.u?'<span class="pill pill-teal">Urban</span>':'<span class="pill pill-gray">Rural</span>'}
      ${jsapScore>0.45?'<span class="pill" style="background:#f0fdfa;color:#0891b2">JSAP fertile</span>':''}
    </div>
    <div class="dist-grid">
      <div class="dist-stat"><div class="ds-label">2021 seat winners</div>
        <div class="seat-alloc">${rankBySeats(d.v,d.s).map(p=>`<span class="seat-chip" style="background:${pc(p)}">${p}</span>`).join('')}</div>
        <div class="ds-sub">+${d.m}pp top margin</div>
      </div>
      <div class="dist-stat"><div class="ds-label">2026 Projection</div>
        <div class="seat-alloc">${(simResults&&simResults[name]?.seats||rankBySeats(d.v,d.s)).map(p=>`<span class="seat-chip" style="background:${pc(p)}">${p}</span>`).join('')}</div>
        <div class="ds-sub">${simResults?'Simulation result':'Run sim to project'}</div>
      </div>
      <div class="dist-stat"><div class="ds-label">Turnout 2021→26</div><div class="ds-val">${(to21*100).toFixed(0)}%→${(effTO*100).toFixed(0)}%</div><div class="ds-sub">Leg baseline: ${(to.to_leg||to21)*100>0?(to.to_leg||to21)*100|0:'-'}%</div></div>
      <div class="dist-stat"><div class="ds-label">Vote potential</div><div class="ds-val" style="color:${(to.voixAdd||0)>0?'var(--green)':'var(--red)'}">${(to.voixAdd||0)>0?'+':''}${((to.voixAdd||0)/1000).toFixed(0)}k</div><div class="ds-sub">New voters available</div></div>
      <div class="dist-stat"><div class="ds-label">Youth share</div><div class="ds-val">${d.yth||'—'}%</div><div class="ds-sub">of electorate</div></div>
      <div class="dist-stat"><div class="ds-label">Elasticity</div><div class="ds-val">${Math.min(Math.abs(to.elas||1),15).toFixed(1)}</div><div class="ds-sub">Swing sensitivity</div></div>
    </div>
    <div style="margin-bottom:8px">
      ${sorted.slice(0,6).map(([p,v])=>`
        <div class="party-row">
          <div class="p-swatch" style="background:${pc(p)}"></div>
          <span class="p-name" style="color:${pc(p)}">${p}</span>
          <div class="p-bar-bg"><div class="p-bar-fill" style="width:${(v/tot*100).toFixed(0)}%;background:${pc(p)}40;border:none"></div></div>
          <span class="p-seats" style="font-size:12px">${(v/tot*100).toFixed(1)}%</span>
          <span style="font-size:11px;color:var(--text3);min-width:52px;text-align:right">${v.toLocaleString()}</span>
        </div>`).join('')}
    </div>
  </div>

  <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
    <div class="card">
      <div class="card-title"><span> Strongholds — Keep</span><span style="font-size:10px;color:var(--teal)">for ${d.w21}</span></div>
      ${strategicComms.length?strategicComms.map(c=>renderCommSmall(c,'strategic')).join(''):`<div style="font-size:11px;color:var(--text3)">Select Communes tab for details</div>`}
    </div>
    <div class="card">
      <div class="card-title"><span> Targets — Win</span><span style="font-size:10px;color:var(--amber)">flip potential</span></div>
      ${targetComms.length?targetComms.map(c=>renderCommSmall(c,'target')).join(''):`<div style="font-size:11px;color:var(--text3)">No close communes found</div>`}
    </div>
  </div>

  ${simResults?`<div class="card" style="margin-top:12px">
    <div class="card-title">Simulation result</div>
    ${renderSimDistResult(name,d)}
  </div>`:''}

  ${intelLog.filter(i=>i.dist&&name.toLowerCase().includes(i.dist.toLowerCase().slice(0,6))).length?`
  <div class="card" style="margin-top:12px">
    <div class="card-title">Intel on this district</div>
    ${intelLog.filter(i=>i.dist&&name.toLowerCase().includes(i.dist.toLowerCase().slice(0,6))).map(i=>`
      <div class="intel-entry">
        <div class="intel-meta">${i.cat.toUpperCase()} · ${i.time}</div>
        <div class="intel-text">${i.text}</div>
      </div>`).join('')}
  </div>`:''}`;

  document.getElementById('view-content').innerHTML=html;
  document.getElementById('rp-head').textContent=name;
  renderDistRightPanel(name,d,to);
}

function renderCommSmall(c,type){
  const tot=c.t||1;
  const top3=Object.entries(c.v).sort((a,b)=>b[1]-a[1]).slice(0,3);
  return `<div style="padding:7px 0;border-bottom:1px solid var(--border)">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:4px">
      <span style="font-size:12px;font-weight:600;color:var(--navy)">${c.n}${c.u?' <span style="font-size:9px;font-weight:400;color:var(--teal)">urb</span>':''}</span>
      <span style="font-size:10px;font-weight:700;color:${pc(c.w)}">${c.w} +${c.m.toFixed(0)}pp</span>
    </div>
    <div style="display:flex;height:4px;border-radius:2px;overflow:hidden;margin-bottom:3px">
      ${top3.map(([p,v])=>`<div style="width:${(v/tot*100).toFixed(0)}%;background:${pc(p)}"></div>`).join('')}
    </div>
    <div style="display:flex;gap:7px">${top3.map(([p,v])=>`<span style="font-size:10px;color:${pc(p)}">${p} ${(v/tot*100).toFixed(0)}%</span>`).join('')}</div>
  </div>`;
}

function renderSimDistResult(name,d){
  if(!simResults||!simResults[name])return'<span style="font-size:11px;color:var(--text3)">No data</span>';
  const r=simResults[name];
  const tot=Object.values(d.v).reduce((a,b)=>a+b,0)||1;
  const sorted=Object.entries(r.adj).sort((a,b)=>b[1]-a[1]).slice(0,5);
  const mx=sorted[0]?.[1]||1;
  return sorted.map(([p,v])=>{
    const base=d.v[p]||0;
    const delta=v-base;
    const isWin=r.seats.includes(p);
    return `<div class="party-row">
      <div class="p-swatch" style="background:${pc(p)}"></div>
      <span class="p-name" style="color:${pc(p)}">${p}</span>
      <div class="p-bar-bg"><div class="p-bar-fill" style="width:${(v/mx*100).toFixed(0)}%;background:${pc(p)}40"></div></div>
      <span class="p-seats">${(v/tot*100).toFixed(1)}%</span>
      <span class="p-delta" style="color:${delta>0?'var(--green)':delta<0?'var(--red)':'var(--text3)'}">${delta>=0?'+':''}${(delta/tot*100).toFixed(1)}pp</span>
      ${isWin?`<span class="pill pill-green" style="font-size:9px">SEAT</span>`:''}
    </div>`;
  }).join('');
}

//  COMMUNE DETAIL 
function renderDistCommunes(name,d,communes){
  // Load all commune data directly from COMMUNES object to ensure completeness
  const allComm=COMMUNES[name]||[];
  const distTot=Object.values(d.v).reduce((a,b)=>a+b,0)||1;
  const w21=d.w21;

  if(!allComm.length){
    // Even without COMMUNES data, show district vote breakdown as "aggregate commune"
    const sortedV=Object.entries(d.v).sort((a,b)=>b[1]-a[1]);
    document.getElementById('view-content').innerHTML=`
    <div class="card">
      <div class="card-title">District aggregate — ${name}</div>
      <div style="font-size:11px;color:var(--text2);margin-bottom:10px">Individual commune data not available for this district. Showing district-level vote breakdown (${d.s} seats).</div>
      <table class="tbl">
        <thead><tr><th>Party</th><th>Votes</th><th>Share</th><th>Seats won</th></tr></thead>
        <tbody>${sortedV.map(([p,v],i)=>`<tr>
          <td><span style="color:${pc(p)};font-weight:700">${p}</span></td>
          <td>${v.toLocaleString()}</td>
          <td><div style="display:flex;align-items:center;gap:6px"><div style="width:${(v/distTot*80).toFixed(0)}px;height:5px;background:${pc(p)};border-radius:2px"></div>${(v/distTot*100).toFixed(1)}%</div></td>
          <td style="text-align:center">${i<d.s?'<span class="pill pill-green">Seat</span>':'—'}</td>
        </tr>`).join('')}</tbody>
      </table>
    </div>`;
    return;
  }

  const sorted=[...allComm].sort((a,b)=>b.t-a.t);
  const strongholds=sorted.filter(c=>c.w===w21&&c.m>8);
  const contested=sorted.filter(c=>c.m<6);
  const won=sorted.filter(c=>c.w===w21);
  const lost=sorted.filter(c=>c.w!==w21);
  const communeVotesTotal=sorted.reduce((a,c)=>a+c.t,0);
  const coveragePct=distTot>0?Math.min(100,(communeVotesTotal/distTot*100)).toFixed(0):0;

  const html=`
  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-bottom:14px">
    <div class="stat-box"><div class="stat-label">Total communes</div><div class="stat-val">${allComm.length}</div><div class="stat-sub">${coveragePct}% of district votes</div></div>
    <div class="stat-box"><div class="stat-label">Won by ${w21}</div><div class="stat-val" style="color:${pc(w21)}">${won.length}</div><div class="stat-sub">${allComm.length?((won.length/allComm.length)*100).toFixed(0)+'%':'-'} of communes</div></div>
    <div class="stat-box"><div class="stat-label">Contested &lt;6pp</div><div class="stat-val" style="color:var(--amber)">${contested.length}</div></div>
    <div class="stat-box"><div class="stat-label">Opposition-held</div><div class="stat-val" style="color:var(--red)">${lost.length}</div></div>
  </div>

  ${strongholds.length?`
  <div class="card">
    <div class="card-title" style="color:var(--green)">Strongholds — ${w21} safe (margin &gt;8pp)</div>
    <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:8px">
      ${strongholds.map(c=>renderComm(c,w21,'strong')).join('')}
    </div>
  </div>`:''}

  ${contested.length?`
  <div class="card">
    <div class="card-title" style="color:var(--amber)">Contested — margin under 6pp</div>
    <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:8px">
      ${contested.map(c=>renderComm(c,w21,'contest')).join('')}
    </div>
  </div>`:''}

  ${lost.length?`
  <div class="card">
    <div class="card-title" style="color:var(--red)">Opposition-held — win targets</div>
    <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:8px">
      ${lost.map(c=>renderComm(c,w21,'target')).join('')}
    </div>
  </div>`:''}

  <div class="card">
    <div class="card-title">All ${allComm.length} communes — full detail</div>
    <table class="tbl">
      <thead><tr><th>Commune</th><th>Type</th><th>Winner</th><th>Margin</th><th>Votes</th><th>All parties</th></tr></thead>
      <tbody>${sorted.map(c=>{
        const allParties=Object.entries(c.v).sort((a,b)=>b[1]-a[1]);
        return `<tr>
          <td style="font-weight:600">${c.n}</td>
          <td>${c.u?'<span class="pill pill-teal" style="font-size:9px">URB</span>':'<span class="pill pill-gray" style="font-size:9px">RUR</span>'}</td>
          <td style="color:${pc(c.w)};font-weight:700">${c.w}</td>
          <td style="font-weight:600;color:${c.m<3?'var(--red)':c.m<7?'var(--amber)':'var(--text)'}">${c.m.toFixed(1)}pp</td>
          <td>${c.t.toLocaleString()}</td>
          <td>${allParties.map(([p,v])=>`<span style="color:${pc(p)};margin-right:5px;font-size:10px">${p} ${(v/c.t*100).toFixed(0)}%</span>`).join('')}</td>
        </tr>`;
      }).join('')}</tbody>
    </table>
  </div>`;

  document.getElementById('view-content').innerHTML=html;
}

function renderComm(c,w21,type){
  const tot=c.t||1;
  const top3=Object.entries(c.v).sort((a,b)=>b[1]-a[1]).slice(0,3);
  const isStrong=type==='strong';
  const isTarget=type==='target';
  return `<div style="background:${isStrong?'var(--green-bg)':isTarget?'#fffbeb':'var(--surface2)'};border:1px solid ${isStrong?'#a7f3d0':isTarget?'#fde68a':'var(--border)'};border-radius:7px;padding:10px 12px">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:5px">
      <span style="font-size:12px;font-weight:700;color:var(--navy)">${c.n}</span>
      <div style="display:flex;gap:4px;align-items:center">
        ${c.u?'<span style="font-size:9px;color:var(--teal)">URB</span>':''}
        <span style="font-size:11px;font-weight:700;color:${pc(c.w)}">${c.w}</span>
      </div>
    </div>
    <div style="display:flex;height:5px;border-radius:3px;overflow:hidden;margin-bottom:5px">
      ${top3.map(([p,v])=>`<div style="width:${(v/tot*100).toFixed(0)}%;background:${pc(p)}"></div>`).join('')}
    </div>
    <div style="display:flex;justify-content:space-between;font-size:10px">
      <span>${top3.map(([p,v])=>`<span style="color:${pc(p)};margin-right:5px">${p} ${(v/tot*100).toFixed(0)}%</span>`).join('')}</span>
      <span style="color:${c.m<4?'var(--red)':c.m<8?'var(--amber)':'var(--text3)'}">+${c.m.toFixed(1)}pp</span>
    </div>
    <div style="font-size:10px;color:var(--text3);margin-top:3px">${c.t.toLocaleString()} votes</div>
  </div>`;
}

//  DISTRICT SCENARIO 
function renderDistScenario(name,d){
  if(!distSwings[name])distSwings[name]={};
  const dSw=distSwings[name];
  const to=TO_MAP[name]||{};
  const tot=Object.values(d.v).reduce((a,b)=>a+b,0)||1;

  const html=`
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
    <div class="card">
      <div class="card-title">District-level swing assumptions</div>
      <div style="font-size:11px;color:var(--text2);margin-bottom:10px">Override national swings for <strong>${name}</strong>. Leave 0 to use national scenario.</div>
      ${MAJOR.map(p=>{
        const v=dSw[p]||0;
        const natSw=swings[p]||0;
        return `<div class="slider-row">
          <span class="slider-label" style="color:${pc(p)}">${p}</span>
          <input type="range" min="-20" max="20" step="1" value="${v}" id="dsw-${name.slice(0,5).replace(/\s/g,'')}-${p}" oninput="distSwings['${name}']['${p}']=parseInt(this.value);updateDswVal('${name}','${p}')">
          <span class="slider-val" id="dswv-${name.slice(0,5).replace(/\s/g,'')}-${p}" style="color:${v>0?'var(--green)':v<0?'var(--red)':'var(--text3)'}">${v>=0?'+':''}${v}pp</span>
        </div>`;
      }).join('')}
      <div style="margin-top:8px;padding-top:8px;border-top:1px solid var(--border);font-size:10px;color:var(--text3)">
        National swings: ${MAJOR.filter(p=>swings[p]).map(p=>`${p} ${swings[p]>=0?'+':''}${swings[p]}pp`).join(', ')||'None set'}
      </div>
    </div>
    <div class="card">
      <div class="card-title">Turnout projection</div>
      <div class="to-bar-wrap">
        <div class="to-bar-label"><span>Turnout 2011</span><span>${((to.to11||0)*100).toFixed(1)}%</span></div>
        <div class="to-bar-track"><div class="to-bar-fill2" style="width:${((to.to11||0)*100).toFixed(0)}%;background:#94a3b8"></div></div>
      </div>
      <div class="to-bar-wrap">
        <div class="to-bar-label"><span>Turnout 2016</span><span>${((to.to16||0)*100).toFixed(1)}%</span></div>
        <div class="to-bar-track"><div class="to-bar-fill2" style="width:${((to.to16||0)*100).toFixed(0)}%;background:#64748b"></div></div>
      </div>
      <div class="to-bar-wrap">
        <div class="to-bar-label"><span>Turnout 2021</span><span>${((to.to21||0)*100).toFixed(1)}%</span></div>
        <div class="to-bar-track"><div class="to-bar-fill2" style="width:${((to.to21||0)*100).toFixed(0)}%;background:var(--navy)"></div></div>
      </div>
      <div class="to-bar-wrap">
        <div class="to-bar-label"><span style="color:var(--teal);font-weight:600">2026 Projected</span><span style="color:var(--teal);font-weight:700">${(getEffTO(d,name)*100).toFixed(1)}%</span></div>
        <div class="to-bar-track"><div class="to-bar-fill2" style="width:${(getEffTO(d,name)*100).toFixed(0)}%;background:var(--teal)"></div></div>
      </div>
      <div class="divider"></div>
      <div style="font-size:11px;color:var(--text2);margin-bottom:6px">JSAP movement score</div>
      <div class="score-bar"><span class="score-label">Youth potential</span><div class="score-track"><div class="score-fill" style="width:${((d.yth||14)/30*100).toFixed(0)}%;background:var(--teal)"></div></div><span class="score-val">${d.yth||14}%</span></div>
      <div class="score-bar"><span class="score-label">Low TO opportunity</span><div class="score-track"><div class="score-fill" style="width:${Math.max(0,(0.4-(to.to21||0.45))/0.3*100).toFixed(0)}%;background:#0891b2"></div></div><span class="score-val">${(to.to21*100||45).toFixed(0)}%</span></div>
      <div class="score-bar"><span class="score-label">Overall JSAP score</span><div class="score-track"><div class="score-fill" style="width:${(getJSAPscore(d,name)*100).toFixed(0)}%;background:#0891b2"></div></div><span class="score-val">${(getJSAPscore(d,name)*100).toFixed(0)}%</span></div>
      ${to.voixAdd>0?`<div class="alert al-teal" style="margin-top:8px"><span class="al-icon"></span><span>+${to.voixAdd.toLocaleString()} additional votes available (unregistered/low-TO voters)</span></div>`:''}
    </div>
  </div>`;

  document.getElementById('view-content').innerHTML=html;
}

function updateDswVal(name,party){
  const key=name.slice(0,5).replace(/\s/g,'');
  const el=document.getElementById(`dswv-${key}-${party}`);
  const v=distSwings[name]?.[party]||0;
  if(el){el.textContent=(v>=0?'+':'')+v+'pp';el.style.color=v>0?'var(--green)':v<0?'var(--red)':'var(--text3)';}
}

//  DISTRICT HISTORY 
function renderDistHistory(name,d,to){
  const html=`
  <div class="card">
    <div class="card-title">Election results 2011–2021</div>
    ${['2011','2015','2016','2021'].map(yr=>{
      const wKey='w'+yr.slice(2);
      const winner=d[wKey];
      const toKey='to'+yr.slice(2);
      const toVal=to[toKey]||0;
      return `<div class="hist-row">
        <span class="hist-yr">${yr}</span>
        ${winner?`<span class="hist-winner" style="color:${pc(winner)}">${winner}</span>`:'<span class="hist-winner" style="color:var(--text4)">—</span>'}
        <div class="hist-bar-bg"><div class="hist-bar-fill" style="width:${(toVal*100).toFixed(0)}%;background:${winner?pc(winner):'var(--border)'}22;border:1px solid ${winner?pc(winner)+'44':'var(--border)'}"></div></div>
        <span class="hist-to">${(toVal*100).toFixed(1)}%</span>
      </div>`;
    }).join('')}
    <div style="font-size:10px;color:var(--text3);margin-top:8px">Bar width = turnout. Leg avg: ${to.to_leg?(to.to_leg*100).toFixed(0)+'%':'—'}, Comm avg: ${to.delta!==undefined?((to.to_leg||0)+(to.delta||0))*100>0?(((to.to_leg||0)+(to.delta||0))*100).toFixed(0)+'%':'—':'—'}</div>
  </div>
  <div class="card">
    <div class="card-title">Winner trajectory</div>
    <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;padding:6px 0">
      ${['2011','2015','2016','2021'].map(yr=>{
        const wKey='w'+yr.slice(2);const winner=d[wKey];
        return winner?`<div style="text-align:center">
          <div style="font-size:9px;color:var(--text3);margin-bottom:4px">${yr}</div>
          <div style="width:40px;height:40px;border-radius:6px;background:${pc(winner)}22;border:1px solid ${pc(winner)}44;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:${pc(winner)}">${winner}</div>
        </div>`:'';
      }).join('<span style="color:var(--border2);font-size:16px;margin-top:12px">→</span>')}
      <span style="color:var(--border2);font-size:16px;margin-top:12px">→</span>
      <div style="text-align:center">
        <div style="font-size:9px;color:var(--teal);margin-bottom:4px;font-weight:700">2026↗</div>
        <div style="width:40px;height:40px;border-radius:6px;background:${simResults?pc(getSimWinner(name))+'22':'var(--teal-bg)'};border:2px solid ${simResults?pc(getSimWinner(name)):'var(--teal)'};display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:${simResults?pc(getSimWinner(name)):'var(--teal)'}">
          ${simResults?getSimWinner(name):'?'}
        </div>
      </div>
    </div>
    ${flipPill(d)?`<div class="alert al-amber" style="margin-top:8px"><span class="al-icon"></span><span>This district flipped from <strong>${d.w11}</strong> (2011) to <strong>${d.w21}</strong> (2021) — historically volatile</span></div>`:''}
  </div>
  <div class="card">
    <div class="card-title">TO progression analysis</div>
    <div class="score-bar"><span class="score-label">Leg–comm delta</span><div class="score-track"><div class="score-fill" style="width:${Math.min(100,Math.abs(to.delta||0)*200).toFixed(0)}%;background:${(to.delta||0)>0?'var(--green)':'var(--red)'}"></div></div><span class="score-val" style="color:${(to.delta||0)>0?'var(--green)':'var(--red)'}">${((to.delta||0)*100>0?'+':'')+((to.delta||0)*100).toFixed(1)}pp</span></div>
    <div class="score-bar"><span class="score-label">Progression 2021</span><div class="score-track"><div class="score-fill" style="width:${Math.min(100,Math.abs(to.prog||0)*100).toFixed(0)}%;background:var(--teal)"></div></div><span class="score-val">${((to.prog||0)*100).toFixed(1)}%</span></div>
    <div class="score-bar"><span class="score-label">Elasticity (swing sens.)</span><div class="score-track"><div class="score-fill" style="width:${Math.min(100,Math.abs(to.elas||1)/10*100).toFixed(0)}%;background:var(--purple)"></div></div><span class="score-val">${Math.abs(to.elas||1).toFixed(1)}x</span></div>
  </div>`;
  document.getElementById('view-content').innerHTML=html;
}

//  RIGHT PANEL DISTRICT 
function renderDistRightPanel(name,d,to){
  const cs=compScore(name,d);
  const st=getStatus(d.m,name,d);
  const html=`
  <div class="sec-hd">Quick stats</div>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-bottom:12px">
    <div class="stat-box"><div class="stat-label">Seats</div><div class="stat-val" style="font-size:18px">${d.s}</div></div>
    <div class="stat-box"><div class="stat-label">TO 2021</div><div class="stat-val" style="font-size:18px">${((to.to21||0.45)*100).toFixed(0)}%</div></div>
    <div class="stat-box"><div class="stat-label">Margin</div><div class="stat-val" style="font-size:16px;color:${st==='tossup'?'var(--red)':'var(--navy)'}">+${d.m}pp</div></div>
    <div class="stat-box"><div class="stat-label">Comp. score</div><div class="stat-val" style="font-size:14px;color:${st==='tossup'?'var(--red)':st==='battleground'?'var(--amber)':st==='lean'?'var(--green)':'var(--blue)'}"><span title="seats/parties + gap%. Lower = more competitive">${cs.toFixed(2)}</span></div></div>
  </div>
  <div class="sec-hd" style="margin-top:8px">Demographics</div>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:5px;margin-bottom:8px">
    <div class="stat-box"><div class="stat-label">Youth 15–29</div><div class="stat-val" style="font-size:14px;color:${d.yth>20?'var(--teal)':'var(--text)'}">${d.yth}%</div></div>
    <div class="stat-box"><div class="stat-label">Area</div><div class="stat-val" style="font-size:14px">${d.u?'Urban':'Rural'}</div></div>
    <div class="stat-box"><div class="stat-label">Mob. votes</div><div class="stat-val" style="font-size:12px;color:${(to.voixAdd||0)>0?'var(--green)':'var(--red)'}">${(to.voixAdd||0)>0?'+':''}${((to.voixAdd||0)/1000).toFixed(0)}k</div></div>
    <div class="stat-box"><div class="stat-label">TO trend</div><div class="stat-val" style="font-size:12px;color:${(to.delta||0)>0?'var(--red)':'var(--green)'}">${(to.delta||0)>0?'↑ Rising':'↓ Falling'}</div></div>
  </div>
  <div class="sec-hd">History</div>
  ${['2011','2016','2021'].map(yr=>{
    const w=d['w'+yr.slice(2)];
    return w?`<div style="display:flex;justify-content:space-between;padding:5px 0;border-bottom:1px solid var(--border);font-size:12px"><span style="color:var(--text3)">${yr}</span><span style="font-weight:700;color:${pc(w)}">${w}</span></div>`:'';
  }).join('')}
  <div class="sec-hd" style="margin-top:12px">Add intel</div>
  <input type="text" id="rp-intel-txt" placeholder="Quick note for ${name}..." style="margin-bottom:6px">
  <select id="rp-intel-cat" style="margin-bottom:6px">
    <option value="ground">Ground intel</option>
    <option value="swing">Swing estimate</option>
    <option value="candidate">Candidate</option>
    <option value="risk">Risk</option>
    <option value="sap">JSAP/Youth</option>
  </select>
  <button class="btn primary" onclick="addDistIntel('${name}')" style="width:100%">Add note +</button>`;
  document.getElementById('rp-body').innerHTML=html;
}

function addDistIntel(distName){
  const txt=document.getElementById('rp-intel-txt')?.value.trim();
  const cat=document.getElementById('rp-intel-cat')?.value||'ground';
  if(!txt)return;
  intelLog.push({dist:distName,cat,text:txt,time:new Date().toLocaleTimeString(),id:Date.now()});
  document.getElementById('rp-intel-txt').value='';
  document.getElementById('intel-cnt').textContent=intelLog.length;
  renderDistOverview(distName,D[distName],TO_MAP[distName]||{},COMMUNES[distName]||[]);
}

//  NATIONAL OVERVIEW 
function renderNationalOverview(){
  document.getElementById('view-tabs').innerHTML='';
  const seats=getSeats();
  const sorted=Object.entries(seats).filter(([,v])=>v>0).sort((a,b)=>b[1]-a[1]);
  const total=sorted.reduce((a,[,v])=>a+v,0)||TOTAL();
  const mx=sorted[0]?.[1]||1;

  // Build simulation banner if sim was run
  const simBannerHtml=simResults?buildSimBanner(seats,sorted):'';

  const html=`
  ${simBannerHtml}

  <div class="stat-grid">
    <div class="stat-box"><div class="stat-label">Total seats</div><div class="stat-val">${TOTAL()}</div></div>
    <div class="stat-box"><div class="stat-label">Majority</div><div class="stat-val">${MAJ()}</div></div>
    <div class="stat-box"><div class="stat-label">Leader</div><div class="stat-val" style="color:${pc(sorted[0]?.[0])}">${sorted[0]?.[0]||'—'}</div></div>
    <div class="stat-box"><div class="stat-label">Toss-ups</div><div class="stat-val" style="color:var(--red)">${Object.entries(D).filter(([n,d])=>getStatus(d.m,n,d)==='tossup').length}</div><div class="stat-sub">districts &lt;3pp</div></div>
  </div>

  <div style="display:grid;grid-template-columns:2fr 1fr;gap:12px;margin-bottom:12px">
    <div class="card">
      <div class="card-title"><div class="card-title-left"><span>Seat distribution — ${simResults&&!simResults._baseline?'your simulation':'baseline forecast (10k runs)'}</span></div></div>
      <div class="seat-bar">${sorted.map(([p,n])=>`<div style="width:${(n/total*100).toFixed(1)}%;background:${pc(p)}" title="${p}: ${n}"></div>`).join('')}</div>
      ${sorted.map(([p,n])=>{
        const b=HIST_NAT['2021'][p]||0;const delta=simResults?n-b:null;
        const ci=simResults&&simResults._ci?simResults._ci[p]:'';
        return `<div class="party-row">
          <div class="p-swatch" style="background:${pc(p)}"></div>
          <span class="p-name" style="color:${pc(p)}">${p}</span>
          <div class="p-bar-bg"><div class="p-bar-fill" style="width:${(n/mx*100).toFixed(0)}%;background:${pc(p)}30"></div></div>
          <span class="p-seats">${n}</span>
          ${delta!==null?`<span class="p-delta" style="color:${delta>0?'var(--green)':delta<0?'var(--red)':'var(--text3)'}">${delta>=0?'+':''}${delta}</span>`:''}
          ${ci?`<span class="p-ci">${ci}</span>`:''}
        </div>`;
      }).join('')}
    </div>
    <div class="card">
      <div class="card-title">Coalition scenarios</div>
      ${renderCoalition(seats)}
      <div class="divider"></div>
      <div class="card-title" style="margin-bottom:8px">Key alerts</div>
      ${renderAlerts(seats)}
    </div>
  </div>

  <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
    <div class="card">
      <div class="card-title">Seat evolution 2011–2026</div>
      <div class="chart-wrap"><canvas id="evol-chart"></canvas></div>
    </div>
    <div class="card">
      <div class="card-title">Top battlegrounds — all seat winners</div>
      ${Object.entries(D).map(([n,d])=>({n,...d,st:getStatus(d.m,n,d)})).filter(d=>d.st==='tossup'||d.st==='battleground').sort((a,b)=>a.m-b.m).slice(0,8).map(d=>{
        // Show ALL winning parties (all seats)
        const allWinners=rankBySeats(d.v,d.s);
        return `<div style="display:flex;align-items:center;justify-content:space-between;padding:5px 0;border-bottom:1px solid var(--border);cursor:pointer" onclick="selectDist('${d.n.replace(/'/g,"\\'")}')">
          <div style="flex:1;min-width:0">
            <div style="display:flex;align-items:center;gap:6px">
              <span style="font-size:12px;font-weight:600;color:var(--navy)">${d.n}</span>
              <span class="pill ${statusPillClass(d.st)}">+${d.m}pp</span>
            </div>
            <div class="seat-alloc">
              ${allWinners.map(p=>`<span class="seat-chip" style="background:${pc(p)}">${p}</span>`).join('')}
            </div>
          </div>
          <span style="font-size:11px;color:var(--text3);flex-shrink:0;margin-left:8px">${d.s}s</span>
        </div>`;
      }).join('')}
    </div>
  </div>`;

  document.getElementById('view-content').innerHTML=html;
  setTimeout(buildEvolChart,50);
  document.getElementById('rp-head').textContent='National Projection';
  renderRightPanel();
}

function renderCoalition(seats){
  const sorted=Object.entries(seats).filter(([,v])=>v>0).sort((a,b)=>b[1]-a[1]);
  if(!sorted.length)return'';
  const [lp,ln]=sorted[0];const s2=sorted[1],s3=sorted[2];
  return [
    {l:`${lp} solo`,n:ln},
    s2?{l:`${lp} + ${s2[0]}`,n:ln+s2[1]}:null,
    s2&&s3?{l:`+ ${s3[0]}`,n:ln+s2[1]+s3[1]}:null,
  ].filter(Boolean).map(sc=>{
    const ok=sc.n>=MAJ();const pct=Math.min(100,sc.n/MAJ()*100);
    return `<div class="coal-row">
      <span class="coal-n" style="color:${ok?'var(--green)':'var(--navy)'}">${sc.n}</span>
      <div class="coal-bar"><div class="coal-fill" style="width:${pct.toFixed(0)}%;background:${ok?'var(--green)':'var(--border2)'}"></div></div>
      <span class="coal-lbl" style="font-size:11px">${sc.l}</span>
      <span class="coal-st" style="color:${ok?'var(--green)':'var(--red)'}">${ok?'MAJORITY':'−'+(MAJ()-sc.n)}</span>
    </div>`;
  }).join('');
}

function renderAlerts(seats){
  const sorted=Object.entries(seats).filter(([,v])=>v>0).sort((a,b)=>b[1]-a[1]);
  const alerts=[];
  const lp=sorted[0]?.[0],ln=sorted[0]?.[1]||0;
  if(ln>=MAJ())alerts.push({cl:'al-green',icon:'',t:`${lp} projected majority: ${ln} seats (+${ln-MAJ()} above ${MAJ()})`});
  else alerts.push({cl:'al-red',icon:'',t:`${lp} needs coalition — ${MAJ()-ln} short of ${MAJ()}`});
  const toss=Object.values(D).filter(d=>d.m<3);
  if(toss.length)alerts.push({cl:'al-amber',icon:'',t:`${toss.length} toss-up districts · ${toss.reduce((a,d)=>a+d.s,0)} seats on knife's edge`});
  if(intelLog.length)alerts.push({cl:'al-teal',icon:'',t:`${intelLog.length} intel note(s) affecting simulation`});
  return alerts.map(a=>`<div class="alert ${a.cl}"><span class="al-icon">${a.icon}</span><span>${a.t}</span></div>`).join('');
}

//  OVERVIEW VIEWS 
function renderBattlegroundOverview(){
  document.getElementById('view-tabs').innerHTML='';
  // Sort by compScore ascending (most competitive first)
  const arr=Object.entries(D).map(([n,d])=>{
    const cs=compScore(n,d);
    return {n,...d,cs,st:getStatus(d.m,n,d)};
  }).sort((a,b)=>a.cs-b.cs);

  const critical=arr.filter(d=>d.st==='tossup');
  const battleground=arr.filter(d=>d.st==='battleground');
  const lean=arr.filter(d=>d.st==='lean');
  const safe=arr.filter(d=>d.st==='safe');

  // Strategic seat analysis: 2-seat and 3-seat districts are decisive
  const small2=arr.filter(d=>d.s===2).sort((a,b)=>a.cs-b.cs);
  const small3=arr.filter(d=>d.s===3).sort((a,b)=>a.cs-b.cs);
  const smallCritical=[...small2,...small3].filter(d=>d.st==='tossup'||d.st==='battleground').sort((a,b)=>a.cs-b.cs);
  const totalSmallSeats=small2.reduce((a,d)=>a+d.s,0)+small3.reduce((a,d)=>a+d.s,0);

  const html=`
  <div class="stat-grid" style="grid-template-columns:repeat(4,1fr);margin-bottom:12px">
    <div class="stat-box"><div class="stat-label">Critical</div><div class="stat-val" style="color:var(--red)">${critical.length}</div><div class="stat-sub">${critical.reduce((a,d)=>a+d.s,0)} seats — highest risk</div></div>
    <div class="stat-box"><div class="stat-label">Battleground</div><div class="stat-val" style="color:var(--amber)">${battleground.length}</div><div class="stat-sub">${battleground.reduce((a,d)=>a+d.s,0)} seats contested</div></div>
    <div class="stat-box"><div class="stat-label">Lean</div><div class="stat-val" style="color:var(--green)">${lean.length}</div><div class="stat-sub">${lean.reduce((a,d)=>a+d.s,0)} seats leaning</div></div>
    <div class="stat-box"><div class="stat-label">Safe</div><div class="stat-val" style="color:var(--blue)">${safe.length}</div><div class="stat-sub">${safe.reduce((a,d)=>a+d.s,0)} seats safe</div></div>
  </div>

  <!-- Strategic: 2 & 3 seat districts -->
  <div class="card" style="border-left:3px solid var(--navy)">
    <div class="card-title" style="display:flex;align-items:center;justify-content:space-between">
      <span>Strategic districts — 2 and 3 seats (${small2.length+small3.length} districts · ${totalSmallSeats} seats · ${((totalSmallSeats/305)*100).toFixed(0)}% of parliament)</span>
      <span style="font-size:10px;color:var(--red);font-weight:700">${smallCritical.length} critical/battleground</span>
    </div>
    <div style="font-size:11px;color:var(--text2);margin-bottom:10px;line-height:1.6">
      In 2-seat districts one seat goes to rank-1, the second to rank-2. In 3-seat districts, a party ranked 3rd or even 4th by votes can still win a seat depending on the spread. The danger is not margin — it's <strong>losing the last available seat to a competitor with slightly more votes</strong>.
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
      <div>
        <div style="font-size:10px;font-weight:700;text-transform:uppercase;color:var(--text3);margin-bottom:7px">2-seat districts (${small2.length}) — sorted by competitiveness</div>
        ${small2.slice(0,15).map(d=>{
          const winners=rankBySeats(d.v,d.s);
          const ranked=Object.entries(d.v).sort((a,b)=>b[1]-a[1]);
          const tot=ranked.reduce((a,[,v])=>a+v,0)||1;
          const lastW=ranked[1]?.[1]||0;
          const firstL=ranked[2]?.[1]||0;
          const gapPct=((lastW-firstL)/tot*100).toFixed(1);
          return `<div style="display:flex;align-items:center;gap:6px;padding:5px 0;border-bottom:1px solid var(--border);cursor:pointer" onclick="selectDist('${d.n.replace(/'/g,"\\'")}')">
            <span class="pill ${statusPillClass(d.st)}" style="font-size:9px;min-width:20px">${d.cs.toFixed(1)}</span>
            <span style="font-size:11px;font-weight:600;flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${d.n}</span>
            <div style="display:flex;gap:2px">${winners.map(p=>`<span class="seat-chip" style="background:${pc(p)};font-size:9px">${p}</span>`).join('')}</div>
            <span style="font-size:10px;color:${parseFloat(gapPct)<3?'var(--red)':'var(--text3)'}">${gapPct}pp</span>
          </div>`;
        }).join('')}
      </div>
      <div>
        <div style="font-size:10px;font-weight:700;text-transform:uppercase;color:var(--text3);margin-bottom:7px">3-seat districts (${small3.length}) — sorted by competitiveness</div>
        ${small3.slice(0,15).map(d=>{
          const winners=rankBySeats(d.v,d.s);
          const ranked=Object.entries(d.v).sort((a,b)=>b[1]-a[1]);
          const tot=ranked.reduce((a,[,v])=>a+v,0)||1;
          const lastW=ranked[2]?.[1]||0;
          const firstL=ranked[3]?.[1]||0;
          const gapPct=((lastW-firstL)/tot*100).toFixed(1);
          return `<div style="display:flex;align-items:center;gap:6px;padding:5px 0;border-bottom:1px solid var(--border);cursor:pointer" onclick="selectDist('${d.n.replace(/'/g,"\\'")}')">
            <span class="pill ${statusPillClass(d.st)}" style="font-size:9px;min-width:20px">${d.cs.toFixed(1)}</span>
            <span style="font-size:11px;font-weight:600;flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${d.n}</span>
            <div style="display:flex;gap:2px">${winners.map(p=>`<span class="seat-chip" style="background:${pc(p)};font-size:9px">${p}</span>`).join('')}</div>
            <span style="font-size:10px;color:${parseFloat(gapPct)<3?'var(--red)':'var(--text3)'}">${gapPct}pp</span>
          </div>`;
        }).join('')}
      </div>
    </div>
  </div>

  <!-- Full table sorted by compScore -->
  <div class="card">
    <div class="card-title">All 92 districts — ranked by competitiveness score (low = most competitive)</div>
    <table class="tbl">
      <thead><tr><th>Score</th><th>District</th><th>S</th><th>Status</th><th>2021 Winners</th><th>Margin pp</th><th>Last→1st loser pp</th><th>TO 21</th><th>Flipped</th></tr></thead>
      <tbody>${arr.map(d=>{
        const to21=(TO_MAP[d.n]||{}).to21||0;
        const allWinners=rankBySeats(d.v,d.s);
        const ranked=Object.entries(d.v).sort((a,b)=>b[1]-a[1]);
        const tot=ranked.reduce((a,[,v])=>a+v,0)||1;
        const lastW=ranked[d.s-1]?.[1]||0;
        const firstL=ranked[d.s]?.[1]||0;
        const lastGap=((lastW-firstL)/tot*100).toFixed(1);
        return `<tr onclick="selectDist('${d.n.replace(/'/g,"\\'")}')">
          <td style="font-weight:800;color:${d.st==='tossup'?'var(--red)':d.st==='battleground'?'var(--amber)':d.st==='lean'?'var(--green)':'var(--text3)'};font-family:'JetBrains Mono',monospace">${d.cs.toFixed(2)}</td>
          <td style="font-weight:700">${d.n}</td>
          <td style="text-align:center;font-weight:700">${d.s}</td>
          <td><span class="pill ${statusPillClass(d.st)}">${statusLabel(d.st)}</span></td>
          <td><div class="seat-alloc">${allWinners.map(p=>`<span class="seat-chip" style="background:${pc(p)}">${p}</span>`).join('')}</div></td>
          <td style="color:var(--text3)">+${d.m}pp</td>
          <td style="font-weight:700;color:${parseFloat(lastGap)<2?'var(--red)':parseFloat(lastGap)<5?'var(--amber)':'var(--text)'}">${lastGap}pp</td>
          <td>${to21?(to21*100).toFixed(0)+'%':'—'}</td>
          <td>${flipPill(d)?`<span style="color:var(--amber);font-size:10px">${d.w11}→${d.w21}</span>`:'—'}</td>
        </tr>`;
      }).join('')}</tbody>
    </table>
  </div>`;
  document.getElementById('view-content').innerHTML=html;
  document.getElementById('rp-head').textContent='Battleground Analysis';
  renderRightPanel();
}

// ─────────────────────────── HEAD-TO-HEAD VIEW ───────────────────────────

function renderH2HView(){
  document.getElementById('view-tabs').innerHTML='';
  const base=calcBase();
  const html=`
  <div class="card">
    <div class="card-title">Head-to-Head Analysis</div>
    <div style="display:flex;gap:10px;align-items:flex-end;flex-wrap:wrap;margin-bottom:14px">
      <div>
        <div style="font-size:10px;font-weight:600;color:var(--text3);margin-bottom:4px;text-transform:uppercase">Party A</div>
        <select id="h2h-pa" onchange="h2hPartyA=this.value;updateH2H()" style="font-size:12px;padding:5px 10px;border-radius:5px;font-weight:700;color:${pc(h2hPartyA)}">
          ${MAJOR.map(p=>`<option value="${p}" ${h2hPartyA===p?'selected':''}>${p}</option>`).join('')}
        </select>
      </div>
      <div>
        <div style="font-size:10px;font-weight:600;color:var(--text3);margin-bottom:4px;text-transform:uppercase">Party B</div>
        <select id="h2h-pb" onchange="h2hPartyB=this.value;updateH2H()" style="font-size:12px;padding:5px 10px;border-radius:5px;font-weight:700;color:${pc(h2hPartyB)}">
          ${MAJOR.map(p=>`<option value="${p}" ${h2hPartyB===p?'selected':''}>${p}</option>`).join('')}
        </select>
      </div>
      <div>
        <div style="font-size:10px;font-weight:600;color:var(--text3);margin-bottom:4px;text-transform:uppercase">Party C (optional)</div>
        <select id="h2h-pc" onchange="h2hPartyC=this.value;updateH2H()" style="font-size:12px;padding:5px 10px;border-radius:5px">
          <option value="">None</option>
          ${MAJOR.map(p=>`<option value="${p}" ${h2hPartyC===p?'selected':''}>${p}</option>`).join('')}
        </select>
      </div>
      <div style="border-left:1px solid var(--border);padding-left:10px">
        <div style="font-size:10px;font-weight:600;color:var(--text3);margin-bottom:4px;text-transform:uppercase">Scope</div>
        <div style="display:flex;gap:5px">
          <button onclick="h2hScope='national';document.getElementById('h2h-dist-pick').style.display='none';updateH2H()" id="h2h-nat-btn" style="font-size:11px;padding:4px 10px;background:var(--navy);color:#fff;border:none;border-radius:4px;cursor:pointer;font-family:Inter,sans-serif">National</button>
          <button onclick="h2hScope='district';document.getElementById('h2h-dist-pick').style.display='block';updateH2H()" id="h2h-dist-btn" style="font-size:11px;padding:4px 10px;background:var(--surface2);color:var(--text2);border:1px solid var(--border);border-radius:4px;cursor:pointer;font-family:Inter,sans-serif">District</button>
        </div>
      </div>
      <div id="h2h-dist-pick" style="display:none">
        <div style="font-size:10px;font-weight:600;color:var(--text3);margin-bottom:4px;text-transform:uppercase">District</div>
        <select id="h2h-dist-sel" onchange="h2hDistrict=this.value;updateH2H()" style="font-size:11px;padding:5px 8px">
          <option value="">Choose district...</option>
          ${Object.keys(D).sort().map(n=>`<option value="${n}" ${h2hDistrict===n?'selected':''}>${n}</option>`).join('')}
        </select>
      </div>
    </div>
    <div id="h2h-content">${buildH2HContent()}</div>
  </div>`;
  document.getElementById('view-content').innerHTML=html;
  document.getElementById('rp-head').textContent='Head-to-Head';
  renderRightPanel();
}

function updateH2H(){
  const el=document.getElementById('h2h-content');
  if(el)el.innerHTML=buildH2HContent();
}

function buildH2HContent(){
  const parties=[h2hPartyA,h2hPartyB,...(h2hPartyC?[h2hPartyC]:[])].filter(Boolean);
  if(new Set(parties).size < parties.length)return'<div style="color:var(--red);font-size:12px;padding:10px">Select distinct parties</div>';
  if(h2hScope==='district'){
    if(!h2hDistrict)return'<div style="font-size:12px;color:var(--text3);padding:10px">Select a district above</div>';
    return buildH2HDistrict(parties, h2hDistrict);
  }
  return buildH2HNational(parties);
}

function buildH2HNational(parties){
  const base=calcBase();
  const sim=simResults?simResults._national:base;

  // Aggregate vote data across all districts
  const totVotes={};
  let grandTotal=0;
  parties.forEach(p=>{totVotes[p]=0;});
  Object.values(D).forEach(d=>{
    const tot=Object.values(d.v).reduce((a,b)=>a+b,0)||1;
    parties.forEach(p=>{totVotes[p]+=(d.v[p]||0);});
    grandTotal+=tot;
  });

  // Only include districts where at least one of the selected parties is competing for the LAST seat
  // i.e. one party is rank=s (last winner) or rank=s+1 (first loser) with small gap
  const distResults=Object.entries(D).map(([n,d])=>{
    const cs=compScore(n,d);
    const ranked=Object.entries(d.v).sort((a,b)=>b[1]-a[1]);
    const tot=Object.values(d.v).reduce((a,b)=>a+b,0)||1;
    const winners=rankBySeats(d.v,d.s);
    const pSeats={};parties.forEach(p=>{pSeats[p]=winners.filter(x=>x===p).length;});
    const pPct={};parties.forEach(p=>{pPct[p]=(d.v[p]||0)/tot*100;});
    const topAmong=parties.slice().sort((a,b)=>(d.v[b]||0)-(d.v[a]||0));
    const leader=topAmong[0];
    const gap2=parties.length>1?(pPct[topAmong[0]]-pPct[topAmong[1]]).toFixed(1):null;
    const lastSeatWinner=ranked[d.s-1]?.[0];
    const firstLoser=ranked[d.s]?.[0];
    const lastGap=((ranked[d.s-1]?.[1]||0)-(ranked[d.s]?.[1]||0))/tot*100;
    // A party "competes for last seat" if it is the last winner OR the first loser
    const lastSeatContestants=new Set([lastSeatWinner,firstLoser]);
    const isLastSeatContest=parties.some(p=>lastSeatContestants.has(p));
    const gapPp=lastGap.toFixed(1);
    const seatDanger=parties.some(p=>p===firstLoser&&lastGap<5);
    return {n,d,s:d.s,cs,st:getStatus(d.m,n,d),winners,pSeats,pPct,leader,gap2,seatDanger,lastSeatWinner,firstLoser,lastGap,gapPp,isLastSeatContest};
  }).filter(r=>r.isLastSeatContest).sort((a,b)=>a.lastGap-b.lastGap);

  // Head-to-head stats
  const h2hStats={};
  parties.forEach(p=>{
    h2hStats[p]={
      seats:sim[p]||0,
      votes:totVotes[p],
      votePct:(totVotes[p]/grandTotal*100).toFixed(1),
      distWon:distResults.filter(d=>d.pSeats[p]>0).length,
      dominated:distResults.filter(d=>d.pSeats[p]===d.s).length,
      seatDanger:distResults.filter(d=>d.seatDanger&&d.pSeats[p]===0&&Object.values(d.pSeats).some(n=>n>0)).length,
      leads:distResults.filter(d=>d.leader===p).length,
    };
  });

  // Where each party is ahead among selected parties (by pct)
  const aLeadsAll=distResults.filter(d=>d.leader===parties[0]);
  const bLeadsAll=distResults.filter(d=>d.leader===parties[1]);
  const cLeadsAll=parties[2]?distResults.filter(d=>d.leader===parties[2]):[];

  const colorBar=(p,pct)=>`<div style="height:8px;border-radius:4px;background:${pc(p)};width:${Math.min(100,pct*2)}%;display:inline-block"></div>`;

  return `
  <!-- Summary cards -->
  <div style="display:grid;grid-template-columns:${parties.map(()=>'1fr').join(' ')};gap:10px;margin-bottom:14px">
    ${parties.map(p=>{
      const s=h2hStats[p];
      return `<div style="padding:12px;border-radius:8px;border:2px solid ${pc(p)};background:${pc(p)}10">
        <div style="font-size:18px;font-weight:900;color:${pc(p)};margin-bottom:2px">${p}</div>
        <div style="font-size:24px;font-weight:800;color:var(--navy)">${s.seats}<span style="font-size:12px;font-weight:500;color:var(--text3)"> seats</span></div>
        <div style="font-size:12px;color:var(--text2);margin-top:4px">${s.votePct}% national votes</div>
        <div style="font-size:11px;color:var(--text3);margin-top:3px">Leads in ${s.leads} districts · Won ${s.distWon}</div>
        ${s.dominated>0?`<div style="font-size:11px;color:var(--green);margin-top:2px">${s.dominated} dominated</div>`:''}
      </div>`;
    }).join('')}
  </div>

  <!-- Strategic insight -->
  <div style="padding:10px 14px;background:var(--navy);color:#fff;border-radius:7px;margin-bottom:12px;font-size:12px;line-height:1.7">
    ${buildH2HInsight(parties,distResults,h2hStats,sim)}
  </div>

  <!-- Danger districts: party about to lose a seat to competitor -->
  ${distResults.filter(d=>d.seatDanger).length>0?`
  <div class="card" style="border-left:3px solid var(--red);margin-bottom:10px">
    <div class="card-title" style="color:var(--red)">Seat-loss danger zones — last seat within 5pp of a competitor</div>
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px">
      ${distResults.filter(d=>d.seatDanger).slice(0,9).map(d=>`
      <div style="padding:7px 9px;background:var(--red-bg);border:1px solid #fecaca;border-radius:5px;cursor:pointer" onclick="selectDist('${d.n.replace(/'/g,"\\'")}')">
        <div style="font-size:11px;font-weight:700;margin-bottom:3px">${d.n}</div>
        <div style="font-size:10px;color:var(--text3)">${d.s}s · score ${d.cs.toFixed(1)}</div>
        <div style="display:flex;gap:3px;margin-top:3px;flex-wrap:wrap">
          ${parties.map(p=>`<span style="font-size:10px;color:${pc(p)};font-weight:700">${p}:${d.pSeats[p]}s(${d.pPct[p].toFixed(0)}%)</span>`).join(' ')}
        </div>
        <div style="font-size:10px;color:var(--red);margin-top:2px">Last seat→${d.lastSeatWinner} | 1st loser→${d.firstLoser} | gap ${d.lastGap.toFixed(1)}pp</div>
      </div>`).join('')}
    </div>
  </div>`:''}

  <!-- District breakdown table -->
  <div class="card">
    <div class="card-title">District-by-district breakdown — sorted by competitiveness score</div>
    <table class="tbl">
      <thead><tr>
        <th>Score</th><th>District</th><th>S</th>
        ${parties.map(p=>`<th style="color:${pc(p)}">${p} %</th><th style="color:${pc(p)}">${p} seats</th>`).join('')}
        <th>Leader</th><th>Gap A↔B</th><th>Status</th>
      </tr></thead>
      <tbody>${distResults.map(d=>`<tr onclick="selectDist('${d.n.replace(/'/g,"\\'")}')">
        <td style="font-family:'JetBrains Mono',monospace;font-weight:700;color:${d.st==='tossup'?'var(--red)':d.st==='battleground'?'var(--amber)':'var(--text3)'}">${d.cs.toFixed(1)}</td>
        <td style="font-weight:600">${d.n}</td>
        <td style="text-align:center">${d.s}</td>
        ${parties.map(p=>`
          <td style="color:${pc(p)};font-weight:600">${d.pPct[p].toFixed(1)}%</td>
          <td style="text-align:center">${d.pSeats[p]>0?`<span class="seat-chip" style="background:${pc(p)}">${d.pSeats[p]}</span>`:'—'}</td>
        `).join('')}
        <td style="color:${pc(d.leader)};font-weight:700">${d.leader}</td>
        <td style="color:${parseFloat(d.gap2)<3?'var(--red)':parseFloat(d.gap2)<8?'var(--amber)':'var(--text3)'}">${d.gap2!==null?d.gap2+'pp':'—'}</td>
        <td><span class="pill ${statusPillClass(d.st)}">${statusLabel(d.st)}</span></td>
      </tr>`).join('')}</tbody>
    </table>
  </div>`;
}

function buildH2HDistrict(parties, distName){
  const d=D[distName];
  if(!d)return'<div style="color:var(--red)">District not found</div>';
  const tot=Object.values(d.v).reduce((a,b)=>a+b,0)||1;
  const ranked=Object.entries(d.v).sort((a,b)=>b[1]-a[1]);
  const winners=rankBySeats(d.v,d.s);
  const cs=compScore(distName,d);
  const st=getStatus(d.m,distName,d);
  const pData=parties.map(p=>({
    p,
    votes:d.v[p]||0,
    pct:((d.v[p]||0)/tot*100),
    rank:ranked.findIndex(([x])=>x===p)+1,
    seats:winners.filter(x=>x===p).length,
  })).sort((a,b)=>b.votes-a.votes);

  // Last seat analysis
  const lastSeatPos=d.s;
  const lastWinner=ranked[lastSeatPos-1];
  const firstLoser=ranked[lastSeatPos];
  const lastGap=lastWinner&&firstLoser?(lastWinner[1]-firstLoser[1])/tot*100:0;
  const communes=COMMUNES[distName]||[];
  const communeCount=communes.length;

  // Commune breakdown per party
  const commByWinner={};
  parties.forEach(p=>{commByWinner[p]=communes.filter(c=>c.w===p);});

  return `
  <div style="display:grid;grid-template-columns:${parties.map(()=>'1fr').join(' ')};gap:10px;margin-bottom:14px">
    ${pData.map(({p,votes,pct,rank,seats})=>`
    <div style="padding:12px;border-radius:8px;border:2px solid ${pc(p)};background:${pc(p)}10">
      <div style="font-size:20px;font-weight:900;color:${pc(p)}">${p}</div>
      <div style="font-size:28px;font-weight:800;color:var(--navy)">${pct.toFixed(1)}<span style="font-size:13px">%</span></div>
      <div style="font-size:12px;color:var(--text2)">${votes.toLocaleString()} votes · rank #${rank}</div>
      <div style="margin-top:6px">
        ${seats>0?`<span style="font-size:13px;font-weight:800;color:var(--green)">${seats} seat${seats>1?'s':''} WON</span>`:
          rank===d.s+1?`<span style="font-size:12px;font-weight:700;color:var(--red)">0 seats — FIRST LOSER</span>`:
          `<span style="font-size:12px;color:var(--text3)">0 seats (rank #${rank})</span>`}
      </div>
    </div>`).join('')}
  </div>

  <!-- District context -->
  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-bottom:12px">
    <div class="stat-box"><div class="stat-label">Seats</div><div class="stat-val">${d.s}</div></div>
    <div class="stat-box"><div class="stat-label">Comp. score</div><div class="stat-val" style="color:${st==='tossup'?'var(--red)':st==='battleground'?'var(--amber)':'var(--green)'}">${cs.toFixed(2)}</div></div>
    <div class="stat-box"><div class="stat-label">Last→1st loser</div><div class="stat-val" style="color:${lastGap<3?'var(--red)':'var(--text'}">${lastGap.toFixed(1)}pp</div><div class="stat-sub">${lastWinner?.[0]}→${firstLoser?.[0]}</div></div>
    <div class="stat-box"><div class="stat-label">Communes</div><div class="stat-val">${communeCount}</div></div>
  </div>

  <!-- Seat position analysis -->
  <div style="padding:11px 14px;background:var(--navy);color:#fff;border-radius:7px;margin-bottom:12px;font-size:12px;line-height:1.8">
    <strong>Full ranking in ${distName} (${d.s} seats):</strong><br>
    ${ranked.slice(0,Math.min(ranked.length,8)).map(([p,v],i)=>{
      const isParty=parties.includes(p);
      const isSeatWinner=i<d.s;
      return `<span style="color:${isParty?pc(p):'#94a3b8'};font-weight:${isParty?'800':'400'}">${i+1}. ${p} ${(v/tot*100).toFixed(1)}%${isSeatWinner?' ✓':i===d.s?' ← CUTOFF':''}</span>`;
    }).join('  ')}
    <br><br>${buildH2HDistrictInsight(parties,pData,d,distName,lastGap,lastWinner,firstLoser)}
  </div>

  <!-- Full vote ranking -->
  <div class="card">
    <div class="card-title">Full vote ranking — ${distName}</div>
    ${ranked.map(([p,v],i)=>{
      const pct=v/tot*100;
      const isParty=parties.includes(p);
      const isSeat=i<d.s;
      return `<div style="display:flex;align-items:center;gap:8px;padding:5px 0;border-bottom:1px solid var(--border);${isParty?'font-weight:700':'opacity:.7'}">
        <span style="font-size:11px;min-width:16px;color:var(--text3)">${i+1}</span>
        <div style="width:8px;height:8px;border-radius:2px;background:${pc(p)};flex-shrink:0"></div>
        <span style="font-size:12px;min-width:30px;color:${pc(p)}">${p}</span>
        <div style="flex:1;height:6px;background:var(--border);border-radius:3px">
          <div style="height:100%;width:${(pct/ranked[0][1]*tot*100/tot).toFixed(1)}%;background:${pc(p)};border-radius:3px;min-width:2px"></div>
        </div>
        <span style="font-size:12px;min-width:40px;text-align:right">${pct.toFixed(1)}%</span>
        <span style="font-size:11px;min-width:65px;color:var(--text3)">${v.toLocaleString()}</span>
        ${isSeat?`<span style="font-size:10px;color:var(--green);font-weight:700">SEAT ${i+1}</span>`:`<span style="font-size:10px;color:${i===d.s?'var(--red)':'var(--text3)'}">${i===d.s?'CUTOFF':''}</span>`}
      </div>`;
    }).join('')}
  </div>

  <!-- Commune breakdown per party -->
  ${communeCount>0?`<div class="card">
    <div class="card-title">Commune strongholds per party in ${distName}</div>
    <div style="display:grid;grid-template-columns:${parties.map(()=>'1fr').join(' ')};gap:10px">
      ${parties.map(p=>{
        const won=communes.filter(c=>c.w===p).sort((a,b)=>b.t-a.t);
        return `<div>
          <div style="font-size:11px;font-weight:700;color:${pc(p)};margin-bottom:6px">${p} — ${won.length} communes won</div>
          ${won.slice(0,8).map(c=>`<div style="font-size:10px;padding:3px 0;border-bottom:1px solid var(--border)">${c.n}<span style="float:right;color:var(--text3)">${c.m.toFixed(1)}pp</span></div>`).join('')}
          ${won.length>8?`<div style="font-size:10px;color:var(--text3);margin-top:3px">+${won.length-8} more</div>`:''}
        </div>`;
      }).join('')}
    </div>
  </div>`:''}`;
}

function buildH2HInsight(parties,distResults,stats,sim){
  const A=parties[0],B=parties[1],C=parties[2];
  const aSeats=stats[A].seats,bSeats=stats[B].seats;
  const diff=aSeats-bSeats;
  const aLeads=distResults.filter(d=>d.leader===A).length;
  const bLeads=distResults.filter(d=>d.leader===B).length;
  // Find districts where A leads but by less than 5pp (vulnerable)
  const aVuln=distResults.filter(d=>d.leader===A&&d.gap2!==null&&parseFloat(d.gap2)<5&&(d.st==='tossup'||d.st==='battleground'));
  const bVuln=distResults.filter(d=>d.leader===B&&d.gap2!==null&&parseFloat(d.gap2)<5&&(d.st==='tossup'||d.st==='battleground'));
  // Districts where A could flip from B (B leads, margin small)
  const aFlipTargets=distResults.filter(d=>d.leader===B&&d.gap2!==null&&parseFloat(d.gap2)<8&&d.pPct[A]>0.1).sort((a,b)=>parseFloat(a.gap2)-parseFloat(b.gap2));
  const small23Critical=distResults.filter(d=>(d.s===2||d.s===3)&&(d.st==='tossup'||d.st==='battleground'));

  let txt=`<strong style="color:#fff">${A} vs ${B}${C?' vs '+C:''} — National Picture</strong><br>`;
  txt+=`${A} projects <strong>${aSeats} seats</strong> vs ${B} <strong>${bSeats} seats</strong> (${diff>0?A+' ahead by '+diff:diff<0?B+' ahead by '+Math.abs(diff):'tied'}).  `;
  txt+=`${A} leads in ${aLeads} districts, ${B} in ${bLeads} districts. `;
  if(C)txt+=`${C} leads in ${stats[C].leads} districts. `;
  txt+=`<br>`;
  if(aVuln.length)txt+=`<strong style="color:#fca5a5">${A} defense alert:</strong> ${aVuln.length} district(s) where ${A} leads but gap under 5pp — ${aVuln.slice(0,3).map(d=>d.n.split(' ')[0]).join(', ')}. `;
  if(aFlipTargets.length)txt+=`<strong style="color:#86efac">${A} flip targets:</strong> ${aFlipTargets.slice(0,3).map(d=>d.n.split(' ')[0]+' ('+d.gap2+'pp)').join(', ')}. `;
  if(small23Critical.length)txt+=`<br><strong style="color:#fcd34d">Key small districts (2–3 seats) in play:</strong> ${small23Critical.slice(0,5).map(d=>d.n.split(' ')[0]+'('+d.s+'s)').join(', ')} — these decide the global balance.`;
  return txt;
}

function buildH2HDistrictInsight(parties,pData,d,name,lastGap,lastWinner,firstLoser){
  const winners=rankBySeats(d.v,d.s);
  const lines=[];
  // Each party's strategic position
  pData.forEach(({p,seats,rank,pct})=>{
    if(seats>0){
      lines.push(`<strong style="color:${pc(p)}">${p}</strong> holds ${seats} seat(s) from rank #${rank} (${pct.toFixed(1)}%).`);
      if(d.s<=3&&rank>1)lines.push(`In a ${d.s}-seat district, ${p} is vulnerable to losing that seat if competitors gain ~${((pct-((d.v[winners[seats-1]]||0)/Object.values(d.v).reduce((a,b)=>a+b,0)*100)).toFixed(1))}pp.`);
    } else {
      lines.push(`<strong style="color:${pc(p)}">${p}</strong> has 0 seats (rank #${rank}, ${pct.toFixed(1)}%).`);
      if(rank===d.s+1)lines.push(`${p} is the FIRST LOSER — needs only ${lastGap.toFixed(1)}pp more to take the last seat from ${lastWinner?.[0]}.`);
      else lines.push(`${p} needs to close ${((d.v[winners[d.s-1]]||0)/Object.values(d.v).reduce((a,b)=>a+b,0)*100-pct).toFixed(1)}pp to contest the last seat.`);
    }
  });
  return lines.join(' ');
}

function renderHistoryOverview(){
  document.getElementById('view-tabs').innerHTML='';
  const html=`
  <div class="stat-grid">
    <div class="stat-box"><div class="stat-label">2011 Winner</div><div class="stat-val" style="color:${pc('PJD')}">PJD</div><div class="stat-sub">59 seats</div></div>
    <div class="stat-box"><div class="stat-label">2016 Winner</div><div class="stat-val" style="color:${pc('PAM')}">PAM</div><div class="stat-sub">77 seats</div></div>
    <div class="stat-box"><div class="stat-label">2021 Winner</div><div class="stat-val" style="color:${pc('RNI')}">RNI</div><div class="stat-sub">87 seats</div></div>
    <div class="stat-box"><div class="stat-label">Districts flipped</div><div class="stat-val">${Object.keys(D).filter(n=>D[n].w11&&D[n].w21&&D[n].w11!==D[n].w21).length}</div><div class="stat-sub">2011→2021</div></div>
  </div>
  <div class="card">
    <div class="card-title">Party trajectory 2011–2021</div>
    ${MAJOR.map(p=>{
      const vals=['2011','2015','2016','2021'].map(y=>HIST_NAT[y][p]||0);
      const mx=Math.max(...vals,1);const trend=vals[3]-vals[0];
      return `<div style="margin-bottom:10px">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:4px">
          <span style="font-size:12px;font-weight:700;color:${pc(p)}">${p}</span>
          <div style="display:flex;gap:5px;align-items:center">
            ${vals.map((v,i)=>`<span style="font-size:11px;min-width:28px;text-align:center;font-family:'JetBrains Mono',monospace">${v||'—'}</span>`).join('')}
            <span style="font-size:11px;min-width:36px;text-align:right;color:${trend>5?'var(--green)':trend<-5?'var(--red)':'var(--text3)'}">→${vals[3]}</span>
          </div>
        </div>
        <div style="display:flex;gap:3px;height:6px">
          ${vals.map((v,i)=>`<div style="flex:1;background:${pc(p)};opacity:${.2+i*.25};border-radius:2px;height:${v>0?Math.max(3,v/mx*100)+'%':'3px'};align-self:flex-end"></div>`).join('')}
        </div>
      </div>`;
    }).join('')}
    <div style="display:flex;gap:4px;justify-content:space-around;margin-top:4px">
      ${['2011','2015','2016','2021'].map(y=>`<span style="font-size:10px;color:var(--text3);text-align:center;flex:1">${y}</span>`).join('')}
      <span style="font-size:10px;flex:1"></span>
    </div>
  </div>`;
  document.getElementById('view-content').innerHTML=html;
}

function renderIntelView(){
  document.getElementById('view-tabs').innerHTML='';
  const catC={coalition:'var(--blue)',ground:'var(--green)',candidate:'var(--navy)',turnout:'var(--amber)',swing:'var(--teal)',risk:'var(--red)',finance:'var(--amber)',sap:'#0891b2'};
  const html=`
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
    <div class="card">
      <div class="card-title">Add political intel</div>
      <input type="text" id="intel-dist" placeholder="District / commune..." style="margin-bottom:6px">
      <select id="intel-cat" style="margin-bottom:6px">
        <option value="coalition">Coalition dynamics</option>
        <option value="ground">Ground intel</option>
        <option value="candidate">Candidate quality</option>
        <option value="turnout">Turnout factor</option>
        <option value="swing">Swing estimate</option>
        <option value="risk">Risk / spoiler</option>
        <option value="finance">Finance / resources</option>
        <option value="sap">JSAP / youth movement</option>
      </select>
      <textarea id="intel-text" placeholder="Your political intelligence..."></textarea>
      <div style="display:flex;gap:6px;margin-top:8px">
        <button class="btn primary" onclick="addIntelGlobal()" style="flex:1">Add intel +</button>
        <button class="btn" onclick="aiIntel()">AI Brief ↗</button>
      </div>
      <div class="divider"></div>
      <div class="card-title" style="margin-bottom:6px">Intel impact on simulation</div>
      <div id="intel-impact" style="font-size:11px;color:var(--text2)">${intelLog.length?'Intel notes are adjusting district weights when simulation runs.':'No intel yet — notes will affect simulation weights when added.'}</div>
    </div>
    <div class="card">
      <div class="card-title">Intel log (<span id="intel-cnt-view">${intelLog.length}</span>)</div>
      <div id="intel-log-view" style="max-height:400px;overflow-y:auto">
        ${intelLog.length?intelLog.slice().reverse().map(e=>`
          <div class="intel-entry" style="border-color:${catC[e.cat]||'var(--teal)'}">
            <div class="intel-meta">${e.cat.toUpperCase()} · ${e.dist||'National'} · ${e.time}</div>
            <div class="intel-text">${e.text}</div>
          </div>`).join(''):'<span style="font-size:11px;color:var(--text3)">No intel yet.</span>'}
      </div>
    </div>
  </div>`;
  document.getElementById('view-content').innerHTML=html;
}

function addIntelGlobal(){
  const dist=document.getElementById('intel-dist')?.value.trim();
  const cat=document.getElementById('intel-cat')?.value||'ground';
  const text=document.getElementById('intel-text')?.value.trim();
  if(!text)return;
  intelLog.push({dist:dist||'National',cat,text,time:new Date().toLocaleTimeString(),id:Date.now()});
  document.getElementById('intel-dist').value='';document.getElementById('intel-text').value='';
  document.getElementById('intel-cnt').textContent=intelLog.length;
  renderIntelView();
}

function aiIntel(){
  const base=calcBase();
  const sim=simResults?Object.fromEntries(MAJOR.map(p=>[p,simResults._national[p]||0])):base;
  const seats=MAJOR.map(p=>`${p}:${sim[p]||0}`).join(', ');
  const intel=intelLog.length?intelLog.map(e=>`[${e.cat}-${e.dist||'National'}]: ${e.text}`).join('\n'):'No intel.';
  const toss=Object.entries(D).filter(([,d])=>d.m<3).map(([n,d])=>`${n}(${d.s}s,${d.w21}+${d.m}pp)`).join('; ');
  const prompt=`POLINTEL Morocco 2026.\nSeats (305 total, maj=153): ${seats}\nToss-ups: ${toss||'none'}\nIntel:\n${intel}\n\nProvide: 1) Strategic implications, 2) Districts to reprioritize, 3) Coalition scenarios, 4) Key recommendations.`;
  if(window.sendPrompt)sendPrompt(prompt);
  else{const ta=document.createElement('textarea');ta.value=prompt;document.body.appendChild(ta);ta.select();document.execCommand('copy');document.body.removeChild(ta);alert('Analysis prompt copied!');}
}

function renderJSAPview(){
  document.getElementById('view-tabs').innerHTML='';
  const sapArr=Object.entries(D).map(([n,d])=>({n,...d,sap:getJSAPscore(d,n),to21:(TO_MAP[n]||{}).to21||0.45})).sort((a,b)=>b.sap-a.sap);
  const html=`
  <div class="sap-card">
    <div class="sap-title"> JSAP — Jeunes Sans Appartenance Politique</div>
    <div class="sap-desc">The JSAP (Jeunes Sans Appartenance Politique) model represents youth-driven independent campaigns that can mobilize disengaged urban voters. These campaigns target districts with low legislative turnout, high youth concentration, and low partisan loyalty — capturing the non-voting electorate that no traditional party currently reaches.</div>
    <div class="slider-row">
      <span class="slider-label">Force</span>
      <input type="range" min="0" max="20" step="1" value="${jsapForce}" id="jsap-force-slider" oninput="jsapForce=parseInt(this.value);document.getElementById('jsap-force-v').textContent=this.value+'%';renderJSAPview()">
      <span class="slider-val" id="jsap-force-v">${jsapForce}%</span>
    </div>
    <div style="font-size:11px;color:var(--text2)">% of mobilizable non-voters captured by JSAP movement</div>
  </div>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
    <div class="card">
      <div class="card-title">Top JSAP-fertile districts</div>
      ${sapArr.slice(0,15).map((d,i)=>{
        const to=(TO_MAP[d.n]||{});
        const voixAdd=to.voixAdd||0;
        const jsapVotes=Math.round(voixAdd*(jsapForce/100));
        const ranked=Object.entries(d.v||{}).sort((a,b)=>b[1]-a[1]);
        const lastWinner=ranked[d.s-1];
        const firstLoser=ranked[d.s];
        const tot=Object.values(d.v||{}).reduce((a,b)=>a+b,0)||1;
        const lastGap=lastWinner&&firstLoser?((lastWinner[1]-firstLoser[1])/tot*100).toFixed(1):'?';
        return `<div style="border-bottom:1px solid var(--border);padding:6px 0" id="jsap-row-${i}">
          <div style="display:flex;align-items:center;justify-content:space-between;cursor:pointer" onclick="toggleJSAPDetail('jsap-detail-${i}')">
            <div>
              <div style="font-size:12px;font-weight:600;color:var(--navy)">${d.n}</div>
              <div style="font-size:10px;color:var(--text3);margin-top:1px">Youth ${d.yth||14}% · TO ${(d.to21*100).toFixed(0)}% · ${d.u?'Urban':'Rural'}</div>
            </div>
            <div style="display:flex;gap:6px;align-items:center">
              <div class="pill" style="background:#f0fdfa;color:#0891b2">${(d.sap*100).toFixed(0)}%</div>
              <span style="font-size:10px;color:var(--text3)">▼</span>
            </div>
          </div>
          <div id="jsap-detail-${i}" style="display:none;margin-top:8px;padding:8px 10px;background:#f0fdfa;border-radius:6px;font-size:11px">
            <div style="font-weight:700;color:#0891b2;margin-bottom:6px">Why fertile for JSAP</div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:4px">
              <div>🗳️ TO 2021: <strong>${(d.to21*100).toFixed(0)}%</strong> ${d.to21<0.35?'⚡ Very low':d.to21<0.45?'↓ Low':''}</div>
              <div>👥 Youth: <strong>${d.yth||14}%</strong> ${(d.yth||14)>18?'⚡ High':''}</div>
              <div>🏙️ Type: <strong>${d.u?'Urban':'Rural'}</strong></div>
              <div>💪 Mobilizable: <strong>~${voixAdd.toLocaleString()}</strong> votes</div>
              <div>📊 Last seat gap: <strong>${lastGap}pp</strong></div>
              <div>🎯 JSAP at ${jsapForce}%: <strong>+${jsapVotes.toLocaleString()} votes</strong></div>
            </div>
            ${jsapForce>0&&lastWinner?`<div style="margin-top:6px;color:#0891b2">At current force, JSAP could erase the ${lastGap}pp gap between ${lastWinner[0]} and ${firstLoser?firstLoser[0]:'next party'}.</div>`:''}
            <div style="margin-top:6px"><a href="#" onclick="event.preventDefault();selectDist('${d.n.replace(/'/g,"\\'")}')" style="color:#0891b2;font-weight:600">View full district profile →</a></div>
          </div>
        </div>`;}).join('')}
    </div>
    <div class="card">
      <div class="card-title">JJSAP model parameters</div>
      <p style="font-size:12px;color:var(--text2);line-height:1.7;margin-bottom:12px">
        The model scores each district on three dimensions: <strong>low legislative turnout</strong> (urban districts where TO &lt;35% signal untapped potential), <strong>youth concentration</strong> (districts where 20–24 year olds represent &gt;18% of eligibles), and <strong>urban density</strong> (allowing rapid network mobilization).
      </p>
      <div class="score-bar"><span class="score-label">Turnout weight</span><div class="score-track"><div class="score-fill" style="width:40%;background:var(--teal)"></div></div><span class="score-val">40%</span></div>
      <div class="score-bar"><span class="score-label">Youth weight</span><div class="score-track"><div class="score-fill" style="width:35%;background:#0891b2"></div></div><span class="score-val">35%</span></div>
      <div class="score-bar"><span class="score-label">Urban weight</span><div class="score-track"><div class="score-fill" style="width:25%;background:#0891b2"></div></div><span class="score-val">25%</span></div>
      <div class="divider"></div>
      <div style="font-size:11px;color:var(--text2)">At ${jsapForce}% force, JSAP could ${jsapForce===0?'not affect':'capture votes in'} the most fertile districts. <strong>Run simulation</strong> to see seat-level impact.</div>
      ${jsapForce>0?`<div class="alert al-teal" style="margin-top:8px"><span class="al-icon"></span><span>JSAP at ${jsapForce}% force is active in simulation. Urban districts with youth &gt;20% will see significant disruption to traditional party seats.</span></div>`:''}
    </div>
  </div>`;
  document.getElementById('view-content').innerHTML=html;
}

function toggleJSAPDetail(id){
  const el=document.getElementById(id);
  if(el)el.style.display=el.style.display==='none'?'block':'none';
}

function renderFilteredView(type,dists){
  const labels={tossup:'Toss-up districts',battleground:'Battleground districts',flips:'Flipped districts',highpot:'High mobilization potential'};
  document.getElementById('view-tabs').innerHTML='';
  const html=`
  <div class="card">
    <div class="card-title">${labels[type]||type} (${dists.length})</div>
    ${dists.map(([n,d])=>{
      const to=(TO_MAP[n]||{}).to21||0;
      const sortedV=Object.entries(d.v).sort((a,b)=>b[1]-a[1]);
      return `<div style="display:flex;align-items:center;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--border);cursor:pointer" onclick="selectDist('${n.replace(/'/g,"\\'")}')">
        <div>
          <span style="font-size:13px;font-weight:700;color:var(--navy)">${n}</span>
          <span style="font-size:11px;color:var(--text3);margin-left:8px">${d.s} seats · ${d.r}</span>
        </div>
        <div style="display:flex;gap:6px;align-items:center">
          <span style="font-size:12px;font-weight:700;color:${pc(d.w21)}">${d.w21}</span>
          <span class="pill ${statusPillClass(getStatus(d.m,n,d))}">+${d.m}pp</span>
          ${flipPill(d)?`<span class="pill pill-amber">→ ${d.w11}→${d.w21}</span>`:''}
          <span style="font-size:11px;color:var(--text3)">${to?(to*100).toFixed(0)+'% TO':''}</span>
        </div>
      </div>`;
    }).join('')}
  </div>`;
  document.getElementById('view-content').innerHTML=html;
}

//  SIMULATION 
function getEffTO(d,name){
  const tNat=(parseInt(document.getElementById('t-nat-rp')?.value)||0)/100;
  const tUrb=parseFloat(document.getElementById('t-urb-rp')?.value)||1;
  const tRur=parseFloat(document.getElementById('t-rur-rp')?.value)||1;
  const tYth=(parseFloat(document.getElementById('t-yth-rp')?.value)||0)/100;
  const base=(TO_MAP[name]||{}).to_leg||(TO_MAP[name]||{}).to21||d.to||0.45;
  let t=base+tNat;
  t*=d.u?tUrb:tRur;
  t+=tYth*(d.u?0.6:0.25);
  return Math.min(0.95,Math.max(0.08,t));
}

function getSimWinner(name){
  if(!simResults||!simResults[name])return D[name]?.w21||'?';
  return simResults[name].seats?.[0]||D[name]?.w21||'?';
}

function getOrgaAdj(name){
  // Returns {party: multiplier} based on orga scores
  const adj={};
  MAJOR.forEach(p=>{
    const communes=COMMUNES[name]||[];
    adj[p]=getOrgaVoteAdj(p,name,communes);
  });
  return adj;
}

function getIntelAdj(name){
  const adj={};MAJOR.forEach(p=>adj[p]=0);
  intelLog.forEach(intel=>{
    const distMatch=!intel.dist||intel.dist==='National'||name.toLowerCase().includes(intel.dist.toLowerCase().slice(0,5));
    if(!distMatch)return;
    MAJOR.forEach(p=>{
      const txt=intel.text.toLowerCase();
      if(txt.includes(p.toLowerCase())){
        if(intel.cat==='swing'&&(txt.includes('gain')||txt.includes('up')||txt.includes('+')))adj[p]+=1;
        if(intel.cat==='swing'&&(txt.includes('lose')||txt.includes('down')||txt.includes('-')))adj[p]-=1;
        if(intel.cat==='risk')adj[p]-=0.5;
        if(intel.cat==='ground'&&txt.includes('strong'))adj[p]+=0.5;
        if(intel.cat==='jsap'&&p===d?.w21)adj[p]-=0.3;
      }
    });
  });
  return adj;
}

function runSim(){
  const mcRuns=Math.min(5000,parseInt(document.getElementById('mc-runs-rp')?.value)||2000);
  const mcVar=parseFloat(document.getElementById('mc-var-rp')?.value)||2.5;
  document.getElementById('status-txt').textContent='Running '+mcRuns.toLocaleString()+' simulations…';
  const natCounts={};MAJOR.forEach(p=>natCounts[p]=[]);
  const distResultsMap={};
  setTimeout(()=>{
    for(let run=0;run<mcRuns;run++){
      const rt={};MAJOR.forEach(p=>rt[p]=0);
      for(const [name,d] of Object.entries(D)){
        const dTot=Object.values(d.v).reduce((a,b)=>a+b,0)||1;
        const iAdj=getIntelAdj(name);
        const dSw=distSwings[name]||{};
        const gSeats=guaranteedSeats[name]||{};

        // Build adjusted votes (with orga adj)
        const oAdj=getOrgaAdj(name);
        const adjV={};
        for(const [p,v] of Object.entries(d.v)){
          const globalSw=(swings[p]||0)/100*dTot;
          const distSw=(dSw[p]||0)/100*dTot;
          const noise=(Math.random()-.5)*2*(mcVar/100)*dTot;
          const iBonus=(iAdj[p]||0)*v*0.03;
          const orgaMult=oAdj[p]!==undefined?oAdj[p]:1.0;
          adjV[p]=Math.max(0,(v+globalSw+distSw+noise+iBonus)*orgaMult);
        }
        if(jsapForce>0){
          const jsapScore=getJSAPscore(d,name);
          const to=(TO_MAP[name]||{});
          const voixAdd=to.voixAdd||0;
          if(voixAdd>0){const sap=voixAdd*jsapForce/100*jsapScore*(0.6+Math.random()*0.8);if(sap>0)adjV['JSAP']=sap;}
        }

        // Allocate seats: FIXED conservation — exactly d.s seats total
        // Sort all parties by adjusted votes
        const ranked=Object.entries(adjV).filter(([,x])=>x>0).sort((a,b)=>b[1]-a[1]);
        let seatsLeft=d.s;
        const allocSeats=[];

        // Apply guaranteed seats first (political input)
        const gEntries=Object.entries(gSeats).filter(([,n])=>n>0);
        for(const [gp,gn] of gEntries){
          const give=Math.min(gn,seatsLeft);
          for(let i=0;i<give;i++)allocSeats.push(gp);
          seatsLeft-=give;
        }
        const guaranteedParties=new Set(gEntries.map(([p])=>p));

        // Fill remaining seats by vote rank (excluding already guaranteed)
        for(const [p] of ranked){
          if(seatsLeft<=0)break;
          if(guaranteedParties.has(p))continue;
          allocSeats.push(p);
          seatsLeft--;
        }

        // Count - exactly d.s seats distributed, no double counting
        MAJOR.forEach(p=>{rt[p]+=(allocSeats.filter(x=>x===p).length);});

        if(!distResultsMap[name]){distResultsMap[name]={counts:{}};}
        MAJOR.forEach(p=>{
          if(!distResultsMap[name].counts[p])distResultsMap[name].counts[p]=[];
          distResultsMap[name].counts[p].push(allocSeats.filter(x=>x===p).length);
        });
        if(run===0){distResultsMap[name].adjSample=adjV;distResultsMap[name].seatsSample=allocSeats;}
      }
      MAJOR.forEach(p=>natCounts[p].push(rt[p]));
    }
    // National stats - verify total seats = TOTAL()
    const natStats={};
    MAJOR.forEach(p=>{
      const arr=natCounts[p].sort((a,b)=>a-b);
      natStats[p]=Math.round(arr.reduce((a,b)=>a+b,0)/arr.length);
    });
    // Verify conservation: total projected seats should equal TOTAL()
    const projTotal=Object.values(natStats).reduce((a,b)=>a+b,0);
    if(projTotal!==TOTAL()){
      // Normalize to TOTAL() proportionally
      const scale=TOTAL()/projTotal;
      MAJOR.forEach(p=>{natStats[p]=Math.round(natStats[p]*scale);});
    }
    const natCI={};MAJOR.forEach(p=>{const arr=natCounts[p].sort((a,b)=>a-b);natCI[p]=arr[Math.floor(arr.length*.05)]+'–'+arr[Math.floor(arr.length*.95)];});
    simResults={_national:natStats,_ci:natCI,_runs:mcRuns};
    for(const [name,r] of Object.entries(distResultsMap)){
      // Compute mean seats per party for this district
      const meanSeats={};
      MAJOR.forEach(p=>{
        const arr=r.counts[p]||[];
        meanSeats[p]=arr.length?arr.reduce((a,b)=>a+b,0)/arr.length:0;
      });
      simResults[name]={seats:r.seatsSample||[],adj:r.adjSample||{},meanSeats};
    }
    renderRightPanel();
    if(selParty)renderPartyProfileView(selParty);
    else if(selDist)renderDistrictView(selDist);
    else renderNationalOverview();
    buildSidebar();
    document.getElementById('status-txt').textContent='Done · '+mcRuns.toLocaleString()+' runs · '+new Date().toLocaleTimeString();
  },20);
}

function resetSim(){
  simResults=BASELINE_SIM;
  renderRightPanel();
  if(selParty)renderPartyProfileView(selParty);
  else if(selDist)renderDistrictView(selDist);
  else renderNationalOverview();
  buildSidebar();
  document.getElementById('status-txt').textContent='Restored 2026 forecast · 10,000 runs · RNI-10/-40% PJD+300%';
}

//  RIGHT PANEL NATIONAL 
function renderRightPanel(){
  const seats=getSeats();
  const sorted=Object.entries(seats).filter(([,v])=>v>0).sort((a,b)=>b[1]-a[1]);
  const total=sorted.reduce((a,[,v])=>a+v,0)||TOTAL();
  document.getElementById('rp-head').textContent='National Projection';
  const html=`
  <div class="sec-hd">Seat projection</div>
  <div class="seat-bar">${sorted.map(([p,n])=>`<div style="width:${(n/total*100).toFixed(1)}%;background:${pc(p)}"></div>`).join('')}</div>
  ${sorted.map(([p,n])=>{
    const b=HIST_NAT['2021'][p]||0;const d=simResults?n-b:null;
    const ci=simResults&&simResults._ci?simResults._ci[p]:'';
    return `<div class="party-row">
      <div class="p-swatch" style="background:${pc(p)}"></div>
      <span class="p-name" style="color:${pc(p)}">${p}</span>
      <div class="p-bar-bg"><div class="p-bar-fill" style="width:${(n/sorted[0][1]*100).toFixed(0)}%;background:${pc(p)}30"></div></div>
      <span class="p-seats">${n}</span>
      ${d!==null?`<span class="p-delta" style="color:${d>0?'var(--green)':d<0?'var(--red)':'var(--text3)'}">${d>=0?'+':''}${d}</span>`:''}
      ${ci?`<span class="p-ci">${ci}</span>`:''}
    </div>`;
  }).join('')}

  <div class="sec-hd" style="margin-top:14px">Scenario level</div>
  <div style="display:flex;gap:5px;margin-bottom:8px">
    <button onclick="setScenLevel('national')" id="scen-nat-btn" style="flex:1;padding:5px 0;font-size:11px;font-weight:600;background:var(--navy);color:#fff;border:none;border-radius:4px;cursor:pointer;font-family:Inter,sans-serif;transition:all .15s">National</button>
    <button onclick="setScenLevel('district')" id="scen-dist-btn" style="flex:1;padding:5px 0;font-size:11px;font-weight:600;background:var(--surface2);color:var(--text2);border:1px solid var(--border);border-radius:4px;cursor:pointer;font-family:Inter,sans-serif;transition:all .15s">District</button>
  </div>
  <div id="scen-dist-pick" style="display:none;margin-bottom:8px">
    <select id="scen-dist-sel" onchange="scenDistName=this.value;renderRightPanel()" style="font-size:11px;padding:5px 8px">
      <option value="">Choose district...</option>
      ${Object.keys(D).sort().map(n=>`<option value="${n}"${selDist===n?' selected':''}>${n}</option>`).join('')}
    </select>
  </div>
  <div class="sec-hd" style="margin-top:6px">Scenario controls</div>
  <div class="preset-row">
    <button class="preset-btn" onclick="applyPreset('base')">Base</button>
    <button class="preset-btn" onclick="applyPreset('rni_surge')">RNI+</button>
    <button class="preset-btn" onclick="applyPreset('pam_ch')">PAM+</button>
    <button class="preset-btn" onclick="applyPreset('pi_back')">PI+</button>
    <button class="preset-btn" onclick="applyPreset('pjd_rev')">PJD+</button>
  </div>
  ${MAJOR.map(p=>`
    <div class="slider-row">
      <span class="slider-label" style="color:${pc(p)};font-size:11px">${p}</span>
      <input type="range" min="-15" max="15" step="0.5" value="${getActiveSwing(p)}" id="sw-${p}" oninput="setActiveSwing('${p}',parseFloat(this.value));updateRPswV('${p}')">
      <span class="slider-val" id="rpswv-${p}" style="color:${getActiveSwing(p)>0?'var(--green)':getActiveSwing(p)<0?'var(--red)':'var(--text3)'}">${getActiveSwing(p)>=0?'+':''}${getActiveSwing(p).toFixed(1)}</span>
    </div>`).join('')}
  <div id="scen-impact-box" style="margin-top:10px;padding:9px 11px;background:var(--surface2);border:1px solid var(--border);border-radius:6px;font-size:11px">
    <div style="font-weight:700;color:var(--navy);margin-bottom:5px;font-size:10px;text-transform:uppercase;letter-spacing:.08em">Scenario impact</div>
    ${buildScenarioImpact()}
  </div>
  <div class="sec-hd" style="margin-top:12px">Save scenario</div>
  <div style="display:flex;gap:5px;margin-bottom:5px">
    <input type="text" id="scen-name-inp" placeholder="Name this scenario..." style="font-size:11px;padding:5px 8px;flex:1">
    <button onclick="saveScenario()" class="btn" style="font-size:11px;padding:5px 10px;flex-shrink:0">Save</button>
  </div>
  <div id="saved-scenarios-list">${renderSavedScenarios()}</div>

  <div class="sec-hd" style="margin-top:14px">Turnout</div>
  <div class="preset-row">
    <button class="preset-btn" onclick="setTO2('base')">Base</button>
    <button class="preset-btn" onclick="setTO2('high')">High</button>
    <button class="preset-btn" onclick="setTO2('urban')">Urban+</button>
    <button class="preset-btn" onclick="setTO2('rural')">Rural+</button>
  </div>
  <div class="slider-row"><span class="slider-label" style="font-size:11px">Natl</span><input type="range" min="-15" max="15" step="1" value="0" id="t-nat-rp" oninput="document.getElementById('t-nat-rp-v').textContent=(parseInt(this.value)>=0?'+':'')+this.value+'pp'"><span class="slider-val" id="t-nat-rp-v">+0pp</span></div>
  <div class="slider-row"><span class="slider-label" style="font-size:11px">Urban</span><input type="range" min="0.7" max="1.5" step="0.05" value="1" id="t-urb-rp" oninput="document.getElementById('t-urb-rp-v').textContent=parseFloat(this.value).toFixed(2)+'x'"><span class="slider-val" id="t-urb-rp-v">1.00x</span></div>
  <div class="slider-row"><span class="slider-label" style="font-size:11px">Rural</span><input type="range" min="0.7" max="1.5" step="0.05" value="1" id="t-rur-rp" oninput="document.getElementById('t-rur-rp-v').textContent=parseFloat(this.value).toFixed(2)+'x'"><span class="slider-val" id="t-rur-rp-v">1.00x</span></div>
  <div class="slider-row"><span class="slider-label" style="font-size:11px">Youth</span><input type="range" min="-5" max="10" step="0.5" value="0" id="t-yth-rp" oninput="document.getElementById('t-yth-rp-v').textContent=(parseFloat(this.value)>=0?'+':'')+parseFloat(this.value).toFixed(1)"><span class="slider-val" id="t-yth-rp-v">+0.0</span></div>

  <div class="sec-hd" style="margin-top:14px">Monte Carlo</div>
  <div class="slider-row"><span class="slider-label" style="font-size:11px">Runs</span><input type="range" min="500" max="5000" step="500" value="2000" id="mc-runs-rp" oninput="document.getElementById('mc-runs-rp-v').textContent=parseInt(this.value).toLocaleString()"><span class="slider-val" id="mc-runs-rp-v">2,000</span></div>
  <div class="slider-row"><span class="slider-label" style="font-size:11px">Var</span><input type="range" min="0" max="15" step="0.5" value="2.5" id="mc-var-rp" oninput="document.getElementById('mc-var-rp-v').textContent=parseFloat(this.value).toFixed(1)+'pp'"><span class="slider-val" id="mc-var-rp-v">2.5pp</span></div>

  <div class="sec-hd" style="margin-top:14px">JSAP movement</div>
  <div class="slider-row"><span class="slider-label" style="font-size:11px;color:#0891b2">Force</span><input type="range" min="0" max="20" step="1" value="${jsapForce}" id="jsap-f-rp" oninput="jsapForce=parseInt(this.value);document.getElementById('jsap-f-v').textContent=this.value+'%'"><span class="slider-val" id="jsap-f-v" style="color:#0891b2">${jsapForce}%</span></div>

  <div class="sec-hd" style="margin-top:14px">Intel (<span id="intel-cnt">${intelLog.length}</span>)</div>
  ${intelLog.length?`<div style="font-size:11px;color:var(--text2)">${intelLog.length} note(s) active. <a href="#" onclick="setTopTab('intel')" style="color:var(--teal)">View all →</a></div>`:'<div style="font-size:11px;color:var(--text3)">No intel added</div>'}`;

  document.getElementById('rp-body').innerHTML=html;
  setTimeout(()=>{
    const natBtn=document.getElementById('scen-nat-btn');
    const distBtn=document.getElementById('scen-dist-btn');
    const distPick=document.getElementById('scen-dist-pick');
    if(scenLevel==='district'){
      if(natBtn){natBtn.style.background='var(--surface2)';natBtn.style.color='var(--text2)';natBtn.style.border='1px solid var(--border)';}
      if(distBtn){distBtn.style.background='var(--navy)';distBtn.style.color='#fff';distBtn.style.border='none';}
      if(distPick)distPick.style.display='block';
    }
  },10);
}

function updateRPswV(p){
  const v=swings[p]||0;
  const el=document.getElementById('rpswv-'+p);
  if(el){el.textContent=(v>=0?'+':'')+v.toFixed(1);el.style.color=v>0?'var(--green)':v<0?'var(--red)':'var(--text3)';}
}

function setTO2(s){
  const P={base:{n:0,u:1,r:1,y:0},high:{n:7,u:1.15,r:1.1,y:4},urban:{n:3,u:1.3,r:0.9,y:2},rural:{n:0,u:0.85,r:1.3,y:-1}};
  const p=P[s];
  ['nat','urb','rur','yth'].forEach((k,i)=>{
    const v=[p.n,p.u,p.r,p.y][i];
    const el=document.getElementById(`t-${k}-rp`);if(el)el.value=v;
    const vel=document.getElementById(`t-${k}-rp-v`);
    if(vel){
      if(k==='nat')vel.textContent=(v>=0?'+':'')+v+'pp';
      else if(k==='yth')vel.textContent=(v>=0?'+':'')+v.toFixed(1);
      else vel.textContent=v.toFixed(2)+'x';
    }
  });
}

function applyPreset(n){
  const P={base:{},rni_surge:{RNI:5,PAM:-2,PI:-1},pam_ch:{PAM:6,RNI:-4,PI:-1},pi_back:{PI:5,RNI:-2,PAM:-2},pjd_rev:{PJD:8,RNI:-2,PAM:-2,PI:-2}};
  MAJOR.forEach(p=>{
    const v=P[n]?.[p]||0;
    if(scenLevel==='district'&&scenDistName){
      if(!distSwings[scenDistName])distSwings[scenDistName]={};
      distSwings[scenDistName][p]=v;
    } else {
      swings[p]=v;
    }
    const e=document.getElementById('sw-'+p);if(e){e.value=v;updateRPswV(p);}
  });
}

// ── SCENARIO LEVEL ──
let scenLevel='national';
let scenDistName='';
let savedScenarios=[];

function setScenLevel(level){
  scenLevel=level;
  if(level==='district'&&selDist)scenDistName=selDist;
  renderRightPanel();
}

function getActiveSwing(p){
  if(scenLevel==='district'&&scenDistName){
    return (distSwings[scenDistName]||{})[p]||0;
  }
  return swings[p]||0;
}

function setActiveSwing(p,v){
  if(scenLevel==='district'&&scenDistName){
    if(!distSwings[scenDistName])distSwings[scenDistName]={};
    distSwings[scenDistName][p]=v;
  } else {
    swings[p]=v;
  }
}

function buildScenarioImpact(){
  // Quick estimate: for each party with non-zero swing, estimate seat change
  const activeSwings=scenLevel==='district'&&scenDistName?distSwings[scenDistName]||{}:swings;
  const hasSwings=Object.values(activeSwings).some(v=>v!==0);
  if(!hasSwings)return '<span style="color:var(--text3)">Adjust swings above to see impact estimate</span>';

  const base=calcBase();
  // Quick seat estimate without full MC: use swing magnitude × elasticity proxy
  const impacts=MAJOR.map(p=>{
    const sw=activeSwings[p]||0;
    if(Math.abs(sw)<0.5)return null;
    // Estimate: each pp national swing ≈ 2-4 seats for major parties
    let seatDelta=0;
    if(scenLevel==='national'){
      seatDelta=Math.round(sw*2.8); // rough national multiplier
    } else if(scenDistName){
      const d=D[scenDistName];
      if(!d)return null;
      const to=TO_MAP[scenDistName]||{};
      const elas=Math.abs(to.elas||1);
      seatDelta=Math.abs(sw)>5?1:0; // district level: binary seat flip estimate
    }
    return {p,sw,seatDelta,base:base[p]||0};
  }).filter(Boolean);

  if(!impacts.length)return '<span style="color:var(--text3)">No significant swings set</span>';

  const scopeLabel=scenLevel==='district'&&scenDistName?`District: ${scenDistName.split(' ')[0]}`:'National';
  return `<div style="font-size:10px;color:var(--text3);margin-bottom:6px">Scope: <strong style="color:var(--navy)">${scopeLabel}</strong></div>`+
  impacts.slice(0,6).map(({p,sw,seatDelta})=>{
    const color=sw>0?'var(--green)':sw<0?'var(--red)':'var(--text3)';
    const seatTxt=Math.abs(seatDelta)>0?(sw>0?`+${seatDelta} seats est.`:`-${Math.abs(seatDelta)} seats est.`):'Marginal';
    return `<div style="display:flex;align-items:center;gap:6px;margin-bottom:4px">
      <div style="width:8px;height:8px;border-radius:2px;background:${pc(p)};flex-shrink:0"></div>
      <span style="font-size:11px;font-weight:600;color:${pc(p)};min-width:32px">${p}</span>
      <span style="font-size:11px;color:${color};font-weight:600">${sw>=0?'+':''}${sw.toFixed(1)}pp</span>
      <span style="font-size:10px;color:var(--text3);margin-left:auto">${seatTxt}</span>
    </div>`;
  }).join('');
}

function saveScenario(){
  const nameEl=document.getElementById('scen-name-inp');
  const name=(nameEl?.value||'').trim()||('Scenario '+(savedScenarios.length+1));
  const sc={
    name,
    level:scenLevel,
    distName:scenDistName,
    swings:{...swings},
    distSwings:scenLevel==='district'&&scenDistName?{...distSwings[scenDistName]}:{},
    to:{
      nat:parseInt(document.getElementById('t-nat-rp')?.value)||0,
      urb:parseFloat(document.getElementById('t-urb-rp')?.value)||1,
      rur:parseFloat(document.getElementById('t-rur-rp')?.value)||1,
      yth:parseFloat(document.getElementById('t-yth-rp')?.value)||0,
    },
    jsapForce,
    saved:new Date().toLocaleTimeString(),
    id:Date.now()
  };
  savedScenarios.push(sc);
  if(nameEl)nameEl.value='';
  // Re-render saved list
  const listEl=document.getElementById('saved-scenarios-list');
  if(listEl)listEl.innerHTML=renderSavedScenarios();
}

function renderSavedScenarios(){
  if(!savedScenarios.length)return '<div style="font-size:11px;color:var(--text3)">No saved scenarios</div>';
  return savedScenarios.slice().reverse().map(sc=>`
    <div style="padding:7px 9px;background:var(--surface2);border:1px solid var(--border);border-radius:5px;margin-bottom:5px">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:4px">
        <span style="font-size:11px;font-weight:700;color:var(--navy)">${sc.name}</span>
        <div style="display:flex;gap:4px">
          <button onclick="loadScenario(${sc.id})" style="font-size:10px;padding:2px 7px;background:var(--teal);color:#fff;border:none;border-radius:3px;cursor:pointer;font-family:Inter,sans-serif">Load</button>
          <button onclick="deleteScenario(${sc.id})" style="font-size:10px;padding:2px 7px;background:var(--surface);color:var(--text3);border:1px solid var(--border);border-radius:3px;cursor:pointer;font-family:Inter,sans-serif">Del</button>
        </div>
      </div>
      <div style="font-size:10px;color:var(--text3)">${sc.level==='district'?'District: '+sc.distName.split(' ')[0]:'National'} · ${sc.saved}</div>
      <div style="font-size:10px;color:var(--text2);margin-top:2px">${Object.entries(sc.swings).filter(([,v])=>v!==0).map(([p,v])=>`<span style="color:${pc(p)}">${p} ${v>=0?'+':''}${v.toFixed(1)}</span>`).join(' ')}</div>
      ${buildScenImpactMini(sc)}
    </div>`).join('');
}

function buildScenImpactMini(sc){
  const base=calcBase();
  const sig=Object.entries(sc.swings).filter(([,v])=>Math.abs(v)>=2);
  if(!sig.length)return '';
  const gainers=sig.filter(([,v])=>v>0).map(([p,v])=>`<span style="color:var(--green);font-weight:600">${p}+</span>`).join(' ');
  const losers=sig.filter(([,v])=>v<0).map(([p,v])=>`<span style="color:var(--red);font-weight:600">${p}-</span>`).join(' ');
  return `<div style="margin-top:4px;font-size:10px">Impact: ${gainers} ${losers}</div>`;
}

function loadScenario(id){
  const sc=savedScenarios.find(s=>s.id===id);
  if(!sc)return;
  scenLevel=sc.level;
  scenDistName=sc.distName;
  MAJOR.forEach(p=>{swings[p]=sc.swings[p]||0;});
  if(sc.level==='district'&&sc.distName){
    if(!distSwings[sc.distName])distSwings[sc.distName]={};
    MAJOR.forEach(p=>{distSwings[sc.distName][p]=sc.distSwings[p]||0;});
  }
  jsapForce=sc.jsapForce||0;
  const toEls={nat:'t-nat-rp',urb:'t-urb-rp',rur:'t-rur-rp',yth:'t-yth-rp'};
  Object.entries(toEls).forEach(([k,id])=>{const el=document.getElementById(id);if(el&&sc.to)el.value=sc.to[k]||0;});
  renderRightPanel();
}

function deleteScenario(id){
  savedScenarios=savedScenarios.filter(s=>s.id!==id);
  const listEl=document.getElementById('saved-scenarios-list');
  if(listEl)listEl.innerHTML=renderSavedScenarios();
}

// ─────────────────────────── GUARANTEED SEATS ───────────────────────────
function setGuaranteed(distName,party,n){
  if(!guaranteedSeats[distName])guaranteedSeats[distName]={};
  if(n===0)delete guaranteedSeats[distName][party];
  else guaranteedSeats[distName][party]=n;
  // Re-render the guaranteed panel in place
  const box=document.getElementById('guar-box-'+distName.replace(/[^a-zA-Z0-9]/g,''));
  if(box)box.innerHTML=renderGuaranteedBox(distName);
}

function renderGuaranteedBox(distName){
  const d=D[distName];if(!d)return'';
  const g=guaranteedSeats[distName]||{};
  const totalG=Object.values(g).reduce((a,b)=>a+b,0);
  const remSeats=d.s-totalG;
  return `
    <div style="font-size:10px;color:var(--text3);margin-bottom:6px">
      Assign guaranteed seats (political input). Remaining free: <strong style="color:${remSeats<0?'var(--red)':'var(--navy)'}">${remSeats}</strong>/${d.s}
    </div>
    ${MAJOR.map(p=>{
      const cur=g[p]||0;
      const base2021=rankBySeats(d.v,d.s).includes(p)?1:0;
      return `<div style="display:flex;align-items:center;gap:7px;margin-bottom:5px">
        <div style="width:9px;height:9px;border-radius:2px;background:${pc(p)};flex-shrink:0"></div>
        <span style="font-size:11px;font-weight:600;color:${pc(p)};min-width:32px">${p}</span>
        <span style="font-size:10px;color:var(--text3);min-width:55px">2021: ${base2021}s</span>
        <div style="display:flex;gap:3px;align-items:center">
          ${[0,1,2,3].filter(n=>n<=d.s).map(n=>`<button onclick="setGuaranteed('${distName.replace(/'/g,"\\'")}','${p}',${n})" style="width:22px;height:22px;border-radius:3px;font-size:10px;font-weight:700;cursor:pointer;border:1px solid ${cur===n?pc(p):'var(--border)'};background:${cur===n?pc(p)+'22':'#fff'};color:${cur===n?pc(p):'var(--text3)'}">${n}</button>`).join('')}
        </div>
        ${cur>0?`<span class="pill" style="background:${pc(p)}18;color:${pc(p)};font-size:9px">LOCKED ${cur}s</span>`:''}
      </div>`;
    }).join('')}
    ${totalG>0?`<div class="alert al-teal" style="margin-top:6px;font-size:11px">
      ${Object.entries(g).filter(([,n])=>n>0).map(([p,n])=>`<strong style="color:${pc(p)}">${p}:${n}s</strong>`).join(' ')} guaranteed — applied before MC runs
    </div>`:''}`;
}

// ─────────────────────────── SCENARIO SETS ───────────────────────────
function createScenSet(){
  const name=prompt('Name this scenario set:','Set '+(scenarioSets.length+1));
  if(!name)return;
  const set={
    id:Date.now(),name,
    districts:{...distSwings},  // snapshot of current district swings
    globalSwings:{...swings},
    to:{nat:parseInt(document.getElementById('t-nat-rp')?.value)||0,
        urb:parseFloat(document.getElementById('t-urb-rp')?.value)||1,
        rur:parseFloat(document.getElementById('t-rur-rp')?.value)||1,
        yth:parseFloat(document.getElementById('t-yth-rp')?.value)||0},
    jsap:jsapForce,
    guaranteed:{...guaranteedSeats},
    result:null,
    created:new Date().toLocaleTimeString()
  };
  scenarioSets.push(set);
  renderScenSetPanel();
}

function runScenSet(id){
  const set=scenarioSets.find(s=>s.id===id);
  if(!set)return;
  // Temporarily apply set's parameters, run sim, store result
  const savedSwings={...swings};
  const savedDSwings=JSON.parse(JSON.stringify(distSwings));
  const savedGuaranteed=JSON.parse(JSON.stringify(guaranteedSeats));
  const savedSAP=jsapForce;
  // Apply set
  MAJOR.forEach(p=>swings[p]=set.globalSwings[p]||0);
  Object.assign(distSwings,set.districts);
  Object.assign(guaranteedSeats,set.guaranteed||{});
  jsapForce=set.jsap||0;
  // Run deterministic (no noise) estimate for quick comparison
  const seats={};MAJOR.forEach(p=>seats[p]=0);
  for(const [name,d] of Object.entries(D)){
    const dTot=Object.values(d.v).reduce((a,b)=>a+b,0)||1;
    const dSw=set.districts[name]||{};
    const gSeats=set.guaranteed?.[name]||{};
    const adjV={};
    for(const [p,v] of Object.entries(d.v)){
      adjV[p]=Math.max(0,v+(set.globalSwings[p]||0)/100*dTot+(dSw[p]||0)/100*dTot);
    }
    const ranked=Object.entries(adjV).filter(([,x])=>x>0).sort((a,b)=>b[1]-a[1]);
    let seatsLeft=d.s;
    const alloc=[];
    for(const [gp,gn] of Object.entries(gSeats)){
      for(let i=0;i<Math.min(gn,seatsLeft);i++){alloc.push(gp);seatsLeft--;}
    }
    const gPs=new Set(Object.keys(gSeats));
    for(const [p] of ranked){if(seatsLeft<=0)break;if(!gPs.has(p)){alloc.push(p);seatsLeft--;}}
    MAJOR.forEach(p=>{seats[p]+=(alloc.filter(x=>x===p).length);});
  }
  set.result=seats;
  // Restore
  MAJOR.forEach(p=>swings[p]=savedSwings[p]||0);
  Object.keys(distSwings).forEach(k=>delete distSwings[k]);
  Object.assign(distSwings,savedDSwings);
  Object.keys(guaranteedSeats).forEach(k=>delete guaranteedSeats[k]);
  Object.assign(guaranteedSeats,savedGuaranteed);
  jsapForce=savedSAP;
  renderScenSetPanel();
}

function deleteScenSet(id){
  scenarioSets=scenarioSets.filter(s=>s.id!==id);
  renderScenSetPanel();
}

function renderScenSetPanel(){
  const el=document.getElementById('scen-sets-view');
  if(!el)return;
  const base=calcBase();
  el.innerHTML=scenarioSets.length?scenarioSets.map(set=>{
    const res=set.result;
    const sorted=res?Object.entries(res).filter(([,v])=>v>0).sort((a,b)=>b[1]-a[1]):[];
    return `<div style="background:var(--surface);border:1px solid var(--border);border-radius:7px;padding:11px 13px;margin-bottom:8px">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px">
        <span style="font-size:12px;font-weight:700;color:var(--navy)">${set.name}</span>
        <div style="display:flex;gap:4px">
          <button onclick="runScenSet(${set.id})" style="font-size:10px;padding:3px 9px;background:var(--teal);color:#fff;border:none;border-radius:3px;cursor:pointer;font-family:Inter,sans-serif">Run</button>
          <button onclick="deleteScenSet(${set.id})" style="font-size:10px;padding:3px 7px;background:#fff;color:var(--text3);border:1px solid var(--border);border-radius:3px;cursor:pointer;font-family:Inter,sans-serif">Del</button>
        </div>
      </div>
      <div style="font-size:10px;color:var(--text3);margin-bottom:6px">
        ${Object.keys(set.districts).length} district overrides · JSAP ${set.jsap}% · ${set.created}
        ${Object.keys(set.guaranteed||{}).length?` · ${Object.keys(set.guaranteed).length} guaranteed`:''}
      </div>
      ${res?`
      <div style="height:12px;display:flex;border-radius:3px;overflow:hidden;margin-bottom:6px;border:1px solid var(--border)">
        ${sorted.map(([p,n])=>`<div style="width:${(n/TOTAL()*100).toFixed(1)}%;background:${pc(p)}" title="${p}:${n}"></div>`).join('')}
      </div>
      <div style="display:flex;flex-wrap:wrap;gap:5px;margin-bottom:5px">
        ${sorted.map(([p,n])=>{
          const d=n-(base[p]||0);
          return `<span style="font-size:10px;font-weight:700;color:${pc(p)}">${p} ${n}<span style="font-size:9px;color:${d>0?'var(--green)':d<0?'var(--red)':'var(--text3)'}">(${d>=0?'+':''}${d})</span></span>`;
        }).join(' ')}
      </div>
      <div style="font-size:10px;color:${sorted[0]&&sorted[0][1]>=MAJ()?'var(--green)':'var(--red)'}">
        ${sorted[0]?sorted[0][0]+' '+sorted[0][1]+(sorted[0][1]>=MAJ()?' — MAJORITY':' — coalition needed'):''}
      </div>`:
      '<div style="font-size:11px;color:var(--text3)">Not run yet</div>'}
    </div>`;
  }).join(''):'<div style="font-size:11px;color:var(--text3);padding:8px 0">No scenario sets created yet.</div>';
}

// ─────────────────────────── COMMUNE SCENARIOS ───────────────────────────
function setCommuneSwing(distName,communeName,party,val){
  if(!communeSwings[distName])communeSwings[distName]={};
  if(!communeSwings[distName][communeName])communeSwings[distName][communeName]={};
  communeSwings[distName][communeName][party]=val;
  // Update commune scenario impact display
  const impEl=document.getElementById('com-scen-impact');
  if(impEl)impEl.innerHTML=buildCommuneScenImpact(distName);
}

function buildCommuneScenImpact(distName){
  const d=D[distName];if(!d)return'';
  const comSw=communeSwings[distName]||{};
  const communes=COMMUNES[distName]||[];
  if(!Object.keys(comSw).length)return'<span style="font-size:11px;color:var(--text3)">Adjust commune swings above to see projected impact</span>';

  // Compute district total with commune adjustments
  const distV={};
  for(const [p,v] of Object.entries(d.v))distV[p]=v;

  for(const [cname,partySw] of Object.entries(comSw)){
    const comm=communes.find(c=>c.n===cname);
    if(!comm)continue;
    const cTot=comm.t||0;
    for(const [p,swVal] of Object.entries(partySw)){
      const delta=swVal/100*cTot;
      distV[p]=(distV[p]||0)+delta;
      // Take votes from leading party proportionally
      const others=Object.keys(distV).filter(x=>x!==p&&(distV[x]||0)>0);
      if(others.length&&delta>0){
        const totalOthers=others.reduce((a,x)=>a+(distV[x]||0),0);
        others.forEach(x=>{distV[x]=Math.max(0,(distV[x]||0)-delta*(distV[x]||0)/totalOthers);});
      }
    }
  }

  const base2021=rankBySeats(d.v,d.s);
  const newAlloc=rankBySeats(distV,d.s);
  const gained=newAlloc.filter(p=>!base2021.includes(p));
  const lost=base2021.filter(p=>!newAlloc.includes(p));

  return `<div style="font-size:10px;color:var(--text3);margin-bottom:6px">Adjusted vote shares:</div>
    ${Object.entries(distV).filter(([,v])=>v>0).sort((a,b)=>b[1]-a[1]).slice(0,6).map(([p,v])=>{
      const tot=Object.values(distV).reduce((a,b)=>a+b,0)||1;
      const orig=(d.v[p]||0);
      const origPct=orig/Object.values(d.v).reduce((a,b)=>a+b,0)*100;
      const newPct=v/tot*100;
      const diff=newPct-origPct;
      return `<div style="display:flex;align-items:center;gap:6px;margin-bottom:3px">
        <div style="width:8px;height:8px;border-radius:2px;background:${pc(p)}"></div>
        <span style="font-size:11px;color:${pc(p)};font-weight:600;min-width:30px">${p}</span>
        <span style="font-size:11px">${newPct.toFixed(1)}%</span>
        <span style="font-size:10px;color:${diff>0?'var(--green)':diff<0?'var(--red)':'var(--text3)'}">${diff>=0?'+':''}${diff.toFixed(1)}pp</span>
      </div>`;
    }).join('')}
    <div style="margin-top:8px;padding-top:7px;border-top:1px solid var(--border)">
      <div style="font-size:11px;font-weight:600;color:var(--navy);margin-bottom:4px">Seat allocation impact:</div>
      <div style="display:flex;gap:5px;flex-wrap:wrap">
        ${newAlloc.map(p=>`<span class="seat-chip" style="background:${pc(p)}">${p}</span>`).join('')}
      </div>
      ${gained.length?`<div style="font-size:11px;color:var(--green);margin-top:4px">Gain: ${gained.join(', ')}</div>`:''}
      ${lost.length?`<div style="font-size:11px;color:var(--red);margin-top:2px">Lose: ${lost.join(', ')}</div>`:''}
      ${!gained.length&&!lost.length?'<div style="font-size:11px;color:var(--text3);margin-top:4px">No seat change</div>':''}
    </div>`;
}

function renderCommuneScenarios(distName){
  const d=D[distName];if(!d)return'';
  const communes=COMMUNES[distName]||[];
  const comSw=communeSwings[distName]||{};
  if(!communes.length)return'<div style="font-size:11px;color:var(--text3)">No commune data for this district</div>';

  const sorted=[...communes].sort((a,b)=>b.t-a.t);
  return `
  <div style="margin-bottom:10px">
    <div style="font-size:11px;color:var(--text2);line-height:1.6;margin-bottom:8px">
      Set vote swing per commune (pp). Changes aggregate to district level and show projected seat impact.
    </div>
    <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:8px;margin-bottom:10px">
      ${sorted.slice(0,12).map(c=>{
        const cId=c.n.replace(/[^a-zA-Z0-9]/g,'');
        const sw=comSw[c.n]||{};
        const top2=Object.entries(c.v).sort((a,b)=>b[1]-a[1]).slice(0,2);
        return `<div style="background:var(--surface2);border:1px solid var(--border);border-radius:6px;padding:8px 10px">
          <div style="display:flex;justify-content:space-between;margin-bottom:5px">
            <span style="font-size:11px;font-weight:700;color:var(--navy)">${c.n}</span>
            <span style="font-size:10px;color:${pc(c.w)};font-weight:600">${c.w}${c.u?' ·urb':''}</span>
          </div>
          <div style="font-size:10px;color:var(--text3);margin-bottom:5px">${top2.map(([p,v])=>`${p}:${(v/c.t*100).toFixed(0)}%`).join(' ')}</div>
          ${top2.map(([p])=>{
            const curSw=sw[p]||0;
            return `<div style="display:flex;align-items:center;gap:5px;margin-bottom:3px">
              <span style="font-size:10px;color:${pc(p)};font-weight:600;min-width:26px">${p}</span>
              <input type="range" min="-20" max="20" step="1" value="${curSw}" style="flex:1;height:2px"
                oninput="setCommuneSwing('${distName.replace(/'/g,"\\'")}','${c.n.replace(/'/g,"\\'")}','${p}',parseInt(this.value));document.getElementById('cswv-${cId}-${p}').textContent=(parseInt(this.value)>=0?'+':'')+this.value+'pp';document.getElementById('cswv-${cId}-${p}').style.color=parseInt(this.value)>0?'var(--green)':parseInt(this.value)<0?'var(--red)':'var(--text3)'">
              <span id="cswv-${cId}-${p}" style="font-size:10px;font-family:'JetBrains Mono',monospace;min-width:32px;color:${curSw>0?'var(--green)':curSw<0?'var(--red)':'var(--text3)'}">${curSw>=0?'+':''}${curSw}pp</span>
            </div>`;
          }).join('')}
        </div>`;
      }).join('')}
    </div>
    ${communes.length>12?`<div style="font-size:11px;color:var(--text3);text-align:center">+ ${communes.length-12} more communes (adjust in full communes tab)</div>`:''}
    <div style="background:var(--surface2);border:1px solid var(--border);border-radius:6px;padding:10px 12px">
      <div style="font-size:10px;font-weight:700;color:var(--navy);text-transform:uppercase;letter-spacing:.08em;margin-bottom:8px">District impact</div>
      <div id="com-scen-impact">${buildCommuneScenImpact(distName)}</div>
    </div>`;
}

//  SIM BANNER 
function buildSimBanner(seats,sorted){
  const lp=sorted[0]?.[0],ln=sorted[0]?.[1]||0;
  const b=HIST_NAT['2021'][lp]||0;const delta=ln-b;
  const ci=simResults._ci?.[lp]||'';
  const runs=simResults._runs||2000;
  const toss=Object.values(D).filter(d=>d.m<3).reduce((a,d)=>a+d.s,0);
  const needCoal=ln<MAJ();

  return `<div class="sim-banner">
    <div class="sim-banner-title">${simResults&&simResults._baseline?"Baseline Forecast":"Simulation Result"} — ${runs.toLocaleString()} runs</div>
    <div class="sim-winner-row">
      <div class="sim-winner-badge" style="background:${pc(lp)}">${lp}</div>
      <div class="sim-winner-info">
        <strong style="font-size:15px;color:${pc(lp)}">${ln} seats</strong>
        <span style="color:${delta>0?'var(--green)':delta<0?'var(--red)':'var(--text3)'}"> (${delta>=0?'+':''}${delta} vs 2021)</span>
        ${ci?`<span style="color:var(--text3)"> · 90% CI: ${ci}</span>`:''}
        <br><span style="font-size:11px">${needCoal?` ${MAJ()-ln} seats short of majority — coalition required`:` Majority secured (+${ln-MAJ()} above ${MAJ()})`}</span>
      </div>
    </div>
    <div class="sim-stats-row">
      ${sorted.slice(0,4).map(([p,n])=>`<div class="sim-stat"><div class="sim-stat-val" style="color:${pc(p)}">${n}</div><div class="sim-stat-lbl">${p}</div></div>`).join('')}
    </div>
    <div class="seat-bar" style="height:16px">${sorted.map(([p,n])=>`<div style="width:${(n/TOTAL()*100).toFixed(1)}%;background:${pc(p)}" title="${p}: ${n}"></div>`).join('')}</div>
    <div style="display:flex;justify-content:space-between;font-size:10px;color:var(--text3);margin-top:5px">
      <span>${toss} seats in toss-up districts (&lt;3pp)</span>
      <span>${sorted.filter(([,n])=>n>0).length} parties winning seats</span>
      <span>Majority = ${MAJ()}</span>
    </div>
  </div>`;
}

//  PARTY PROFILE VIEW 
function renderPartyProfileView(party){
  if(!party){
    document.getElementById('view-tabs').innerHTML='';
    document.getElementById('view-content').innerHTML=`
    <div style="padding:30px 20px">
      <div style="font-size:14px;font-weight:600;color:var(--navy);margin-bottom:16px">Select a party to see its full electoral profile</div>
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px">
        ${MAJOR.map(p=>`<div onclick="setPartyProfile('${p}')" style="background:#fff;border:2px solid ${pc(p)}22;border-radius:8px;padding:14px;cursor:pointer;transition:all .15s;text-align:center" onmouseover="this.style.borderColor='${pc(p)}'" onmouseout="this.style.borderColor='${pc(p)}22'">
          <div style="font-size:20px;font-weight:800;color:${pc(p)};margin-bottom:4px">${p}</div>
          <div style="font-size:11px;color:var(--text3)">${HIST_NAT['2021'][p]||0} seats (2021)</div>
        </div>`).join('')}
      </div>
    </div>`;
    return;
  }

  document.getElementById('view-tabs').innerHTML='';
  document.getElementById('party-profile-sel').value=party;

  const seats2021=HIST_NAT['2021'][party]||0;
  const seats2016=HIST_NAT['2016'][party]||0;
  const seats2011=HIST_NAT['2011'][party]||0;
  const seatsProj=simResults?simResults._national[party]||0:calcBase()[party]||0;

  // Classify all 92 districts by relationship to this party
  const dominated=[]; // Party wins ALL seats
  const strongholds=[]; // Party wins at least 1 seat, margin >10pp
  const competitive=[]; // Party wins 1+ seat, margin <10pp
  const battleground=[]; // Party second, margin <5pp (can flip)
  const absent=[]; // Party not present or very weak

  Object.entries(D).forEach(([name,d])=>{
    const tot=Object.values(d.v).reduce((a,b)=>a+b,0)||1;
    const pVotes=d.v[party]||0;
    const pPct=pVotes/tot*100;
    const allWinners=rankBySeats(d.v,d.s);
    const isWinner=allWinners.includes(party);
    const sortedV=Object.entries(d.v).sort((a,b)=>b[1]-a[1]);
    const rank=sortedV.findIndex(([p])=>p===party)+1;
    const leader=sortedV[0];
    const gap=leader[0]===party?
      (sortedV.length>1?(sortedV[0][1]-sortedV[1][1])/tot*100:100):
      (pVotes>0?(leader[1]-pVotes)/tot*100:100);

    const obj={name,d,pPct,rank,gap,isWinner,allWinners,tot};
    // Party-specific seat chance status
    const seatChance=simResults&&simResults[name]?
      (simResults[name].meanSeats?simResults[name].meanSeats[party]||0:0):
      (isWinner?0.9:rank<=d.s+1?Math.max(0,1-(gap/10)):0);
    obj.seatChance=seatChance;
    obj.seatStatus=seatChance>=0.85?'safe':seatChance>=0.6?'lean':seatChance>=0.35?'battleground':'tossup';
    const to=TO_MAP[name]||{};
    obj.to21=to.to21||0.45;
    obj.voixAdd=to.voixAdd||0;
    // Safe = party won a seat in BOTH 2016 AND 2021
    const h16=d.h16||[];
    const wonIn2016=h16.includes(party)||(d.w16&&d.w16===party);
    const wonIn2021=isWinner;
    const isTrulySafe=wonIn2021&&wonIn2016;

    if(isWinner&&allWinners.filter(w=>w===party).length===d.s)dominated.push(obj);
    else if(isTrulySafe)strongholds.push(obj);   // won both 2016+2021
    else if(isWinner)competitive.push(obj);       // won 2021 only
    else if(!isWinner&&rank<=2&&gap<5)battleground.push(obj);
    else absent.push(obj);
  });

  // Sort each by importance
  dominated.sort((a,b)=>b.pPct-a.pPct);
  strongholds.sort((a,b)=>b.pPct-a.pPct);
  competitive.sort((a,b)=>a.gap-b.gap);
  // Opportunities: only districts party LOST in 2021, ranked by compScore (low = most competitive = best opportunity)
  battleground.forEach(o=>{
    const d2=D[o.n];
    if(d2)o.oppScore=compScore(o.n,d2);
  });
  battleground.sort((a,b)=>(a.oppScore!==undefined&&b.oppScore!==undefined)?a.oppScore-b.oppScore:a.gap-b.gap);
  absent.sort((a,b)=>b.pPct-a.pPct);

  const totalWon=dominated.length+strongholds.length+competitive.length;
  const atRisk=competitive.filter(o=>o.gap<3).length;
  const toGain=battleground.filter(o=>o.gap<3).length;

  const html=`
  <div class="pp-header">
    <div style="display:flex;align-items:flex-start;justify-content:space-between">
      <div style="flex:1">
        <div class="pp-title" style="color:${pc(party)}">${party}</div>
        <div class="pp-subtitle">${partyFullName(party)}</div>
        <div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:6px">
          <span class="pill pill-navy" style="font-size:13px;padding:5px 12px;font-weight:700">${seatsProj} seats projected 2026</span>
          <span class="pill" style="background:${seatsProj>seats2021?'#f0fdf4':seatsProj<seats2021?'#fdf0f0':'var(--surface2)'};color:${seatsProj>seats2021?'var(--green)':seatsProj<seats2021?'var(--red)':'var(--text2)'};font-size:12px">${seatsProj-seats2021>=0?'+':''}${seatsProj-seats2021} vs 2021</span>
          ${atRisk?`<span class="pill pill-red">${atRisk} seats at risk</span>`:''}
          ${toGain?`<span class="pill pill-green">${toGain} to gain</span>`:''}
        </div>
      </div>
      <div style="text-align:right;flex-shrink:0">
        <div style="font-size:52px;font-weight:800;font-family:'JetBrains Mono',monospace;color:${pc(party)};line-height:1">${seatsProj}</div>
        <div style="font-size:10px;color:var(--text3);margin-top:2px;text-transform:uppercase;letter-spacing:.05em">Projected · 2026</div>
      </div>
    </div>
    <div class="pp-grid" style="margin-top:10px">
      <div class="pp-stat"><div class="pp-stat-val" style="color:${pc(party)}">${seats2011}</div><div class="pp-stat-lbl">2011</div></div>
      <div class="pp-stat"><div class="pp-stat-val" style="color:${pc(party)}">${HIST_NAT['2015'][party]||0}</div><div class="pp-stat-lbl">2015</div></div>
      <div class="pp-stat"><div class="pp-stat-val" style="color:${pc(party)}">${seats2016}</div><div class="pp-stat-lbl">2016</div></div>
      <div class="pp-stat"><div class="pp-stat-val" style="color:${pc(party)}">${seats2021}</div><div class="pp-stat-lbl">2021</div></div>
      <div class="pp-stat" style="background:${pc(party)}15;border-color:${pc(party)}40"><div class="pp-stat-val" style="color:${pc(party)};font-size:22px">${seatsProj}</div><div class="pp-stat-lbl" style="font-weight:700">2026↗</div></div>
    </div>
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;font-size:11px">
      <div style="background:#f0fdf4;border-radius:5px;padding:7px 10px;text-align:center"><div style="font-weight:700;color:var(--green);font-size:14px">${dominated.length}</div><div style="color:var(--text3)">Dominated</div></div>
      <div style="background:#eff6ff;border-radius:5px;padding:7px 10px;text-align:center"><div style="font-weight:700;color:var(--blue);font-size:14px">${strongholds.length}</div><div style="color:var(--text3)">Strongholds</div></div>
      <div style="background:#fffbeb;border-radius:5px;padding:7px 10px;text-align:center"><div style="font-weight:700;color:var(--amber);font-size:14px">${competitive.length}</div><div style="color:var(--text3)">Competitive</div></div>
      <div style="background:#fdf4ff;border-radius:5px;padding:7px 10px;text-align:center"><div style="font-weight:700;color:var(--purple);font-size:14px">${battleground.length}</div><div style="color:var(--text3)">Opportunities</div></div>
    </div>
  </div>

  <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:12px">
    ${[
      {label:' Critical — Defend at all cost',data:competitive.filter(o=>o.gap<5),color:'var(--red)',bg:'var(--red-bg)',desc:'Currently winning but margin <5pp'},
      {label:' Opportunities — Can flip to us',data:battleground.slice(0,8),color:'var(--green)',bg:'var(--green-bg)',desc:'Currently losing, margin <5pp'},
      {label:' Watch — Risk of losing',data:competitive.filter(o=>o.gap>=5&&o.gap<10),color:'var(--amber)',bg:'var(--amber-bg)',desc:'Winning but challenged'},
      {label:' Safe — Core base',data:[...dominated,...strongholds].slice(0,6),color:'var(--blue)',bg:'var(--blue-bg)',desc:'Strong positions'},
    ].map(cat=>`
    <div class="card" style="border-left:3px solid ${cat.color}">
      <div class="card-title" style="color:${cat.color}">${cat.label}</div>
      <div style="font-size:10px;color:var(--text3);margin-bottom:8px">${cat.desc}</div>
      ${cat.data.length?cat.data.slice(0,6).map(o=>renderPartyDistRow(o,party,cat.color)).join(''):'<div style="font-size:11px;color:var(--text3)">None</div>'}
    </div>`).join('')}
  </div>

  ${generateRecommendation(party,dominated,strongholds,competitive,battleground,seats2021,seatsProj)}`;

  document.getElementById('view-content').innerHTML=html;
  document.getElementById('rp-head').textContent=party+' Profile';
  renderRightPanel();
}

function partyFullName(p){
  const names={RNI:'Rassemblement National Indépendant',PAM:'Parti Authenticité et Modernité',PI:"Parti de l'Istiqlal",USFP:'Union Socialiste des Forces Populaires',MP:'Mouvement Populaire',UC:'Union Constitutionnelle',PPS:'Parti du Progrès et Socialisme',PJD:'Parti Justice et Développement'};
  return names[p]||p;
}

function renderPartyDistRow(o,party,color){
  const tot=o.tot||1;
  const pPct=o.pPct;
  const allWinners=o.allWinners;
  return `<div class="dist-class" onclick="selectDist('${o.name.replace(/'/g,"\\'")}')">
    <div class="dc-left">
      <div class="dc-name">${o.name}</div>
      <div class="dc-meta">${o.d.s} seats · ${o.d.r.replace('Tanger - Tétouan - Al Hoceima','TTH').replace('Casablanca - Settat','Casa').replace(' - Khénifra','').replace('Rabat - Salé - ','R-S-').replace('Marrakech - Safi','Marra')} · TO ${(o.to21*100).toFixed(0)}%</div>
      <div class="seat-alloc">${allWinners.map(p=>`<span class="seat-chip" style="background:${pc(p)}">${p}</span>`).join('')}</div>
    </div>
    <div class="dc-right">
      <div class="dc-pct" style="color:${color}">${pPct.toFixed(1)}%</div>
      <div class="dc-seats">${o.isWinner?' wins seat':'rank #'+o.rank}</div>
    </div>
  </div>`;
}

function generateRecommendation(party,dominated,strongholds,competitive,battleground,seats2021,seatsProj){
  const safe=[...dominated,...strongholds];
  const atRisk=competitive.filter(o=>o.gap<4).sort((a,b)=>a.gap-b.gap);
  const toFlip=battleground.filter(o=>o.gap<4).sort((a,b)=>a.gap-b.gap);
  const watchFor=competitive.filter(o=>o.gap>=4&&o.gap<8).sort((a,b)=>a.gap-b.gap);
  const needed=MAJ()-seatsProj;

  // Find main competitors in at-risk districts
  const rivals={};
  atRisk.forEach(o=>{
    const sortedV=Object.entries(o.d.v).sort((a,b)=>b[1]-a[1]);
    const leader=sortedV.find(([p])=>p!==party);
    if(leader)rivals[leader[0]]=(rivals[leader[0]]||0)+1;
  });
  const topRival=Object.entries(rivals).sort((a,b)=>b[1]-a[1])[0]?.[0]||'PAM';

  const keepNames=atRisk.slice(0,3).map(o=>o.name.split(' - ')[0]).join(', ');
  const battleNames=toFlip.slice(0,3).map(o=>o.name.split(' - ')[0]).join(', ');
  const blockRivalDistricts=atRisk.filter(o=>{const sv=Object.entries(o.d.v).sort((a,b)=>b[1]-a[1]);return sv[0]?.[0]===topRival||sv[1]?.[0]===topRival;}).slice(0,2).map(o=>o.name.split(' - ')[0]).join(', ');
  const watchDistricts=watchFor.slice(0,2).map(o=>{
    const sv=Object.entries(o.d.v).sort((a,b)=>b[1]-a[1]);
    const threat=sv.find(([p])=>p!==party);
    return `${o.name.split(' - ')[0]} (${threat?.[0]||'?'})`;
  }).join(', ');

  const sentenceBase=seatsProj>=MAJ()
    ? `With a projected majority of <strong>${seatsProj}</strong> seats, ${party} is on track to lead government solo.`
    : `Projected at <strong>${seatsProj}</strong> seats — ${needed} short of majority — ${party} must build a coalition or gain ground in battlegrounds.`;

  return `<div class="reco-block">
    <div class="reco-title"> Strategic Recommendation — ${party}</div>
    <div class="reco-text">"${sentenceBase} ${atRisk.length?`To hold first place, <strong>${party}</strong> must consolidate ${keepNames||'its core base'}.`:''} ${toFlip.length?`The key battles to win are ${battleNames}, where the margin is under 4pp and turnout mobilization can flip the seat.`:''} ${blockRivalDistricts?`${party} must block <strong>${topRival}</strong> from advancing in ${blockRivalDistricts}.`:''} ${watchDistricts?`Watch closely for <strong>PI and PAM</strong> pressure in ${watchDistricts}.`:''}"</div>
    <div class="reco-bullets">
      ${safe.length?`<div class="rb"><span class="rb-icon"></span><span><strong>Protect (${safe.length} districts):</strong> ${safe.slice(0,4).map(o=>o.name.split(' ')[0]).join(', ')}${safe.length>4?' + '+(safe.length-4)+' more':''} — safe base, maintain ground presence</span></div>`:''}
      ${atRisk.length?`<div class="rb"><span class="rb-icon"></span><span><strong>Defend urgently (${atRisk.length}):</strong> ${atRisk.slice(0,4).map(o=>o.name.split(' ')[0]).join(', ')} — margins under 4pp, any swing loses seat</span></div>`:''}
      ${toFlip.length?`<div class="rb"><span class="rb-icon"></span><span><strong>Attack (${toFlip.length} opportunities):</strong> ${toFlip.slice(0,4).map(o=>o.name.split(' ')[0]).join(', ')} — ${party} is close, focused mobilization can win</span></div>`:''}
      ${topRival?`<div class="rb"><span class="rb-icon"></span><span><strong>Block ${topRival}:</strong> ${topRival} is the main threat across ${Object.values(rivals).reduce((a,b)=>a+b,0)} contested districts — counter their ground operation especially in urban areas</span></div>`:''}
      ${seatsProj<MAJ()?`<div class="rb"><span class="rb-icon"></span><span><strong>Coalition math:</strong> ${party} needs ${needed} more seats — consider alignment with ${suggestCoalition(party,seatsProj)} to cross the ${MAJ()}-seat threshold</span></div>`:''}
    </div>
  </div>`;
}

function suggestCoalition(party,seats){
  const base=simResults?simResults._national:calcBase();
  const others=Object.entries(base).filter(([p,n])=>p!==party&&n>0).sort((a,b)=>b[1]-a[1]);
  const needed=MAJ()-seats;
  let acc=0;const partners=[];
  for(const [p,n] of others){if(acc>=needed)break;partners.push(p+' ('+n+'s)');acc+=n;}
  return partners.join(' + ')||'smaller parties';
}
// ─────────────────────────── SCENARIO SETS VIEW ───────────────────────────
function renderScenSetsView(){
  document.getElementById('view-tabs').innerHTML='';
  const base=calcBase();
  const html=`
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:12px">
    <div class="card">
      <div class="card-title" style="display:flex;align-items:center;justify-content:space-between">
        <span>Scenario Sets</span>
        <button onclick="createScenSet()" class="btn primary" style="font-size:11px;padding:4px 12px">+ New Set</button>
      </div>
      <div style="font-size:11px;color:var(--text2);line-height:1.6;margin-bottom:10px">
        Build multi-district scenarios by configuring swings, guaranteed seats and turnout per district, then save as a named set. Run each set to compare outcomes side by side.
      </div>
      <div id="scen-sets-view">${scenarioSets.length?'':'<div style="font-size:11px;color:var(--text3);padding:8px 0">No scenario sets yet. Create one using the button above.</div>'}</div>
    </div>
    <div class="card">
      <div class="card-title">Scenario comparison</div>
      ${scenarioSets.filter(s=>s.result).length>=2?buildScenComparison():
        '<div style="font-size:11px;color:var(--text3)">Run at least 2 scenario sets to compare them here.</div>'}
    </div>
  </div>
  <div class="card">
    <div class="card-title">How scenario sets work</div>
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;font-size:11px;color:var(--text2);line-height:1.7">
      <div style="background:var(--surface2);border-radius:6px;padding:10px 12px">
        <div style="font-weight:700;color:var(--navy);margin-bottom:4px">1. Configure</div>
        Set national swings, then override individual districts. Add guaranteed seats for parties with confirmed political support. Adjust turnout per scenario.
      </div>
      <div style="background:var(--surface2);border-radius:6px;padding:10px 12px">
        <div style="font-weight:700;color:var(--navy);margin-bottom:4px">2. Save as Set</div>
        Name and save the full configuration — global swings, all district overrides, guaranteed seats, turnout, JSAP force. The set is a snapshot you can reload anytime.
      </div>
      <div style="background:var(--surface2);border-radius:6px;padding:10px 12px">
        <div style="font-weight:700;color:var(--navy);margin-bottom:4px">3. Compare</div>
        Run each set for instant seat projection. Results appear side by side. Seat gains/losses vs 2021 baseline are highlighted. Coalition viability shown automatically.
      </div>
    </div>
  </div>`;
  document.getElementById('view-content').innerHTML=html;
  renderScenSetPanel();
  document.getElementById('rp-head').textContent='Scenario Sets';
  renderRightPanel();
}

function buildScenComparison(){
  const ran=scenarioSets.filter(s=>s.result);
  if(ran.length<2)return'';
  const base=calcBase();
  return `<div style="overflow-x:auto">
    <table class="tbl">
      <thead><tr>
        <th>Party</th>
        <th>2021</th>
        ${ran.map(s=>`<th style="color:var(--teal)">${s.name}</th>`).join('')}
      </tr></thead>
      <tbody>${MAJOR.map(p=>{
        const base21=HIST_NAT['2021'][p]||0;
        return `<tr>
          <td><div style="display:flex;align-items:center;gap:5px"><div style="width:8px;height:8px;border-radius:2px;background:${pc(p)}"></div><span style="font-weight:600;color:${pc(p)}">${p}</span></div></td>
          <td style="font-family:'JetBrains Mono',monospace;font-weight:600">${base21}</td>
          ${ran.map(s=>{
            const n=s.result[p]||0;const d=n-base21;
            return `<td style="font-family:'JetBrains Mono',monospace">
              <span style="font-weight:700">${n}</span>
              <span style="font-size:10px;color:${d>0?'var(--green)':d<0?'var(--red)':'var(--text3)'}">${d>=0?'+':''}${d}</span>
            </td>`;
          }).join('')}
        </tr>`;
      }).join('')}
      <tr style="border-top:2px solid var(--border2)">
        <td style="font-weight:700;color:var(--navy)">Leader</td>
        <td style="color:${pc(Object.entries(base).sort((a,b)=>b[1]-a[1])[0][0])};font-weight:700">${Object.entries(base).sort((a,b)=>b[1]-a[1])[0][0]}</td>
        ${ran.map(s=>{
          const leader=Object.entries(s.result).sort((a,b)=>b[1]-a[1])[0];
          return `<td style="color:${pc(leader[0])};font-weight:700">${leader[0]} ${leader[1]}<span style="font-size:10px;color:${leader[1]>=MAJ()?'var(--green)':'var(--red)'}"> ${leader[1]>=MAJ()?'MAJ()':'−'+(MAJ()-leader[1])}</span></td>`;
        }).join('')}
      </tr>
      </tbody>
    </table>
  </div>
  <div style="margin-top:10px">
    ${ran.map(s=>`<div class="scen-bar-track">${Object.entries(s.result).filter(([,v])=>v>0).sort((a,b)=>b[1]-a[1]).map(([p,n])=>`<div style="width:${(n/TOTAL()*100).toFixed(1)}%;background:${pc(p)}" title="${p}:${n}"></div>`).join('')}</div><div style="font-size:10px;color:var(--text3);margin-bottom:4px">${s.name}</div>`).join('')}
  </div>`;
}

function buildEvolChart(){
  const ctx=document.getElementById('evol-chart');if(!ctx)return;
  const labels=['2011','2015','2016','2021','2026↗'];
  const base=calcBase();
  const datasets=MAJOR.filter(p=>Object.values(HIST_NAT).some(y=>y[p]>0)).map(p=>({
    label:p,data:labels.map(y=>y==='2026↗'?(simResults?simResults._national[p]||0:base[p]||0):HIST_NAT[y]?.[p]||0),
    borderColor:pc(p),backgroundColor:pc(p)+'18',borderWidth:2,pointRadius:3,
    pointBackgroundColor:pc(p),tension:0.3,
    segment:{borderDash:ctx=>(ctx.p1DataIndex===4?[5,4]:undefined)}
  }));
  if(evolChart)evolChart.destroy();
  evolChart=new Chart(ctx.getContext('2d'),{type:'line',data:{labels,datasets},options:{
    responsive:true,maintainAspectRatio:false,animation:{duration:600},
    plugins:{legend:{display:false}},
    scales:{
      x:{grid:{color:'var(--border)'},ticks:{color:'var(--text3)',font:{size:10,family:'Inter'}}},
      y:{grid:{color:'var(--border)'},ticks:{color:'var(--text3)',font:{size:10,family:'Inter'}},min:0}
    }
  }});
}

// ─────────────────────────── STRATEGIC ANALYSIS TAB ───────────────────────────
let stratParty='RNI', stratDistrict='';

function renderStrategicView(){
  document.getElementById('view-tabs').innerHTML='';
  document.getElementById('rp-head').textContent='Strategic Analysis';
  document.getElementById('view-content').innerHTML=`
  <div class="card">
    <div class="card-title">Strategic Analysis — by party × district</div>
    <div style="display:flex;gap:10px;align-items:flex-end;flex-wrap:wrap;margin-bottom:14px">
      <div>
        <div style="font-size:10px;font-weight:600;color:var(--text3);margin-bottom:4px;text-transform:uppercase">Party</div>
        <select id="strat-party-sel" onchange="stratParty=this.value;updateStratView()" style="font-size:12px;padding:5px 10px;border-radius:5px;font-weight:700;color:${pc(stratParty)}">
          ${MAJOR.map(p=>`<option value="${p}" style="color:${pc(p)}" ${stratParty===p?'selected':''}>${p}</option>`).join('')}
        </select>
      </div>
      <div>
        <div style="font-size:10px;font-weight:600;color:var(--text3);margin-bottom:4px;text-transform:uppercase">District</div>
        <select id="strat-dist-sel" onchange="stratDistrict=this.value;updateStratView()" style="font-size:11px;padding:5px 10px;border-radius:5px">
          <option value="">All districts</option>
          ${Object.keys(D).sort().map(n=>`<option value="${n}" ${stratDistrict===n?'selected':''}>${n}</option>`).join('')}
        </select>
      </div>
    </div>
    <div id="strat-content">${buildStratContent()}</div>
  </div>`;
  renderRightPanel();
}

function updateStratView(){
  const el=document.getElementById('strat-content');
  if(el)el.innerHTML=buildStratContent();
  // Update party select color
  const sel=document.getElementById('strat-party-sel');
  if(sel)sel.style.color=pc(stratParty);
}

function buildStratContent(){
  if(stratDistrict) return buildStratDistrict(stratParty, stratDistrict);
  return buildStratNational(stratParty);
}

function buildStratNational(party){
  const seats=getSeats();
  const allDists=Object.entries(D).map(([n,d])=>{
    const tot=Object.values(d.v).reduce((a,b)=>a+b,0)||1;
    const pVotes=d.v[party]||0;
    const pPct=pVotes/tot*100;
    const simWinners=getDistSeats(n,d);
    const won=simWinners.includes(party);
    const ranked=Object.entries(d.v).sort((a,b)=>b[1]-a[1]);
    const rank=ranked.findIndex(([p])=>p===party)+1;
    const cs=compScore(n,d);
    const to=TO_MAP[n]||{};
    const communes=COMMUNES[n]||[];
    const commWon=communes.filter(c=>c.w===party).length;
    const commSwing=communes.filter(c=>c.w!==party&&c.m<8&&(c.v[party]||0)>0).length;
    return {n,d,tot,pVotes,pPct,won,rank,cs,st:getStatus(d.m,n,d),to,commWon,commSwing,seatsInDist:d.s};
  });

  const threats=allDists.filter(x=>x.won&&x.rank<=x.seatsInDist&&x.cs<6).sort((a,b)=>a.cs-b.cs);
  const opportunities=allDists.filter(x=>!x.won&&x.pPct>5&&x.rank<=x.seatsInDist+2).sort((a,b)=>a.cs-b.cs);
  const strongholds=allDists.filter(x=>x.won&&x.cs>=6&&x.rank===1).sort((a,b)=>b.pPct-a.pPct);

  return `
  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-bottom:14px">
    <div class="stat-box"><div class="stat-label">Seats projected</div><div class="stat-val" style="color:${pc(party)}">${seats[party]||0}</div></div>
    <div class="stat-box"><div class="stat-label">Districts leading</div><div class="stat-val">${allDists.filter(x=>x.rank===1).length}</div></div>
    <div class="stat-box"><div class="stat-label">Defense alerts</div><div class="stat-val" style="color:var(--red)">${threats.length}</div></div>
    <div class="stat-box"><div class="stat-label">Attack opportunities</div><div class="stat-val" style="color:var(--green)">${opportunities.length}</div></div>
  </div>

  ${threats.length?`<div class="card" style="border-left:3px solid var(--red);margin-bottom:10px">
    <div class="card-title" style="color:var(--red)">Defense — seats at risk (score &lt;6, held by ${party})</div>
    ${threats.map(x=>stratDistRow(x,party,'defend')).join('')}
  </div>`:''}

  ${opportunities.length?`<div class="card" style="border-left:3px solid var(--green);margin-bottom:10px">
    <div class="card-title" style="color:var(--green)">Attack — flip targets for ${party}</div>
    ${opportunities.slice(0,12).map(x=>stratDistRow(x,party,'attack')).join('')}
  </div>`:''}

  ${strongholds.length?`<div class="card" style="border-left:3px solid var(--blue);margin-bottom:10px">
    <div class="card-title" style="color:var(--blue)">Safe base — ${party} strongholds</div>
    ${strongholds.slice(0,8).map(x=>stratDistRow(x,party,'safe')).join('')}
  </div>`:''}`;
}

function stratDistRow(x,party,type){
  const bgColor=type==='defend'?'var(--red-bg)':type==='attack'?'var(--green-bg)':'var(--blue-bg)';
  const borderColor=type==='defend'?'#fecaca':type==='attack'?'#a7f3d0':'#bfdbfe';
  const to=x.to||{};
  return `<div style="display:flex;align-items:center;gap:8px;padding:7px 10px;background:${bgColor};border:1px solid ${borderColor};border-radius:5px;margin-bottom:5px;cursor:pointer" onclick="stratDistrict='${x.n.replace(/'/g,"\\'")}';document.getElementById('strat-dist-sel').value='${x.n.replace(/'/g,"\\''")}';updateStratView()">
    <span class="pill ${statusPillClass(x.st)}" style="font-size:9px">${x.cs.toFixed(1)}</span>
    <span style="font-size:12px;font-weight:700;min-width:180px">${x.n}</span>
    <span style="font-size:11px;color:${pc(party)};font-weight:700">${x.pPct.toFixed(1)}%</span>
    <span style="font-size:10px;color:var(--text3)">#${x.rank} of ${Object.keys(x.d.v).length} · ${x.seatsInDist}s</span>
    <span style="font-size:10px;color:var(--text3);margin-left:auto">TO ${((to.to21||0)*100).toFixed(0)}% · youth ${x.d.yth}%</span>
    <span style="font-size:10px;color:var(--teal)">${x.commSwing} swing communes</span>
  </div>`;
}

function buildStratDistrict(party, distName){
  const d=D[distName];if(!d)return'';
  const tot=Object.values(d.v).reduce((a,b)=>a+b,0)||1;
  const pVotes=d.v[party]||0;
  const pPct=pVotes/tot*100;
  const ranked=Object.entries(d.v).sort((a,b)=>b[1]-a[1]);
  const rank=ranked.findIndex(([p])=>p===party)+1;
  const simWinners=getDistSeats(distName,d);
  const won=simWinners.includes(party);
  const cs=compScore(distName,d);
  const to=TO_MAP[distName]||{};
  const communes=COMMUNES[distName]||[];

  // Classify communes
  const strongCommunes=communes.filter(c=>c.w===party&&c.m>10).sort((a,b)=>b.t-a.t);
  const threatened=communes.filter(c=>c.w===party&&c.m<8).sort((a,b)=>a.m-b.m);
  const swingers=communes.filter(c=>c.w!==party&&c.m<10&&(c.v[party]||0)>0&&(c.v[party]||0)/c.t>0.15).sort((a,b)=>{
    const aGap=(c=>(c.v[party]||0)/c.t)( a)-((Object.entries(a.v).sort((x,y)=>y[1]-x[1])[0][1])/a.t);
    const bGap=(c=>(c.v[party]||0)/c.t)( b)-((Object.entries(b.v).sort((x,y)=>y[1]-x[1])[0][1])/b.t);
    return bGap-aGap;
  });
  const targets=communes.filter(c=>c.w!==party&&(c.v[party]||0)/c.t>0.1).sort((a,b)=>(b.v[party]||0)/b.t-(a.v[party]||0)/a.t);
  const absent=communes.filter(c=>(c.v[party]||0)===0||((c.v[party]||0)/c.t<0.05));

  // Demographics
  const urbanComm=communes.filter(c=>c.u===1);
  const ruralComm=communes.filter(c=>c.u===0);
  const urbanVotes=urbanComm.reduce((a,c)=>a+c.t,0);
  const ruralVotes=ruralComm.reduce((a,c)=>a+c.t,0);
  const partyUrbanVotes=urbanComm.reduce((a,c)=>a+(c.v[party]||0),0);
  const partyRuralVotes=ruralComm.reduce((a,c)=>a+(c.v[party]||0),0);
  const urbanPct=urbanVotes>0?(partyUrbanVotes/urbanVotes*100).toFixed(1):0;
  const ruralPct=ruralVotes>0?(partyRuralVotes/ruralVotes*100).toFixed(1):0;

  // Last seat analysis
  const lastWinner=ranked[d.s-1];
  const firstLoser=ranked[d.s];
  const lastGap=lastWinner&&firstLoser?((lastWinner[1]-firstLoser[1])/tot*100).toFixed(1):null;

  return `
  <!-- Header stats -->
  <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:8px;margin-bottom:12px">
    <div class="stat-box"><div class="stat-label">${party} share</div><div class="stat-val" style="color:${pc(party)}">${pPct.toFixed(1)}%</div><div class="stat-sub">rank #${rank}</div></div>
    <div class="stat-box"><div class="stat-label">Seat status</div><div class="stat-val" style="color:${won?'var(--green)':'var(--red)'}">${won?'WON':'NOT WON'}</div><div class="stat-sub">${d.s} seats total</div></div>
    <div class="stat-box"><div class="stat-label">Comp. score</div><div class="stat-val" style="color:${cs<2?'var(--red)':cs<4?'var(--amber)':'var(--text)'}">${cs.toFixed(2)}</div></div>
    <div class="stat-box"><div class="stat-label">Urban %</div><div class="stat-val">${urbanPct}%</div><div class="stat-sub">${urbanComm.length} urban communes</div></div>
    <div class="stat-box"><div class="stat-label">Rural %</div><div class="stat-val">${ruralPct}%</div><div class="stat-sub">${ruralComm.length} rural communes</div></div>
  </div>

  <!-- Demographics -->
  <div class="card" style="margin-bottom:10px">
    <div class="card-title">Demographics & electorate — ${distName}</div>
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px">
      <div class="stat-box"><div class="stat-label">Youth (15–29)</div><div class="stat-val" style="color:${d.yth>20?'var(--teal)':'var(--text)'}">${d.yth}%</div><div class="stat-sub">${d.yth>20?'HIGH youth district':'Avg youth'}</div></div>
      <div class="stat-box"><div class="stat-label">Urban/Rural</div><div class="stat-val">${d.u?'Urban':'Mixed'}</div><div class="stat-sub">${urbanComm.length}u · ${ruralComm.length}r communes</div></div>
      <div class="stat-box"><div class="stat-label">TO 2021</div><div class="stat-val">${((to.to21||0)*100).toFixed(0)}%</div><div class="stat-sub">Leg avg ${((to.to_leg||0)*100).toFixed(0)}%</div></div>
      <div class="stat-box"><div class="stat-label">Mobilizable votes</div><div class="stat-val" style="color:${(to.voixAdd||0)>0?'var(--green)':'var(--red)'}"><span title="Estimated additional votes if turnout returns to legislative average">${(to.voixAdd||0)>0?'+':''}${((to.voixAdd||0)/1000).toFixed(0)}k</span></div></div>
    </div>
    ${lastGap!==null?`<div style="margin-top:8px;padding:7px 10px;background:${parseFloat(lastGap)<3?'var(--red-bg)':'var(--surface2)'};border-radius:5px;font-size:11px">
      Last seat: <strong>${lastWinner[0]}</strong> ${(lastWinner[1]/tot*100).toFixed(1)}% — 1st loser: <strong>${firstLoser[0]}</strong> ${(firstLoser[1]/tot*100).toFixed(1)}% — gap: <strong style="color:${parseFloat(lastGap)<3?'var(--red)':'var(--text)'}">${lastGap}pp</strong>
      ${rank===d.s+1?` — <strong style="color:var(--red)">${party} is the FIRST LOSER — needs ${lastGap}pp more</strong>`:''}
    </div>`:''}
  </div>

  <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
    <!-- Strongholds to protect -->
    ${strongCommunes.length?`<div class="card" style="border-left:3px solid var(--green)">
      <div class="card-title" style="color:var(--green)">${party} strongholds — protect (${strongCommunes.length})</div>
      ${strongCommunes.slice(0,8).map(c=>commStratRow(c,party,'strong')).join('')}
    </div>`:'<div></div>'}

    <!-- Threatened communes -->
    ${threatened.length?`<div class="card" style="border-left:3px solid var(--red)">
      <div class="card-title" style="color:var(--red)">Threatened communes — defend (${threatened.length})</div>
      ${threatened.slice(0,8).map(c=>commStratRow(c,party,'threat')).join('')}
    </div>`:'<div></div>'}

    <!-- Swing communes -->
    ${swingers.length?`<div class="card" style="border-left:3px solid var(--amber)">
      <div class="card-title" style="color:var(--amber)">Swing communes — ${party} can flip (${swingers.length})</div>
      ${swingers.slice(0,8).map(c=>commStratRow(c,party,'swing')).join('')}
    </div>`:'<div></div>'}

    <!-- Target communes -->
    ${targets.length?`<div class="card" style="border-left:3px solid var(--teal)">
      <div class="card-title" style="color:var(--teal)">Target communes — weak presence, room to grow (${targets.length})</div>
      ${targets.slice(0,8).map(c=>commStratRow(c,party,'target')).join('')}
    </div>`:'<div></div>'}
  </div>

  <!-- Full commune table -->
  <div class="card" style="margin-top:10px">
    <div class="card-title">All ${communes.length} communes — ${party} performance</div>
    <table class="tbl">
      <thead><tr><th>Commune</th><th>Type</th><th>Winner</th><th>${party}%</th><th>Gap to win</th><th>Total votes</th><th>Role</th></tr></thead>
      <tbody>${[...communes].sort((a,b)=>(b.v[party]||0)/b.t-(a.v[party]||0)/a.t).map(c=>{
        const cPct=(c.v[party]||0)/c.t*100;
        const winner=Object.entries(c.v).sort((a,b)=>b[1]-a[1])[0];
        const gap=c.w===party?c.m:-(winner[1]-(c.v[party]||0))/c.t*100;
        const role=c.w===party&&c.m>10?'Stronghold':c.w===party&&c.m<8?'Threatened':c.w!==party&&cPct>15&&c.m<10?'Swingeable':c.w!==party&&cPct>10?'Target':'Monitor';
        const roleColor={'Stronghold':'var(--green)','Threatened':'var(--red)','Swingeable':'var(--amber)','Target':'var(--teal)','Monitor':'var(--text3)'}[role];
        return `<tr>
          <td style="font-weight:600">${c.n}</td>
          <td>${c.u?'<span class="pill pill-teal" style="font-size:9px">URB</span>':'<span style="font-size:10px;color:var(--text3)">Rur</span>'}</td>
          <td style="color:${pc(c.w)};font-weight:700">${c.w}</td>
          <td style="color:${pc(party)};font-weight:700">${cPct.toFixed(1)}%</td>
          <td style="color:${gap>=0?'var(--green)':'var(--red)'};font-weight:${gap>0?'700':'400'}">${gap>=0?'+':''}${gap.toFixed(1)}pp</td>
          <td>${c.t.toLocaleString()}</td>
          <td style="color:${roleColor};font-weight:600">${role}</td>
        </tr>`;
      }).join('')}</tbody>
    </table>
  </div>`;
}

function commStratRow(c,party,type){
  const cPct=((c.v[party]||0)/c.t*100).toFixed(1);
  const winner=Object.entries(c.v).sort((a,b)=>b[1]-a[1])[0];
  const gap=c.w===party?'+'+c.m.toFixed(1):'−'+((winner[1]-(c.v[party]||0))/c.t*100).toFixed(1);
  return `<div style="display:flex;align-items:center;gap:6px;padding:5px 0;border-bottom:1px solid var(--border)">
    <span style="font-size:11px;font-weight:700;flex:1">${c.n}</span>
    <span style="font-size:10px;color:${c.u?'var(--teal)':'var(--text3)'}">${c.u?'URB':'Rur'}</span>
    <span style="font-size:11px;color:${pc(c.w)};font-weight:700">${c.w}</span>
    <span style="font-size:11px;color:${pc(party)}">${cPct}%</span>
    <span style="font-size:10px;color:var(--text3)">${gap}pp</span>
    <span style="font-size:10px;color:var(--text3)">${c.t.toLocaleString()}</span>
  </div>`;
}

// ─────────────────────────── COMMS RECOMMENDATIONS TAB ───────────────────────────
let commsParty='RNI', commsDistrict='', commsLoading=false, commsCache={};
let commsMessages=[]; // conversation history for multi-turn chat

// Build the full data context string injected as system prompt
function buildCommsSystemPrompt(){
  const seats=getSeats();
  const sorted=Object.entries(seats).sort((a,b)=>b[1]-a[1]);
  const national=sorted.map(([p,n])=>`${p}:${n}seats[CI:${(BASELINE_SIM._ci||{})[p]||'—'}]`).join(', ');

  // Top critical districts
  const critDists=Object.entries(D)
    .map(([n,d])=>({n,d,cs:compScore(n,d)}))
    .sort((a,b)=>a.cs-b.cs).slice(0,15)
    .map(({n,d,cs})=>`${n}(${d.s}s,score${cs.toFixed(1)},w21:${d.w21},yth:${d.yth}%,${d.u?'urban':'rural'})`)
    .join('; ');

  // Party national positions
  const partyCtx=MAJOR.map(p=>{
    const distWon=Object.entries(D).filter(([,d])=>getDistSeats(...[/* trick */]).includes&&rankBySeats(d.v,d.s).includes(p)).length;
    const tot2021=HIST_NAT['2021'][p]||0;
    return `${p}: projected ${seats[p]||0}s (was ${tot2021} in 2021)`;
  }).join('; ');

  return `You are intelX, an advanced AI political intelligence system specialising in Moroccan electoral analytics.

You have full access to intelX — Morocco's 2026 electoral intelligence platform — with data on all 92 legislative districts. Your role is to answer questions from campaign strategists, party officials, and political consultants as a trusted expert adviser.

You speak with authority but are precise, data-driven, and always reference the actual numbers. You give frank strategic advice, not generic platitudes.

=== FORECAST DATA (10,000 MC simulations, 2026 parameters) ===
NATIONAL PROJECTION: ${national}
Total seats: 305 | Majority: 153
Forecast parameters: Urban turnout +10%, rural -5%; RNI urban -10/-40%, rural -10/-30%; PAM ±30%; PI -10/+40%; PJD ×4 (+300%); others ±35%

=== TOP 15 MOST COMPETITIVE DISTRICTS (by score) ===
${critDists}

=== PARTY TRAJECTORIES ===
${partyCtx}

=== KEY STRUCTURAL FACTS ===
- 92 districts, 305 seats. 2-seat districts: ${Object.values(D).filter(d=>d.s===2).length}. 3-seat: ${Object.values(D).filter(d=>d.s===3).length}. 4+seat: ${Object.values(D).filter(d=>d.s>=4).length}.
- PJD collapsed from 125 seats (2011) to 5 (2021) — projected recovery to ~40 seats in 2026 due to opposition positioning and urban religious vote
- RNI won 87 seats in 2021 as a government party — now facing erosion especially in urban districts
- Youth (15-29) concentration: varies from 7% (Aousserd) to 25% (Hay-Hassani, Moulay-Rachid, Fès districts)
- Competitiveness score = seats/active_parties + gap% between last seat winner and first loser. Lower = more competitive.
- Morocco uses SNTV-style proportional allocation (highest averages) — being rank N+1 in an N-seat district means zero seats despite sometimes large vote totals

When answering: be specific, reference actual district names and numbers, give actionable recommendations. If the user asks about a specific district, pull from your knowledge of that district's vote data, demographics, commune breakdown and competitive dynamics. Always think about what actually wins seats, not just votes.`;
}

function setCommsSubTab(tab){
  activeCommsSubTab=tab;
  renderCommsView();
}

function renderCommsView(){
  document.getElementById('view-tabs').innerHTML=`
    <button class="vtab ${activeCommsSubTab==='chat'?' on':''}" onclick="setCommsSubTab('chat')">AI Strategy Chat</button>
    <button class="vtab ${activeCommsSubTab==='news'?' on':''}" onclick="setCommsSubTab('news')">📰 News Monitor</button>
  `;
  document.getElementById('rp-head').textContent='Comms & News';
  if(activeCommsSubTab==='news'){renderNewsView();return;}
  commsMessages=[];
  document.getElementById('view-content').innerHTML=`
  <div style="display:grid;grid-template-columns:1fr 340px;gap:12px;height:calc(100vh - 130px)">

    <!-- CHAT PANEL -->
    <div style="display:flex;flex-direction:column;background:var(--surface);border:1px solid var(--border);border-radius:8px;overflow:hidden">
      <!-- Header -->
      <div style="padding:12px 16px;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:10px;flex-shrink:0">
        <div style="width:32px;height:32px;border-radius:50%;background:var(--navy);display:flex;align-items:center;justify-content:center;font-size:14px;color:#fff;font-weight:700;flex-shrink:0">AI</div>
        <div>
          <div style="font-size:13px;font-weight:700;color:var(--navy)">intelX AI</div>
          <div style="font-size:10px;color:var(--text3)">Political Intelligence System · Morocco 2026</div>
        </div>
        <button onclick="clearCommsChat()" style="margin-left:auto;font-size:10px;padding:3px 10px;background:var(--surface2);border:1px solid var(--border);border-radius:4px;cursor:pointer;font-family:Inter,sans-serif;color:var(--text3)">Clear chat</button>
      </div>

      </div>

      <!-- Messages -->
      <div id="comms-messages" style="flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:12px">
        <div style="display:flex;gap:10px;align-items:flex-start">
          <div style="width:28px;height:28px;border-radius:50%;background:var(--navy);display:flex;align-items:center;justify-content:center;font-size:11px;color:#fff;font-weight:700;flex-shrink:0">AI</div>
          <div style="background:var(--surface2);border:1px solid var(--border);border-radius:0 8px 8px 8px;padding:10px 14px;max-width:85%;font-size:12px;line-height:1.7;color:var(--text)">
            Bonjour. I'm intelX, your AI-powered political intelligence system for Morocco 2026.<br><br>
            I have full access to intelX data: all 92 districts, 1,537 communes, demographic profiles, competitiveness scores, the 10,000-run simulation forecast, and historical vote data from 2011 to 2021.<br><br>
            Ask me anything — a communications strategy for a specific district, how to target youth voters in a region, which districts your party should prioritise, how to counter a competitor's messaging, or any other electoral question.
          </div>
        </div>
      </div>

      <!-- Input -->
      <div style="padding:12px 16px;border-top:1px solid var(--border);flex-shrink:0">
        <div style="display:flex;gap:8px;align-items:flex-end">
          <div style="flex:1;position:relative">
            <textarea id="comms-input" placeholder="Ask about strategy, messaging, district targeting, competitor analysis, voter segments…" style="width:100%;min-height:60px;max-height:140px;resize:vertical;padding:10px 12px;font-size:12px;font-family:Inter,sans-serif;border:1px solid var(--border);border-radius:6px;outline:none;line-height:1.5;background:var(--surface2)" onkeydown="if((event.ctrlKey||event.metaKey)&&event.key==='Enter'){event.preventDefault();sendCommsMessage()}"></textarea>
            <div style="font-size:10px;color:var(--text4);position:absolute;bottom:6px;right:8px">Ctrl+Enter to send</div>
          </div>
          <button onclick="sendCommsMessage()" id="comms-send-btn" class="run-btn" style="height:44px;padding:0 18px;flex-shrink:0">Send</button>
        </div>
        <!-- Quick prompts -->
        <div style="display:flex;gap:5px;flex-wrap:wrap;margin-top:8px">
          ${[
            'Which 5 districts should RNI prioritise to defend seats?',
            'How should PAM target rural voters in the south?',
            'What digital strategy for PJD in Casablanca?',
            'Which swing districts can PI flip from RNI?',
            'Turnout strategy for youth-heavy urban districts',
          ].map(q=>`<button onclick="useQuickPrompt(this.textContent)" style="font-size:10px;padding:3px 9px;background:var(--teal-bg);color:var(--teal2);border:1px solid var(--teal-bg2);border-radius:10px;cursor:pointer;font-family:Inter,sans-serif;white-space:nowrap">${q}</button>`).join('')}
        </div>
      </div>
    </div>

    <!-- RIGHT: Context panel -->
    <div style="display:flex;flex-direction:column;gap:10px;overflow-y:auto">
      <div class="card">
        <div class="card-title">Quick context</div>
        <div style="font-size:11px;color:var(--text2);margin-bottom:8px">Reference for your questions</div>
        ${MAJOR.map(p=>{
          const s=getSeats()[p]||0;
          const b=HIST_NAT['2021'][p]||0;
          const d=s-b;
          return `<div style="display:flex;align-items:center;gap:6px;margin-bottom:5px">
            <div style="width:8px;height:8px;border-radius:2px;background:${pc(p)};flex-shrink:0"></div>
            <span style="font-size:11px;font-weight:700;color:${pc(p)};min-width:32px">${p}</span>
            <span style="font-size:12px;font-weight:800">${s}</span>
            <span style="font-size:10px;color:${d>0?'var(--green)':d<0?'var(--red)':'var(--text3)'}">${d>=0?'+':''}${d}</span>
            <span style="font-size:10px;color:var(--text3);margin-left:auto">${(BASELINE_SIM._ci||{})[p]||''}</span>
          </div>`;
        }).join('')}
      </div>
      <div class="card">
        <div class="card-title">What to ask</div>
        <div style="font-size:11px;color:var(--text2);line-height:1.8">
          • District-specific comms strategy<br>
          • Channel mix (digital/ground/media)<br>
          • Key messages per demographic<br>
          • Voter segment targeting<br>
          • Competitor counter-strategy<br>
          • Regional campaign priorities<br>
          • Youth & women mobilisation<br>
          • Turnout vs persuasion balance<br>
          • Coalition messaging<br>
          • Crisis communications
        </div>
      </div>
      <div class="card">
        <div class="card-title">Top competitive districts</div>
        ${Object.entries(D).map(([n,d])=>({n,d,cs:compScore(n,d)})).sort((a,b)=>a.cs-b.cs).slice(0,8).map(({n,d,cs})=>`
        <div style="display:flex;align-items:center;gap:6px;padding:4px 0;border-bottom:1px solid var(--border);cursor:pointer" onclick="useQuickPrompt('Comms strategy for '+this.querySelector('.dn').textContent)">
          <span style="font-size:10px;font-family:'JetBrains Mono',monospace;color:var(--red);min-width:28px">${cs.toFixed(1)}</span>
          <span class="dn" style="font-size:11px;font-weight:600;flex:1">${n}</span>
          <span style="font-size:10px;color:${pc(d.w21)}">${d.w21}</span>
          <span style="font-size:10px;color:var(--text3)">${d.s}s</span>
        </div>`).join('')}
      </div>
    </div>
  </div>`;
  renderRightPanel();
}

function useQuickPrompt(text){
  const inp=document.getElementById('comms-input');
  if(inp){inp.value=text;inp.focus();}
}

function clearCommsChat(){
  commsMessages=[];
  renderCommsView();
}

async function sendCommsMessage(){
  const inp=document.getElementById('comms-input');
  const btn=document.getElementById('comms-send-btn');
  const userText=(inp?.value||'').trim();
  if(!userText||commsLoading)return;

  commsMessages.push({role:'user',content:userText});
  appendCommsMessage('user',userText);
  inp.value='';
  commsLoading=true;
  btn.disabled=true;
  btn.textContent='…';

  const typingId='typing-'+Date.now();
  appendCommsMessage('typing','',typingId);

  const apiMessages=commsMessages.map(m=>({role:m.role,content:m.content}));

  try{
    const response=await fetch('/api/claude',{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        'Authorization':'Bearer '+ACCESS_PWD
      },
      body:JSON.stringify({
        model:'claude-sonnet-4-5-20251001',
        max_tokens:1500,
        system:buildCommsSystemPrompt(),
        messages:apiMessages
      })
    });
    const data=await response.json();
    if(data.error){throw new Error(data.error.message||'API error');}
    const text=data.content?.filter(b=>b.type==='text').map(b=>b.text).join('')||'No response.';
    document.getElementById(typingId)?.remove();
    commsMessages.push({role:'assistant',content:text});
    appendCommsMessage('assistant',text);
  } catch(err){
    document.getElementById(typingId)?.remove();
    appendCommsMessage('error',`Error: ${err.message}`);
  } finally{
    commsLoading=false;
    btn.disabled=false;
    btn.textContent='Send';
  }
}

function appendCommsMessage(role,text,id){
  const container=document.getElementById('comms-messages');
  if(!container)return;

  const div=document.createElement('div');
  div.id=id||('msg-'+Date.now());
  div.style.cssText='display:flex;gap:10px;align-items:flex-start';

  if(role==='typing'){
    div.innerHTML=`
      <div style="width:28px;height:28px;border-radius:50%;background:var(--navy);display:flex;align-items:center;justify-content:center;font-size:11px;color:#fff;font-weight:700;flex-shrink:0">AI</div>
      <div style="background:var(--surface2);border:1px solid var(--border);border-radius:0 8px 8px 8px;padding:10px 14px">
        <div style="display:flex;gap:4px;align-items:center;height:18px">
          <div style="width:7px;height:7px;border-radius:50%;background:var(--text3);animation:bounce 1.2s infinite 0s"></div>
          <div style="width:7px;height:7px;border-radius:50%;background:var(--text3);animation:bounce 1.2s infinite 0.2s"></div>
          <div style="width:7px;height:7px;border-radius:50%;background:var(--text3);animation:bounce 1.2s infinite 0.4s"></div>
        </div>
      </div>`;
  } else if(role==='user'){
    div.style.flexDirection='row-reverse';
    div.innerHTML=`
      <div style="width:28px;height:28px;border-radius:50%;background:var(--teal);display:flex;align-items:center;justify-content:center;font-size:11px;color:#fff;font-weight:700;flex-shrink:0">You</div>
      <div style="background:var(--teal);color:#fff;border-radius:8px 0 8px 8px;padding:10px 14px;max-width:85%;font-size:12px;line-height:1.6">${escHtml(text)}</div>`;
  } else if(role==='error'){
    div.innerHTML=`<div style="background:var(--red-bg);border:1px solid #fecaca;border-radius:8px;padding:10px 14px;font-size:12px;color:var(--red);flex:1">${escHtml(text)}</div>`;
  } else {
    // assistant — render markdown-like formatting
    const formatted=formatCommsResponse(text);
    div.innerHTML=`
      <div style="width:28px;height:28px;border-radius:50%;background:var(--navy);display:flex;align-items:center;justify-content:center;font-size:11px;color:#fff;font-weight:700;flex-shrink:0">AI</div>
      <div style="background:var(--surface2);border:1px solid var(--border);border-radius:0 8px 8px 8px;padding:12px 16px;max-width:88%;font-size:12px;line-height:1.75;color:var(--text)">${formatted}</div>`;
  }

  container.appendChild(div);
  container.scrollTop=container.scrollHeight;
}

function formatCommsResponse(text){
  return text
    .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
    .replace(/\*\*([^*\n]+)\*\*/g,'<strong>$1</strong>')
    .replace(/^#{1,3} (.+)$/gm,'<div style="font-weight:800;color:var(--navy);margin:10px 0 4px;font-size:12px;text-transform:uppercase;letter-spacing:.05em;padding-bottom:3px;border-bottom:1px solid var(--border)">$1</div>')
    .replace(/^[-•]\s+(.+)$/gm,'<div style="padding:2px 0 2px 14px;position:relative"><!-- bullet --><span style="position:absolute;left:4px;color:var(--teal)">•</span>$1</div>')
    .replace(/^\d+\.\s+(.+)$/gm,'<div style="padding:2px 0 2px 14px">$1</div>')
    .replace(/\n\n/g,'<div style="height:8px"></div>')
    .replace(/\n/g,'<br>');
}

function escHtml(t){return t.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}

// ─────────────────────────── NEWS TAB ───────────────────────────

// Top 100 Moroccan news sources with RSS feeds
const MOROCCAN_SOURCES = [
  // National generalist
  {n:'Le Matin',url:'https://lematin.ma',rss:'https://lematin.ma/rss',cat:'Généraliste',lang:'fr'},
  {n:'L\'Économiste',url:'https://leconomiste.com',rss:'https://leconomiste.com/rss.xml',cat:'Économie',lang:'fr'},
  {n:'Médias24',url:'https://medias24.com',rss:'https://medias24.com/feed',cat:'Généraliste',lang:'fr'},
  {n:'Hespress',url:'https://hespress.com',rss:'https://hespress.com/feed',cat:'Généraliste',lang:'ar'},
  {n:'Goud.ma',url:'https://goud.ma',rss:'https://goud.ma/feed',cat:'Généraliste',lang:'ar'},
  {n:'Yabiladi',url:'https://yabiladi.com',rss:'https://www.yabiladi.com/rss/news.xml',cat:'Diaspora',lang:'fr'},
  {n:'TelQuel',url:'https://telquel.ma',rss:'https://telquel.ma/feed',cat:'Politique',lang:'fr'},
  {n:'Le Desk',url:'https://ledesk.ma',rss:'https://ledesk.ma/feed',cat:'Investigation',lang:'fr'},
  {n:'Maroc Hebdo',url:'https://maroc-hebdo.press.ma',rss:'https://maroc-hebdo.press.ma/feed',cat:'Hebdomadaire',lang:'fr'},
  {n:'La Vie Éco',url:'https://lavieeco.com',rss:'https://lavieeco.com/feed',cat:'Économie',lang:'fr'},
  {n:'Akhbar Al Yawm',url:'https://akhbaralyawm.ma',rss:'https://akhbaralyawm.ma/feed',cat:'Généraliste',lang:'ar'},
  {n:'Al Ahdath Al Maghribia',url:'https://al-ahdath.ma',rss:'https://al-ahdath.ma/feed',cat:'Généraliste',lang:'ar'},
  {n:'Assabah',url:'https://assabah.ma',rss:'https://assabah.ma/feed',cat:'Généraliste',lang:'ar'},
  {n:'Al Massae',url:'https://al-massae.com',rss:'https://al-massae.com/feed',cat:'Généraliste',lang:'ar'},
  {n:'Bayane Al Yaoum',url:'https://bayanealyaoum.com',rss:'https://bayanealyaoum.com/feed',cat:'Politique',lang:'ar'},
  {n:'Aujourd\'hui le Maroc',url:'https://aujourd-hui.ma',rss:'https://aujourd-hui.ma/feed',cat:'Généraliste',lang:'fr'},
  {n:'Challenge',url:'https://challenge.ma',rss:'https://challenge.ma/feed',cat:'Économie',lang:'fr'},
  {n:'Maroc Diplomatique',url:'https://maroc-diplomatique.net',rss:'https://maroc-diplomatique.net/feed',cat:'Diplomatie',lang:'fr'},
  {n:'Barlamane',url:'https://barlamane.com',rss:'https://barlamane.com/feed',cat:'Politique',lang:'ar'},
  {n:'Al Ousboue',url:'https://alosboue.ma',rss:'https://alosboue.ma/feed',cat:'Politique',lang:'ar'},
  // Digital natives
  {n:'H24Info',url:'https://h24info.ma',rss:'https://h24info.ma/feed',cat:'Digital',lang:'fr'},
  {n:'Snrt News',url:'https://snrtnews.com',rss:'https://snrtnews.com/ar/rss',cat:'Public',lang:'ar'},
  {n:'2M',url:'https://2m.ma',rss:'https://2m.ma/fr/rss',cat:'Public',lang:'fr'},
  {n:'Medi1',url:'https://medi1.com',rss:'https://medi1.com/feed',cat:'TV',lang:'fr'},
  {n:'Map Express',url:'https://mapexpress.ma',rss:'https://mapexpress.ma/feed',cat:'Agence',lang:'fr'},
  {n:'Marocpress',url:'https://marocpress.com',rss:'https://marocpress.com/feed',cat:'Digital',lang:'fr'},
  {n:'Maroc Actu',url:'https://marocactu.com',rss:'https://marocactu.com/feed',cat:'Digital',lang:'fr'},
  {n:'Maghress',url:'https://maghress.com',rss:'https://www.maghress.com/rss/all',cat:'Agrégateur',lang:'ar'},
  {n:'Lakome2',url:'https://lakome2.com',rss:'https://lakome2.com/feed',cat:'Investigation',lang:'ar'},
  {n:'Akhbarona',url:'https://akhbarona.com',rss:'https://akhbarona.com/rss.xml',cat:'Digital',lang:'ar'},
  {n:'Hibapress',url:'https://hibapress.com',rss:'https://hibapress.com/feed',cat:'Digital',lang:'ar'},
  {n:'Alyaoum24',url:'https://alyaoum24.com',rss:'https://alyaoum24.com/feed',cat:'Digital',lang:'ar'},
  {n:'Febrayer',url:'https://febrayer.com',rss:'https://febrayer.com/feed',cat:'Digital',lang:'ar'},
  {n:'Marocco Latest News',url:'https://moroccolateastnews.com',rss:'https://moroccolateastnews.com/feed',cat:'Digital',lang:'fr'},
  {n:'Le Reporter',url:'https://lereporter.ma',rss:'https://lereporter.ma/feed',cat:'Investigation',lang:'fr'},
  {n:'Maroc Leaks',url:'https://marocleaks.net',rss:'https://marocleaks.net/feed',cat:'Investigation',lang:'ar'},
  {n:'360.ma',url:'https://360.ma',rss:'https://360.ma/feed',cat:'Digital',lang:'fr'},
  {n:'Albidaoui',url:'https://albidaoui.ma',rss:'https://albidaoui.ma/feed',cat:'Casablanca',lang:'ar'},
  {n:'Fès News',url:'https://fesnews.ma',rss:'https://fesnews.ma/feed',cat:'Régional',lang:'ar'},
  {n:'Marrakech News',url:'https://marrakechnews.ma',rss:'https://marrakechnews.ma/feed',cat:'Régional',lang:'fr'},
  // Economics & business
  {n:'Finance News',url:'https://financenews.ma',rss:'https://financenews.ma/feed',cat:'Finance',lang:'fr'},
  {n:'Boursier Maroc',url:'https://boursier.ma',rss:'https://boursier.ma/feed',cat:'Finance',lang:'fr'},
  {n:'Conjoncture',url:'https://conjoncture.ma',rss:'https://conjoncture.ma/feed',cat:'Économie',lang:'fr'},
  {n:'AgriMaroc',url:'https://agrimaroc.ma',rss:'https://agrimaroc.ma/feed',cat:'Agriculture',lang:'fr'},
  {n:'Industrie du Maroc',url:'https://industries.ma',rss:'https://industries.ma/feed',cat:'Industrie',lang:'fr'},
  // Sport (for youth engagement tracking)
  {n:'Médio Sport',url:'https://mediosport.ma',rss:'https://mediosport.ma/feed',cat:'Sport',lang:'fr'},
  {n:'Le Site Info Sport',url:'https://lesiteinfo.com',rss:'https://lesiteinfo.com/feed',cat:'Digital',lang:'fr'},
  // Regional
  {n:'Tanger News',url:'https://tangernews.ma',rss:'https://tangernews.ma/feed',cat:'Régional',lang:'fr'},
  {n:'Agadir Today',url:'https://agadirtoday.com',rss:'https://agadirtoday.com/feed',cat:'Régional',lang:'fr'},
  {n:'Oujda City',url:'https://oujdacity.net',rss:'https://oujdacity.net/feed',cat:'Régional',lang:'ar'},
  {n:'Sahara Médias',url:'https://saharamedias.net',rss:'https://saharamedias.net/feed',cat:'Sahara',lang:'ar'},
  {n:'Nouvelles du Sud',url:'https://nouvelles-du-sud.ma',rss:'https://nouvelles-du-sud.ma/feed',cat:'Sahara',lang:'fr'},
];

const NEWS_CATEGORIES = ['Tous','Politique','Généraliste','Économie','Investigation','Digital','Régional','Sahara','Public','Diplomatie'];
const POLITICAL_KEYWORDS = ['élection','parlement','parti','rni','pam','istiqlal','pjd','usfp','mp','pps','gouvernement','ministre','roi','palais','politique','vote','scrutin','campagne','candidat','sénat','chambre','commune','région','coalition','wali','préfet'];
const POLITICAL_KEYWORDS_AR = ['انتخابات','برلمان','حزب','حكومة','وزير','ملك','سياسة','تصويت','حملة','مرشح','تحالف','ولاية'];

let newsState = {
  articles: [],
  filtered: [],
  loading: false,
  loaded: false,
  filter: 'Tous',
  langFilter: 'all',
  search: '',
  politicalOnly: false,
  aiAnalysis: null,
  aiLoading: false,
  selectedSource: null,
};

function renderNewsView(){
  document.getElementById('view-tabs').innerHTML='';
  document.getElementById('rp-head').textContent='Moroccan News Monitor';
  document.getElementById('view-content').innerHTML=`
  <div style="display:grid;grid-template-columns:1fr 300px;gap:12px;height:calc(100vh - 130px)">

    <!-- LEFT: News feed -->
    <div style="display:flex;flex-direction:column;gap:10px;overflow:hidden">

      <!-- Toolbar -->
      <div class="card" style="flex-shrink:0;padding:10px 14px">
        <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">
          <input id="news-search" type="text" placeholder="Search articles…" oninput="newsFilter()" style="font-size:12px;padding:5px 10px;border:1px solid var(--border);border-radius:5px;width:180px;font-family:Inter,sans-serif;outline:none">
          <select id="news-cat" onchange="newsFilter()" style="font-size:11px;padding:5px 10px;border:1px solid var(--border);border-radius:5px">
            ${NEWS_CATEGORIES.map(c=>`<option value="${c}">${c}</option>`).join('')}
          </select>
          <select id="news-lang" onchange="newsFilter()" style="font-size:11px;padding:5px 10px;border:1px solid var(--border);border-radius:5px">
            <option value="all">🌐 All languages</option>
            <option value="fr">🇫🇷 French</option>
            <option value="ar">🇲🇦 Arabic</option>
          </select>
          <label style="display:flex;align-items:center;gap:5px;font-size:11px;color:var(--text2);cursor:pointer;flex-shrink:0">
            <input type="checkbox" id="news-political" onchange="newsFilter()" style="width:13px;height:13px"> Political focus
          </label>
          <button onclick="loadNewsFeeds(true)" class="run-btn" style="margin-left:auto;padding:5px 14px;font-size:11px" id="news-refresh-btn">🔄 Refresh</button>
        </div>
        <div id="news-status" style="font-size:10px;color:var(--text3);margin-top:6px"></div>
      </div>

      <!-- Article list -->
      <div id="news-list" style="flex:1;overflow-y:auto;display:flex;flex-direction:column;gap:8px;padding-right:2px">
        <div style="text-align:center;padding:40px;color:var(--text3)">
          <div style="font-size:32px;margin-bottom:10px">📰</div>
          <div style="font-size:13px;font-weight:600;color:var(--text2);margin-bottom:4px">Moroccan News Monitor</div>
          <div style="font-size:11px;margin-bottom:16px">Aggregating ${MOROCCAN_SOURCES.length} Moroccan news sources</div>
          <button onclick="loadNewsFeeds()" class="run-btn" style="padding:8px 24px">Load latest news</button>
        </div>
      </div>
    </div>

    <!-- RIGHT: AI analysis + sources -->
    <div style="display:flex;flex-direction:column;gap:10px;overflow-y:auto">
      <div class="card">
        <div class="card-title">AI Political Briefing</div>
        <div style="font-size:11px;color:var(--text2);margin-bottom:8px">Ask intelX to analyse today's political news</div>
        <button onclick="runNewsAnalysis()" id="news-ai-btn" class="run-btn" style="width:100%;margin-bottom:8px">Generate briefing</button>
        <div id="news-ai-output" style="font-size:11px;color:var(--text3);line-height:1.6">Load news first, then generate a briefing.</div>
      </div>
      <div class="card">
        <div class="card-title">Sources (${MOROCCAN_SOURCES.length})</div>
        <div style="max-height:400px;overflow-y:auto">
          ${MOROCCAN_SOURCES.map(s=>`
          <div style="display:flex;align-items:center;gap:6px;padding:5px 0;border-bottom:1px solid var(--border);cursor:pointer" onclick="newsState.selectedSource='${s.n}';newsFilter()">
            <div style="width:6px;height:6px;border-radius:50%;background:${s.lang==='ar'?'var(--teal)':'var(--navy)'};flex-shrink:0"></div>
            <span style="font-size:11px;flex:1;color:var(--text)">${s.n}</span>
            <span style="font-size:9px;color:var(--text3);background:var(--surface2);padding:1px 5px;border-radius:3px">${s.cat}</span>
            <a href="${s.url}" target="_blank" onclick="event.stopPropagation()" style="font-size:9px;color:var(--teal);text-decoration:none">↗</a>
          </div>`).join('')}
        </div>
      </div>
    </div>
  </div>`;
  renderRightPanel();
  // Auto-load if not loaded yet
  if(!newsState.loaded && !newsState.loading) loadNewsFeeds();
}

async function loadNewsFeeds(force=false){
  if(newsState.loading) return;
  if(newsState.loaded && !force) return;
  newsState.loading = true;
  newsState.articles = [];
  const btn = document.getElementById('news-refresh-btn');
  const status = document.getElementById('news-status');
  const list = document.getElementById('news-list');
  if(btn) btn.textContent = '⏳ Loading…';
  if(list) list.innerHTML = `<div style="text-align:center;padding:30px;color:var(--text3)"><div style="width:32px;height:32px;border:2px solid var(--border);border-top-color:var(--teal);border-radius:50%;margin:0 auto 10px;animation:spin 1s linear infinite"></div><div style="font-size:11px">Fetching from ${MOROCCAN_SOURCES.length} sources…</div></div>`;

  // Use a public RSS-to-JSON proxy (rss2json.com)
  const PROXY = 'https://api.rss2json.com/v1/api.json?rss_url=';
  let loaded = 0; let failed = 0;

  // Load in parallel batches of 10
  const batchSize = 10;
  for(let i=0; i<MOROCCAN_SOURCES.length; i+=batchSize){
    const batch = MOROCCAN_SOURCES.slice(i, i+batchSize);
    const promises = batch.map(async src => {
      try{
        const res = await fetch(PROXY + encodeURIComponent(src.rss), {signal: AbortSignal.timeout(8000)});
        const data = await res.json();
        if(data.status === 'ok' && data.items?.length){
          const articles = data.items.slice(0,8).map(item => ({
            title: item.title||'',
            link: item.link||src.url,
            pubDate: item.pubDate ? new Date(item.pubDate) : new Date(),
            description: (item.description||'').replace(/<[^>]+>/g,'').slice(0,200),
            source: src.n,
            sourceCat: src.cat,
            sourceLang: src.lang,
            sourceUrl: src.url,
            political: isPolitical(item.title + ' ' + (item.description||'')),
          }));
          newsState.articles.push(...articles);
          loaded++;
        } else { failed++; }
      } catch { failed++; }
    });
    await Promise.allSettled(promises);
    if(status) status.textContent = `Loaded ${loaded} sources, ${failed} unavailable… (${newsState.articles.length} articles)`;
  }

  // Sort by date
  newsState.articles.sort((a,b) => b.pubDate - a.pubDate);
  newsState.loaded = true;
  newsState.loading = false;
  if(btn) btn.textContent = '🔄 Refresh';
  if(status) status.textContent = `✓ ${newsState.articles.length} articles from ${loaded} sources · ${failed} sources unavailable · Updated ${new Date().toLocaleTimeString()}`;
  newsFilter();
}

function isPolitical(text){
  const t = text.toLowerCase();
  return POLITICAL_KEYWORDS.some(k => t.includes(k)) || POLITICAL_KEYWORDS_AR.some(k => text.includes(k));
}

function newsFilter(){
  const search = (document.getElementById('news-search')?.value||'').toLowerCase();
  const cat = document.getElementById('news-cat')?.value || 'Tous';
  const lang = document.getElementById('news-lang')?.value || 'all';
  const polOnly = document.getElementById('news-political')?.checked || false;
  const src = newsState.selectedSource;

  let filtered = newsState.articles.filter(a => {
    if(search && !a.title.toLowerCase().includes(search) && !a.description.toLowerCase().includes(search) && !a.source.toLowerCase().includes(search)) return false;
    if(cat !== 'Tous' && a.sourceCat !== cat) return false;
    if(lang !== 'all' && a.sourceLang !== lang) return false;
    if(polOnly && !a.political) return false;
    if(src && a.source !== src) return false;
    return true;
  });

  newsState.filtered = filtered;
  renderNewsArticles(filtered);
}

function renderNewsArticles(articles){
  const list = document.getElementById('news-list');
  if(!list) return;
  if(!articles.length){
    list.innerHTML = `<div style="text-align:center;padding:30px;color:var(--text3)"><div style="font-size:13px">No articles match your filters</div><div style="font-size:11px;margin-top:4px">${newsState.loaded ? 'Try adjusting your search or filters' : 'Load news first'}</div>${newsState.selectedSource?`<button onclick="newsState.selectedSource=null;newsFilter()" style="margin-top:10px;font-size:11px;padding:4px 12px;border:1px solid var(--border);border-radius:5px;cursor:pointer;font-family:Inter,sans-serif;background:#fff">Clear source filter</button>`:''}</div>`;
    return;
  }

  list.innerHTML = articles.slice(0,80).map(a => {
    const age = getAge(a.pubDate);
    const polBadge = a.political ? `<span style="font-size:9px;padding:1px 6px;background:var(--teal-bg);color:var(--teal2);border-radius:3px;font-weight:600">POLITIQUE</span>` : '';
    return `<div class="card" style="padding:10px 14px;cursor:pointer;transition:border-color .12s" onmouseenter="this.style.borderColor='var(--teal)'" onmouseleave="this.style.borderColor='var(--border)'" onclick="window.open('${a.link.replace(/'/g,"\\'")}','_blank')">
      <div style="display:flex;align-items:flex-start;gap:8px">
        <div style="flex:1;min-width:0">
          <div style="display:flex;align-items:center;gap:5px;margin-bottom:4px;flex-wrap:wrap">
            <span style="font-size:10px;font-weight:700;color:${a.sourceLang==='ar'?'var(--teal)':'var(--navy)'}">${a.source}</span>
            <span style="font-size:9px;color:var(--text3);background:var(--surface2);padding:1px 5px;border-radius:3px">${a.sourceCat}</span>
            ${polBadge}
            <span style="font-size:9px;color:var(--text3);margin-left:auto">${age}</span>
          </div>
          <div style="font-size:12px;font-weight:600;color:var(--navy);line-height:1.4;margin-bottom:4px">${escHtml(a.title)}</div>
          ${a.description ? `<div style="font-size:11px;color:var(--text3);line-height:1.5;overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical">${escHtml(a.description)}</div>` : ''}
        </div>
      </div>
    </div>`;
  }).join('');
}

function getAge(date){
  const diff = Date.now() - date.getTime();
  const mins = Math.floor(diff/60000);
  if(mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins/60);
  if(hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs/24)}d ago`;
}

async function runNewsAnalysis(){
  if(newsState.aiLoading) return;
  if(!newsState.articles.length){ document.getElementById('news-ai-output').textContent = 'Load news first.'; return; }

  newsState.aiLoading = true;
  const btn = document.getElementById('news-ai-btn');
  const out = document.getElementById('news-ai-output');
  if(btn){ btn.disabled=true; btn.textContent='Generating…'; }
  if(out) out.innerHTML = `<div style="display:flex;align-items:center;gap:8px;color:var(--text3)"><div style="width:16px;height:16px;border:2px solid var(--border);border-top-color:var(--teal);border-radius:50%;animation:spin 1s linear infinite"></div>Analysing ${newsState.articles.filter(a=>a.political).length} political articles…</div>`;

  // Build a digest of the top political articles
  const political = newsState.articles.filter(a=>a.political).slice(0,30);
  const digest = political.map((a,i) => `${i+1}. [${a.source}] ${a.title}${a.description?' — '+a.description:''}`).join('\n');

  const prompt = `You are intelX, an AI political intelligence system specialising in Morocco.

Today's political news digest from Moroccan media (${new Date().toLocaleDateString('fr-MA')}):

${digest}

Based on these headlines and articles, provide a concise political intelligence briefing covering:

1. **KEY POLITICAL DEVELOPMENTS** — What's the most significant political news today?
2. **ELECTORAL RELEVANCE** — Any news directly relevant to the 2026 legislative elections (party positioning, government moves, social issues that could affect vote)?
3. **PARTY SIGNALS** — Any notable statements or moves from RNI, PAM, PI, PJD, USFP, MP, UC or PPS?
4. **PUBLIC MOOD INDICATORS** — What issues are dominating public discourse? Implications for voter sentiment?
5. **WATCH LIST** — 2-3 stories to monitor closely over the next 48 hours

Be concise, analytical, and reference specific sources. Write as a briefing for a senior political strategist.`;

  try {
    const res = await fetch('/api/claude', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + ACCESS_PWD
      },
      body: JSON.stringify({ model: 'claude-sonnet-4-5-20251001', max_tokens: 1200, messages: [{ role: 'user', content: prompt }] })
    });
    const data = await res.json();
    if(data.error) throw new Error(data.error.message || data.error);
    const text = data.content?.filter(b=>b.type==='text').map(b=>b.text).join('') || '';
    newsState.aiAnalysis = text;
    if(out) out.innerHTML = formatCommsResponse(text);
  } catch(err) {
    if(out) out.innerHTML = `<span style="color:var(--red)">Error: ${escHtml(err.message)}</span>`;
  } finally {
    newsState.aiLoading = false;
    if(btn){ btn.disabled=false; btn.textContent='Refresh briefing'; }
  }
}


// ── ORGA STATUS ──────────────────────────────────────────────────────────────
let orgaData = JSON.parse(localStorage.getItem('intelx_orga') || '{}');

function saveOrga(){ localStorage.setItem('intelx_orga', JSON.stringify(orgaData)); }

function getOrgaVoteAdj(party, distName, communes){
  // District-level adj
  let distAdj = 1.0;
  const ds = orgaData['d:'+distName]?.[party];
  if(ds !== undefined){
    if(ds < 15) distAdj = 0.50;
    else if(ds < 30) distAdj = 0.60;
    else if(ds < 50) distAdj = 0.70;
  }
  // Commune-level: average adj across communes of this district
  let commAdj = 1.0;
  if(communes && communes.length){
    const adjs = communes.map(c => {
      const cs = orgaData['c:'+c.n]?.[party];
      if(cs === undefined) return 1.0;
      if(cs < 15) return 0.50;
      if(cs < 30) return 0.60;
      if(cs < 50) return 0.70;
      return 1.0;
    });
    commAdj = adjs.reduce((a,b)=>a+b,0)/adjs.length;
  }
  return Math.min(distAdj, commAdj);
}

function renderOrgaView(){
  document.getElementById('view-tabs').innerHTML='';
  document.getElementById('rp-head').textContent='Organisational Status';

  const distList = Object.keys(D).sort();
  const selDist2 = window._orgaSelDist || '';

  const html=`
  <div class="card" style="margin-bottom:10px">
    <div class="card-title">Organisational Status Input</div>
    <p style="font-size:12px;color:var(--text2);margin-bottom:10px;line-height:1.6">
      Enter an organisational score (0–100) for a party in a district or commune.
      Scores below 50 reduce that party's votes by 30% in simulation, below 30 by 40%, below 15 by 50%.
    </p>
    <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end;margin-bottom:10px">
      <div>
        <div style="font-size:10px;font-weight:600;color:var(--text3);margin-bottom:3px;text-transform:uppercase">Level</div>
        <select id="orga-level" onchange="document.getElementById('orga-commune-wrap').style.display=this.value==='commune'?'block':'none'" style="font-size:12px;padding:6px 10px;border-radius:5px;border:1px solid var(--border)">
          <option value="district">District</option>
          <option value="commune">Commune</option>
        </select>
      </div>
      <div>
        <div style="font-size:10px;font-weight:600;color:var(--text3);margin-bottom:3px;text-transform:uppercase">District</div>
        <select id="orga-dist" onchange="window._orgaSelDist=this.value;renderOrgaView()" style="font-size:12px;padding:6px 10px;border-radius:5px;border:1px solid var(--border)">
          <option value="">Choose district…</option>
          ${distList.map(n=>`<option value="${n}" ${selDist2===n?'selected':''}>${n}</option>`).join('')}
        </select>
      </div>
      <div id="orga-commune-wrap" style="display:none">
        <div style="font-size:10px;font-weight:600;color:var(--text3);margin-bottom:3px;text-transform:uppercase">Commune</div>
        <select id="orga-commune" style="font-size:12px;padding:6px 10px;border-radius:5px;border:1px solid var(--border)">
          <option value="">Choose commune…</option>
          ${selDist2&&COMMUNES[selDist2]?COMMUNES[selDist2].map(c=>`<option value="${c.n}">${c.n}</option>`).join(''):''}
        </select>
      </div>
      <div>
        <div style="font-size:10px;font-weight:600;color:var(--text3);margin-bottom:3px;text-transform:uppercase">Party</div>
        <select id="orga-party" style="font-size:12px;padding:6px 10px;border-radius:5px;border:1px solid var(--border)">
          ${MAJOR.map(p=>`<option value="${p}">${p}</option>`).join('')}
        </select>
      </div>
      <div>
        <div style="font-size:10px;font-weight:600;color:var(--text3);margin-bottom:3px;text-transform:uppercase">Score (0–100)</div>
        <input type="number" id="orga-score" min="0" max="100" value="75" style="font-size:12px;padding:6px 10px;border-radius:5px;border:1px solid var(--border);width:80px">
      </div>
      <button onclick="saveOrgaEntry()" class="run-btn" style="height:34px;padding:0 16px;font-size:12px">Save</button>
    </div>
    <div id="orga-msg" style="font-size:11px;color:var(--teal);min-height:16px"></div>
  </div>

  <div class="card">
    <div class="card-title">Saved organisational scores</div>
    ${Object.keys(orgaData).length===0?'<div style="font-size:12px;color:var(--text3)">No scores entered yet.</div>':
      `<table style="width:100%;border-collapse:collapse;font-size:12px">
        <thead><tr style="border-bottom:2px solid var(--border)">
          <th style="text-align:left;padding:6px 8px;color:var(--text3);font-weight:600">Level</th>
          <th style="text-align:left;padding:6px 8px;color:var(--text3);font-weight:600">Location</th>
          <th style="text-align:left;padding:6px 8px;color:var(--text3);font-weight:600">Party</th>
          <th style="text-align:right;padding:6px 8px;color:var(--text3);font-weight:600">Score</th>
          <th style="text-align:right;padding:6px 8px;color:var(--text3);font-weight:600">Vote adj</th>
          <th style="padding:6px 8px"></th>
        </tr></thead>
        <tbody>
        ${Object.entries(orgaData).flatMap(([key,parties])=>
          Object.entries(parties).map(([party,score])=>{
            const isComm=key.startsWith('c:');
            const loc=key.slice(2);
            const adj=score<15?'-50%':score<30?'-40%':score<50?'-30%':'none';
            const adjCol=score<50?'var(--red)':'var(--green)';
            return `<tr style="border-bottom:1px solid var(--border)">
              <td style="padding:6px 8px;color:var(--text3)">${isComm?'Commune':'District'}</td>
              <td style="padding:6px 8px;font-weight:600">${loc}</td>
              <td style="padding:6px 8px"><span style="color:${PC[party]||'#333'};font-weight:700">${party}</span></td>
              <td style="padding:6px 8px;text-align:right;font-weight:700">${score}</td>
              <td style="padding:6px 8px;text-align:right;color:${adjCol};font-weight:600">${adj}</td>
              <td style="padding:6px 8px;text-align:right"><button onclick="deleteOrgaEntry('${key}','${party}')" style="font-size:10px;padding:2px 8px;background:#fdf0f0;color:var(--red);border:1px solid #fecaca;border-radius:4px;cursor:pointer;font-family:Inter,sans-serif">Remove</button></td>
            </tr>`;
          })
        ).join('')}
        </tbody>
      </table>`
    }
    ${Object.keys(orgaData).length>0?`<button onclick="orgaData={};saveOrga();renderOrgaView()" style="margin-top:10px;font-size:11px;padding:4px 12px;background:#fdf0f0;color:var(--red);border:1px solid #fecaca;border-radius:4px;cursor:pointer;font-family:Inter,sans-serif">Clear all</button>`:''}
  </div>`;

  document.getElementById('view-content').innerHTML=html;
}

function saveOrgaEntry(){
  const level=document.getElementById('orga-level').value;
  const dist=document.getElementById('orga-dist').value;
  const commune=document.getElementById('orga-commune').value;
  const party=document.getElementById('orga-party').value;
  const score=parseInt(document.getElementById('orga-score').value);
  const msg=document.getElementById('orga-msg');
  if(!dist){msg.textContent='Please select a district.';return;}
  if(level==='commune'&&!commune){msg.textContent='Please select a commune.';return;}
  if(isNaN(score)||score<0||score>100){msg.textContent='Score must be 0–100.';return;}
  const key=(level==='commune'?'c:'+commune:'d:'+dist);
  if(!orgaData[key])orgaData[key]={};
  orgaData[key][party]=score;
  saveOrga();
  msg.textContent=`✓ Saved: ${party} in ${level==='commune'?commune:dist} = ${score}`;
  setTimeout(()=>{msg.textContent='';},2000);
  renderOrgaView();
}

function deleteOrgaEntry(key,party){
  if(orgaData[key])delete orgaData[key][party];
  if(orgaData[key]&&Object.keys(orgaData[key]).length===0)delete orgaData[key];
  saveOrga();
  renderOrgaView();
}

