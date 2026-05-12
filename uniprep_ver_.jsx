import React, { useState, useEffect, useRef } from "react";
import * as Recharts from 'recharts';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  LineChart, 
  Line 
} from 'recharts';
import * as LucideIcons from 'lucide-react';
/* ── KaTeX (robust loader) ─────────────────────────────────────────────── */
let _kReady = false; const _kQ = [];
function loadKaTeX(cb) {
  if (_kReady) { cb(); return; }
  _kQ.push(cb);
  if (document.getElementById('up-ktx')) return;
  const css = document.createElement('link'); css.rel='stylesheet';
  css.href='https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.css';
  document.head.appendChild(css);
  const js = document.createElement('script'); js.id='up-ktx';
  js.src='https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.js';
  js.onload=()=>{ _kReady=true; _kQ.splice(0).forEach(f=>f()); };
  document.head.appendChild(js);
}
function Tex({ tex, display=false }) {
  const el=useRef(); const [v,setV]=useState(0);
  useEffect(()=>{ loadKaTeX(()=>setV(n=>n+1)); },[]);
  useEffect(()=>{
    if(!el.current) return;
    if(window.katex){ try{ window.katex.render(tex,el.current,{displayMode:display,throwOnError:false}); }catch{ el.current.textContent=tex; } }
    else el.current.textContent=tex;
  });
  return <span ref={el}/>;
}
const isMath=t=>t&&(/[\\^_{}]/.test(t)||['frac','sqrt','cdot','sin','cos','tan','leq','geq','pm','infty','text','begin'].some(k=>t.includes(k)));
function TeX({ t }) { return isMath(t)?<Tex tex={t}/>:<span>{t}</span>; }

/* ── Icons ─────────────────────────────────────────────────────────────── */
const P={
  home:"M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
  book:"M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
  chart:"M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
  warn:"M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z",
  plus:"M12 4v16m8-8H4",
  list:"M4 6h16M4 10h16M4 14h16M4 18h16",
  cog:"M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z",
  cR:"M9 5l7 7-7 7", cL:"M15 19l-7-7 7-7", cD:"M19 9l-7 7-7-7", cU:"M5 15l7-7 7 7",
  check:"M5 13l4 4L19 7", cross:"M6 18L18 6M6 6l12 12",
  trash:"M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16",
  bm:"M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z",
  flag:"M3 21V5a1 1 0 011-1h12l-3 5 3 5H4",
  img:"M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z",
  dl:"M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4",
  up:"M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12",
  pause:"M10 9v6m4-6v6",
  play:"M9 5l10 6.5L9 18V5z",
  tgt:"M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
};
function Ic({n,s=16,c="currentColor"}) {
  return <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} style={{flexShrink:0}}><path d={P[n]}/></svg>;
}

/* ── DATA ──────────────────────────────────────────────────────────────── */
const INIT_SUBJECTS = [
  {id:"math",   name:"Matematika",       color1:"#1D4ED8",color2:"#3B82F6",
   categories:[
    {id:"alg", name:"Algebra",           skills:[{id:"s1",name:"Chiziqli tenglamalar"},{id:"s2",name:"Kvadrat tenglamalar"},{id:"s3",name:"Tengsizliklar"},{id:"s4",name:"Funksiyalar"}]},
    {id:"geo", name:"Geometriya",        skills:[{id:"s5",name:"Uchburchaklar"},{id:"s6",name:"Doira va to'rtburchaklar"},{id:"s7",name:"Stereometriya"}]},
    {id:"tri", name:"Trigonometriya",    skills:[{id:"s8",name:"Asosiy funksiyalar"},{id:"s9",name:"Trigonometrik tenglamalar"}]},
    {id:"sta", name:"Statistika",        skills:[{id:"s10",name:"O'rtacha qiymat"},{id:"s11",name:"Ehtimollik"},{id:"s12",name:"Kombinatorika"}]},
   ]},
  {id:"uzbek",  name:"O'zbek tili",      color1:"#6D28D9",color2:"#8B5CF6",
   categories:[
    {id:"grm", name:"Grammatika",        skills:[{id:"s13",name:"So'z turkumlari"},{id:"s14",name:"Gap bo'laklari"},{id:"s15",name:"Imlo qoidalari"}]},
    {id:"lex", name:"Leksika",           skills:[{id:"s16",name:"Sinonimlar"},{id:"s17",name:"Frazeologizmlar"}]},
    {id:"txt", name:"Matn tahlili",      skills:[{id:"s18",name:"Matn tuzilishi"},{id:"s19",name:"Uslubiyat"}]},
   ]},
  {id:"history",name:"O'zbekiston tarixi",color1:"#B45309",color2:"#D97706",
   categories:[
    {id:"anc", name:"Qadimgi davr",      skills:[{id:"s20",name:"Ilk sivilizatsiyalar"},{id:"s21",name:"Buyuk Ipak yo'li"}]},
    {id:"med", name:"O'rta asrlar",      skills:[{id:"s22",name:"Amir Temur davri"},{id:"s23",name:"Temuriylar"}]},
    {id:"mod", name:"Mustaqillik davri", skills:[{id:"s24",name:"Mustaqillik"},{id:"s25",name:"Islohotlar"}]},
   ]},
  {id:"english",name:"Ingliz tili",      color1:"#065F46",color2:"#10B981",
   categories:[
    {id:"egr", name:"Grammar",           skills:[{id:"s26",name:"Tenses"},{id:"s27",name:"Conditionals"},{id:"s28",name:"Passive voice"}]},
    {id:"evoc",name:"Vocabulary",        skills:[{id:"s29",name:"Academic words"},{id:"s30",name:"Phrasal verbs"}]},
    {id:"erd", name:"Reading",           skills:[{id:"s31",name:"Text analysis"},{id:"s32",name:"Inference"}]},
   ]},
  {id:"physics",name:"Fizika",           color1:"#1E293B",color2:"#475569",
   categories:[
    {id:"mec", name:"Mexanika",          skills:[{id:"s33",name:"Kinematika"},{id:"s34",name:"Dinamika"}]},
    {id:"elc", name:"Elektr",            skills:[{id:"s35",name:"Elektr tok"},{id:"s36",name:"Magnit maydon"}]},
   ]},
];

const INIT_QUESTIONS = [
  // ── ALGEBRA: Chiziqli tenglamalar (s1) ──────────────────────────────
  {id:1, sub:"math",sk:"s1",dif:"Oson",  pass:"",img:null,q:"Tenglamani yeching:",     m:"3x + 7 = 22",            opts:["x = 3","x = 5","x = 7","x = 9"],         ans:1,expl:"3x=15, x=5."},
  {id:2, sub:"math",sk:"s1",dif:"Oson",  pass:"",img:null,q:"Tenglamani yeching:",     m:"2x - 5 = 11",            opts:["x=6","x=7","x=8","x=9"],                  ans:2,expl:"2x=16, x=8."},
  {id:3, sub:"math",sk:"s1",dif:"Oson",  pass:"",img:null,q:"Tenglamani yeching:",     m:"5x + 3 = 28",            opts:["x=4","x=5","x=6","x=7"],                  ans:1,expl:"5x=25, x=5."},
  {id:4, sub:"math",sk:"s1",dif:"O'rta", pass:"",img:null,q:"Tenglamani yeching:",     m:"4(x-2) = 16",            opts:["x=4","x=5","x=6","x=7"],                  ans:2,expl:"4x-8=16, x=6."},
  {id:5, sub:"math",sk:"s1",dif:"O'rta", pass:"",img:null,q:"Tenglamani yeching:",     m:"2(3x+1)=20",             opts:["x=2","x=3","x=4","x=5"],                  ans:1,expl:"6x+2=20, x=3."},
  {id:6, sub:"math",sk:"s1",dif:"Oson",  pass:"",img:null,q:"x ni toping:",            m:"\\frac{x}{3}+4=7",       opts:["x=6","x=7","x=8","x=9"],                  ans:3,expl:"x/3=3, x=9."},
  {id:7, sub:"math",sk:"s1",dif:"O'rta", pass:"",img:null,q:"x ni toping:",            m:"3x-7=2x+5",              opts:["x=10","x=11","x=12","x=13"],              ans:2,expl:"x=12."},
  {id:8, sub:"math",sk:"s1",dif:"Qiyin", pass:"",img:null,q:"x ni toping:",            m:"5(x+2)=3(x+8)",          opts:["x=5","x=6","x=7","x=8"],                  ans:2,expl:"5x+10=3x+24, 2x=14, x=7."},
  {id:9, sub:"math",sk:"s1",dif:"Qiyin", pass:"",img:null,q:"Sistemani yeching:",      m:"\\begin{cases}x+y=10\\\\x-y=4\\end{cases}", opts:["x=6,y=4","x=7,y=3","x=8,y=2","x=5,y=5"], ans:1,expl:"2x=14, x=7, y=3."},
  {id:10,sub:"math",sk:"s1",dif:"O'rta", pass:"",img:null,q:"x ni toping:",            m:"\\frac{2x+1}{3}=5",      opts:["x=7","x=8","x=7.5","x=6"],                ans:0,expl:"2x+1=15, 2x=14, x=7."},
  // ── Kvadrat tenglamalar (s2) ───────────────────────────────────────
  {id:11,sub:"math",sk:"s2",dif:"O'rta", pass:"",img:null,q:"Ildizlar yig'indisi:",    m:"x^2-5x+6=0",             opts:["3","4","5","6"],                           ans:2,expl:"Viet: x₁+x₂=5."},
  {id:12,sub:"math",sk:"s2",dif:"O'rta", pass:"",img:null,q:"Ildizlar ko'paytmasi:",   m:"x^2-7x+12=0",            opts:["10","11","12","14"],                       ans:2,expl:"Viet: x₁·x₂=12."},
  {id:13,sub:"math",sk:"s2",dif:"O'rta", pass:"",img:null,q:"Kichik ildizni toping:",  m:"x^2+5x+6=0",             opts:["-4","-3","-2","-1"],                       ans:1,expl:"(x+2)(x+3)=0 → x=-3."},
  {id:14,sub:"math",sk:"s2",dif:"Oson",  pass:"",img:null,q:"x ni toping:",            m:"2x^2-18=0",              opts:["x=\\pm 2","x=\\pm 3","x=\\pm 4","x=\\pm 5"],ans:1,expl:"x²=9, x=±3."},
  {id:15,sub:"math",sk:"s2",dif:"Oson",  pass:"",img:null,q:"x ni toping:",            m:"x^2-9=0",                opts:["x=\\pm 2","x=\\pm 3","x=\\pm 4","x=\\pm 5"],ans:1,expl:"x²=9, x=±3."},
  {id:16,sub:"math",sk:"s2",dif:"O'rta", pass:"",img:null,q:"Necha ildizi bor?",       m:"x^2-4x+4=0",             opts:["0 ta","1 ta","2 ta","3 ta"],               ans:1,expl:"(x-2)²=0, x=2 (bir ildiz)."},
  {id:17,sub:"math",sk:"s2",dif:"Qiyin", pass:"",img:null,q:"Diskriminantni hisoblang:",m:"x^2+3x+1=0",             opts:["3","5","7","9"],                           ans:1,expl:"D=b²-4ac=9-4=5."},
  {id:18,sub:"math",sk:"s2",dif:"Qiyin", pass:"",img:null,q:"Katta ildizni toping:",   m:"x^2-x-6=0",              opts:["2","3","4","6"],                           ans:1,expl:"(x-3)(x+2)=0, katta ildiz=3."},
  // ── Tengsizliklar (s3) ─────────────────────────────────────────────
  {id:19,sub:"math",sk:"s3",dif:"Oson",  pass:"",img:null,q:"Tengsizlikni yeching:",   m:"2x-3>7",                 opts:["x>3","x>4","x>5","x>6"],                  ans:2,expl:"2x>10, x>5."},
  {id:20,sub:"math",sk:"s3",dif:"Oson",  pass:"",img:null,q:"Tengsizlikni yeching:",   m:"3x+5\\leq 14",           opts:["x\\leq 2","x\\leq 3","x\\leq 4","x\\leq 5"],ans:1,expl:"3x≤9, x≤3."},
  {id:21,sub:"math",sk:"s3",dif:"O'rta", pass:"",img:null,q:"Tengsizlikni yeching:",   m:"-2x>8",                  opts:["x<-3","x<-4","x<-5","x<-6"],              ans:1,expl:"-2x>8 → x<-4 (belgi o'zgaradi)."},
  {id:22,sub:"math",sk:"s3",dif:"O'rta", pass:"",img:null,q:"Tengsizlikni yeching:",   m:"\\frac{x}{2}+1<4",       opts:["x<4","x<5","x<6","x<7"],                  ans:2,expl:"x/2<3, x<6."},
  {id:23,sub:"math",sk:"s3",dif:"Qiyin", pass:"",img:null,q:"Tengsizlikni yeching:",   m:"x^2-4>0",                opts:["x\\in(-2,2)","x<-2 \\text{ yoki } x>2","x>2","x<-2"],ans:1,expl:"x²>4 → |x|>2."},
  // ── Funksiyalar (s4) ───────────────────────────────────────────────
  {id:24,sub:"math",sk:"s4",dif:"Oson",  pass:"",img:null,q:"Hisoblang:",              m:"f(x)=2x+3,\\quad f(5)=?", opts:["11","12","13","14"],                      ans:2,expl:"f(5)=10+3=13."},
  {id:25,sub:"math",sk:"s4",dif:"Oson",  pass:"",img:null,q:"Hisoblang:",              m:"f(x)=x^2-1,\\quad f(3)=?",opts:["6","7","8","9"],                          ans:2,expl:"f(3)=9-1=8."},
  {id:26,sub:"math",sk:"s4",dif:"O'rta", pass:"",img:null,q:"Hisoblang:",              m:"f(x)=x^2+2x,\\quad f(-1)=?",opts:["-3","-2","-1","0"],                     ans:2,expl:"f(-1)=1-2=-1."},
  {id:27,sub:"math",sk:"s4",dif:"Qiyin", pass:"",img:null,q:"Teskari funksiya:",       m:"f(x)=2x+6,\\quad f^{-1}(x)=?",opts:["\\frac{x-6}{2}","\\frac{x+6}{2}","2x-6","x-3"],ans:0,expl:"y=2x+6 → f⁻¹(x)=(x-6)/2."},
  // ── Uchburchaklar (s5) ─────────────────────────────────────────────
  {id:28,sub:"math",sk:"s5",dif:"Oson",  pass:"",img:null,q:"Gipotenuzani toping:",    m:"a=3,\\; b=4,\\; c=?",    opts:["4","5","6","7"],                           ans:1,expl:"c=√(9+16)=5."},
  {id:29,sub:"math",sk:"s5",dif:"Oson",  pass:"",img:null,q:"Yuzini toping:",          m:"\\text{asos}=10,\\; h=6",opts:["25","28","30","36"],                       ans:2,expl:"S=(10×6)/2=30."},
  {id:30,sub:"math",sk:"s5",dif:"O'rta", pass:"",img:null,q:"Burchakni toping: A=50°, B=70°",m:"A+B+C=180^\\circ",opts:["55°","60°","65°","70°"],                   ans:1,expl:"C=180-50-70=60°."},
  {id:31,sub:"math",sk:"s5",dif:"Qiyin", pass:"",img:null,q:"O'xshash uchburchaklar 1:3. Kichik tomon=4:",m:"\\frac{a_1}{a_2}=\\frac{1}{3}",opts:["9","10","11","12"],ans:3,expl:"4×3=12."},
  // ── Doira (s6) ─────────────────────────────────────────────────────
  {id:32,sub:"math",sk:"s6",dif:"Oson",  pass:"",img:null,q:"Doira yuzi (π≈3.14):",   m:"r=5",                    opts:["70.5","75.5","78.5","80.5"],               ans:2,expl:"S=πr²=3.14×25=78.5."},
  {id:33,sub:"math",sk:"s6",dif:"Oson",  pass:"",img:null,q:"Doira uzunligi (π≈3.14):",m:"r=7",                   opts:["42.0","43.96","44.94","45.0"],             ans:1,expl:"C=2πr=2×3.14×7=43.96."},
  {id:34,sub:"math",sk:"s6",dif:"O'rta", pass:"",img:null,q:"Yarim doira yuzi (π≈3.14):",m:"r=6",                opts:["54.0","56.52","58.0","60.0"],              ans:1,expl:"S=πr²/2=3.14×36/2=56.52."},
  // ── Stereometriya (s7) ─────────────────────────────────────────────
  {id:35,sub:"math",sk:"s7",dif:"O'rta", pass:"",img:null,q:"Kub hajmi:",              m:"a=4",                    opts:["48","56","64","72"],                       ans:2,expl:"V=a³=64."},
  {id:36,sub:"math",sk:"s7",dif:"O'rta", pass:"",img:null,q:"Parallelepiped hajmi:",   m:"a=2,\\; b=3,\\; c=5",    opts:["25","28","30","32"],                       ans:2,expl:"V=2×3×5=30."},
  // ── Trigonometrik funksiyalar (s8) ─────────────────────────────────
  {id:37,sub:"math",sk:"s8",dif:"Oson",  pass:"",img:null,q:"Qiymatini toping:",       m:"\\sin(30^\\circ)",       opts:["\\frac{1}{4}","\\frac{1}{2}","\\frac{\\sqrt{2}}{2}","\\frac{\\sqrt{3}}{2}"],ans:1,expl:"sin30°=1/2."},
  {id:38,sub:"math",sk:"s8",dif:"Oson",  pass:"",img:null,q:"Qiymatini toping:",       m:"\\cos(60^\\circ)",       opts:["0","\\frac{1}{4}","\\frac{1}{2}","\\frac{\\sqrt{3}}{2}"],ans:2,expl:"cos60°=1/2."},
  {id:39,sub:"math",sk:"s8",dif:"Oson",  pass:"",img:null,q:"Qiymatini toping:",       m:"\\tan(45^\\circ)",       opts:["0","1","\\sqrt{2}","\\sqrt{3}"],           ans:1,expl:"tan45°=1."},
  {id:40,sub:"math",sk:"s8",dif:"Oson",  pass:"",img:null,q:"Asosiy trigonometrik tenglik:",m:"\\sin^2x+\\cos^2x=?",opts:["0","0.5","1","2"],                        ans:2,expl:"sin²x+cos²x=1 (asosiy ayniyat)."},
  {id:41,sub:"math",sk:"s8",dif:"O'rta", pass:"",img:null,q:"Qiymatini toping:",       m:"\\cos(0^\\circ)",        opts:["-1","0","\\frac{1}{2}","1"],               ans:3,expl:"cos0°=1."},
  // ── Trigonometrik tenglamalar (s9) ─────────────────────────────────
  {id:42,sub:"math",sk:"s9",dif:"O'rta", pass:"",img:null,q:"Tenglamani yeching [0°,360°]:",m:"2\\sin x=1",        opts:["x=30°","x=30° \\text{ va } 150°","x=60°","x=45°"],ans:1,expl:"sinx=1/2 → x=30° yoki 150°."},
  {id:43,sub:"math",sk:"s9",dif:"Qiyin", pass:"",img:null,q:"Tenglamani yeching [0°,360°]:",m:"\\cos x = -1",       opts:["x=90°","x=180°","x=270°","x=360°"],       ans:1,expl:"cosx=-1 → x=180°."},
  // ── O'rtacha qiymat (s10) ──────────────────────────────────────────
  {id:44,sub:"math",sk:"s10",dif:"Oson", pass:"",img:null,q:"O'rtacha qiymat:",        m:"\\{2,4,6,8,10\\}",       opts:["4","5","6","7"],                           ans:2,expl:"(2+4+6+8+10)/5=6."},
  {id:45,sub:"math",sk:"s10",dif:"Oson", pass:"",img:null,q:"Mediana:",                m:"\\{1,2,3,4,5\\}",        opts:["2","3","4","5"],                           ans:1,expl:"O'rtadagi son=3."},
  {id:46,sub:"math",sk:"s10",dif:"O'rta",pass:"",img:null,q:"Moda:",                   m:"\\{2,3,3,5,7,3,8\\}",    opts:["2","3","5","7"],                           ans:1,expl:"3 eng ko'p uchraydi."},
  {id:47,sub:"math",sk:"s10",dif:"O'rta",pass:"",img:null,q:"O'rtacha topish:",        m:"\\{3,7,7,13\\}",         opts:["7","7.5","8","8.5"],                       ans:1,expl:"(3+7+7+13)/4=30/4=7.5."},
  // ── Ehtimollik (s11) ───────────────────────────────────────────────
  {id:48,sub:"math",sk:"s11",dif:"Oson", pass:"",img:null,q:"Tanga — tura tushish ehtimolligi:",m:"P(\\text{tura})=?",opts:["\\frac{1}{4}","\\frac{1}{3}","\\frac{1}{2}","\\frac{2}{3}"],ans:2,expl:"P=1/2."},
  {id:49,sub:"math",sk:"s11",dif:"Oson", pass:"",img:null,q:"Zar — 6 tushish ehtimolligi:",m:"P(6)=?",             opts:["\\frac{1}{4}","\\frac{1}{6}","\\frac{1}{5}","\\frac{1}{3}"],ans:1,expl:"P=1/6."},
  {id:50,sub:"math",sk:"s11",dif:"O'rta",pass:"",img:null,q:"Mustaqil hodisalar:",     m:"P(A)=\\frac{1}{2},\\;P(B)=\\frac{1}{4},\\;P(A\\cap B)=?",opts:["\\frac{1}{6}","\\frac{1}{8}","\\frac{1}{4}","\\frac{3}{8}"],ans:1,expl:"P=1/2×1/4=1/8."},
  {id:51,sub:"math",sk:"s11",dif:"O'rta",pass:"",img:null,q:"3 qizil, 2 ko'k shar. Qizil tushish:",m:"P(\\text{qizil})=?",opts:["\\frac{2}{5}","\\frac{3}{5}","\\frac{1}{2}","\\frac{3}{4}"],ans:1,expl:"P=3/5."},
  // ── Kombinatorika (s12) ────────────────────────────────────────────
  {id:52,sub:"math",sk:"s12",dif:"O'rta",pass:"",img:null,q:"Hisoblang:",              m:"C_5^2=\\frac{5!}{2!\\cdot 3!}=?",opts:["8","9","10","12"],                  ans:2,expl:"C(5,2)=10."},
  {id:53,sub:"math",sk:"s12",dif:"O'rta",pass:"",img:null,q:"Hisoblang:",              m:"4!=?",                   opts:["12","18","24","48"],                       ans:2,expl:"4!=24."},
  {id:54,sub:"math",sk:"s12",dif:"Qiyin",pass:"",img:null,q:"Permutatsiya:",           m:"P_3^2=\\frac{3!}{1!}=?", opts:["3","4","5","6"],                           ans:3,expl:"P(3,2)=6."},
  // ── Non-math ───────────────────────────────────────────────────────
  {id:60,sub:"uzbek",  sk:"s13",dif:"Oson", pass:"O'zbek tilida so'zlar ma'no va grammatik belgilariga ko'ra turkumlarga bo'linadi. Har bir turkumning o'ziga xos xususiyatlari mavjud.",img:null,q:"'Maktab' so'zi qaysi so'z turkumiga mansub?",m:"",opts:["Fe'l","Ot","Sifat","Ravish"],ans:1,expl:"Predmet nomini bildiradi — ot."},
  {id:61,sub:"uzbek",  sk:"s16",dif:"O'rta",pass:"",img:null,q:"'Baland' so'zining sinonimi:",m:"",opts:["Past","Uzun","Katta","Keng"],ans:1,expl:"'Baland' va 'uzun' sinonimdir."},
  {id:62,sub:"history",sk:"s22",dif:"Oson", pass:"",img:null,q:"Amir Temur Samarqandni qaysi yilda poytaxt qildi?",m:"",opts:["1370","1380","1395","1405"],ans:0,expl:"1370-yilda."},
  {id:63,sub:"history",sk:"s24",dif:"Oson", pass:"",img:null,q:"O'zbekiston mustaqilligini qaysi yili e'lon qildi?",m:"",opts:["1989","1990","1991","1992"],ans:2,expl:"1991-yil 1-sentabr."},
  {id:64,sub:"english",sk:"s26",dif:"Oson", pass:"",img:null,q:"Choose the correct form:",m:"\\text{She }\\underline{\\hspace{1cm}}\\text{ to school every day.}",opts:["go","goes","going","gone"],ans:1,expl:"3rd person singular → goes."},
  {id:65,sub:"english",sk:"s32",dif:"Qiyin",pass:"The industrial revolution began in Britain and transformed society. Machines replaced labor and cities grew rapidly. Workers faced dangerous conditions for minimal wages.",img:null,q:"What was a direct negative consequence?",m:"",opts:["Cities shrank","Workers faced poor conditions","Britain lost power","Machines were too expensive"],ans:1,expl:"The passage directly mentions 'dangerous conditions for minimal wages.'"},
  {id:66,sub:"physics",sk:"s33",dif:"O'rta",pass:"",img:null,q:"O'rtacha tezlik:",m:"v=\\frac{\\Delta x}{\\Delta t}=\\frac{80\\text{ m}}{4\\text{ s}}",opts:["10 m/s","15 m/s","20 m/s","25 m/s"],ans:2,expl:"v=80/4=20 m/s."},
];

const DIFS={"Oson":{bg:"#DCFCE7",c:"#15803D"},"O'rta":{bg:"#FEF9C3",c:"#A16207"},"Qiyin":{bg:"#FEE2E2",c:"#B91C1C"}};
const LTR=["A","B","C","D"];
const fmt=s=>`${String(Math.floor(s/60)).padStart(2,"0")}:${String(s%60).padStart(2,"0")}`;

/* ── Tooltip ─────────────────────────────────────────────────────────── */
function Tip({label,children}) {
  const [show,setShow]=useState(false);
  return (
    <div style={{position:"relative",display:"inline-flex",alignItems:"center"}}
      onMouseEnter={()=>setShow(true)} onMouseLeave={()=>setShow(false)}>
      {children}
      {show&&<div style={{position:"absolute",bottom:"calc(100% + 6px)",left:"50%",transform:"translateX(-50%)",background:"#1E293B",color:"#fff",padding:"5px 10px",borderRadius:7,fontSize:11,fontWeight:600,whiteSpace:"nowrap",pointerEvents:"none",zIndex:999,boxShadow:"0 4px 12px rgba(0,0,0,.2)"}}>
        {label}<div style={{position:"absolute",top:"100%",left:"50%",transform:"translateX(-50%)",width:0,height:0,borderLeft:"5px solid transparent",borderRight:"5px solid transparent",borderTop:"5px solid #1E293B"}}/>
      </div>}
    </div>
  );
}

/* ── QuestionCard ─────────────────────────────────────────────────────── */
function QuestionCard({q,idx,prog,setProg,eliminated,setEliminated,marked,setMarked}) {
  const qid=q.id;
  const answeredIdx=prog[qid]?.ans; // undefined=not answered
  const isAnswered=answeredIdx!==undefined;
  const [pending,setPending]=useState(null);
  const elim=eliminated[qid]||new Set();

  function toggleElim(i) {
    if(isAnswered) return;
    setEliminated(e=>{
      const cur=new Set(e[qid]||[]);
      cur.has(i)?cur.delete(i):cur.add(i);
      return{...e,[qid]:cur};
    });
  }

  function handleCheck() {
    if(pending===null) return;
    const correct=pending===q.ans;
    setProg(p=>({...p,[qid]:{ans:pending,correct}}));
    setPending(null);
  }

  function selectOpt(i) {
    if(isAnswered||elim.has(i)) return;
    setPending(p=>p===i?null:i);
  }

  return (
    <div style={{fontFamily:"'Montserrat',sans-serif"}}>
      {/* header */}
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:18,flexWrap:"wrap"}}>
        <div style={{width:36,height:36,background:"#0F172A",color:"#fff",borderRadius:9,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:800,fontSize:15,flexShrink:0}}>{idx+1}</div>
        <button onClick={()=>setMarked(m=>{const n=new Set(m);n.has(qid)?n.delete(qid):n.add(qid);return n;})}
          style={{display:"flex",alignItems:"center",gap:5,background:"transparent",border:"none",font:"600 12px 'Montserrat',sans-serif",cursor:"pointer",color:marked.has(qid)?"#D97706":"#9CA3AF",padding:"4px 8px",borderRadius:6}}>
          <Ic n="bm" s={13} c={marked.has(qid)?"#D97706":"#9CA3AF"}/> Ko'rib chiqish
        </button>
        <button style={{marginLeft:"auto",display:"flex",alignItems:"center",gap:4,background:"transparent",border:"none",font:"600 11px 'Montserrat',sans-serif",cursor:"pointer",color:"#9CA3AF",padding:"4px 8px",borderRadius:6}}>
          <Ic n="flag" s={12} c="#9CA3AF"/> Xabar
        </button>
      </div>

      {/* question */}
      {q.m?(
        <div style={{marginBottom:20}}>
          {q.q&&<div style={{fontSize:15,fontWeight:600,lineHeight:1.6,color:"#111",marginBottom:10}}>{q.q}</div>}
          <div style={{fontSize:17,textAlign:"center",padding:"12px 0"}}><Tex tex={q.m} display={true}/></div>
        </div>
      ):<div style={{fontSize:15,fontWeight:600,lineHeight:1.6,color:"#111",marginBottom:20}}>{q.q}</div>}

      {/* options */}
      <div style={{display:"flex",flexDirection:"column",gap:8}}>
        {q.opts.map((opt,i)=>{
          const isElim=elim.has(i);
          const isPend=pending===i;
          const wasAns=answeredIdx===i;
          const isCor=i===q.ans;
          let border="1.5px solid #E5E7EB",bg="#fff",lBg="#fff",lBrd="#D1D5DB",lClr="#6B7280";
          if(!isAnswered&&isPend){border="2px solid #0EA5E9";bg="#F0F9FF";lBg="#0EA5E9";lBrd="#0EA5E9";lClr="#fff";}
          if(isAnswered){
            if(wasAns&&isCor){border="2px solid #22C55E";bg="#F0FDF4";lBg="#22C55E";lBrd="#22C55E";lClr="#fff";}
            else if(wasAns&&!isCor){border="2px solid #EF4444";bg="#FEF2F2";lBg="#EF4444";lBrd="#EF4444";lClr="#fff";}
            else if(isCor){border="2px solid #22C55E";bg="#F0FDF4";lBg="#22C55E";lBrd="#22C55E";lClr="#fff";}
          }
          return (
            <div key={i} style={{display:"flex",alignItems:"center",gap:7}}>
              <button onClick={()=>selectOpt(i)}
                style={{flex:1,display:"flex",alignItems:"center",gap:11,padding:"11px 14px",border,borderRadius:10,background:bg,cursor:isAnswered||isElim?"default":"pointer",font:"500 14px/1.45 'Montserrat',sans-serif",color:isElim?"#D1D5DB":"#111",textAlign:"left",minHeight:48,transition:"all .12s",textDecoration:isElim?"line-through":"none",opacity:isElim?0.5:1}}>
                <div style={{width:26,height:26,borderRadius:"50%",border:`1.5px solid ${lBrd}`,background:lBg,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,fontSize:12,flexShrink:0,color:lClr,transition:"all .12s"}}>
                  {isAnswered&&wasAns&&isCor?<Ic n="check" s={12} c="#fff"/>:isAnswered&&wasAns?<Ic n="cross" s={12} c="#fff"/>:isAnswered&&isCor?<Ic n="check" s={12} c="#fff"/>:LTR[i]}
                </div>
                <span style={{flex:1}}><TeX t={opt}/></span>
                {/* inline check button on selected */}
                {!isAnswered&&isPend&&(
                  <button onClick={e=>{e.stopPropagation();handleCheck();}}
                    style={{background:"#0EA5E9",color:"#fff",border:"none",padding:"5px 14px",borderRadius:7,font:"700 12px 'Montserrat',sans-serif",cursor:"pointer",flexShrink:0}}>
                    Tekshirish
                  </button>
                )}
              </button>
              {/* elimination button */}
              <Tip label={isElim?"Eliminatsiyani bekor qilish":"Bu javobni chizib tashlash"}>
                <button onClick={()=>toggleElim(i)}
                  style={{width:26,height:26,borderRadius:"50%",border:`1.5px solid ${isElim?"#EF4444":"#E5E7EB"}`,background:isElim?"#FEF2F2":"#fff",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",flexShrink:0,transition:"all .12s"}}>
                  <Ic n="cross" s={11} c={isElim?"#EF4444":"#9CA3AF"}/>
                </button>
              </Tip>
            </div>
          );
        })}
      </div>

      {isAnswered&&q.expl&&(
        <div style={{marginTop:16,background:"#FFFBEB",border:"1px solid #FDE68A",borderRadius:10,padding:"12px 14px",fontSize:13,color:"#92400E",lineHeight:1.6}}>
          💡 <strong>Izoh:</strong> {q.expl}
        </div>
      )}
    </div>
  );
}

/* ── Sidebar ──────────────────────────────────────────────────────────── */
function Sidebar({page,setPage,subjects,activeSubj,setActiveSubj,openSubject}) {
  const [bankOpen,setBankOpen]=useState(true);
  const [adminOpen,setAdminOpen]=useState(false);
  const item=(label,icon,target,active)=>(
    <div onClick={()=>setPage(target)} style={{display:"flex",alignItems:"center",gap:9,padding:"8px 14px",borderRadius:8,cursor:"pointer",background:active?"#EFF6FF":"transparent",color:active?"#1D4ED8":"#374151",font:`600 13px 'Montserrat',sans-serif`,transition:".12s",userSelect:"none"}}>
      <Ic n={icon} s={15} c={active?"#1D4ED8":"#6B7280"}/>{label}
    </div>
  );
  return (
    <div style={{width:220,flexShrink:0,background:"#fff",borderRight:"1px solid #F1F5F9",height:"100vh",overflowY:"auto",display:"flex",flexDirection:"column",position:"sticky",top:0}}>
      <div style={{padding:"18px 16px 14px",borderBottom:"1px solid #F1F5F9"}}>
        <div style={{fontFamily:"'Montserrat',sans-serif",fontSize:19,fontWeight:900,color:"#0F172A",letterSpacing:"-0.5px",cursor:"pointer"}} onClick={()=>setPage("home")}>
          Uni<span style={{color:"#2563EB"}}>Prep</span>
        </div>
      </div>
      <div style={{padding:"8px 8px",flex:1}}>
        {item("Bosh sahifa","home","home",page==="home")}
        {/* MASHQ */}
        <div style={{fontSize:10,fontWeight:800,color:"#9CA3AF",letterSpacing:"1px",textTransform:"uppercase",padding:"12px 14px 4px"}}>MASHQ</div>
        <div onClick={()=>setBankOpen(v=>!v)}
          style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"8px 14px",borderRadius:8,cursor:"pointer",background:["bank","bankSubj"].includes(page)?"#EFF6FF":"transparent",color:["bank","bankSubj"].includes(page)?"#1D4ED8":"#374151",font:"600 13px 'Montserrat',sans-serif"}}>
          <div style={{display:"flex",alignItems:"center",gap:9}}><Ic n="book" s={15} c={["bank","bankSubj"].includes(page)?"#1D4ED8":"#6B7280"}/>Savollar banki</div>
          <Ic n={bankOpen?"cU":"cD"} s={13} c="#9CA3AF"/>
        </div>
        {bankOpen&&subjects.map(s=>(
          <div key={s.id} onClick={()=>{openSubject(s);}}
            style={{display:"flex",alignItems:"center",gap:8,padding:"6px 14px 6px 34px",borderRadius:7,cursor:"pointer",background:activeSubj?.id===s.id&&page==="bankSubj"?"#EFF6FF":"transparent",font:"500 12.5px 'Montserrat',sans-serif",color:activeSubj?.id===s.id&&page==="bankSubj"?"#1D4ED8":"#6B7280",transition:".12s"}}>
            <div style={{width:8,height:8,borderRadius:"50%",background:s.color1,flexShrink:0}}/>{s.name}
          </div>
        ))}
        {/* STATISTIKA */}
        <div style={{fontSize:10,fontWeight:800,color:"#9CA3AF",letterSpacing:"1px",textTransform:"uppercase",padding:"12px 14px 4px"}}>STATISTIKA</div>
        {item("Mening progressim","chart","stats",page==="stats")}
        {item("Zaif tomonlar","warn","weak",page==="weak")}
        {/* ADMIN */}
        <div style={{fontSize:10,fontWeight:800,color:"#9CA3AF",letterSpacing:"1px",textTransform:"uppercase",padding:"12px 14px 4px"}}>ADMIN</div>
        <div onClick={()=>setAdminOpen(v=>!v)}
          style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"8px 14px",borderRadius:8,cursor:"pointer",background:["adminAdd","adminManage","adminSubjects"].includes(page)?"#EFF6FF":"transparent",color:["adminAdd","adminManage","adminSubjects"].includes(page)?"#1D4ED8":"#374151",font:"600 13px 'Montserrat',sans-serif"}}>
          <div style={{display:"flex",alignItems:"center",gap:9}}><Ic n="cog" s={15} c={["adminAdd","adminManage","adminSubjects"].includes(page)?"#1D4ED8":"#6B7280"}/>Admin panel</div>
          <Ic n={adminOpen?"cU":"cD"} s={13} c="#9CA3AF"/>
        </div>
        {adminOpen&&<>
          {item("Savol qo'shish","plus","adminAdd",page==="adminAdd")}
          {item("Savollarni boshqarish","list","adminManage",page==="adminManage")}
          {item("Fanlar & mavzular","cog","adminSubjects",page==="adminSubjects")}
        </>}
      </div>
    </div>
  );
}

/* ── Statistics View ─────────────────────────────────────────────────── */
function StatsView({questions,subjects,prog,page}) {
  const allQ=questions.length;
  const answered=Object.keys(prog).length;
  const correct=Object.values(prog).filter(p=>p.correct).length;
  const overallPct=answered?Math.round(correct/answered*100):0;

  const skillStats=[];
  subjects.forEach(subj=>{
    subj.categories.forEach(cat=>{
      cat.skills.forEach(sk=>{
        const qs=questions.filter(q=>q.sk===sk.id);
        const ans=qs.filter(q=>prog[q.id]);
        const cor=ans.filter(q=>prog[q.id]?.correct);
        const pct=ans.length?Math.round(cor.length/ans.length*100):null;
        skillStats.push({subjName:subj.name,catName:cat.name,skName:sk.name,total:qs.length,answered:ans.length,correct:cor.length,pct,color:subj.color1});
      });
    });
  });
  const weak=skillStats.filter(s=>s.pct!==null&&s.pct<70).sort((a,b)=>a.pct-b.pct);
  const showWeak=page==="weak";

  return (
    <div style={{padding:"32px 32px",maxWidth:760,fontFamily:"'Montserrat',sans-serif"}}>
      <div style={{font:"800 24px 'Montserrat',sans-serif",letterSpacing:"-.5px",marginBottom:4}}>{showWeak?"Zaif tomonlar":"Mening progressim"}</div>
      <div style={{fontSize:13,color:"#6B7280",marginBottom:24,fontWeight:500}}>{showWeak?"Kuchaytirishni talab qiladigan mavzular":"Umumiy o'quv statistikasi"}</div>
      {!showWeak&&<>
        {/* overall cards */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:28}}>
          {[["Jami savollar",allQ,"#2563EB"],["Javob berilgan",answered,"#7C3AED"],["To'g'ri",correct,"#059669"],["Aniqlik",overallPct+"%",overallPct>=70?"#059669":"#B45309"]].map(([l,v,c])=>(
            <div key={l} style={{background:"#fff",border:"1px solid #E5E7EB",borderRadius:12,padding:"16px 18px",boxShadow:"0 1px 6px rgba(0,0,0,.05)"}}>
              <div style={{fontSize:28,fontWeight:900,color:c,letterSpacing:"-1px"}}>{v}</div>
              <div style={{fontSize:12,color:"#6B7280",fontWeight:600,marginTop:2}}>{l}</div>
            </div>
          ))}
        </div>
        {/* per subject */}
        {subjects.map(subj=>{
          const sqs=questions.filter(q=>q.sub===subj.id);
          const sans=sqs.filter(q=>prog[q.id]);
          const scor=sans.filter(q=>prog[q.id]?.correct);
          const spct=sans.length?Math.round(scor.length/sans.length*100):0;
          return (
            <div key={subj.id} style={{background:"#fff",border:"1px solid #E5E7EB",borderRadius:12,padding:"16px 20px",marginBottom:10,display:"flex",alignItems:"center",gap:16}}>
              <div style={{width:10,height:10,borderRadius:"50%",background:subj.color1,flexShrink:0}}/>
              <div style={{flex:1}}>
                <div style={{font:"700 14px 'Montserrat',sans-serif",color:"#111",marginBottom:6}}>{subj.name}</div>
                <div style={{background:"#F1F5F9",borderRadius:100,height:6,overflow:"hidden"}}>
                  <div style={{height:"100%",background:subj.color1,borderRadius:100,width:`${spct}%`,transition:"width .4s"}}/>
                </div>
              </div>
              <div style={{font:"800 16px 'Montserrat',sans-serif",color:subj.color1,minWidth:44,textAlign:"right"}}>{spct}%</div>
              <div style={{fontSize:12,color:"#9CA3AF",fontWeight:500,minWidth:60,textAlign:"right"}}>{sans.length}/{sqs.length}</div>
            </div>
          );
        })}
      </>}
      {/* weak areas */}
      {(showWeak||!showWeak)&&weak.length>0&&(
        <div style={{marginTop:showWeak?0:24}}>
          <div style={{font:"700 15px 'Montserrat',sans-serif",marginBottom:14,color:"#111"}}>{showWeak?"Zaif mavzular":"⚠️ Zaif tomonlar"}</div>
          {weak.map((s,i)=>(
            <div key={i} style={{background:"#fff",border:"1px solid #FEE2E2",borderRadius:12,padding:"14px 18px",marginBottom:9,display:"flex",alignItems:"center",gap:14}}>
              <div style={{width:9,height:9,borderRadius:"50%",background:s.pct<40?"#EF4444":"#F59E0B",flexShrink:0}}/>
              <div style={{flex:1}}>
                <div style={{font:"600 13px 'Montserrat',sans-serif",color:"#111"}}>{s.skName}</div>
                <div style={{fontSize:11,color:"#9CA3AF",marginTop:1}}>{s.subjName} · {s.catName}</div>
              </div>
              <div style={{font:"800 15px 'Montserrat',sans-serif",color:s.pct<40?"#B91C1C":"#A16207"}}>{s.pct}%</div>
              <div style={{fontSize:11,color:"#9CA3AF",fontWeight:500}}>{s.correct}/{s.answered} to'g'ri</div>
            </div>
          ))}
          {!weak.length&&<div style={{fontSize:14,color:"#6B7280",textAlign:"center",padding:"40px 0"}}>Zaif tomonlar aniqlanmadi — ajoyib!</div>}
        </div>
      )}
      {weak.length===0&&showWeak&&<div style={{fontSize:14,color:"#6B7280",textAlign:"center",padding:"60px 0",fontWeight:500}}>🎉 Barcha mavzularda yaxshi natija!</div>}
    </div>
  );
}

/* ── Admin View ───────────────────────────────────────────────────────── */
function AdminView({page,questions,setQuestions,subjects,setSubjects,showToast}) {
  const [nQ,setNQ]=useState({sub:"",sk:"",dif:"Oson",pass:"",img:null,q:"",m:"",opts:["","","",""],ans:0,expl:""});
  const [nSubj,setNSubj]=useState({name:"",color1:"#2563EB"});
  const [nCat,setNCat]=useState({subjId:"",name:""});
  const [nSk,setNSk]=useState({subjId:"",catId:"",name:""});
  const impRef=useRef();
  const getSubj=id=>subjects.find(s=>s.id===id);
  const subjSkills=nQ.sub?(getSubj(nQ.sub)?.categories||[]).flatMap(c=>c.skills):[];

  function addQ(){
    if(!nQ.q&&!nQ.m){showToast("Savol matni yoki LaTeX kiriting.");return;}
    if(!nQ.sub||!nQ.sk){showToast("Fan va mavzuni tanlang.");return;}
    if(nQ.opts.some(o=>!o.trim())){showToast("Barcha javob variantlarini kiriting.");return;}
    setQuestions(qs=>[...qs,{...nQ,id:Date.now(),opts:[...nQ.opts]}]);
    setNQ({sub:"",sk:"",dif:"Oson",pass:"",img:null,q:"",m:"",opts:["","","",""],ans:0,expl:""});
    showToast("✅ Savol qo'shildi!");
  }

  function handleImg(e){
    const f=e.target.files[0];if(!f)return;
    const r=new FileReader();r.onload=ev=>setNQ(q=>({...q,img:ev.target.result}));r.readAsDataURL(f);
  }

  function addSubj(){
    if(!nSubj.name.trim()){showToast("Fan nomini kiriting.");return;}
    const id=nSubj.name.trim().toLowerCase().replace(/\s+/g,"_")+Date.now();
    setSubjects(ss=>[...ss,{id,name:nSubj.name.trim(),color1:nSubj.color1,color2:nSubj.color1,categories:[]}]);
    setNSubj({name:"",color1:"#2563EB"});showToast("✅ Fan qo'shildi!");
  }

  function addCat(){
    if(!nCat.subjId||!nCat.name.trim()){showToast("Fan va bo'lim nomini kiriting.");return;}
    const id="cat_"+Date.now();
    setSubjects(ss=>ss.map(s=>s.id!==nCat.subjId?s:{...s,categories:[...s.categories,{id,name:nCat.name.trim(),skills:[]}]}));
    setNCat(c=>({...c,name:""}));showToast("✅ Bo'lim qo'shildi!");
  }

  function addSk(){
    if(!nSk.subjId||!nSk.catId||!nSk.name.trim()){showToast("Fan, bo'lim va mavzu nomini kiriting.");return;}
    const id="sk_"+Date.now();
    setSubjects(ss=>ss.map(s=>s.id!==nSk.subjId?s:{...s,categories:s.categories.map(c=>c.id!==nSk.catId?c:{...c,skills:[...c.skills,{id,name:nSk.name.trim()}]})}));
    setNSk(sk=>({...sk,name:""}));showToast("✅ Mavzu qo'shildi!");
  }

  function delSubj(id){setSubjects(ss=>ss.filter(s=>s.id!==id));showToast("Fan o'chirildi.");}
  function delCat(subjId,catId){setSubjects(ss=>ss.map(s=>s.id!==subjId?s:{...s,categories:s.categories.filter(c=>c.id!==catId)}));showToast("Bo'lim o'chirildi.");}
  function delSk(subjId,catId,skId){setSubjects(ss=>ss.map(s=>s.id!==subjId?s:{...s,categories:s.categories.map(c=>c.id!==catId?c:{...c,skills:c.skills.filter(sk=>sk.id!==skId)})}));showToast("Mavzu o'chirildi.");}

  function dlJSON(){
    const b=new Blob([JSON.stringify(questions,null,2)],{type:"application/json"});
    const a=document.createElement("a");a.href=URL.createObjectURL(b);a.download="uniprep.json";a.click();
    showToast("✅ Yuklab olindi!");
  }
  function impJSON(e){
    const f=e.target.files[0];if(!f)return;
    const r=new FileReader();
    r.onload=ev=>{try{const arr=JSON.parse(ev.target.result);setQuestions(qs=>[...qs,...(Array.isArray(arr)?arr:[]).map(q=>({...q,id:q.id||Date.now()+Math.random()}))]);showToast("✅ Import qilindi!");}catch{showToast("❌ Noto'g'ri JSON");}};
    r.readAsText(f);e.target.value="";
  }

  const fi={width:"100%",padding:"9px 12px",border:"1.5px solid #E5E7EB",borderRadius:8,font:"500 13px 'Montserrat',sans-serif",background:"#F9FAFB",color:"#111",outline:"none"};
  const lbl={display:"block",fontSize:11,fontWeight:700,color:"#6B7280",textTransform:"uppercase",letterSpacing:".5px",marginBottom:5};
  const fg={marginBottom:14};
  const btn=(clk,lbl2,bg="#0F172A",clr="#fff")=><button onClick={clk} style={{background:bg,color:clr,border:bg==="#fff"?"1.5px solid #E5E7EB":"none",padding:"9px 18px",borderRadius:9,font:"700 13px 'Montserrat',sans-serif",cursor:"pointer"}}>{lbl2}</button>;

  if(page==="adminAdd") return (
    <div style={{padding:"28px 28px",maxWidth:680,fontFamily:"'Montserrat',sans-serif"}}>
      <div style={{font:"800 20px 'Montserrat',sans-serif",marginBottom:4}}>Savol qo'shish</div>
      <div style={{fontSize:12,color:"#6B7280",marginBottom:20,fontWeight:500}}>Yangi savol bazaga qo'shing</div>
      <div style={{display:"flex",gap:10,marginBottom:18}}>
        <button onClick={dlJSON} style={{display:"flex",alignItems:"center",gap:6,background:"#0F172A",color:"#fff",border:"none",padding:"8px 16px",borderRadius:8,font:"600 12px 'Montserrat',sans-serif",cursor:"pointer"}}><Ic n="dl" s={14} c="#fff"/> JSON yuklab olish</button>
        <button onClick={()=>impRef.current.click()} style={{display:"flex",alignItems:"center",gap:6,background:"#fff",color:"#0F172A",border:"1.5px solid #E5E7EB",padding:"8px 16px",borderRadius:8,font:"600 12px 'Montserrat',sans-serif",cursor:"pointer"}}><Ic n="up" s={14} c="#0F172A"/> Import</button>
        <input ref={impRef} type="file" accept=".json" style={{display:"none"}} onChange={impJSON}/>
      </div>
      <div style={{background:"#fff",border:"1px solid #E5E7EB",borderRadius:14,padding:22}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
          <div style={fg}><label style={lbl}>Fan *</label><select style={fi} value={nQ.sub} onChange={e=>setNQ(q=>({...q,sub:e.target.value,sk:""}))}><option value="">Fan tanlang</option>{subjects.map(s=><option key={s.id} value={s.id}>{s.name}</option>)}</select></div>
          <div style={fg}><label style={lbl}>Mavzu *</label><select style={fi} value={nQ.sk} onChange={e=>setNQ(q=>({...q,sk:e.target.value}))}><option value="">Mavzu tanlang</option>{subjSkills.map(s=><option key={s.id} value={s.id}>{s.name}</option>)}</select></div>
        </div>
        <div style={fg}><label style={lbl}>Qiyinlik</label><select style={fi} value={nQ.dif} onChange={e=>setNQ(q=>({...q,dif:e.target.value}))}><option>Oson</option><option>O'rta</option><option>Qiyin</option></select></div>
        <div style={fg}><label style={lbl}>Passage (matn) — ixtiyoriy</label><textarea style={{...fi,minHeight:64,resize:"vertical",lineHeight:1.5}} placeholder="O'qish uchun matn..." value={nQ.pass} onChange={e=>setNQ(q=>({...q,pass:e.target.value}))}/></div>
        <div style={fg}><label style={lbl}>Savol matni</label><textarea style={{...fi,minHeight:64,resize:"vertical",lineHeight:1.5}} placeholder="Savol matni..." value={nQ.q} onChange={e=>setNQ(q=>({...q,q:e.target.value}))}/></div>
        <div style={fg}><label style={lbl}>LaTeX (math) — ixtiyoriy</label><textarea style={{...fi,minHeight:48,resize:"vertical"}} placeholder="Masalan: x^2+3x=0" value={nQ.m} onChange={e=>setNQ(q=>({...q,m:e.target.value}))}/></div>
        {nQ.m&&<div style={{background:"#F8FAFF",border:"1px solid #DBEAFE",borderRadius:8,padding:"10px 14px",marginBottom:12,textAlign:"center",fontSize:16}}><Tex tex={nQ.m} display={true}/></div>}
        <div style={fg}>
          <label style={lbl}>Rasm — ixtiyoriy</label>
          {nQ.img?<div style={{position:"relative"}}><img src={nQ.img} alt="" style={{width:"100%",maxHeight:160,objectFit:"contain",borderRadius:8,border:"1px solid #E5E7EB"}}/><button onClick={()=>setNQ(q=>({...q,img:null}))} style={{position:"absolute",top:6,right:6,background:"#EF4444",color:"#fff",border:"none",borderRadius:6,padding:"3px 9px",cursor:"pointer",fontSize:11}}>✕</button></div>
          :<label style={{border:"2px dashed #E5E7EB",borderRadius:10,padding:14,textAlign:"center",cursor:"pointer",display:"block",background:"#F9FAFB"}}><input type="file" accept="image/*" style={{display:"none"}} onChange={handleImg}/><Ic n="img" s={26} c="#D1D5DB"/><div style={{fontSize:11,color:"#9CA3AF",marginTop:4}}>Rasm yuklash</div></label>}
        </div>
        <div style={fg}>
          <label style={lbl}>Javob variantlari *</label>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:8}}>
            {nQ.opts.map((o,i)=><input key={i} style={fi} placeholder={`Variant ${LTR[i]} (matn yoki LaTeX)`} value={o} onChange={e=>setNQ(q=>{const ops=[...q.opts];ops[i]=e.target.value;return{...q,opts:ops};})}/>)}
          </div>
          <div style={{fontSize:11,color:"#6B7280",marginBottom:5,fontWeight:600}}>To'g'ri javob:</div>
          <div style={{display:"flex",gap:7}}>{LTR.map((l,i)=><button key={i} onClick={()=>setNQ(q=>({...q,ans:i}))} style={{flex:1,padding:7,border:"1.5px solid #E5E7EB",borderRadius:8,background:nQ.ans===i?"#0F172A":"#F9FAFB",font:"700 13px 'Montserrat',sans-serif",cursor:"pointer",color:nQ.ans===i?"#fff":"#6B7280"}}>{l}</button>)}</div>
        </div>
        <div style={fg}><label style={lbl}>Izoh (ixtiyoriy)</label><textarea style={{...fi,minHeight:56,resize:"vertical"}} placeholder="To'g'ri javob izohi..." value={nQ.expl} onChange={e=>setNQ(q=>({...q,expl:e.target.value}))}/></div>
        <button onClick={addQ} style={{width:"100%",background:"#0F172A",color:"#fff",border:"none",padding:12,borderRadius:10,font:"700 14px 'Montserrat',sans-serif",cursor:"pointer"}}>Savol qo'shish</button>
      </div>
    </div>
  );

  if(page==="adminManage") return (
    <div style={{padding:"28px 28px",maxWidth:780,fontFamily:"'Montserrat',sans-serif"}}>
      <div style={{font:"800 20px 'Montserrat',sans-serif",marginBottom:4}}>Savollarni boshqarish</div>
      <div style={{fontSize:12,color:"#6B7280",marginBottom:20,fontWeight:500}}>Jami {questions.length} ta savol</div>
      {questions.map(q=>{
        const subj=subjects.find(s=>s.id===q.sub);
        const sk=subj?.categories.flatMap(c=>c.skills).find(s=>s.id===q.sk);
        return(
          <div key={q.id} style={{background:"#fff",border:"1px solid #E5E7EB",borderRadius:10,padding:"12px 14px",display:"flex",gap:12,alignItems:"flex-start",marginBottom:7}}>
            {q.img&&<img src={q.img} alt="" style={{width:52,height:38,objectFit:"cover",borderRadius:6,flexShrink:0}}/>}
            <div style={{flex:1,fontSize:13,lineHeight:1.5,fontWeight:500}}>
              <div style={{display:"flex",gap:6,marginBottom:5,flexWrap:"wrap"}}>
                <span style={{padding:"2px 8px",borderRadius:100,fontSize:11,fontWeight:700,...(DIFS[q.dif]||{bg:"#F3F4F6",c:"#374151"})}}>{q.dif}</span>
                <span style={{padding:"2px 8px",borderRadius:100,fontSize:11,fontWeight:600,background:"#EEF2FF",color:"#4338CA"}}>{subj?.name}</span>
                {sk&&<span style={{fontSize:11,color:"#9CA3AF"}}>{sk.name}</span>}
              </div>
              {q.q||q.m}
            </div>
            <button onClick={()=>{setQuestions(qs=>qs.filter(x=>x.id!==q.id));showToast("O'chirildi.");}}
              style={{display:"flex",alignItems:"center",gap:4,background:"#FEF2F2",color:"#DC2626",border:"1px solid #FECACA",padding:"5px 11px",borderRadius:7,font:"600 11px 'Montserrat',sans-serif",cursor:"pointer",whiteSpace:"nowrap",flexShrink:0}}>
              <Ic n="trash" s={12} c="#DC2626"/> O'chirish
            </button>
          </div>
        );
      })}
    </div>
  );

  if(page==="adminSubjects") return (
    <div style={{padding:"28px 28px",maxWidth:780,fontFamily:"'Montserrat',sans-serif"}}>
      <div style={{font:"800 20px 'Montserrat',sans-serif",marginBottom:4}}>Fanlar va mavzular</div>
      <div style={{fontSize:12,color:"#6B7280",marginBottom:24,fontWeight:500}}>Fan, bo'lim va mavzularni boshqarish</div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:14,marginBottom:24}}>
        {/* Add subject */}
        <div style={{background:"#fff",border:"1px solid #E5E7EB",borderRadius:12,padding:16}}>
          <div style={{font:"700 13px 'Montserrat',sans-serif",marginBottom:12}}>Fan qo'shish</div>
          <div style={fg}><label style={lbl}>Fan nomi</label><input style={fi} value={nSubj.name} onChange={e=>setNSubj(s=>({...s,name:e.target.value}))} placeholder="Masalan: Kimyo"/></div>
          <div style={fg}><label style={lbl}>Rang</label><input type="color" style={{width:"100%",height:36,border:"1.5px solid #E5E7EB",borderRadius:8,cursor:"pointer"}} value={nSubj.color1} onChange={e=>setNSubj(s=>({...s,color1:e.target.value}))}/></div>
          {btn(addSubj,"Fan qo'shish")}
        </div>
        {/* Add category */}
        <div style={{background:"#fff",border:"1px solid #E5E7EB",borderRadius:12,padding:16}}>
          <div style={{font:"700 13px 'Montserrat',sans-serif",marginBottom:12}}>Bo'lim qo'shish</div>
          <div style={fg}><label style={lbl}>Fan</label><select style={fi} value={nCat.subjId} onChange={e=>setNCat(c=>({...c,subjId:e.target.value}))}><option value="">Fan tanlang</option>{subjects.map(s=><option key={s.id} value={s.id}>{s.name}</option>)}</select></div>
          <div style={fg}><label style={lbl}>Bo'lim nomi</label><input style={fi} value={nCat.name} onChange={e=>setNCat(c=>({...c,name:e.target.value}))} placeholder="Masalan: Organik kimyo"/></div>
          {btn(addCat,"Bo'lim qo'shish")}
        </div>
        {/* Add skill */}
        <div style={{background:"#fff",border:"1px solid #E5E7EB",borderRadius:12,padding:16}}>
          <div style={{font:"700 13px 'Montserrat',sans-serif",marginBottom:12}}>Mavzu qo'shish</div>
          <div style={fg}><label style={lbl}>Fan</label><select style={fi} value={nSk.subjId} onChange={e=>setNSk(s=>({...s,subjId:e.target.value,catId:""}))}><option value="">Fan tanlang</option>{subjects.map(s=><option key={s.id} value={s.id}>{s.name}</option>)}</select></div>
          <div style={fg}><label style={lbl}>Bo'lim</label><select style={fi} value={nSk.catId} onChange={e=>setNSk(s=>({...s,catId:e.target.value}))}><option value="">Bo'lim tanlang</option>{(subjects.find(s=>s.id===nSk.subjId)?.categories||[]).map(c=><option key={c.id} value={c.id}>{c.name}</option>)}</select></div>
          <div style={fg}><label style={lbl}>Mavzu nomi</label><input style={fi} value={nSk.name} onChange={e=>setNSk(s=>({...s,name:e.target.value}))} placeholder="Masalan: Karbonlar"/></div>
          {btn(addSk,"Mavzu qo'shish")}
        </div>
      </div>
      {/* subjects list */}
      {subjects.map(subj=>(
        <div key={subj.id} style={{background:"#fff",border:"1px solid #E5E7EB",borderRadius:12,padding:16,marginBottom:12}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10}}>
            <div style={{display:"flex",alignItems:"center",gap:8}}><div style={{width:12,height:12,borderRadius:"50%",background:subj.color1}}/><div style={{font:"700 14px 'Montserrat',sans-serif"}}>{subj.name}</div></div>
            <button onClick={()=>delSubj(subj.id)} style={{background:"#FEF2F2",color:"#DC2626",border:"1px solid #FECACA",padding:"4px 10px",borderRadius:6,font:"600 11px 'Montserrat',sans-serif",cursor:"pointer"}}>O'chirish</button>
          </div>
          {subj.categories.map(cat=>(
            <div key={cat.id} style={{marginLeft:20,marginBottom:8}}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:4}}>
                <div style={{font:"600 12px 'Montserrat',sans-serif",color:"#374151"}}>{cat.name}</div>
                <button onClick={()=>delCat(subj.id,cat.id)} style={{background:"transparent",color:"#9CA3AF",border:"none",font:"500 11px 'Montserrat',sans-serif",cursor:"pointer"}}>× o'chirish</button>
              </div>
              <div style={{display:"flex",flexWrap:"wrap",gap:6,marginLeft:14}}>
                {cat.skills.map(sk=>(
                  <div key={sk.id} style={{display:"flex",alignItems:"center",gap:4,background:"#F1F5F9",borderRadius:100,padding:"3px 10px",fontSize:11,fontWeight:500}}>
                    {sk.name}<button onClick={()=>delSk(subj.id,cat.id,sk.id)} style={{background:"transparent",border:"none",color:"#9CA3AF",cursor:"pointer",fontSize:13,lineHeight:1,padding:"0 0 0 4px"}}>×</button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
  return null;
}

/* ── BankSubject ──────────────────────────────────────────────────────── */
function BankSubject({subj,questions,prog,setPage,setQList,setQIdx,eliminated}) {
  const [catOpen,setCatOpen]=useState({});
  const [selected,setSelected]=useState(new Set());
  const [filterDif,setFilterDif]=useState("all");
  const [filterSt,setFilterSt]=useState("all");
  const [showFilters,setShowFilters]=useState(false);

  function filteredQs(skId){
    return questions.filter(q=>{
      if(q.sk!==skId) return false;
      if(filterDif!=="all"&&q.dif!==filterDif) return false;
      if(filterSt==="solved"&&prog[q.id]===undefined) return false;
      if(filterSt==="unsolved"&&prog[q.id]!==undefined) return false;
      return true;
    });
  }
  function openQs(qs){if(!qs.length){return;}setQList(qs);setQIdx(0);setPage("question");}

  const allSkIds=subj.categories.flatMap(c=>c.skills.map(s=>s.id));
  const Pill=({label,val,cur,setter})=>(
    <button onClick={()=>setter(val)} style={{padding:"5px 13px",borderRadius:100,border:cur===val?"1.5px solid #0F172A":"1.5px solid #E5E7EB",background:cur===val?"#0F172A":"#fff",color:cur===val?"#fff":"#374151",font:"600 11px 'Montserrat',sans-serif",cursor:"pointer"}}>{label}</button>
  );

  return (
    <div style={{padding:"28px 32px",maxWidth:820,fontFamily:"'Montserrat',sans-serif",position:"relative",minHeight:"100%"}}>
      <button onClick={()=>setPage("bank")} style={{display:"flex",alignItems:"center",gap:5,background:"transparent",border:"none",color:"#6B7280",font:"600 12px 'Montserrat',sans-serif",cursor:"pointer",marginBottom:20,padding:0}}>
        <Ic n="cL" s={14} c="#6B7280"/> Savollar bankiga qaytish
      </button>
      <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:18,flexWrap:"wrap",gap:10}}>
        <div>
          <div style={{font:"800 28px 'Montserrat',sans-serif",letterSpacing:"-.5px"}}>{subj.name}</div>
          <div style={{fontSize:13,color:"#6B7280",marginTop:4,fontWeight:500}}>{questions.filter(q=>q.sub===subj.id).length} ta savol</div>
        </div>
        {selected.size>0&&(
          <button onClick={()=>openQs(questions.filter(q=>selected.has(q.sk)).sort(()=>Math.random()-.5))}
            style={{background:"#0F172A",color:"#fff",border:"none",padding:"10px 20px",borderRadius:10,font:"700 13px 'Montserrat',sans-serif",cursor:"pointer"}}>
            ▶ Tanlangan ({selected.size}) — boshlash
          </button>
        )}
      </div>
      {/* filter bar */}
      <div style={{display:"flex",gap:9,marginBottom:showFilters?10:22,flexWrap:"wrap"}}>
        <button onClick={()=>setShowFilters(v=>!v)} style={{display:"flex",alignItems:"center",gap:7,padding:"8px 15px",border:showFilters?"1.5px solid #0F172A":"1.5px solid #E5E7EB",borderRadius:100,background:showFilters?"#0F172A":"#fff",font:"600 12px 'Montserrat',sans-serif",cursor:"pointer",color:showFilters?"#fff":"#111"}}>
          ▼ Filtrlar
        </button>
      </div>
      {showFilters&&(
        <div style={{display:"flex",gap:8,flexWrap:"wrap",padding:"12px 14px",background:"#fff",border:"1px solid #E5E7EB",borderRadius:12,marginBottom:20}}>
          <span style={{fontSize:11,fontWeight:700,color:"#9CA3AF",alignSelf:"center",textTransform:"uppercase",letterSpacing:".5px"}}>Qiyinlik:</span>
          <Pill label="Barchasi" val="all" cur={filterDif} setter={setFilterDif}/>
          <Pill label="Oson" val="Oson" cur={filterDif} setter={setFilterDif}/>
          <Pill label="O'rta" val="O'rta" cur={filterDif} setter={setFilterDif}/>
          <Pill label="Qiyin" val="Qiyin" cur={filterDif} setter={setFilterDif}/>
          <div style={{width:1,background:"#E5E7EB",margin:"0 4px"}}/>
          <span style={{fontSize:11,fontWeight:700,color:"#9CA3AF",alignSelf:"center",textTransform:"uppercase",letterSpacing:".5px"}}>Holat:</span>
          <Pill label="Barchasi" val="all" cur={filterSt} setter={setFilterSt}/>
          <Pill label="Yechilmagan" val="unsolved" cur={filterSt} setter={setFilterSt}/>
          <Pill label="Yechilgan" val="solved" cur={filterSt} setter={setFilterSt}/>
        </div>
      )}
      {subj.categories.map(cat=>{
        const isOpen=catOpen[cat.id]!==false;
        const catTotal=cat.skills.reduce((a,sk)=>a+filteredQs(sk.id).length,0);
        return (
          <div key={cat.id} style={{marginBottom:2}}>
            <div onClick={()=>setCatOpen(c=>({...c,[cat.id]:!isOpen}))}
              style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"13px 0 9px",borderBottom:"1.5px solid #F1F5F9",cursor:"pointer",userSelect:"none"}}>
              <div>
                <div style={{font:"800 17px 'Montserrat',sans-serif",color:"#0F172A"}}>{cat.name}</div>
                <div style={{fontSize:12,color:"#9CA3AF",marginTop:2,fontWeight:500}}>{catTotal} ta savol</div>
              </div>
              <div style={{transform:isOpen?"rotate(0deg)":"rotate(180deg)",transition:".18s"}}><Ic n="cU" s={15} c="#9CA3AF"/></div>
            </div>
            {isOpen&&(
              <div style={{padding:"3px 0 8px"}}>
                {cat.skills.map(sk=>{
                  const isSel=selected.has(sk.id);
                  const fqs=filteredQs(sk.id);
                  const allCnt=questions.filter(q=>q.sk===sk.id).length;
                  const solvedCnt=questions.filter(q=>q.sk===sk.id&&prog[q.id]!==undefined).length;
                  const corrCnt=questions.filter(q=>q.sk===sk.id&&prog[q.id]?.correct).length;
                  const pct=solvedCnt?Math.round(corrCnt/solvedCnt*100):null;
                  return (
                    <div key={sk.id} style={{display:"flex",alignItems:"center",padding:"10px 6px",borderRadius:9,cursor:"pointer",gap:12,background:isSel?"#EFF6FF":"transparent",transition:".12s"}}
                      onClick={()=>setSelected(s=>{const n=new Set(s);n.has(sk.id)?n.delete(sk.id):n.add(sk.id);return n;})}>
                      <div style={{width:19,height:19,borderRadius:"50%",border:`1.5px solid ${isSel?"#2563EB":"#D1D5DB"}`,background:isSel?"#2563EB":"#fff",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,transition:".12s"}}>
                        {isSel&&<Ic n="check" s={10} c="#fff"/>}
                      </div>
                      <div style={{flex:1,font:"500 14px 'Montserrat',sans-serif",color:"#111"}}>{sk.name}</div>
                      <div style={{display:"flex",alignItems:"center",gap:10}}>
                        {pct!==null&&<Tip label={`${corrCnt} ta to'g'ri javob (${pct}% aniqlik)`}>
                          <span style={{display:"flex",alignItems:"center",gap:3,fontSize:12,fontWeight:700,color:"#15803D",cursor:"default"}}>
                            <div style={{width:15,height:15,borderRadius:"50%",background:"#22C55E",display:"flex",alignItems:"center",justifyContent:"center"}}><Ic n="check" s={8} c="#fff"/></div>{corrCnt}
                          </span>
                        </Tip>}
                        {solvedCnt>0&&<Tip label={`${solvedCnt} ta savol yechilgan`}>
                          <span style={{fontSize:12,color:"#6B7280",fontWeight:600,cursor:"default"}}>{solvedCnt}/{allCnt}</span>
                        </Tip>}
                        <Tip label={`${fqs.length} ta savol (filtr bilan)`}>
                          <span style={{fontSize:12,color:"#9CA3AF",fontWeight:500,minWidth:70,textAlign:"right",cursor:"default"}}>{fqs.length} ta savol</span>
                        </Tip>
                      </div>
                      <button onClick={e=>{e.stopPropagation();openQs(fqs);}}
                        style={{background:"transparent",border:"none",cursor:"pointer",padding:"5px 10px",borderRadius:7,font:"600 12px 'Montserrat',sans-serif",color:"#2563EB",flexShrink:0}}>
                        → Boshlash
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
      {/* floating bottom bar when selected */}
      {selected.size>0&&(
        <div style={{position:"fixed",bottom:24,left:"50%",transform:"translateX(-50%)",background:"#0F172A",color:"#fff",padding:"12px 22px",borderRadius:100,display:"flex",alignItems:"center",gap:14,boxShadow:"0 8px 32px rgba(0,0,0,.25)",zIndex:200,font:"600 13px 'Montserrat',sans-serif"}}>
          <span>{selected.size} ta mavzu tanlandi</span>
          <button onClick={()=>openQs(questions.filter(q=>selected.has(q.sk)).sort(()=>Math.random()-.5))}
            style={{background:"#2563EB",color:"#fff",border:"none",padding:"8px 18px",borderRadius:100,font:"700 13px 'Montserrat',sans-serif",cursor:"pointer"}}>Boshlash →</button>
          <button onClick={()=>{setSelected(new Set(allSkIds));}} style={{background:"transparent",color:"rgba(255,255,255,.6)",border:"1px solid rgba(255,255,255,.2)",padding:"6px 12px",borderRadius:100,font:"500 12px 'Montserrat',sans-serif",cursor:"pointer"}}>Hammasini tanlash</button>
        </div>
      )}
    </div>
  );
}

/* ── QuestionView ─────────────────────────────────────────────────────── */
function QuestionView({qList,qIdx,setQIdx,setPage,prog,setProg,subjects}) {
  const [elapsed,setElapsed]=useState(0);
  const [paused,setPaused]=useState(false);
  const [showNav,setShowNav]=useState(false);
  const [eliminated,setEliminated]=useState({});
  const [marked,setMarked]=useState(new Set());
  const timerRef=useRef();

  useEffect(()=>{
    if(!paused){timerRef.current=setInterval(()=>setElapsed(e=>e+1),1000);}
    return()=>clearInterval(timerRef.current);
  },[paused]);

  const curQ=qList[qIdx];
  if(!curQ) return null;

  function dotStatus(q,i){
    if(i===qIdx) return"current";
    if(marked.has(q.id)) return"review";
    if(prog[q.id]===undefined) return"unanswered";
    return prog[q.id].correct?"correct":"wrong";
  }

  const dotStyles={current:{bg:"#fff",border:"2.5px solid #0F172A",color:"#0F172A"},correct:{bg:"#DCFCE7",color:"#15803D",border:"1px solid #22C55E"},wrong:{bg:"#FEE2E2",color:"#B91C1C",border:"1px solid #EF4444"},review:{bg:"#FEF9C3",color:"#A16207",border:"1px solid #F59E0B"},unanswered:{bg:"#F1F5F9",color:"#6B7280",border:"1px solid #E5E7EB"}};

  function goBack(){clearInterval(timerRef.current);setPage("bankSubj");}

  return (
    <div style={{display:"flex",flexDirection:"column",height:"100vh",fontFamily:"'Montserrat',sans-serif"}}>
      {/* Topbar */}
      <div style={{height:52,background:"#fff",borderBottom:"1px solid #F1F5F9",display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 20px",flexShrink:0,gap:12}}>
        <button onClick={goBack} style={{display:"flex",alignItems:"center",gap:5,background:"transparent",border:"none",font:"600 13px 'Montserrat',sans-serif",color:"#6B7280",cursor:"pointer",padding:"7px 10px",borderRadius:8}}>
          <Ic n="cL" s={14} c="#6B7280"/> Orqaga
        </button>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <div style={{background:"#0F172A",color:"#fff",padding:"6px 16px",borderRadius:8,font:"700 16px/1 'Montserrat',sans-serif",letterSpacing:"1px",fontVariantNumeric:"tabular-nums"}}>
            {fmt(elapsed)}
          </div>
          <button onClick={()=>setPaused(v=>!v)} style={{display:"flex",alignItems:"center",gap:5,background:"transparent",border:"1.5px solid #E5E7EB",padding:"5px 11px",borderRadius:7,font:"600 12px 'Montserrat',sans-serif",cursor:"pointer",color:"#6B7280"}}>
            <Ic n={paused?"play":"pause"} s={13} c="#6B7280"/> {paused?"Davom":"To'xtat"}
          </button>
        </div>
        <div style={{font:"600 13px 'Montserrat',sans-serif",color:"#6B7280"}}>{qIdx+1} / {qList.length}</div>
      </div>

      {/* Body */}
      <div style={{flex:1,overflow:"hidden",display:"flex",position:"relative"}}>
        {curQ.pass?(
          <>
            <div style={{flex:1,overflowY:"auto",padding:"28px 24px",borderRight:"1px solid #F1F5F9",fontSize:14,lineHeight:1.8,color:"#374151",fontWeight:400}}>
              {curQ.img&&<img src={curQ.img} alt="" style={{width:"100%",maxHeight:220,objectFit:"contain",borderRadius:10,border:"1px solid #E5E7EB",marginBottom:16}}/>}
              {curQ.pass}
            </div>
            <div style={{width:500,flexShrink:0,overflowY:"auto",padding:"24px"}}>
              <QuestionCard q={curQ} idx={qIdx} prog={prog} setProg={setProg} eliminated={eliminated} setEliminated={setEliminated} marked={marked} setMarked={setMarked}/>
            </div>
          </>
        ):(
          <div style={{flex:1,overflowY:"auto",padding:36,display:"flex",flexDirection:"column",alignItems:"center"}}>
            <div style={{width:"100%",maxWidth:700}}>
              {curQ.img&&<img src={curQ.img} alt="" style={{width:"100%",maxHeight:260,objectFit:"contain",borderRadius:10,border:"1px solid #E5E7EB",marginBottom:18}}/>}
              <QuestionCard q={curQ} idx={qIdx} prog={prog} setProg={setProg} eliminated={eliminated} setEliminated={setEliminated} marked={marked} setMarked={setMarked}/>
            </div>
          </div>
        )}

        {/* Navigator panel */}
        {showNav&&(
          <div style={{position:"absolute",bottom:0,left:0,background:"#fff",border:"1px solid #E5E7EB",borderRadius:"0 14px 0 0",padding:16,boxShadow:"0 -4px 24px rgba(0,0,0,.1)",zIndex:200,minWidth:300,maxWidth:340}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
              <div style={{font:"700 13px 'Montserrat',sans-serif"}}>Savollar banki</div>
              <button onClick={()=>setShowNav(false)} style={{background:"transparent",border:"none",cursor:"pointer",color:"#9CA3AF",font:"600 14px 'Montserrat',sans-serif"}}>✕</button>
            </div>
            <div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:12,paddingBottom:10,borderBottom:"1px solid #F1F5F9"}}>
              {[["#DCFCE7","#22C55E","check","To'g'ri"],["#FEE2E2","#EF4444","cross","Xato"],["#FEF9C3","#F59E0B","bm","Ko'rib chiqish"],["#F1F5F9","#9CA3AF",null,"Javobsiz"]].map(([bg,c,icon,label])=>(
                <div key={label} style={{display:"flex",alignItems:"center",gap:4}}>
                  <div style={{width:16,height:16,borderRadius:4,background:bg,border:`1px solid ${c}`,display:"flex",alignItems:"center",justifyContent:"center"}}>
                    {icon&&<Ic n={icon} s={8} c={c}/>}
                  </div>
                  <span style={{fontSize:10,fontWeight:600,color:"#6B7280"}}>{label}</span>
                </div>
              ))}
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(6,1fr)",gap:5}}>
              {qList.map((q,i)=>{
                const st=dotStatus(q,i);
                const dc=dotStyles[st];
                return (
                  <div key={q.id} onClick={()=>{setQIdx(i);setShowNav(false);}}
                    style={{width:38,height:38,borderRadius:8,background:dc.bg,border:dc.border,display:"flex",alignItems:"center",justifyContent:"center",font:"700 12px 'Montserrat',sans-serif",color:dc.color,cursor:"pointer",position:"relative",transition:".12s"}}>
                    {i+1}
                    {st==="correct"&&<div style={{position:"absolute",top:-5,right:-5,width:14,height:14,borderRadius:"50%",background:"#22C55E",display:"flex",alignItems:"center",justifyContent:"center"}}><Ic n="check" s={8} c="#fff"/></div>}
                    {st==="wrong"&&<div style={{position:"absolute",top:-5,right:-5,width:14,height:14,borderRadius:"50%",background:"#EF4444",display:"flex",alignItems:"center",justifyContent:"center"}}><Ic n="cross" s={8} c="#fff"/></div>}
                    {st==="review"&&<div style={{position:"absolute",top:-5,right:-5,width:14,height:14,borderRadius:"50%",background:"#F59E0B",display:"flex",alignItems:"center",justifyContent:"center"}}><Ic n="bm" s={6} c="#fff"/></div>}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Bottom bar */}
      <div style={{height:56,background:"#fff",borderTop:"1px solid #F1F5F9",display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 20px",flexShrink:0}}>
        <div onClick={()=>setShowNav(v=>!v)}
          style={{display:"flex",alignItems:"center",gap:6,background:"#0F172A",color:"#fff",padding:"7px 14px",borderRadius:100,font:"700 12px 'Montserrat',sans-serif",cursor:"pointer",userSelect:"none"}}>
          {qIdx+1} / {qList.length} <Ic n={showNav?"cD":"cU"} s={12} c="#fff"/>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          {qIdx>0&&<button onClick={()=>setQIdx(i=>i-1)} style={{background:"#fff",color:"#111",border:"1.5px solid #E5E7EB",padding:"8px 16px",borderRadius:10,font:"600 13px 'Montserrat',sans-serif",cursor:"pointer"}}>← Oldingi</button>}
          {qIdx<qList.length-1
            ?<button onClick={()=>setQIdx(i=>i+1)} style={{background:"#0F172A",color:"#fff",border:"none",padding:"8px 18px",borderRadius:10,font:"700 13px 'Montserrat',sans-serif",cursor:"pointer"}}>Keyingi →</button>
            :<button onClick={goBack} style={{background:"#059669",color:"#fff",border:"none",padding:"8px 18px",borderRadius:10,font:"700 13px 'Montserrat',sans-serif",cursor:"pointer"}}>Tugatish ✓</button>}
        </div>
      </div>
    </div>
  );
}

/* ── HOME ─────────────────────────────────────────────────────────────── */
function HomeView({subjects,questions,prog,openSubject}) {
  const answered=Object.keys(prog).length;
  const correct=Object.values(prog).filter(p=>p.correct).length;
  return (
    <div style={{fontFamily:"'Montserrat',sans-serif"}}>
      <div style={{background:"#0F172A",padding:"64px 40px 100px",textAlign:"center",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse 60% 40% at 50% 0%,rgba(37,99,235,.18) 0%,transparent 70%)",pointerEvents:"none"}}/>
        <div style={{position:"absolute",bottom:0,left:0,right:0,height:56,background:"#F8FAFC",clipPath:"ellipse(54% 100% at 50% 100%)"}}/>
        <div style={{display:"inline-flex",gap:6,alignItems:"center",background:"rgba(37,99,235,.15)",border:"1px solid rgba(37,99,235,.25)",color:"#60A5FA",padding:"5px 15px",borderRadius:100,fontSize:11,fontWeight:700,letterSpacing:".7px",textTransform:"uppercase",marginBottom:18}}>🇺🇿 O'zbekiston universitetlari uchun</div>
        <h1 style={{fontFamily:"'Montserrat',sans-serif",fontSize:"clamp(30px,5vw,54px)",color:"#fff",lineHeight:1.1,letterSpacing:"-2px",marginBottom:14,fontWeight:900,position:"relative",zIndex:1}}>
          Universitetga<br/><span style={{color:"#60A5FA"}}>tayyorlan.</span>
        </h1>
        <p style={{color:"rgba(255,255,255,.5)",fontSize:15,maxWidth:440,margin:"0 auto 28px",lineHeight:1.7,position:"relative",zIndex:1,fontWeight:500}}>DTM va oliy o'quv yurtlari imtihonlariga samarali tayyorlanish platformasi.</p>
        <div style={{display:"flex",gap:14,justifyContent:"center",flexWrap:"wrap",position:"relative",zIndex:1}}>
          {[["Jami savollar",questions.length,"#60A5FA"],["Javob berilgan",answered,"#34D399"],["To'g'ri",correct,"#A78BFA"]].map(([l,v,c])=>(
            <div key={l} style={{background:"rgba(255,255,255,.06)",border:"1px solid rgba(255,255,255,.1)",padding:"14px 24px",borderRadius:12,textAlign:"center"}}>
              <div style={{fontSize:26,fontWeight:900,color:c,letterSpacing:"-1px"}}>{v}</div>
              <div style={{fontSize:11,color:"rgba(255,255,255,.5)",fontWeight:600,marginTop:2}}>{l}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{maxWidth:880,margin:"0 auto",padding:"36px 28px"}}>
        <div style={{font:"800 22px 'Montserrat',sans-serif",letterSpacing:"-.5px",marginBottom:6}}>Fanlar</div>
        <div style={{fontSize:12,color:"#6B7280",marginBottom:20,fontWeight:500}}>Fan tanlang va mashq boshlang</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:12}}>
          {subjects.map(s=>{
            const sqs=questions.filter(q=>q.sub===s.id).length;
            const sans=questions.filter(q=>q.sub===s.id&&prog[q.id]).length;
            const pct=sqs?Math.round(sans/sqs*100):0;
            return (
              <div key={s.id} onClick={()=>openSubject(s)}
                style={{borderRadius:14,padding:22,background:`linear-gradient(135deg,${s.color1},${s.color2})`,color:"#fff",cursor:"pointer",position:"relative",overflow:"hidden",minHeight:140,display:"flex",flexDirection:"column",justifyContent:"space-between",transition:".18s"}}>
                <div style={{position:"absolute",right:14,top:14,opacity:.12}}><Ic n="book" s={56} c="#fff"/></div>
                <div><div style={{fontSize:18,fontWeight:800,marginBottom:3,letterSpacing:"-.3px"}}>{s.name}</div><div style={{fontSize:12,opacity:.8,fontWeight:500}}>{sqs} ta savol</div></div>
                <div>
                  <div style={{background:"rgba(255,255,255,.25)",borderRadius:100,height:4,marginBottom:8,overflow:"hidden"}}>
                    <div style={{height:"100%",background:"rgba(255,255,255,.9)",borderRadius:100,width:`${pct}%`}}/>
                  </div>
                  <button onClick={e=>{e.stopPropagation();openSubject(s);}} style={{display:"inline-flex",alignItems:"center",gap:5,background:"rgba(255,255,255,.9)",color:"#111",border:"none",padding:"7px 15px",borderRadius:100,font:"700 12px 'Montserrat',sans-serif",cursor:"pointer"}}>Ochish ›</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ── APP ──────────────────────────────────────────────────────────────── */
export default function App() {
  const [page,setPage]=useState("home");
  const [questions,setQuestions]=useState(INIT_QUESTIONS);
  const [subjects,setSubjects]=useState(INIT_SUBJECTS);
  const [activeSubj,setActiveSubj]=useState(null);
  const [prog,setProg]=useState({}); // {qid:{ans,correct}}
  const [eliminated,setEliminated]=useState({});
  const [qList,setQList]=useState([]);
  const [qIdx,setQIdx]=useState(0);
  const [toast,setToast]=useState("");

  function showToast(m){setToast(m);setTimeout(()=>setToast(""),2600);}
  function openSubject(s){setActiveSubj(s);setPage("bankSubj");}

  if(page==="question") return (
    <QuestionView qList={qList} qIdx={qIdx} setQIdx={setQIdx} setPage={p=>{setPage(p==="bankSubj"?"bankSubj":"bank");}} prog={prog} setProg={setProg} subjects={subjects}/>
  );

  return (
    <div style={{display:"flex",background:"#F8FAFC",minHeight:"100vh"}}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&display=swap');*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}body{font-family:'Montserrat',sans-serif;}::-webkit-scrollbar{width:4px;}::-webkit-scrollbar-thumb{background:#CBD5E1;border-radius:10px;}@keyframes fadeup{from{opacity:0;transform:translateX(-50%) translateY(8px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}`}</style>
      <Sidebar page={page} setPage={setPage} subjects={subjects} activeSubj={activeSubj} setActiveSubj={setActiveSubj} openSubject={openSubject}/>
      <div style={{flex:1,overflowY:"auto",background:"#F8FAFC"}}>
        {page==="home"&&<HomeView subjects={subjects} questions={questions} prog={prog} openSubject={openSubject}/>}
        {page==="bank"&&(
          <div style={{maxWidth:880,margin:"0 auto",padding:"36px 28px",fontFamily:"'Montserrat',sans-serif"}}>
            <div style={{font:"800 26px 'Montserrat',sans-serif",letterSpacing:"-.5px",marginBottom:6}}>Savollar banki</div>
            <div style={{fontSize:12,color:"#6B7280",marginBottom:24,fontWeight:500}}>Fan tanlang</div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:12}}>
              {subjects.map(s=>(
                <div key={s.id} onClick={()=>openSubject(s)} style={{borderRadius:14,padding:22,background:`linear-gradient(135deg,${s.color1},${s.color2})`,color:"#fff",cursor:"pointer",position:"relative",overflow:"hidden",minHeight:130,display:"flex",flexDirection:"column",justifyContent:"space-between"}}>
                  <div><div style={{fontSize:17,fontWeight:800,marginBottom:3}}>{s.name}</div><div style={{fontSize:12,opacity:.8}}>{questions.filter(q=>q.sub===s.id).length} ta savol</div></div>
                  <button onClick={e=>{e.stopPropagation();openSubject(s);}} style={{display:"inline-flex",alignItems:"center",gap:5,background:"rgba(255,255,255,.9)",color:"#111",border:"none",padding:"7px 15px",borderRadius:100,font:"700 12px 'Montserrat',sans-serif",cursor:"pointer",marginTop:12,width:"fit-content"}}>Ochish ›</button>
                </div>
              ))}
            </div>
          </div>
        )}
        {page==="bankSubj"&&activeSubj&&(
          <BankSubject subj={activeSubj} questions={questions} prog={prog} setPage={setPage} setQList={setQList} setQIdx={setQIdx} eliminated={eliminated}/>
        )}
        {(page==="stats"||page==="weak")&&<StatsView questions={questions} subjects={subjects} prog={prog} page={page}/>}
        {["adminAdd","adminManage","adminSubjects"].includes(page)&&(
          <AdminView page={page} questions={questions} setQuestions={setQuestions} subjects={subjects} setSubjects={setSubjects} showToast={showToast}/>
        )}
      </div>
      {toast&&<div style={{position:"fixed",bottom:24,left:"50%",transform:"translateX(-50%)",background:"#0F172A",color:"#fff",padding:"10px 20px",borderRadius:100,fontSize:12,fontWeight:700,zIndex:9999,animation:"fadeup .2s",whiteSpace:"nowrap",fontFamily:"'Montserrat',sans-serif"}}>{toast}</div>}
    </div>
  );
export default App;
