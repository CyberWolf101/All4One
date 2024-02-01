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

function SendMoneyModal(props) {
    const [userDetails, setuserDetails] = useContext(userContext)
    const [transfering, setTransfering] = useState(false)
    const { transferFunds, loading } = useTransferFunds()
    const [amount, setAmount] = useState('')




    async function handleClick() {
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
            text: `Send ₦${Number(amount)?.toLocaleString()} to ${props.roomData?.senderID === props.id ? props.roomData?.recieverName : props.roomData?.senderName}`,
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then(async (willSend) => {
            if (willSend) {
                // return
                setTransfering(true)
                let recieverID
                const possibleRecieverIds = [props.roomData?.senderID, props.roomData?.recieverID]

                if (userDetails.id === props.roomData?.senderID || userDetails.id === props.roomData.recieverID) {
                    console.log('normal user', userDetails.id)
                    recieverID = possibleRecieverIds.filter(id => id !== userDetails.id)  //get reciever id
                }
                if (userDetails.shopID === props.roomData?.senderID || userDetails.shopID === props.roomData.recieverID) {
                    console.log('shop owner', userDetails.shopID)
                    recieverID = possibleRecieverIds.filter(id => id !== userDetails.shopID) //get reciever id
                }

                // console.log(recieverID[0])

                try {

                    const collectionRef = collection(db, 'users')

                    //query db to find the users info
                    const findUser = query(collectionRef, where('id', '==', recieverID[0]))
                    const findUser2 = query(collectionRef, where('shopID', "==", recieverID[0]))
                    let users = [];
                    let users2 = [];


                    const rawData = await getDocs(findUser)
                    rawData.forEach((user) => {
                        users.push({ ...user.data(), id: user.id });
                    })

                    const rawData2 = await getDocs(findUser2)
                    rawData2.forEach((user) => {
                        users.push({ ...user.data(), id: user.id });
                    })


                    //combine array
                    const combinedUsers = [...users, ...users2];
                    console.log(combinedUsers[0])
                    if (combinedUsers.length > 0) {
                        // Await the transferFunds function here, within the try block
                        console.log('trasfering')
                        await transferFunds(userDetails, combinedUsers[0], Number(amount));
                        console.log('trasfered')
                        swal('Success', `You successfully transferred ₦${Number(amount).toLocaleString()} to ${combinedUsers[0].name}.`, 'success');
                    } else {
                        swal('User not found');
                        console.log('User not found')

                    }

                    setTransfering(false)

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
            <Modal isOpen={props.isOpen} onClose={props.onClose} >
                <ModalOverlay />
                <ModalContent style={{ marginTop: '100px' }}>
                    <center className='modalHeader'>
                        <ModalHeader><h6>{props.roomData?.senderID === props.id ? props.roomData?.recieverName : props.roomData?.senderName}</h6></ModalHeader>
                        <ModalCloseButton />
                    </center>
                    <ModalBody className='' >
                        <center className='tiny' >
                            <div className='faint'>
                                Transfer to {props.roomData?.senderID === props.id ? props.roomData?.recieverName : props.roomData?.senderName}
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
                    </ModalBody>
                </ModalContent>

            </Modal >
        </div>
    );
}

export default SendMoneyModal;