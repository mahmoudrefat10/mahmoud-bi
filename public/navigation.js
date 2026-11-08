const FMT={excel:'Excel',powerbi:'Power BI',html:'HTML'};
function shell(){const p=location.pathname;const pg=p.split('/').pop().replace('.html','')||'index';const a=h=>pg===h.replace('.html','')?'class="on"':'';
document.getElementById('hdr').innerHTML=`<div class="wrap nav"><a href="/index.html"><img class="logo" src="/assets/logo/mahmoud-bi-logo-tight.png" alt="Mahmoud BI logo"></a>
<nav class="links" id="lk" aria-label="Main"><a href="/index.html" ${a('index.html')} data-i="n_home"></a><a href="/explore.html" ${a('explore.html')} data-i="n_explore"></a>
<a href="/explore.html?f=excel" data-i="n_xl"></a><a href="/explore.html?f=powerbi" data-i="n_pbi"></a><a href="/explore.html?f=html" data-i="n_html"></a>
<a href="/index.html#custom" data-i="n_custom"></a><a href="/index.html#about" data-i="n_about"></a><a href="/index.html#contact" data-i="n_contact"></a></nav>
<button class="lang" id="lg" aria-label="Language">EN / عربي</button><a class="btn" href="/explore.html" data-i="explore"></a><button class="burger" id="bg" aria-label="Menu">☰</button></div>`;
document.getElementById('ftr').innerHTML=`<div class="wrap"><div class="fg"><div><div class="fl"><img src="/assets/logo/mahmoud-bi-logo-tight.png" alt="Mahmoud BI"></div><p data-i="fd"></p></div>
<div><h4 data-i="f_nav"></h4><a href="/index.html" data-i="n_home"></a><a href="/explore.html" data-i="n_explore"></a><a href="/index.html#contact" data-i="n_contact"></a></div>
<div><h4 data-i="f_cat"></h4><a href="/explore.html?f=excel" data-i="c1"></a><a href="/explore.html?f=powerbi" data-i="c2"></a><a href="/explore.html?f=html" data-i="c3"></a></div>
<div><h4 data-i="f_soc"></h4><a href="${CONFIG.youtube}" rel="noopener" target="_blank">YouTube</a>${CONFIG.linkedin?`<a href="${CONFIG.linkedin}" rel="noopener" target="_blank">LinkedIn</a>`:''}<a href="mailto:${CONFIG.email}">Email</a></div></div>
<p class="copy" data-i="rights"></p></div>`;
document.getElementById('lg').onclick=()=>L.set(L.get()==='en'?'ar':'en');document.getElementById('bg').onclick=()=>document.getElementById('lk').classList.toggle('open');}
