/* eslint-disable react/display-name */
import { Provider } from 'preact-redux';
import store from './store';
import App from './components/app';
import './style';

export default (ctx) => (<Provider store={store}><App {...ctx} /></Provider>);
