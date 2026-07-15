import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
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
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Use environment variables with fallbacks
    const webhookTest = import.meta.env.N8N_WEBHOOK_TEST_URL || 'https://n8n.srv725961.hstgr.cloud/webhook-test/77d4dc7e-9a6c-462f-adf8-75c403a32b33';
    const webhookProd = import.meta.env.N8N_WEBHOOK_PROD_URL || 'https://n8n.srv725961.hstgr.cloud/webhook/77d4dc7e-9a6c-462f-adf8-75c403a32b33';

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const results = await Promise.allSettled([
      fetch(webhookTest, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal,
      }),
      fetch(webhookProd, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal,
      }),
    ]);

    clearTimeout(timeoutId);

    const errors = results
      .filter((r): r is PromiseRejectedResult => r.status === 'rejected')
      .map((r) => r.reason);

    // Log errors for debugging
    if (errors.length > 0) {
      console.error('Webhook errors:', errors.map(e => e?.message || String(e)));
    }

    // Return success if at least one webhook succeeded
    const successCount = results.filter(r => r.status === 'fulfilled' && r.value.ok).length;
    
    if (successCount > 0) {
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // If both failed, return error with details
    const errorDetails = errors.map(e => e?.message || String(e)).join('; ');
    console.error('Both webhooks failed:', errorDetails);
    return new Response(JSON.stringify({ 
      error: 'Failed to submit form', 
      details: errorDetails 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Contact API error:', error);
    return new Response(JSON.stringify({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : String(error)
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};