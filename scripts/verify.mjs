import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, extname, relative } from 'node:path';
const root='dist';
const walk=dir=>readdirSync(dir).flatMap(name=>{const path=join(dir,name);return statSync(path).isDirectory()?walk(path):[path]});
const pages=walk(root).filter(path=>path.endsWith('.html'));
let links=0;
for(const page of pages){
  const html=readFileSync(page,'utf8');
  assert(html.includes('name="viewport"'),`Missing viewport: ${page}`);
  assert(html.includes('<h1'),`Missing heading: ${page}`);
  assert(!html.includes('href="#"'),`Placeholder link: ${page}`);
  for(const match of html.matchAll(/\b(?:href|src)="(\/[^"#?]*)/g)){
    let target=decodeURIComponent(match[1]);if(target.startsWith('//'))continue;
    if(!extname(target))target=join(target,'index.html');
    assert(existsSync(join(root,target)),`Broken internal link ${match[1]} in ${relative(root,page)}`);links++;
  }
  if(html.includes('<html lang="en"')){
    const visible=html.replace(/<a\b(?=[^>]*data-language-switch)[^>]*>[\s\S]*?<\/a>/g,'').replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/g,'').replace(/<[^>]+>/g,'');
    assert(!/[\u3400-\u9fff]/.test(visible),`Chinese text leaked into English page: ${page}`);
  }
}
for(const [prefix,lang] of [['','EN'],['zh/','ZH']]){
  const cv=readFileSync(join(root,prefix,'cv/index.html'),'utf8');
  assert(!cv.includes('<img'),'CV must have no photograph');
  assert(!cv.includes('cv-footer')&&!cv.includes('更新于')&&!cv.includes('公开链接对应'),'Removed CV footer returned');
  assert(cv.includes('Top 5%')&&cv.includes('YujieHuang0526@gmail.com'),'CV facts missing');
  assert(cv.includes(`/files/Yujie-Huang-CV-${lang}.pdf`),'Wrong CV download language');
  const home=readFileSync(join(root,prefix,'index.html'),'utf8');
  assert(home.includes('class="hero-portrait"'),'Opening portrait missing');
  const paper=readFileSync(join(root,prefix,'research/her-pde/index.html'),'utf8');
  assert(paper.includes('70/105')&&paper.includes('94.3%')&&paper.includes('arXiv v1'),'Paper provenance missing');
  const writing=readFileSync(join(root,prefix,'writing/index.html'),'utf8');
  assert(!writing.includes('data-search="文章标题 ')&&!writing.includes('/writing/_template/'),'Unpublished template leaked');
  const rss=readFileSync(join(root,prefix,'rss.xml'),'utf8');
  assert(rss.includes('<rss')&&rss.includes(lang==='EN'?'[Example]':'[示例]'),'Feed language missing');
  assert(readFileSync(join(root,`files/Yujie-Huang-CV-${lang}.pdf`)).subarray(0,4).toString()==='%PDF','CV PDF missing');
}
const pairs=['','about/','research/','research/thinking-in-flow/','research/her-pde/','writing/','writing/a-research-notebook/'];
for(const path of pairs){
  const en=readFileSync(join(root,path,'index.html'),'utf8');
  const zh=readFileSync(join(root,'zh',path,'index.html'),'utf8');
  assert(en.includes(`href="/zh/${path}" lang="zh-CN"`),`English language switch lost page: ${path}`);
  assert(zh.includes(`href="/${path}" lang="en"`),`Chinese language switch lost page: ${path}`);
}
assert(existsSync(join(root,'sitemap-index.xml')),'Sitemap missing');
console.log(`Verified ${pages.length} HTML pages and ${links} internal links/assets; both languages, reciprocal page switches, no-photo CVs, removed footer, research provenance, and feeds passed.`);
