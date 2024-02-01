import { Spinner } from '@chakra-ui/react';
import React from 'react';

function LoadingChat(props) {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
            <Spinner thickness='4px' emptyColor='gray.200' color='green.500' size='xl' />
        </div>
    );
}

export default LoadingChat;