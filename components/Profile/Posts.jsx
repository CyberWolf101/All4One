import React, { useState } from 'react';
import { useDeletePost, useLike, useTogglePostVisibility, useUserPosts } from '../../hook/usePosts';
import { ChatBubbleOutline, Delete, Edit, FavoriteBorder, FavoriteOutlined, Visibility, VisibilityOff } from '@mui/icons-material';
import { Avatar, Spinner, useDisclosure } from '@chakra-ui/react';
import EditPostModal from './EditPostModal';
import { userContext } from '../../contexts/userContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import MildSpiner from '../partials/mildSpiner';
import { CommentsContext } from '../../contexts/commentsContext';
import MappedPostActions from '../posts/mappedPostActions';
import { PostContext } from '../../contexts/postContext';

function Posts({ userId, user }) {
    const { userPosts, loading, error } = useUserPosts(userId);
    const { deletePost, loading: loadingDel, error: delErr } = useDeletePost()
    const { onOpen, isOpen, onClose } = useDisclosure()
    const [currentPost, setCurrentPost] = useState({})
    const [userDetails, setuserDetails] = useContext(userContext);
    const { likesCount, handleToggleLike, liking } = useLike()
    const [showCommmentPage, setShowCommentPage] = useState(false)
    const [theComments, setTheComments] = useContext(CommentsContext)
    const [allPosts, setAllPosts] = useContext(PostContext)

    const nav = useNavigate()

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    const { togglePostVisibility, loading: loadingTooogle, error: toogleError } = useTogglePostVisibility()
    if (loading) {
        return <MildSpiner size='lg' />
    }

    const isVideo = (url) => {
        const videoExtensions = ['.mp4', '.avi', '.mov']; // Add more video extensions as needed
        const lowercasedUrl = url.toLowerCase();
        return videoExtensions.some((ext) => lowercasedUrl.endsWith(ext));
    };
    return (
        <div className='mt-3' style={{ width: '100%', overflowX: 'hidden' }}>

            {userPosts?.length === 0 ? (
                <center>
                    <p className='faint tiny mt-3'>No any post made yet.</p>
                </center>
            ) : (
                <div className='user-posts' >
                    {/* {userPosts?.map((post) => ( */}
                    {allPosts?.map((post) => (
                        <div key={post._id} className='mx-2 mb-5 mt-2'>
                            <div className="flex">
                                <Avatar src={user.dpUrl} onClick={() => console.log(post)} />

                                <div className='ms-1'>
                                    <strong>{post.userName}</strong>
                                    <div className="faint tiny">
                                        @{user.firstName + ' ' + user.lastName}
                                    </div>
                                </div>
                            </div>

                            <div className='small ms-3 my-2' onClick={() => nav(`/post-details/${post._id}`)}>
                                {
                                    post.text?.length > 100 ? <div>{post.text.slice(0, 100)}... <span className='text-success tiny'>see more</span></div>
                                        : post.text
                                }
                            </div>


                            <center>
                                {post.mediaUrls && post.mediaUrls.length > 0 ? (
                                    <div className='position-relative '>
                                        <Slider {...sliderSettings}>
                                            {post.mediaUrls.map((url, index) => (
                                                <div key={index} onClick={() => nav(`/post-details/${post._id}`)}>
                                                    {isVideo(url) ? (
                                                        <video width="320" height="240" controls className="rounded">
                                                            <source src={url} type="video/mp4" />
                                                            Your browser does not support the video tag.
                                                        </video>
                                                    ) : (
                                                        <img src={url} alt="" className="rounded" />
                                                    )}
                                                </div>
                                            ))}

                                        </Slider>
                                        <MappedPostActions setShowCommentPage={setShowCommentPage} post={post} setCurrentPost={setCurrentPost} currentPost={currentPost} />
                                    </div>

                                ) : (
                                    <span></span>
                                )}
                            </center>
                        </div>
                    ))}
                </div>
            )}
            <EditPostModal isOpen={isOpen} onClose={onClose} currentPost={currentPost} />
        </div>
    );
}

export default Posts;