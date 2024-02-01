import React, { useContext, useState } from 'react';
import Axios from 'axios';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Button,
    useToast,
    Spinner,
} from '@chakra-ui/react';
import { userContext } from '../../contexts/userContext';
import swal from 'sweetalert';
import pic from '../../Assets/logo.jpg'

const PostModal = (props) => {
    const [userDetails, setuserDetails] = useContext(userContext);
    const toast = useToast();
    const [loading, setLaoding] = useState(false);
    const [postData, setPostData] = useState({
        text: '',
        userId: userDetails._id,
        userName: userDetails.userName,
    });
    const [files, setFiles] = useState(null);

    const handleChange = (e) => {
        setPostData({
            ...postData,
            [e.target.name]: e.target.value,
        });
    };

    const handleFileChange = (e) => {
        setFiles([...e.target.files]);
    };


    const handleSubmit = async (text, id, userName, files) => {
        try {
            setLaoding(true);


            const formdata = new FormData();
            formdata.append("text", text)
            formdata.append("userId", userDetails._id)
            formdata.append("userName", userDetails.userName)
            formdata.append("dpUrl", userDetails.dpUrl)


            if (files) {
                for (let i = 0; i < files.length; i++) {
                    formdata.append("files", files[i]);
                }
            }
            // formdata.append("files", filesArray)

            console.log(formdata)
          
            const response = await Axios.post('http://localhost:4000/posts/createPost', formdata);

            if (response.status === 201) {
                console.log('Post created successfully:', response);
                toast({
                    title: 'Post created',
                    status: 'success',
                    variant: 'subtle',
                    position: 'top',
                });
                console.log(response);
                props.onClose();
            }
            setLaoding(false);
        } catch (error) {
            console.error('Error creating post:', error.response ? error.response.data : error.message);
            console.log('error response', error.response);
            setLaoding(false);
            swal('Could not create post');
        }
    };



    return (
        <div>
            <Modal isOpen={props.isOpen} onClose={props.onClose}>
                <ModalOverlay />
                <ModalContent style={{ marginTop: '50px' }}>
                    <center className='modalHeader'>
                        <ModalHeader>
                            <h6>Create a Post</h6>
                        </ModalHeader>
                        <ModalCloseButton />
                    </center>
                    <ModalBody className=''>
                        <center>
                            {/* <form > */}
                            <div>
                                <label htmlFor='text'>Post Text:</label>
                                <textarea
                                    id='text'
                                    name='text'
                                    value={postData.text}
                                    onChange={handleChange}
                                    required
                                    className='form-control'
                                />
                            </div>
                            <br />
                            <div>
                                <label htmlFor='files'>Upload Files:</label>
                                <input type='file' multiple onChange={handleFileChange} />
                            </div>
                            <br />
                            <div>
                                <button
                                    onClick={() => handleSubmit(postData.text, userDetails._id, userDetails.userName, files)}
                                    type='submit' className='btn btn-outline-success' disabled={loading}>
                                    {loading ? <Spinner size='sm' colorScheme='green' /> : 'Create Post'}
                                </button>
                            </div>
                            {/* </form> */}
                            <br />
                        </center>
                        <br />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </div>
    );
};

export default PostModal;
