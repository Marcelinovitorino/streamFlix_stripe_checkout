import { Hono } from 'hono';
import { cancelHtml } from '../utils/htmlTemplates.js';

const cancel = new Hono();

cancel.get('/cancel', (c) => c.html(cancelHtml));

export default cancel;
