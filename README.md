# preact-ssr

> A Server-side Rendered Preact app with redux ( Create by preact-cli )

## Install
```sh
$ git clone https://github.com/evont/preact-ssr
$ npm install
$ npm run build
$ npm start
```

## How to

### set up server
```javascript
const Koa = require('koa');
const koaRouter = require('koa-router');
const serve = require('koa-static');

const app = new Koa();
app.proxy = true;
// serve the dist file, in order to read bundle in browser
app.use(serve(path.join(__dirname, '/build'), { maxage: 60 * 60 * 24 * 30 }));
const router = koaRouter();
// handle all GET request
router.get('*', async (ctx) => {
	ctx.body = 'hello'
});
app.use(router.routes());
app.listen(3000);
```

### use redux
1. set up store, reducer & actions
2. use a provider to wrap your application
    ```javascript
    // export default App

    // it is important to pass ctx prop to App, otherwise the route could not get the url prop
    export default (ctx) => (<Provider store={store}><App {...ctx} /></Provider>);
    ```
3. connect your components with redux
    ```javascript
    import { connect } from 'preact-redux';
    //...
    @connect(reduce, actions)
    export default class Home extends Component {
      constructor(props) {
        super(props);
        // you can get it from props
        this.state = {
          demoList: this.props.demolist || []
        };
      }
      componentDidMount() {
        const initData = window.__initData__;
        
        if (initData) {
          this.props.addDemolist(initData);
        }
        // no data when the page is not from server side rendered, run bootstrap to get data
        else {
          this.bootstrap();
        }
      }
      // bootstrap is a hook via react-async-bootstrapper, use it to do something when server side rendered
      bootstrap() {
        return axios.get(`https://api.coinmarketcap.com/v1/ticker/?limit=10`)
          .then(res => res.data)
          .then(json => this.props.addDemolist(json));
      }
      // render({ demoList }) also works
      render({}, { demoList }) {
        // insert the inital data into the page so we can get it when componentDidMount
        const insertScript = demolist.length ? `<script>window.__initData__ = ${JSON.stringify(demolist)}</script>` : '';
        return (<div class={style.home}>
          <h1>test</h1>
          <div dangerouslySetInnerHTML={{ __html: insertScript }} />
          { demoList.map(ele => ( <p>{ ele.name }</p>)) }
        </div>
        );
      }
    }
    ```
4. run build & get the dist file
### add render support in server.js
```javascript
// ...
const path = require('path');
const { readFileSync } = require('fs');
const render = require('preact-render-to-string');
const { h } = require('preact');
// get the bundle from the dist folder
const bundle = require('./build/ssr-build/ssr-bundle');
// use bootstrapper to have a bootstrap hook in your components
const bootstrapper = require('react-async-bootstrapper');

// ...
const RGX = /<div id="app"[^>]*>.*?(?=<script)/i;
const template = readFileSync('build/index.html', 'utf8');
router.get('*', async (ctx) => {
  // ctx.body = 'hello'

  // render the vNode use h func, we should pass the url so the router can know which page to render
  const vNode = h(bundle.default, { url: ctx.url });
	await bootstrapper(vNode).then(() => {
    // now the vNode is rendered with the initial data which came from bootstrap hook
    const body = render(vNode);
    // replace the default template part, we made it!
		ctx.body = template.replace(RGX, body);
	}).catch(err => console.log('Eek, error!', err));
});
```

---

## That's all