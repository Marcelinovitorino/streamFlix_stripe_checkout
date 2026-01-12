import { Hono } from 'hono';
import { successHtml } from '../utils/htmlTemplates.js';

const success = new Hono();

success.get('/success', (c) => c.html(successHtml));

export default success;
