/* ── CURSOR GLOW ── */
(function(){
  var g=document.getElementById('cursor-glow');
  if(!g)return;
  var mx=window.innerWidth/2,my=window.innerHeight/2,gx=mx,gy=my,raf=0;
  document.addEventListener('mousemove',function(e){
    mx=e.clientX;my=e.clientY;
    if(!raf)raf=requestAnimationFrame(move);
  });
  function move(){
    gx+=(mx-gx)*.08;gy+=(my-gy)*.08;
    g.style.left=gx+'px';g.style.top=gy+'px';
    raf=0;
    if(Math.abs(mx-gx)>.5||Math.abs(my-gy)>.5)raf=requestAnimationFrame(move);
  }
}());

/* ── STAR CANVAS ── */
(function(){
  var c=document.getElementById('star-canvas');
  if(!c)return;
  var ctx=c.getContext('2d'),W,H,stars=[];
  function resize(){W=c.width=window.innerWidth;H=c.height=window.innerHeight;}
  resize();
  window.addEventListener('resize',resize,{passive:true});
  for(var i=0;i<120;i++){
    stars.push({
      x:Math.random()*window.innerWidth,
      y:Math.random()*window.innerHeight,
      r:Math.random()*.9+.2,
      o:Math.random()*.5+.1,
      vx:(Math.random()-.5)*.08,
      vy:(Math.random()-.5)*.08
    });
  }
  function draw(){
    ctx.clearRect(0,0,W,H);
    for(var i=0;i<stars.length;i++){
      var s=stars[i];
      ctx.beginPath();
      ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
      ctx.fillStyle='rgba(167,139,250,'+s.o+')';
      ctx.fill();
      s.x+=s.vx;s.y+=s.vy;
      if(s.x<0)s.x=W;if(s.x>W)s.x=0;
      if(s.y<0)s.y=H;if(s.y>H)s.y=0;
    }
    requestAnimationFrame(draw);
  }
  draw();
}());

/* ── NAVBAR SCROLL ── */
(function(){
  var nb=document.getElementById('navbar');
  if(!nb)return;
  window.addEventListener('scroll',function(){
    window.scrollY>30?nb.classList.add('scrolled'):nb.classList.remove('scrolled');
  },{passive:true});
}());

/* ── ROLE TYPEWRITER ── */
(function(){
  var roles=['Builder','Creator','Engineer','Developer'];
  var el=document.getElementById('role-text');
  if(!el)return;
  var ri=0,ci=0,deleting=false,wait=0;

  function tick(){
    var word=roles[ri];
    if(!deleting){
      el.textContent=word.slice(0,ci+1);
      ci++;
      if(ci===word.length){deleting=true;wait=60;setTimeout(tick,1800);return;}
    } else {
      if(wait>0){wait--;setTimeout(tick,18);return;}
      el.textContent=word.slice(0,ci-1);
      ci--;
      if(ci===0){deleting=false;ri=(ri+1)%roles.length;}
    }
    setTimeout(tick,deleting?60:100);
  }
  tick();
}());

/* ── SCROLL REVEAL ── */
(function(){
  if(!('IntersectionObserver' in window)){
    document.querySelectorAll('.reveal-card').forEach(function(el){
      el.classList.add('visible');
    });
    return;
  }
  var io=new IntersectionObserver(function(entries){
    entries.forEach(function(en){
      if(en.isIntersecting){
        en.target.classList.add('visible');
        io.unobserve(en.target);
      }
    });
  },{threshold:0.15});
  document.querySelectorAll('.reveal-card').forEach(function(el){
    io.observe(el);
  });
}());

/* ── DARK/LIGHT TOGGLE (localStorage persisted) ── */
(function(){
  var btn=document.getElementById('theme-toggle');
  var ico=document.getElementById('theme-icon');
  var html=document.documentElement;

  /* Load saved theme */
  var saved=localStorage.getItem('aarthi-theme')||'dark';
  applyTheme(saved);

  btn.addEventListener('click',function(){
    var cur=html.getAttribute('data-theme')||'dark';
    var next=cur==='dark'?'light':'dark';
    applyTheme(next);
    localStorage.setItem('aarthi-theme',next);
  });

  function applyTheme(t){
    html.setAttribute('data-theme',t);
    if(t==='light'){
      ico.className='fa-solid fa-sun';
    } else {
      ico.className='fa-solid fa-moon';
    }
  }
}());

/* ── SMOOTH NAV LINKS ── */
document.querySelectorAll('a[href^="#"]').forEach(function(a){
  a.addEventListener('click',function(e){
    var id=this.getAttribute('href').slice(1);
    var target=document.getElementById(id);
    if(target){e.preventDefault();target.scrollIntoView({behavior:'smooth'});}
  });
});
