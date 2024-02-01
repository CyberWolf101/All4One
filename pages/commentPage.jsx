import React, { useContext, useEffect, useState } from 'react';
import { Fade } from 'react-reveal';
import { useLike } from '../hook/usePosts';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Avatar, Box, Button, Flex, Input, SkeletonText, Spinner } from '@chakra-ui/react';
import { ChatBubbleOutline, FavoriteBorder, FavoriteOutlined, SendOutlined } from '@mui/icons-material';
import { userContext } from '../contexts/userContext';
import { useSCrollToTop } from '../hooks/useSCroll';
import { useAddComment, useFetchComments } from '../hook/useComment';
import { useNavigate, useParams } from 'react-router-dom';
import MildSpiner from '../components/partials/mildSpiner';
import { CommentsContext } from '../contexts/commentsContext';
import { formatDistanceToNow } from 'date-fns';
import CommentsSection from '../components/posts/commentsSection';
import AddCommentSection from '../components/posts/addCommentSection';
// import CommentPageNav from '../components/posts/commentPageNav';


function CommentPage({ setShowCommentPage, post, currentPost, setComments, comments, text, handleSeeMore, handleSeeLess, showSeeMore, setText, setCurrentPost }) {
    const { likesCount, handleToggleLike, liking } = useLike()
    const [userDetails, setuserDetails] = useContext(userContext)
    const { addCommentToPost, comment, loading, error } = useAddComment()
    const [commentText, setCommentText] = useState('')
    const { id } = useParams()
    const [theComments, setTheComments] = useContext(CommentsContext)
    const { fetchCommentsForPost, loading: fetchingComments } = useFetchComments()
    const [focus, setFocus] = useState(false)
    const nav = useNavigate()
    const [sliderSettings, setSliderSettings] = useState({
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    });
    useEffect(() => {
        fetchCommentsForPost(id, setComments)
    }, [])
    const isVideo = (url) => {
        const videoExtensions = ['.mp4', '.avi', '.mov']; // Add more video extensions as needed
        const lowercasedUrl = url.toLowerCase();
        return videoExtensions.some((ext) => lowercasedUrl.endsWith(ext));
    };


    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!commentText.trim()) {
            console.log('aint')
            return
        }
        // console.log(id, userDetails._id, text, userDetails.dpUrl)
        await addCommentToPost(id, userDetails._id, commentText.trim(), userDetails.dpUrl, setComments, comments, userDetails.userName, setCommentText)

    }
    return (
        <div>
            <Fade>
                {post.mediaUrls && post.mediaUrls.length > 0 ? (
                    <Slider {...sliderSettings}>
                        {post.mediaUrls.map((url, index) => (
                            <div key={index} className="singlePostMedia position-relative">
                                {isVideo(url) ? (
                                    <video width="320" height="240" controls className="rounded" style={{margin:'0px auto'}}>
                                        <source src={url} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                ) : (
                                    <img src={url} alt="" className="rounded" style={{margin:'0px auto'}}/>
                                )}

                                <div className="dets">
                                    <div className="flex" onClick={() => nav(`/user/profile/${post.userId}`)}>
                                        <Avatar size="sm" />
                                        <div className="tiny text-white mx-1 fw-bold">
                                            <div>{post?.userName}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className='actions'>
                                    <div className="mt-2 flex">
                                        {
                                            liking ?
                                                <div>
                                                    <Spinner color='red.400' size='sm' />
                                                </div>
                                                :
                                                <div className="text-white mx-2 flex" onClick={() => handleToggleLike(userDetails._id, post._id, setCurrentPost)}>
                                                    {currentPost?.likes?.includes(userDetails._id) ? <div className='text-danger'><FavoriteOutlined /> </div> : <FavoriteBorder />}
                                                    <div>{currentPost?.likes?.length}</div>
                                                </div>
                                        }

                                        <div className="text-white mx-2 flex" onClick={() => setFocus(true)}>
                                            <ChatBubbleOutline />
                                            <div>{comments?.length}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                ) : (
                    <span></span>
                )}


            </Fade>
            <div className='bg-light p-1 small '>
                {text}

                <span className="tiny text-success">
                    {
                        showSeeMore && text?.length > 55 && (<span onClick={handleSeeMore}>see more</span>)
                    }
                </span>

                <span className="tiny text-success">
                    &nbsp;...
                    {
                        !showSeeMore && text?.length > 55 && (<span onClick={handleSeeLess}>see Less</span>)
                    }
                </span>
            </div>
            <br />
            <div>
                <AddCommentSection handleSubmit={handleSubmit} setText={setCommentText} text={commentText} loading={loading} focus={focus} setFocus={setFocus} />
                <div>
                    <CommentsSection />
                </div>

            </div>
        </div>
    );
}

export default CommentPage;