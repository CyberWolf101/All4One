import React from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Button,
    Avatar,
} from '@chakra-ui/react'
import { useContext } from 'react';
import { userContext } from '../../contexts/userContext';
import { ChangeCircle, ChangeCircleOutlined, Edit, EditOutlined } from '@mui/icons-material';
import { useLogout } from '../../hooks/logout';
import { useState } from 'react';
import Info from './views/info';
import Name from './views/name';
import UserName from './views/userName';
import Dp from './views/dp';
import { Fade } from 'react-reveal';

function EditProfileModal({ isOpen, onClose }) {
    const [userDetails] = useContext(userContext)
    const { logout, isLoading: loggingOut } = useLogout()
    const [currentView, setCurrentView] = useState('')

    return (
        <div>
            <Modal isOpen={isOpen} onClose={onClose} >
                <ModalOverlay />
                <ModalContent style={{ marginTop: '50px', background: 'teal' }} className='mx-1 text-white'>
                    <center className='modalHeader'>
                        <ModalHeader><h6>{userDetails.userName}</h6></ModalHeader>
                        <ModalCloseButton />
                    </center>
                    <ModalBody className='' >
                        {
                            currentView === '' && (
                                <center>
                                    <Fade>
                                        <div className="bg-white rounded text-black px-2 py-1">
                                            <div className='position-relative'>
                                                <Avatar size='lg' src={userDetails.dpUrl} onClick={() => onOpen()} />

                                                <div className="edit-pic-btn">
                                                    <div className='shadow2' onClick={() => setCurrentView('dp')}>
                                                        <EditOutlined fontSize='small' />
                                                    </div>
                                                </div>
                                            </div>
                                            <hr />

                                            <div className='flex_normal '>
                                                <div className='straight' style={{ flexDirection: 'column', alignItems: 'start' }}>
                                                    <div className='faint tiny'>username</div>
                                                    <div className='small' style={{ color: 'teal' }}>{userDetails.userName}</div>
                                                </div>

                                                <div style={{ color: 'teal' }} onClick={() => setCurrentView('userName')}>
                                                    <Edit fontSize='small' />
                                                </div>
                                            </div>
                                            <div className='flex_normal mt-3'>
                                                <div className='straight' style={{ flexDirection: 'column', alignItems: 'start' }}>
                                                    <div className='faint tiny'>Name</div>
                                                    <div className='small' style={{ color: 'teal' }}>{userDetails.firstName + " " + userDetails.lastName}</div>
                                                </div>

                                                <div style={{ color: 'teal' }} onClick={() => setCurrentView('name')}>
                                                    <Edit fontSize='small' />
                                                </div>
                                            </div>

                                            <hr />
                                        </div>
                                        <br />
                                        <div className="bg-white rounded px-2 py-3">
                                            <button className="btn btn-outline-success btn-sm mx-2" style={{ width: '80px' }}
                                                onClick={() => setCurrentView('info')}
                                            >INFO</button>
                                            <button className="btn btn-outline-danger btn-sm mx-2" style={{ width: '80px' }}
                                                onClick={() => logout()}
                                            >LOGOUT</button>
                                        </div>
                                    </Fade>
                                </center>
                            )
                        }
                        {
                            currentView === 'info' && <Info setCurrentView={setCurrentView} />

                        }
                        {
                            currentView === 'name' && <Name setCurrentView={setCurrentView} />

                        }
                        {
                            currentView === 'userName' && <UserName setCurrentView={setCurrentView} />

                        }
                        {
                            currentView === 'dp' && <Dp setCurrentView={setCurrentView} onClose={onClose} />

                        }


                        <br />

                    </ModalBody>
                </ModalContent>

            </Modal >
        </div>
    );
}

export default EditProfileModal;