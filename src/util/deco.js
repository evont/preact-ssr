import { Component } from 'preact';
const setTitle = (title) => (WrappedComponent) => {
  return class extends Component {
     componentDidMount() {
        document.title = title;
     }
     render() {
        return <WrappedComponent {...this.props} />
     }
  }
}

export default  setTitle;