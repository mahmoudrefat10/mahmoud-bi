let first=true;
document.addEventListener('langchange',()=>{shell();document.querySelectorAll('[data-i]').forEach(e=>e.textContent=T[L.get()][e.dataset.i]);
 const ch=document.getElementById('ind');if(ch)ch.innerHTML=T[L.get()].ind.map(n=>`<span class="chip">${n}</span>`).join('');
 featured();
 if(document.getElementById('list')){const v=first?null:[sq.value,sf.value,si.value,ss.value];exploreInit();if(v){sq.value=v[0];sf.value=v[1];si.value=v[2];ss.value=v[3];explore()}}
 first=false});
L.apply();
