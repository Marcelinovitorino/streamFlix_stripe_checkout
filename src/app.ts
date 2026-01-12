import { Hono } from 'hono';
import 'dotenv/config';
import home from './routes/home.js';
import checkout from './routes/checkout.js';
import success from './routes/success.js';
import cancel from './routes/cancel.js';
import webhook from './routes/webhook.js';

const app = new Hono();

app.route('/', home);
app.route('/', checkout);
app.route('/', success);
app.route('/', cancel);
app.route('/', webhook);

export default app;
