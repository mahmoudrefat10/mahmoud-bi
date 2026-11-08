/* Design-system behaviours: mobile drawer + scroll reveal. No dependencies. */
(function(){
 var b=document.getElementById('burger'),d=document.getElementById('drawer');
 if(b&&d){
  var set=function(o){if(o){var h=document.querySelector('.site-header');d.style.top=Math.max(0,h.getBoundingClientRect().bottom)+'px'}d.classList.toggle('is-open',o);b.setAttribute('aria-expanded',o);document.body.style.overflow=o?'hidden':''};
  b.addEventListener('click',function(){set(b.getAttribute('aria-expanded')!=='true')});
  d.addEventListener('click',function(e){if(e.target.closest('a'))set(false)});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&d.classList.contains('is-open')){set(false);b.focus()}});
  matchMedia('(min-width:981px)').addEventListener('change',function(m){if(m.matches)set(false)});
 }
 var els=document.querySelectorAll('.rv');
 if(!('IntersectionObserver' in window)){els.forEach(function(e){e.classList.add('in')});return}
 var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12});
 els.forEach(function(e){io.observe(e)});
})();
