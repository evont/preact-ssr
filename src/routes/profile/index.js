/* eslint-disable react/no-danger */
/* eslint-disable react/sort-comp */
import { h, Component } from 'preact';
import style from './style';
import { connect } from 'preact-redux';
import reduce from '../../reducer';
import * as actions from '../../actions';
import setTitle from '../../util/deco';
import axios from 'axios';
@setTitle('资料')
@connect(reduce, actions)
export default class Profile extends Component {
	componentDidMount() {
		const initData = window.__initData__;
		this.props.addDemolist(initData);
		// this.setState({
		// 	demoList: initData,
		// })
	}
	bootstrap() {
		return axios.get(`https://api.coinmarketcap.com/v1/ticker/?limit=10`)
			.then(res => res.data)
			.then(json => this.props.addDemolist(json));
	}
	render({ demolist }) {
		const insertScript = demolist.length ? `<script>window.__initData__ = ${JSON.stringify(demolist)}</script>` : '';
		return (<div class={style.profile}>
			<h1>Profile</h1>
			<div dangerouslySetInnerHTML={{ __html: insertScript }} />
			{ demolist.map(ele => ( <p>{ ele.name }</p>)) }
		</div>
		);
	}
}
