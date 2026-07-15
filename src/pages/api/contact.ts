import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request, cookies }) => {
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

    const webhookTest = import.meta.env.N8N_WEBHOOK_TEST_URL || 'https://n8n.srv725961.hstgr.cloud/webhook-test/77d4dc7e-9a6c-462f-adf8-75c403a32b33';
    const webhookProd = import.meta.env.N8N_WEBHOOK_PROD_URL || 'https://n8n.srv725961.hstgr.cloud/webhook/77d4dc7e-9a6c-462f-adf8-75c403a32b33';

    const results = await Promise.allSettled([
      fetch(webhookTest, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }),
      fetch(webhookProd, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }),
    ]);

    const errors = results
      .filter((r): r is PromiseRejectedResult => r.status === 'rejected')
      .map((r) => r.reason);

    if (errors.length === 2) {
      return new Response(JSON.stringify({ error: 'Failed to submit form' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};