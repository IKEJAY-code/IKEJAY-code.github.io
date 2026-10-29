import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
const origin = process.env.SITE_URL || 'https://ikejay-code.github.io';
for (const [lang,path] of [['EN','dist/cv/index.html'],['ZH','dist/zh/cv/index.html']]) {
  let html=readFileSync(path,'utf8');
  html=html.replace(/<link\b[^>]*rel="stylesheet"[^>]*>/g, tag=>{
    const href=tag.match(/href="([^"]+)"/)?.[1];
    if(!href)throw new Error('Missing CV stylesheet');
    return `<style>${readFileSync(join('dist',href),'utf8')}</style>`;
  });
  html=html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g,'');
  html=html.replace(/href="\/(?!\/)([^"]*)"/g,(_,path)=>`href="${origin}/${path}"`);
  html=html.replace('</body>','<script>const b=document.querySelector("[data-print]");if(b){b.hidden=false;b.addEventListener("click",()=>window.print());}</script></body>');
  mkdirSync('dist/files',{recursive:true});
  for(const dir of ['public/files','dist/files']){
    writeFileSync(`${dir}/Yujie-Huang-CV-${lang}.html`,html);
    if(lang==='EN')writeFileSync(`${dir}/Yujie-Huang-CV.html`,html);
  }
}
console.log('English and Chinese standalone CV HTML exported.');
