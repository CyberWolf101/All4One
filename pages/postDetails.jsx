import React, { useContext } from 'react';
import { useGetSinglePost, useLike } from '../hook/usePosts';
import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import LoadingPage from '../components/partials/Loading';
import { useParams } from 'react-router-dom';
import { ChatBubbleOutline, FavoriteBorder, FavoriteOutlined } from '@mui/icons-material';
import { Avatar, Spinner } from '@chakra-ui/react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { userContext } from '../contexts/userContext';
import CommentPage from './commentPage';
import { useFetchComments } from '../hook/useComment';
import { useSCrollToTop } from '../hooks/useSCroll';
import { CommentsContext } from '../contexts/commentsContext';
import Nav from '../components/posts/nav';
import CommentsSection from '../components/posts/commentsSection';

function PostDetails(props) {
    const { id } = useParams();
    useSCrollToTop()
    const { getSinglePost, post, loading } = useGetSinglePost();
    const [seeMore, setSeeMore] = useState(false)
    const [showSeeMore, setshowSeeMore] = useState(true)
    const [text, setText] = useState('')
    const [userDetails, setuserDetails] = useContext(userContext)
    const [currentPost, setCurrentPost] = useState({})
    const { likesCount, handleToggleLike, liking } = useLike()
    const [showCommmentPage, setShowCommentPage] = useState(true)
    const [theComments, setTheComments] = useContext(CommentsContext)
    const { fetchCommentsForPost, loading: fetchingComments } = useFetchComments()
    const [comments, setComments] = useState([])
    const [sliderSettings, setSliderSettings] = useState({
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    });

    useEffect(() => {
        getSinglePost(id);

        setText(post?.text)
    }, [id]);
    useEffect(() => {
        fetchCommentsForPost(id, setComments)
    }, [])
    useEffect(() => {
        console.log(theComments)
    }, [theComments])

    useEffect(() => {
        setCurrentPost(post)
        setText(post?.text)
        if (text?.length > 55 && !seeMore) {
            setText(text.slice(0, 55) + '...')
        }
    }, [post]);

    const isVideo = (url) => {
        const videoExtensions = ['.mp4', '.avi', '.mov']; // Add more video extensions as needed
        const lowercasedUrl = url.toLowerCase();
        return videoExtensions.some((ext) => lowercasedUrl.endsWith(ext));
    };

    async function handleSeeMore() {
        setshowSeeMore(false)
        setText(post.text)
    }
    async function handleSeeLess() {
        setshowSeeMore(true)
        setText(text.slice(0, 55) + '...')
    }

    if (loading) return <LoadingPage />;
    return (
        <div className="px-1" style={{ width: '100%', overflowX: 'hidden' }}>
            <Nav />

            {
                showCommmentPage && (
                    <div >
                        <CommentPage setShowCommentPage={setShowCommentPage} post={post} currentPost={currentPost}
                            setComments={setComments} comments={comments} text={text} handleSeeMore={handleSeeMore}
                            handleSeeLess={handleSeeLess} showSeeMore={showSeeMore}
                            setText={setText} setCurrentPost={setCurrentPost}
                        />
                    </div>
                )
            }
            < br />
            <br />
            <br />
        </div>
    );
}

export default PostDetails;
