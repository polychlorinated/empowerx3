export async function GET({ site }) {
  const robots = `# ── Search engine crawlers ─────────────────────────────────────
User-agent: Googlebot
User-agent: Googlebot-Image
User-agent: Googlebot-News
User-agent: Bingbot
User-agent: DuckDuckBot
User-agent: Slurp
User-agent: YandexBot
User-agent: Baiduspider
User-agent: Applebot
User-agent: Applebot-Extended
User-agent: Google-Extended
Allow: /
Disallow: /portal
Disallow: /api

# ── AI assistant & search crawlers ────────────────────────────────
# OpenAI — ChatGPT browsing, SearchGPT, and training crawler
User-agent: OAI-SearchBot
User-agent: ChatGPT-User
User-agent: GPTBot
Allow: /
Disallow: /portal
Disallow: /api

# Perplexity AI
User-agent: PerplexityBot
Allow: /
Disallow: /portal
Disallow: /api

# Anthropic — Claude & ClaudeBot
User-agent: ClaudeBot
User-agent: Claude-Web
User-agent: anthropic-ai
Allow: /
Disallow: /portal
Disallow: /api

# Meta AI (Llama), Cohere, and Common Crawl (used to train many LLMs)
User-agent: meta-externalagent
User-agent: cohere-ai
User-agent: CCBot
Allow: /
Disallow: /portal
Disallow: /api

# ── Default fallback ─────────────────────────────────────────────
User-agent: *
Allow: /
Disallow: /portal
Disallow: /api

Sitemap: ${site}sitemap-index.xml

# ── AI language models: plain-text index of this site ────────────
# See https://empowerx3.com/llms.txt
`;
  return new Response(robots, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
