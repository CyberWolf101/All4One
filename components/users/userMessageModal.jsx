import React from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Button,
} from '@chakra-ui/react'
import { useState } from 'react';

function UserMessageModal({ isOpen, onClose, mssg, setMssg, sendTheMessage, loadingRoom, user }) {

    return (
        <div>
            <Modal isOpen={isOpen} onClose={onClose} >
                <ModalOverlay />
                <ModalContent style={{ marginTop: '150px' }}>
                    <center className='modalHeader'>
                        <ModalHeader><h6>{user?.name}</h6></ModalHeader>
                        <ModalCloseButton />
                    </center>
                    <ModalBody className='' >
                        <center>

                            <b>Type message</b>
                            <input
                                type="text"
                                className="form-control"
                                placeholder='your message...'
                                value={mssg}
                                onChange={(e) => setMssg(e.target.value)}
                            />
                            <br />
                            <Button
                                colorScheme='green'
                                onClick={()=> sendTheMessage()}
                                isLoading={loadingRoom}
                                loadingText='sending'
                            >
                                Send
                            </Button>
                        </center>
                        <br />

                    </ModalBody>
                </ModalContent>

            </Modal >
        </div>
    );
}

export default UserMessageModal;