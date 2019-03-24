import React, { Component } from 'react';
import Portal from '../../portal';
import Update from '../Update';

import './style.css';

class Modal extends Component {

    render(){
        return (
            <Portal>
                <div className='modal-wrapper'>
                    <div className='modal-content'>
                        <Update id={this.props.id} />
                        <button onClick={this.props.onClose}>CANCEL</button>
                    </div>
                </div>
            </Portal>
        )
    }
}

export default Modal;