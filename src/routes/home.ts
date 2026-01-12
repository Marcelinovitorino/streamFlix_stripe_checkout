import { Hono } from 'hono';
import { homeHtml } from '../utils/htmlTemplates.js';

const home = new Hono();

home.get('/', (c) => {
    return c.html(homeHtml(process.env.STRIPE_PUBLISHABLE_KEY!));
});

export default home;
