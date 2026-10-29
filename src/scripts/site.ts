import { ui } from '../lib/i18n';
const lang = document.documentElement.lang.startsWith('zh') ? 'zh' : 'en';
const t = ui[lang];
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

// Content is visible by default; only animate elements that start offscreen.
if (!reduceMotion.matches && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    }
  }, { threshold: .07 });
  document.querySelectorAll<HTMLElement>('[data-reveal]').forEach(el => {
    if (el.getBoundingClientRect().top > window.innerHeight) {
      el.classList.add('reveal-ready');
      observer.observe(el);
    }
  });
}

const field = document.querySelector<HTMLCanvasElement>('[data-field]');
if (field) setupField(field);

function setupField(canvas: HTMLCanvasElement) {
  const context = canvas.getContext('2d');
  const container = canvas.closest<HTMLElement>('.field');
  const stage = canvas.parentElement;
  const button = document.querySelector<HTMLButtonElement>('[data-motion]');
  if (!context || !container || !stage || !button) return;
  const ctx = context;
  const label = button.querySelector('[data-motion-label]');
  let paused = reduceMotion.matches;
  try { paused = paused || localStorage.getItem('nocturne-motion') === 'paused'; } catch { /* optional preference */ }
  let visible = true;
  let frame = 0;
  let previousTime = 0;
  let angle = -.38;
  let width = 0;
  let height = 0;
  let pointer = 0;
  const points: {x:number;y:number;z:number;gold:boolean}[] = [];
  for (let band = 0; band < 37; band++) {
    const v = band / 37 * Math.PI * 2;
    for (let step = 0; step < 84; step++) {
      const u = step / 84 * Math.PI * 2;
      const r = .97 + .31 * Math.cos(v) + .065 * Math.sin(3*u + 2*v);
      points.push({ x:r*Math.cos(u), y:.39*Math.sin(v)+.13*Math.cos(2*u), z:r*Math.sin(u), gold:band>22 });
    }
  }
  function paint() {
    ctx.clearRect(0,0,width,height);
    const scale = Math.min(width,height)*.30;
    const tilt = .78 + pointer*.06;
    const cos = Math.cos(angle), sin = Math.sin(angle);
    const projected = points.map(p => {
      const x = p.x*cos-p.z*sin;
      const z = p.x*sin+p.z*cos;
      const y = p.y*Math.cos(tilt)-z*Math.sin(tilt);
      const depth = p.y*Math.sin(tilt)+z*Math.cos(tilt);
      const perspective = 3.8/(3.8-depth);
      return {x:width/2+(x*.94+y*.28)*scale*perspective,y:height/2+(y*.95-x*.18)*scale*perspective,depth,perspective,gold:p.gold};
    }).sort((a,b)=>a.depth-b.depth);
    for(const p of projected) {
      const opacity = .24 + (p.depth+1.4)/2.8*.55;
      ctx.fillStyle = p.gold ? `rgba(150,134,90,${opacity*.8})` : `rgba(70,110,91,${opacity})`;
      ctx.beginPath();
      ctx.arc(p.x,p.y,Math.max(.4, .78*p.perspective),0,Math.PI*2);
      ctx.fill();
    }
  }
  function tick(time: number) {
    frame = 0;
    if (paused || !visible || document.hidden) return;
    if (time - previousTime >= 32) {
      angle += Math.min(time-previousTime,50)*.00011;
      previousTime = time;
      paint();
    }
    frame = requestAnimationFrame(tick);
  }
  function syncAnimation() {
    if(frame) cancelAnimationFrame(frame);
    frame=0;
    previousTime=performance.now();
    if(!paused && visible && !document.hidden) frame=requestAnimationFrame(tick);
    button!.setAttribute('aria-pressed',String(paused));
    button!.setAttribute('aria-label',paused?t.playMotion:t.pauseMotion);
    if(label) label.textContent=paused?t.play:t.pause;
  }
  function resize() {
    const bounds=stage!.getBoundingClientRect();
    width=bounds.width; height=bounds.height;
    const ratio=Math.min(window.devicePixelRatio || 1,2);
    canvas.width=Math.round(width*ratio);canvas.height=Math.round(height*ratio);
    ctx.setTransform(ratio,0,0,ratio,0,0);
    paint();
    container!.classList.add('is-ready');
  }
  new ResizeObserver(resize).observe(stage);
  new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;syncAnimation();},{threshold:.01}).observe(canvas);
  canvas.addEventListener('pointermove',event=>{if(!paused && !reduceMotion.matches){const b=canvas.getBoundingClientRect();pointer=(event.clientX-b.left)/b.width-.5;}});
  canvas.addEventListener('pointerleave',()=>{pointer=0;});
  button.addEventListener('click',()=>{paused=!paused;try{localStorage.setItem('nocturne-motion',paused?'paused':'playing');}catch{}syncAnimation();});
  reduceMotion.addEventListener('change',event=>{if(event.matches) paused=true;syncAnimation();});
  document.addEventListener('visibilitychange',syncAnimation);
  resize();syncAnimation();
}

const writing = document.querySelector<HTMLElement>('[data-writing]');
if(writing) {
  const controls=writing.querySelector<HTMLElement>('[data-writing-controls]');
  const input=writing.querySelector<HTMLInputElement>('[data-search-input]');
  const buttons=Array.from(writing.querySelectorAll<HTMLButtonElement>('[data-filter]'));
  const posts=Array.from(writing.querySelectorAll<HTMLElement>('[data-post]'));
  const count=writing.querySelector<HTMLElement>('[data-results]');
  const empty=writing.querySelector<HTMLElement>('[data-no-results]');
  let selectedTag='';
  const normalize=(value:string)=>value.normalize('NFKC').toLocaleLowerCase().trim();
  function filter(updateURL=true) {
    const query=normalize(input?.value || '');
    let total=0;
    for(const post of posts){
      const tags: string[]=JSON.parse(post.dataset.tags || '[]');
      const matches=(!selectedTag || tags.includes(selectedTag)) && (!query || normalize(post.dataset.search || '').includes(query));
      post.hidden=!matches;
      if(matches)total++;
    }
    buttons.forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.filter===selectedTag)));
    if(count) count.textContent=`${total} / ${posts.length} ${t.notes}`;
    if(empty) empty.hidden=total>0;
    if(updateURL){
      const url=new URL(window.location.href);
      if(input?.value.trim())url.searchParams.set('q',input.value.trim());else url.searchParams.delete('q');
      if(selectedTag)url.searchParams.set('tag',selectedTag);else url.searchParams.delete('tag');
      history.replaceState(null,'',url);
    }
  }
  function readURL(){
    const params=new URLSearchParams(window.location.search);
    if(input)input.value=params.get('q') || '';
    selectedTag=params.get('tag') || '';
    filter(false);
  }
  if(controls)controls.hidden=false;
  input?.addEventListener('input',()=>filter());
  buttons.forEach(button=>button.addEventListener('click',()=>{selectedTag=button.dataset.filter || '';filter();}));
  writing.querySelector('[data-clear-search]')?.addEventListener('click',()=>{if(input)input.value='';selectedTag='';filter();input?.focus();});
  window.addEventListener('popstate',readURL);
  readURL();
}

document.querySelectorAll<HTMLButtonElement>('[data-copy]').forEach(button=>{
  button.hidden=false;
  button.addEventListener('click',async()=>{
    const code=document.getElementById(button.dataset.copy || '');
    const status=button.parentElement?.querySelector<HTMLElement>('[role=status]');
    if(!code)return;
    try{
      await navigator.clipboard.writeText(code.textContent || '');
      if(status)status.textContent=lang === 'en' ? 'BibTeX copied.' : '已复制 BibTeX。';
    }catch{
      const selection=window.getSelection();const range=document.createRange();range.selectNodeContents(code);selection?.removeAllRanges();selection?.addRange(range);
      if(status)status.textContent=lang === 'en' ? 'Citation selected. Press Ctrl+C or Command+C to copy.' : '引用已选中，请按 Ctrl+C 或 Command+C 复制。';
    }
  });
});

const article=document.querySelector<HTMLElement>('[data-article]');
const progress=document.querySelector<HTMLElement>('[data-reading-progress]');
if(article && progress){
  const update=()=>{const total=article.offsetHeight-window.innerHeight;const percent=total>0?Math.min(1,Math.max(0,(window.scrollY-article.offsetTop)/total)):1;progress.style.transform=`scaleX(${percent})`;};
  let scheduled=false;
  window.addEventListener('scroll',()=>{if(!scheduled){scheduled=true;requestAnimationFrame(()=>{update();scheduled=false;});}},{passive:true});
  window.addEventListener('resize',update);update();
}
