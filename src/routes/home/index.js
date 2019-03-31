import { h, Component } from 'preact';
import style from './style';
import setTitle from '../../util/deco';

@setTitle('首页')
export default class Home extends Component {
	render() {
		return (<div class={style.home}>
			<h1>Home</h1>
			<p>This is the Home component.</p>
		</div>
		);
	}
}
