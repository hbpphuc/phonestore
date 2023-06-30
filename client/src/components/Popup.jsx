import React, { memo } from 'react'
import Modal from 'react-modal'

const Popup = ({ data, modalIsOpen, afterOpenModal, closeModal }) => {
    return (
        <Modal
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            className="w-[70%] h-[500px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-300 flex justify-center items-center"
        >
            <h2>{data.name}</h2>
        </Modal>
    )
}

export default memo(Popup)
