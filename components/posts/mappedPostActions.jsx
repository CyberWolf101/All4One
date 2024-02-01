import { Spinner } from '@chakra-ui/react';
import { ChatBubbleOutline, FavoriteBorder, FavoriteOutlined } from '@mui/icons-material';
import React, { useContext, useState } from 'react';
import { userContext } from '../../contexts/userContext';
import { useLike, useLikeForMapped } from '../../hook/usePosts';
import { CommentsContext } from '../../contexts/commentsContext';
import { useNavigate } from 'react-router-dom';

function MappedPostActions({ post, setShowCommentPage, setCurrentPost, currentPost, isMainpage, setPosts }) {
    const [userDetails, setuserDetails] = useContext(userContext)
    const { likesCount, handleToggleLike, liking } = useLikeForMapped()
    const [theComments, setTheComments] = useContext(CommentsContext)
    const nav = useNavigate()

    return (
        <div>
            <div>
                <div className='actions bg-light'>
                    <div className="mt-4 flex">
                        {
                            liking ?
                                <div>
                                    <Spinner color='red.400' size='sm' />
                                </div>
                                :
                                <div className="text-danger mx-2 flex" onClick={() => handleToggleLike(userDetails._id, post._id, setCurrentPost, currentPost, isMainpage, setPosts, focus)}>
                                    {post?.likes?.includes(userDetails._id) ? <div className='text-danger'><FavoriteOutlined /> </div> : <FavoriteBorder />}
                                    <div>{post?.likes?.length}</div>
                                </div>
                        }

                        <div className="text-success mx-2 flex" onClick={() => { nav(`/post-details/${post._id}`) }}>
                            <ChatBubbleOutline />
                            <div>{post.comments === [] ? 0 : post.comments}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MappedPostActions;