import rss from '@astrojs/rss';
import { getPosts } from './writing';
import { text, localPath, type Lang } from './i18n';
export async function createFeed(lang: Lang, site: URL) {
  const posts = await getPosts(lang);
  return rss({
    title: text(lang,'Yujie Huang · Writing','黄裕杰 · 写作'),
    description: text(lang,'Research notes and thoughts beyond a paper. Posts marked [Example] demonstrate the reading experience.','研究笔记、阅读记录，以及论文之外的思考。带 [示例] 的文章用于展示阅读体验。'),
    site,
    items: posts.map(post=>({title:`${post.data.example ? text(lang,'[Example] ','[示例] ') : ''}${post.data.title}`,description:post.data.description,pubDate:post.data.pubDate,link:localPath(lang,`/writing/${post.slug}/`),categories:post.data.tags})),
    customData:`<language>${lang === 'en' ? 'en-us' : 'zh-cn'}</language>`,
  });
}
