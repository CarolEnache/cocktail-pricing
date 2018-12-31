import { Component } from 'react';
import ReactDOM from 'react-dom';

const portalRoot = document.getElementById('portal');

export default class Portal extends Component {
    constructor() {
        super();
        this.elm = document.createElement('div');
    }

    componentDidMount = () => {
        portalRoot.appendChild(this.elm);
    }

    componentWillUnmount = () => {
        portalRoot.removeChild(this.elm);
    }

    render() {
        const { children } = this.props
        return ReactDOM.createPortal(children, this.elm);
    }

}