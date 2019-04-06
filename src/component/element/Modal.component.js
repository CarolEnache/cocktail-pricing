import React, { Component } from 'react';
import Portal from '../../portal';
import Update from '../Update';
import UpdateRecipe from '../Update/UpdateRecipe.component';

import './style.css';

class Modal extends Component {
    render(){
        const {children} = this.props;
        return (
            <Portal>
                <div className='modal-wrapper'>
                    <div className='modal-content'>
                        <div>{children}</div>
                        <button onClick={this.props.onClose}>CANCEL</button>
                    </div>
                </div>
            </Portal>
        )
    }
}

export default Modal;