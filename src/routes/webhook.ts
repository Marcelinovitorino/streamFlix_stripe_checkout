import { Hono } from 'hono';
import { stripe } from '../services/stripe.js';
import { HTTPException } from 'hono/http-exception';

const webhook = new Hono();

webhook.post('/webhook', async (c) => {
    const rawBody = await c.req.text();
    const signature = c.req.header('stripe-signature');

    let event;
    try {
        event = stripe.webhooks.constructEvent(rawBody, signature!, process.env.STRIPE_WEBHOOK_SECRET!);
    } catch (error: any) {
        console.log(`Webhook verification failed: ${error.message}`);
        throw new HTTPException(400);
    }

    console.log(`Evento recebido: ${event.type}`, event.data.object);

    return c.status(200);
});

export default webhook;
