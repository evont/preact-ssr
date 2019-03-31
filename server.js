/* eslint-disable require-yield */
const koa = require('koa');
const path = require('path');
const { readFileSync } = require('fs');
const serve = require('koa-static');
const koaRouter = require('koa-router');
const render = require('preact-render-to-string');
const { h } = require('preact');
const bundle = require('./build/ssr-build/ssr-bundle');

const app = new koa();
app.proxy = true;
app.use(serve(path.join(__dirname, '/build'), { maxage: 60 * 60 * 24 * 30 }));
const router = koaRouter();
const RGX = /<div id="app"[^>]*>.*?(?=<script)/i;
const template = readFileSync('build/index.html', 'utf8');
router.get('*', async (ctx) => {
	const body = render(h(bundle.default, { url: ctx.url }));
	ctx.body = await template.replace(RGX, body);
});

app.use(router.routes());

app.on('error', (err, ctx) => {
	console.error(err);
});

app.listen(3000);