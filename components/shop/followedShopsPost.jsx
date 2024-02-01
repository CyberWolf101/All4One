import { Avatar } from '@chakra-ui/react';
import { formatDistanceToNow } from 'date-fns';
import React, { useContext, useEffect } from 'react';
import { useGetAllUpdates } from '../../hooks/useGetUpdates';
import { userContext } from '../../contexts/userContext';
import MildSpiner from '../partials/mildSpiner';
import Fade from 'react-reveal'
const FollowedShopsPost = ({ shops }) => {
    const { getAllUpdates, allUpdates, loading } = useGetAllUpdates()
    const [userDetails, setuserDetails] = useContext(userContext)

    useEffect(() => {
        getAllUpdates()
    }, [])

    if (loading) return <MildSpiner size='xl' />
    const filteredUpdate = allUpdates.filter(update => userDetails?.followedShops?.includes(update?.poster));
    return (
        <div>
            <div className='updates-con'>
                    {
                        filteredUpdate
                            ?.slice()
                            ?.sort((a, b) => b.created_at - a.created_at)
                            ?.map((update, index) => (
                                <div key={index} className='shadow2 my-4 px-2 py-3 rounded mx-2' style={{ letterSpacing: '1px' }}>
                                    <div className="flex">
                                        <Avatar size='sm' src={update.url} />
                                        <small className="mx-1 text-success fw-bold" >
                                            {update?.poster?.length > 20 ? update?.poster?.slice(0, 20) + '...' : update?.poster}
                                        </small>
                                    </div>
                                    <div className='mt-2'>
                                        <small className='tiny'>
                                            {update?.type === 'new-shop' && <span>check out the <b>new shop</b> that was created ({update.productName})</span>}
                                            {update?.type === 'classified' && <span>New <b>Classified Listing"{update.productName}"</b>  Now Available! on oshofree classified listing. </span>}
                                            {update?.type === 'shop_product' && <span>A <b>new product</b> was posted by <b>{update.poster}</b> ({update.productName})</span>}
                                            {update?.type === 'auction' && <span>check out the new item that was a <b>auctioned</b> on oshofree auction ({update.productName})</span>}
                                        </small>
                                    </div>
                                    <div className='updates_img mt-3'>
                                        <img src={update?.product_url || update.url} alt="..." />
                                    </div>

                                    <div className="text-end tiny faint mt-2">
                                        <small>
                                            {update?.created_at && formatDistanceToNow(update?.created_at)} ago
                                        </small>
                                    </div>
                                </div>
                            ))
                    }
            </div>
            {filteredUpdate?.length < 1 && <center className='mt-5'>No posts yet!</center>}
            <br />
<br />
<br />
<br />
        </div>
    );
};

export default FollowedShopsPost;