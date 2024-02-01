import React, { useContext, useState } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Button,
} from '@chakra-ui/react'
import { userContext } from '../../contexts/userContext';
import { useTransferFunds } from '../../hooks/useTransactions';
import { collection, doc, getDoc } from 'firebase/firestore';
import { db } from '../../config';
import { AccountBalanceOutlined } from '@mui/icons-material';
function SendMoneyModal({ isOpen, onClose, userRecieving }) {
    const [userDetails, setuserDetails] = useContext(userContext)
    const [transfering, setTransfering] = useState(false)
    const { transferFunds, loading } = useTransferFunds()
    const [amount, setAmount] = useState('')




    async function handleClick() {
        // console.log(userRecieving)
        // return
        // ____validation START\\
        if (!userDetails.id) {
            swal('You must me logged in to perform this action')
            return
        }
        if (Number(amount) > Number(userDetails.bal)) {
            swal('Error', `₦ ${userDetails.bal} is the maximum amount that you can send!`, 'error')
            return
        }
        if (Number(amount) < 100) {
            swal('Your trasfer amount must be greater than ₦100')
            return
        }
        // ____validation END\\


        swal({
            title: 'Are You sure?',
            text: `Send ₦${Number(amount)?.toLocaleString()} to ${userRecieving.name}?`,
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then(async (willSend) => {
            if (willSend) {
                // return
                setTransfering(true)
                try {
                    const recieverRef = doc(db, 'users', userRecieving.id)
                    const raw = await getDoc(recieverRef)
                    const reciever = raw.data()



                    console.log('trasfering...')
                    await transferFunds(userDetails, reciever, Number(amount));
                    console.log('trasfered')


                    setTransfering(false)
                    swal('Success', `You successfully transfered ₦${Number(amount).toLocaleString()} to ${reciever.name}.`, 'success')
                    setAmount('')
                } catch (error) {
                    console.log(error)
                    swal('An error occured')
                    setTransfering(false)
                }
            } else {
                console.log('cancel')
                setTransfering(false)
            }
        })

    }

    return (
        <div>
            <Modal isOpen={isOpen} onClose={onClose} >
                <ModalOverlay />
                <ModalContent style={{ marginTop: '150px' }}>
                    <center className='modalHeader'>
                        <ModalHeader><h6></h6></ModalHeader>
                        <ModalCloseButton />
                    </center>
                    <ModalBody className='' >
                        <center className='tiny' >
                            <div className='faint'>
                                Transfer to {userRecieving.name}
                            </div>
                        </center>
                        <center>
                            <div className="border straight py-2 my-4" style={{ flexDirection: 'column' }}>
                                <div className="small faint">
                                    Balance <AccountBalanceOutlined fontSize='inherit' />
                                </div>
                                <div className="text-success">
                                    ₦ {userDetails.bal ? Number(userDetails.bal).toLocaleString() : '0.00'}
                                </div>
                            </div>
                            <b className='small'>Amount:</b>
                            <input type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className='form-control'
                                placeholder='enter amount..'

                            />
                            <br />

                            <Button
                                onClick={handleClick}
                                isLoading={transfering}
                                colorScheme='green'
                                size='sm'
                                className='w-100'
                            >
                                Send
                            </Button>
                            <br />
                            <br />
                            <br />
                        </center>
                        <br />

                    </ModalBody>
                </ModalContent>

            </Modal >
        </div>
    );
}

export default SendMoneyModal;