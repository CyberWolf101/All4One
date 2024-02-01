import React, { useEffect, useRef, useState } from 'react';
import Nav from '../components/partials/nav';
import { Fade } from 'react-reveal';
import { useParams } from 'react-router-dom';
import { Post, View } from '../Assets/icons';
import SelectedFile from '../components/chat/selectedFile';
import SelectedFileModal from '../components/channels/selectedFileModal';
import { useDisclosure } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

function Channels(props) {
    const [selectedImages, setSelectedImages] = useState([]);
    const [file, setFile] = useState(null);
    const [isVideoModalOpen, setVideoModalOpen] = useState(false);
    const { onOpen, isOpen, onClose } = useDisclosure()
    const fileInputRef = useRef(null);
    const { id } = useParams();
    const [caption, setCaption] = useState('')
    const [selectedVideoSrc, setSelectedVideoSrc] = useState([]);
    const handleButtonClick = () => {
        fileInputRef.current.click();
        console.log(isOpen)

    };
    useEffect(() => {
        if (!isOpen) {
            setSelectedVideoSrc([])
            setFile(null)
            setSelectedImages([])
        }
    }, [isOpen])

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);

        const newSelectedFiles = files.map((file) => {
            const reader = new FileReader();

            reader.onload = () => {
                if (file.type.startsWith('image/')) {
                    setSelectedImages((prevSelectedImages) => [...prevSelectedImages, reader.result]);
                } else if (file.type.startsWith('video/')) {
                    setVideoModalOpen(true);
                    setSelectedVideoSrc((prevSelectedVideoSrc) => [...prevSelectedVideoSrc, reader.result]);
                }
            };

            reader.readAsDataURL(file);
            onOpen()
            return file;
        });

        setFile(newSelectedFiles);
        // Clear the file input value to allow selecting the same file again
        fileInputRef.current.value = '';
    };

    return (
        <div>
            <Nav />
            <Fade>

                <div className='center-page'>
                    <div className="straight my-4" onClick={handleButtonClick}>
                        <div
                            style={{ width: '300px ', fontSize: '14px' }}
                            className='border border-success text-success straight flex-column py-4 rounded'
                        >
                            <div className='ls'>
                                CREATE CHANNEL
                            </div>
                            <Post size='23' />
                        </div>
                    </div>
                    <Link 
                    to={`/explore-channels/${id}`}
                    className="straight my-4"
                    
                    >
                        <div
                            style={{ width: '300px ', fontSize: '14px' }}
                            className='border border-success text-success straight flex-column py-4 rounded'
                        >
                            <div className='ls'>
                                EXPLORE CHANNELS
                            </div>
                            <View size='23' />
                        </div>
                    </Link>
                </div>
            </Fade>
            <SelectedFileModal
                onClose={onClose}
                isOpen={isOpen}
                selectedImages={selectedImages}
                setFile={setFile}
                setSelectedImages={setSelectedImages}
                isVideoModalOpen={isVideoModalOpen}
                setVideoModalOpen={setVideoModalOpen}
                setSelectedVideoSrc={setSelectedVideoSrc}
                selectedVideoSrc={selectedVideoSrc}
                caption={caption}
                setCaption={setCaption}
                id={id}
                file={file}
            />

            <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleImageUpload}
            />

        </div>
    );
}

export default Channels;
