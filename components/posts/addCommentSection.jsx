import { Avatar, Box, Button, Flex, Input } from '@chakra-ui/react';
import React, { useContext, useEffect, useRef } from 'react';
import { userContext } from '../../contexts/userContext';
import { Fade } from 'react-reveal';

function AddCommentSection({ handleSubmit, setText, text, loading, focus, setFocus }) {
    const [userDetails, setuserDetails] = useContext(userContext)
    const inputRef = useRef(null);


    useEffect(() => {
        if (focus) {
            inputRef.current.focus();
        }
    }, [focus])


    return (
        <div>
            <Fade>
                <Box maxW="600px" mx="auto" pb="6">
                    <form onSubmit={(e) => handleSubmit(e)} >

                        <div className='flex'>
                            <div className='mx-1'>
                                <Avatar src={userDetails.dpUrl} size='sm' />
                            </div>
                            <Box flex='1' mt="4" px='3'>
                                <Input
                                    size="sm"
                                    variant="flushed"
                                    placeholder="Make comment..."
                                    autoComplete='off'
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                    ref={inputRef}
                                    onBlur={() => setFocus(false)}
                                />
                            </Box>
                        </div>
                        <div className='mx-1'>
                            <Flex pt="2">
                                <Button
                                    type="submit"
                                    colorScheme="teal"
                                    size="xs"
                                    ml="auto"
                                    isLoading={loading}
                                >
                                    Add comment
                                </Button>
                            </Flex>
                        </div>
                    </form>

                </Box>


            </Fade>
        </div>
    );
}

export default AddCommentSection;