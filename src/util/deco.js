import { Component } from 'preact';
const setTitle = (title) => (WrappedComponent) => class HOC extends Component {
	componentDidMount() {
		document.title = title;
	}
	render() {
		return <WrappedComponent {...this.props} />;
	}
};

export default  setTitle;