import React, { useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import './Modal.css';

function Modal({children, close, header, width}) {
    const modalContentRef = useRef();

    const closeModal = () => {
        close()
    }
    
    useEffect(() => {
        if (width) {
            modalContentRef.current.style.width = width;
        }
    }, [width])
    
    return createPortal(
        <>
            <div className="Modal__Container">
                <div ref={modalContentRef} className="ui container fs-modal-container animate__animated animate__zoomIn">
                    <div className="fs-modal-header">
                        <div className="fs-modal-header-content">
                            <h2>{header}</h2>
                        </div>
                        <div className="fs-modal-close-wrapper cursor__pointer" onClick={closeModal}><i aria-hidden="true" className="times circle outline icon" /></div>
                    </div>
                    <div className="fs-modal-content">
                        {children}
                    </div>
                </div>
            </div>
        </>,
        document.getElementById('ModalPortal')
    )
}

export default Modal;