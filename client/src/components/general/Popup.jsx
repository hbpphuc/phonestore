import React, { memo } from 'react'
import Modal from 'react-modal'

const Popup = ({ children, style, modalIsOpen, afterOpenModal, closeModal }) => {
    return (
        <Modal
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            appElement={document.getElementById('root')}
            className="max-w-[80%] h-auto mx-auto relative top-1/2 -translate-y-1/2 flex items-center justify-center"
        >
            {children}
        </Modal>
    )
}

export default memo(Popup)
