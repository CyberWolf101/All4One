import { Cancel } from '@mui/icons-material';
import React from 'react';

function SelectedFile({ selectedImages, setFile, setSelectedImages }) {
    return (
           <div>
            <div>
                {selectedImages.map((selectedImage, index) => (
                    <div key={index} className={`message shadow2 my-receiver`} style={{ position: 'relative', opacity: '0.8' }}>
                        <img
                            src={selectedImage}
                            alt={`Selected ${index + 1}`}
                            style={{ opacity: 0.9 }}
                        />
                        <div
                            onClick={() => {
                                setSelectedImages((prevSelectedImages) => prevSelectedImages.filter((_, i) => i !== index));
                                setFile((prevFiles) => prevFiles.filter((_, i) => i !== index)); // Clear the image file as well if needed
                            }}
                            style={{ position: 'absolute', top: '0', width: '100%', }}
                            className='txt-teal'
                        >
                            <Cancel fontSize='large' />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SelectedFile;