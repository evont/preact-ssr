/* eslint-disable require-yield */
const Koa = require('koa');
const path = require('path');
const { readFileSync } = require('fs');
const serve = require('koa-static');
const koaRouter = require('koa-router');
const render = require('preact-render-to-string');
const { h } = require('preact');
const bundle = require('./build/ssr-build/ssr-bundle');
const bootstrapper = require('react-async-bootstrapper');

const app = new Koa();
app.proxy = true;
app.use(serve(path.join(__dirname, '/build'), { maxage: 60 * 60 * 24 * 30, extensions: ['js', 'css'], index: 'home.html' }));
const router = koaRouter();
const RGX = /<div id="app"[^>]*>.*?(?=<script)/i;
const template = readFileSync('build/index.html', 'utf8');
router.get('*', async (ctx) => {
	const vNode = h(bundle.default, { url: ctx.url });
	await bootstrapper(vNode).then(() => {
		const body = render(vNode);
		ctx.body = template.replace(RGX, body);
	}).catch(err => console.log('Eek, error!', err));
});

app.use(router.routes());

app.on('error', (err, ctx) => {
	console.error(err);
});

app.listen(3000);