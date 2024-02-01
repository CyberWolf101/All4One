import React, { useEffect, useState } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Button,
} from '@chakra-ui/react'
import { useEditPost } from '../../hook/usePosts';
function EditPostModal(props) {
    useEffect(() => {
        setNewText(props.currentPost.text || '')
    }, [props.currentPost])

    const [newText, setNewText] = useState();
    const { editPost, loading, error } = useEditPost();

    const handleEdit = () => {
        // Call the editPost function with the postId and newText
        editPost(props.currentPost._id, newText, props.onClose);
    };

    return (
        <div>
            <Modal isOpen={props.isOpen} onClose={props.onClose} >
                <ModalOverlay />
                <ModalContent style={{ marginTop: '150px' }}>
                    <center className='modalHeader'>
                        <ModalHeader><h6>head</h6></ModalHeader>
                        <ModalCloseButton />
                    </center>
                    <ModalBody className='' >
                        <center>
                            <textarea
                                value={newText}
                                onChange={(e) => setNewText(e.target.value)}
                                disabled={loading}
                                className='form-control'
                            />
                            <button 
                            className='btn btn-outline-success mt-2'
                            onClick={handleEdit} disabled={loading || newText === props.currentPost.text}>
                                {loading ? 'Updating...' : 'Update Post'}
                            </button>
                            {error && <p>Error: {error}</p>}
                            <br />
                        </center>
                        <br />

                    </ModalBody>
                </ModalContent>

            </Modal >
        </div>
    );
}

export default EditPostModal;