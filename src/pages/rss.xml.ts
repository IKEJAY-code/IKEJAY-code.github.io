import { createFeed } from '../lib/feed';
import type { APIContext } from 'astro';
export async function GET(context: APIContext) { return createFeed('en', context.site!); }
