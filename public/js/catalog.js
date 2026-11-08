const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function card(p){const l=L.get(),h=[40,62,50,80,66].map(x=>`<i style="height:${x}%"></i>`).join('');
const pr=p.price==null?L.t('price_tbd'):new Intl.NumberFormat(l,{style:'currency',currency:p.currency}).format(p.price);
return `<article class="card"><div class="thumb" role="img" aria-label="${esc(p.title[l])}">${h}</div><div class="b"><div><span class="tag">${FMT[p.format]}</span> <span class="tag">${esc(T[l].ind[p.industry])}</span> ${p.demo?`<span class="tag demo">${L.t('demo')}</span>`:''}</div>
<h3>${esc(p.title[l])}</h3><p>${esc(p.desc[l])}</p><span class="price">${esc(pr)}</span><button class="btn dark" disabled style="opacity:.55;cursor:not-allowed">${L.t('view')}</button></div></article>`}
function featured(){const e=document.getElementById('feat');if(e)e.innerHTML=PRODUCTS.filter(p=>p.featured).map(card).join('')}
function explore(){const g=document.getElementById('list');if(!g)return;const q=sq.value.trim().toLowerCase(),f=sf.value,i=si.value,s=ss.value,l=L.get();
let r=PRODUCTS.filter(p=>(!q||p.title[l].toLowerCase().includes(q)||p.title.en.toLowerCase().includes(q))&&(!f||p.format===f)&&(i===''||p.industry==i));
r.sort((a,b)=>s==='new'?b.created.localeCompare(a.created):((a.price??1e12)-(b.price??1e12))*(s==='lo'?1:-1));
g.innerHTML=r.length?r.map(card).join(''):`<div class="empty" style="grid-column:1/-1">${L.t('none')}</div>`}
function exploreInit(){const l=L.get();
sf.innerHTML=`<option value="">${L.t('all_f')}</option>`+Object.entries(FMT).map(([k,v])=>`<option value="${k}">${v}</option>`).join('');
si.innerHTML=`<option value="">${L.t('all_i')}</option>`+T[l].ind.map((n,k)=>`<option value="${k}">${n}</option>`).join('');
ss.innerHTML=['new','lo','hi'].map(k=>`<option value="${k}">${L.t('sort_'+k)}</option>`).join('');
const f=new URL(location).searchParams.get('f');if(f)sf.value=f;
[sq,sf,si,ss].forEach(e=>e.oninput=explore);clr.onclick=()=>{sq.value=sf.value=si.value='';ss.value='new';explore()};explore()}
