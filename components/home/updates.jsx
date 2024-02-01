import React, { useContext, useEffect, useState } from 'react';
import { useGetAllUpdates, useMoreUpdates } from '../../hooks/useGetUpdates';
import MildSpiner from '../partials/mildSpiner';
import { Avatar, Spinner } from '@chakra-ui/react';
import { formatDistanceToNow } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { UpdateContext } from '../../contexts/updateContext';
import Slider from 'react-slick';
import MappedPostActions from '../posts/mappedPostActions';

function Updates() {
    // const [updates, setUpdates] = useContext(UpdateContext)
    const [showCommmentPage, setShowCommentPage] = useState(false)
    const [loadingPosts, setLoadingPosts] = useState(false)
    const [posts, setPosts] = useState([]);
    const [skip, setSkip] = useState(0);
    const [totalPosts, setTotalPosts] = useState(0)
    const [currentPost, setCurrentPost] = useState({})



    const fetchPosts = async () => {
        try {
            setLoadingPosts(true);
            const response = await fetch(`http://localhost:4000/posts/getAllPosts?skip=${skip}`);
            const data = await response.json();
            console.log('new data', data)
            setPosts([...posts, ...data.allPosts, ...data.shuffledPosts]);
            setSkip(skip + data.allPosts.length);
            setTotalPosts(data.postLength + skip + 2 )
            // console.log('updates:', updates)
            console.log('will skip:', skip) 

            setLoadingPosts(false);
        } catch (error) {
            console.error('Error fetching posts:', error);
            setLoadingPosts(false);
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
                {posts?.map((post, index) => (
                    <div key={index} className='mx-2 mb-5 mt-2 shadow-sm py-3'>
                        <div className="flex">
                            <Avatar src={post.userDpUrl} onClick={() =>nav(`/user/profile/${post.userId}`)} size='sm' />

                            <div className='ms-1'>
                                <strong>{post.userName}</strong>
                                <div className="faint tiny">
                                    @{post.userName}
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
                                    <MappedPostActions setShowCommentPage={setShowCommentPage} post={post} setCurrentPost={setCurrentPost} currentPost={currentPost} isMainpage={true} setPosts={setPosts}/>
                                </div>

                            ) : (
                                <span></span>
                            )}
                        </center>
                    </div>
                ))}

            </div >
            {loadingPosts && <MildSpiner size='md' />}
            {
                totalPosts <= posts.length ? <div className='text-center tiny faint'>Looks like your all caught up!</div>
                    :
                    <button onClick={handleLoadMore}
                        className='btn btn-outline-success mx-2 btn-sm text-success no-hover'
                    >
                        Load More
                    </button>
            }

        </div >
    );
}

export default Updates;