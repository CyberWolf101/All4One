import { Spinner } from '@chakra-ui/react';
import React from 'react';

function MildSpiner({size, m}) {
    return (
        <div style={{margin:`${m} 0px`}}>
            <center>
                <Spinner thickness='2px' size={size} color='green.600' emptyColor='gray.300'/>
            </center>
        </div>
    );
}

export default MildSpiner;