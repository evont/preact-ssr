/* eslint-disable react/sort-comp */
import { h, Component } from 'preact';
import style from './style';
import setTitle from '../../util/deco';

@setTitle('首页')
export default class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			demoList: []
		};
	}
	componentDidMount = () => {
		this.fetchData();
	};
	fetchData() {
		fetch(`https://api.coinmarketcap.com/v1/ticker/?limit=10`)
			.then(res => res.json())
			.then(json => this.setState({ demoList: json }));
	}
	render() {
		return (<div class={style.home}>
			<h1>Home</h1>
			<p>This is the Home component.</p>
		</div>
		);
	}
}
