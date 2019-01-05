import React, { Component } from 'react';
import Portal from '../../portal';
import Edit from '../edit';

import './style.css';

class Modal extends Component {


    render(){
        console.log(this.props.id)

        return (
            <Portal>
                <div className='modal-wrapper'>
                    <div className='modal-content'>
                        <Edit id={this.props.id} />
                        <button onClick={this.props.onClose}>CANCEL</button>
                    </div>
                </div>
            </Portal>
        )
    }
}

export default Modal;