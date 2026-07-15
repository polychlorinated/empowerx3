import type { APIRoute } from 'astro';

function jsonResponse(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export const POST: APIRoute = async ({ request }) => {
  // Ensure we always return JSON, even on unexpected errors
  try {
    const formData = await request.formData();
    
    const payload = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      goal: formData.get('goal'),
      message: formData.get('message'),
      timestamp: new Date().toISOString(),
      source: 'empowerx3.com contact form',
    };

    // Validate required fields
    if (!payload.name || !payload.email || !payload.message) {
      return jsonResponse({ success: false, error: 'Missing required fields' }, 400);
    }

    // Use environment variables with fallbacks
    const webhookTest = import.meta.env.N8N_WEBHOOK_TEST_URL || 'https://n8n.srv725961.hstgr.cloud/webhook-test/77d4dc7e-9a6c-462f-adf8-75c403a32b33';
    const webhookProd = import.meta.env.N8N_WEBHOOK_PROD_URL || 'https://n8n.srv725961.hstgr.cloud/webhook/77d4dc7e-9a6c-462f-adf8-75c403a32b33';

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    // Fire webhooks but don't wait for them - return success immediately
    const webhookPromise = Promise.allSettled([
      fetch(webhookTest, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal,
      }).catch(err => {
        console.error('Test webhook error:', err);
        return { ok: false, error: err };
      }),
      fetch(webhookProd, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal,
      }).catch(err => {
        console.error('Prod webhook error:', err);
        return { ok: false, error: err };
      }),
    ]);

    clearTimeout(timeoutId);

    // Log results asynchronously
    webhookPromise.then(results => {
      const errors = results
        .filter((r): r is PromiseRejectedResult => r.status === 'rejected')
        .map((r) => r.reason);
      
      const fulfilled = results.filter(r => r.status === 'fulfilled');
      fulfilled.forEach(r => {
        if (r.value && typeof r.value === 'object' && 'ok' in r.value && !r.value.ok) {
          console.error('Webhook returned non-ok:', r.value);
        }
      });
      
      if (errors.length > 0) {
        console.error('Webhook errors:', errors.map(e => e?.message || String(e)).join('; '));
      }
    });

    // Always return success JSON
    return jsonResponse({ success: true });
  } catch (error) {
    console.error('Contact API error:', error);
    // Always return JSON, never throw
    return jsonResponse({ success: true });
  }
};