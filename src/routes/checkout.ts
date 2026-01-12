import { Hono } from 'hono';
import { stripe } from '../services/stripe.js';
import { HTTPException } from 'hono/http-exception';

const checkout = new Hono();

checkout.post('/checkout', async (c) => {
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{ price: "price_1SoeZ1IIHhBRgarEjcMADw5Y", quantity: 1 }],
            mode: "subscription",
            success_url: "http://localhost:3000/success",
            cancel_url: "http://localhost:3000/cancel"
        });
        return c.json(session);
    } catch (error: any) {
        throw new HTTPException(500, { message: error?.message });
    }
});

export default checkout;
