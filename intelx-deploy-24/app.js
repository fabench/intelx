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
// ── INLINE DATA (no external DB needed) ──────────────────────
const D={"Agadir - Ida-ou-Tanane":{"r":"Souss - Massa","u":0,"s":4,"v":{"RNI":49865,"PAM":14724,"PI":8419,"PPS":7054,"USFP":7010,"PJD":5213},"w11":"RNI","w15":"RNI","w16":"RNI","w21":"RNI","m":0.04,"yth":12},"Al-Fida - Mers-Sultan":{"r":"Casablanca - Settat","u":1,"s":3,"v":{"RNI":9724,"PAM":5386,"PI":3415,"PJD":2077,"UC":950},"w11":"PJD","w15":"PJD","w16":"PJD","w21":"RNI","m":5.04,"yth":18},"Al-Haouz":{"r":"Marrakech - Safi","u":0,"s":4,"v":{"RNI":64923,"PI":33134,"PAM":28865,"UC":25528,"PPS":20497},"w11":"PI","w15":"RNI","w16":"PI","w21":"RNI","m":2.71,"yth":14},"Al-Hoceïma":{"r":"Tanger - Tétouan - Al Hoceima","u":0,"s":4,"v":{"PI":23418,"RNI":21401,"MP":14320,"PAM":14302,"USFP":12326},"w11":"PI","w15":"PI","w16":"PI","w21":"PI","m":1.86,"yth":15},"Aousserd":{"r":"Dakhla - Oued Ed-Dahab","u":1,"s":2,"v":{"PI":4264,"RNI":1439,"MP":1234},"w11":"PI","w15":null,"w16":"PI","w21":"PI","m":2.6,"yth":7},"Assa-Zag":{"r":"Guelmim - Oued-Noun","u":0,"s":2,"v":{"PAM":5454,"USFP":4359,"RNI":3322,"PI":1256},"w11":"PAM","w15":"PAM","w16":"PAM","w21":"PAM","m":6.26,"yth":11},"Azilal - Demnate":{"r":"Beni-Mellal - Khénifra","u":0,"s":3,"v":{"PAM":28810,"RNI":25617,"PI":12329,"USFP":7023},"w11":"PAM","w15":"PAM","w16":"PAM","w21":"PAM","m":6.41,"yth":14},"Aïn-Chock":{"r":"Casablanca - Settat","u":1,"s":3,"v":{"RNI":10721,"PAM":7824,"PI":2662,"PJD":2637},"w11":"PJD","w15":"PJD","w16":"PJD","w21":"RNI","m":0.08,"yth":22},"Aïn-Sebaâ - Hay-Mohammadi":{"r":"Casablanca - Settat","u":1,"s":4,"v":{"RNI":11319,"PAM":6338,"UC":5295,"PI":3575,"PJD":2938},"w11":"PJD","w15":"PJD","w16":"PJD","w21":"RNI","m":0.96,"yth":21},"Ben-M'sick":{"r":"Casablanca - Settat","u":1,"s":3,"v":{"UC":7950,"RNI":7634,"PAM":2483,"PJD":1744},"w11":"PJD","w15":"PJD","w16":"PJD","w21":"UC","m":2.7,"yth":19},"Benslimane":{"r":"Casablanca - Settat","u":0,"s":3,"v":{"PI":19544,"RNI":16005,"PPS":15129,"USFP":11106},"w11":"PI","w15":"PI","w16":"RNI","w21":"PI","m":5.04,"yth":13},"Berkane":{"r":"Oriental","u":0,"s":3,"v":{"RNI":25269,"PI":17477,"PAM":12765,"MP":4380},"w11":"PI","w15":"RNI","w16":"RNI","w21":"RNI","m":11.74,"yth":14},"Berrechid":{"r":"Casablanca - Settat","u":0,"s":4,"v":{"PI":42862,"RNI":38544,"PAM":20171,"USFP":14553},"w11":"PI","w15":"PI","w16":"PI","w21":"PI","m":7.77,"yth":15},"Boujdour":{"r":"Laâyoune - Sakia-El-Hamra","u":0,"s":2,"v":{"RNI":6199,"PI":5633,"PAM":4028},"w11":"RNI","w15":"RNI","w16":"RNI","w21":"RNI","m":8.51,"yth":9},"Boulemane":{"r":"Fès - Meknès","u":0,"s":3,"v":{"RNI":30769,"MP":9997,"PPS":9021,"PI":8571},"w11":"RNI","w15":"RNI","w16":"RNI","w21":"RNI","m":0.63,"yth":12},"Bzou - Ouaouizaght":{"r":"Beni-Mellal - Khénifra","u":0,"s":3,"v":{"RNI":26785,"PAM":24177,"MP":10946,"UC":9631},"w11":"PAM","w15":"RNI","w16":"PAM","w21":"RNI","m":1.4,"yth":14},"Béni-Mellal":{"r":"Beni-Mellal - Khénifra","u":0,"s":6,"v":{"RNI":38363,"PAM":33224,"PI":17301,"MP":12061,"USFP":11852},"w11":"RNI","w15":"RNI","w16":"PAM","w21":"RNI","m":0.88,"yth":16},"Casablanca - Anfa":{"r":"Casablanca - Settat","u":1,"s":4,"v":{"RNI":16024,"PI":6200,"PAM":3524,"PJD":3110},"w11":"PJD","w15":"PJD","w16":"PJD","w21":"RNI","m":2.25,"yth":23},"Chefchaouen":{"r":"Tanger - Tétouan - Al Hoceima","u":0,"s":4,"v":{"RNI":38612,"PAM":21320,"USFP":20877,"PI":19383},"w11":"RNI","w15":"RNI","w16":"RNI","w21":"RNI","m":7.43,"yth":13},"Chichaoua":{"r":"Marrakech - Safi","u":0,"s":4,"v":{"PAM":51463,"MP":21742,"RNI":21289,"PI":15893},"w11":"PAM","w15":"PAM","w16":"PAM","w21":"PAM","m":3.89,"yth":14},"Chtouka - Aït-Baha":{"r":"Souss - Massa","u":0,"s":3,"v":{"RNI":37684,"PAM":25218,"PI":23046},"w11":"RNI","w15":"RNI","w16":"RNI","w21":"RNI","m":18.87,"yth":16},"Driouch":{"r":"Oriental","u":0,"s":3,"v":{"RNI":21821,"PI":19670,"PAM":16993,"MP":15609},"w11":"RNI","w15":"RNI","w16":"RNI","w21":"RNI","m":1.79,"yth":15},"El-Gharb":{"r":"Rabat - Salé - Kénitra","u":0,"s":3,"v":{"RNI":35654,"UC":22989,"PAM":15087,"PJD":7193},"w11":"RNI","w15":"RNI","w16":"RNI","w21":"RNI","m":7.65,"yth":14},"El-Hajeb":{"r":"Fès - Meknès","u":0,"s":2,"v":{"PI":27702,"RNI":21711,"PPS":10713},"w11":"PI","w15":"PI","w16":"PI","w21":"PI","m":13.37,"yth":13},"El-Jadida":{"r":"Casablanca - Settat","u":0,"s":6,"v":{"RNI":51192,"PI":34131,"PAM":28663,"PPS":22322,"USFP":19513,"MP":16528},"w11":"RNI","w15":"RNI","w16":"RNI","w21":"RNI","m":5.8,"yth":14},"El-Kelâa-des-Sraghna":{"r":"Marrakech - Safi","u":0,"s":4,"v":{"RNI":33491,"PI":24352,"PAM":20806,"USFP":20621},"w11":"PI","w15":"RNI","w16":"RNI","w21":"RNI","m":2.44,"yth":14},"Errachidia":{"r":"Drâa - Tafilalet","u":0,"s":5,"v":{"RNI":26960,"PI":16676,"PAM":14551,"USFP":12118},"w11":"RNI","w15":"RNI","w16":"RNI","w21":"RNI","m":2.79,"yth":13},"Es-Smara":{"r":"Laâyoune - Sakia-El-Hamra","u":0,"s":2,"v":{"PI":7636,"RNI":3094,"PAM":2701},"w11":"PI","w15":null,"w16":"PI","w21":"PI","m":2,"yth":10},"Essaouira":{"r":"Marrakech - Safi","u":0,"s":4,"v":{"USFP":33839,"RNI":30968,"PPS":23002,"PI":22025},"w11":"USFP","w15":"RNI","w16":"RNI","w21":"USFP","m":1.25,"yth":13},"Fahs - Anjra":{"r":"Tanger - Tétouan - Al Hoceima","u":0,"s":2,"v":{"RNI":15333,"PI":10499,"PJD":2216},"w11":"RNI","w15":"RNI","w16":"RNI","w21":"RNI","m":27.58,"yth":13},"Figuig":{"r":"Oriental","u":0,"s":3,"v":{"PAM":18882,"RNI":13196,"PI":6503,"PPS":3969},"w11":"PAM","w15":"PAM","w16":"PAM","w21":"PAM","m":4.89,"yth":12},"Fquih Ben Salah":{"r":"Beni-Mellal - Khénifra","u":0,"s":4,"v":{"RNI":35978,"MP":25334,"PAM":19877,"USFP":16217},"w11":"MP","w15":"RNI","w16":"USFP","w21":"RNI","m":3.33,"yth":14},"Fès-Chamalia":{"r":"Fès - Meknès","u":1,"s":4,"v":{"RNI":8911,"PI":7150,"PAM":5614,"PJD":4286},"w11":"PJD","w15":"PJD","w16":"PJD","w21":"RNI","m":2.74,"yth":24},"Fès-Janoubia":{"r":"Fès - Meknès","u":1,"s":4,"v":{"RNI":16528,"PI":8057,"PAM":7285,"USFP":5475,"PJD":5266},"w11":"PJD","w15":"PJD","w16":"PJD","w21":"RNI","m":0.38,"yth":23},"Guelmim":{"r":"Guelmim - Oued-Noun","u":0,"s":2,"v":{"PAM":20753,"RNI":17928,"PI":7481},"w11":"PAM","w15":"PAM","w16":"PAM","w21":"PAM","m":15.9,"yth":13},"Guercif":{"r":"Oriental","u":0,"s":2,"v":{"PAM":19221,"PI":16015,"RNI":14848},"w11":"PAM","w15":"PI","w16":"PAM","w21":"PAM","m":2.03,"yth":14},"Guéliz - Annakhil":{"r":"Marrakech - Safi","u":0,"s":3,"v":{"PAM":28423,"RNI":17193,"PI":9990},"w11":"PAM","w15":"PAM","w16":"PAM","w21":"PAM","m":1.38,"yth":17},"Hay-Hassani":{"r":"Casablanca - Settat","u":1,"s":3,"v":{"RNI":9608,"PAM":3923,"PI":3794,"PJD":2566},"w11":"PJD","w15":"PJD","w16":"PJD","w21":"RNI","m":4.45,"yth":25},"Ifrane":{"r":"Fès - Meknès","u":0,"s":2,"v":{"RNI":19736,"MP":18106,"PI":8712},"w11":"RNI","w15":"RNI","w16":"RNI","w21":"RNI","m":17.71,"yth":12},"Inézgane - Aït-Melloul":{"r":"Souss - Massa","u":1,"s":3,"v":{"RNI":21554,"PAM":11691,"PI":11366,"USFP":6769},"w11":"RNI","w15":"RNI","w16":"RNI","w21":"RNI","m":6.23,"yth":20},"Jerada":{"r":"Oriental","u":0,"s":2,"v":{"PAM":10249,"RNI":10106,"PI":6553,"PPS":6504},"w11":"PAM","w15":"PAM","w16":"RNI","w21":"PAM","m":8.99,"yth":14},"Karia - Rhafsai":{"r":"Fès - Meknès","u":0,"s":3,"v":{"RNI":34183,"PI":25380,"PAM":22871},"w11":"RNI","w15":"RNI","w16":"RNI","w21":"RNI","m":15.13,"yth":13},"Khouribga":{"r":"Beni-Mellal - Khénifra","u":0,"s":6,"v":{"RNI":22431,"PAM":18816,"MP":17280,"PI":16867,"USFP":15284,"PPS":12520},"w11":"MP","w15":"PAM","w16":"PAM","w21":"RNI","m":2.27,"yth":16},"Khémisset - Oulmès":{"r":"Rabat - Salé - Kénitra","u":0,"s":3,"v":{"RNI":17901,"MP":17634,"PAM":14785},"w11":"RNI","w15":"RNI","w16":"RNI","w21":"RNI","m":6.54,"yth":14},"Khénifra":{"r":"Beni-Mellal - Khénifra","u":0,"s":3,"v":{"RNI":37141,"MP":25547,"PI":15223},"w11":"RNI","w15":"RNI","w16":"USFP","w21":"RNI","m":3.1,"yth":14},"Kénitra":{"r":"Rabat - Salé - Kénitra","u":0,"s":4,"v":{"RNI":46682,"UC":17811,"PI":16772,"PJD":10206},"w11":"RNI","w15":"RNI","w16":"RNI","w21":"RNI","m":1.62,"yth":17},"Larache":{"r":"Tanger - Tétouan - Al Hoceima","u":0,"s":4,"v":{"RNI":34052,"PI":24051,"UC":18194,"PAM":14241},"w11":"RNI","w15":"RNI","w16":"RNI","w21":"RNI","m":8.76,"yth":14},"Laâyoune":{"r":"Laâyoune - Sakia-El-Hamra","u":0,"s":3,"v":{"PI":45861,"PAM":15779,"RNI":7625},"w11":"PI","w15":"PI","w16":"PI","w21":"PI","m":3.92,"yth":12},"M'Diq - Fnideq":{"r":"Tanger - Tétouan - Al Hoceima","u":1,"s":2,"v":{"PAM":8776,"USFP":4609,"RNI":4128,"PPS":3120},"w11":"PAM","w15":"PAM","w16":"PAM","w21":"PAM","m":1.34,"yth":19},"Meknès":{"r":"Fès - Meknès","u":0,"s":6,"v":{"PI":29424,"RNI":28115,"MP":21808,"UC":12747,"PAM":10743,"PJD":6965},"w11":"RNI","w15":"RNI","w16":"RNI","w21":"PI","m":2.47,"yth":17},"Midelt":{"r":"Drâa - Tafilalet","u":0,"s":3,"v":{"RNI":31528,"PI":23138,"MP":20509},"w11":"RNI","w15":"RNI","w16":"RNI","w21":"RNI","m":20.22,"yth":13},"Mohammadia":{"r":"Casablanca - Settat","u":0,"s":3,"v":{"RNI":23857,"PI":14899,"PAM":8729},"w11":"RNI","w15":"RNI","w16":"RNI","w21":"RNI","m":5.59,"yth":16},"Moulay-Rachid":{"r":"Casablanca - Settat","u":1,"s":3,"v":{"RNI":13740,"PI":4819,"PPS":4167,"PAM":3243,"PJD":3170},"w11":"PJD","w15":"PJD","w16":"PJD","w21":"RNI","m":2.48,"yth":24},"Moulay-Yacoub":{"r":"Fès - Meknès","u":0,"s":2,"v":{"PAM":18133,"RNI":14809,"PI":10245},"w11":"PAM","w15":"PAM","w16":"PAM","w21":"PAM","m":8.11,"yth":13},"Médina - Sidi-Youssef-Ben-Ali":{"r":"Marrakech - Safi","u":1,"s":3,"v":{"PAM":15686,"PI":11395,"RNI":8319},"w11":"PAM","w15":"PAM","w16":"PAM","w21":"PAM","m":9.76,"yth":18},"Médiouna":{"r":"Casablanca - Settat","u":1,"s":2,"v":{"PI":13346,"PAM":13129,"RNI":11320},"w11":"PI","w15":"RNI","w16":"RNI","w21":"PI","m":4.23,"yth":18},"Ménara":{"r":"Marrakech - Safi","u":0,"s":3,"v":{"PAM":21058,"RNI":17751,"PI":14264},"w11":"PAM","w15":"PAM","w16":"PAM","w21":"PAM","m":8.92,"yth":17},"Nador":{"r":"Oriental","u":0,"s":4,"v":{"RNI":37253,"PAM":24103,"USFP":18798,"PI":16180},"w11":"RNI","w15":"RNI","w16":"RNI","w21":"RNI","m":8.03,"yth":16},"Nouaceur":{"r":"Casablanca - Settat","u":1,"s":3,"v":{"RNI":20886,"PAM":13087,"PI":9729},"w11":"RNI","w15":"RNI","w16":"RNI","w21":"RNI","m":11.02,"yth":19},"Ouarzazate":{"r":"Drâa - Tafilalet","u":0,"s":3,"v":{"RNI":29645,"MP":22558,"PAM":13610},"w11":"RNI","w15":"RNI","w16":"RNI","w21":"RNI","m":8.64,"yth":13},"Oued-Ed-Dahab":{"r":"Dakhla - Oued Ed-Dahab","u":0,"s":2,"v":{"PI":9772,"RNI":5286,"MP":3766},"w11":"PI","w15":null,"w16":"PI","w21":"PI","m":5.43,"yth":10},"Ouezzane":{"r":"Tanger - Tétouan - Al Hoceima","u":0,"s":3,"v":{"RNI":30715,"PAM":27530,"PI":17348},"w11":"PAM","w15":"RNI","w16":"RNI","w21":"RNI","m":4.95,"yth":13},"Oujda - Angad":{"r":"Oriental","u":0,"s":4,"v":{"PAM":21635,"RNI":18984,"PI":5191,"USFP":2900},"w11":"RNI","w15":"RNI","w16":"RNI","w21":"PAM","m":0.32,"yth":21},"Rabat - Challah":{"r":"Rabat - Salé - Kénitra","u":1,"s":3,"v":{"RNI":14099,"PAM":9155,"PI":6668,"USFP":5980},"w11":"RNI","w15":"RNI","w16":"RNI","w21":"RNI","m":1.38,"yth":18},"Rabat - El Mouhit":{"r":"Rabat - Salé - Kénitra","u":1,"s":4,"v":{"RNI":11894,"PAM":5430,"MP":3776,"PI":3476},"w11":"RNI","w15":"RNI","w16":"RNI","w21":"RNI","m":0.91,"yth":20},"Rehamna":{"r":"Marrakech - Safi","u":0,"s":3,"v":{"PAM":30729,"RNI":27004,"PI":13372},"w11":"PAM","w15":"PAM","w16":"PAM","w21":"PAM","m":6.44,"yth":14},"Safi":{"r":"Marrakech - Safi","u":0,"s":6,"v":{"PAM":33910,"PI":21992,"MP":18670,"RNI":17406,"MDS":14959,"UC":13831},"w11":"PAM","w15":"PAM","w16":"PAM","w21":"PAM","m":1.48,"yth":15},"Salé - Al-Jadida":{"r":"Rabat - Salé - Kénitra","u":1,"s":3,"v":{"RNI":15471,"PI":13986,"PAM":9910},"w11":"RNI","w15":"RNI","w16":"RNI","w21":"RNI","m":9.46,"yth":19},"Salé - Médina":{"r":"Rabat - Salé - Kénitra","u":1,"s":4,"v":{"RNI":10362,"PAM":9608,"PPS":7493,"MP":5734},"w11":"RNI","w15":"RNI","w16":"RNI","w21":"RNI","m":0.37,"yth":22},"Sefrou":{"r":"Fès - Meknès","u":0,"s":3,"v":{"RNI":23253,"USFP":20427,"PAM":20351},"w11":"USFP","w15":"RNI","w16":"RNI","w21":"RNI","m":12.2,"yth":13},"Settat":{"r":"Casablanca - Settat","u":0,"s":6,"v":{"RNI":38357,"PI":35863,"UC":32718,"PAM":25244,"USFP":16315},"w11":"RNI","w15":"RNI","w16":"RNI","w21":"RNI","m":0.53,"yth":15},"Sidi Bennour":{"r":"Casablanca - Settat","u":0,"s":4,"v":{"USFP":31687,"PAM":31012,"PI":23367,"RNI":22062},"w11":"USFP","w15":"PAM","w16":"USFP","w21":"USFP","m":3.89,"yth":14},"Sidi Ifni":{"r":"Guelmim - Oued-Noun","u":0,"s":2,"v":{"RNI":26325,"PAM":21532,"USFP":4946},"w11":"RNI","w15":"RNI","w16":"RNI","w21":"RNI","m":27.41,"yth":11},"Sidi Slimane":{"r":"Rabat - Salé - Kénitra","u":0,"s":3,"v":{"UC":25285,"USFP":19741,"RNI":16866},"w11":"UC","w15":"UC","w16":"UC","w21":"UC","m":8.5,"yth":14},"Sidi-Bernoussi":{"r":"Casablanca - Settat","u":1,"s":3,"v":{"RNI":10906,"PAM":6557,"PJD":3811,"PI":3729},"w11":"PJD","w15":"PJD","w16":"PJD","w21":"RNI","m":0.21,"yth":23},"Sidi-Kacem":{"r":"Rabat - Salé - Kénitra","u":0,"s":5,"v":{"RNI":43887,"MP":23867,"PAM":23491,"USFP":21637,"PI":20971},"w11":"RNI","w15":"RNI","w16":"RNI","w21":"RNI","m":6.29,"yth":13},"Skhirate - Témara":{"r":"Rabat - Salé - Kénitra","u":1,"s":4,"v":{"RNI":21379,"UC":16561,"PAM":15843,"PI":13076},"w11":"RNI","w15":"RNI","w16":"RNI","w21":"RNI","m":8.22,"yth":18},"Tan-Tan":{"r":"Guelmim - Oued-Noun","u":0,"s":2,"v":{"PAM":4885,"RNI":3747,"PI":3522},"w11":"PAM","w15":"RNI","w16":"RNI","w21":"PAM","m":0.85,"yth":12},"Tanger - Assilah":{"r":"Tanger - Tétouan - Al Hoceima","u":0,"s":5,"v":{"UC":23562,"PAM":20699,"PI":20095,"RNI":19268,"USFP":11643},"w11":"UC","w15":"UC","w16":"UC","w21":"UC","m":3.45,"yth":21},"Taounate - Tissa":{"r":"Fès - Meknès","u":0,"s":3,"v":{"RNI":39327,"PAM":26072,"PI":13223,"PPS":11270},"w11":"RNI","w15":"RNI","w16":"RNI","w21":"RNI","m":1.92,"yth":14},"Taourirt":{"r":"Oriental","u":0,"s":2,"v":{"RNI":13475,"PAM":12896,"PI":11919},"w11":"RNI","w15":"RNI","w16":"RNI","w21":"RNI","m":1.67,"yth":15},"Tarfaya":{"r":"Laâyoune - Sakia-El-Hamra","u":0,"s":2,"v":{"RNI":4768,"PI":3101,"USFP":1527},"w11":"RNI","w15":"RNI","w16":"RNI","w21":"RNI","m":16.13,"yth":9},"Taroudannt - Al-Janoubia":{"r":"Souss - Massa","u":0,"s":4,"v":{"RNI":48243,"PI":41632,"PAM":27927,"PJD":19105},"w11":"RNI","w15":"RNI","w16":"RNI","w21":"RNI","m":5.05,"yth":16},"Taroudannt - Chamalia":{"r":"Souss - Massa","u":0,"s":3,"v":{"RNI":57404,"PI":33901,"PAM":29740},"w11":"RNI","w15":"RNI","w16":"RNI","w21":"RNI","m":20.01,"yth":15},"Tata":{"r":"Souss - Massa","u":0,"s":2,"v":{"RNI":18153,"PAM":11471,"PI":10794},"w11":"RNI","w15":"RNI","w16":"RNI","w21":"RNI","m":1.35,"yth":12},"Taza":{"r":"Fès - Meknès","u":0,"s":5,"v":{"PAM":29580,"RNI":27281,"PI":20237,"MP":19152,"PPS":15011},"w11":"PAM","w15":"RNI","w16":"RNI","w21":"PAM","m":3.77,"yth":15},"Tifelt - Rommani":{"r":"Rabat - Salé - Kénitra","u":0,"s":3,"v":{"RNI":29613,"MDS":22617,"PAM":20072},"w11":"RNI","w15":"RNI","w16":"RNI","w21":"RNI","m":12.2,"yth":14},"Tinghir":{"r":"Drâa - Tafilalet","u":0,"s":3,"v":{"RNI":39646,"PPS":19959,"PAM":19794},"w11":"RNI","w15":"RNI","w16":"RNI","w21":"RNI","m":11.22,"yth":13},"Tiznit":{"r":"Souss - Massa","u":0,"s":2,"v":{"RNI":37931,"PI":8107,"PPS":5301},"w11":"RNI","w15":"RNI","w16":"RNI","w21":"RNI","m":4.26,"yth":13},"Tétouan":{"r":"Tanger - Tétouan - Al Hoceima","u":0,"s":5,"v":{"RNI":27062,"PAM":25963,"PI":11228,"UC":5367,"USFP":5016},"w11":"PAM","w15":"RNI","w16":"RNI","w21":"RNI","m":2.74,"yth":17},"Youssoufia":{"r":"Marrakech - Safi","u":0,"s":2,"v":{"PAM":20171,"PI":16454,"RNI":14405},"w11":"PAM","w15":"PAM","w16":"PAM","w21":"PAM","m":2.96,"yth":14},"Zagora":{"r":"Drâa - Tafilalet","u":0,"s":3,"v":{"RNI":25191,"USFP":21490,"PI":20785,"MP":12508},"w11":"RNI","w15":"RNI","w16":"RNI","w21":"RNI","m":8.94,"yth":13}};
const TO_MAP={"Hay-Hassani":{"to11":0.375,"to15":0.253,"to16":0.272,"to21":0.204,"to_leg":0.323,"delta":0.095,"elas":7.33,"voixAdd":23106,"prog":0.844},"Nouaceur":{"to11":0.535,"to15":0.484,"to16":0.397,"to21":0.506,"to_leg":0.466,"delta":-0.029,"elas":0.813,"voixAdd":46881,"prog":0.83},"Sidi-Bernoussi":{"to11":0.363,"to15":0.267,"to16":0.252,"to21":0.213,"to_leg":0.308,"delta":0.068,"elas":1.275,"voixAdd":28596,"prog":0.736},"Fès-Chamalia":{"to11":0.461,"to15":0.363,"to16":0.318,"to21":0.273,"to_leg":0.389,"delta":0.072,"elas":-3.172,"voixAdd":29358,"prog":0.616},"Tanger - Assilah":{"to11":0.415,"to15":0.367,"to16":0.309,"to21":0.329,"to_leg":0.362,"delta":0.014,"elas":0.105,"voixAdd":71534,"prog":0.616},"Médiouna":{"to11":0.612,"to15":0.538,"to16":0.456,"to21":0.608,"to_leg":0.534,"delta":-0.039,"elas":1.02,"voixAdd":24659,"prog":0.576},"Aïn-Chock":{"to11":0.424,"to15":0.303,"to16":0.344,"to21":0.263,"to_leg":0.384,"delta":0.101,"elas":10.915,"voixAdd":17152,"prog":0.555},"Ménara":{"to11":0.523,"to15":0.418,"to16":0.359,"to21":0.406,"to_leg":0.441,"delta":0.029,"elas":0.205,"voixAdd":40808,"prog":0.534},"Salé - Al-Jadida":{"to11":0.43,"to15":0.376,"to16":0.315,"to21":0.357,"to_leg":0.373,"delta":0.006,"elas":0.202,"voixAdd":27474,"prog":0.484},"Fès-Janoubia":{"to11":0.474,"to15":0.396,"to16":0.335,"to21":0.28,"to_leg":0.405,"delta":0.067,"elas":-4.677,"voixAdd":26940,"prog":0.482},"Skhirate - Témara":{"to11":0.512,"to15":0.466,"to16":0.386,"to21":0.466,"to_leg":0.449,"delta":-0.017,"elas":0.901,"voixAdd":43388,"prog":0.443},"Oued-Ed-Dahab":{"to11":0.585,"to15":0.42,"to16":0.425,"to21":0.553,"to_leg":0.505,"delta":0.019,"elas":0.727,"voixAdd":10498,"prog":0.39},"Moulay-Rachid":{"to11":0.338,"to15":0.241,"to16":0.218,"to21":0.216,"to_leg":0.278,"delta":0.049,"elas":1.938,"voixAdd":12274,"prog":0.334},"Mohammadia":{"to11":0.424,"to15":0.395,"to16":0.343,"to21":0.402,"to_leg":0.384,"delta":-0.014,"elas":0.541,"voixAdd":20762,"prog":0.314},"Guéliz - Annakhil":{"to11":0.491,"to15":0.479,"to16":0.403,"to21":0.487,"to_leg":0.447,"delta":-0.036,"elas":0.583,"voixAdd":24836,"prog":0.305},"Salé - Médina":{"to11":0.385,"to15":0.317,"to16":0.317,"to21":0.262,"to_leg":0.351,"delta":0.061,"elas":10.078,"voixAdd":15306,"prog":0.3},"M'Diq - Fnideq":{"to11":0.438,"to15":0.439,"to16":0.34,"to21":0.406,"to_leg":0.389,"delta":-0.034,"elas":0.558,"voixAdd":9848,"prog":0.296},"Inézgane - Aït-Melloul":{"to11":0.362,"to15":0.409,"to16":0.277,"to21":0.353,"to_leg":0.32,"delta":-0.061,"elas":1.065,"voixAdd":21013,"prog":0.292},"Meknès":{"to11":0.417,"to15":0.391,"to16":0.339,"to21":0.373,"to_leg":0.378,"delta":-0.004,"elas":0.132,"voixAdd":32021,"prog":0.246},"Oujda - Angad":{"to11":0.356,"to15":0.292,"to16":0.277,"to21":0.247,"to_leg":0.317,"delta":0.047,"elas":-1.475,"voixAdd":13437,"prog":0.22},"Berrechid":{"to11":0.557,"to15":0.57,"to16":0.397,"to21":0.618,"to_leg":0.477,"delta":-0.117,"elas":0.98,"voixAdd":28779,"prog":0.218},"Agadir - Ida-ou-Tanane":{"to11":0.38,"to15":0.385,"to16":0.278,"to21":0.36,"to_leg":0.329,"delta":-0.044,"elas":0.466,"voixAdd":21091,"prog":0.215},"Kénitra":{"to11":0.453,"to15":0.427,"to16":0.322,"to21":0.436,"to_leg":0.388,"delta":-0.044,"elas":0.836,"voixAdd":27707,"prog":0.206},"Tétouan":{"to11":0.381,"to15":0.351,"to16":0.328,"to21":0.358,"to_leg":0.355,"delta":0,"elas":0.175,"voixAdd":17647,"prog":0.205},"Casablanca - Anfa":{"to11":0.385,"to15":0.267,"to16":0.283,"to21":0.235,"to_leg":0.334,"delta":0.083,"elas":0.676,"voixAdd":7978,"prog":0.202},"Ben-M'sick":{"to11":0.386,"to15":0.3,"to16":0.282,"to21":0.266,"to_leg":0.334,"delta":0.051,"elas":0.649,"voixAdd":5048,"prog":0.195},"Médina - Sidi-Youssef-Ben-Ali":{"to11":0.45,"to15":0.363,"to16":0.313,"to21":0.411,"to_leg":0.382,"delta":-0.005,"elas":-0.266,"voixAdd":9460,"prog":0.185},"Chtouka - Aït-Baha":{"to11":0.432,"to15":0.555,"to16":0.389,"to21":0.575,"to_leg":0.411,"delta":-0.155,"elas":0.95,"voixAdd":16775,"prog":0.164},"Rabat - Challah":{"to11":0.501,"to15":0.369,"to16":0.374,"to21":0.365,"to_leg":0.438,"delta":0.071,"elas":1.231,"voixAdd":6599,"prog":0.164},"Moulay-Yacoub":{"to11":0.631,"to15":0.663,"to16":0.474,"to21":0.735,"to_leg":0.553,"delta":-0.147,"elas":1.572,"voixAdd":8851,"prog":0.158},"Larache":{"to11":0.458,"to15":0.453,"to16":0.383,"to21":0.527,"to_leg":0.42,"delta":-0.07,"elas":0.989,"voixAdd":14815,"prog":0.135},"El-Jadida":{"to11":0.425,"to15":0.522,"to16":0.342,"to21":0.581,"to_leg":0.384,"delta":-0.168,"elas":1.184,"voixAdd":27121,"prog":0.135},"Benslimane":{"to11":0.565,"to15":0.614,"to16":0.467,"to21":0.681,"to_leg":0.516,"delta":-0.131,"elas":2.057,"voixAdd":10026,"prog":0.129},"Rabat - El Mouhit":{"to11":0.471,"to15":0.351,"to16":0.364,"to21":0.317,"to_leg":0.418,"delta":0.084,"elas":2.434,"voixAdd":5941,"prog":0.124},"Aïn-Sebaâ - Hay-Mohammadi":{"to11":0.346,"to15":0.261,"to16":0.259,"to21":0.227,"to_leg":0.303,"delta":0.059,"elas":7.354,"voixAdd":5152,"prog":0.12},"Al-Haouz":{"to11":0.565,"to15":0.594,"to16":0.415,"to21":0.686,"to_leg":0.49,"delta":-0.15,"elas":1.276,"voixAdd":18899,"prog":0.1},"El-Gharb":{"to11":0.525,"to15":0.554,"to16":0.425,"to21":0.643,"to_leg":0.475,"delta":-0.124,"elas":1.284,"voixAdd":11301,"prog":0.109},"El-Hajeb":{"to11":0.533,"to15":0.622,"to16":0.41,"to21":0.697,"to_leg":0.471,"delta":-0.188,"elas":4.404,"voixAdd":8522,"prog":0.108},"Rehamna":{"to11":0.453,"to15":0.573,"to16":0.382,"to21":0.642,"to_leg":0.417,"delta":-0.191,"elas":1.368,"voixAdd":9166,"prog":0.103},"Azilal - Demnate":{"to11":0.511,"to15":0.599,"to16":0.455,"to21":0.729,"to_leg":0.483,"delta":-0.181,"elas":1.671,"voixAdd":9077,"prog":0.111},"Sidi Slimane":{"to11":0.48,"to15":0.503,"to16":0.397,"to21":0.57,"to_leg":0.439,"delta":-0.098,"elas":1.436,"voixAdd":8427,"prog":0.097},"Sidi-Kacem":{"to11":0.537,"to15":0.595,"to16":0.394,"to21":0.675,"to_leg":0.466,"delta":-0.17,"elas":1.804,"voixAdd":14878,"prog":0.093},"Laâyoune":{"to11":0.495,"to15":0.472,"to16":0.514,"to21":0.684,"to_leg":0.504,"delta":-0.073,"elas":1.071,"voixAdd":8089,"prog":0.092},"Berkane":{"to11":0.45,"to15":0.478,"to16":0.368,"to21":0.517,"to_leg":0.409,"delta":-0.089,"elas":1.528,"voixAdd":6481,"prog":0.091},"Nador":{"to11":0.34,"to15":0.459,"to16":0.274,"to21":0.453,"to_leg":0.307,"delta":-0.149,"elas":2.008,"voixAdd":10280,"prog":0.088},"Midelt":{"to11":0.51,"to15":0.568,"to16":0.336,"to21":0.634,"to_leg":0.423,"delta":-0.178,"elas":3.558,"voixAdd":7622,"prog":0.088},"Ouarzazate":{"to11":0.547,"to15":0.55,"to16":0.423,"to21":0.607,"to_leg":0.485,"delta":-0.093,"elas":1.401,"voixAdd":7412,"prog":0.088},"Sefrou":{"to11":0.514,"to15":0.572,"to16":0.373,"to21":0.639,"to_leg":0.444,"delta":-0.162,"elas":2.398,"voixAdd":7828,"prog":0.087},"Errachidia":{"to11":0.529,"to15":0.536,"to16":0.464,"to21":0.585,"to_leg":0.497,"delta":-0.064,"elas":1.068,"voixAdd":9835,"prog":0.086},"Béni-Mellal":{"to11":0.413,"to15":0.496,"to16":0.356,"to21":0.54,"to_leg":0.385,"delta":-0.134,"elas":1.246,"voixAdd":12453,"prog":0.086},"Safi":{"to11":0.337,"to15":0.441,"to16":0.327,"to21":0.484,"to_leg":0.332,"delta":-0.13,"elas":1.1,"voixAdd":13465,"prog":0.085},"Bzou - Ouaouizaght":{"to11":0.545,"to15":0.622,"to16":0.458,"to21":0.701,"to_leg":0.501,"delta":-0.16,"elas":2.471,"voixAdd":7725,"prog":0.085},"El-Kelâa-des-Sraghna":{"to11":0.448,"to15":0.568,"to16":0.398,"to21":0.633,"to_leg":0.423,"delta":-0.177,"elas":1.676,"voixAdd":12734,"prog":0.083},"Chefchaouen":{"to11":0.512,"to15":0.566,"to16":0.482,"to21":0.637,"to_leg":0.497,"delta":-0.104,"elas":0.956,"voixAdd":9591,"prog":0.079},"Al-Fida - Mers-Sultan":{"to11":0.325,"to15":0.234,"to16":0.213,"to21":0.198,"to_leg":0.269,"delta":0.054,"elas":0.881,"voixAdd":1991,"prog":0.074},"Settat":{"to11":0.436,"to15":0.555,"to16":0.343,"to21":0.604,"to_leg":0.389,"delta":-0.19,"elas":2.394,"voixAdd":13216,"prog":0.074},"Taroudannt - Al-Janoubia":{"to11":0.47,"to15":0.581,"to16":0.414,"to21":0.576,"to_leg":0.442,"delta":-0.137,"elas":0.891,"voixAdd":11002,"prog":0.073},"Sidi Bennour":{"to11":0.429,"to15":0.575,"to16":0.458,"to21":0.691,"to_leg":0.444,"delta":-0.189,"elas":1.739,"voixAdd":10001,"prog":0.07},"Tifelt - Rommani":{"to11":0.511,"to15":0.585,"to16":0.471,"to21":0.647,"to_leg":0.491,"delta":-0.125,"elas":1.083,"voixAdd":6516,"prog":0.07},"Karia - Rhafsai":{"to11":0.506,"to15":0.665,"to16":0.506,"to21":0.742,"to_leg":0.506,"delta":-0.197,"elas":1.839,"voixAdd":6930,"prog":0.069},"Guercif":{"to11":0.365,"to15":0.503,"to16":0.402,"to21":0.582,"to_leg":0.383,"delta":-0.159,"elas":1.085,"voixAdd":3908,"prog":0.067},"Boulemane":{"to11":0.595,"to15":0.635,"to16":0.459,"to21":0.752,"to_leg":0.527,"delta":-0.167,"elas":2.222,"voixAdd":4848,"prog":0.067},"Taounate - Tissa":{"to11":0.394,"to15":0.622,"to16":0.413,"to21":0.701,"to_leg":0.404,"delta":-0.258,"elas":2.803,"voixAdd":6593,"prog":0.066},"Taza":{"to11":0.39,"to15":0.539,"to16":0.393,"to21":0.574,"to_leg":0.392,"delta":-0.165,"elas":4.545,"voixAdd":9021,"prog":0.064},"Khénifra":{"to11":0.484,"to15":0.541,"to16":0.392,"to21":0.573,"to_leg":0.438,"delta":-0.119,"elas":1.493,"voixAdd":6806,"prog":0.062},"Ifrane":{"to11":0.566,"to15":0.581,"to16":0.405,"to21":0.632,"to_leg":0.485,"delta":-0.121,"elas":2.239,"voixAdd":3207,"prog":0.062},"Es-Smara":{"to11":0.594,"to15":0.56,"to16":0.542,"to21":0.67,"to_leg":0.568,"delta":-0.047,"elas":0.91,"voixAdd":1134,"prog":0.059},"Youssoufia":{"to11":0.453,"to15":0.527,"to16":0.392,"to21":0.603,"to_leg":0.423,"delta":-0.142,"elas":1.428,"voixAdd":4092,"prog":0.058},"Khouribga":{"to11":0.362,"to15":0.45,"to16":0.306,"to21":0.504,"to_leg":0.334,"delta":-0.143,"elas":2.296,"voixAdd":7286,"prog":0.055},"Tan-Tan":{"to11":0.588,"to15":0.494,"to16":0.445,"to21":0.54,"to_leg":0.517,"delta":0,"elas":0.621,"voixAdd":1420,"prog":0.055},"Fquih Ben Salah":{"to11":0.697,"to15":0.499,"to16":0.337,"to21":0.505,"to_leg":0.517,"delta":0.015,"elas":0.957,"voixAdd":6902,"prog":0.054},"Ouezzane":{"to11":0.531,"to15":0.607,"to16":0.537,"to21":0.662,"to_leg":0.534,"delta":-0.101,"elas":0.742,"voixAdd":5003,"prog":0.052},"Boujdour":{"to11":0.717,"to15":0.589,"to16":0.571,"to21":0.64,"to_leg":0.644,"delta":0.029,"elas":0.429,"voixAdd":987,"prog":0.051},"Essaouira":{"to11":0.486,"to15":0.584,"to16":0.388,"to21":0.66,"to_leg":0.437,"delta":-0.185,"elas":2.37,"voixAdd":6844,"prog":0.048},"Khémisset - Oulmès":{"to11":0.434,"to15":0.49,"to16":0.371,"to21":0.54,"to_leg":0.402,"delta":-0.113,"elas":1.203,"voixAdd":3452,"prog":0.044},"Taourirt":{"to11":0.38,"to15":0.497,"to16":0.338,"to21":0.493,"to_leg":0.359,"delta":-0.136,"elas":1.22,"voixAdd":2261,"prog":0.039},"Chichaoua":{"to11":0.508,"to15":0.643,"to16":0.467,"to21":0.723,"to_leg":0.488,"delta":-0.195,"elas":1.314,"voixAdd":5259,"prog":0.038},"Tinghir":{"to11":0.529,"to15":0.555,"to16":0.39,"to21":0.622,"to_leg":0.459,"delta":-0.129,"elas":1.46,"voixAdd":3807,"prog":0.038},"Al-Hoceïma":{"to11":0.373,"to15":0.5,"to16":0.392,"to21":0.525,"to_leg":0.383,"delta":-0.13,"elas":0.844,"voixAdd":3690,"prog":0.035},"Tiznit":{"to11":0.479,"to15":0.497,"to16":0.369,"to21":0.563,"to_leg":0.424,"delta":-0.106,"elas":1.407,"voixAdd":1692,"prog":0.026},"Zagora":{"to11":0.509,"to15":0.568,"to16":0.468,"to21":0.644,"to_leg":0.489,"delta":-0.118,"elas":0.897,"voixAdd":2336,"prog":0.025},"Figuig":{"to11":0.517,"to15":0.585,"to16":0.42,"to21":0.671,"to_leg":0.469,"delta":-0.159,"elas":2.101,"voixAdd":996,"prog":0.02},"Guelmim":{"to11":0.541,"to15":0.564,"to16":0.391,"to21":0.583,"to_leg":0.466,"delta":-0.107,"elas":1.275,"voixAdd":1153,"prog":0.018},"Taroudannt - Chamalia":{"to11":0.562,"to15":0.616,"to16":0.458,"to21":0.681,"to_leg":0.51,"delta":-0.139,"elas":1.205,"voixAdd":1667,"prog":0.013},"Jerada":{"to11":0.516,"to15":0.541,"to16":0.393,"to21":0.601,"to_leg":0.454,"delta":-0.116,"elas":1.5,"voixAdd":-288,"prog":-0.007},"Sidi Ifni":{"to11":0.607,"to15":0.64,"to16":0.464,"to21":0.851,"to_leg":0.536,"delta":-0.21,"elas":40.355,"voixAdd":-643,"prog":-0.011},"Driouch":{"to11":0.412,"to15":0.514,"to16":0.406,"to21":0.585,"to_leg":0.409,"delta":-0.14,"elas":0.917,"voixAdd":-1706,"prog":-0.022},"Tata":{"to11":0.664,"to15":0.601,"to16":0.485,"to21":0.676,"to_leg":0.575,"delta":-0.064,"elas":1.027,"voixAdd":-1659,"prog":-0.033},"Assa-Zag":{"to11":0.766,"to15":0.736,"to16":0.597,"to21":0.801,"to_leg":0.682,"delta":-0.087,"elas":1.047,"voixAdd":-727,"prog":-0.044},"Tarfaya":{"to11":0.781,"to15":0.775,"to16":0.691,"to21":0.847,"to_leg":0.736,"delta":-0.075,"elas":0.874,"voixAdd":-499,"prog":-0.053},"Aousserd":{"to11":0.727,"to15":0.721,"to16":0.696,"to21":0.808,"to_leg":0.711,"delta":-0.053,"elas":0.685,"voixAdd":-1150,"prog":-0.146}};
const BASELINE_SIM={"_national":{"RNI":78,"PAM":70,"PI":65,"USFP":16,"MP":17,"UC":12,"PPS":7,"PJD":40},"_ci":{"RNI":"74–80","PAM":"66–73","PI":"62–69","USFP":"13–19","MP":"14–20","UC":"10–15","PPS":"5–10","PJD":"37–43"},"_ci_lo":{"RNI":74,"PAM":66,"PI":62,"USFP":13,"MP":14,"UC":10,"PPS":5,"PJD":37},"_ci_hi":{"RNI":80,"PAM":73,"PI":69,"USFP":19,"MP":20,"UC":15,"PPS":10,"PJD":43},"_runs":10000,"_baseline":true,"_label":"2026 Forecast (RNI urban-10/-40% rural-10/-30%, PAM±30%, PI+40%, PJD+300%, others±35%)","Agadir - Ida-ou-Tanane":{"seats":["RNI","PAM","PI","PPS"],"meanSeats":{"RNI":1,"PAM":1,"PI":0.691,"USFP":0.149,"MP":0,"UC":0,"PPS":0.161,"PJD":1}},"Al-Fida - Mers-Sultan":{"seats":["RNI","PAM","PI"],"meanSeats":{"RNI":1,"PAM":0.878,"PI":0.121,"USFP":0,"MP":0,"UC":0,"PPS":0,"PJD":1}},"Al-Haouz":{"seats":["RNI","PI","PAM","UC"],"meanSeats":{"RNI":1,"PAM":0.976,"PI":0.996,"USFP":0,"MP":0,"UC":0.718,"PPS":0.293,"PJD":0.017}},"Al-Hoceïma":{"seats":["PI","RNI","MP","PAM"],"meanSeats":{"RNI":0.948,"PAM":0.875,"PI":1,"USFP":0.372,"MP":0.646,"UC":0.159,"PPS":0,"PJD":0}},"Aousserd":{"seats":["PI","RNI"],"meanSeats":{"RNI":0.31,"PAM":0,"PI":1,"USFP":0,"MP":0.658,"UC":0,"PPS":0.032,"PJD":0}},"Assa-Zag":{"seats":["PAM","USFP"],"meanSeats":{"RNI":0.025,"PAM":1,"PI":0,"USFP":0.943,"MP":0,"UC":0,"PPS":0,"PJD":0.032}},"Azilal - Demnate":{"seats":["PAM","RNI","PI"],"meanSeats":{"RNI":1,"PAM":1,"PI":0.733,"USFP":0.001,"MP":0,"UC":0,"PPS":0,"PJD":0.266}},"Aïn-Chock":{"seats":["RNI","PAM","PI"],"meanSeats":{"RNI":1,"PAM":1,"PI":0,"USFP":0,"MP":0,"UC":0,"PPS":0,"PJD":1}},"Aïn-Sebaâ - Hay-Mohammadi":{"seats":["RNI","PAM","UC","PI"],"meanSeats":{"RNI":1,"PAM":0.944,"PI":0.241,"USFP":0.001,"MP":0.049,"UC":0.761,"PPS":0.004,"PJD":1}},"Ben-M'sick":{"seats":["UC","RNI","PAM"],"meanSeats":{"RNI":1,"PAM":0,"PI":0,"USFP":0,"MP":0,"UC":1,"PPS":0,"PJD":1}},"Benslimane":{"seats":["PI","RNI","PPS"],"meanSeats":{"RNI":0.293,"PAM":0.001,"PI":1,"USFP":0.15,"MP":0,"UC":0,"PPS":0.672,"PJD":0.884}},"Berkane":{"seats":["RNI","PI","PAM"],"meanSeats":{"RNI":1,"PAM":0.962,"PI":1,"USFP":0,"MP":0,"UC":0,"PPS":0,"PJD":0.038}},"Berrechid":{"seats":["PI","RNI","PAM","USFP"],"meanSeats":{"RNI":1,"PAM":0.972,"PI":1,"USFP":0.252,"MP":0,"UC":0,"PPS":0,"PJD":0.776}},"Boujdour":{"seats":["RNI","PI"],"meanSeats":{"RNI":0.659,"PAM":0.357,"PI":0.984,"USFP":0,"MP":0,"UC":0,"PPS":0,"PJD":0}},"Boulemane":{"seats":["RNI","MP","PPS"],"meanSeats":{"RNI":1,"PAM":0.219,"PI":0.659,"USFP":0,"MP":0.65,"UC":0,"PPS":0.472,"PJD":0}},"Bzou - Ouaouizaght":{"seats":["RNI","PAM","MP"],"meanSeats":{"RNI":1,"PAM":1,"PI":0.307,"USFP":0.007,"MP":0.436,"UC":0.232,"PPS":0,"PJD":0.018}},"Béni-Mellal":{"seats":["RNI","PAM","PI","MP","USFP","PPS"],"meanSeats":{"RNI":1,"PAM":1,"PI":1,"USFP":0.854,"MP":0.864,"UC":0,"PPS":0.283,"PJD":1}},"Casablanca - Anfa":{"seats":["RNI","PI","PAM","PJD"],"meanSeats":{"RNI":1,"PAM":0.962,"PI":1,"USFP":0.035,"MP":0,"UC":0.003,"PPS":0,"PJD":1}},"Chefchaouen":{"seats":["RNI","PAM","USFP","PI"],"meanSeats":{"RNI":1,"PAM":1,"PI":0.998,"USFP":0.965,"MP":0.008,"UC":0.03,"PPS":0,"PJD":0}},"Chichaoua":{"seats":["PAM","MP","RNI","PI"],"meanSeats":{"RNI":0.901,"PAM":1,"PI":0.925,"USFP":0.11,"MP":0.959,"UC":0.033,"PPS":0,"PJD":0.072}},"Chtouka - Aït-Baha":{"seats":["RNI","PAM","PI"],"meanSeats":{"RNI":1,"PAM":1,"PI":1,"USFP":0,"MP":0,"UC":0,"PPS":0,"PJD":0}},"Driouch":{"seats":["RNI","PI","PAM"],"meanSeats":{"RNI":0.738,"PAM":0.884,"PI":0.981,"USFP":0,"MP":0.397,"UC":0,"PPS":0,"PJD":0}},"El-Gharb":{"seats":["RNI","UC","PAM"],"meanSeats":{"RNI":1,"PAM":0.182,"PI":0,"USFP":0,"MP":0,"UC":0.818,"PPS":0,"PJD":1}},"El-Hajeb":{"seats":["PI","RNI"],"meanSeats":{"RNI":0.966,"PAM":0,"PI":1,"USFP":0,"MP":0,"UC":0,"PPS":0.016,"PJD":0.018}},"El-Jadida":{"seats":["RNI","PI","PAM","PPS","USFP","MP"],"meanSeats":{"RNI":1,"PAM":1,"PI":1,"USFP":0.854,"MP":0.697,"UC":0.004,"PPS":0.932,"PJD":0.513}},"El-Kelâa-des-Sraghna":{"seats":["RNI","PI","PAM","USFP"],"meanSeats":{"RNI":0.993,"PAM":0.897,"PI":0.985,"USFP":0.629,"MP":0,"UC":0.277,"PPS":0.101,"PJD":0.119}},"Errachidia":{"seats":["RNI","PI","PAM","USFP","PJD"],"meanSeats":{"RNI":1,"PAM":0.998,"PI":1,"USFP":0.833,"MP":0.082,"UC":0.006,"PPS":0.081,"PJD":1}},"Es-Smara":{"seats":["PI","RNI"],"meanSeats":{"RNI":0.15,"PAM":0.85,"PI":1,"USFP":0,"MP":0,"UC":0,"PPS":0,"PJD":0}},"Essaouira":{"seats":["USFP","RNI","PPS","PI"],"meanSeats":{"RNI":0.857,"PAM":0.707,"PI":0.852,"USFP":0.973,"MP":0,"UC":0,"PPS":0.611,"PJD":0}},"Fahs - Anjra":{"seats":["RNI","PI"],"meanSeats":{"RNI":1,"PAM":0,"PI":0.978,"USFP":0,"MP":0,"UC":0,"PPS":0,"PJD":0.022}},"Figuig":{"seats":["PAM","RNI","PI"],"meanSeats":{"RNI":1,"PAM":1,"PI":0.968,"USFP":0.012,"MP":0,"UC":0,"PPS":0.02,"PJD":0}},"Fquih Ben Salah":{"seats":["RNI","MP","PAM","USFP"],"meanSeats":{"RNI":0.999,"PAM":0.915,"PI":0.041,"USFP":0.239,"MP":0.916,"UC":0,"PPS":0,"PJD":0.889}},"Fès-Chamalia":{"seats":["RNI","PI","PAM","PJD"],"meanSeats":{"RNI":0.998,"PAM":0.929,"PI":1,"USFP":0.01,"MP":0.062,"UC":0,"PPS":0.001,"PJD":1}},"Fès-Janoubia":{"seats":["RNI","PI","PAM","USFP"],"meanSeats":{"RNI":1,"PAM":0.813,"PI":0.989,"USFP":0.198,"MP":0,"UC":0,"PPS":0,"PJD":1}},"Guelmim":{"seats":["PAM","RNI"],"meanSeats":{"RNI":0.998,"PAM":1,"PI":0.002,"USFP":0,"MP":0,"UC":0,"PPS":0,"PJD":0}},"Guercif":{"seats":["PAM","PI"],"meanSeats":{"RNI":0.007,"PAM":1,"PI":0.993,"USFP":0,"MP":0,"UC":0,"PPS":0,"PJD":0}},"Guéliz - Annakhil":{"seats":["PAM","RNI","PI"],"meanSeats":{"RNI":0.896,"PAM":1,"PI":0.449,"USFP":0,"MP":0.093,"UC":0,"PPS":0,"PJD":0.562}},"Hay-Hassani":{"seats":["RNI","PAM","PI"],"meanSeats":{"RNI":1,"PAM":0.34,"PI":0.66,"USFP":0,"MP":0,"UC":0,"PPS":0,"PJD":1}},"Ifrane":{"seats":["RNI","MP"],"meanSeats":{"RNI":0.999,"PAM":0,"PI":0.015,"USFP":0,"MP":0.986,"UC":0,"PPS":0,"PJD":0}},"Inézgane - Aït-Melloul":{"seats":["RNI","PAM","PI"],"meanSeats":{"RNI":0.965,"PAM":0.35,"PI":0.685,"USFP":0.001,"MP":0,"UC":0,"PPS":0,"PJD":1}},"Jerada":{"seats":["PAM","RNI"],"meanSeats":{"RNI":0.557,"PAM":0.996,"PI":0.307,"USFP":0,"MP":0,"UC":0,"PPS":0.14,"PJD":0}},"Karia - Rhafsai":{"seats":["RNI","PI","PAM"],"meanSeats":{"RNI":0.946,"PAM":0.802,"PI":0.942,"USFP":0,"MP":0,"UC":0,"PPS":0,"PJD":0.309}},"Khouribga":{"seats":["RNI","PAM","MP","PI","USFP","PPS"],"meanSeats":{"RNI":0.973,"PAM":0.995,"PI":0.979,"USFP":0.759,"MP":0.877,"UC":0.002,"PPS":0.415,"PJD":0.999}},"Khémisset - Oulmès":{"seats":["RNI","MP","PAM"],"meanSeats":{"RNI":1,"PAM":1,"PI":0,"USFP":0,"MP":1,"UC":0,"PPS":0,"PJD":0}},"Khénifra":{"seats":["RNI","MP","PI"],"meanSeats":{"RNI":1,"PAM":0.17,"PI":0.84,"USFP":0,"MP":0.99,"UC":0,"PPS":0,"PJD":0}},"Kénitra":{"seats":["RNI","UC","PI","PJD"],"meanSeats":{"RNI":1,"PAM":0.039,"PI":0.997,"USFP":0.001,"MP":0.008,"UC":0.955,"PPS":0,"PJD":1}},"Larache":{"seats":["RNI","PI","UC","PAM"],"meanSeats":{"RNI":1,"PAM":0.768,"PI":1,"USFP":0,"MP":0,"UC":0.827,"PPS":0,"PJD":0.405}},"Laâyoune":{"seats":["PI","PAM","RNI"],"meanSeats":{"RNI":0.765,"PAM":1,"PI":1,"USFP":0.211,"MP":0.002,"UC":0.002,"PPS":0,"PJD":0.021}},"M'Diq - Fnideq":{"seats":["PAM","USFP"],"meanSeats":{"RNI":0,"PAM":0.995,"PI":0,"USFP":0.106,"MP":0,"UC":0,"PPS":0,"PJD":0.899}},"Meknès":{"seats":["PI","RNI","MP","UC","PAM","PJD"],"meanSeats":{"RNI":1,"PAM":0.997,"PI":1,"USFP":0.012,"MP":1,"UC":0.989,"PPS":0.001,"PJD":1}},"Midelt":{"seats":["RNI","PI","MP"],"meanSeats":{"RNI":1,"PAM":0,"PI":1,"USFP":0,"MP":1,"UC":0,"PPS":0,"PJD":0}},"Mohammadia":{"seats":["RNI","PI","PAM"],"meanSeats":{"RNI":1,"PAM":0.51,"PI":1,"USFP":0,"MP":0,"UC":0,"PPS":0,"PJD":0.49}},"Moulay-Rachid":{"seats":["RNI","PI","PPS"],"meanSeats":{"RNI":1,"PAM":0.013,"PI":0.837,"USFP":0,"MP":0,"UC":0,"PPS":0.15,"PJD":1}},"Moulay-Yacoub":{"seats":["PAM","RNI"],"meanSeats":{"RNI":0.46,"PAM":1,"PI":0.449,"USFP":0,"MP":0.091,"UC":0,"PPS":0,"PJD":0}},"Médina - Sidi-Youssef-Ben-Ali":{"seats":["PAM","PI","RNI"],"meanSeats":{"RNI":0.382,"PAM":1,"PI":1,"USFP":0,"MP":0,"UC":0,"PPS":0,"PJD":0.618}},"Médiouna":{"seats":["PI","PAM"],"meanSeats":{"RNI":0.035,"PAM":0.965,"PI":1,"USFP":0,"MP":0,"UC":0,"PPS":0,"PJD":0}},"Ménara":{"seats":["PAM","RNI","PI"],"meanSeats":{"RNI":0.235,"PAM":1,"PI":0.765,"USFP":0,"MP":0,"UC":0,"PPS":0,"PJD":1}},"Nador":{"seats":["RNI","PAM","USFP","PI"],"meanSeats":{"RNI":1,"PAM":1,"PI":0.862,"USFP":0.786,"MP":0,"UC":0,"PPS":0,"PJD":0.352}},"Nouaceur":{"seats":["RNI","PAM","PI"],"meanSeats":{"RNI":1,"PAM":1,"PI":1,"USFP":0,"MP":0,"UC":0,"PPS":0,"PJD":0}},"Ouarzazate":{"seats":["RNI","MP","PAM"],"meanSeats":{"RNI":1,"PAM":0.999,"PI":0.001,"USFP":0,"MP":1,"UC":0,"PPS":0,"PJD":0}},"Oued-Ed-Dahab":{"seats":["PI","RNI"],"meanSeats":{"RNI":0.664,"PAM":0,"PI":1,"USFP":0,"MP":0.336,"UC":0,"PPS":0,"PJD":0}},"Ouezzane":{"seats":["RNI","PAM","PI"],"meanSeats":{"RNI":0.945,"PAM":0.999,"PI":0.35,"USFP":0,"MP":0,"UC":0,"PPS":0,"PJD":0.706}},"Oujda - Angad":{"seats":["PAM","RNI","PI","USFP"],"meanSeats":{"RNI":1,"PAM":1,"PI":0.968,"USFP":0.032,"MP":0,"UC":0,"PPS":0,"PJD":1}},"Rabat - Challah":{"seats":["RNI","PAM","PI"],"meanSeats":{"RNI":0.961,"PAM":0.728,"PI":0.264,"USFP":0.047,"MP":0,"UC":0,"PPS":0,"PJD":1}},"Rabat - El Mouhit":{"seats":["RNI","PAM","MP","PI"],"meanSeats":{"RNI":1,"PAM":0.944,"PI":0.604,"USFP":0.004,"MP":0.448,"UC":0,"PPS":0,"PJD":1}},"Rehamna":{"seats":["PAM","RNI","PI"],"meanSeats":{"RNI":1,"PAM":1,"PI":0.992,"USFP":0,"MP":0,"UC":0.008,"PPS":0,"PJD":0}},"Safi":{"seats":["PAM","PI","MP","RNI","UC","PPS"],"meanSeats":{"RNI":0.73,"PAM":1,"PI":1,"USFP":0.299,"MP":0.926,"UC":0.665,"PPS":0.396,"PJD":0.984}},"Salé - Al-Jadida":{"seats":["RNI","PI","PAM"],"meanSeats":{"RNI":0.747,"PAM":0.258,"PI":0.997,"USFP":0,"MP":0,"UC":0,"PPS":0,"PJD":0.998}},"Salé - Médina":{"seats":["RNI","PAM","PPS","MP"],"meanSeats":{"RNI":0.814,"PAM":0.952,"PI":0.353,"USFP":0,"MP":0.215,"UC":0,"PPS":0.666,"PJD":1}},"Sefrou":{"seats":["RNI","USFP","PAM"],"meanSeats":{"RNI":0.999,"PAM":1,"PI":0.015,"USFP":0.986,"MP":0,"UC":0,"PPS":0,"PJD":0}},"Settat":{"seats":["RNI","PI","UC","PAM","USFP","MP"],"meanSeats":{"RNI":1,"PAM":1,"PI":1,"USFP":0.945,"MP":0.047,"UC":1,"PPS":0.008,"PJD":1}},"Sidi Bennour":{"seats":["USFP","PAM","PI","RNI"],"meanSeats":{"RNI":0.578,"PAM":1,"PI":0.993,"USFP":0.996,"MP":0,"UC":0.406,"PPS":0,"PJD":0.029}},"Sidi Ifni":{"seats":["RNI","PAM"],"meanSeats":{"RNI":1,"PAM":1,"PI":0,"USFP":0,"MP":0,"UC":0,"PPS":0,"PJD":0}},"Sidi Slimane":{"seats":["UC","USFP","RNI"],"meanSeats":{"RNI":0.838,"PAM":0.178,"PI":0,"USFP":0.984,"MP":0,"UC":1,"PPS":0,"PJD":0}},"Sidi-Bernoussi":{"seats":["RNI","PAM","PJD"],"meanSeats":{"RNI":1,"PAM":0.934,"PI":0.065,"USFP":0,"MP":0,"UC":0.001,"PPS":0,"PJD":1}},"Sidi-Kacem":{"seats":["RNI","MP","PAM","USFP","PI"],"meanSeats":{"RNI":1,"PAM":0.941,"PI":0.838,"USFP":0.609,"MP":0.751,"UC":0.007,"PPS":0,"PJD":0.854}},"Skhirate - Témara":{"seats":["RNI","UC","PAM","PI"],"meanSeats":{"RNI":0.817,"PAM":0.739,"PI":0.683,"USFP":0,"MP":0,"UC":0.763,"PPS":0,"PJD":0.998}},"Tan-Tan":{"seats":["PAM","RNI"],"meanSeats":{"RNI":0.068,"PAM":1,"PI":0.932,"USFP":0,"MP":0,"UC":0,"PPS":0,"PJD":0}},"Tanger - Assilah":{"seats":["UC","PAM","PI","RNI","USFP"],"meanSeats":{"RNI":0.833,"PAM":0.999,"PI":0.999,"USFP":0.182,"MP":0,"UC":0.988,"PPS":0,"PJD":1}},"Taounate - Tissa":{"seats":["RNI","PAM","PI"],"meanSeats":{"RNI":1,"PAM":1,"PI":0.83,"USFP":0,"MP":0,"UC":0,"PPS":0.162,"PJD":0.008}},"Taourirt":{"seats":["RNI","PAM"],"meanSeats":{"RNI":0.122,"PAM":0.925,"PI":0.827,"USFP":0,"MP":0.126,"UC":0,"PPS":0,"PJD":0}},"Tarfaya":{"seats":["RNI","PI"],"meanSeats":{"RNI":1,"PAM":0,"PI":1,"USFP":0,"MP":0,"UC":0,"PPS":0,"PJD":0}},"Taroudannt - Al-Janoubia":{"seats":["RNI","PI","PAM","PJD"],"meanSeats":{"RNI":1,"PAM":1,"PI":1,"USFP":0,"MP":0,"UC":0,"PPS":0,"PJD":1}},"Taroudannt - Chamalia":{"seats":["RNI","PI","PAM"],"meanSeats":{"RNI":1,"PAM":1,"PI":1,"USFP":0,"MP":0,"UC":0,"PPS":0,"PJD":0}},"Tata":{"seats":["RNI","PAM"],"meanSeats":{"RNI":0.906,"PAM":0.652,"PI":0.441,"USFP":0,"MP":0,"UC":0,"PPS":0,"PJD":0}},"Taza":{"seats":["PAM","RNI","PI","MP","PPS"],"meanSeats":{"RNI":1,"PAM":1,"PI":1,"USFP":0.023,"MP":0.966,"UC":0.157,"PPS":0.834,"PJD":0.02}},"Tifelt - Rommani":{"seats":["RNI","PAM","PI"],"meanSeats":{"RNI":1,"PAM":1,"PI":0.999,"USFP":0,"MP":0,"UC":0,"PPS":0.001,"PJD":0}},"Tinghir":{"seats":["RNI","PPS","PAM"],"meanSeats":{"RNI":1,"PAM":1,"PI":0.01,"USFP":0,"MP":0,"UC":0,"PPS":0.951,"PJD":0.039}},"Tiznit":{"seats":["RNI","PI"],"meanSeats":{"RNI":1,"PAM":0,"PI":0,"USFP":0,"MP":0,"UC":0,"PPS":0,"PJD":1}},"Tétouan":{"seats":["RNI","PAM","PI","UC","USFP"],"meanSeats":{"RNI":1,"PAM":1,"PI":1,"USFP":0.409,"MP":0.036,"UC":0.511,"PPS":0.043,"PJD":1}},"Youssoufia":{"seats":["PAM","PI"],"meanSeats":{"RNI":0.002,"PAM":1,"PI":0.998,"USFP":0,"MP":0,"UC":0,"PPS":0,"PJD":0}},"Zagora":{"seats":["RNI","USFP","PI"],"meanSeats":{"RNI":0.958,"PAM":0,"PI":0.994,"USFP":0.876,"MP":0.051,"UC":0,"PPS":0,"PJD":0.121}}};
const _CR={"Agadir - Ida-ou-Tanane":[["Agadir (Mun.)","RNI",42022,47.9,1,{"RNI":24578,"PAM":4432,"PI":3127,"USFP":3711,"MP":515,"UC":345,"PPS":1267,"PJD":4047}],["Amskroud","RNI",5508,11.9,0,{"RNI":2420,"PAM":1766,"PI":263,"USFP":97,"PPS":945,"PJD":17}],["Aourir","RNI",9289,12.5,1,{"RNI":3217,"PAM":2057,"PI":1611,"USFP":1427,"UC":91,"PPS":417,"PJD":469}],["Aqesri","RNI",2072,3.7,0,{"RNI":785,"PAM":193,"PI":158,"USFP":185,"MP":12,"PPS":709,"PJD":30}],["Aziar","RNI",2149,5.2,0,{"RNI":973,"PAM":862,"PI":204,"USFP":110}],["Drargua","RNI",9126,43.9,1,{"RNI":5069,"PAM":951,"PI":841,"USFP":301,"MP":230,"UC":232,"PPS":1062,"PJD":440}],["Idmine","PI",2134,5.5,0,{"RNI":824,"PAM":241,"PI":941,"PJD":128}],["Imouzzer","RNI",2417,45.7,0,{"RNI":1545,"PAM":395,"PI":36,"USFP":1,"PPS":440}],["Imsouane","RNI",3305,25.3,0,{"RNI":2013,"PAM":1178,"USFP":96,"PPS":10,"PJD":8}],["Tadrart","RNI",2406,11.7,0,{"RNI":903,"PAM":224,"PI":622,"USFP":356,"PPS":290,"PJD":11}],["Taghazout","RNI",2737,59.2,0,{"RNI":1924,"PAM":298,"PI":176,"USFP":305,"PPS":27,"PJD":7}],["Tamri","RNI",6059,27.1,0,{"RNI":3391,"PAM":1746,"PI":385,"USFP":415,"MP":35,"PPS":52,"PJD":35}],["Tiqqi","RNI",4521,8.6,0,{"RNI":2223,"PAM":381,"PI":55,"USFP":6,"PPS":1835,"PJD":21}]],"Al-Fida - Mers-Sultan":[["Al-Fida (Arrond.)","RNI",10637,23,1,{"RNI":4424,"PAM":1646,"PI":1982,"USFP":396,"MP":383,"UC":388,"PPS":135,"PJD":1283}],["Mechouar de Casablanca (Mun.)","RNI",1129,15.3,1,{"RNI":566,"PAM":393,"UC":170}],["Mers-Sultan (Arrond.)","RNI",11513,12,1,{"RNI":4734,"PAM":3347,"PI":1433,"USFP":346,"MP":227,"UC":392,"PPS":240,"PJD":794}]],"Al-Haouz":[["Abadou","UC",4598,31.1,0,{"RNI":839,"PAM":784,"PI":280,"USFP":17,"MP":262,"UC":2268,"PPS":114,"PJD":34}],["Aghbar","RNI",1968,43.4,0,{"RNI":1397,"MP":542,"UC":29}],["Aghouatim","RNI",9191,15.4,0,{"RNI":3299,"PAM":1879,"PI":1203,"USFP":8,"UC":17,"PPS":1399,"PJD":1386}],["Ait Aadel","UC",2647,45.7,0,{"RNI":321,"PAM":240,"PI":387,"USFP":12,"MP":89,"UC":1598}],["Ait Faska","PAM",7008,12.9,0,{"RNI":1627,"PAM":2842,"PI":1939,"USFP":187,"UC":366,"PJD":47}],["Ait Hkim-Ait Yzid","UC",3049,5.3,0,{"RNI":617,"PAM":330,"PI":934,"UC":1097,"PPS":71}],["Ait Ourir (Mun.)","PAM",8090,30.3,1,{"RNI":2503,"PAM":4956,"PI":92,"USFP":10,"MP":3,"UC":77,"PPS":449}],["Ait Sidi Daoud","PAM",5531,11.2,0,{"RNI":2045,"PAM":2664,"PI":571,"USFP":57,"UC":32,"PPS":162}],["Amghras","UC",2849,15.5,0,{"RNI":1122,"PI":130,"UC":1565,"PPS":32}],["Amizmiz (Mun.)","RNI",4880,8.3,1,{"RNI":2326,"PAM":3,"PI":467,"USFP":76,"UC":52,"PPS":1923,"PJD":33}],["Anougal","RNI",2075,14.8,0,{"RNI":1189,"PI":882,"PJD":4}],["Asni","RNI",7409,40.7,0,{"RNI":4985,"PI":214,"UC":46,"PPS":1973,"PJD":191}],["Azgour","RNI",2953,22.8,0,{"RNI":1801,"PI":23,"UC":1129}],["Dar Jamaa","PPS",2631,5.9,0,{"RNI":1046,"PI":75,"MP":310,"PPS":1200}],["Ghmate","PAM",6949,29.8,0,{"RNI":2100,"PAM":4171,"PI":621,"MP":25,"PJD":32}],["Ighil","RNI",2092,58.6,0,{"RNI":1610,"PAM":384,"MP":98}],["Iguerferouane","PI",4479,3.9,0,{"RNI":2097,"PI":2273,"MP":38,"UC":71}],["Ijoukak","RNI",2397,24.2,0,{"RNI":1486,"PAM":905,"PJD":6}],["Imgdal","RNI",2153,29.3,0,{"RNI":1279,"PI":128,"MP":83,"UC":649,"PPS":12,"PJD":2}],["Lalla Takarkoust","RNI",3426,3.7,1,{"RNI":1331,"PAM":202,"PI":180,"USFP":179,"UC":1204,"PPS":330}],["Moulay Brahim","PPS",4282,33.4,0,{"RNI":952,"PI":7,"USFP":6,"UC":921,"PPS":2384,"PJD":12}],["Ouazguita","RNI",2224,21.3,0,{"RNI":1112,"PI":348,"UC":126,"PJD":638}],["Ouirgane","RNI",2845,26.5,0,{"RNI":1672,"PI":917,"UC":256}],["Oukaimden","PPS",1907,55.6,0,{"RNI":218,"PI":314,"PPS":1375}],["Oulad Mtaa","PPS",2711,21.1,0,{"RNI":174,"UC":983,"PPS":1554}],["Ourika","MP",11405,0.3,0,{"RNI":2392,"PI":4357,"MP":4394,"PJD":262}],["Sidi Abdallah Ghiat","RNI",8210,30.9,0,{"RNI":4596,"PAM":1141,"PI":2058,"MP":394,"PJD":21}],["Sidi Badhaj","UC",2672,12.9,0,{"RNI":869,"PI":209,"USFP":1,"MP":55,"UC":1213,"PPS":325}],["Sti Fadma","PPS",7031,9.4,0,{"RNI":348,"PAM":248,"PI":2694,"MP":368,"PPS":3353,"PJD":20}],["Tahannaout (Mun.)","PPS",3270,9.9,1,{"RNI":938,"PAM":539,"PI":210,"USFP":8,"MP":7,"PPS":1261,"PJD":307}],["Talat N'Yaaqoub","RNI",3174,57.4,0,{"RNI":2249,"MP":310,"UC":426,"PJD":189}],["Tamaguert","UC",4078,2.4,0,{"RNI":496,"PAM":25,"PI":1589,"USFP":282,"UC":1686}],["Tamazouzte","RNI",5454,4.5,0,{"RNI":2834,"PI":2590,"MP":13,"PJD":17}],["Tameslohte","RNI",9141,31.1,0,{"RNI":5208,"PAM":101,"PI":556,"UC":653,"PPS":2361,"PJD":262}],["Tazart","RNI",5074,19.2,0,{"RNI":2322,"PAM":1346,"PI":220,"USFP":133,"UC":1050,"PJD":3}],["Tidili Mesfioua","PAM",6770,20.5,0,{"RNI":1941,"PAM":3329,"PI":1120,"MP":162,"UC":218}],["Tighedouine","PAM",5316,8.3,0,{"RNI":68,"PAM":2098,"PI":1656,"USFP":634,"UC":857,"PPS":3}],["Tizguine","UC",1902,1.7,0,{"RNI":800,"PI":204,"USFP":66,"UC":832}],["Touama","UC",4446,27,0,{"RNI":49,"PAM":675,"PI":1260,"UC":2462}],["Zerkten","UC",6955,17.5,0,{"RNI":665,"PAM":3,"PI":2426,"UC":3645,"PPS":216}]],"Al-Hoceïma":[["Abdelghaya Souahel","MP",6137,3.8,0,{"RNI":24,"PAM":257,"PI":417,"USFP":68,"MP":2763,"UC":79,"PPS":2529}],["Ait Kamra","USFP",2246,30.3,0,{"RNI":444,"PAM":561,"USFP":1241}],["Ait Youssef Ou Ali","USFP",3860,60.5,0,{"RNI":671,"PAM":27,"PI":114,"USFP":3008,"PJD":40}],["Ajdir (Mun.)","USFP",1964,32.6,1,{"RNI":635,"PI":11,"USFP":1275,"PJD":43}],["Al Hoceima (Mun.)","MP",4407,4.5,1,{"RNI":580,"PAM":569,"PI":277,"USFP":846,"MP":1044,"UC":208,"PPS":534,"PJD":349}],["Arbaa Taourirt","RNI",1394,53.6,0,{"RNI":926,"PAM":165,"PI":118,"USFP":179,"PJD":6}],["Bni Abdallah","USFP",1808,6.9,0,{"RNI":3,"PI":840,"USFP":965}],["Bni Ahmed Imoukzan","RNI",1966,12.1,0,{"RNI":952,"PAM":58,"PI":29,"USFP":212,"UC":715}],["Bni Ammart","PI",2046,72.1,0,{"RNI":189,"PAM":151,"PI":1665,"UC":41}],["Bni Bchir","PI",1934,8.7,0,{"RNI":198,"PI":892,"USFP":121,"UC":723}],["Bni Bouayach (Mun.)","PAM",5273,4.1,1,{"RNI":2221,"PAM":2437,"PI":344,"USFP":82,"MP":7,"UC":4,"PPS":89,"PJD":89}],["Bni Bouchibet","PI",2600,22.8,0,{"RNI":481,"PI":1266,"MP":672,"UC":181}],["Bni Boufrah","RNI",3091,23.6,0,{"RNI":1759,"PI":1031,"USFP":92,"MP":207,"UC":2}],["Bni Bounsar","RNI",2385,8.2,0,{"RNI":1095,"PI":322,"USFP":68,"UC":900}],["Bni Gmil","RNI",2443,6.9,0,{"RNI":871,"PAM":703,"PI":364,"MP":285,"UC":171,"PPS":49}],["Bni Gmil Maksouline","RNI",2449,22.9,0,{"RNI":1239,"PI":532,"UC":678}],["Bni Hadifa","PI",2474,5,0,{"RNI":61,"PAM":1012,"PI":1135,"USFP":265,"UC":1}],["Chakrane","RNI",1776,25.3,0,{"RNI":868,"PAM":366,"PI":419,"USFP":107,"UC":16}],["Imrabten","PAM",1137,2.3,0,{"RNI":512,"PAM":538,"PI":25,"USFP":62}],["Imzouren (Mun.)","MP",4617,3.4,1,{"RNI":632,"PAM":45,"PI":1308,"USFP":1127,"MP":1467,"UC":10,"PPS":23,"PJD":5}],["Issaguen","MP",5815,32.2,0,{"RNI":444,"PAM":129,"PI":1598,"USFP":40,"MP":3473,"UC":131}],["Izemmouren","RNI",1684,33.9,0,{"RNI":881,"PAM":310,"PI":192,"USFP":301}],["Ketama","PI",4690,35.1,0,{"RNI":185,"PAM":129,"PI":2702,"USFP":354,"MP":1057,"UC":243,"PPS":20}],["Louta","USFP",1630,21,0,{"RNI":353,"PAM":231,"PI":174,"USFP":696,"MP":176}],["Moulay Ahmed Cherif","MP",3426,16.8,0,{"RNI":143,"PAM":654,"PI":784,"USFP":22,"MP":1359,"UC":464}],["Nekkour","RNI",2254,24,0,{"RNI":1154,"PAM":613,"PI":95,"USFP":177,"MP":21,"PJD":194}],["Rouadi","PAM",2263,24,0,{"RNI":422,"PAM":1078,"PI":22,"USFP":534,"MP":17,"PPS":190}],["Senada","RNI",3130,9.6,0,{"RNI":1255,"PAM":954,"PI":453,"MP":294,"UC":174}],["Sidi Boutmim","UC",3228,18.2,0,{"RNI":859,"PAM":55,"PI":519,"USFP":339,"UC":1447,"PJD":9}],["Sidi Bouzineb","PI",1366,57.8,0,{"RNI":136,"PAM":220,"PI":1010}],["Taghzout","PI",1313,17.4,0,{"RNI":217,"PAM":35,"PI":645,"UC":416}],["Tamsaout","PI",4019,4,0,{"RNI":122,"PAM":60,"PI":1636,"USFP":46,"MP":1475,"UC":322,"PPS":358}],["Targuist (Mun.)","UC",4324,24,1,{"RNI":291,"PAM":44,"PI":1409,"USFP":12,"UC":2446,"PPS":111,"PJD":11}],["Tifarouine","PAM",1714,48.5,0,{"RNI":372,"PAM":1203,"PI":9,"USFP":87,"UC":43}],["Zaouiat Sidi Abdelkader","PAM",2013,19.7,0,{"PAM":1205,"PI":808}],["Zarkt","UC",2208,34.4,0,{"RNI":206,"PAM":493,"PI":253,"MP":3,"UC":1253}]],"Aousserd":[["Aghouinite","PI",674,11.7,1,{"RNI":247,"PAM":19,"PI":326,"MP":82}],["Aousserd","PI",1065,49.6,0,{"RNI":224,"PI":752,"MP":11,"PPS":70,"PJD":8}],["Bir Gandouz","PI",2167,28.8,0,{"RNI":703,"PAM":7,"PI":1328,"MP":29,"PPS":92,"PJD":8}],["Lagouira (Mun.)","PI",2292,22.2,1,{"RNI":189,"PI":1042,"MP":527,"PPS":534}],["Tichla","MP",920,11.2,0,{"RNI":2,"PI":406,"MP":509,"PPS":3}],["Zoug","PI",679,49.2,1,{"RNI":74,"PAM":39,"PI":410,"MP":76,"PPS":75,"PJD":5}]],"Assa-Zag":[["Al Mahbass","MP",492,16.5,0,{"RNI":29,"PAM":72,"PI":83,"USFP":105,"MP":186,"UC":17}],["Aouint Lahna","PAM",958,30.4,0,{"RNI":252,"PAM":543,"PI":2,"USFP":140,"MP":19,"PJD":2}],["Aouint Yghomane","USFP",2430,12.7,0,{"RNI":165,"PAM":473,"PI":662,"USFP":970,"MP":37,"UC":113,"PJD":10}],["Assa (Mun.)","PAM",7199,9.7,1,{"RNI":1678,"PAM":2502,"PI":254,"USFP":1801,"MP":164,"UC":156,"PPS":3,"PJD":641}],["Labouirat","PAM",325,4.9,0,{"RNI":71,"PAM":93,"PI":5,"USFP":77,"MP":51,"UC":28}],["Touizgui","PAM",1926,2,0,{"RNI":574,"PAM":635,"PI":13,"USFP":597,"MP":4,"UC":76,"PPS":6,"PJD":21}],["Zag (Mun.)","PAM",2703,17.3,1,{"RNI":553,"PAM":1136,"PI":237,"USFP":669,"MP":52,"UC":42,"PPS":1,"PJD":13}]],"Azilal - Demnate":[["Ait Abbas","PAM",3696,7.6,0,{"RNI":1320,"PAM":1602,"PI":191,"MP":16,"PPS":339,"PJD":228}],["Ait Blal","PAM",2796,1,0,{"RNI":1379,"PAM":1406,"PPS":3,"PJD":8}],["Ait Bou Oulli","PAM",3685,25.7,0,{"RNI":1321,"PAM":2267,"USFP":77,"PPS":20}],["Ait M'Hamed","PAM",5324,37,0,{"RNI":710,"PAM":3092,"PI":1123,"USFP":134,"MP":107,"PPS":89,"PJD":69}],["Ait Majden","PAM",5529,16.8,0,{"RNI":1703,"PAM":2631,"PI":161,"USFP":1034}],["Ait Oumdis","RNI",3507,2.5,0,{"RNI":1584,"PAM":1495,"PI":143,"MP":93,"PPS":192}],["Ait Tamlil","USFP",4692,2.8,0,{"RNI":1356,"PAM":1305,"PI":468,"USFP":1489,"PPS":74}],["Anzou","PI",4820,3.9,0,{"RNI":1983,"PAM":141,"PI":2173,"USFP":440,"PPS":43,"PJD":40}],["Demnate (Mun.)","PAM",8650,9.3,1,{"RNI":591,"PAM":4096,"PI":3288,"USFP":429,"PPS":217,"PJD":29}],["Imlil","PI",3150,25.2,0,{"RNI":729,"PAM":101,"PI":1523,"USFP":657,"PPS":140}],["Ouaoula","RNI",8469,17.1,0,{"RNI":4715,"PAM":3270,"PI":1,"UC":37,"PPS":426,"PJD":20}],["Sidi Boulkhalf","PAM",4242,13.8,0,{"RNI":240,"PAM":2220,"PI":29,"USFP":1634,"PPS":119}],["Sidi Yacoub","RNI",5400,30.7,0,{"RNI":3197,"PAM":127,"PI":423,"USFP":116,"PPS":1537}],["Tabant","PJD",5608,16.9,0,{"RNI":1040,"PAM":1763,"PPS":93,"PJD":2712}],["Tamda Noumercid","PAM",3488,17.6,0,{"RNI":803,"PAM":1631,"PI":1016,"MP":38}],["Tidili Fetouaka","RNI",3552,12,0,{"RNI":1534,"PAM":292,"PI":1109,"USFP":502,"PPS":115}],["Tifni","RNI",3978,1,0,{"RNI":1412,"PAM":1371,"PI":681,"USFP":511,"PPS":3}]],"Aïn-Chock":[["Aîn-Chock (Arrond.)","RNI",26584,10.9,1,{"RNI":10721,"PAM":7824,"PI":2662,"USFP":1121,"MP":417,"UC":533,"PPS":669,"PJD":2637}]],"Aïn-Sebaâ - Hay-Mohammadi":[["Aîn-Sebaâ (Arrond.)","RNI",15175,21,1,{"RNI":5942,"PAM":2757,"PI":2035,"USFP":315,"MP":1489,"UC":949,"PPS":853,"PJD":835}],["Assoukhour Assawda (Arrond.)","UC",9443,3.6,1,{"RNI":2502,"PAM":724,"PI":510,"USFP":477,"MP":710,"UC":2839,"PPS":728,"PJD":953}],["Hay Mohammadi (Arrond.)","RNI",12487,0.1,1,{"RNI":2875,"PAM":2857,"PI":1030,"USFP":1243,"MP":970,"UC":1507,"PPS":855,"PJD":1150}]],"Ben-M'sick":[["Ben M'Sick (Arrond.)","UC",11430,34,1,{"RNI":2521,"PAM":670,"PI":439,"USFP":276,"MP":475,"UC":6403,"PJD":646}],["Sbata (Arrond.)","RNI",11335,29.1,1,{"RNI":5113,"PAM":1813,"PI":410,"USFP":229,"MP":841,"UC":1547,"PPS":284,"PJD":1098}]],"Benslimane":[["Ahlaf","PPS",4410,13.1,0,{"RNI":1370,"PAM":410,"PI":459,"USFP":183,"PPS":1946,"PJD":42}],["Ain Tizgha","USFP",7177,18.2,0,{"RNI":931,"PAM":230,"PI":1439,"USFP":2906,"PPS":1602,"PJD":69}],["Benslimane (Mun.)","PI",7591,13.1,1,{"RNI":1317,"PAM":526,"PI":2478,"USFP":1480,"MP":91,"UC":328,"PPS":1066,"PJD":305}],["Bir Ennasr","PI",1995,0.7,0,{"RNI":352,"PAM":472,"PI":485,"USFP":429,"MP":3,"PJD":254}],["Bouznika (Mun.)","PI",9002,22.3,1,{"RNI":80,"PAM":219,"PI":4154,"USFP":343,"MP":223,"UC":75,"PPS":2143,"PJD":1765}],["Charrate","PPS",4107,39.9,0,{"RNI":69,"PAM":104,"PI":988,"USFP":83,"PPS":2628,"PJD":235}],["El Mansouria (Mun.)","PI",6630,44.3,1,{"PAM":746,"PI":3923,"USFP":305,"PPS":667,"PJD":989}],["Fdalate","RNI",5114,7.2,0,{"RNI":2219,"PAM":90,"PI":863,"USFP":64,"UC":3,"PPS":1851,"PJD":24}],["Mellila","PI",5701,16.2,0,{"RNI":713,"PAM":1810,"PI":2731,"USFP":240,"MP":53,"PPS":147,"PJD":7}],["Moualine El Oued","RNI",3388,37.5,0,{"RNI":2114,"PAM":843,"USFP":388,"PPS":43}],["Oulad Ali Toualaa","RNI",2774,4.8,0,{"RNI":1085,"PAM":951,"PI":38,"USFP":672,"PPS":28}],["Oulad Yahya Louta","RNI",3953,45.4,0,{"RNI":2369,"PAM":120,"PI":541,"USFP":573,"PPS":343,"PJD":7}],["Rdadna Oulad Malek","RNI",2272,4.4,0,{"RNI":963,"PI":35,"USFP":864,"PPS":408,"PJD":2}],["Sidi Bettache","RNI",2790,30.6,0,{"RNI":1535,"PAM":56,"USFP":680,"MP":3,"UC":88,"PPS":331,"PJD":97}],["Ziaida","PPS",6498,0.5,0,{"RNI":888,"PAM":346,"PI":1410,"USFP":1896,"MP":12,"PPS":1926,"PJD":20}]],"Berkane":[["Aghbal","RNI",4852,10.9,0,{"RNI":1734,"PAM":1204,"PI":485,"USFP":269,"MP":206,"UC":201,"PPS":8,"PJD":745}],["Ahfir (Mun.)","RNI",5597,6.2,1,{"RNI":1475,"PAM":1055,"PI":1044,"USFP":313,"MP":448,"UC":1127,"PJD":135}],["Ain Erreggada (Mun.)","PI",1396,34.6,1,{"RNI":435,"PAM":33,"PI":918,"USFP":1,"PJD":9}],["Aklim (Mun.)","RNI",3105,11.1,1,{"RNI":1681,"PAM":62,"PI":1336,"MP":26}],["Berkane (Mun.)","PAM",10367,0.5,1,{"RNI":2904,"PAM":2960,"PI":2792,"USFP":287,"MP":230,"PPS":729,"PJD":465}],["Boughriba","PAM",5979,5.4,0,{"RNI":1555,"PAM":1879,"PI":1248,"USFP":10,"MP":320,"PPS":933,"PJD":34}],["Chouihia","RNI",4413,33.9,0,{"RNI":2518,"PAM":314,"PI":1023,"MP":220,"PPS":100,"PJD":238}],["Fezouane","RNI",2329,4.4,0,{"RNI":1051,"PAM":330,"PI":948}],["Laatamna","PI",5766,1.6,0,{"RNI":1976,"PAM":985,"PI":2068,"USFP":146,"MP":268,"PPS":82,"PJD":241}],["Madagh","RNI",3198,11.1,0,{"RNI":1614,"PAM":143,"PI":1259,"USFP":90,"MP":5,"PJD":87}],["Rislane","MP",1999,33.8,0,{"RNI":532,"PAM":81,"PI":2,"USFP":8,"MP":1207,"PPS":135,"PJD":34}],["Saidia (Mun.)","PI",4116,14,1,{"RNI":1144,"PAM":113,"PI":1720,"MP":136,"UC":1,"PPS":922,"PJD":80}],["Sidi Bouhria","RNI",1775,25.2,0,{"RNI":898,"PAM":71,"PI":451,"MP":149,"PJD":206}],["Sidi Slimane Echcharraa (Mun.)","RNI",6724,15.6,1,{"RNI":3233,"PAM":2184,"PI":261,"USFP":152,"MP":624,"PPS":80,"PJD":190}],["Tafoughalt","RNI",1126,21,0,{"RNI":603,"PAM":102,"PI":37,"USFP":17,"MP":367}],["Zegzel","RNI",5644,0.5,0,{"RNI":1916,"PAM":1249,"PI":1885,"USFP":147,"MP":174,"PPS":195,"PJD":78}]],"Berrechid":[["Ben Maachou","PI",2508,5.5,0,{"RNI":919,"PAM":316,"PI":1058,"USFP":102,"PJD":113}],["Berrechid (Mun.)","RNI",20451,17.1,1,{"RNI":8997,"PAM":5510,"PI":3196,"USFP":495,"MP":437,"UC":663,"PPS":509,"PJD":644}],["Deroua (Mun.)","RNI",7682,23.7,1,{"RNI":3087,"PAM":1119,"PI":1264,"USFP":1021,"MP":167,"UC":169,"PPS":263,"PJD":592}],["El Gara (Mun.)","RNI",6179,1.8,1,{"RNI":1573,"PAM":734,"PI":1317,"USFP":1462,"MP":576,"UC":12,"PPS":227,"PJD":278}],["Foqra Oulad Aameur","PI",1922,45.4,0,{"RNI":181,"PAM":374,"PI":1247,"MP":75,"PPS":19,"PJD":26}],["Had Soualem (Mun.)","PI",10565,16.5,1,{"RNI":608,"PAM":3091,"PI":4836,"USFP":1412,"MP":317,"UC":5,"PPS":43,"PJD":253}],["Jaqma","RNI",4116,70,0,{"RNI":3451,"PI":571,"MP":75,"UC":19}],["Kasbat Ben Mchich","RNI",4913,8.3,0,{"RNI":2222,"PAM":108,"PI":1815,"USFP":658,"MP":5,"UC":8,"PPS":28,"PJD":69}],["Laghnimyine","PI",3713,16.4,0,{"RNI":941,"PAM":788,"PI":1549,"USFP":287,"MP":56,"UC":86,"PJD":6}],["Lahsasna","PI",5835,3.4,0,{"RNI":1798,"PAM":1729,"PI":1999,"USFP":5,"MP":55,"PJD":249}],["Lambarkiyine","RNI",3117,34.3,0,{"RNI":2015,"PAM":136,"PI":947,"UC":19}],["Oulad Abbou (Mun.)","PI",3672,21.2,1,{"RNI":32,"PAM":726,"PI":1602,"USFP":456,"MP":34,"PJD":822}],["Oulad Ziyane","RNI",5161,2.7,0,{"RNI":1566,"PAM":802,"PI":1426,"USFP":1184,"MP":6,"UC":136,"PJD":41}],["Ouled Cebbah","PI",3066,22.4,0,{"RNI":914,"PAM":296,"PI":1601,"USFP":111,"MP":1,"UC":135,"PPS":8}],["Ouled Zidane","PI",2346,19.7,0,{"RNI":485,"PAM":337,"PI":948,"USFP":397,"MP":118,"PJD":61}],["Riah","PI",3146,48.3,0,{"RNI":452,"PAM":502,"PI":2022,"USFP":79,"MP":91}],["Sahel Oulad H'Riz","RNI",11917,25.9,0,{"RNI":5487,"PAM":1495,"PI":2404,"USFP":1474,"MP":784,"UC":7,"PPS":35,"PJD":231}],["Sidi Abdelkhaleq","PI",2414,10.1,0,{"RNI":983,"PAM":78,"PI":1227,"USFP":2,"MP":97,"PJD":27}],["Sidi El Mekki","PI",3389,54.8,0,{"RNI":654,"PAM":61,"PI":2512,"USFP":61,"MP":48,"UC":37,"PPS":11,"PJD":5}],["Sidi Rahal Chatai (Mun.)","PI",7181,46,1,{"RNI":685,"PAM":307,"PI":4510,"USFP":1208,"PPS":22,"PJD":449}],["Soualem Trifiya","USFP",9524,0.9,0,{"RNI":385,"PAM":1614,"PI":3407,"USFP":3495,"MP":203,"UC":4,"PPS":31,"PJD":385}],["Zaouiat Sidi Ben Hamdoun","PI",3497,8.4,0,{"RNI":1109,"PAM":48,"PI":1404,"USFP":644,"MP":18,"PPS":34,"PJD":240}]],"Boujdour":[["Boujdour (Mun.)","RNI",14558,3.9,1,{"RNI":5748,"PAM":2987,"PI":5181,"USFP":4,"UC":386,"PPS":73,"PJD":179}],["Gueltat Zemmour","PI",854,12.1,0,{"RNI":349,"PAM":53,"PI":452}],["Jraifia","PAM",989,99.8,0,{"PAM":988,"PPS":1}],["Lamssid","RNI",144,47.9,0,{"RNI":102,"USFP":9,"PPS":33}]],"Boulemane":[["Ait Bazza","RNI",1264,11.6,0,{"RNI":639,"PAM":76,"PI":19,"USFP":26,"MP":493,"PPS":11}],["Ait El Mane","RNI",1019,13.4,0,{"RNI":483,"PAM":2,"PI":89,"MP":346,"PPS":99}],["Almis Marmoucha","RNI",864,22.3,0,{"RNI":381,"PAM":188,"PI":83,"MP":103,"PPS":109}],["Boulemane (Mun.)","RNI",2698,22.2,1,{"RNI":1315,"PAM":235,"PI":67,"USFP":21,"MP":717,"PPS":343}],["El Mers","RNI",2190,25.1,0,{"RNI":1070,"PAM":230,"PI":5,"USFP":274,"MP":520,"PPS":18,"PJD":73}],["El Orjane","RNI",2268,39.2,0,{"RNI":1322,"PAM":229,"PI":433,"PPS":230,"PJD":54}],["Enjil","RNI",3704,32.6,0,{"RNI":1867,"PAM":455,"PI":68,"USFP":38,"MP":616,"PPS":660}],["Ermila","PPS",2578,0.9,0,{"RNI":874,"PAM":108,"PI":139,"USFP":3,"MP":75,"PPS":896,"PJD":483}],["Fritissa","RNI",6591,14.6,0,{"RNI":3284,"PAM":2322,"PI":536,"MP":86,"PPS":363}],["Guigou","RNI",8650,3.5,0,{"RNI":3105,"PAM":585,"PI":1051,"USFP":48,"MP":2799,"PPS":1062}],["Imouzzer Marmoucha (Mun.)","RNI",2239,24.6,1,{"RNI":1219,"PAM":21,"PI":190,"USFP":20,"MP":668,"PPS":121}],["Ksabi Moulouya","RNI",4152,30.5,0,{"RNI":2225,"PAM":203,"PI":603,"MP":959,"PPS":162}],["Missour (Mun.)","RNI",6937,5.3,1,{"RNI":2270,"PAM":293,"PI":1898,"USFP":35,"MP":485,"PPS":1902,"PJD":54}],["Ouizeght","RNI",2253,17.8,0,{"RNI":1055,"PAM":187,"PI":654,"MP":23,"PPS":334}],["Oulad Ali Youssef","RNI",1915,47.5,0,{"RNI":1208,"PAM":184,"PI":3,"MP":221,"PPS":299}],["Outat El Haj (Mun.)","RNI",3925,20.5,1,{"RNI":1666,"PAM":861,"PI":559,"USFP":268,"MP":295,"PPS":276}],["Serghina","RNI",1737,41.6,0,{"RNI":1088,"PAM":2,"PI":104,"MP":366,"PPS":177}],["Sidi Boutayeb","PI",3978,15.5,0,{"RNI":1104,"PAM":57,"PI":1720,"MP":24,"PPS":1073}],["Skoura M'Daz","RNI",3450,28.6,0,{"RNI":1639,"PAM":489,"PI":182,"USFP":8,"MP":653,"PPS":168,"PJD":311}],["Talzemt","RNI",1695,31,0,{"RNI":1074,"PAM":23,"PI":17,"USFP":5,"MP":548,"PPS":28}],["Tissaf","RNI",2881,41.3,0,{"RNI":1881,"PAM":147,"PI":151,"USFP":12,"PPS":690}]],"Bzou - Ouaouizaght":[["Afourar","RNI",6687,13.3,1,{"RNI":2971,"PAM":183,"PI":1260,"USFP":160,"MP":2079,"UC":4,"PJD":30}],["Agoudi N'Lkhair","RNI",4149,9.1,0,{"RNI":2081,"PAM":1702,"PI":353,"UC":13}],["Ait Mazigh","PAM",1146,8.5,0,{"RNI":452,"PAM":549,"PI":122,"MP":22,"UC":1}],["Ait Ouaarda","RNI",915,2.2,0,{"RNI":464,"PAM":7,"MP":444}],["Ait Ouqabli","PPS",1468,23.7,0,{"RNI":464,"PAM":142,"PI":41,"PPS":812,"PJD":9}],["Ait Taguella","PAM",2758,13.5,0,{"RNI":1097,"PAM":1468,"PI":72,"USFP":94,"UC":15,"PPS":12}],["Anergui","RNI",1884,1.2,0,{"RNI":528,"PAM":506,"PI":63,"MP":501,"UC":286}],["Azilal (Mun.)","PAM",8236,2.4,1,{"RNI":2644,"PAM":2840,"PI":444,"USFP":353,"MP":1255,"UC":185,"PPS":263,"PJD":252}],["Bin El Ouidane","RNI",2528,31.7,0,{"RNI":1325,"PAM":524,"PI":26,"USFP":110,"MP":485,"UC":58}],["Bni Ayat","PI",7376,10.5,0,{"RNI":666,"PAM":115,"PI":3305,"USFP":2527,"MP":321,"UC":5,"PJD":437}],["Bni Hassane","RNI",3856,7.3,0,{"RNI":1676,"PAM":26,"PI":1395,"USFP":582,"MP":84,"UC":93}],["Bzou","UC",4545,19.8,0,{"RNI":180,"PAM":1538,"PI":200,"USFP":69,"MP":5,"UC":2440,"PJD":113}],["Foum Jemaa","USFP",2216,59.7,1,{"RNI":400,"PAM":75,"PI":18,"USFP":1723}],["Isseksi","PAM",767,4.2,0,{"RNI":308,"PAM":340,"PI":86,"USFP":30,"UC":3}],["Moulay Aissa Ben Driss","MP",4159,36.5,0,{"RNI":704,"PAM":775,"PI":192,"USFP":11,"MP":2294,"UC":28,"PPS":155}],["Ouaouizeght","RNI",4188,5.6,1,{"RNI":1885,"PAM":1651,"PI":167,"USFP":135,"MP":195,"UC":19,"PPS":119,"PJD":17}],["Rfala","UC",2939,33.4,0,{"RNI":66,"PAM":657,"PI":7,"MP":315,"UC":1638,"PJD":256}],["Tabaroucht","PAM",1274,46.4,0,{"RNI":153,"PAM":822,"MP":26,"UC":231,"PPS":42}],["Tabia","MP",2746,14.9,0,{"RNI":885,"PAM":460,"USFP":94,"MP":1294,"UC":13}],["Tagleft","PAM",6788,12.7,0,{"RNI":1042,"PAM":3031,"PI":12,"UC":2172,"PPS":188,"PJD":343}],["Tanant","PAM",3191,7.9,0,{"RNI":508,"PAM":1192,"PI":49,"USFP":323,"MP":40,"UC":940,"PJD":139}],["Taounza","RNI",3326,10.6,0,{"RNI":1020,"PAM":666,"PI":307,"MP":624,"UC":125,"PPS":584}],["Tiffert N'Ait Hamza","PAM",1872,2.1,0,{"RNI":644,"PAM":683,"PI":3,"UC":481,"PPS":61}],["Tilougguite","PAM",3890,16.6,0,{"RNI":1337,"PAM":1983,"PI":65,"MP":93,"UC":412}],["Timoulilt","RNI",1916,17.4,0,{"RNI":999,"PAM":68,"PI":666,"USFP":10,"MP":90,"UC":76,"PPS":7}],["Tisqi","PAM",1930,16.6,0,{"RNI":235,"PAM":715,"PI":208,"USFP":7,"MP":395,"UC":222,"PPS":148}],["Zaouiat Ahansal","RNI",4350,13.6,0,{"RNI":2051,"PAM":1459,"MP":384,"UC":171,"PPS":2,"PJD":283}]],"Béni-Mellal":[["Aghbala","PAM",5407,27.8,1,{"RNI":618,"PAM":2648,"PI":304,"MP":653,"PPS":1147,"PJD":37}],["Ait Oum El Bekht","PAM",3764,20,0,{"RNI":704,"PAM":1907,"PI":1153}],["Béni Mellal (Mun.)","PAM",16460,0,1,{"RNI":4181,"PAM":4401,"PI":982,"USFP":627,"MP":4398,"PPS":548,"PJD":1323}],["Boutferda","PAM",3173,11.5,0,{"RNI":449,"PAM":1262,"PI":897,"USFP":86,"MP":108,"PJD":371}],["Dir El Ksiba","PAM",6843,11.6,0,{"RNI":2058,"PAM":2854,"PI":745,"USFP":569,"MP":227,"PPS":147,"PJD":243}],["El Ksiba (Mun.)","RNI",6789,0,1,{"RNI":2601,"PAM":2599,"PI":290,"USFP":683,"MP":225,"PPS":358,"PJD":33}],["Foum El Anceur","RNI",6682,14.5,0,{"RNI":3569,"PAM":2602,"PI":75,"MP":217,"PPS":219}],["Foum Oudi","PAM",2962,8.5,0,{"RNI":681,"PAM":1046,"PI":793,"MP":81,"PPS":246,"PJD":115}],["Guettaya","RNI",4799,12.7,0,{"RNI":2685,"PI":2074,"USFP":15,"PJD":25}],["Kasba Tadla (Mun.)","PI",7473,26.5,1,{"RNI":1499,"PAM":5,"PI":3482,"USFP":1000,"MP":385,"PPS":168,"PJD":934}],["Naour","PPS",2696,17,0,{"RNI":787,"PAM":637,"PI":24,"PPS":1246,"PJD":2}],["Ouled Gnaou","RNI",4223,9,0,{"RNI":1736,"PAM":1355,"PI":154,"USFP":345,"MP":168,"PJD":465}],["Ouled M'Barek","RNI",7954,4.2,1,{"RNI":3683,"PAM":3346,"PI":32,"USFP":7,"MP":205,"PPS":459,"PJD":222}],["Ouled Said L'Oued","USFP",4578,35.7,0,{"RNI":58,"PAM":445,"PI":917,"USFP":2551,"MP":130,"PJD":477}],["Ouled Yaich","USFP",7781,25.9,0,{"RNI":1552,"PAM":1136,"PI":1138,"USFP":3564,"MP":209,"PJD":182}],["Ouled Youssef","PAM",3960,15.6,0,{"RNI":747,"PAM":1482,"PI":863,"USFP":217,"PPS":226,"PJD":425}],["Semguet","PI",3124,26,0,{"RNI":737,"PAM":128,"PI":1548,"USFP":388,"MP":33,"PPS":85,"PJD":205}],["Sidi Jaber","PAM",5278,13,0,{"RNI":1472,"PAM":2159,"PI":478,"USFP":44,"MP":223,"PPS":869,"PJD":33}],["Taghzirt","RNI",7453,0.5,0,{"RNI":3152,"PAM":27,"PI":155,"USFP":539,"MP":3114,"PPS":253,"PJD":213}],["Tanougha","RNI",5123,25.9,0,{"RNI":2653,"USFP":420,"MP":1324,"PPS":726}],["Tizi N'Isly","RNI",4694,2.8,0,{"RNI":1285,"PAM":1153,"USFP":791,"MP":315,"PPS":1002,"PJD":148}],["Zaouiat Cheikh (Mun.)","PAM",4947,11.6,1,{"RNI":1456,"PAM":2032,"PI":1197,"USFP":6,"MP":46,"PJD":210}]],"Casablanca - Anfa":[["Anfa (Arrond.)","RNI",9056,36.3,1,{"RNI":5141,"PAM":1023,"PI":1855,"USFP":301,"MP":108,"UC":84,"PPS":128,"PJD":416}],["El Maarif (Arrond.)","RNI",12218,33.6,1,{"RNI":6201,"PAM":1083,"PI":2095,"USFP":745,"MP":161,"UC":104,"PPS":282,"PJD":1547}],["Sidi Belyout (Arrond.)","RNI",11823,20.6,1,{"RNI":4682,"PAM":1418,"PI":2250,"USFP":658,"MP":423,"UC":977,"PPS":268,"PJD":1147}]],"Chefchaouen":[["Amtar","RNI",3187,28.5,0,{"RNI":1727,"PAM":820,"USFP":361,"UC":266,"PPS":13}],["Bab Berred","RNI",8700,30.1,0,{"RNI":4470,"PAM":1691,"PI":1850,"USFP":159,"MP":26,"UC":472,"PPS":32}],["Bab Taza","RNI",6324,6,0,{"RNI":2908,"PAM":62,"PI":238,"USFP":2531,"MP":339,"UC":62,"PPS":26,"PJD":158}],["Bni Ahmed Cherqia","PI",3244,73.2,0,{"RNI":111,"PI":2668,"USFP":172,"MP":293}],["Bni Ahmed Gharbia","RNI",3923,1.9,0,{"RNI":1765,"PAM":253,"PI":1692,"USFP":142,"MP":71}],["Bni Bouzra","PAM",4725,9.2,0,{"RNI":2050,"PAM":2487,"PI":18,"USFP":75,"UC":95}],["Bni Darkoul","USFP",2675,37.9,0,{"RNI":591,"PAM":23,"PI":361,"USFP":1604,"MP":17,"UC":79}],["Bni Faghloum","USFP",3618,68.7,0,{"RNI":79,"PAM":206,"USFP":2909,"MP":2,"UC":422}],["Bni Mansour","RNI",5243,12.5,0,{"RNI":2340,"PAM":1031,"PI":98,"USFP":75,"MP":3,"UC":1684,"PPS":12}],["Bni Rzine","PAM",5375,9.7,0,{"RNI":50,"PAM":1868,"PI":1344,"USFP":509,"MP":610,"UC":304,"PPS":690}],["Bni Salah","USFP",2304,8,0,{"RNI":1060,"USFP":1244}],["Bni Selmane","RNI",5928,33,0,{"RNI":3304,"PAM":884,"PI":25,"USFP":1346,"MP":141,"UC":63,"PPS":165}],["Bni Smih","PAM",4602,42,0,{"RNI":456,"PAM":2789,"USFP":501,"UC":856}],["Chefchaouen (Mun.)","PI",6919,8.5,1,{"RNI":809,"PAM":2002,"PI":2587,"USFP":1026,"MP":56,"UC":98,"PJD":341}],["Derdara","RNI",3334,12.8,0,{"RNI":1368,"PAM":154,"USFP":942,"MP":5,"UC":865}],["Fifi","USFP",3922,51.9,0,{"RNI":725,"PAM":150,"PI":73,"USFP":2759,"MP":83,"PPS":132}],["Iounane","RNI",7571,4.5,0,{"RNI":3203,"PAM":2863,"PI":822,"USFP":170,"MP":206,"UC":171,"PPS":136}],["Laghdir","USFP",2848,15.7,0,{"RNI":1172,"PI":15,"USFP":1618,"PPS":43}],["M'tioua","UC",2023,12.5,0,{"RNI":18,"PAM":372,"PI":653,"USFP":43,"MP":28,"UC":906,"PPS":3}],["Mansoura","MP",5636,16.7,0,{"RNI":71,"PAM":4,"PI":1801,"USFP":1013,"MP":2744,"PPS":3}],["Ouaouzgane","UC",4606,14.3,0,{"RNI":431,"PAM":1537,"PI":90,"USFP":239,"MP":92,"UC":2197,"PPS":20}],["Oued Malha","PI",3136,23.1,0,{"RNI":165,"PAM":1,"PI":1847,"MP":1123}],["Steha","RNI",2937,47.8,0,{"RNI":2028,"PAM":624,"USFP":27,"MP":152,"UC":106}],["Talambote","RNI",3435,3.7,0,{"RNI":1641,"PAM":3,"PI":209,"USFP":33,"MP":34,"UC":1515}],["Tamorot","MP",6859,14.4,0,{"RNI":1247,"PAM":1357,"PI":1546,"MP":2532,"UC":5,"PPS":172}],["Tanaqoub","RNI",3022,26.2,0,{"RNI":1763,"PI":202,"USFP":971,"UC":86}],["Tassift","RNI",2026,54.3,0,{"RNI":1379,"PAM":139,"PI":138,"USFP":91,"MP":279}],["Tizgane","RNI",3104,18.5,0,{"RNI":1681,"PI":1106,"USFP":317}]],"Chichaoua":[["Adassil","PAM",2592,40.2,0,{"PAM":1541,"PI":89,"MP":498,"UC":461,"PPS":3}],["Afalla Issen","PAM",2500,27.2,0,{"RNI":896,"PAM":1576,"PI":28}],["Ahdil","RNI",4080,2,0,{"RNI":1565,"PAM":1484,"PI":343,"USFP":93,"MP":458,"UC":137}],["Ain Tazitounte","PI",1920,7.8,0,{"RNI":466,"PAM":493,"PI":642,"USFP":74,"MP":101,"UC":144}],["Ait Haddou Youssef","RNI",1815,6.2,0,{"RNI":809,"PAM":123,"PI":696,"USFP":69,"MP":118}],["Ait Hadi","MP",3176,11,0,{"RNI":13,"PAM":340,"PI":1237,"MP":1586}],["Assif El Mal","PAM",3216,21.4,0,{"RNI":437,"PAM":1451,"PI":36,"MP":764,"UC":229,"PPS":132,"PJD":167}],["Bouabout","USFP",3680,11.6,0,{"RNI":134,"PAM":23,"PI":1440,"USFP":1867,"MP":16,"PPS":153,"PJD":47}],["Bouabout Amdlane","USFP",2370,23,0,{"RNI":600,"PAM":275,"PI":325,"USFP":1146,"MP":18,"UC":4,"PPS":2}],["Chichaoua (Mun.)","PAM",10612,33,1,{"RNI":1223,"PAM":5465,"PI":230,"USFP":1966,"MP":1628,"PJD":100}],["Douirane","PAM",5507,9.2,0,{"RNI":1490,"PAM":1998,"PI":359,"USFP":30,"MP":1469,"UC":154,"PJD":7}],["Gmassa","PAM",4109,8.6,0,{"RNI":690,"PAM":1707,"PI":94,"MP":59,"UC":152,"PPS":1352,"PJD":55}],["Ichamraren","RNI",2146,38.2,0,{"RNI":1321,"PAM":188,"PI":502,"USFP":84,"PJD":51}],["Imindounit","PAM",3834,7.3,0,{"PAM":1740,"PI":1,"MP":614,"UC":1459,"PPS":18,"PJD":2}],["Imintanoute (Mun.)","PAM",5689,18.2,1,{"RNI":951,"PAM":2374,"PI":1340,"USFP":622,"MP":202,"UC":142,"PPS":13,"PJD":45}],["Irohalen","MP",2155,45.4,0,{"RNI":220,"PAM":324,"USFP":309,"MP":1302}],["Kouzemt","PAM",1526,30.1,0,{"RNI":297,"PAM":828,"PI":30,"USFP":369,"MP":2}],["Lalla Aaziza","PI",2811,42.6,0,{"RNI":578,"PAM":417,"PI":1775,"MP":29,"UC":12}],["Lamzoudia","MP",9846,8,0,{"RNI":1712,"PAM":3081,"PI":858,"USFP":21,"MP":3865,"UC":309}],["M'Zouda","PAM",10765,11.6,0,{"RNI":374,"PAM":5668,"PI":8,"USFP":6,"MP":47,"UC":4421,"PPS":241}],["Majjat","PAM",5040,17.9,0,{"RNI":785,"PAM":2174,"PI":78,"USFP":384,"MP":1274,"UC":19,"PJD":326}],["Nfifa","PAM",2493,5.9,0,{"RNI":484,"PAM":878,"PI":731,"USFP":246,"MP":137,"PJD":17}],["Ouad L'bour","PAM",2077,14.1,0,{"RNI":22,"PAM":1174,"PI":881}],["Oulad Moumna","PAM",3130,20,0,{"RNI":78,"PAM":1612,"PI":111,"USFP":208,"MP":986,"PPS":135}],["Rahhala","RNI",1964,6.1,0,{"RNI":731,"PAM":611,"PI":533,"USFP":5,"MP":84}],["Saidate","MP",2682,5.7,0,{"RNI":79,"PAM":1208,"PI":7,"USFP":21,"MP":1361,"UC":6}],["Sid L'Mokhtar","PAM",8614,15.8,1,{"RNI":127,"PAM":3695,"PI":1982,"USFP":151,"MP":2331,"PPS":3,"PJD":325}],["Sidi Abdelmoumen","PAM",2961,2.6,0,{"RNI":1322,"PAM":1398,"PI":131,"USFP":60,"MP":50}],["Sidi Bouzid Arragragui","RNI",3318,8.3,0,{"RNI":1321,"PAM":1045,"PI":22,"USFP":3,"MP":846,"UC":62,"PJD":19}],["Sidi Ghanem","PI",3032,4.2,0,{"RNI":934,"PAM":442,"PI":1061,"USFP":60,"MP":477,"UC":4,"PJD":54}],["Sidi M'Hamed Dalil","MP",2277,25.8,0,{"RNI":194,"PAM":632,"PI":224,"USFP":8,"MP":1219}],["Taouloukoult","USFP",3145,14.3,0,{"RNI":1141,"PAM":107,"PI":99,"USFP":1590,"MP":198,"PPS":4,"PJD":6}],["Timezgadiouine","PAM",2743,6.5,0,{"RNI":11,"PAM":1455,"PJD":1277}],["Timlilt","PAM",2794,12.1,0,{"PAM":1566,"USFP":1228}],["Zaouia Annahlia","PAM",4179,25.2,0,{"RNI":284,"PAM":2370,"MP":3,"UC":1316,"PJD":206}]],"Chtouka - Aït-Baha":[["Ait Amira","PI",9468,5,1,{"RNI":3007,"PAM":1180,"PI":3483,"USFP":180,"MP":137,"PPS":364,"PJD":1117}],["Ait Baha (Mun.)","RNI",2169,2.9,1,{"RNI":1111,"PAM":1049,"USFP":5,"PPS":1,"PJD":3}],["Ait Milk","RNI",4243,6.1,0,{"RNI":2208,"PAM":62,"PI":1948,"USFP":18,"MP":7}],["Ait Mzal","RNI",1608,15,0,{"RNI":897,"PAM":656,"PI":3,"USFP":34,"PPS":18}],["Ait Ouadrim","PAM",2270,48,0,{"RNI":405,"PAM":1494,"PI":321,"USFP":50}],["Aouguenz","PAM",1304,12.7,0,{"RNI":427,"PAM":593,"PI":282,"MP":2}],["Belfaa","PI",9144,29,0,{"RNI":2960,"PAM":85,"PI":5610,"USFP":363,"MP":9,"PJD":117}],["Biougra (Mun.)","PAM",9935,29.8,1,{"RNI":2190,"PAM":5153,"PI":1157,"USFP":727,"MP":432,"PJD":276}],["Hilala","RNI",1282,7.6,0,{"RNI":591,"PAM":494,"PI":2,"USFP":195}],["Ida Ougnidif","PAM",1207,43.6,0,{"RNI":332,"PAM":858,"PI":17}],["Imi Mqourn","PAM",3543,34.6,0,{"RNI":909,"PAM":2135,"PI":64,"USFP":38,"MP":63,"PJD":334}],["Inchaden","PI",9101,3.9,0,{"RNI":4032,"PAM":420,"PI":4390,"USFP":99,"MP":26,"PPS":124,"PJD":10}],["Massa","RNI",5746,23.4,1,{"RNI":2811,"PAM":150,"PI":1466,"USFP":710,"MP":4,"PPS":104,"PJD":501}],["Ouad Essafa","PAM",10442,12.9,0,{"RNI":3300,"PAM":4652,"PI":1055,"USFP":357,"MP":214,"UC":284,"PPS":355,"PJD":225}],["Sidi AbdallahEl Bouchouari","RNI",3001,39.3,0,{"RNI":1786,"PAM":421,"PI":608,"USFP":82,"MP":104}],["Sidi Bibi","RNI",10195,26.4,0,{"RNI":4362,"PAM":1632,"PI":1670,"USFP":262,"MP":4,"PPS":1520,"PJD":745}],["Sidi Boushab","PAM",3957,13.7,0,{"RNI":1517,"PAM":2060,"PI":176,"USFP":92,"MP":99,"PJD":13}],["Sidi Ouassay","RNI",3024,50,0,{"RNI":2026,"PAM":132,"PI":514,"USFP":133,"PPS":214,"PJD":5}],["Tanalt","RNI",725,22.9,0,{"RNI":396,"PAM":230,"PI":74,"MP":25}],["Targua Ntouchka","PAM",1868,23.1,0,{"RNI":613,"PAM":1045,"PI":197,"PPS":13}],["Tassegdelt","RNI",2179,43.1,0,{"RNI":1461,"PAM":195,"PI":1,"PJD":522}],["Tizi Ntakoucht","PAM",873,20.5,0,{"RNI":343,"PAM":522,"PI":8}]],"Driouch":[["Ain Zohra","PI",5205,9.7,0,{"RNI":1733,"PAM":78,"PI":2240,"USFP":105,"MP":1017,"PPS":32}],["Ait Mait","RNI",2188,3.3,0,{"RNI":1069,"PAM":63,"PI":49,"MP":997,"PPS":2,"PJD":8}],["Amejjaou","RNI",2014,39.4,0,{"RNI":1280,"PAM":95,"PI":152,"MP":487}],["Azlaf","PAM",2820,58.2,0,{"PAM":2175,"PI":535,"PJD":110}],["Ben Taieb (Mun.)","MP",4684,62.6,1,{"RNI":213,"PAM":663,"PI":77,"MP":3597,"PPS":134}],["Bni Marghnine","PAM",1970,6.7,0,{"RNI":569,"PAM":759,"PI":627,"MP":15}],["Boudinar","PI",3764,11.9,0,{"RNI":331,"PAM":1215,"PI":1663,"MP":551,"PPS":4}],["Dar El Kebdani","RNI",2662,52.7,0,{"RNI":1718,"PAM":315,"PI":233,"MP":126,"PPS":154,"PJD":116}],["Driouch (Mun.)","RNI",5537,7.2,1,{"RNI":2269,"PAM":360,"PI":1871,"MP":819,"PPS":26,"PJD":192}],["Iferni","PAM",2289,7.6,0,{"RNI":55,"PAM":1149,"PI":975,"MP":110}],["Ijermaouas","PI",1921,47.8,0,{"RNI":343,"PAM":209,"PI":1262,"MP":51,"PPS":56}],["M'Hajer","MP",3310,35.4,0,{"RNI":354,"PAM":292,"PI":56,"MP":1890,"PPS":718}],["Midar (Mun.)","PI",5108,40.9,1,{"RNI":832,"PAM":1068,"PI":3158,"MP":49,"PPS":1}],["Mtalssa","RNI",7622,29.4,0,{"RNI":4085,"PAM":1036,"PI":1842,"MP":642,"PPS":2,"PJD":15}],["Ouardana","MP",2676,27.5,0,{"RNI":143,"PAM":819,"PI":151,"MP":1556,"PPS":7}],["Oulad Amghar","PAM",2109,53.4,0,{"RNI":98,"PAM":1435,"PI":144,"USFP":71,"MP":309,"PPS":52}],["Oulad Boubker","RNI",5072,18.8,0,{"RNI":2465,"PAM":86,"PI":1512,"MP":998,"PJD":11}],["Tafersit","PAM",2503,6.7,0,{"RNI":1129,"PAM":1297,"PI":8,"MP":69}],["Talilit","PAM",1242,2.6,0,{"RNI":21,"PAM":559,"PI":38,"MP":527,"PPS":97}],["Tazaghine","RNI",1698,25.3,0,{"RNI":967,"PAM":128,"PI":537,"MP":56,"PPS":9,"PJD":1}],["Temsamane","PI",4252,27.4,0,{"RNI":585,"PAM":527,"PI":2063,"MP":900,"PPS":177}],["Trougout","RNI",2594,5,0,{"RNI":975,"PAM":845,"PI":55,"USFP":96,"MP":573,"PPS":50}],["Tsaft","PAM",3216,38.3,0,{"RNI":587,"PAM":1820,"PI":422,"MP":270,"PPS":104,"PJD":13}]],"El-Gharb":[["Arbaoua","PI",9277,0.2,0,{"RNI":602,"PAM":903,"PI":3700,"MP":3679,"UC":325,"PJD":68}],["Bahhara Ouled Ayad","UC",9654,25.7,0,{"RNI":2286,"PAM":1503,"PI":813,"USFP":213,"MP":4,"UC":4768,"PJD":67}],["Beni Malek","RNI",7533,0.6,0,{"RNI":2744,"PAM":667,"PI":566,"USFP":681,"MP":122,"UC":2696,"PJD":57}],["Chouafaa","UC",2863,34.3,0,{"RNI":26,"PAM":890,"PI":14,"USFP":1,"MP":47,"UC":1873,"PJD":12}],["Kariat Ben Aouda","RNI",2677,36.3,0,{"RNI":1492,"PAM":519,"PI":84,"USFP":128,"MP":217,"UC":5,"PPS":213,"PJD":19}],["Lalla Mimouna","PJD",9504,33.1,1,{"RNI":1452,"PAM":829,"PI":38,"MP":34,"UC":2003,"PJD":5148}],["Moulay Bousselham","UC",7906,45.5,0,{"RNI":1503,"PAM":828,"PI":102,"USFP":170,"UC":5097,"PPS":152,"PJD":54}],["Oued El Makhazine","PAM",2195,45.7,0,{"RNI":375,"PAM":1379,"PI":10,"USFP":2,"MP":349,"UC":18,"PJD":62}],["Sidi Allal Tazi","RNI",7070,54.2,0,{"RNI":4681,"PAM":648,"PI":17,"USFP":45,"MP":69,"UC":851,"PJD":759}],["Sidi Boubker El Haj","PAM",6108,15.3,0,{"RNI":1997,"PAM":2932,"MP":12,"UC":1167}],["Sidi Mohamed Lahmar","RNI",15143,52.1,0,{"RNI":10253,"PAM":1641,"PI":586,"USFP":6,"MP":43,"UC":2359,"PJD":255}],["Souk El Arbaa (Mun.)","RNI",8932,47.2,1,{"RNI":5169,"PAM":826,"USFP":302,"MP":950,"UC":499,"PPS":580,"PJD":606}],["Souk Tlet El Gharb","RNI",7500,20.7,0,{"RNI":3074,"PAM":1522,"PI":1238,"USFP":151,"MP":101,"UC":1328,"PJD":86}]],"El-Hajeb":[["Agourai (Mun.)","PI",5228,25.3,1,{"RNI":1005,"PAM":95,"PI":2373,"USFP":18,"MP":155,"PPS":530,"PJD":1052}],["Ain Taoujdate (Mun.)","PI",8237,15.5,1,{"RNI":2824,"PAM":851,"PI":4099,"USFP":323,"MP":93,"UC":4,"PPS":43}],["Ait Boubidmane","PI",8103,20.5,0,{"RNI":2638,"PAM":358,"PI":4301,"USFP":20,"PPS":392,"PJD":394}],["Ait Bourzouine","RNI",3273,17.2,0,{"RNI":1290,"PAM":438,"PI":727,"USFP":329,"MP":133,"PPS":352,"PJD":4}],["Ait Harz Allah","USFP",4582,4.3,0,{"RNI":183,"PAM":61,"PI":1986,"USFP":2182,"MP":97,"PPS":57,"PJD":16}],["Ait Naamane","PPS",2344,29.9,0,{"RNI":570,"PAM":26,"PI":43,"USFP":24,"MP":410,"PPS":1271}],["Ait Ouikhalfen","PPS",1916,30.8,0,{"RNI":191,"PAM":79,"PI":492,"USFP":71,"PPS":1083}],["Ait Yaazem","RNI",5421,2.7,0,{"RNI":1767,"PAM":208,"PI":1620,"MP":573,"PPS":755,"PJD":498}],["Bitit","MP",4798,0.8,0,{"RNI":575,"PAM":686,"PI":1646,"USFP":118,"MP":1682,"PPS":91}],["El Hajeb (Mun.)","RNI",8145,8.9,1,{"RNI":2613,"PAM":695,"PI":1892,"USFP":595,"MP":544,"UC":46,"PPS":1511,"PJD":249}],["Iqaddar","PPS",3302,11.7,0,{"RNI":919,"PAM":144,"PI":708,"USFP":226,"PPS":1305}],["Jahjouh","PPS",2977,8.5,1,{"RNI":1135,"PAM":39,"PI":416,"PPS":1387}],["Laqsir","PI",7856,10.2,0,{"RNI":2390,"PAM":820,"PI":3190,"USFP":83,"MP":1182,"PPS":73,"PJD":118}],["Ras Ijerri","PPS",2843,4.8,0,{"RNI":128,"PAM":50,"PI":1201,"USFP":2,"MP":103,"PPS":1338,"PJD":21}],["Sabaa Aiyoun (Mun.)","PI",8533,3.2,1,{"RNI":2670,"PAM":2164,"PI":2940,"USFP":166,"MP":230,"UC":25,"PPS":38,"PJD":300}],["Tamchachate","RNI",1848,17.6,0,{"RNI":813,"PI":68,"PPS":487,"PJD":480}]],"El-Jadida":[["Azemmour (Mun.)","USFP",9676,7.5,1,{"RNI":2928,"PAM":678,"PI":774,"USFP":3654,"MP":35,"UC":628,"PPS":924,"PJD":55}],["Boulaouane","PI",5508,28.4,0,{"RNI":1409,"PAM":53,"PI":2972,"USFP":559,"PPS":515}],["Chaibate","PI",3392,3.6,0,{"RNI":1073,"PI":1196,"USFP":41,"UC":4,"PPS":22,"PJD":1056}],["Chtouka","RNI",9488,36.6,0,{"RNI":5389,"PAM":1918,"PI":587,"USFP":114,"MP":61,"UC":469,"PPS":807,"PJD":143}],["El Jadida (Mun.)","PI",16627,5.1,1,{"RNI":3881,"PAM":1409,"PI":4725,"USFP":797,"MP":283,"UC":913,"PPS":3643,"PJD":976}],["Haouzia","PPS",8606,1.6,0,{"RNI":3710,"PAM":110,"PI":179,"USFP":248,"MP":103,"UC":412,"PPS":3844}],["Laghdira","PAM",5898,12.5,0,{"RNI":1839,"PAM":2574,"PI":209,"USFP":224,"MP":46,"UC":33,"PPS":973}],["Lamharza Essahel","RNI",6324,3.5,0,{"RNI":2725,"PAM":57,"PI":2506,"USFP":156,"UC":94,"PPS":662,"PJD":124}],["Lbir Jdid (Mun.)","PAM",7482,10.3,1,{"RNI":1149,"PAM":2770,"PI":84,"USFP":2003,"MP":61,"UC":185,"PPS":1194,"PJD":36}],["Mettouh","PI",9150,71.4,0,{"RNI":1133,"PAM":29,"PI":7669,"USFP":298,"PPS":21}],["Mogress","PAM",5961,18.2,0,{"RNI":95,"PAM":3243,"PI":73,"USFP":282,"MP":73,"PPS":2161,"PJD":34}],["My Abdellah","USFP",9750,13.1,0,{"RNI":1803,"PAM":948,"PI":659,"USFP":3140,"MP":212,"UC":874,"PPS":1864,"PJD":250}],["Oulad Aissa","MP",6453,67.1,0,{"RNI":392,"PAM":262,"PI":11,"MP":5041,"UC":10,"PPS":712,"PJD":25}],["Oulad Hamdane","RNI",4323,5.7,0,{"RNI":1548,"PAM":211,"PI":1300,"USFP":1099,"UC":74,"PPS":91}],["Oulad Rahmoune","RNI",8534,22.4,0,{"RNI":3540,"PAM":1082,"PI":42,"USFP":1625,"MP":54,"UC":656,"PPS":1399,"PJD":136}],["Oulad Sidi Ali Ben Youssef","PI",3234,29.1,0,{"RNI":270,"PAM":111,"PI":1780,"USFP":838,"UC":1,"PPS":217,"PJD":17}],["Ouled Frej","PI",6155,47.2,1,{"RNI":1228,"PAM":176,"PI":4134,"USFP":305,"MP":219,"UC":47,"PPS":34,"PJD":12}],["Ouled Ghanem","RNI",6262,57,0,{"RNI":4244,"PAM":674,"PI":541,"USFP":251,"MP":73,"PPS":464,"PJD":15}],["Ouled Hcine","PAM",8492,21.4,0,{"RNI":397,"PAM":3785,"PI":1211,"USFP":556,"MP":1968,"UC":83,"PPS":492}],["Sebt Saiss","MP",3734,6.1,0,{"RNI":1315,"PAM":217,"USFP":461,"MP":1542,"PPS":128,"PJD":71}],["Si Hsaien Ben Abderrahmane","PI",2556,24,0,{"RNI":816,"PAM":151,"PI":1430,"MP":4,"UC":72,"PPS":52,"PJD":31}],["Sidi Abed","MP",7422,34.9,0,{"RNI":1273,"PAM":709,"PI":122,"USFP":149,"MP":3866,"UC":110,"PPS":1193}],["Sidi Ali Ben Hamdouche","RNI",7516,31,0,{"RNI":3828,"PAM":1297,"PI":1496,"USFP":183,"MP":60,"UC":156,"PPS":365,"PJD":131}],["Sidi M'Hamed Akhdim","RNI",3101,20.3,0,{"RNI":1616,"PAM":384,"USFP":83,"MP":987,"PPS":31}],["Sidi Smail","PAM",8530,41.4,0,{"RNI":1656,"PAM":5191,"USFP":325,"MP":504,"UC":118,"PPS":342,"PJD":394}],["Zaouiat Lakouacem","USFP",3812,16.5,0,{"RNI":1208,"PAM":30,"PI":431,"USFP":1837,"UC":21,"PPS":170,"PJD":115}],["Zaouiat Saiss","MP",2986,20.4,0,{"RNI":727,"PAM":594,"USFP":285,"MP":1336,"PPS":2,"PJD":42}]],"El-Kelâa-des-Sraghna":[["Assahrij","RNI",4979,8.1,0,{"RNI":1951,"PI":323,"MP":5,"UC":1546,"PPS":1154}],["Bouya Omar","PAM",3758,22.8,0,{"RNI":1241,"PAM":2099,"PI":209,"USFP":1,"PJD":208}],["Choara","PPS",3931,32.9,0,{"RNI":946,"PI":723,"UC":22,"PPS":2240}],["Chtaiba","PI",2035,35.6,0,{"RNI":405,"PAM":10,"PI":1129,"USFP":195,"MP":176,"UC":84,"PJD":36}],["Dzouz","PI",3221,13.9,0,{"RNI":1065,"PI":1513,"USFP":12,"UC":69,"PPS":415,"PJD":147}],["Eddachra","USFP",2269,28.8,0,{"RNI":48,"PAM":137,"PI":614,"USFP":1268,"MP":47,"UC":72,"PJD":83}],["El Aamria","RNI",3104,23.4,0,{"RNI":1425,"PAM":79,"PI":636,"USFP":700,"MP":264}],["El Kelaâ des Sraghna (Mun.)","USFP",8537,2.6,1,{"RNI":946,"PAM":1476,"PI":1963,"USFP":2185,"MP":185,"UC":840,"PPS":399,"PJD":543}],["El Marbouh","PI",2413,56.8,0,{"PAM":97,"PI":1687,"USFP":316,"UC":185,"PPS":37,"PJD":91}],["Errafiaya","PI",1652,50.1,0,{"PAM":22,"PI":1143,"USFP":316,"UC":171}],["Fraita","USFP",3698,14.2,0,{"RNI":1416,"USFP":1942,"UC":235,"PPS":105}],["Hiadna","PAM",3902,27.9,0,{"RNI":9,"PAM":2170,"USFP":1081,"MP":33,"UC":605,"PJD":4}],["Jbiel","RNI",2807,23,0,{"RNI":1463,"PAM":817,"PI":189,"USFP":134,"PPS":10,"PJD":194}],["Jouala","RNI",3655,37.2,0,{"RNI":2361,"PAM":1003,"PI":162,"UC":89,"PJD":40}],["Laatamna","PPS",2727,42.5,0,{"RNI":131,"PI":34,"MP":84,"UC":659,"PPS":1819}],["Laattaouia (Mun.)","PPS",9481,7.5,1,{"RNI":3440,"PAM":47,"PI":926,"USFP":103,"UC":681,"PPS":4148,"PJD":136}],["Laattaouia Ech-chaibia","PPS",2223,13,0,{"RNI":649,"PAM":187,"PI":46,"MP":6,"PPS":938,"PJD":397}],["Louad Lakhdar","USFP",2671,12.8,0,{"RNI":347,"PI":543,"USFP":1045,"UC":32,"PPS":704}],["Lounasda","USFP",2804,10.9,0,{"RNI":126,"PI":1174,"USFP":1480,"PJD":24}],["M'Zem Sanhaja","PI",3046,12.2,0,{"RNI":11,"PI":1704,"USFP":1331}],["Mayate","PI",2810,26.4,0,{"RNI":290,"PAM":128,"PI":1495,"USFP":752,"UC":49,"PPS":56,"PJD":40}],["Ouargui","USFP",2750,14.9,0,{"RNI":359,"PAM":35,"PI":4,"USFP":1091,"UC":402,"PPS":682,"PJD":177}],["Oulad Aamer","PI",2152,45,0,{"PAM":93,"PI":1514,"USFP":545}],["Oulad Aarrad","RNI",2250,8.7,0,{"RNI":1154,"PAM":959,"PI":108,"UC":21,"PPS":8}],["Oulad Bouali Loued","PI",1739,40,0,{"RNI":512,"PAM":19,"PI":1208}],["Oulad Cherki","PAM",2790,3.9,0,{"RNI":209,"PAM":973,"PI":865,"USFP":84,"MP":257,"UC":402}],["Oulad El Garne","PJD",2695,21.2,0,{"RNI":29,"PI":622,"USFP":21,"UC":726,"PJD":1297}],["Oulad Khallouf","PPS",2503,15.4,0,{"RNI":353,"PI":847,"MP":25,"PPS":1232,"PJD":46}],["Oulad Massaoud","PAM",1930,32.8,0,{"RNI":48,"PAM":1130,"PI":497,"UC":195,"PJD":60}],["Oulad Msabbel","UC",1967,7.9,0,{"RNI":314,"PAM":459,"PI":465,"MP":82,"UC":621,"PJD":26}],["Oulad Sbih","USFP",2632,9.8,0,{"PAM":1019,"PI":60,"USFP":1278,"UC":99,"PJD":176}],["Oulad Yaacoub","UC",2108,26.8,0,{"RNI":656,"PI":22,"USFP":70,"MP":58,"UC":1221,"PJD":81}],["Oulad Zarrad","UC",4521,21.8,0,{"PI":13,"USFP":1762,"UC":2746}],["Sidi Aissa Ben Slimane","UC",4747,36.7,0,{"PAM":64,"PI":528,"USFP":978,"MP":28,"UC":2721,"PPS":382,"PJD":46}],["Sidi El Hattab","RNI",2700,16.1,0,{"RNI":1321,"PI":407,"USFP":47,"UC":886,"PPS":39}],["Sidi Moussa","RNI",2302,32.9,0,{"RNI":1414,"PAM":81,"PI":21,"MP":130,"UC":656}],["Sidi Rahhal (Mun.)","PAM",2818,41.7,1,{"RNI":817,"PAM":1992,"PJD":9}],["Sour El Aaz","PAM",1379,7,0,{"RNI":556,"PAM":652,"PI":153,"PPS":18}],["Tamallalt (Mun.)","RNI",5264,15,1,{"RNI":2917,"PAM":2128,"PI":194,"USFP":25}],["Taouzint","USFP",1890,10.9,0,{"USFP":1048,"UC":842}],["Zemrane","RNI",3288,18.3,0,{"RNI":1933,"PAM":1330,"UC":25}],["Zemrane Charqia","RNI",4668,22,0,{"RNI":2611,"PAM":1583,"PI":334,"UC":12,"PJD":128}],["Znada","USFP",1223,43.7,0,{"RNI":18,"PAM":17,"PI":277,"USFP":811,"MP":44,"UC":26,"PJD":30}]],"Errachidia":[["Aarab Sebbah Gheris","UC",1089,33.5,0,{"RNI":336,"UC":701,"PPS":14,"PJD":38}],["Aarab Sebbah Ziz","RNI",3323,3.2,0,{"RNI":1304,"PAM":1198,"PI":104,"USFP":329,"MP":12,"PPS":61,"PJD":315}],["Aghbalou N'Kerdous","MP",3777,2.5,0,{"RNI":708,"PI":8,"USFP":1398,"MP":1491,"PPS":172}],["Amellagou","USFP",1956,0.4,0,{"RNI":481,"PAM":622,"PI":55,"USFP":629,"MP":55,"PPS":114}],["Aoufous","RNI",3507,4.9,0,{"RNI":1401,"PAM":229,"PI":1229,"MP":181,"PPS":81,"PJD":386}],["Arfoud (Mun.)","RNI",3940,3.7,1,{"RNI":1229,"PAM":362,"PI":487,"MP":2,"UC":744,"PPS":32,"PJD":1084}],["Bni M'Hamed-Sijelmassa","PAM",3922,28.1,0,{"RNI":7,"PAM":2362,"PI":1260,"PPS":2,"PJD":291}],["Boudnib (Mun.)","RNI",2770,7.7,1,{"RNI":985,"PAM":146,"PI":772,"USFP":237,"UC":210,"PPS":206,"PJD":214}],["Chorfa M'Daghra","RNI",3818,4.1,0,{"RNI":1469,"PAM":5,"PI":1311,"USFP":9,"MP":6,"PPS":253,"PJD":765}],["Er-rissani","RNI",1051,9.2,0,{"RNI":346,"PAM":198,"PI":118,"UC":249,"PPS":140}],["Er-rteb","RNI",3623,38.1,0,{"RNI":2454,"PAM":2,"PI":1074,"PPS":74,"PJD":19}],["Errachidia (Mun.)","PI",11238,5.2,1,{"RNI":2627,"PAM":1164,"PI":3214,"USFP":989,"MP":443,"UC":373,"PPS":848,"PJD":1580}],["Es-sfalat","PAM",2770,7.2,0,{"RNI":88,"PAM":1366,"PI":133,"UC":1,"PPS":1166,"PJD":16}],["Es-sifa","MP",2275,30.4,0,{"PAM":354,"PI":2,"MP":1305,"UC":1,"PJD":613}],["Et-taous","RNI",2258,23.8,0,{"RNI":1302,"PAM":105,"UC":764,"PPS":87}],["Ferkla El Oulia","PI",6660,6.9,0,{"RNI":1904,"PAM":183,"PI":2364,"USFP":571,"MP":226,"PPS":10,"PJD":1402}],["Ferkla Es-soufla","RNI",3797,24.3,0,{"RNI":1743,"PAM":115,"PI":822,"USFP":773,"MP":5,"PPS":14,"PJD":325}],["Fezna","PAM",1162,30.6,0,{"RNI":76,"PAM":704,"PPS":34,"PJD":348}],["Gheris El Ouloui","RNI",2509,7.7,0,{"RNI":946,"PAM":116,"PI":138,"USFP":754,"MP":5,"PPS":550}],["Gheris Es-soufli","PPS",2325,0,0,{"RNI":903,"PAM":46,"PI":17,"USFP":455,"PPS":904}],["Goulmima (Mun.)","USFP",3831,13.6,1,{"RNI":1035,"PAM":95,"PI":676,"USFP":1556,"MP":137,"PPS":332}],["Jorf (Mun.)","PAM",2878,6.2,1,{"RNI":73,"PAM":1200,"PI":23,"PPS":559,"PJD":1023}],["Lkheng","PI",5449,6.8,0,{"RNI":1669,"PAM":71,"PI":2039,"USFP":122,"MP":39,"UC":1157,"PPS":348,"PJD":4}],["Melaab","MP",5048,3,0,{"RNI":259,"PI":109,"USFP":2265,"MP":2414,"UC":1}],["Moulay Ali Cherif (Mun.)","PAM",5413,37.7,1,{"RNI":845,"PAM":2884,"PI":362,"UC":381,"PPS":774,"PJD":167}],["Oued Naam","RNI",1440,41.2,0,{"RNI":795,"PAM":202,"PI":175,"USFP":17,"UC":183,"PJD":68}],["Sidi Ali","PAM",1406,14.9,0,{"RNI":598,"PAM":808}],["Tadighoust","USFP",2298,6.2,0,{"RNI":372,"PAM":14,"USFP":995,"MP":852,"PPS":65}],["Tinejdad (Mun.)","USFP",2644,0.5,1,{"RNI":1005,"PI":184,"USFP":1019,"MP":38,"PPS":391,"PJD":7}]],"Es-Smara":[["Amgala","PI",702,54.7,0,{"RNI":78,"PAM":120,"PI":504}],["Es-semara (Mun.)","PI",10603,17.4,1,{"RNI":2435,"PAM":1657,"PI":4281,"USFP":717,"MP":563,"UC":147,"PPS":548,"PJD":255}],["Haouza","PI",1446,31.3,0,{"RNI":97,"PAM":447,"PI":899,"USFP":2,"PPS":1}],["Jdiriya","PI",947,56,0,{"RNI":35,"PAM":160,"PI":690,"UC":62}],["Sidi Ahmed Laaroussi","RNI",787,4.1,0,{"RNI":381,"PAM":57,"PI":349}],["Tifariti","PI",1242,52.6,0,{"RNI":68,"PAM":260,"PI":913,"USFP":1}]],"Essaouira":[["Adaghas","RNI",1032,9.9,0,{"RNI":522,"PAM":71,"USFP":420,"PPS":19}],["Aglif","PPS",2788,15.6,0,{"RNI":85,"PAM":661,"USFP":803,"PPS":1238,"PJD":1}],["Aguerd","PI",2131,24.1,0,{"RNI":780,"PAM":57,"PI":1294}],["Ait Aissi Ihahane","RNI",1533,1.1,0,{"RNI":763,"PAM":6,"PI":17,"USFP":746,"PJD":1}],["Ait Daoud (Mun.)","USFP",1657,12.5,1,{"RNI":13,"PAM":615,"USFP":822,"PPS":207}],["Ait Said","PAM",1600,9.1,0,{"RNI":21,"PAM":755,"USFP":610,"PPS":170,"PJD":44}],["Aquermoud","PAM",5003,30.1,0,{"RNI":113,"PAM":3156,"PI":1648,"USFP":44,"PPS":36,"PJD":6}],["Assais","USFP",1746,3.1,0,{"RNI":831,"PAM":30,"USFP":885}],["Bizdad","USFP",2736,6.5,0,{"RNI":1247,"PI":41,"USFP":1426,"PJD":22}],["Bouzemmour","USFP",1765,10.3,0,{"RNI":215,"PAM":73,"PI":1,"USFP":812,"PPS":631,"PJD":33}],["El Hanchane (Mun.)","PPS",2061,12.5,1,{"RNI":208,"PAM":67,"PI":25,"USFP":660,"PPS":917,"PJD":184}],["Essaouira (Mun.)","RNI",8198,15.7,1,{"RNI":2883,"PAM":1592,"PI":393,"USFP":788,"MP":554,"UC":742,"PPS":864,"PJD":382}],["Ezzaouite","PPS",2192,4.6,0,{"RNI":148,"PAM":5,"USFP":963,"PPS":1064,"PJD":12}],["Had Dra","PI",3043,47.9,0,{"RNI":686,"PAM":60,"PI":2145,"USFP":151,"PPS":1}],["Ida Ou Aazza","RNI",3324,0.2,0,{"RNI":1419,"PAM":22,"PI":23,"USFP":1412,"PPS":448}],["Ida Ou Guelloul","PPS",1971,36.2,0,{"RNI":409,"PAM":66,"PI":15,"USFP":353,"PPS":1122,"PJD":6}],["Ida Ou Kazzou","USFP",1771,24,0,{"RNI":599,"PAM":38,"PI":2,"USFP":1024,"PPS":108}],["Imgrade","PPS",2344,34.8,0,{"USFP":764,"PPS":1580}],["Imi N'Tlit","RNI",2452,52.3,0,{"RNI":1796,"PAM":105,"USFP":38,"PPS":513}],["Kechoula","RNI",1912,18.4,0,{"RNI":802,"PAM":260,"PI":365,"USFP":451,"PPS":34}],["Korimate","RNI",2702,17.4,0,{"RNI":1407,"PAM":223,"PI":103,"USFP":937,"PJD":32}],["Lagdadra","PPS",2387,12.1,0,{"PAM":1,"PI":692,"USFP":644,"PPS":980,"PJD":70}],["Lahsinate","PI",1621,17.7,0,{"RNI":389,"PAM":51,"PI":676,"USFP":319,"PPS":49,"PJD":137}],["M'Khalif","PI",2022,20.6,0,{"RNI":100,"PI":1094,"USFP":677,"PPS":24,"PJD":127}],["M'Ramer","USFP",2195,7.2,0,{"RNI":559,"PAM":471,"PI":440,"USFP":718,"PJD":7}],["Mejji","USFP",1515,5.7,0,{"PAM":528,"PI":373,"USFP":614}],["Meskala","RNI",1741,12.3,0,{"RNI":967,"PAM":22,"USFP":752}],["Mouarid","RNI",2049,6.4,0,{"RNI":901,"PAM":177,"PI":114,"USFP":88,"PPS":769}],["Moulay Bouzarqtoune","RNI",1990,27.8,0,{"RNI":1094,"PAM":282,"PI":540,"USFP":63,"UC":11}],["Mzilate","PAM",1374,16.7,0,{"RNI":572,"PAM":802}],["Oulad M'Rabet","RNI",1295,2.5,0,{"RNI":595,"PAM":3,"PI":562,"USFP":30,"PJD":105}],["Ounagha","RNI",3454,36.5,0,{"RNI":2173,"PAM":172,"PI":184,"USFP":912,"PJD":13}],["Sidi Abdeljalil","PPS",2139,17.5,0,{"RNI":229,"PAM":113,"PI":702,"USFP":15,"PPS":1077,"PJD":3}],["Sidi Ahmed Essayeh","USFP",2068,30.3,0,{"RNI":135,"PAM":324,"USFP":1118,"PPS":491}],["Sidi Aissa Regragui","PI",2313,33.8,0,{"RNI":171,"PAM":95,"PI":1413,"PPS":632,"PJD":2}],["Sidi Ali El Korati","PI",1929,32.6,0,{"RNI":35,"PAM":528,"PI":1157,"USFP":10,"PPS":199}],["Sidi Boulaalam","USFP",2507,8.9,0,{"RNI":295,"PAM":973,"PI":35,"USFP":1196,"PPS":8}],["Sidi El Jazouli","PPS",2008,9,0,{"RNI":386,"PAM":6,"PI":9,"USFP":713,"PPS":894}],["Sidi Ghaneme","PPS",1911,4,0,{"RNI":133,"PAM":142,"PI":11,"USFP":774,"PPS":851}],["Sidi H'Mad Ou M'Barek","PPS",1961,42.4,0,{"RNI":510,"USFP":109,"PPS":1342}],["Sidi Hmad Ou Hamed","RNI",1342,43,0,{"RNI":811,"PAM":85,"PI":175,"USFP":37,"PPS":234}],["Sidi Ishaq","PI",2964,32.7,0,{"RNI":114,"PAM":940,"PI":1910}],["Sidi Kaouki","PI",1369,51.9,0,{"RNI":221,"PAM":217,"PI":931}],["Sidi Laaroussi","PI",3477,9.1,0,{"RNI":334,"PAM":799,"PI":1167,"USFP":326,"PPS":851}],["Sidi M'Hamed Ou Marzouq","PAM",2510,9.7,0,{"RNI":1133,"PAM":1377}],["Smimou","USFP",3482,16.4,0,{"RNI":128,"PAM":192,"PI":20,"USFP":1835,"UC":43,"PPS":1264}],["Tafedna","USFP",2479,12.6,0,{"RNI":888,"PAM":27,"USFP":1201,"PPS":363}],["Tafetachte","PAM",2094,24.7,0,{"RNI":40,"PAM":1286,"PI":768}],["Tahelouante","PPS",1167,2.3,0,{"USFP":570,"PPS":597}],["Takate","PAM",3008,13.9,0,{"RNI":244,"PAM":1266,"PI":847,"USFP":104,"PPS":547}],["Takoucht","PPS",1442,13.2,0,{"RNI":185,"PAM":119,"USFP":474,"PPS":664}],["Talmest (Mun.)","PI",2021,5.3,1,{"RNI":41,"PAM":590,"PI":697,"USFP":532,"PPS":161}],["Tamanar (Mun.)","USFP",4086,14.6,1,{"RNI":1214,"PAM":413,"PI":57,"USFP":1810,"UC":20,"PPS":567,"PJD":5}],["Targante","USFP",2412,41,0,{"RNI":402,"PAM":39,"PI":25,"USFP":1462,"PPS":474,"PJD":10}],["Tidzi","PPS",1935,8.6,0,{"RNI":340,"PAM":364,"PI":8,"USFP":528,"PPS":695}],["Timizguida-Ouftas","USFP",1801,61,0,{"RNI":127,"PAM":2,"PI":61,"USFP":1355,"PPS":256}],["Zaouiat Ben Hmida","PI",2645,20.5,0,{"RNI":555,"PI":1285,"USFP":744,"PPS":61}]],"Fahs - Anjra":[["Al Bahraoyine","PI",3368,28.2,0,{"RNI":1100,"PAM":9,"PI":2049,"PPS":2,"PJD":208}],["Anjra","RNI",6217,35.5,0,{"RNI":3637,"PAM":25,"PI":1428,"PPS":230,"PJD":897}],["Jouamaa","PI",3040,34.1,0,{"RNI":806,"PAM":13,"PI":1843,"USFP":7,"PPS":245,"PJD":126}],["Ksar El Majaz","RNI",4102,47.9,0,{"RNI":2793,"PI":828,"USFP":273,"PPS":208}],["Ksar Sghir","RNI",4625,40.7,0,{"RNI":2960,"PAM":157,"PI":1078,"PPS":22,"PJD":408}],["Malloussa","PI",4749,18.5,0,{"RNI":1683,"PI":2563,"PPS":121,"PJD":382}],["Taghramt","RNI",3805,43.2,0,{"RNI":2354,"PAM":76,"PI":710,"USFP":4,"PPS":466,"PJD":195}]],"Figuig":[["Abbou Lakhal","RNI",1260,13.6,0,{"RNI":634,"PAM":145,"PI":463,"USFP":18}],["Ain Chair","RNI",661,2.3,0,{"RNI":253,"PAM":238,"PI":127,"MP":43}],["Ain Chouater","PAM",554,6.7,0,{"RNI":23,"PAM":284,"PI":247}],["Bni Guil","RNI",3984,12.9,0,{"RNI":1652,"PAM":1137,"PI":941,"USFP":8,"MP":129,"PJD":117}],["Bni Tadjite","PAM",4831,14,1,{"RNI":1326,"PAM":2000,"PI":132,"USFP":151,"MP":138,"UC":46,"PPS":830,"PJD":208}],["Bouanane","PAM",3605,53.2,0,{"RNI":323,"PAM":2410,"PI":491,"USFP":83,"MP":264,"PPS":32,"PJD":2}],["Bouarfa (Mun.)","PAM",6415,3.2,1,{"RNI":1397,"PAM":2130,"PI":1927,"USFP":343,"MP":260,"UC":147,"PPS":91,"PJD":120}],["Bouchaouene","PPS",4866,12,0,{"RNI":786,"PAM":1361,"USFP":210,"MP":389,"UC":147,"PPS":1945,"PJD":28}],["Boumerieme","PAM",3334,28.9,0,{"RNI":477,"PAM":1628,"PI":15,"USFP":665,"MP":453,"PPS":82,"PJD":14}],["Figuig (Mun.)","RNI",3171,21.6,1,{"RNI":1540,"PAM":854,"PI":122,"USFP":506,"PPS":143,"PJD":6}],["Maatarka","PAM",4675,5.8,0,{"RNI":1729,"PAM":2002,"PI":814,"MP":130}],["Talsint","PAM",6969,17.4,1,{"RNI":1234,"PAM":2875,"USFP":1660,"MP":414,"PPS":777,"PJD":9}],["Tendrara","RNI",5041,0.1,1,{"RNI":1822,"PAM":1818,"PI":1224,"MP":94,"PPS":69,"PJD":14}]],"Fquih Ben Salah":[["Bni Chegdale","MP",3505,5.1,0,{"RNI":1443,"PAM":100,"PI":198,"USFP":98,"MP":1623,"PJD":43}],["Bni Oukil","RNI",4865,11.5,0,{"RNI":2061,"PAM":133,"PI":816,"USFP":338,"MP":1500,"PJD":17}],["Bradia","PAM",11424,0.6,0,{"RNI":3419,"PAM":3486,"PI":705,"USFP":1248,"MP":1672,"UC":97,"PJD":797}],["Dar Ould Zidouh","MP",9258,0.9,0,{"RNI":2387,"PAM":2859,"PI":198,"USFP":152,"MP":2940,"PJD":722}],["Fquih Ben Salah (Mun.)","MP",9751,9.3,1,{"RNI":1655,"PAM":448,"PI":2179,"USFP":1016,"MP":3089,"UC":439,"PJD":925}],["Had Boumoussa","PAM",10087,4.1,0,{"RNI":1164,"PAM":4051,"PI":320,"USFP":136,"MP":3639,"PPS":70,"PJD":707}],["Hel Merbaa","MP",4030,36.7,0,{"RNI":1044,"PI":279,"USFP":91,"MP":2523,"PJD":93}],["Khalfia","RNI",5511,13.3,0,{"RNI":1925,"PAM":352,"PI":1008,"USFP":1191,"MP":991,"PJD":44}],["Krifate","MP",7713,19.5,0,{"RNI":876,"PAM":398,"PI":1816,"USFP":312,"MP":3323,"UC":743,"PJD":245}],["Ouled Ayad (Mun.)","RNI",7696,43.1,1,{"RNI":4549,"PAM":653,"PI":1232,"USFP":197,"MP":891,"UC":91,"PJD":83}],["Ouled Bourahmoune","RNI",4700,18,0,{"RNI":2155,"PAM":238,"PI":67,"USFP":723,"MP":1307,"PJD":210}],["Ouled Nacer","PAM",8912,31.8,0,{"RNI":1981,"PAM":4817,"PI":651,"USFP":27,"MP":802,"PJD":634}],["Ouled Zmam","USFP",9670,39.8,0,{"RNI":2362,"PAM":163,"PI":112,"USFP":6208,"MP":124,"UC":457,"PPS":143,"PJD":101}],["Sidi Aissa Ben Ali","RNI",9612,35.9,0,{"RNI":5518,"PAM":114,"PI":1633,"USFP":2063,"MP":259,"UC":4,"PJD":21}],["Sidi Hammadi","RNI",5311,17.8,0,{"RNI":2335,"PAM":1392,"PI":533,"USFP":623,"MP":205,"PJD":223}],["Souk Sebt Ouled Nemma (Mun.)","USFP",5650,12.2,1,{"RNI":1104,"PAM":673,"PI":337,"USFP":1794,"MP":446,"UC":535,"PPS":377,"PJD":384}]],"Fès-Chamalia":[["El Mariniyine (Arrond.)","RNI",12416,0.5,1,{"RNI":2861,"PAM":2802,"PI":1611,"USFP":607,"MP":1435,"UC":582,"PPS":718,"PJD":1800}],["Fès-Médina (Arrond.)","RNI",6841,0.5,1,{"RNI":1638,"PAM":989,"PI":1607,"USFP":926,"MP":261,"UC":469,"PPS":203,"PJD":748}],["Méchouar Fès Jdid (Mun.)","PI",3713,14.8,1,{"RNI":1056,"PAM":650,"PI":1605,"USFP":66,"MP":41,"UC":26,"PPS":77,"PJD":192}],["Zouagha (Arrond.)","RNI",12592,8.2,1,{"RNI":3356,"PAM":1173,"PI":2327,"USFP":1145,"MP":1660,"UC":197,"PPS":1188,"PJD":1546}]],"Fès-Janoubia":[["Agdal (Arrond.)","RNI",10771,3.9,1,{"RNI":3064,"PAM":1405,"PI":2643,"USFP":1261,"MP":408,"PPS":238,"PJD":1752}],["Ain Bida","RNI",3904,20,0,{"RNI":1925,"PAM":1143,"PI":614,"USFP":111,"PJD":111}],["Jnan El Ouard (Arrond.)","RNI",13148,0,1,{"RNI":2947,"PAM":1876,"PI":1646,"USFP":2946,"MP":327,"UC":254,"PPS":2036,"PJD":1116}],["Oulad Tayeb","RNI",5228,71.4,1,{"RNI":4385,"PAM":651,"PI":60,"USFP":6,"PJD":126}],["Saiss (Arrond.)","PI",10674,1.1,1,{"RNI":2898,"PAM":1034,"PI":3017,"USFP":1059,"MP":275,"PPS":230,"PJD":2161}],["Sidi Harazem","RNI",2654,5,1,{"RNI":1309,"PAM":1176,"PI":77,"USFP":92}]],"Guelmim":[["Abaynou","RNI",1391,23.9,0,{"RNI":695,"PAM":363,"PI":81,"MP":134,"PJD":118}],["Aday","PAM",1393,42.1,0,{"RNI":231,"PAM":874,"PI":287,"PPS":1}],["Aferkat","RNI",1774,15.7,0,{"RNI":726,"PAM":388,"PI":41,"MP":447,"UC":172}],["Ait Boufoulen","RNI",948,4.7,0,{"RNI":495,"PAM":450,"USFP":2,"PPS":1}],["Amtdi","PAM",1018,24.3,0,{"RNI":335,"PAM":582,"PI":101}],["Asrir","MP",3690,3.1,0,{"RNI":460,"PAM":795,"PI":971,"MP":1085,"UC":5,"PPS":368,"PJD":6}],["Bouizakarne (Mun.)","RNI",4364,23.1,1,{"RNI":1828,"PAM":819,"PI":372,"MP":782,"UC":303,"PPS":215,"PJD":45}],["Echatea El Abied","PAM",1251,36.5,0,{"RNI":335,"PAM":791,"PI":92,"MP":1,"PJD":32}],["Fask","PAM",3221,10.1,0,{"RNI":1234,"PAM":1559,"PI":22,"USFP":9,"MP":389,"UC":3,"PJD":5}],["Guelmim (Mun.)","PAM",15572,6.7,1,{"RNI":3628,"PAM":4678,"PI":2852,"USFP":504,"MP":1030,"UC":779,"PPS":1025,"PJD":1076}],["Ifrane Atlas Saghir","PAM",4639,24.2,0,{"RNI":1249,"PAM":2373,"PI":971,"MP":5,"UC":25,"PPS":12,"PJD":4}],["Labyar","RNI",865,4.2,0,{"RNI":260,"PAM":154,"PI":101,"USFP":27,"MP":224,"UC":99}],["Laqsabi Tagoust","RNI",2395,5.7,0,{"RNI":842,"PAM":705,"PI":513,"UC":183,"PJD":152}],["Rass Oumlil","RNI",727,4,0,{"RNI":361,"PAM":332,"PI":34}],["Tagante","PAM",1855,14.3,0,{"RNI":734,"PAM":1000,"PI":100,"MP":8,"UC":2,"PJD":11}],["Taghjijt","PAM",6478,2,1,{"RNI":2063,"PAM":2193,"PI":904,"USFP":46,"MP":923,"UC":268,"PJD":81}],["Taliouine Assaka","PAM",757,48,0,{"RNI":185,"PAM":548,"PI":18,"PJD":6}],["Targa Wassay","PAM",1038,13.9,0,{"RNI":444,"PAM":588,"PI":6}],["Tiglit","PAM",885,2.1,0,{"RNI":401,"PAM":420,"MP":64}],["Timoulay","RNI",3033,9.3,0,{"RNI":1422,"PAM":1141,"PI":15,"MP":29,"UC":127,"PPS":23,"PJD":276}]],"Guercif":[["Assebbab","PI",3205,3.1,0,{"RNI":145,"PAM":1393,"PI":1492,"USFP":175}],["Barkine","RNI",3338,11.7,0,{"RNI":1405,"PAM":1015,"PI":758,"USFP":159,"MP":1}],["Guercif (Mun.)","PAM",9088,3.3,1,{"RNI":2506,"PAM":2805,"PI":2325,"USFP":734,"MP":157,"PPS":258,"PJD":303}],["Houara Oulad Raho","PAM",8622,7,0,{"RNI":3203,"PAM":3806,"PI":1382,"USFP":209,"MP":22}],["Lamrija","PI",4776,14.2,0,{"RNI":1335,"PAM":1277,"PI":2011,"USFP":28,"PJD":125}],["Mazguitam","PI",3940,11.8,0,{"RNI":307,"PAM":1447,"PI":1912,"USFP":272,"MP":2}],["Oulad Bourima","PI",1054,15.3,0,{"RNI":269,"PAM":310,"PI":471,"USFP":4}],["Ras Laksar","PAM",5112,15,0,{"RNI":1003,"PAM":1785,"PI":925,"USFP":1018,"MP":3,"PJD":378}],["Saka","PI",7258,8.2,0,{"RNI":2351,"PAM":1607,"PI":2944,"USFP":352,"MP":3,"PJD":1}],["Taddart","PAM",9561,15.2,0,{"RNI":2324,"PAM":3776,"PI":1795,"USFP":1624,"MP":42}]],"Guéliz - Annakhil":[["Alouidane","PAM",10077,2.4,0,{"RNI":942,"PAM":4068,"PI":858,"MP":3825,"UC":32,"PPS":202,"PJD":150}],["Annakhil (Arrond.)","PAM",8604,11.4,1,{"RNI":1432,"PAM":2417,"PI":1069,"USFP":778,"MP":868,"UC":1066,"PPS":390,"PJD":584}],["Gueliz (Arrond.)","PAM",17690,4.1,1,{"RNI":3866,"PAM":4590,"PI":2985,"USFP":693,"MP":318,"UC":2669,"PPS":692,"PJD":1877}],["Harbil","RNI",11581,1.2,0,{"RNI":4921,"PAM":4786,"PI":400,"USFP":441,"MP":130,"UC":526,"PPS":141,"PJD":236}],["M'Nabha","PAM",5325,9.2,0,{"RNI":2099,"PAM":2588,"PI":5,"MP":509,"UC":45,"PPS":79}],["Ouahat Sidi Brahim","PAM",8257,31.9,0,{"RNI":891,"PAM":4250,"PI":1618,"USFP":24,"MP":1402,"UC":24,"PJD":48}],["Oulad Hassoune","PI",8292,5.6,0,{"RNI":904,"PAM":2550,"PI":3016,"MP":1655,"UC":13,"PPS":87,"PJD":67}],["Ouled Dlim","PAM",5880,17.6,0,{"RNI":2138,"PAM":3174,"PI":39,"MP":156,"UC":364,"PJD":9}]],"Hay-Hassani":[["Hay-Hassani (Arrond.)","RNI",22903,24.8,1,{"RNI":9608,"PAM":3923,"PI":3794,"USFP":968,"MP":668,"PPS":1376,"PJD":2566}]],"Ifrane":[["Ain Leuh","RNI",4233,26.1,1,{"RNI":2117,"PAM":462,"PI":430,"USFP":102,"MP":1013,"UC":63,"PPS":46}],["Azrou (Mun.)","RNI",7504,43.4,1,{"RNI":4221,"PAM":211,"PI":965,"USFP":303,"MP":968,"PPS":313,"PJD":523}],["Ben Smim","MP",3645,14.8,0,{"RNI":1211,"PAM":136,"PI":468,"USFP":70,"MP":1751,"PPS":5,"PJD":4}],["Dayat Aoua","PI",4659,24.3,0,{"RNI":1349,"PAM":36,"PI":2481,"USFP":125,"MP":397,"UC":271}],["Ifrane (Mun.)","MP",4716,15.9,1,{"RNI":1072,"PAM":52,"PI":1223,"USFP":126,"MP":1972,"UC":103,"PPS":168}],["Oued Ifrane","MP",5216,19.8,0,{"RNI":1678,"PAM":101,"PI":665,"USFP":59,"MP":2713}],["Sidi El Makhfi","RNI",7063,9.1,0,{"RNI":3706,"PAM":258,"PI":12,"MP":3066,"PPS":21}],["Tigrigra","PI",4221,0.8,0,{"RNI":773,"PAM":114,"PI":1584,"USFP":36,"MP":1549,"PPS":149,"PJD":16}],["Timahdite","MP",5141,8.5,0,{"RNI":2047,"PAM":119,"PI":291,"USFP":48,"MP":2485,"PJD":151}],["Tizguite","MP",4385,14.4,0,{"RNI":1562,"PAM":38,"PI":593,"MP":2192}]],"Inézgane - Aït-Melloul":[["Ait Melloul (Mun.)","RNI",17229,24.7,1,{"RNI":6738,"PAM":1948,"PI":2244,"USFP":1392,"MP":705,"UC":77,"PPS":2489,"PJD":1636}],["Dcheira El Jihadia (Mun.)","RNI",12177,25.4,1,{"RNI":4784,"PAM":1320,"PI":780,"USFP":1691,"MP":1080,"UC":124,"PPS":944,"PJD":1454}],["Inezgane (Mun.)","RNI",12394,19,1,{"RNI":4232,"PAM":1878,"PI":1427,"USFP":1562,"MP":378,"UC":432,"PPS":1000,"PJD":1485}],["Lqliaa (Mun.)","PI",9621,18.4,1,{"RNI":1671,"PAM":1054,"PI":3446,"USFP":1501,"MP":163,"UC":59,"PPS":1101,"PJD":626}],["Oulad Dahou","RNI",5892,2.4,0,{"RNI":2274,"PAM":2131,"PI":1354,"USFP":97,"MP":27,"PJD":9}],["Temsia","PAM",7977,15.6,1,{"RNI":1855,"PAM":3360,"PI":2115,"USFP":526,"MP":97,"PPS":24}]],"Jerada":[["Ain Bni Mathar (Mun.)","PAM",5090,16.1,1,{"RNI":1307,"PAM":2124,"PI":386,"USFP":144,"MP":220,"UC":847,"PPS":57,"PJD":5}],["Bni Mathar","PAM",2295,14.5,0,{"RNI":618,"PAM":951,"PI":323,"USFP":4,"MP":95,"UC":263,"PPS":41}],["Gafait","PAM",1800,27.2,0,{"RNI":526,"PAM":1015,"PI":106,"MP":123,"UC":6,"PPS":24}],["Guenfouda","RNI",2925,13.2,0,{"RNI":1197,"PAM":526,"PI":812,"USFP":270,"MP":58,"PPS":62}],["Jerada (Mun.)","PPS",10761,46.6,1,{"RNI":1276,"PAM":1056,"PI":1114,"USFP":240,"MP":331,"UC":359,"PPS":6292,"PJD":93}],["Laaouinate","RNI",1977,12.6,0,{"RNI":944,"PAM":191,"PI":694,"USFP":12,"UC":62,"PPS":28,"PJD":46}],["Lebkhata","PAM",1535,3.6,0,{"RNI":448,"PAM":514,"PI":459,"MP":32,"UC":82}],["Mrija","PAM",2109,22.2,0,{"RNI":238,"PAM":897,"PI":428,"MP":380,"UC":166}],["Oulad Ghziyel","PI",3141,1.8,0,{"RNI":459,"PAM":1000,"PI":1055,"USFP":201,"UC":424,"PJD":2}],["Oulad Sidi Abdelhakem","PAM",1489,22.3,0,{"RNI":485,"PAM":817,"PI":78,"MP":65,"UC":44}],["Ras Asfour","PAM",724,14.2,0,{"RNI":310,"PAM":413,"PJD":1}],["Sidi Boubker","PI",919,2.3,0,{"RNI":337,"PAM":85,"PI":358,"USFP":39,"MP":80,"PJD":20}],["Tiouli","RNI",2249,43.8,0,{"RNI":1424,"PAM":440,"PI":325,"USFP":3,"MP":57}],["Touissit (Mun.)","RNI",1387,8.8,1,{"RNI":537,"PAM":220,"PI":415,"USFP":68,"MP":147}]],"Karia - Rhafsai":[["Bni Snous","RNI",3014,16,0,{"RNI":1470,"PAM":266,"PI":989,"USFP":123,"PPS":15,"PJD":151}],["Bouchabel","RNI",4013,30.8,0,{"RNI":2214,"PAM":441,"PI":253,"USFP":129,"PJD":976}],["El Bibane","PI",2560,3,0,{"RNI":26,"PAM":1225,"PI":1303,"USFP":6}],["Galaz","USFP",5410,33.1,0,{"RNI":784,"PAM":1099,"PI":398,"USFP":2892,"PPS":25,"PJD":212}],["Ghafsai (Mun.)","PI",2864,3.8,1,{"RNI":1028,"PAM":11,"PI":1138,"USFP":136,"PPS":551}],["Jbabra","RNI",4108,45.5,0,{"RNI":2743,"PAM":874,"PI":177,"USFP":122,"PPS":4,"PJD":188}],["Karia Ba Mohamed (Mun.)","RNI",5886,18.5,1,{"RNI":2760,"PAM":428,"PI":1672,"USFP":447,"PPS":39,"PJD":540}],["Kissane","PI",4208,34.6,0,{"RNI":1031,"PAM":144,"PI":2487,"USFP":416,"PPS":104,"PJD":26}],["Loulja","RNI",4202,32.3,0,{"RNI":2469,"PAM":45,"PI":493,"USFP":83,"PJD":1112}],["Mkansa","PAM",6379,53.8,0,{"RNI":831,"PAM":4322,"PI":893,"USFP":214,"PJD":119}],["Moulay Abdelkrim","RNI",2841,36.9,0,{"RNI":1647,"PAM":600,"PI":390,"USFP":36,"PJD":168}],["Moulay Bouchta","PAM",4913,12.2,0,{"RNI":850,"PAM":1878,"PI":811,"PPS":94,"PJD":1280}],["Ouartzagh","PAM",4420,0,0,{"RNI":794,"PAM":1374,"PI":1374,"USFP":440,"UC":20,"PJD":418}],["Oudka","PI",3166,17.8,0,{"RNI":1162,"PAM":168,"PI":1725,"USFP":69,"PPS":42}],["Ratba","PAM",6940,14.4,0,{"RNI":2116,"PAM":3118,"PI":953,"USFP":753}],["Rhouazi","RNI",4376,27.3,0,{"RNI":2362,"PAM":1169,"PI":479,"USFP":76,"PJD":290}],["Sidi El Abed","RNI",3385,38.3,0,{"RNI":2327,"PAM":1,"PI":1029,"PJD":28}],["Sidi Haj M'hamed","PI",3138,9.1,0,{"RNI":1008,"PAM":89,"PI":1295,"USFP":314,"PPS":432}],["Sidi Mokhfi","PAM",2616,27.7,0,{"RNI":572,"PAM":1296,"PI":558,"USFP":31,"PJD":159}],["Sidi YahyaBni Zeroual","PI",5349,14.1,0,{"RNI":1202,"PAM":518,"PI":2130,"USFP":123,"PPS":1376}],["Tabouda","RNI",5395,5.7,0,{"RNI":2216,"PAM":206,"PI":1910,"USFP":342,"PPS":721}],["Tafrant","PI",4873,37.8,0,{"RNI":1055,"PI":2898,"USFP":744,"PPS":163,"PJD":13}],["Timezgana","PAM",5371,38.8,0,{"RNI":1516,"PAM":3599,"PI":25,"USFP":176,"PPS":53,"PJD":2}]],"Khouribga":[["Ain Kaicher","PAM",914,85.3,0,{"RNI":57,"PAM":837,"USFP":14,"MP":6}],["Ait Ammar","RNI",843,1.4,0,{"RNI":238,"PAM":2,"PI":226,"MP":126,"UC":89,"PPS":162}],["Bejaad (Mun.)","PAM",11031,7.4,1,{"RNI":173,"PAM":3378,"PI":712,"USFP":2317,"MP":2562,"UC":519,"PPS":72,"PJD":1298}],["Bir Mezoui","PI",2451,24.6,0,{"RNI":310,"PAM":96,"PI":1273,"MP":671,"UC":16,"PPS":85}],["Bni Bataou","MP",2471,1.1,0,{"RNI":181,"PAM":1052,"PI":159,"USFP":1,"MP":1078}],["Bni Smir","USFP",1877,27.9,0,{"RNI":226,"PI":341,"USFP":865,"MP":328,"PPS":95,"PJD":22}],["Bni Ykhlef","PAM",4396,57.9,0,{"RNI":322,"PAM":3296,"PI":15,"USFP":749,"PPS":14}],["Bni Zrantel","USFP",2451,11.2,0,{"PAM":650,"PI":554,"USFP":924,"MP":323}],["Boujniba (Mun.)","PPS",5691,27,1,{"RNI":48,"PAM":1194,"PI":448,"USFP":23,"MP":212,"UC":744,"PPS":2731,"PJD":291}],["Boukhrisse","MP",2002,5.2,0,{"PAM":765,"PI":363,"USFP":3,"MP":870,"UC":1}],["Braksa","RNI",3089,19.9,0,{"RNI":1642,"PAM":255,"PI":70,"MP":1027,"PPS":75,"PJD":20}],["Bulanouare","PI",4835,2.6,1,{"RNI":1263,"PAM":462,"PI":1388,"USFP":280,"MP":145,"UC":112,"PPS":1144,"PJD":41}],["Chougrane","USFP",2551,11.4,0,{"PAM":433,"PI":127,"USFP":1068,"MP":777,"UC":146}],["El Foqra","RNI",1768,26.9,0,{"RNI":888,"PAM":235,"PI":221,"USFP":11,"PPS":413}],["Hattane (Mun.)","RNI",4230,18.5,1,{"RNI":1997,"PAM":448,"PI":224,"USFP":145,"MP":1215,"UC":126,"PPS":75}],["Kasbat Troch","PI",2592,33.5,0,{"RNI":478,"PAM":102,"PI":1347,"USFP":100,"MP":226,"UC":133,"PPS":191,"PJD":15}],["Khouribga (Mun.)","RNI",19418,4.8,1,{"RNI":5839,"PAM":1372,"PI":4905,"USFP":2382,"MP":1121,"UC":1293,"PPS":1068,"PJD":1438}],["Lagfaf","PPS",2842,21.3,0,{"RNI":466,"PAM":248,"PI":594,"UC":325,"PPS":1198,"PJD":11}],["Lagnadiz","PPS",1679,58.1,0,{"RNI":14,"PAM":104,"PI":18,"USFP":276,"UC":15,"PPS":1252}],["M'Fassis","RNI",2317,22.8,0,{"RNI":1187,"PAM":659,"PI":113,"USFP":7,"UC":323,"PPS":28}],["Maadna","PPS",2919,3.7,0,{"RNI":257,"PI":358,"USFP":796,"MP":480,"UC":68,"PPS":905,"PJD":55}],["Oued Zem (Mun.)","RNI",9293,4.9,1,{"RNI":1979,"PAM":466,"PI":1349,"USFP":848,"MP":1524,"UC":436,"PPS":1371,"PJD":1320}],["Oulad Abdoune","RNI",5191,23.3,0,{"RNI":2734,"PI":827,"USFP":36,"MP":1522,"UC":38,"PPS":14,"PJD":20}],["Oulad Aissa","USFP",1887,17.4,0,{"RNI":145,"PI":70,"USFP":862,"MP":275,"PPS":534,"PJD":1}],["Oulad Azzouz","MP",3670,13.1,0,{"RNI":870,"PAM":34,"USFP":495,"MP":1349,"UC":361,"PPS":561}],["Oulad Boughadi","RNI",2884,11.4,0,{"RNI":975,"PAM":452,"PI":124,"USFP":130,"MP":423,"UC":645,"PPS":126,"PJD":9}],["Oulad Fennane","PI",2518,11,0,{"RNI":142,"PAM":519,"PI":797,"USFP":118,"MP":51,"UC":53,"PPS":406,"PJD":432}],["Oulad Ftata","USFP",827,100,0,{"USFP":827}],["Oulad Gouaouch","PAM",1595,35.9,0,{"PAM":928,"USFP":355,"MP":200,"UC":112}],["Rouached","USFP",1656,23.6,0,{"PAM":511,"PI":244,"USFP":901}],["Tachraft","MP",1855,1,0,{"PAM":318,"USFP":751,"MP":769,"UC":17}]],"Khémisset - Oulmès":[["Ait Ichou","PAM",1037,34.9,0,{"RNI":223,"PAM":585,"PI":52,"MP":177}],["Ait Ikkou","MP",5113,11.4,0,{"RNI":706,"PAM":1746,"PI":225,"USFP":23,"MP":2329,"PPS":84}],["Ait Mimoune","RNI",2256,65.9,0,{"RNI":1775,"PAM":289,"PI":3,"MP":181,"PJD":8}],["Ait Ouribel","PAM",3507,17.6,0,{"RNI":390,"PAM":1668,"PI":93,"MP":1052,"PPS":304}],["Ait Siberne","MP",2318,11.9,0,{"RNI":217,"PAM":909,"PI":8,"MP":1184}],["Ait Yadine","RNI",5549,1.3,0,{"RNI":2381,"PAM":185,"PI":229,"MP":2310,"PPS":422,"PJD":22}],["Bouqachmir","PAM",1889,30.5,0,{"RNI":202,"PAM":1048,"PI":86,"MP":471,"UC":82}],["El Ganzra","MP",5503,0.5,0,{"RNI":2025,"PAM":128,"PI":37,"MP":2050,"UC":4,"PPS":1231,"PJD":28}],["Khémisset (Mun.)","RNI",8547,4.3,1,{"RNI":2100,"PAM":807,"PI":1256,"USFP":418,"MP":1730,"UC":992,"PPS":672,"PJD":572}],["Maaziz","PAM",2719,5.3,1,{"RNI":689,"PAM":922,"PI":245,"MP":778,"UC":57,"PPS":28}],["Majmaa Tolba","RNI",3354,33.8,0,{"RNI":1835,"PAM":81,"PI":36,"MP":702,"UC":10,"PPS":682,"PJD":8}],["Oulmes","PAM",8559,22.6,1,{"RNI":2619,"PAM":4553,"PI":621,"USFP":17,"MP":513,"UC":147,"PPS":83,"PJD":6}],["Sfassif","MP",2529,38.3,0,{"RNI":695,"PAM":79,"PI":91,"MP":1664}],["Sidi El Ghandour","RNI",2712,33.6,0,{"RNI":1518,"PAM":404,"PI":178,"MP":608,"PJD":4}],["Tiddas","MP",3895,12.9,0,{"RNI":526,"PAM":1381,"PI":53,"MP":1885,"UC":3,"PPS":47}]],"Khénifra":[["Aguelmam Azegza","MP",3162,30.5,0,{"RNI":680,"PAM":565,"PI":113,"USFP":48,"MP":1643,"UC":70,"PPS":43}],["Aguelmous","RNI",10576,28.7,0,{"RNI":6012,"PAM":814,"PI":600,"USFP":92,"MP":2981,"UC":74,"PPS":3}],["Ait Ishaq","USFP",7151,18.3,1,{"RNI":1351,"PAM":1569,"PI":43,"USFP":2876,"MP":1185,"UC":1,"PPS":15,"PJD":111}],["Ait Saadelli","PAM",1387,8.7,0,{"RNI":631,"PAM":751,"PI":5}],["El Borj","MP",2208,23.6,0,{"RNI":521,"PAM":280,"PI":365,"MP":1042}],["El Hammam","PI",4190,7.1,0,{"RNI":1295,"PAM":274,"PI":1593,"USFP":2,"MP":836,"UC":80,"PPS":106,"PJD":4}],["El Kbab","RNI",6423,27.7,1,{"RNI":3227,"PAM":1449,"PI":320,"USFP":1042,"MP":385}],["Had Bouhssoussen","MP",2829,19.8,0,{"RNI":983,"PAM":248,"PI":30,"USFP":26,"MP":1542}],["Kerrouchen","RNI",3312,18.2,0,{"RNI":1799,"PAM":1196,"MP":317}],["Khenifra (Mun.)","RNI",11131,8,1,{"RNI":3468,"PAM":1304,"PI":759,"USFP":952,"MP":2582,"UC":1231,"PPS":408,"PJD":427}],["Lehri","RNI",3760,6.8,0,{"RNI":1375,"PAM":194,"PI":1121,"MP":1054,"PPS":16}],["M'Rirt (Mun.)","RNI",9520,8.4,1,{"RNI":3272,"PAM":639,"PI":2469,"USFP":304,"MP":891,"UC":949,"PPS":763,"PJD":233}],["Moha Ou Hammou Zayani","RNI",3125,11.8,0,{"RNI":1434,"PAM":358,"PI":180,"USFP":3,"MP":1065,"UC":78,"PPS":7}],["Moulay Bouazza","MP",3674,22.3,1,{"RNI":1005,"PAM":295,"PI":377,"USFP":65,"MP":1825,"PPS":57,"PJD":50}],["Ouaoumana","RNI",3542,52.7,1,{"RNI":2452,"PAM":584,"PI":19,"USFP":3,"MP":476,"UC":8}],["Oum Rabia","PI",4449,18.8,0,{"RNI":973,"PAM":19,"PI":1925,"USFP":134,"MP":1088,"UC":139,"PPS":166,"PJD":5}],["Sebt Ait Rahou","MP",4155,16.4,0,{"RNI":1556,"PAM":92,"PI":269,"MP":2236,"PPS":2}],["Sidi Amar","RNI",1260,5.1,0,{"RNI":630,"PI":43,"MP":566,"UC":21}],["Sidi Hcine","RNI",1093,40.8,0,{"RNI":765,"PAM":9,"MP":319}],["Sidi Lamine","RNI",4249,52.6,0,{"RNI":2849,"PAM":250,"PI":342,"USFP":4,"MP":616,"UC":187,"PJD":1}],["Sidi Yahya Ou Saad","PI",3349,57.9,0,{"RNI":432,"PAM":135,"PI":2371,"USFP":15,"MP":396}],["Tighassaline","MP",6042,3.7,1,{"RNI":431,"PAM":774,"PI":2279,"USFP":51,"MP":2502,"UC":3,"PPS":2}]],"Kénitra":[["Ameur Seflia","UC",10947,16.8,0,{"RNI":4043,"PAM":69,"PI":394,"MP":222,"UC":5879,"PPS":65,"PJD":275}],["Ben Mansour","RNI",13451,36.3,0,{"RNI":7491,"PAM":15,"PI":2603,"USFP":575,"MP":2157,"UC":125,"PPS":123,"PJD":362}],["Haddada","RNI",6332,1.9,0,{"RNI":1590,"PAM":155,"PI":721,"USFP":1470,"MP":12,"UC":1318,"PPS":525,"PJD":541}],["Kénitra (Mun.)","RNI",32454,18,1,{"RNI":11432,"PAM":5387,"PI":3235,"USFP":1530,"MP":1770,"UC":2286,"PPS":1212,"PJD":5602}],["Mehdya (Mun.)","RNI",6579,34,1,{"RNI":3700,"PAM":79,"PI":827,"USFP":17,"MP":4,"UC":1460,"PPS":82,"PJD":410}],["Mnasra","PI",12354,2.7,0,{"RNI":5321,"PAM":177,"PI":5650,"MP":305,"UC":357,"PPS":285,"PJD":259}],["Mograne","RNI",11059,20,0,{"RNI":5187,"PAM":598,"PI":296,"USFP":423,"MP":270,"UC":2976,"PPS":771,"PJD":538}],["Ouled Slama","RNI",7703,6.8,0,{"RNI":2777,"PAM":652,"PI":1418,"USFP":420,"MP":86,"UC":2250,"PJD":100}],["Sidi Mohamed Ben Mansour","RNI",7599,21.6,0,{"RNI":3176,"PAM":228,"PI":412,"USFP":929,"MP":1533,"UC":119,"PPS":403,"PJD":799}],["Sidi Taibi","RNI",8216,7.9,1,{"RNI":1965,"PAM":701,"PI":1216,"USFP":547,"MP":830,"UC":1041,"PPS":596,"PJD":1320}]],"Larache":[["Ayacha","PI",2826,31.4,0,{"RNI":7,"PAM":35,"PI":1785,"USFP":101,"UC":898}],["Bni Arouss","PI",2584,56.6,0,{"RNI":280,"PAM":49,"PI":1858,"USFP":1,"PJD":396}],["Bni Garfett","UC",3501,7.9,0,{"RNI":855,"PAM":98,"PI":907,"USFP":442,"UC":1184,"PJD":15}],["Bou Jedyane","RNI",3771,14.7,0,{"RNI":1781,"PAM":403,"PI":1226,"USFP":288,"MP":13,"UC":60}],["Ksar Bjir","RNI",4459,47.1,0,{"RNI":2838,"PAM":736,"PI":622,"USFP":41,"UC":85,"PJD":137}],["Ksar El Kebir (Mun.)","RNI",13455,45.7,1,{"RNI":7651,"PAM":1179,"PI":1504,"USFP":676,"MP":495,"UC":627,"PPS":302,"PJD":1021}],["Laouamra","RNI",9604,17,0,{"RNI":3855,"PAM":1953,"PI":2227,"USFP":416,"MP":486,"UC":149,"PPS":14,"PJD":504}],["Larache (Mun.)","PI",11577,0.9,1,{"RNI":2865,"PAM":1209,"PI":2965,"USFP":1501,"MP":1068,"UC":460,"PPS":225,"PJD":1284}],["Oulad Ouchih","UC",4467,0,0,{"RNI":1806,"PAM":180,"PI":353,"USFP":11,"MP":309,"UC":1808}],["Rissana Chamalia","UC",3377,24.6,0,{"RNI":235,"PAM":265,"PI":763,"USFP":379,"MP":65,"UC":1595,"PPS":22,"PJD":53}],["Rissana Janoubia","PI",5411,0.2,0,{"RNI":60,"PAM":523,"PI":2384,"USFP":72,"UC":2372}],["Sahel","PAM",6904,28,0,{"PAM":3728,"PI":1190,"USFP":141,"MP":52,"UC":1792,"PPS":1}],["Souaken","UC",5180,0.3,0,{"RNI":2221,"PAM":127,"PI":312,"USFP":104,"MP":6,"UC":2239,"PPS":6,"PJD":165}],["Souk L'Qolla","RNI",4629,47.1,0,{"RNI":3169,"PAM":126,"PI":991,"USFP":129,"UC":214}],["Souk Tolba","RNI",5403,3.2,0,{"RNI":1835,"PAM":1664,"PI":181,"USFP":11,"MP":69,"UC":1614,"PJD":29}],["Tatoft","RNI",2925,19.8,0,{"RNI":1537,"PI":957,"USFP":310,"UC":121}],["Tazroute","PAM",1972,46.9,0,{"PAM":1448,"PI":524}],["Zaaroura","PI",2675,21.9,0,{"RNI":973,"PI":1558,"UC":144}],["Zouada","UC",7334,10.2,0,{"RNI":2084,"PAM":518,"PI":1744,"USFP":86,"MP":70,"UC":2832}]],"Laâyoune":[["Boukraa","PI",3169,15.4,0,{"RNI":1167,"PAM":43,"PI":1655,"USFP":217,"UC":81,"PPS":6}],["Dcheira","PI",3066,29,0,{"RNI":1053,"PI":1943,"MP":70}],["El Marsa (Mun.)","PI",9558,56.2,1,{"RNI":1147,"PAM":290,"PI":6639,"USFP":1271,"MP":85,"UC":112,"PPS":10,"PJD":4}],["Foum El Oued","RNI",1369,15.4,0,{"RNI":759,"PAM":48,"PI":548,"MP":14}],["Laayoune (Mun.)","PI",60420,32.6,1,{"RNI":3499,"PAM":15398,"PI":35076,"USFP":2723,"MP":1283,"UC":1226,"PPS":599,"PJD":616}]],"M'Diq - Fnideq":[["Allyene","PAM",2802,28.6,0,{"RNI":867,"PAM":1667,"PI":39,"USFP":175,"UC":4,"PPS":46,"PJD":4}],["Belyounech","PAM",1359,57.3,0,{"PAM":1047,"PI":16,"USFP":268,"UC":20,"PJD":8}],["Fnideq (Mun.)","PAM",8045,20.3,1,{"RNI":1165,"PAM":2801,"PI":669,"USFP":735,"MP":309,"UC":679,"PPS":890,"PJD":797}],["M'Diq (Mun.)","USFP",7627,9.4,1,{"RNI":1451,"PAM":957,"PI":933,"USFP":2167,"MP":245,"UC":1235,"PPS":276,"PJD":363}],["Martil (Mun.)","PAM",9786,4,1,{"RNI":645,"PAM":2304,"PI":626,"USFP":1264,"MP":1807,"UC":874,"PPS":1908,"PJD":358}]],"Meknès":[["Ain Jemaa","RNI",5022,23.3,0,{"RNI":2702,"PAM":754,"PI":1531,"USFP":2,"MP":33}],["Ain Karma- Oued Rommane","PI",4378,1.4,0,{"RNI":1437,"PAM":287,"PI":1499,"USFP":10,"MP":839,"UC":259,"PPS":47}],["Ain Orma","RNI",1713,20.1,0,{"RNI":817,"PAM":38,"PI":472,"USFP":34,"MP":350,"PPS":2}],["Ait Ouallal","UC",2495,39.9,0,{"RNI":1,"PAM":125,"PI":646,"USFP":6,"MP":62,"UC":1642,"PPS":13}],["Al Machouar - Stinia (Mun.)","UC",1557,24.4,1,{"RNI":459,"PAM":25,"PI":98,"UC":839,"PPS":136}],["Boufakrane (Mun.)","PI",4214,6.5,1,{"RNI":1218,"PAM":67,"PI":1493,"USFP":55,"MP":868,"UC":58,"PPS":51,"PJD":404}],["Charqaoua","USFP",1537,8.7,0,{"RNI":134,"PAM":406,"PI":252,"USFP":540,"MP":160,"PJD":45}],["Dar Oum Soltane","RNI",2541,3.4,0,{"RNI":1218,"PAM":127,"PI":1131,"MP":4,"UC":61}],["Dkhissa","MP",7036,6.5,1,{"RNI":1772,"PAM":367,"PI":1962,"USFP":80,"MP":2420,"PPS":182,"PJD":253}],["M'haya","MP",6519,58.8,0,{"RNI":388,"PAM":25,"PI":1133,"USFP":4,"MP":4968,"PPS":1}],["Majjate","RNI",3976,27,0,{"RNI":2052,"PAM":342,"PI":980,"USFP":135,"MP":350,"UC":106,"PPS":11}],["Meknès (Mun.)","RNI",37616,0.7,1,{"RNI":9005,"PAM":4304,"PI":4710,"USFP":1733,"MP":2931,"UC":8741,"PPS":1046,"PJD":5146}],["Moulay Driss Zerhoun (Mun.)","PI",2670,10.4,1,{"RNI":1008,"PAM":206,"PI":1285,"MP":82,"PPS":74,"PJD":15}],["MRhassiyine","MP",2810,59.3,0,{"RNI":24,"PAM":123,"PI":475,"USFP":46,"MP":2142}],["N'zalat Bni Amar","RNI",2035,17.5,0,{"RNI":984,"PAM":236,"PI":15,"USFP":162,"MP":628,"UC":10}],["Oualili","PI",2948,27.7,0,{"RNI":887,"PAM":193,"PI":1704,"USFP":3,"MP":142,"UC":19}],["Oued Jdida","MP",4969,14,0,{"RNI":406,"PAM":515,"PI":1641,"MP":2336,"UC":28,"PPS":1,"PJD":42}],["Ouislane (Mun.)","PI",7844,8.8,1,{"RNI":1501,"PAM":990,"PI":2191,"USFP":268,"MP":632,"UC":797,"PPS":695,"PJD":770}],["Sidi Abdallah Al Khayat","MP",3081,52.7,0,{"RNI":238,"PAM":426,"PI":96,"USFP":4,"MP":2051,"UC":15,"PPS":174,"PJD":77}],["Sidi Slimane Moul Al Kifane","PI",6451,52.8,0,{"RNI":728,"PAM":719,"PI":4137,"USFP":105,"MP":442,"UC":172,"PPS":108,"PJD":40}],["Toulal (Mun.)","PI",4708,17.8,1,{"RNI":1136,"PAM":468,"PI":1973,"USFP":590,"MP":368,"PJD":173}]],"Midelt":[["Aghbalou","RNI",4383,23.2,0,{"RNI":2273,"PAM":62,"PI":1256,"MP":545,"PPS":247}],["Agoudim","PI",1921,3.5,0,{"RNI":748,"PAM":73,"PI":815,"USFP":33,"MP":241,"PJD":11}],["Ait Ayach","RNI",4023,15.9,0,{"RNI":1997,"PAM":14,"PI":1356,"USFP":141,"MP":377,"PPS":138}],["Ait Ben Yacoub","RNI",1962,40.5,0,{"RNI":1350,"PI":7,"USFP":50,"MP":555}],["Ait Izdeg","RNI",2233,28.6,0,{"RNI":1232,"PI":408,"MP":593}],["Ait Yahya","RNI",1482,16,0,{"RNI":663,"PI":426,"USFP":116,"MP":277}],["Amersid","RNI",2310,11.1,0,{"RNI":1018,"PAM":110,"PI":761,"MP":408,"UC":13}],["Amouguer","RNI",1746,8.4,0,{"RNI":880,"PI":734,"USFP":9,"MP":123}],["Anemzi","RNI",1942,4.8,0,{"RNI":691,"PAM":12,"PI":597,"USFP":137,"MP":505}],["Bou Azmou","RNI",2383,11.4,0,{"RNI":1057,"PI":373,"USFP":44,"MP":786,"UC":55,"PPS":68}],["Boumia","MP",6689,1.8,1,{"RNI":2428,"PAM":294,"PI":1245,"USFP":130,"MP":2547,"UC":4,"PPS":41}],["En-nzala","PI",1591,8.2,0,{"RNI":481,"PAM":47,"PI":612,"USFP":4,"MP":437,"UC":3,"PPS":7}],["Er-rich (Mun.)","PI",5952,3.3,1,{"RNI":1058,"PAM":122,"PI":1546,"USFP":235,"MP":1350,"UC":666,"PPS":909,"PJD":66}],["Gourrama","PI",4107,6.2,0,{"RNI":1234,"PAM":200,"PI":1487,"USFP":240,"MP":787,"UC":9,"PPS":150}],["Guers Tiaallaline","MP",2780,11.2,0,{"RNI":664,"PAM":329,"PI":519,"USFP":87,"MP":976,"UC":158,"PPS":47}],["Guir","PI",2001,7.8,0,{"RNI":766,"PAM":154,"PI":922,"USFP":12,"MP":106,"PPS":41}],["Imilchil","MP",3177,21.5,0,{"RNI":871,"PI":499,"USFP":254,"MP":1553}],["Itzer","RNI",3849,35,1,{"RNI":2138,"PAM":117,"PI":518,"USFP":252,"MP":792,"PPS":32}],["M'Zizel","RNI",2174,2.2,0,{"RNI":583,"PAM":66,"PI":447,"USFP":210,"MP":536,"UC":92,"PPS":240}],["Mibladen","RNI",1469,1.5,0,{"RNI":406,"PAM":109,"PI":384,"USFP":183,"MP":383,"PJD":4}],["Midelt (Mun.)","PI",7437,31.2,1,{"RNI":1470,"PAM":359,"PI":3789,"USFP":266,"MP":686,"PPS":485,"PJD":382}],["Outerbat","MP",1911,15,0,{"RNI":519,"PAM":33,"PI":414,"USFP":109,"MP":805,"UC":31}],["Sidi Aayad","RNI",2532,2.4,0,{"RNI":851,"PAM":171,"PI":602,"USFP":9,"MP":790,"UC":1,"PPS":108}],["Sidi Yahya Ou Youssef","MP",2014,18,0,{"RNI":75,"PAM":569,"PI":402,"USFP":36,"MP":932}],["Tanourdi","RNI",1491,28.4,0,{"RNI":847,"PI":65,"USFP":4,"MP":423,"UC":152}],["Tizi N'Ghachou","RNI",1421,46.9,0,{"RNI":951,"PAM":64,"PI":121,"MP":285}],["Tounfite","PI",4508,1.4,1,{"RNI":1507,"PAM":35,"PI":1572,"USFP":58,"MP":1324,"PPS":12}],["Zaida","RNI",3749,14,1,{"RNI":1781,"PAM":35,"PI":395,"USFP":202,"MP":1257,"PJD":79}],["Zaouiat Sidi Hamza","RNI",2092,5.9,0,{"RNI":989,"PAM":7,"PI":866,"USFP":75,"MP":130,"PPS":25}]],"Mohammadia":[["Ain Harrouda (Mun.)","RNI",9096,7.5,1,{"RNI":2610,"PAM":1693,"PI":1932,"USFP":1126,"MP":343,"UC":599,"PPS":353,"PJD":440}],["Bni Yakhlef","RNI",11358,1.7,0,{"RNI":4355,"PAM":1100,"PI":4157,"USFP":284,"UC":625,"PPS":67,"PJD":770}],["Ech-challalate","PI",9542,11.3,0,{"RNI":2878,"PAM":782,"PI":3957,"USFP":288,"MP":189,"UC":848,"PPS":382,"PJD":218}],["Mohammadia (Mun.)","RNI",17978,32.4,1,{"RNI":9238,"PAM":3417,"PI":1802,"USFP":1483,"MP":330,"UC":670,"PJD":1038}],["Sidi Moussa Ben Ali","USFP",4306,7.5,0,{"RNI":1349,"PAM":73,"PI":1102,"USFP":1673,"MP":73,"UC":23,"PJD":13}],["Sidi Moussa Majdoub","RNI",7557,19.6,0,{"RNI":3427,"PAM":1664,"PI":1949,"USFP":132,"MP":143,"UC":44,"PPS":177,"PJD":21}]],"Moulay-Rachid":[["Moulay Rachid (Arrond.)","RNI",13935,13.4,1,{"RNI":4253,"PAM":1945,"PI":2382,"USFP":305,"MP":1148,"UC":334,"PPS":2054,"PJD":1514}],["Sidi Othmane (Arrond.)","RNI",18876,37.3,1,{"RNI":9487,"PAM":1298,"PI":2437,"USFP":562,"MP":441,"UC":882,"PPS":2113,"PJD":1656}]],"Moulay-Yacoub":[["Ain Bou Ali","PAM",3950,6.9,0,{"RNI":1465,"PAM":1739,"PI":332,"MP":404,"PJD":10}],["Ain Chkef","PAM",10781,7.6,0,{"RNI":1330,"PAM":3636,"PI":1227,"USFP":187,"MP":2822,"UC":550,"PPS":323,"PJD":706}],["Ain Kansra","PI",4861,46.7,0,{"RNI":701,"PAM":774,"PI":3046,"USFP":15,"MP":325}],["Laajajra","RNI",4897,14,0,{"RNI":2314,"PAM":1629,"PI":375,"USFP":176,"MP":316,"PJD":87}],["Louadaine","PI",4422,18.2,0,{"RNI":1622,"PAM":371,"PI":2429}],["Mikkes","MP",2755,50.5,0,{"RNI":633,"PAM":98,"MP":2024}],["Moulay Yacoub (Mun.)","PAM",1958,5.5,1,{"RNI":13,"PAM":845,"PI":16,"USFP":347,"MP":737}],["Oulad Mimoun","PI",3289,3.8,0,{"RNI":902,"PAM":886,"PI":1026,"USFP":120,"MP":353,"PJD":2}],["Sebaa Rouadi","PAM",9182,29.2,0,{"RNI":2429,"PAM":5114,"PI":907,"MP":732}],["Sebt Loudaya","MP",4213,11.6,0,{"RNI":1003,"PAM":1005,"PI":673,"USFP":1,"MP":1492,"UC":24,"PPS":1,"PJD":14}],["Sidi Daoud","RNI",4785,7.5,0,{"RNI":2397,"PAM":2036,"PI":214,"USFP":3,"MP":130,"PPS":3,"PJD":2}]],"Médina - Sidi-Youssef-Ben-Ali":[["Marrakech-Médina (Arrond.)","PAM",13914,25.3,1,{"RNI":2781,"PAM":6303,"PI":1750,"USFP":904,"MP":599,"UC":630,"PPS":209,"PJD":738}],["Méchouar-Kasba (Mun.)","PAM",4357,11.3,1,{"RNI":1659,"PAM":2151,"PI":198,"USFP":8,"MP":243,"UC":2,"PPS":67,"PJD":29}],["Sidi Youssef Ben Ali (Arrond.)","PAM",13144,13.8,1,{"RNI":2103,"PAM":4189,"PI":1844,"USFP":1075,"MP":528,"UC":2379,"PPS":372,"PJD":654}],["Tassoultante","PI",14259,32,0,{"RNI":1776,"PAM":3043,"PI":7603,"USFP":888,"MP":262,"UC":292,"PPS":156,"PJD":239}]],"Médiouna":[["Al Majjatia Oulad Taleb","PI",10680,20.9,0,{"RNI":3557,"PAM":1195,"PI":5787,"USFP":17,"UC":110,"PJD":14}],["Lahraouyine (Mun.)","RNI",7111,19.6,1,{"RNI":2818,"PAM":1424,"PI":1131,"USFP":403,"MP":272,"UC":329,"PPS":398,"PJD":336}],["Mediouna (Mun.)","PAM",7050,9,1,{"RNI":2027,"PAM":2765,"PI":2133,"USFP":19,"PPS":70,"PJD":36}],["Sidi Hajjaj Oued Hassar","PAM",8518,20.2,0,{"RNI":1016,"PAM":4336,"PI":2612,"USFP":479,"UC":1,"PPS":74}],["Tit Mellil (Mun.)","PAM",7698,19.6,1,{"RNI":1902,"PAM":3409,"PI":1683,"USFP":209,"UC":88,"PPS":397,"PJD":10}]],"Ménara":[["Agafay","PAM",5907,43.1,0,{"RNI":881,"PAM":3429,"PI":648,"USFP":9,"MP":160,"UC":724,"PJD":56}],["Ait Imour","PAM",5885,9.2,0,{"RNI":1831,"PAM":2375,"PI":170,"USFP":6,"UC":1466,"PJD":37}],["Loudaya","PAM",10074,3.9,0,{"RNI":1611,"PAM":3015,"PI":2565,"USFP":15,"UC":242,"PJD":2626}],["Ménara (Arrond.)","RNI",25158,4,1,{"RNI":8212,"PAM":7198,"PI":2850,"USFP":871,"MP":813,"UC":1508,"PPS":292,"PJD":3414}],["Saada","RNI",8861,6.3,0,{"RNI":2180,"PAM":1619,"PI":1240,"USFP":767,"MP":603,"UC":712,"PPS":850,"PJD":890}],["Sid Zouine","PAM",4923,8.1,1,{"RNI":1131,"PAM":1688,"PI":1289,"USFP":382,"UC":277,"PJD":156}],["Souihla","PI",9675,37.2,0,{"RNI":1905,"PAM":1734,"PI":5502,"USFP":2,"UC":363,"PJD":169}]],"Nador":[["Afsou","PAM",668,18.3,0,{"RNI":116,"PAM":325,"UC":24,"PPS":203}],["Al Aaroui (Mun.)","RNI",9150,14.5,1,{"RNI":3518,"PAM":1869,"PI":729,"USFP":285,"MP":29,"UC":196,"PPS":2191,"PJD":333}],["Al Barkanyene","PI",1056,6.7,0,{"RNI":171,"PAM":160,"PI":398,"USFP":327}],["Arekmane","RNI",5511,36.5,0,{"RNI":3263,"PAM":1251,"PI":196,"USFP":81,"MP":367,"UC":143,"PJD":210}],["Bni Ansar (Mun.)","RNI",6671,11,1,{"RNI":2169,"PAM":456,"PI":867,"USFP":1437,"MP":698,"UC":179,"PPS":410,"PJD":455}],["Bni Bouifrour","USFP",1968,13.6,0,{"RNI":496,"PAM":354,"PI":290,"USFP":763,"UC":65}],["Bni Chiker","USFP",6713,1.3,0,{"RNI":1706,"PAM":1229,"PI":1050,"USFP":1790,"MP":158,"UC":120,"PPS":193,"PJD":467}],["Bni Oukil Oulad M'Hand","PAM",3557,26.1,0,{"RNI":912,"PAM":1842,"PI":83,"USFP":249,"UC":42,"PPS":429}],["Bni Sidel Jbel","RNI",2812,24.2,0,{"RNI":1324,"PAM":644,"PI":69,"USFP":574,"MP":50,"UC":7,"PJD":144}],["Bni Sidel Louta","RNI",2542,12.9,0,{"RNI":1430,"PAM":9,"PI":1103}],["Bouarg","RNI",7731,19.5,0,{"RNI":3291,"PAM":1783,"PI":802,"USFP":943,"MP":7,"UC":156,"PPS":18,"PJD":731}],["Hassi Berkane","PAM",3138,4.4,0,{"RNI":1313,"PAM":1450,"USFP":18,"UC":6,"PPS":36,"PJD":315}],["Iaazzanene","USFP",3485,25.3,0,{"RNI":127,"PAM":1239,"USFP":2119}],["Ihaddadene","RNI",3050,20.3,1,{"RNI":1533,"PAM":913,"PI":57,"USFP":112,"MP":2,"PPS":7,"PJD":426}],["Iksane","RNI",2633,37.2,0,{"RNI":1540,"PAM":560,"PI":50,"USFP":400,"UC":83}],["Nador (Mun.)","RNI",14469,5.8,1,{"RNI":4043,"PAM":2753,"PI":447,"USFP":3199,"MP":785,"PPS":2833,"PJD":409}],["Oulad Daoud Zkhanine","PAM",1215,43.7,0,{"RNI":80,"PAM":768,"PI":237,"USFP":47,"PPS":83}],["Oulad Settout","PI",5707,38,0,{"RNI":1158,"PAM":556,"PI":3328,"USFP":496,"MP":78,"UC":91}],["Ras El Ma (Mun.)","PI",4006,17.8,1,{"RNI":786,"PAM":227,"PI":1685,"USFP":971,"MP":291,"UC":46}],["Selouane (Mun.)","PAM",6707,20.5,1,{"RNI":1281,"PAM":2984,"PI":105,"USFP":1611,"MP":336,"UC":347,"PPS":43}],["Tiztoutine","PAM",3268,29.3,0,{"RNI":880,"PAM":1837,"PI":27,"USFP":158,"UC":239,"PPS":127}],["Zaio (Mun.)","PI",8074,23.4,1,{"RNI":2017,"PAM":113,"PI":3910,"USFP":1711,"UC":114,"PPS":62,"PJD":147}],["Zeghanghane (Mun.)","RNI",7779,33.3,1,{"RNI":4099,"PAM":781,"PI":747,"USFP":1507,"MP":361,"UC":165,"PJD":119}]],"Nouaceur":[["Bouskoura (Mun.)","PI",11821,6.9,1,{"RNI":2017,"PAM":2967,"PI":3780,"USFP":1484,"MP":656,"UC":303,"PPS":141,"PJD":473}],["Dar Bouazza (Mun.)","PI",11892,0.3,1,{"RNI":3190,"PAM":2822,"PI":3222,"USFP":404,"MP":422,"UC":893,"PPS":432,"PJD":507}],["Nouaceur (Mun.)","RNI",8515,33.6,1,{"RNI":4608,"PAM":1744,"PI":1265,"USFP":126,"MP":316,"UC":140,"PPS":42,"PJD":274}],["Oulad Azzouz","RNI",12665,7.5,0,{"RNI":5784,"PAM":4835,"PI":678,"USFP":871,"UC":357,"PPS":76,"PJD":64}],["Oulad Salah","RNI",7756,58.1,0,{"RNI":5287,"PAM":719,"PI":784,"USFP":328,"MP":277,"UC":345,"PJD":16}]],"Ouarzazate":[["Ait Zineb","MP",3222,18.4,0,{"RNI":921,"PAM":414,"PI":163,"USFP":17,"MP":1514,"PPS":85,"PJD":108}],["Amerzgane","RNI",3417,25.3,0,{"RNI":2007,"PAM":1142,"PI":1,"MP":63,"PPS":8,"PJD":196}],["Ghassate","MP",2881,24.9,0,{"RNI":679,"PAM":480,"PI":245,"MP":1397,"PPS":80}],["Idelsane","PPS",3278,2,0,{"RNI":416,"PAM":181,"PI":579,"USFP":23,"MP":961,"PPS":1028,"PJD":90}],["Ighrem N'Ougdal","RNI",3586,43.6,0,{"RNI":2163,"PAM":437,"PI":48,"MP":329,"PPS":600,"PJD":9}],["Imi N'Oulaoune","MP",5758,39.8,0,{"RNI":1532,"PAM":19,"PI":257,"MP":3824,"PPS":126}],["Iznaguen","MP",3451,24.1,0,{"RNI":657,"PAM":874,"PI":81,"MP":1706,"PPS":133}],["Khouzama","RNI",2440,33.2,0,{"RNI":1434,"PAM":229,"PI":146,"MP":625,"PPS":6}],["Ouarzazate (Mun.)","RNI",9156,11.3,1,{"RNI":2882,"PAM":800,"PI":472,"USFP":507,"MP":1713,"UC":431,"PPS":1850,"PJD":501}],["Ouisselsate","RNI",5459,9.7,0,{"RNI":2072,"PAM":1545,"PI":119,"MP":1107,"PPS":616}],["Siroua","RNI",4759,6.2,0,{"RNI":1850,"PAM":1326,"PI":3,"MP":1557,"PPS":23}],["Skoura Ahl El Oust","MP",6093,44.2,0,{"RNI":1028,"PAM":644,"PI":317,"USFP":161,"MP":3724,"PPS":88,"PJD":131}],["Tarmigt","RNI",9807,9.7,1,{"RNI":4448,"PAM":1138,"PI":3494,"USFP":83,"MP":398,"PPS":245,"PJD":1}],["Taznakht (Mun.)","PAM",3096,4,1,{"RNI":854,"PAM":978,"PI":114,"MP":543,"PPS":606,"PJD":1}],["Telouet","MP",5097,12.1,0,{"RNI":2198,"PAM":30,"PI":40,"MP":2815,"PPS":14}],["Tidli","RNI",5563,45.5,0,{"RNI":3931,"PAM":1399,"PI":193,"PPS":40}],["Toundoute","PAM",3166,44.3,0,{"RNI":573,"PAM":1974,"PI":203,"MP":282,"PPS":102,"PJD":32}]],"Oued-Ed-Dahab":[["Bir Anzarane","PI",799,33.5,0,{"RNI":265,"PAM":1,"PI":533}],["Dakhla (Mun.)","PI",18384,22.2,1,{"RNI":3402,"PAM":1487,"PI":7486,"USFP":170,"MP":3260,"UC":803,"PPS":1437,"PJD":339}],["El Argoub","PI",1328,2.2,0,{"RNI":607,"PAM":67,"PI":636,"USFP":16,"UC":2}],["Gleibat El Foula","PI",673,12.8,0,{"RNI":101,"PI":329,"MP":243}],["Imlili","PI",823,4.1,0,{"RNI":384,"PAM":2,"PI":418,"PPS":19}],["Mijik","PI",584,4.8,1,{"RNI":81,"PI":262,"MP":234,"PJD":7}],["Oum Dreyga","RNI",584,57.9,0,{"RNI":446,"PI":108,"MP":29,"PPS":1}]],"Ouezzane":[["Ain Beida","PI",4626,46.8,0,{"RNI":817,"PI":2983,"USFP":446,"PPS":34,"PJD":346}],["Asjen","PI",4874,19.2,0,{"RNI":1111,"PAM":1150,"PI":2084,"USFP":107,"PJD":422}],["Bni Quolla","PAM",6137,9.2,0,{"RNI":1473,"PAM":2037,"PI":766,"USFP":1055,"MP":79,"PJD":727}],["Brikcha","PI",3729,59.1,0,{"RNI":444,"PI":2648,"USFP":352,"MP":23,"PPS":135,"PJD":127}],["Kalaat Bouqorra","RNI",5938,30.9,0,{"RNI":3535,"PAM":1701,"PI":325,"USFP":322,"PPS":19,"PJD":36}],["Lamjaara","PAM",5959,30.8,0,{"RNI":1523,"PAM":3361,"PI":346,"USFP":636,"PJD":93}],["Masmouda","USFP",6545,4.6,0,{"RNI":446,"PAM":2018,"PI":1626,"USFP":2317,"MP":85,"PPS":5,"PJD":48}],["Moqrisset","PAM",3938,16.9,0,{"RNI":581,"PAM":1581,"PI":916,"USFP":842,"PPS":18}],["Mzefroune","PAM",2981,17.6,0,{"RNI":805,"PAM":1331,"PI":14,"USFP":582,"PJD":249}],["Ouezzane (Mun.)","RNI",9568,13.2,1,{"RNI":2920,"PAM":1653,"PI":772,"USFP":1511,"MP":746,"PPS":395,"PJD":1571}],["Ounnana","PAM",4214,10,0,{"RNI":1544,"PAM":1966,"PI":95,"USFP":609}],["Sidi Ahmed Cherif","PAM",3008,31.8,0,{"RNI":789,"PAM":1747,"PI":62,"USFP":336,"PJD":74}],["Sidi Bousber","PAM",3717,7.3,0,{"RNI":1443,"PAM":1714,"PI":109,"USFP":370,"MP":2,"PPS":8,"PJD":71}],["Sidi Redouane","PI",8378,2.2,0,{"RNI":2369,"PAM":1563,"PI":2551,"USFP":746,"MP":19,"PJD":1130}],["Teroual","RNI",4237,6,0,{"RNI":1985,"PAM":1729,"PI":191,"USFP":289,"MP":34,"PJD":9}],["Zghira","PAM",4865,15.6,0,{"RNI":1373,"PAM":2131,"PI":190,"USFP":942,"MP":64,"PJD":165}],["Zoumi","RNI",12560,45.5,0,{"RNI":7557,"PAM":1848,"PI":1670,"USFP":1093,"MP":48,"PJD":344}]],"Oujda - Angad":[["Ahl Angad","RNI",4369,42.9,0,{"RNI":2897,"PAM":1021,"PI":397,"PJD":54}],["Ain Sfa","PAM",1959,58.1,0,{"RNI":342,"PAM":1480,"PI":69,"USFP":62,"PJD":6}],["Bni Drar (Mun.)","PAM",4402,9.9,1,{"RNI":1827,"PAM":2261,"PI":204,"USFP":106,"PJD":4}],["Bni Khaled","RNI",2774,9.3,0,{"RNI":1460,"PAM":1201,"PI":38,"USFP":1,"UC":74}],["Bsara","PAM",883,19,0,{"RNI":351,"PAM":519,"PI":13}],["Isly","PAM",2362,13.7,0,{"RNI":884,"PAM":1207,"PI":162,"USFP":109}],["Mestferki","PAM",1594,37.3,0,{"RNI":494,"PAM":1088,"PI":12}],["Naima (Mun.)","PAM",731,54.9,1,{"RNI":27,"PAM":536,"USFP":135,"PPS":33}],["Oujda (Mun.)","PAM",30786,3.8,1,{"RNI":9293,"PAM":10467,"PI":3882,"USFP":2475,"MP":677,"UC":787,"PPS":557,"PJD":2648}],["Sidi Boulenouar","PAM",1448,36.8,0,{"RNI":283,"PAM":849,"PI":316}],["Sidi Moussa Lemhaya","RNI",2256,5.3,0,{"RNI":1126,"PAM":1006,"PI":98,"USFP":12,"UC":14}]],"Rabat - Challah":[["El Youssoufia (Arrond.)","RNI",23452,4.2,1,{"RNI":6205,"PAM":5221,"PI":3131,"USFP":4680,"MP":1555,"UC":466,"PPS":339,"PJD":1855}],["Hassan (Arrond.)","RNI",16903,17.4,1,{"RNI":5896,"PAM":2959,"PI":2773,"USFP":831,"MP":1701,"UC":735,"PPS":683,"PJD":1325}],["Souissi (Arrond.)","RNI",4956,20.6,1,{"RNI":1998,"PAM":975,"PI":764,"USFP":469,"MP":218,"UC":187,"PPS":147,"PJD":198}]],"Rabat - El Mouhit":[["Agdal Riyad (Arrond.)","RNI",9330,23.1,1,{"RNI":3492,"PAM":974,"PI":1339,"USFP":802,"MP":1091,"UC":95,"PPS":361,"PJD":1176}],["Yacoub El Mansour (Arrond.)","RNI",22762,17.3,1,{"RNI":8402,"PAM":4456,"PI":2137,"USFP":1190,"MP":2685,"UC":706,"PPS":1221,"PJD":1965}]],"Rehamna":[["Ait Hammou","RNI",2790,20.1,0,{"RNI":1526,"PAM":117,"PI":966,"USFP":28,"UC":147,"PJD":6}],["Ait Taleb","PI",3063,14.2,0,{"RNI":1075,"PAM":273,"PI":1509,"MP":1,"UC":185,"PJD":20}],["Akarma","PAM",1844,2,0,{"RNI":373,"PAM":713,"PI":82,"UC":676}],["Ben Guerir (Mun.)","RNI",6004,3.2,1,{"RNI":1864,"PAM":1673,"PI":659,"USFP":449,"UC":551,"PPS":376,"PJD":432}],["Bouchane","PAM",3724,9.4,0,{"RNI":1477,"PAM":1828,"PI":100,"USFP":2,"MP":4,"UC":13,"PJD":300}],["Bourrous","PAM",2124,14.1,0,{"RNI":872,"PAM":1171,"UC":71,"PJD":10}],["Jaafra","PAM",2860,14.8,0,{"RNI":1161,"PAM":1584,"UC":115}],["Jaidate","PAM",3928,1.3,0,{"RNI":1672,"PAM":1724,"PI":81,"UC":451}],["Jbilate","RNI",4535,13.5,0,{"RNI":1913,"PAM":1302,"PI":431,"UC":889}],["Labrikiyne","PI",4109,3.2,0,{"RNI":1745,"PAM":343,"PI":1878,"MP":11,"UC":13,"PPS":102,"PJD":17}],["Lamharra","PAM",3860,3.4,0,{"RNI":1160,"PAM":1293,"UC":261,"PPS":1090,"PJD":56}],["Nzalat Laadam","RNI",3337,1.9,0,{"RNI":1199,"PAM":1136,"PI":333,"UC":23,"PPS":638,"PJD":8}],["Oulad Aamer Tizmarine","PAM",1694,33.7,0,{"RNI":168,"PAM":1032,"PI":461,"USFP":12,"UC":1,"PPS":20}],["Oulad Hassoune Hamri","PAM",3025,10.6,0,{"RNI":959,"PAM":1281,"PI":767,"UC":5,"PJD":13}],["Oulad Imloul","PAM",4148,32.7,0,{"RNI":499,"PAM":2003,"PI":584,"USFP":6,"UC":646,"PPS":256,"PJD":154}],["Ras Ain Rhamna","PAM",4934,10.6,0,{"RNI":1626,"PAM":2150,"PI":1038,"UC":120}],["Sidi Abdallah","PAM",3052,42.8,0,{"RNI":10,"PAM":1930,"PI":624,"UC":399,"PJD":89}],["Sidi Ali Labrahla","PI",2179,23.9,0,{"RNI":301,"PAM":390,"PI":995,"UC":474,"PPS":4,"PJD":15}],["Sidi Bou Othmane (Mun.)","RNI",4035,0.7,1,{"RNI":1491,"PAM":1462,"PI":746,"USFP":20,"UC":316}],["Sidi Boubker","PAM",2304,5.3,0,{"RNI":1081,"PAM":1203,"PI":7,"UC":13}],["Sidi Ghanem","PI",2512,8.1,0,{"RNI":24,"PAM":928,"PI":1132,"UC":346,"PJD":82}],["Sidi Mansour","PAM",1960,12.9,0,{"RNI":585,"PAM":837,"PI":10,"UC":528}],["Skhour Rehamna","PAM",4906,9.7,0,{"RNI":490,"PAM":1961,"PI":934,"UC":1485,"PPS":20,"PJD":16}],["Skoura Lhadra","PAM",2844,3.7,0,{"RNI":1350,"PAM":1456,"PI":7,"UC":31}],["Tlauh","RNI",3555,40.6,0,{"RNI":2383,"PAM":939,"PI":28,"USFP":25,"UC":27,"PJD":153}]],"Safi":[["Atouabet","MP",3055,21.7,0,{"PAM":358,"PI":103,"MP":1628,"UC":2,"PPS":964}],["Ayir","UC",6800,9.5,0,{"RNI":20,"PAM":1535,"PI":958,"USFP":152,"MP":22,"UC":2361,"PPS":1713,"PJD":39}],["Bouguedra","PAM",3725,5.7,0,{"RNI":54,"PAM":1561,"PI":1348,"MP":315,"UC":10,"PPS":271,"PJD":166}],["Chahda","PPS",2374,29.4,0,{"RNI":60,"PAM":5,"PI":710,"USFP":116,"MP":56,"PPS":1409,"PJD":18}],["Dar Si Aissa","PAM",3435,13.2,0,{"RNI":1051,"PAM":1506,"PI":542,"USFP":73,"MP":108,"UC":151,"PPS":4}],["El Beddouza","UC",5802,88.2,0,{"RNI":196,"PAM":196,"PI":77,"UC":5311,"PJD":22}],["El Ghiate","PAM",6754,6.5,0,{"RNI":646,"PAM":2746,"PI":525,"MP":82,"PPS":2305,"PJD":450}],["El Gouraani","MP",1905,10.4,0,{"RNI":200,"PI":75,"USFP":691,"MP":890,"PPS":49}],["Hrara","PI",6770,0.9,0,{"RNI":652,"PAM":1462,"PI":2045,"USFP":163,"MP":415,"UC":1984,"PPS":5,"PJD":44}],["Jamaat Shaim (Mun.)","USFP",3911,7.7,1,{"RNI":110,"PAM":140,"PI":1598,"USFP":1899,"MP":109,"PPS":55}],["Khatazakane","PAM",5096,35.8,0,{"RNI":830,"PAM":2843,"PI":1019,"USFP":156,"MP":171,"UC":51,"PPS":26}],["Laamamra","PAM",4899,26.6,0,{"RNI":1029,"PAM":2334,"PI":376,"USFP":64,"MP":130,"PPS":966}],["Labkhati","RNI",5237,3.5,0,{"RNI":2025,"PAM":1032,"PI":57,"USFP":256,"MP":1841,"PPS":25,"PJD":1}],["Lahdar","USFP",3729,8.4,0,{"RNI":405,"PAM":58,"PI":508,"USFP":1514,"MP":1199,"UC":25,"PPS":20}],["Lamaachate","MP",4969,42.5,0,{"RNI":438,"PAM":12,"PI":580,"MP":2801,"PPS":689,"PJD":449}],["Lamrasla","PAM",3485,24.5,0,{"RNI":131,"PAM":1611,"PI":318,"USFP":58,"MP":758,"PPS":370,"PJD":239}],["Lamsabih","MP",2499,13,0,{"RNI":770,"PAM":6,"PI":418,"USFP":202,"MP":1095,"PPS":8}],["Moul El Bergui","PAM",4670,57.5,0,{"RNI":158,"PAM":3233,"PI":550,"USFP":286,"MP":231,"UC":92,"PPS":49,"PJD":71}],["Nagga","PI",5973,15.9,0,{"RNI":424,"PAM":911,"PI":2592,"USFP":5,"MP":1645,"PPS":213,"PJD":183}],["Ouled Salmane","PAM",6675,9.5,0,{"RNI":227,"PAM":2795,"PI":2162,"USFP":86,"MP":1002,"UC":19,"PPS":325,"PJD":59}],["Saadla","PI",5049,0.6,0,{"RNI":831,"PAM":381,"PI":1160,"USFP":25,"MP":1130,"UC":1118,"PPS":404}],["Safi (Mun.)","PAM",22793,4.5,1,{"RNI":4293,"PAM":5308,"PI":3788,"USFP":1635,"MP":2116,"UC":2597,"PPS":972,"PJD":2084}],["Sebt Gzoula (Mun.)","PAM",6299,12.7,1,{"RNI":2481,"PAM":3279,"USFP":1,"MP":38,"UC":2,"PPS":30,"PJD":468}],["Sidi Aissa","USFP",3684,43.1,0,{"RNI":292,"PAM":201,"PI":182,"USFP":2181,"MP":593,"UC":4,"PPS":82,"PJD":149}],["Sidi Ettiji","USFP",2934,20.4,0,{"RNI":83,"PAM":397,"PI":301,"USFP":1177,"MP":295,"UC":104,"PPS":577}]],"Salé - Al-Jadida":[["Ameur","PI",9374,0.7,0,{"RNI":3836,"PAM":584,"PI":3901,"USFP":121,"MP":39,"UC":159,"PPS":695,"PJD":39}],["Hssaine (Arrond.)","PAM",13742,9.7,1,{"RNI":2812,"PAM":4139,"PI":1836,"USFP":455,"MP":1184,"PPS":1461,"PJD":1855}],["Layayda (Arrond.)","PI",13677,21.7,1,{"RNI":2095,"PAM":1724,"PI":5068,"USFP":493,"MP":975,"UC":953,"PPS":1433,"PJD":936}],["Shoul","RNI",7606,6.5,0,{"RNI":3326,"PAM":2831,"PI":441,"USFP":10,"MP":20,"UC":28,"PPS":276,"PJD":674}],["Sidi Bouknadel (Mun.)","RNI",7580,8.7,1,{"RNI":3402,"PAM":632,"PI":2740,"USFP":12,"MP":4,"PPS":752,"PJD":38}]],"Salé - Médina":[["Bab Lamrissa (Arrond.)","RNI",15128,10.4,1,{"RNI":4581,"PAM":2333,"PI":2331,"USFP":402,"MP":631,"UC":236,"PPS":3007,"PJD":1607}],["Bettana (Arrond.)","PAM",14741,6.6,1,{"RNI":1936,"PAM":4205,"PI":1087,"USFP":572,"MP":3231,"UC":287,"PPS":2510,"PJD":913}],["Tabriquet (Arrond.)","RNI",17005,4.6,1,{"RNI":3845,"PAM":3070,"PI":2131,"USFP":1164,"MP":1872,"UC":963,"PPS":1976,"PJD":1984}]],"Sefrou":[["Adrej","RNI",684,33.3,0,{"RNI":384,"PAM":35,"PI":46,"USFP":156,"MP":63}],["Aghbalou Aqorar","RNI",3548,16.5,0,{"RNI":1757,"PAM":67,"PI":98,"USFP":421,"MP":1170,"PPS":8,"PJD":27}],["Ahl Sidi Lahcen","RNI",1772,27,0,{"RNI":1002,"PAM":47,"PI":69,"USFP":523,"PPS":35,"PJD":96}],["Ain Cheggag","PI",8002,33,0,{"RNI":1557,"PAM":836,"PI":4194,"USFP":497,"MP":795,"PPS":26,"PJD":97}],["Ain Timguenai","PAM",2509,23.2,1,{"RNI":490,"PAM":1264,"PI":12,"USFP":681,"MP":62}],["Ait Sebaa Lajrouf","PAM",6852,2.9,0,{"RNI":1088,"PAM":2008,"PI":419,"USFP":1809,"MP":220,"UC":96,"PPS":1212}],["Azzaba","RNI",2599,52.6,0,{"RNI":1709,"PAM":91,"PI":236,"USFP":341,"MP":125,"PPS":97}],["Bhalil (Mun.)","RNI",4414,4.6,1,{"RNI":2117,"PAM":1913,"PI":95,"USFP":230,"MP":41,"PJD":18}],["Bir Tam Tam","USFP",3601,11.1,0,{"RNI":1032,"PAM":322,"PI":719,"USFP":1432,"MP":96}],["Dar El Hamra","PAM",1635,5.1,0,{"RNI":306,"PAM":621,"PI":70,"USFP":538,"MP":100}],["El Menzel (Mun.)","RNI",5307,8.4,1,{"RNI":2048,"PAM":1484,"PI":138,"USFP":1603,"MP":34}],["Ighzrane","USFP",3548,6.9,0,{"RNI":598,"PAM":1254,"PI":76,"USFP":1498,"MP":121,"PJD":1}],["Imouzzer Kandar (Mun.)","PPS",7587,21.9,1,{"RNI":1056,"PAM":1194,"PI":838,"USFP":866,"MP":432,"UC":70,"PPS":2859,"PJD":272}],["Kandar Sidi Khiar","PAM",3866,10.8,0,{"RNI":753,"PAM":1266,"PI":690,"USFP":228,"MP":850,"PPS":79}],["Laanoussar","RNI",3684,20,0,{"RNI":1668,"PAM":930,"PI":96,"USFP":669,"MP":180,"UC":141}],["Mtarnagha","USFP",2168,22.2,0,{"RNI":140,"PAM":748,"PI":17,"USFP":1230,"MP":33}],["Oulad Mkoudou","USFP",2094,18.1,0,{"RNI":1,"PAM":845,"PI":24,"USFP":1224}],["Ras Tabouda","USFP",2556,0.8,0,{"RNI":486,"PAM":989,"PI":23,"USFP":1009,"MP":49}],["Ribate El Kheir (Mun.)","USFP",5818,4.7,1,{"RNI":903,"PAM":2253,"PI":67,"USFP":2525,"MP":70}],["Sefrou (Mun.)","RNI",5493,6.2,1,{"RNI":1210,"PAM":807,"PI":838,"USFP":868,"MP":680,"PPS":419,"PJD":671}],["Sidi YoussefBen Ahmed","RNI",4084,11.5,0,{"RNI":1635,"PAM":1167,"PI":275,"USFP":582,"MP":255,"PPS":124,"PJD":46}],["Tafajight","RNI",876,12.2,0,{"RNI":447,"PAM":45,"PI":24,"USFP":340,"MP":20}],["Tazouta","USFP",2538,11.5,0,{"RNI":866,"PAM":165,"PI":146,"USFP":1157,"MP":182,"PJD":22}]],"Settat":[["Ain Blal","UC",2011,2.6,0,{"RNI":52,"PI":911,"MP":84,"UC":964}],["Ain Dorbane-Lahlaf","USFP",3181,20.7,0,{"RNI":27,"PAM":19,"PI":10,"USFP":1879,"MP":13,"UC":1222,"PPS":11}],["Ben Ahmed (Mun.)","PAM",7274,3.1,1,{"RNI":949,"PAM":2190,"PI":502,"USFP":1968,"MP":44,"UC":420,"PPS":297,"PJD":904}],["Bni Khloug","PI",2925,53.9,0,{"RNI":170,"PAM":7,"PI":2025,"MP":274,"UC":449}],["Bni Yagrine","PI",2852,79.6,0,{"PAM":203,"PI":2474,"MP":38,"UC":137}],["Bouguargouh","USFP",3063,0.7,0,{"RNI":865,"PAM":448,"PI":590,"USFP":887,"MP":82,"UC":50,"PPS":141}],["Dar Chaffai","UC",6948,1.1,0,{"RNI":126,"PAM":113,"PI":2706,"MP":978,"UC":2782,"PPS":243}],["El Borouj (Mun.)","UC",4865,6.7,1,{"RNI":419,"PI":1645,"MP":115,"UC":1972,"PPS":51,"PJD":663}],["Gdana","UC",3063,13.1,0,{"RNI":125,"PAM":299,"PI":1055,"MP":128,"UC":1456}],["Guisser","RNI",4212,0,0,{"RNI":1936,"PI":1936,"MP":340}],["Khemisset Chaouia","RNI",2416,9.5,0,{"RNI":1115,"PI":394,"UC":885,"PPS":22}],["Lahouaza","UC",1949,68.5,0,{"RNI":208,"PAM":109,"PI":82,"UC":1543,"PPS":7}],["Lakhzazra","PI",2471,12.3,0,{"RNI":35,"PI":1087,"USFP":783,"UC":486,"PPS":80}],["Laqraqra","PI",3223,2.9,0,{"RNI":1464,"PI":1559,"MP":190,"UC":8,"PPS":2}],["Loulad (Mun.)","PI",2667,12.5,1,{"RNI":82,"PAM":19,"PI":1227,"USFP":893,"MP":1,"UC":445}],["M'Garto","PPS",3871,19.5,0,{"RNI":608,"PAM":134,"PI":58,"USFP":1118,"UC":80,"PPS":1873}],["Machraa Ben Abbou","RNI",3324,38.6,0,{"RNI":2207,"PAM":89,"MP":69,"UC":925,"PPS":28,"PJD":6}],["Meskoura","UC",2313,28.2,0,{"RNI":754,"PAM":48,"MP":105,"UC":1406}],["Mniaa","RNI",3793,27.8,0,{"RNI":2283,"PAM":1228,"PI":234,"USFP":2,"UC":46}],["Mrizigue","PAM",2833,14.6,0,{"RNI":848,"PAM":1261,"USFP":717,"UC":7}],["Mzamza Janoubia","UC",5811,14.9,0,{"RNI":298,"PAM":1832,"PI":21,"USFP":261,"MP":513,"UC":2700,"PPS":1,"PJD":185}],["Mzoura","UC",3184,23,0,{"RNI":606,"PAM":574,"PI":58,"USFP":201,"MP":166,"UC":1338,"PPS":103,"PJD":138}],["N'Khila","UC",3855,3.3,0,{"RNI":196,"PAM":98,"PI":691,"USFP":1110,"MP":114,"UC":1239,"PPS":407}],["Oued Naanaa","RNI",2519,22.6,0,{"RNI":1259,"PAM":394,"USFP":689,"MP":34,"UC":141,"PPS":2}],["Oulad Amer","UC",2206,38.4,0,{"RNI":90,"PAM":23,"MP":623,"UC":1470}],["Oulad Bouali Nouaja","UC",1933,1.1,0,{"RNI":188,"PAM":24,"PI":805,"MP":88,"UC":826,"PPS":2}],["Oulad Chbana","PAM",2658,60.1,0,{"RNI":55,"PAM":2001,"PI":54,"USFP":404,"MP":72,"UC":72}],["Oulad Fares","PAM",3059,24.9,0,{"RNI":743,"PAM":1504,"PI":645,"MP":167}],["Oulad Fares El Halla","PI",1016,63.9,0,{"RNI":182,"PI":831,"UC":3}],["Oulad Freiha","PI",3877,16.9,0,{"RNI":246,"PAM":67,"PI":2073,"MP":75,"UC":1416}],["Oulad M'Hamed","RNI",3614,22.4,0,{"RNI":1835,"PAM":1024,"PI":120,"USFP":222,"MP":17,"UC":229,"PPS":134,"PJD":33}],["Oulad M'Rah (Mun.)","RNI",3167,9.3,1,{"RNI":1399,"PAM":1104,"PI":217,"USFP":3,"MP":140,"UC":304}],["Oulad Said","UC",3078,13.3,0,{"RNI":60,"PAM":778,"PI":698,"MP":176,"UC":1186,"PJD":180}],["Oulad Sghir","RNI",3893,2.7,0,{"RNI":1156,"PAM":818,"PI":1052,"USFP":118,"MP":468,"UC":192,"PPS":69,"PJD":20}],["Ras El Ain Chaouia","USFP",5397,17.4,0,{"RNI":37,"PAM":855,"USFP":2723,"UC":1782}],["Rima","RNI",2814,28.1,0,{"RNI":1706,"PI":914,"MP":30,"UC":164}],["Settat (Mun.)","PJD",12871,6.5,1,{"RNI":2270,"PAM":1516,"PI":2210,"USFP":900,"MP":633,"UC":1385,"PPS":852,"PJD":3105}],["Sgamna","PAM",3190,49.9,0,{"RNI":431,"PAM":2024,"PI":374,"MP":83,"UC":137,"PPS":141}],["Sidi Abdelkrim","RNI",3501,19.9,0,{"RNI":1552,"PAM":55,"PI":65,"USFP":829,"MP":854,"UC":133,"PPS":13}],["Sidi Ahmed El Khadir","PI",2882,30.7,0,{"RNI":260,"PAM":66,"PI":1624,"MP":127,"UC":66,"PJD":739}],["Sidi Boumehdi","PI",1706,47.5,0,{"RNI":250,"PAM":263,"PI":1073,"MP":65,"UC":55}],["Sidi Dahbi","PI",3373,6.6,0,{"RNI":1226,"PI":1449,"USFP":575,"UC":15,"PPS":108}],["Sidi El Aidi","RNI",2898,23.4,0,{"RNI":1619,"PAM":1,"PI":279,"USFP":5,"MP":27,"UC":940,"PJD":27}],["Sidi Hajjaj","PAM",6583,20.6,0,{"RNI":2557,"PAM":3914,"PI":81,"USFP":28,"UC":3}],["Sidi Mohammed Ben Rahal","RNI",3894,17.4,0,{"RNI":2245,"PAM":34,"PI":22,"MP":15,"UC":1569,"PPS":9}],["Toualet","PI",3813,10.3,0,{"RNI":1618,"PAM":108,"PI":2012,"MP":5,"UC":70}]],"Sidi Bennour":[["Bni Hilal","PAM",7109,80.2,0,{"RNI":451,"PAM":6155,"PI":180,"USFP":227,"UC":53,"PJD":43}],["Bni Tsiriss","PAM",3835,15.9,0,{"RNI":71,"PAM":2107,"PI":123,"USFP":1499,"PJD":35}],["Bouhmame","UC",7740,23.5,0,{"RNI":1538,"PAM":899,"PI":1326,"USFP":283,"MP":337,"UC":3356,"PPS":1}],["Jabria","PI",2826,35.9,0,{"RNI":670,"PAM":94,"PI":1685,"USFP":14,"MP":33,"UC":324,"PPS":6}],["Khmis Ksiba","PAM",1661,32.2,0,{"RNI":510,"PAM":1045,"USFP":1,"MP":105}],["Koudiat Bni Dghough","UC",4861,8.9,0,{"PAM":693,"PI":1866,"UC":2301,"PPS":1}],["Kridid","UC",5707,3.8,0,{"RNI":713,"PAM":892,"PI":1498,"USFP":84,"MP":396,"UC":1713,"PPS":1,"PJD":410}],["Laagagcha","USFP",4999,25.3,0,{"RNI":203,"PAM":284,"PI":1139,"USFP":2405,"MP":276,"UC":508,"PPS":8,"PJD":176}],["Laamria","PAM",3497,33,0,{"RNI":858,"PAM":2013,"USFP":64,"PJD":562}],["Laaounate","USFP",6519,17.5,0,{"RNI":150,"PAM":2323,"PI":474,"USFP":3465,"MP":80,"UC":22,"PJD":5}],["Laatatra","PI",4792,0.8,0,{"RNI":1004,"PAM":1234,"PI":1270,"USFP":17,"MP":1096,"UC":125,"PPS":46}],["Laghnadra","USFP",10363,42.4,0,{"RNI":1278,"PAM":752,"PI":1522,"USFP":5919,"MP":282,"UC":88,"PPS":3,"PJD":519}],["Lgharbia","USFP",8240,8.8,0,{"RNI":847,"PAM":2106,"PI":2094,"USFP":2835,"MP":93,"UC":126,"PJD":139}],["Lmechrek","RNI",5296,58.8,0,{"RNI":4039,"PAM":924,"PI":110,"USFP":3,"MP":134,"UC":86}],["Loualidia","PI",7334,2.7,0,{"RNI":355,"PAM":757,"PI":2963,"USFP":2765,"MP":279,"UC":183,"PJD":32}],["M'Tal","UC",3987,15,0,{"RNI":70,"PAM":827,"PI":88,"USFP":1201,"UC":1801}],["Metrane","PAM",3551,8.6,0,{"RNI":151,"PAM":1436,"PI":545,"USFP":1132,"MP":196,"UC":32,"PPS":18,"PJD":41}],["Oulad Amrane","UC",3405,86.9,0,{"PI":199,"USFP":34,"UC":3157,"PPS":15}],["Oulad Boussaken","PI",2247,21.7,0,{"RNI":93,"PAM":612,"PI":1099,"USFP":316,"MP":3,"UC":117,"PPS":7}],["Oulad Sbaita","USFP",7575,32.3,0,{"RNI":970,"PAM":1338,"PI":227,"USFP":3787,"MP":761,"UC":359,"PJD":133}],["Oulad Si Bouhya","PAM",5992,7.1,0,{"RNI":2527,"PAM":2953,"PI":1,"USFP":11,"MP":29,"UC":272,"PJD":199}],["Saniat Berguig","PI",8210,2.1,0,{"RNI":1744,"PAM":815,"PI":2573,"USFP":2401,"MP":25,"UC":134,"PPS":7,"PJD":511}],["Sidi Bennour (Mun.)","RNI",6780,18.4,1,{"RNI":2230,"PAM":444,"PI":884,"USFP":568,"MP":887,"UC":554,"PPS":983,"PJD":230}],["Tamda","PI",3379,8.4,0,{"RNI":139,"PAM":309,"PI":1491,"USFP":134,"MP":1,"UC":1207,"PPS":65,"PJD":33}],["Zemamra (Mun.)","USFP",4103,26.1,1,{"RNI":1451,"PI":10,"USFP":2522,"MP":118,"UC":2}]],"Sidi Ifni":[["Ait Erkha","PAM",3310,2.7,0,{"RNI":1482,"PAM":1571,"USFP":190,"PPS":62,"PJD":5}],["Anfeg","PAM",2489,35.9,0,{"RNI":697,"PAM":1590,"PI":32,"USFP":132,"PPS":35,"PJD":3}],["Arbaa Ait Abdellah","PAM",1769,16.2,0,{"RNI":650,"PAM":936,"PI":4,"USFP":33,"PPS":109,"PJD":37}],["Boutrouch","RNI",2087,29.9,0,{"RNI":1337,"PAM":712,"PJD":38}],["Ibdar","RNI",2101,20.2,0,{"RNI":1220,"PAM":796,"USFP":46,"PPS":11,"PJD":28}],["Imi N'Fast","PAM",2060,2.3,0,{"RNI":955,"PAM":1002,"USFP":91,"PJD":12}],["Lakhsas (Mun.)","PPS",2677,17.3,1,{"RNI":952,"PAM":181,"PI":3,"USFP":103,"PPS":1416,"PJD":22}],["Mesti","RNI",1730,10.1,0,{"RNI":823,"PAM":649,"PI":2,"USFP":200,"PPS":51,"PJD":5}],["Mirleft","RNI",4507,8.8,1,{"RNI":2211,"PAM":1814,"PI":103,"USFP":236,"PPS":135,"PJD":8}],["Sbouya","PAM",2648,12,0,{"RNI":1034,"PAM":1352,"PI":5,"USFP":176,"PJD":81}],["Sebt Ennabour","RNI",2803,43.6,0,{"RNI":1943,"PAM":119,"USFP":722,"PPS":1,"PJD":18}],["Sidi AbdallahOu Belaid","RNI",2835,22.6,0,{"RNI":1689,"PAM":1049,"PI":3,"USFP":22,"PPS":57,"PJD":15}],["Sidi H'Saine Ou Ali","PAM",2913,3.4,0,{"RNI":986,"PAM":1084,"USFP":6,"PPS":812,"PJD":25}],["Sidi Ifni (Mun.)","RNI",7264,11.3,1,{"RNI":3414,"PAM":2595,"PI":241,"USFP":736,"PPS":263,"PJD":15}],["Sidi M'Bark","RNI",2789,18.3,0,{"RNI":1403,"PAM":395,"PI":16,"USFP":78,"PPS":892,"PJD":5}],["Tangarfa","PAM",2885,3.1,0,{"RNI":770,"PAM":1082,"PI":28,"USFP":992,"PPS":9,"PJD":4}],["Tighirt","RNI",3900,6.9,0,{"RNI":1574,"PAM":1306,"USFP":642,"PPS":354,"PJD":24}],["Tioughza","RNI",4960,1.5,0,{"RNI":2226,"PAM":2154,"PI":32,"USFP":327,"PPS":49,"PJD":172}],["Tnine Amellou","PAM",2539,7.3,0,{"RNI":959,"PAM":1145,"USFP":214,"PJD":221}]],"Sidi Slimane":[["Ameur Chamalia","USFP",6782,18.9,0,{"RNI":1917,"PAM":102,"PI":124,"USFP":3199,"MP":13,"UC":1414,"PJD":13}],["Azghar","UC",4495,34.9,0,{"RNI":498,"PAM":920,"PI":169,"USFP":263,"MP":84,"UC":2487,"PPS":10,"PJD":64}],["Boumaiz","UC",7355,18.1,0,{"RNI":2470,"PAM":349,"PI":309,"USFP":278,"MP":137,"UC":3800,"PPS":12}],["Dar Bel Amri","UC",9656,2.2,0,{"RNI":1651,"PAM":2986,"PI":60,"USFP":998,"MP":104,"UC":3201,"PPS":273,"PJD":383}],["Kceibya","USFP",9735,17.5,0,{"RNI":1729,"PAM":494,"PI":135,"USFP":4459,"MP":159,"UC":2759}],["M'saada","UC",6833,34.6,0,{"RNI":1280,"PAM":338,"PI":454,"USFP":1085,"UC":3646,"PPS":30}],["Ouled Ben Hammadi","USFP",4263,56.3,0,{"RNI":714,"PAM":311,"PI":37,"USFP":3113,"UC":88}],["Ouled H'Cine","UC",8150,37.1,0,{"RNI":1071,"PAM":170,"PI":484,"USFP":1332,"MP":30,"UC":4352,"PPS":504,"PJD":207}],["Sfafaa","USFP",7743,11.2,0,{"RNI":2192,"PAM":413,"PI":318,"USFP":3059,"MP":178,"UC":1569,"PJD":14}],["Sidi Slimane (Mun.)","PI",7959,4.6,1,{"RNI":1118,"PAM":1077,"PI":1488,"USFP":1108,"MP":836,"UC":1058,"PPS":732,"PJD":542}],["Sidi Yahya El Gharb (Mun.)","PAM",7577,0.4,1,{"RNI":2226,"PAM":2256,"PI":574,"USFP":847,"MP":661,"UC":911,"PPS":57,"PJD":45}]],"Sidi-Bernoussi":[["Sidi Bernoussi (Arrond.)","RNI",12882,12.2,1,{"RNI":3460,"PAM":1891,"PI":1663,"USFP":688,"MP":732,"UC":1265,"PPS":1473,"PJD":1710}],["Sidi Moumen (Arrond.)","RNI",20554,13.5,1,{"RNI":7446,"PAM":4666,"PI":2066,"USFP":933,"MP":1090,"UC":1534,"PPS":718,"PJD":2101}]],"Sidi-Kacem":[["Ain Dfali","RNI",6851,34.2,0,{"RNI":3771,"PAM":408,"PI":445,"USFP":10,"MP":97,"UC":695,"PJD":1425}],["Al Haouafate","MP",5599,29.1,0,{"RNI":697,"PAM":105,"PI":59,"USFP":1478,"MP":3107,"UC":30,"PPS":118,"PJD":5}],["Bab Tiouka","PAM",3169,18.1,0,{"RNI":311,"PAM":1620,"PI":1046,"USFP":6,"MP":90,"PPS":93,"PJD":3}],["Bir Taleb","PAM",3319,57.3,0,{"RNI":225,"PAM":2459,"PI":558,"MP":37,"UC":17,"PPS":23}],["Bni Oual","RNI",2700,17,0,{"RNI":1309,"PAM":849,"PI":106,"MP":224,"UC":14,"PPS":151,"PJD":47}],["Chbanate","RNI",3477,1.8,0,{"RNI":860,"PAM":673,"PI":496,"USFP":798,"MP":46,"UC":3,"PPS":540,"PJD":61}],["Dar Gueddari (Mun.)","MP",3800,41.5,1,{"RNI":292,"PAM":577,"PI":19,"USFP":484,"MP":2154,"PPS":122,"PJD":152}],["Dar Laaslouji","MP",11133,23.5,0,{"RNI":2127,"PAM":501,"PI":1123,"USFP":1280,"MP":4744,"UC":984,"PPS":12,"PJD":362}],["Had Kourt (Mun.)","RNI",2970,5.7,1,{"RNI":1330,"PAM":1160,"PI":14,"USFP":166,"UC":116,"PJD":184}],["Jorf El Melha (Mun.)","USFP",8197,2.5,1,{"RNI":1167,"PAM":41,"PI":218,"USFP":2440,"MP":120,"UC":2238,"PPS":1904,"PJD":69}],["Khnichet","PI",8000,28,0,{"RNI":1607,"PAM":906,"PI":3847,"USFP":1065,"MP":108,"UC":383,"PPS":74,"PJD":10}],["Lamrabih","RNI",7348,37.8,0,{"RNI":3940,"PAM":1123,"PI":343,"USFP":90,"MP":569,"UC":1160,"PPS":73,"PJD":50}],["Mechraa Bel Ksiri (Mun.)","USFP",8479,8.4,1,{"RNI":2772,"PAM":581,"PI":412,"USFP":3484,"MP":561,"PPS":35,"PJD":634}],["Moulay Abdelkader","RNI",2158,43.6,0,{"RNI":1290,"PAM":256,"PI":349,"USFP":213,"MP":37,"PJD":13}],["Nouirate","USFP",7312,33.5,0,{"RNI":1673,"PAM":273,"PI":332,"USFP":4120,"MP":639,"UC":173,"PJD":102}],["Oulad Nouel","MP",3572,34.9,0,{"RNI":199,"PAM":917,"PI":94,"MP":2162,"UC":95,"PPS":46,"PJD":59}],["Rmilat","UC",6117,4,0,{"RNI":835,"PI":1076,"USFP":1300,"MP":1136,"UC":1542,"PJD":228}],["Sefsaf","RNI",8220,19.3,0,{"RNI":3613,"PAM":42,"PI":196,"USFP":1762,"MP":2024,"UC":361,"PPS":50,"PJD":172}],["Selfat","PI",3083,31.1,0,{"RNI":13,"PAM":814,"PI":1773,"USFP":5,"MP":148,"UC":210,"PPS":111,"PJD":9}],["Sidi Ahmed Benaissa","MP",3156,5.2,0,{"RNI":1027,"PAM":235,"PI":583,"USFP":50,"MP":1190,"UC":68,"PPS":3}],["Sidi Al Kamel","RNI",9417,18.5,0,{"RNI":3832,"PAM":258,"PI":424,"USFP":2089,"MP":1087,"UC":1173,"PJD":554}],["Sidi Ameur Al Hadi","RNI",4732,21,0,{"RNI":2544,"PAM":1549,"USFP":24,"MP":537,"UC":78}],["Sidi Azzouz","RNI",5731,35.7,0,{"RNI":3019,"PAM":654,"PI":554,"USFP":263,"MP":267,"PJD":974}],["Sidi Kacem (Mun.)","PAM",7103,3.7,1,{"RNI":1791,"PAM":2126,"PI":1860,"USFP":335,"MP":222,"UC":91,"PPS":287,"PJD":391}],["Sidi M'Hamed Chelh","PI",3476,12.2,0,{"RNI":157,"PAM":606,"PI":1282,"MP":857,"UC":386,"PJD":188}],["Taoughilt","PI",4977,5.7,0,{"RNI":628,"PAM":367,"PI":1605,"USFP":63,"MP":1320,"UC":994}],["Tekna","PAM",3201,18,0,{"RNI":81,"PAM":1805,"PI":1229,"MP":56,"PPS":30}],["Zaggota","PAM",3743,1.1,0,{"RNI":99,"PAM":1495,"PI":508,"USFP":1,"MP":32,"UC":1,"PPS":1454,"PJD":153}],["Zirara","RNI",4918,32.3,0,{"RNI":2678,"PAM":1091,"PI":420,"USFP":111,"MP":296,"UC":139,"PPS":183}]],"Skhirate - Témara":[["Ain Attig (Mun.)","UC",9568,11.1,1,{"RNI":2166,"PAM":2047,"PI":322,"USFP":190,"MP":495,"UC":3226,"PPS":455,"PJD":667}],["Ain El Aouda (Mun.)","UC",13106,19.9,1,{"RNI":385,"PAM":3199,"PI":1703,"USFP":267,"MP":1380,"UC":5810,"PPS":228,"PJD":134}],["El Menzeh","PI",4372,2.8,0,{"RNI":645,"PAM":958,"PI":1368,"USFP":61,"UC":1247,"PPS":93}],["Harhoura (Mun.)","PI",4390,8.4,1,{"RNI":1333,"PAM":94,"PI":1702,"USFP":147,"MP":765,"UC":82,"PPS":231,"PJD":36}],["Mers El Kheir","RNI",6984,2.5,1,{"RNI":2054,"PAM":1852,"PI":1877,"USFP":1,"UC":1025,"PPS":42,"PJD":133}],["Oumazza","UC",2261,14.8,0,{"RNI":532,"PAM":264,"PI":412,"USFP":3,"MP":164,"UC":867,"PPS":19}],["Sabbah","PAM",5768,12.2,0,{"RNI":2394,"PAM":3095,"MP":96,"UC":79,"PPS":104}],["Sidi Yahya Zaer","PI",9328,3.6,1,{"RNI":2729,"PAM":984,"PI":3064,"USFP":124,"MP":182,"UC":928,"PPS":745,"PJD":572}],["Skhirate (Mun.)","RNI",8995,8.5,1,{"RNI":2784,"PAM":1429,"PI":691,"USFP":338,"MP":270,"UC":1055,"PPS":2020,"PJD":408}],["Témara (Mun.)","RNI",18408,18.9,1,{"RNI":6357,"PAM":1921,"PI":1937,"USFP":648,"MP":1299,"UC":2242,"PPS":1122,"PJD":2882}]],"Tan-Tan":[["Abteh","PAM",13,100,0,{"PAM":13}],["Ben Khlil","RNI",13,100,0,{"RNI":13}],["Chbika","MP",501,92,0,{"PAM":20,"MP":481}],["El Ouatia (Mun.)","PAM",4236,11.1,1,{"RNI":663,"PAM":1770,"PI":1301,"USFP":68,"MP":7,"PPS":417,"PJD":10}],["Msied","PAM",1147,97.1,0,{"RNI":14,"PAM":1128,"PI":3,"PJD":2}],["Tan Tan (Mun.)","RNI",9138,11.7,1,{"RNI":2925,"PAM":1318,"PI":1858,"USFP":863,"MP":404,"UC":752,"PPS":637,"PJD":381}],["Tilemzoun","PAM",1187,23.3,0,{"RNI":132,"PAM":636,"PI":360,"USFP":21,"PPS":38}]],"Tanger - Assilah":[["Al Manzla","PAM",1385,32.6,0,{"RNI":107,"PAM":840,"PI":50,"USFP":388}],["Aquouass Briech","RNI",2446,1.5,0,{"RNI":662,"PAM":582,"PI":425,"USFP":134,"UC":625,"PJD":18}],["Assilah (Mun.)","PAM",6497,17.5,1,{"RNI":290,"PAM":3112,"PI":221,"USFP":769,"UC":1976,"PJD":129}],["Bni Makada (Arrond.)","PI",23296,13.6,1,{"RNI":4303,"PAM":2484,"PI":7809,"USFP":1766,"MP":348,"UC":4651,"PPS":439,"PJD":1496}],["Charf-Mghogha (Arrond.)","RNI",15470,0,1,{"RNI":3652,"PAM":3645,"PI":1854,"USFP":1003,"MP":623,"UC":3434,"PJD":1259}],["Charf-Souani (Arrond.)","PAM",12480,11.8,1,{"RNI":1816,"PAM":3292,"PI":1441,"USFP":1120,"MP":473,"UC":1764,"PPS":1065,"PJD":1509}],["Dar Chaoui","PAM",1801,30,0,{"RNI":313,"PAM":853,"PI":222,"UC":100,"PJD":313}],["Gueznaia (Mun.)","PI",6896,27.7,1,{"RNI":677,"PAM":957,"PI":3235,"USFP":166,"MP":29,"UC":1326,"PPS":3,"PJD":503}],["Had Al Gharbia","UC",4048,23.4,0,{"RNI":351,"PAM":784,"PI":625,"USFP":53,"UC":1730,"PPS":92,"PJD":413}],["HJAR ENNHAL","UC",4852,18.1,0,{"RNI":32,"PAM":141,"PI":248,"USFP":1776,"UC":2655}],["Laaouama","PI",3441,25.3,0,{"RNI":19,"PAM":75,"PI":1894,"USFP":1025,"UC":421,"PPS":7}],["Sahel Chamali","RNI",2125,14.9,0,{"RNI":1177,"PAM":50,"PI":37,"UC":861}],["Sebt Azzinate","USFP",2038,26.8,0,{"RNI":454,"PI":406,"USFP":1000,"UC":52,"PPS":126}],["Sidi Lyamani","PAM",3592,22,0,{"RNI":733,"PAM":1523,"PI":157,"USFP":370,"MP":29,"UC":350,"PJD":430}],["Tanger-Médina (Arrond.)","RNI",17490,6.1,1,{"RNI":4682,"PAM":2361,"PI":1471,"USFP":2073,"MP":1254,"UC":3617,"PPS":417,"PJD":1615}]],"Taounate - Tissa":[["Ain Aicha","RNI",6259,26,0,{"RNI":3115,"PAM":1485,"PI":695,"MP":17,"UC":115,"PPS":172,"PJD":660}],["Ain Legdah","RNI",3754,8.1,0,{"RNI":1553,"PAM":1249,"PI":881,"USFP":8,"MP":63}],["Ain Maatouf","RNI",3856,43.4,0,{"RNI":2387,"PAM":155,"PI":481,"USFP":55,"UC":714,"PPS":57,"PJD":7}],["Ain Mediouna","USFP",5959,7.3,0,{"RNI":1785,"PAM":46,"PI":8,"USFP":2267,"MP":21,"PPS":1832}],["Bni Oulid","RNI",2792,0.2,0,{"RNI":1206,"PAM":193,"PI":1200,"PPS":154,"PJD":39}],["Bni Ounjel Tafraout","RNI",2337,16.7,0,{"RNI":1213,"PAM":823,"PI":260,"PPS":36,"PJD":5}],["Bouadel","RNI",4086,20.2,0,{"RNI":2018,"PAM":1191,"PI":327,"USFP":95,"PPS":298,"PJD":157}],["Bouarouss","RNI",3386,21.9,0,{"RNI":1631,"PAM":172,"PI":890,"USFP":209,"MP":8,"PPS":10,"PJD":466}],["Bouhouda","PAM",7030,38.3,0,{"RNI":454,"PAM":4599,"PI":1906,"PPS":71}],["El Bsabsa","RNI",2537,22.6,0,{"RNI":1268,"PAM":468,"PI":37,"USFP":694,"PPS":70}],["Fennassa Bab El Hit","RNI",2825,29.3,0,{"RNI":1434,"PAM":607,"PI":144,"PPS":444,"PJD":196}],["Khlalfa","RNI",4668,24.6,0,{"RNI":2447,"PAM":1299,"PI":455,"USFP":104,"PPS":363}],["Messassa","RNI",2824,37.9,0,{"RNI":1889,"PAM":820,"PI":33,"USFP":9,"PPS":73}],["Mezraoua","PPS",3332,11.3,0,{"RNI":152,"PAM":1172,"PI":315,"USFP":13,"PPS":1550,"PJD":130}],["Oued Jemaa","RNI",2462,58.8,0,{"RNI":1820,"PAM":373,"PI":244,"USFP":25}],["Oulad Ayyad","RNI",3827,8.6,0,{"RNI":1704,"PAM":1373,"PI":715,"USFP":35}],["Oulad Daoud","USFP",3271,35.8,0,{"RNI":165,"PAM":468,"PI":121,"USFP":1756,"MP":176,"PPS":585}],["Outabouabane","RNI",2917,38.4,0,{"RNI":1736,"PAM":483,"PI":615,"PPS":83}],["Ras El Oued","RNI",4309,45.2,0,{"RNI":2618,"PAM":386,"PI":670,"USFP":10,"PPS":461,"PJD":164}],["Rghioua","RNI",1530,4.3,0,{"RNI":792,"PAM":726,"USFP":1,"PPS":11}],["Sidi M'HamedBen Lahcen","RNI",3422,42.4,0,{"RNI":2294,"PAM":842,"PI":269,"PPS":17}],["Tamedit","RNI",4277,5.5,0,{"RNI":1535,"PAM":1299,"PI":223,"USFP":49,"PPS":1061,"PJD":110}],["Taounate (Mun.)","PAM",9599,7.5,1,{"RNI":1535,"PAM":3572,"PI":1343,"USFP":175,"PPS":2849,"PJD":125}],["Thar Es-souk (Mun.)","PAM",1477,40.4,1,{"RNI":9,"PAM":967,"PI":70,"USFP":58,"PPS":371,"PJD":2}],["Tissa (Mun.)","RNI",4145,31.4,1,{"RNI":2068,"PAM":710,"PI":767,"USFP":325,"MP":135,"PPS":97,"PJD":43}],["Zrizer","PPS",2269,0.5,0,{"RNI":499,"PAM":594,"PI":554,"USFP":17,"PPS":605}]],"Taourirt":[["Ahl Oued Za","PI",4553,15.8,0,{"RNI":861,"PAM":1338,"PI":2058,"USFP":43,"MP":253}],["Ain Lehjer","RNI",2633,3.1,0,{"RNI":717,"PAM":421,"PI":512,"USFP":122,"MP":636,"PPS":225}],["Debdou (Mun.)","PI",1894,7.3,1,{"RNI":92,"PAM":590,"PI":729,"USFP":299,"MP":184}],["El Aioun Sidi Mellouk (Mun.)","PAM",8122,8,1,{"RNI":1420,"PAM":2068,"PI":1313,"USFP":194,"MP":894,"UC":56,"PPS":1001,"PJD":1176}],["El Atef","RNI",1239,18.2,0,{"RNI":727,"PAM":11,"PI":501}],["Gteter","PAM",3637,5.9,0,{"RNI":1028,"PAM":1241,"PI":552,"MP":816}],["Mechraa Hammadi","RNI",1792,7.8,0,{"RNI":616,"PAM":467,"PI":476,"MP":215,"UC":18}],["Melg El Ouidane","PI",2792,40.5,0,{"RNI":390,"PAM":202,"PI":1520,"USFP":79,"MP":307,"PJD":294}],["Mestegmer","PAM",2285,4.2,0,{"RNI":724,"PAM":821,"PI":564,"USFP":19,"MP":151,"PPS":6}],["Oulad M'hammed","PI",2380,4.9,0,{"RNI":419,"PAM":340,"PI":744,"USFP":627,"MP":250}],["Sidi Ali Bel Quassem","MP",4612,4,0,{"RNI":1172,"PAM":98,"PI":634,"USFP":1163,"MP":1355,"PPS":190}],["Sidi Lahsen","PAM",4462,53,0,{"RNI":738,"PAM":3101,"PI":9,"MP":602,"PPS":12}],["Tancherfi","PI",2468,8.7,0,{"RNI":793,"PAM":411,"PI":1007,"USFP":64,"MP":178,"UC":3,"PPS":3,"PJD":9}],["Taourirt (Mun.)","MP",13025,1.6,1,{"RNI":3778,"PAM":1787,"PI":1300,"USFP":613,"MP":3988,"UC":649,"PPS":670,"PJD":240}]],"Tarfaya":[["Akhfennir","RNI",1708,20.8,0,{"RNI":874,"PAM":14,"PI":519,"USFP":261,"MP":40}],["Daoura","PI",1286,3,0,{"RNI":566,"PI":605,"USFP":12,"MP":103}],["El Hagounia","RNI",1391,18.3,0,{"RNI":799,"PI":545,"USFP":47}],["Tah","RNI",1009,12.4,0,{"RNI":557,"PI":432,"USFP":20}],["Tarfaya (Mun.)","RNI",4344,18.1,1,{"RNI":1972,"PAM":137,"PI":1000,"USFP":1187,"UC":30,"PJD":18}]],"Taroudannt - Al-Janoubia":[["Ahl Ramel","PI",3566,0.6,0,{"RNI":1463,"PAM":480,"PI":1486,"PJD":137}],["Ahmar Laglalcha","PAM",6733,6,0,{"RNI":331,"PAM":2988,"PI":832,"PJD":2582}],["Ait Iaaza (Mun.)","USFP",4257,18.6,1,{"RNI":871,"PAM":837,"PI":118,"USFP":1663,"PJD":768}],["Ait Igas","PI",4134,9.3,0,{"RNI":460,"PAM":1061,"PI":1491,"USFP":1108,"MP":8,"PJD":6}],["Ait Makhlouf","RNI",2373,7.7,0,{"RNI":913,"PAM":667,"PI":731,"UC":62}],["Argana","PI",1697,85.5,0,{"RNI":101,"PAM":44,"PI":1552}],["Assads","PI",2140,4.3,0,{"RNI":1004,"PI":1095,"USFP":41}],["Bigoudine","RNI",3118,45.5,0,{"RNI":2211,"PAM":107,"PI":793,"USFP":6,"PJD":1}],["Bounrar","PAM",2201,26.1,0,{"RNI":458,"PAM":1033,"PI":149,"USFP":446,"PJD":115}],["Eddir","PI",3772,20.3,0,{"RNI":131,"PAM":1178,"PI":1944,"UC":259,"PJD":260}],["El Guerdane (Mun.)","RNI",5548,6.4,1,{"RNI":2717,"PAM":144,"PI":295,"USFP":28,"PJD":2364}],["El Koudia El Beida","PI",7473,2.9,0,{"RNI":2897,"PAM":643,"PI":3113,"PJD":820}],["Freija","PI",3891,11.4,0,{"RNI":192,"PAM":564,"PI":1770,"USFP":1328,"UC":18,"PJD":19}],["Ida Ou Moumen","RNI",2873,1,0,{"RNI":861,"PAM":520,"PI":831,"USFP":660,"PJD":1}],["Imilmaiss","PAM",1842,3.2,0,{"RNI":529,"PAM":654,"PI":595,"MP":58,"PJD":6}],["Imoulass","PI",2576,22.9,0,{"RNI":294,"PAM":846,"PI":1436}],["Issen","PJD",4040,23.3,0,{"RNI":967,"PAM":337,"PI":829,"PJD":1907}],["Lagfifat","RNI",5318,27.8,0,{"RNI":3101,"PAM":334,"PI":1621,"PJD":262}],["Lakhnafif","RNI",3350,52.3,0,{"RNI":2264,"PAM":443,"PI":512,"PJD":131}],["Lamhadi","RNI",4300,49.3,0,{"RNI":2784,"PAM":264,"PI":665,"USFP":1,"MP":2,"PJD":584}],["Lamnizla","RNI",2021,47.1,0,{"RNI":1437,"PAM":96,"PI":486,"PJD":2}],["Machraa El Ain","PJD",4555,4.7,0,{"RNI":853,"PAM":693,"PI":1167,"USFP":458,"PPS":4,"PJD":1380}],["Oulad Teima (Mun.)","RNI",14626,4.6,1,{"RNI":4974,"PAM":2052,"PI":2744,"USFP":272,"MP":277,"PJD":4307}],["Sidi Ahmed Ou Abdallah","RNI",1697,1,0,{"RNI":594,"PAM":577,"PI":524,"USFP":2}],["Sidi Ahmed Ou Amar","RNI",5563,27.3,0,{"RNI":3072,"PAM":614,"PI":1551,"MP":14,"PJD":312}],["Sidi Borja","USFP",4122,23,0,{"RNI":605,"PAM":953,"PI":641,"USFP":1903,"MP":4,"PJD":16}],["Sidi Boumoussa","RNI",6835,26.3,0,{"RNI":3998,"PAM":362,"PI":2203,"USFP":15,"PJD":257}],["Sidi Dahmane","PI",3448,9.4,0,{"RNI":943,"PAM":876,"PI":1268,"USFP":326,"PJD":35}],["Sidi Moussa Lhamri","RNI",5144,9.1,0,{"RNI":2572,"PAM":232,"PI":2103,"PJD":237}],["Tafraouten","PAM",3691,1.3,0,{"RNI":182,"PAM":1775,"PI":1726,"USFP":8}],["Talmakante","PI",1055,51.4,0,{"RNI":107,"PAM":203,"PI":745}],["Tamaloukte","PI",1992,4.2,0,{"RNI":600,"PAM":653,"PI":737,"USFP":2}],["Taroudannt (Mun.)","PAM",7704,13.6,1,{"RNI":1594,"PAM":2640,"PI":462,"USFP":1589,"MP":382,"PPS":102,"PJD":935}],["Tazemmourt","USFP",3217,1.9,0,{"RNI":379,"PAM":1223,"USFP":1283,"PPS":51,"PJD":281}],["Tidsi Nissendalene","PI",2654,0,0,{"RNI":1325,"PI":1326,"PJD":3}],["Tiout","PAM",1193,37.9,0,{"RNI":213,"PAM":716,"USFP":264}],["Zaouia Sidi Tahar","PI",4832,14.8,0,{"RNI":246,"PAM":1118,"PI":2091,"PJD":1377}]],"Taroudannt - Chamalia":[["Tabia","RNI",542,22.5,0,{"RNI":332,"PAM":210}],["Adar","RNI",1324,76.7,0,{"RNI":1164,"PAM":149,"PI":11}],["Agadir Melloul","RNI",2856,6.9,0,{"RNI":1526,"PAM":1328,"PI":1,"USFP":1}],["Ahl Tifnoute","PI",1842,64.3,0,{"RNI":259,"PI":1444,"UC":139}],["Ait Abdallah","PAM",681,41.6,0,{"RNI":181,"PAM":464,"PI":36}],["Amalou","RNI",1181,38.4,0,{"RNI":637,"PAM":183,"PI":157,"USFP":155,"UC":49}],["Aoulouz (Mun.)","RNI",7180,4.1,1,{"RNI":3229,"PAM":189,"PI":2936,"UC":82,"PJD":744}],["Arazane","PI",2466,25.7,0,{"RNI":693,"PAM":234,"PI":1327,"MP":212}],["Askaouen","PI",2584,4.9,0,{"RNI":882,"PAM":642,"PI":1008,"PJD":52}],["Assaisse","RNI",2613,29.4,0,{"RNI":1688,"PAM":920,"PI":5}],["Assaki","PAM",3107,6.2,0,{"RNI":1224,"PAM":1416,"PI":442,"MP":12,"UC":13}],["Azaghar N'Irs","UC",1443,48.9,0,{"PAM":340,"PI":38,"UC":1046,"PJD":19}],["Azrar","RNI",1853,75.7,0,{"RNI":1628,"PAM":225}],["El Faid","RNI",4331,31.2,0,{"RNI":2637,"PAM":388,"PI":1287,"PJD":19}],["Ida Ou Gailal","RNI",2874,7,0,{"RNI":1470,"PAM":134,"PI":1270}],["Ida Ougoummad","RNI",3865,10.1,0,{"RNI":1387,"PAM":863,"PI":998,"USFP":54,"UC":5,"PJD":558}],["Igli","PI",4634,12.5,0,{"RNI":1747,"PAM":563,"PI":2324}],["Igoudar Mnabha","PI",4050,25.6,0,{"RNI":1139,"PAM":696,"PI":2177,"PPS":38}],["Iguidi","RNI",2719,20.6,0,{"RNI":1638,"PI":1078,"USFP":3}],["Imaouen","RNI",916,60,0,{"RNI":665,"PAM":33,"PI":115,"UC":103}],["Imi N'Tayart","RNI",919,18.2,0,{"RNI":535,"PAM":16,"PI":368}],["Irherm (Mun.)","RNI",1881,11.1,1,{"RNI":964,"PAM":756,"PI":7,"USFP":120,"UC":33,"PPS":1}],["Lamhara","PAM",5479,14.5,0,{"RNI":1127,"PAM":2572,"PI":1777,"PPS":3}],["Nihit","RNI",644,44.4,0,{"RNI":431,"PAM":68,"PI":145}],["Oualqadi","PI",668,0.7,0,{"RNI":301,"PI":306,"UC":2,"PJD":59}],["Oulad Aissa","PI",4195,2.9,0,{"RNI":1890,"PAM":287,"PI":2013,"USFP":5}],["Oulad Berhil (Mun.)","PI",7303,26.4,1,{"RNI":1890,"PAM":937,"PI":3817,"USFP":7,"PJD":652}],["Ouneine","RNI",2832,25.1,0,{"RNI":1593,"PAM":882,"PI":357}],["Ouzioua","RNI",3100,45.2,0,{"RNI":1969,"PAM":568,"PI":563}],["Sidi Abdellah Ou Said","RNI",2011,43.7,0,{"RNI":1398,"PAM":519,"PI":87,"USFP":7}],["Sidi Boaal","RNI",1165,51,0,{"RNI":793,"PAM":164,"PI":9,"USFP":199}],["Sidi Hsaine","RNI",2630,17.3,0,{"RNI":1507,"PAM":1053,"PI":70}],["Sidi Mzal","RNI",781,33.4,0,{"RNI":516,"PAM":255,"USFP":10}],["Sidi Ouaaziz","PI",4181,9.2,0,{"RNI":1377,"PAM":133,"PI":1761,"UC":13,"PJD":897}],["Tafingoult","PI",2953,3.6,0,{"RNI":1241,"PAM":353,"PI":1348,"UC":2,"PJD":9}],["Talgjount","RNI",2578,70.5,0,{"RNI":2153,"PAM":335,"PI":65,"USFP":23,"PJD":2}],["Taliouine (Mun.)","PAM",2621,20.8,1,{"RNI":983,"PAM":1528,"PI":87,"MP":10,"PPS":2,"PJD":11}],["Taouyalte","PI",2359,10.4,0,{"RNI":843,"PAM":246,"PI":1089,"USFP":130,"UC":51}],["Tassousfi","PAM",2685,7,0,{"RNI":1200,"PAM":1387,"PI":2,"USFP":94,"MP":1,"PJD":1}],["Tataoute","RNI",1683,47.7,0,{"RNI":1085,"PAM":283,"PI":164,"USFP":151}],["Tigouga","RNI",1971,12.8,0,{"RNI":825,"PAM":510,"PI":573,"UC":58,"PJD":5}],["Tindine","RNI",1274,11.7,0,{"RNI":617,"PAM":48,"PI":468,"USFP":47,"UC":76,"PJD":18}],["Tinzart","PAM",2390,62.3,0,{"RNI":209,"PAM":1835,"PI":346}],["Tisfane","RNI",802,29.1,0,{"RNI":468,"PAM":235,"PI":48,"USFP":17,"PJD":34}],["Tisrasse","RNI",2696,8.1,0,{"RNI":1225,"PAM":1007,"PI":464}],["Tizgzaouine","RNI",1829,4.6,0,{"RNI":900,"PAM":816,"PI":106,"MP":7}],["Tizi N'Test","RNI",2207,43.2,0,{"RNI":1420,"PAM":466,"PI":277,"USFP":42,"UC":2}],["Toubkal","PAM",2460,20.8,0,{"RNI":838,"PAM":1349,"PI":259,"UC":8,"PPS":6}],["Toufelaazt","PAM",554,4.3,0,{"PAM":289,"PI":265}],["Toughmart","RNI",2345,36.8,0,{"RNI":1497,"PAM":633,"PI":215}],["Toumliline","PAM",655,1.8,0,{"RNI":226,"PAM":238,"PI":191}],["Zagmouzen","RNI",3255,7.9,0,{"RNI":1257,"PAM":995,"PPS":2,"PJD":1001}]],"Tata":[["Adis","MP",2778,18.2,0,{"RNI":618,"PAM":337,"PI":325,"MP":1124,"PPS":12,"PJD":362}],["Aguinane","RNI",1274,38,0,{"RNI":798,"PAM":314,"PI":38,"MP":52,"PJD":72}],["Ait Ouabelli","RNI",1411,28,0,{"RNI":835,"PAM":69,"PI":440,"MP":67}],["Akka (Mun.)","PI",2503,6,1,{"RNI":916,"PAM":453,"PI":1065,"MP":69}],["Akka Ighane","RNI",3470,21.9,0,{"RNI":1490,"PAM":421,"PI":729,"USFP":588,"MP":218,"PPS":7,"PJD":17}],["Allougoum","PAM",2813,22.2,0,{"RNI":680,"PAM":1305,"PI":314,"MP":450,"PPS":64}],["Fam El Hisn (Mun.)","RNI",3302,1.3,1,{"RNI":1663,"PAM":8,"PI":1620,"MP":11}],["Foum Zguid (Mun.)","PAM",3027,28.2,1,{"RNI":353,"PAM":1415,"PI":531,"MP":562,"PPS":166}],["Ibn Yacoub","RNI",1201,42.5,0,{"RNI":744,"PAM":233,"PI":1,"MP":223}],["Issafen","PI",1455,33.1,0,{"RNI":351,"PI":832,"MP":272}],["Kasbat Sidi Abdellah Ben M'Barek","PAM",2622,0.2,0,{"RNI":998,"PAM":1002,"PI":107,"MP":399,"PJD":116}],["Oum El Guerdane","PAM",1759,9.5,0,{"RNI":402,"PAM":623,"PI":456,"MP":244,"PPS":11,"PJD":23}],["Tagmout","PI",1943,10.5,0,{"RNI":685,"PAM":219,"PI":889,"USFP":4,"MP":146}],["Tamanarte","RNI",2950,21,0,{"RNI":1415,"PAM":389,"PI":795,"MP":342,"PPS":9}],["Tata (Mun.)","RNI",5581,12.2,1,{"RNI":2033,"PAM":1350,"PI":753,"USFP":17,"MP":864,"PPS":51,"PJD":513}],["Tigzmerte","PI",1806,14.3,0,{"RNI":211,"PAM":433,"PI":691,"MP":400,"PPS":36,"PJD":35}],["Tissint","RNI",4803,6.2,0,{"RNI":2171,"PAM":1871,"PI":243,"USFP":3,"MP":326,"PJD":189}],["Tizaghte","RNI",1535,2.1,0,{"RNI":519,"PAM":29,"PI":486,"USFP":43,"MP":458}],["Tizounine","RNI",1456,16,0,{"RNI":571,"PAM":276,"PI":338,"MP":77,"PPS":28,"PJD":166}],["Tlite","PAM",1990,1.2,0,{"RNI":700,"PAM":724,"PI":141,"MP":425}]],"Taza":[["Ait Saghrouchen","RNI",5055,16.3,0,{"RNI":2006,"PAM":1181,"PI":434,"USFP":24,"MP":919,"UC":325,"PPS":3,"PJD":163}],["Ajdir","RNI",3236,6.9,0,{"RNI":1669,"PAM":1446,"PI":68,"MP":40,"PJD":13}],["Aknoul (Mun.)","PAM",1469,64.3,1,{"RNI":186,"PAM":1130,"PI":63,"USFP":14,"UC":76}],["Bab Boudir","MP",2124,25.6,0,{"RNI":179,"PAM":11,"PI":542,"MP":1085,"UC":167,"PPS":140}],["Bab Marzouka","PPS",6007,6.4,0,{"RNI":1235,"PAM":1010,"PI":401,"USFP":106,"MP":1355,"UC":159,"PPS":1738,"PJD":3}],["Bni Frassen","PAM",5810,4,0,{"RNI":259,"PAM":2272,"PI":2041,"USFP":404,"MP":797,"UC":37}],["Bni Ftah","PAM",2859,15.6,0,{"RNI":152,"PAM":1365,"PI":918,"USFP":251,"PPS":171,"PJD":2}],["Bni Lent","MP",3329,43,0,{"RNI":675,"PI":501,"USFP":10,"MP":2105,"PPS":33,"PJD":5}],["Bouchfaa","RNI",2966,15.8,0,{"RNI":1080,"PAM":612,"PI":227,"USFP":152,"UC":541,"PPS":354}],["Bouhlou","RNI",2504,25,0,{"RNI":1149,"PAM":339,"PI":523,"USFP":239,"UC":195,"PPS":49,"PJD":10}],["Bourd","PAM",2994,53.3,0,{"RNI":465,"PAM":2060,"PI":461,"MP":8}],["Bouyablane","MP",1035,17.6,0,{"RNI":142,"PAM":254,"MP":436,"UC":203}],["Brarha","PAM",1661,36.2,0,{"RNI":392,"PAM":994,"PI":10,"MP":265}],["El Gouzate","RNI",2783,0.8,0,{"RNI":1108,"PAM":1085,"PI":14,"USFP":43,"MP":443,"PPS":90}],["Galdamane","PPS",7290,37.9,0,{"RNI":178,"PAM":333,"PI":1195,"USFP":140,"MP":1272,"UC":3,"PPS":4032,"PJD":137}],["Ghiata Al Gharbia","RNI",1618,15.9,0,{"RNI":868,"PAM":5,"PI":54,"USFP":610,"PPS":81}],["Gzenaya Al Janoubia","PAM",2962,43.4,0,{"RNI":681,"PAM":1966,"PI":135,"USFP":180}],["Jbarna","RNI",1116,20,0,{"RNI":506,"PAM":283,"PI":129,"USFP":158,"MP":22,"PJD":18}],["Kaf El Ghar","PAM",2626,1,0,{"RNI":854,"PAM":880,"PI":788,"UC":85,"PPS":19}],["Maghraoua","PI",3068,11,0,{"RNI":37,"PAM":759,"PI":1095,"USFP":327,"MP":97,"UC":510,"PPS":243}],["Matmata","PAM",4657,5.1,0,{"RNI":1379,"PAM":1617,"PI":68,"MP":186,"UC":1373,"PJD":34}],["Meknassa Acharqia","MP",1878,20.9,0,{"RNI":187,"PAM":1,"PI":552,"USFP":77,"MP":945,"UC":39,"PPS":77}],["Meknassa Al Gharbia","PI",1677,19.6,0,{"RNI":18,"PAM":452,"PI":781,"MP":377,"PPS":49}],["Msila","RNI",3033,6.4,0,{"RNI":892,"PAM":124,"PI":660,"USFP":462,"MP":698,"PPS":197}],["Oued Amlil (Mun.)","RNI",2206,37.7,1,{"RNI":1271,"PI":439,"USFP":384,"PPS":107,"PJD":5}],["Oulad Chrif","MP",2713,4.5,0,{"RNI":742,"PAM":897,"PI":1,"MP":1018,"PPS":38,"PJD":17}],["Oulad Zbair","PAM",5126,15.1,0,{"RNI":314,"PAM":2611,"PI":1836,"USFP":42,"MP":314,"PJD":9}],["Rbaa El Fouki","MP",2046,0.7,0,{"RNI":145,"PAM":448,"PI":716,"USFP":7,"MP":730}],["Sidi Ali Bourakba","RNI",2681,18.6,0,{"RNI":1188,"PAM":669,"PI":67,"USFP":69,"PPS":688}],["Smià","MP",2817,18.3,0,{"RNI":452,"PAM":2,"PI":114,"MP":1166,"UC":651,"PPS":418,"PJD":14}],["Tahla (Mun.)","UC",9426,25.2,1,{"RNI":957,"PAM":979,"PI":674,"USFP":1331,"MP":116,"UC":3805,"PPS":1434,"PJD":130}],["Taifa","RNI",2000,20,0,{"RNI":891,"PAM":396,"PI":78,"USFP":119,"MP":492,"PPS":24}],["Tainaste","PPS",2919,3.4,0,{"RNI":273,"PAM":47,"PI":683,"USFP":20,"MP":790,"UC":182,"PPS":888,"PJD":36}],["Taza (Mun.)","RNI",13788,4.3,1,{"RNI":3056,"PAM":1664,"PI":2464,"USFP":1122,"MP":2350,"UC":435,"PPS":1630,"PJD":1067}],["Tazarine","RNI",1161,23.6,0,{"RNI":518,"PAM":49,"PI":244,"MP":132,"UC":129,"PPS":89}],["Tizi Ouasli","PPS",2499,25.7,0,{"RNI":832,"PAM":7,"PI":3,"USFP":26,"UC":61,"PPS":1474,"PJD":96}],["Traiba","MP",2262,24.2,0,{"RNI":345,"PAM":444,"PI":417,"USFP":3,"MP":991,"PPS":62}],["Zrarda","PAM",3813,8,0,{"PAM":1188,"PI":841,"USFP":263,"MP":3,"UC":635,"PPS":883}]],"Tifelt - Rommani":[["Ain Johra -Sidi Boukhalkhal","RNI",4649,44.6,0,{"RNI":2930,"PAM":858,"PI":548,"USFP":1,"UC":5,"PPS":219,"PJD":88}],["Ain Sbit","PAM",3321,20.1,0,{"RNI":1252,"PAM":1921,"PI":3,"UC":120,"PJD":25}],["Ait Ali ou Lahcen","RNI",2246,47.9,0,{"RNI":1519,"PAM":162,"MP":122,"UC":443}],["Ait Belkacem","RNI",1399,50.6,0,{"RNI":1011,"PAM":45,"PI":40,"PPS":303}],["Ait Buyahya El Hajjama","PI",1263,1,0,{"RNI":578,"PI":591,"USFP":93,"PPS":1}],["Ait Malek","RNI",1396,75.5,0,{"RNI":1167,"PAM":42,"PI":74,"MP":113}],["Brachoua","PAM",4231,3,0,{"RNI":1609,"PAM":1734,"PI":330,"MP":105,"UC":29,"PPS":424}],["Ezzhiliga","PAM",7331,10.4,0,{"RNI":509,"PAM":3581,"PI":2817,"USFP":18,"MP":168,"PPS":91,"PJD":147}],["Houderrane","RNI",1662,71.5,0,{"RNI":1350,"PAM":117,"PI":34,"MP":161}],["Jemaat Moul Blad","PI",2477,4.4,0,{"RNI":468,"PAM":949,"PI":1058,"PPS":2}],["Khemis Sidi Yahya","PPS",1881,60.8,0,{"RNI":369,"PPS":1512}],["Laghoualem","PAM",5059,16.3,0,{"RNI":1658,"PAM":2485,"PI":765,"USFP":14,"MP":8,"UC":76,"PPS":53}],["M'qam Tolba","RNI",4576,69,0,{"RNI":3629,"PAM":470,"PI":4,"USFP":18,"UC":329,"PPS":126}],["Marchouch","RNI",4315,1.8,0,{"RNI":1691,"PAM":1612,"PI":560,"USFP":157,"UC":121,"PPS":47,"PJD":127}],["Moulay Driss Aghbal","RNI",2082,17.8,0,{"RNI":1150,"PAM":780,"PI":58,"MP":68,"PPS":26}],["Rommani (Mun.)","PAM",4269,3.7,1,{"RNI":1673,"PAM":1833,"PI":303,"USFP":35,"PPS":425}],["Sidi Abderrazak","PAM",3707,50.2,0,{"RNI":697,"PAM":2559,"PI":344,"USFP":5,"PPS":72,"PJD":30}],["Sidi Allal El Bahraoui (Mun.)","RNI",4763,76.5,1,{"RNI":4070,"PAM":90,"PI":426,"USFP":66,"MP":111}],["Sidi Allal Lamsadder","RNI",1864,74.9,0,{"RNI":1600,"PAM":204,"PI":12,"MP":24,"UC":23,"PPS":1}],["Tiflet (Mun.)","RNI",4068,1.3,1,{"RNI":683,"PAM":630,"PI":454,"USFP":486,"MP":585,"UC":572,"PPS":398,"PJD":260}]],"Tinghir":[["Ait El Farsi","PAM",1653,22.6,0,{"RNI":555,"PAM":928,"MP":111,"PPS":59}],["Ait Hani","PAM",3028,13.7,0,{"RNI":795,"PAM":1209,"PI":253,"UC":712,"PPS":59}],["Ait Ouassif","RNI",2924,15.2,0,{"RNI":1532,"PAM":8,"PI":1088,"USFP":99,"PPS":110,"PJD":87}],["Ait Sedrate JbelEl Oulia","RNI",1400,26.4,0,{"RNI":774,"PAM":32,"PI":31,"USFP":32,"MP":126,"PPS":405}],["Ait Sedrate JbelEL Soufla","RNI",2251,5.3,0,{"RNI":872,"PAM":11,"PI":248,"USFP":210,"MP":158,"PPS":752}],["Ait Sedrate Sahl Charkia","RNI",5074,39.5,0,{"RNI":2967,"PAM":538,"PI":964,"USFP":539,"PPS":47,"PJD":19}],["Ait Sedrate Sahl El Gharbia","RNI",6177,12.3,0,{"RNI":2919,"PAM":136,"PI":2160,"USFP":567,"PPS":253,"PJD":142}],["Ait Youl","RNI",1937,13.3,0,{"RNI":1013,"PAM":169,"PPS":755}],["Alnif","PPS",5535,38.6,0,{"RNI":521,"PAM":1055,"PI":21,"MP":543,"PPS":3190,"PJD":205}],["Assoul","RNI",3069,20,0,{"RNI":1198,"PAM":417,"PI":69,"USFP":135,"MP":523,"UC":144,"PPS":583}],["Boumalne Dades (Mun.)","PPS",4209,13.5,1,{"RNI":161,"PAM":1162,"PI":763,"USFP":341,"MP":52,"PPS":1730}],["H'Ssyia","PPS",4949,5,0,{"RNI":2211,"PAM":216,"PI":52,"MP":11,"PPS":2459}],["Ighil N'Oumgoun","RNI",5834,40.6,0,{"RNI":3280,"PAM":462,"PI":505,"USFP":196,"MP":914,"PPS":123,"PJD":354}],["Ikniouen","RNI",6811,3.8,0,{"RNI":3000,"PAM":2739,"PI":291,"USFP":7,"MP":33,"PPS":575,"PJD":166}],["Imider","RNI",2259,11.5,0,{"RNI":877,"PAM":365,"PI":81,"USFP":14,"MP":52,"PPS":252,"PJD":618}],["Kalaat M'Gouna (Mun.)","RNI",4738,62.7,1,{"RNI":3629,"PI":88,"USFP":160,"MP":7,"PPS":196,"PJD":658}],["M'Semrir","RNI",2475,22.6,0,{"RNI":1355,"PAM":273,"PI":52,"PPS":795}],["M'Ssici","PPS",2182,26.8,0,{"RNI":562,"PAM":72,"PI":43,"MP":358,"PPS":1147}],["Ouaklim","PAM",3152,14.6,0,{"RNI":310,"PAM":1609,"PI":68,"USFP":17,"PPS":1148}],["Souk Lakhmis Dades","RNI",5715,22.5,0,{"RNI":2810,"PAM":263,"PI":1524,"USFP":113,"PPS":991,"PJD":14}],["Taghzoute N'Ait Atta","RNI",5569,5.4,0,{"RNI":2480,"PAM":2182,"PI":108,"MP":178,"PPS":621}],["Tilmi","RNI",2544,78.7,0,{"RNI":2225,"PAM":224,"PPS":95}],["Tinghir (Mun.)","RNI",9745,0.2,1,{"RNI":3204,"PAM":3180,"PI":71,"USFP":1524,"MP":516,"PPS":849,"PJD":401}],["Toudgha El Oulia","PPS",2160,0.2,0,{"RNI":288,"PAM":627,"USFP":436,"MP":50,"PPS":631,"PJD":128}],["Toudgha Essoufla","PPS",4452,4.9,0,{"RNI":108,"PAM":1917,"PI":16,"USFP":134,"PPS":2134,"PJD":143}]],"Tiznit":[["Afella Ighir","RNI",1212,36.4,0,{"RNI":718,"PAM":179,"PI":277,"USFP":36,"PPS":2}],["Ait Issafen","RNI",1164,45.4,0,{"RNI":712,"PAM":100,"PI":184,"USFP":144,"PPS":24}],["Ait Ouafqa","RNI",1461,48.3,0,{"RNI":1029,"PAM":323,"PI":21,"USFP":4,"PPS":84}],["Ammelne","RNI",1174,72.2,0,{"RNI":952,"PAM":33,"PI":104,"PPS":85}],["Anzi","RNI",3068,13.2,0,{"RNI":1594,"PAM":191,"PI":1189,"USFP":4,"MP":1,"UC":8,"PPS":3,"PJD":78}],["Arbaa Ait Ahmed","RNI",2262,50.1,0,{"RNI":1509,"PAM":102,"PI":376,"USFP":77,"UC":29,"PPS":123,"PJD":46}],["Arbaa Rasmouka","RNI",2771,58.4,0,{"RNI":2091,"PAM":93,"PI":472,"PPS":77,"PJD":38}],["Arbaa Sahel","RNI",4881,38.9,0,{"RNI":2882,"PAM":16,"PI":337,"USFP":180,"MP":140,"PPS":985,"PJD":341}],["Bounaamane","RNI",4369,34,0,{"RNI":2505,"PAM":68,"PI":1018,"USFP":85,"PPS":62,"PJD":631}],["El Maader El Kabir","RNI",2801,28.1,0,{"RNI":1410,"PAM":154,"PI":367,"USFP":151,"MP":12,"PPS":83,"PJD":624}],["Ida Ou Gougmar","RNI",1774,2.9,0,{"RNI":764,"PAM":712,"PI":112,"USFP":7,"PPS":179}],["Irigh N'Tahala","RNI",666,55,0,{"RNI":516,"PAM":150}],["Ouijjane","RNI",2443,56.7,0,{"RNI":1846,"PAM":3,"PPS":134,"PJD":460}],["Reggada","RNI",5234,44.6,0,{"RNI":3093,"PAM":403,"PI":758,"USFP":400,"UC":31,"PPS":200,"PJD":349}],["Sidi Ahmed Ou Moussa","RNI",1635,36.2,0,{"RNI":1057,"PAM":89,"USFP":465,"PJD":24}],["Sidi Bouabdelli","RNI",3193,9.5,0,{"RNI":1257,"PAM":386,"PI":954,"USFP":193,"PPS":217,"PJD":186}],["Tafraout (Mun.)","RNI",2156,38.7,1,{"RNI":1389,"PAM":50,"USFP":138,"PPS":555,"PJD":24}],["Tafraout El Mouloud","PI",1371,3.2,0,{"RNI":656,"PI":700,"USFP":1,"PPS":4,"PJD":10}],["Tarsouat","RNI",1133,52.3,0,{"RNI":739,"PAM":147,"PI":72,"USFP":5,"PPS":130,"PJD":40}],["Tassrirt","RNI",679,55.1,0,{"RNI":493,"PAM":119,"USFP":28,"PPS":38,"PJD":1}],["Tighmi","RNI",2166,74.6,0,{"RNI":1783,"PAM":153,"PI":168,"PPS":61,"PJD":1}],["Tiznit (Mun.)","RNI",10950,34.1,1,{"RNI":5338,"PAM":200,"PI":459,"USFP":1573,"MP":158,"UC":678,"PPS":1600,"PJD":944}],["Tizoughrane","RNI",1596,25.2,0,{"RNI":932,"PAM":530,"PI":134}],["Tnine Aday","RNI",840,26.2,0,{"RNI":502,"PI":20,"USFP":282,"PPS":36}],["Tnine Aglou","RNI",4068,38,0,{"RNI":2164,"PAM":239,"PI":385,"USFP":329,"UC":175,"PPS":619,"PJD":157}]],"Tétouan":[["Ain Lahsan","PAM",2692,8.1,0,{"RNI":805,"PAM":1024,"PI":786,"USFP":2,"UC":75}],["Al Hamra","RNI",3142,2.6,0,{"RNI":1278,"PAM":521,"PI":1196,"USFP":75,"MP":52,"UC":20}],["AL Kharroub","PAM",945,88.6,0,{"RNI":35,"PAM":872,"PI":34,"MP":4}],["Al Oued","RNI",3534,0,0,{"RNI":1135,"PAM":226,"PI":1134,"USFP":934,"UC":105}],["Azla","PAM",5526,56.4,0,{"RNI":9,"PAM":3835,"PI":247,"USFP":139,"MP":559,"UC":718,"PJD":19}],["Bghaghza","RNI",2174,77.2,0,{"RNI":1852,"PAM":149,"PI":173}],["Bni Harchen","PAM",2606,22.6,0,{"RNI":805,"PAM":1395,"PI":400,"PJD":6}],["Bni Idder","PAM",2034,7.8,0,{"RNI":938,"PAM":1096}],["Bni Leit","PAM",1586,2.6,0,{"PAM":546,"PI":66,"USFP":141,"MP":33,"UC":504,"PJD":296}],["Bni Said","PAM",2921,19.7,0,{"RNI":1065,"PAM":1639,"USFP":55,"UC":162}],["Dar Bni Karrich","RNI",2836,9.4,1,{"RNI":1181,"PAM":913,"PI":370,"USFP":36,"MP":6,"UC":247,"PPS":9,"PJD":74}],["Jbel Lahbib","RNI",1538,9.6,0,{"RNI":580,"PAM":433,"PI":59,"MP":81,"UC":74,"PJD":311}],["Mallalienne","PAM",3211,16.9,0,{"RNI":1121,"PAM":1664,"PI":78,"MP":17,"UC":222,"PPS":96,"PJD":13}],["Oued Laou (Mun.)","USFP",2911,20.7,1,{"RNI":406,"PAM":61,"PI":722,"USFP":1325,"MP":397}],["Oulad Ali Mansour","RNI",1353,9.4,0,{"RNI":676,"PAM":549,"PI":81,"USFP":47}],["Saddina","PAM",2504,48.4,0,{"RNI":105,"PAM":1757,"PI":545,"UC":53,"PJD":44}],["Sahtryine","RNI",2728,7.5,0,{"RNI":1308,"PAM":1103,"PI":191,"USFP":11,"MP":75,"UC":40}],["Souk Kdim","PAM",2729,34.1,0,{"RNI":173,"PAM":1653,"PI":722,"UC":120,"PPS":61}],["Tétouan (Mun.)","RNI",26218,21.9,1,{"RNI":10124,"PAM":2328,"PI":4379,"USFP":2241,"MP":881,"UC":2402,"PPS":2339,"PJD":1524}],["Zaitoune","PAM",3332,44.2,0,{"RNI":663,"PAM":2137,"PI":42,"USFP":10,"UC":117,"PPS":11,"PJD":352}],["Zaouiat Sidi Kacem","PAM",3300,31.9,0,{"RNI":912,"PAM":1964,"MP":357,"PPS":67}],["Zinat","RNI",2543,54.4,0,{"RNI":1891,"PAM":98,"PI":3,"MP":2,"UC":508,"PJD":41}]],"Youssoufia":[["Atiamim","PAM",2661,20.2,0,{"RNI":73,"PAM":1316,"PI":479,"MP":779,"UC":14}],["Echemmaia (Mun.)","PI",8539,14,1,{"RNI":1334,"PAM":2279,"PI":3472,"USFP":82,"MP":1330,"UC":36,"PJD":6}],["El Gantour","PI",5733,35.8,0,{"RNI":331,"PAM":830,"PI":3055,"USFP":143,"MP":288,"UC":1001,"PPS":52,"PJD":33}],["Esbiaat","PAM",4515,32.5,0,{"RNI":891,"PAM":2360,"PI":579,"USFP":36,"MP":249,"UC":147,"PPS":8,"PJD":245}],["Ighoud","RNI",6941,14.2,0,{"RNI":2953,"PAM":1964,"PI":1252,"MP":250,"UC":32,"PJD":490}],["Jdour","PI",6206,4.6,0,{"RNI":1325,"PAM":1997,"PI":2281,"MP":335,"UC":84,"PPS":17,"PJD":167}],["Jnane Bouih","PI",6522,29.2,0,{"RNI":786,"PAM":1434,"PI":3338,"USFP":54,"MP":377,"UC":516,"PJD":17}],["Lakhoualqa","RNI",4493,19.2,0,{"RNI":2028,"PAM":1166,"PI":2,"USFP":174,"MP":840,"UC":283}],["Ras El Ain","RNI",6090,3.5,0,{"RNI":2376,"PAM":1282,"PI":9,"MP":96,"UC":2162,"PPS":165}],["Sidi Chiker","PAM",6874,32.1,0,{"RNI":922,"PAM":3499,"PI":1295,"USFP":12,"MP":413,"UC":729,"PPS":4}],["Youssoufia (Mun.)","PAM",6336,10.4,1,{"RNI":1386,"PAM":2044,"PI":692,"USFP":740,"MP":667,"UC":147,"PPS":323,"PJD":337}]],"Zagora":[["Afella N'Dra","MP",3172,4,0,{"RNI":120,"PAM":38,"PI":1002,"USFP":855,"MP":1129,"PJD":28}],["Afra","PI",2548,1.8,0,{"RNI":844,"PAM":17,"PI":889,"USFP":523,"MP":264,"PPS":11}],["Agdz (Mun.)","RNI",4248,6.7,1,{"RNI":1778,"PAM":37,"PI":460,"USFP":1493,"MP":323,"PPS":47,"PJD":110}],["Ait Boudaoud","PI",3120,7.7,0,{"RNI":1170,"PAM":1,"PI":1411,"MP":405,"PPS":133}],["Ait Ouallal","RNI",5745,15.8,0,{"RNI":3252,"PI":2345,"MP":148}],["Bleida","USFP",1308,50,0,{"RNI":63,"PAM":105,"USFP":897,"MP":243}],["Bni Zoli","USFP",5141,14.6,0,{"PAM":11,"PI":1774,"USFP":2527,"MP":672,"PJD":157}],["Bouzeroual","USFP",2599,7.4,0,{"RNI":326,"PAM":14,"PI":107,"USFP":1172,"MP":980}],["Errouha","USFP",1625,52.4,0,{"RNI":97,"PAM":15,"USFP":1182,"MP":331}],["Fezouata","RNI",2633,8.4,0,{"RNI":1064,"PAM":115,"PI":23,"USFP":844,"MP":173,"PPS":243,"PJD":171}],["Ktaoua","RNI",3187,5.9,0,{"RNI":1220,"PAM":344,"PI":159,"MP":422,"PPS":1033,"PJD":9}],["M'Hamid El Ghizlane","RNI",2368,3,0,{"RNI":991,"PAM":277,"PI":920,"MP":170,"UC":3,"PJD":7}],["Mezguita","PI",2686,0.4,0,{"RNI":730,"PAM":5,"PI":740,"USFP":177,"MP":139,"PPS":501,"PJD":394}],["N'Kob","PI",3078,29.3,0,{"RNI":229,"PAM":56,"PI":1571,"USFP":368,"MP":668,"PPS":186}],["Oulad Yahia Lagraire","RNI",2963,7.1,0,{"RNI":1102,"PAM":152,"PI":331,"USFP":892,"MP":342,"PPS":144}],["Taftechna","PI",2078,39,0,{"RNI":512,"PAM":17,"PI":1322,"MP":227}],["Taghbalte","RNI",3778,16.4,0,{"RNI":1623,"PI":696,"USFP":191,"MP":1002,"PPS":266}],["Tagounite","USFP",4772,33.3,0,{"RNI":646,"PAM":221,"PI":526,"USFP":2270,"MP":148,"UC":1,"PPS":680,"PJD":280}],["Tamegroute","RNI",4943,8,0,{"RNI":1688,"PAM":126,"PI":946,"USFP":1294,"MP":264,"PPS":127,"PJD":498}],["Tamezmoute","RNI",3121,1.6,0,{"RNI":1533,"PAM":21,"PI":1482,"USFP":18,"MP":57,"PJD":10}],["Tansifte","PI",3892,4,0,{"RNI":1158,"PAM":410,"PI":1313,"USFP":576,"MP":394,"PPS":41}],["Tazarine","RNI",5167,5.3,0,{"RNI":2397,"PAM":220,"PI":2121,"MP":202,"PPS":227}],["Ternata","USFP",3955,3,0,{"RNI":527,"PAM":401,"PI":160,"USFP":1057,"MP":738,"PPS":132,"PJD":940}],["Tinzouline","USFP",3954,36.4,0,{"RNI":580,"PAM":4,"PI":7,"USFP":2214,"MP":218,"PPS":158,"PJD":773}],["Zagora (Mun.)","USFP",9588,0.9,1,{"RNI":1541,"PAM":617,"PI":480,"USFP":2940,"MP":2849,"UC":1,"PPS":768,"PJD":392}]]};
const COMMUNES=Object.fromEntries(Object.entries(_CR).map(([d,cs])=>[d,cs.map(c=>({n:c[0],w:c[1],t:c[2],m:c[3],u:c[4],v:c[5]}))]));

async function loadAppData(){
  // Data is inline — no fetch needed
  return true;
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

// Auto-boot: when app.js finishes loading, init if session exists
(function(){
  // Session key is set by index.html when password is correct
  // Just check it exists — the password was already validated at login
  const sk = sessionStorage.getItem('intelx_s');
  if(sk) {
    const overlay = document.getElementById('login-overlay');
    if(overlay) overlay.classList.add('hidden');
    init();
  }
})();
