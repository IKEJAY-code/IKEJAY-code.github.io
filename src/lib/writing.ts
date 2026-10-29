import { getCollection } from 'astro:content';
import type { Lang } from './i18n';

export async function getPosts(lang: Lang = 'en') {
  return (await getCollection('writing', ({ data }) => data.lang === lang && !data.draft && data.pubDate <= new Date()))
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
    .map(post => ({ ...post, slug: post.data.translationKey || post.id }));
}
export function formatDate(date: Date, lang: Lang = 'en') {
  return new Intl.DateTimeFormat(lang === 'en' ? 'en' : 'zh-CN', { year: 'numeric', month: 'short', day: '2-digit', timeZone: 'UTC' }).format(date);
}
export function readingTime(body = '') {
  const cjk = (body.match(/[\u3400-\u9fff]/g) || []).length;
  const words = body.replace(/[\u3400-\u9fff]/g, '').split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(cjk / 350 + words / 220));
}
