import React from 'react';
import Portal from '../../portal';
import './style.css';

const Modal = (props) => {

    return (
        <Portal>
            <div className='modal-wrapper' onClick={props.onClose}>
                <div className='modal-content'>
                    <h1>Hello from the Modal Modal</h1>
                    <button onClick={props.onClose}>x</button>
                </div>
            </div>
        </Portal>
    )
}

export default Modal;