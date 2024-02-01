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
import { Cancel } from '@mui/icons-material';
import { useCreateChannel } from '../../hook/useChannels';
import { userContext } from '../../contexts/userContext';

function SelectedFileModal({ isOpen, onClose, selectedImages, setFile, setSelectedImages, isVideoModalOpen, setVideoModalOpen, setSelectedVideoSrc, selectedVideoSrc, caption, setCaption, id, file }) {
    const { loading, createChannelForUser } = useCreateChannel()
    const [userDetails] = useContext(userContext)

    const handleChannel = () => {

        createChannelForUser(caption, id, userDetails.userName, file)
    }
    return (
        <div>
            <Modal isOpen={isOpen} onClose={onClose} >
                <ModalOverlay />
                <ModalContent style={{ marginTop: '30px', marginLeft: '8px', marginRight: '8px' }}>
                    <center className='tiny'>
                        <ModalHeader><div className='tiny ls'>Channel</div></ModalHeader>
                        <ModalCloseButton />
                    </center>
                    <ModalBody className='' >
                        <div>
                            {selectedImages.map((selectedImage, index) => (
                                <div key={index} className={`message shadow2 my-receiver`} style={{ position: 'relative' }}>
                                    <img
                                        src={selectedImage}
                                        alt={`Selected ${index + 1}`}
                                    />
                                    <div
                                        onClick={() => {
                                            setSelectedImages((prevSelectedImages) => prevSelectedImages.filter((_, i) => i !== index));
                                            setFile((prevFiles) => prevFiles.filter((_, i) => i !== index));
                                            onClose()
                                        }}
                                        style={{ position: 'absolute', top: '0', width: '100%', opacity: '0.5' }}
                                        className='txt-custom'
                                    >
                                        <Cancel fontSize='large' />
                                    </div>
                                </div>
                            ))}


                            {isVideoModalOpen && (
                                <div className="video-modal-overlay">
                                    <div className="video-modal-content" >
                                        {selectedVideoSrc.map((videoSrc, index) => (
                                            <video key={index} controls width="100%" height="auto" src={videoSrc} />
                                        ))}
                                        <button
                                            onClick={() => { setVideoModalOpen(false); setSelectedVideoSrc([]); onClose() }}
                                            className='small btn text-teal'
                                        >
                                            <small> cancel Video </small>
                                        </button>
                                    </div>
                                    <br />
                                </div>
                            )}
                        </div>
                        <br />


                        <textarea
                            className='form-control small'
                            placeholder='caption..'
                            rows='2'
                            value={caption}
                            onChange={(e) => setCaption(e.target.value)}
                        />
                        <br />
                        <Button
                            colorScheme='green'
                            isLoading={loading}
                            onClick={handleChannel}
                        >
                            POST
                        </Button>
                        <br />
                        <br />

                    </ModalBody>
                </ModalContent>

            </Modal >

        </div>
    );
}

export default SelectedFileModal;