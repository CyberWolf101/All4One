import React, { useContext, useEffect, useState } from 'react';
import { useGetAllUpdates, useMoreUpdates } from '../../hooks/useGetUpdates';
import MildSpiner from '../partials/mildSpiner';
import { Avatar, Spinner } from '@chakra-ui/react';
import { formatDistanceToNow } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { UpdateContext } from '../../contexts/updateContext';
import { useInfiniteScroll, } from '../../hook/usePosts';
import Slider from 'react-slick';
import MappedPostActions from '../posts/mappedPostActions';

function Updates() {
    // const { getAllUpdates, loading } = useGetAllUpdates()
    // const { getMoreUpdates, loading: loadingMore } = useMoreUpdates()
    const [updates, setUpdates] = useContext(UpdateContext)
    const [currentPost, setCurrentPost] = useState({})
    const [showCommmentPage, setShowCommentPage] = useState(false)
    const [loadingPosts, setLoadingPosts] = useState(false)
    const [posts, setPosts] = useState([]);
    const [skip, setSkip] = useState(0);
    // NODE POSTS
    // const { posts, loading: loadingPosts, error } = usePosts();
    // const { posts, loading: loadingPosts } = useInfiniteScroll();



    const fetchPosts = async () => {
        try {
            setLoadingPosts(true)
            const response = await fetch(`http://localhost:4000/posts/getAllPosts?skip=${skip}`);
            const data = await response.json();
            setUpdates(prevPosts => [...prevPosts, ...data]);
            setSkip(prevSkip => prevSkip + data.length);
            setLoadingPosts(false)
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    useEffect(() => {
        // Fetch posts on page load
        fetchPosts();
    }, []);

    const handleLoadMore = () => {
        // Fetch more posts when the "Load More" button is clicked
        fetchPosts();
    };




    // NODE POSTS
    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    const nav = useNavigate()
    const isVideo = (url) => {
        const videoExtensions = ['.mp4', '.avi', '.mov']; // Add more video extensions as needed
        const lowercasedUrl = url.toLowerCase();
        return videoExtensions.some((ext) => lowercasedUrl.endsWith(ext));
    };


    // if (loadingPosts) return <MildSpiner size='xl' />

    return (
        <div className=''>


            <div className='updates-con'>
                {updates?.map((post, index) => (
                    <div key={index} className='mx-2 mb-5 mt-2 shadow-sm py-3'>
                        <div className="flex">
                            <Avatar src={post.userDpUrl} onClick={() => console.log(post)} size='sm' />

                            <div className='ms-1'>
                                <strong>{post.userName}</strong>
                                <div className="faint tiny">
                                    @{post.userName}
                                </div>
                            </div>
                        </div>

                        <div className='small ms-3 my-2' onClick={() => nav(`/post-details/${post._id}`)}>
                            {post.text}
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

            </div >
            <button onClick={handleLoadMore}>Load More</button>
            {loadingPosts && <MildSpiner size='m' />}





            {/* LEAVE INCASE YOU NEED TO ADD SHOP POSTS LATER */}
            {/* <div className='updates-con'> */}
                {/* {
                    posts
                        ?.map((update, index) => (
                            <div key={index} className='shadow2 my-4 px-2 py-3 rounded mx-2' style={{ letterSpacing: '1px' }}>
                                <div className="flex" onClick={() => nav(`single-post/${update.id}/${update.type}/${update.collection}`)}>
                                    <Avatar size='sm' src={update.url} className='shadow-sm' />
                                    <small className="mx-1 text-success fw-bold" >
                                        {update?.poster?.length > 20 ? update?.poster?.slice(0, 20) + '...' : update?.poster}
                                    </small>
                                </div>
                                <div className='mt-2'>
                                    <small className='' style={{ fontSize: '12px' }}>
                                        {update?.type === 'new-shop' && <span>check out the <b>new shop</b> that was created ({update.productName})</span>}
                                        {update?.type === 'classified' && <span>New <b>Classified Listing"{update.productName}"</b>  Now Available! on oshofree classified listing. </span>}
                                        {update?.type === 'shop_product' && <span>A <b>new product</b> was posted by <b>{update.poster}</b> ({update.productName})</span>}
                                        {update?.type === 'auction' && <span>check out the new item that was <b>auctioned</b> on oshofree auction ({update.productName})</span>}
                                    </small>
                                </div>
                                <hr style={{ margin: '7px 0' }} />
                                <div className='updates_img mt-3' onClick={() => nav(`single-post/${update.id}/${update.type}/${update.collection}`)}>
                                    <img src={update?.product_url || update.url} alt="..." />
                                </div>

                                <div className="text-end tiny faint mt-2">
                                    <small>
                                        {update?.created_at && formatDistanceToNow(update?.created_at)} ago
                                    </small>
                                </div>
                            </div>
                        ))
                } */}

                {/* <center>
                    {
                        loading ? (
                            <button
                            // className='btn btn-outline-success btn-sm'
                            >
                                <MildSpiner size='md' />
                            </button>
                        ) : (
                            <div>
                                <button
                                    onClick={() => getAllUpdates()}
                                    className='btn btn-outline-success btn-sm'
                                >
                                    LOAD MORE
                                </button>
                            </div>
                        )
                    }

                </center> */}
            {/* </div > */}



        </div >
    );
}

export default Updates;