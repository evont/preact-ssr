/* eslint-disable react/sort-comp */
import { h, Component } from 'preact';
import style from './style';
import { connect } from 'preact-redux';
import reduce from '../../reducer';
import * as actions from '../../actions';
import setTitle from '../../util/deco';
import axios from 'axios';

@setTitle('首页')
@connect(reduce, actions)
export default class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			demoList: this.props.demolist || []
		};
	}
	bootstrap() {
		return axios.get(`https://api.coinmarketcap.com/v1/ticker/?limit=10`)
			.then(res => res.data)
			.then(json => this.props.addDemolist(json));
	}
	render({}, { demoList }) {
		return (<div class={style.home}>
			<h1>放假都是咖啡机克拉的肌肤拉开</h1>
			{ demoList.map(ele => ( <p>{ ele.name }</p>)) }
		</div>
		);
	}
}
