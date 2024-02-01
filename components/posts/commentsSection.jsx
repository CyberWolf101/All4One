import React, { useContext, useState } from 'react';
import MildSpiner from '../partials/mildSpiner';
import { Fade } from 'react-reveal';
import { formatDistanceToNow } from 'date-fns';
import { CommentsContext } from '../../contexts/commentsContext';
import { Avatar } from '@chakra-ui/react';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { useToogleComment } from '../../hook/useComment';
import { userContext } from '../../contexts/userContext';

function CommentsSection({ fetchingComments, loading }) {
    const [theComments, setTheComments] = useContext(CommentsContext)
    const { toggleCommentLike, loading: loadingLike } = useToogleComment()
    const [freshLike, setFreshLike] = useState()
    const [userDetails, setuserDetails] = useContext(userContext)


    return (
        <div>

            {
                fetchingComments || loading ? <MildSpiner size='md' /> :
                    <div className='mx-2'>
                        {
                            theComments.map((comment, index) => (
                                <div key={index} className='my-3 shadow-sm'>
                                    <Fade bottom>
                                        <div className="flex">
                                            <Avatar src={comment.userDp} size='sm' />
                                            <div className="mx-1 small text-success">
                                                {comment?.name || 'user'}
                                            </div>
                                        </div>

                                        <div className="px-2 py-3 small bg-light">
                                            {comment.text}
                                            <div className=" mt-2 faint flex_normal">
                                                <div className='tiny'>
                                                    {comment.createdAt && formatDistanceToNow(new Date(comment.createdAt))} ago
                                                </div>
                                                <div className='text-danger small ' onClick={() => toggleCommentLike(setFreshLike, comment._id, userDetails._id)}>
                                                    {comment.likes.includes(userDetails._id) ? <Favorite fontSize='small' /> : <FavoriteBorder fontSize='small' />}
                                                    {comment?.likes?.length}
                                                </div>
                                            </div>
                                        </div>
                                    </Fade>
                                    <hr />
                                </div>
                            ))
                        }
                    </div>
            }
        </div>
    );
}

export default CommentsSection;