/* Portfolio filters + full-screen viewer. Vanilla JS, no dependencies. */
(function(){
 var $=function(s,r){return(r||document).querySelector(s)},$$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
 var DATA=JSON.parse($('#pf-data').textContent),BY={};DATA.forEach(function(p){BY[p.id]=p});
 var cards=$$('.pcard'),tabs=$$('.tab'),q=$('#q'),ind=$('#ind'),cur='all';
 var NAMES={all:'all projects',excel:'Excel dashboards',powerbi:'Power BI dashboards',html:'HTML dashboards'};
 function apply(){
  var t=q.value.trim().toLowerCase(),i=ind.value,n=0;
  cards.forEach(function(c){var ok=(cur==='all'||c.dataset.cat===cur)&&(!i||c.dataset.ind===i)&&(!t||c.dataset.title.indexOf(t)>-1);c.hidden=!ok;if(ok)n++});
  var e=$('#empty'),pb=cur==='powerbi'&&!t&&!i;
  e.hidden=n>0;$('#empty-wa').hidden=!pb;
  $('#empty-h').textContent=pb?'Power BI case studies are being prepared':'No projects match';
  $('#empty-p').textContent=pb?'I am preparing verified Power BI project pages for this portfolio. Message me on WhatsApp to see current Power BI examples.':'Try a different search or clear the filters.';
  $('#status').textContent=n+' '+(n===1?'project':'projects')+' shown in '+NAMES[cur];
 }
 function setTab(k,scroll){cur=k;tabs.forEach(function(b){b.setAttribute('aria-selected',b.dataset.tab===k)});apply();if(scroll)$('#portfolio').scrollIntoView({behavior:'smooth'})}
 tabs.forEach(function(b){b.addEventListener('click',function(){setTab(b.dataset.tab)})});
 q.addEventListener('input',apply);ind.addEventListener('change',apply);
 $('#clr').addEventListener('click',function(){q.value='';ind.value='';setTab('all')});
 $$('[data-go]').forEach(function(a){a.addEventListener('click',function(){setTab(a.dataset.go,false)})});
 var H={'#excel':'excel','#power-bi':'powerbi','#html':'html'};
 function hash(){var k=H[location.hash];if(k){setTab(k);$('#portfolio').scrollIntoView()}}
 window.addEventListener('hashchange',hash);apply();hash();
 /* viewer */
 var lb=$('#lb'),img=$('#lb-img'),P=null,I=0,opener=null;
 function show(){
  var m=P.imgs[I];img.src=m.src;img.alt=m.alt;img.width=m.w;img.height=m.h;
  $('#lb-cnt').textContent=P.imgs.length>1?'Screenshot '+(I+1)+' of '+P.imgs.length:'';
  $('#lb-prev').disabled=I===0;$('#lb-next').disabled=I===P.imgs.length-1;
  $('#lb-prev').hidden=$('#lb-next').hidden=P.imgs.length<2;
  $$('#lb-th button').forEach(function(b,k){b.setAttribute('aria-current',k===I)});
  if(P.imgs[I+1]){var pre=new Image();pre.src=P.imgs[I+1].src}
 }
 function esc(s){var d=document.createElement('div');d.textContent=s;return d.innerHTML}
 function open(id,from){
  P=BY[id];if(!P)return;I=0;opener=from||document.activeElement;
  $('#lb-title').textContent=P.title;$('#lb-desc').textContent=P.desc;
  $('#lb-tags').innerHTML='<span class="tag tech">'+esc(P.tech)+'</span><span class="tag">'+esc(P.industry)+'</span>'+(P.sample?'<span class="tag demo">'+esc(P.sample)+'</span>':'');
  $('#lb-hl').innerHTML=P.hl.map(function(h){return'<li>'+esc(h)+'</li>'}).join('');
  $('#lb-th').innerHTML=P.imgs.length>1?P.imgs.map(function(m,k){return'<button type="button" data-k="'+k+'" aria-label="Show screenshot '+(k+1)+'"><img src="'+m.src+'" alt=""></button>'}).join(''):'';
  $('#lb-wa').href=P.wa;
  lb.hidden=false;document.body.style.overflow='hidden';show();$('#lb-x').focus();
 }
 function close(){lb.hidden=true;document.body.style.overflow='';img.removeAttribute('src');if(opener&&opener.focus)opener.focus()}
 document.addEventListener('click',function(e){var b=e.target.closest('[data-open]');if(b)open(b.dataset.open,b)});
 $('#lb-x').addEventListener('click',close);
 $('#lb-prev').addEventListener('click',function(){if(I>0){I--;show()}});
 $('#lb-next').addEventListener('click',function(){if(I<P.imgs.length-1){I++;show()}});
 $('#lb-th').addEventListener('click',function(e){var b=e.target.closest('button');if(b){I=+b.dataset.k;show()}});
 lb.addEventListener('click',function(e){if(e.target===lb||e.target.classList.contains('lb-stage'))close()});
 document.addEventListener('keydown',function(e){
  if(lb.hidden)return;
  if(e.key==='Escape')close();
  else if(e.key==='ArrowRight'||e.key==='ArrowLeft'){var d=(e.key==='ArrowRight')===(document.documentElement.dir!=='rtl')?1:-1;var n=I+d;if(n>=0&&n<P.imgs.length){I=n;show()}}
  else if(e.key==='Tab'){var f=$$('#lb button:not([disabled]):not([hidden]),#lb a[href]').filter(function(x){return x.offsetParent!==null});if(!f.length)return;var a=f[0],z=f[f.length-1];
   if(e.shiftKey&&document.activeElement===a){e.preventDefault();z.focus()}else if(!e.shiftKey&&document.activeElement===z){e.preventDefault();a.focus()}}
 });
 var sx=null;lb.addEventListener('touchstart',function(e){sx=e.touches[0].clientX},{passive:true});
 lb.addEventListener('touchend',function(e){if(sx===null)return;var dx=e.changedTouches[0].clientX-sx;sx=null;if(Math.abs(dx)>50){var n=I+(dx<0?1:-1);if(n>=0&&n<P.imgs.length){I=n;show()}}},{passive:true});
})();
