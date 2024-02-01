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
import { UsePayment } from '../../hooks/usePayment';

function DepositModal(props) {
    const [price, setPrice] = useState()
    const { handleFlutterPayment } = UsePayment()
    return (
        <div>
            <Modal isOpen={props.isOpen} onClose={props.onClose} >
                <ModalOverlay />
                <ModalContent style={{ marginTop: '100px' }}>
                    <center className='modalHeader'>
                        <ModalHeader><h6>head</h6></ModalHeader>
                        <ModalCloseButton />
                    </center>
                    <ModalBody className='' >
                        <center>
                            <input
                                value={price}
                                type="number"
                                className="formcontrol"
                                onChange={(e) => setPrice(e.target.value)}
                                placeholder='enter amount(₦)'
                            />
                            <br />
                            <Button
                                colorScheme='green'
                                // isLoading={}
                                className='w-100 text-uppercase'
                            >
                                Proceed
                            </Button>
                        </center>
                        <br />

                    </ModalBody>
                </ModalContent>

            </Modal >
        </div>
    );
}

export default DepositModal;