import type { APIRoute } from 'astro';

export const POST: APIRoute = async (context) => {
  try {
    // Parse JSON body from frontend
    const payload = await context.request.json();

    // Validate required fields
    if (!payload.name || !payload.email || !payload.message) {
      return new Response(JSON.stringify({ success: false, error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // 1. FIXED: Extract variables correctly from Cloudflare context
    const runtime = context.locals.runtime;
    const n8nWebhookUrl = runtime.env.N8N_WEBHOOK_PROD_URL;

    if (!n8nWebhookUrl) {
      console.error("Environment variable N8N_WEBHOOK_PROD_URL is missing!");
      return new Response(JSON.stringify({ success: false, error: "Configuration Error" }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // 2. Prepare the n8n fetch promise
    const n8nRequestPromise = fetch(n8nWebhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    // 3. FIXED: Tell Cloudflare to keep the background thread alive until n8n finishes receiving it
    runtime.ctx.waitUntil(n8nRequestPromise);

    // 4. Return instant response to frontend for smooth UX
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error("Backend processing failed:", error);
    return new Response(JSON.stringify({ success: false }), { status: 500 });
  }
};