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
import { useContext } from 'react';
import { userContext } from '../../contexts/userContext';
import { collection, doc, getDoc, getDocs, onSnapshot, query, updateDoc, where } from 'firebase/firestore';
import { db } from '../../config';
import { useState } from 'react';
import swal from 'sweetalert';
import { useTransferFunds } from '../../hooks/useTransactions';
import { AccountBalanceOutlined } from '@mui/icons-material';
import axios from 'axios';

function SendMoneyModal(props) {
    const [userDetails, setuserDetails] = useContext(userContext)
    const [transfering, setTransfering] = useState(false)
    const { transferFunds, loading } = useTransferFunds()
    const [amount, setAmount] = useState('')
    const url = 'http://localhost:4000/'




    async function handleClick() {
        // ____validation START\\
        if (!userDetails._id) {
            swal('You must me logged in to perform this action')
            return
        }
        if (Number(amount) > Number(userDetails.balance)) {
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
            text: `Send ₦${Number(amount)?.toLocaleString()} to ${props.roomData?.users?.senderID === props.id ? props.roomData?.users?.receiverName : props.roomData?.users?.senderName}`,
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then(async (willSend) => {
            if (willSend) {
                // return
                setTransfering(true)

                try {
                    const senderId = props.senderId
                    const receiverId = props.recieverID
                    const response = await axios.put(`${url}user/tfr/${senderId}/${receiverId}`, {
                        amount,
                    });
                    if (response.data.success){
                        console.log(response.data.user)
                        swal('Success',`${amount} was sent to ${props.roomData?.users?.senderID === props.id ? props.roomData?.users?.receiverName : props.roomData?.users?.senderName}`,'success')
                        setuserDetails(response.data.user)
                        localStorage.setItem("user", JSON.stringify(response.data.user))
        
        
                    }else{
                        swal('Error updating user')
                    }
        
                       
                } catch (error) {
                    console.error('Error making deposit:', error);
                    throw error; // You can handle the error in the component that uses this hook
                } finally {
                    setTransfering(false);
                }

            } else {
                console.log('cancel')
                setTransfering(false)

            }
        })

    }



    return (
        <div>
            <Modal isOpen={props.isOpen} onClose={props.onClose} >
                <ModalOverlay />
                <ModalContent style={{ marginTop: '100px' }}>
                    <center className='modalHeader'>
                        <ModalHeader><h6>{props.roomData?.users?.senderId === props.senderId ? props.roomData?.users?.receiverName : props.roomData?.users?.senderName}</h6></ModalHeader>
                        <ModalCloseButton />
                    </center>
                    <ModalBody className='' >
                        <center className='tiny' >
                            <div className='faint'>
                                Transfer to {props.roomData?.users?.senderId === props.senderId ? props.roomData?.users?.receiverName : props.roomData?.users?.senderName}
                            </div>
                        </center>
                        <center>
                            <div className="border straight py-2 my-4" style={{ flexDirection: 'column' }}>
                                <div className="small faint">
                                    Balance <AccountBalanceOutlined fontSize='inherit' />
                                </div>
                                <div className="text-success">
                                    ₦ {userDetails.balance ? Number(userDetails.balance).toLocaleString() : '0.00'}
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
                    </ModalBody>
                </ModalContent>

            </Modal >
        </div>
    );
}

export default SendMoneyModal;