import React, { useEffect } from 'react';
import { } from 'react-router-dom';
import { useFetchUser } from '../../hook/useStats';
import MildSpiner from '../partials/mildSpiner';
import { useUserPosts } from '../../hook/usePosts';

function Stats({ id, user }) {
    const { userPosts, loading: loadingPost, error } = useUserPosts(id);
    const { fetchUser, loading } = useFetchUser()

   
    return (
        <div>
            <div className="flex_normal my-3 px-4">
                <div className='flex-column'>
                    <div className='small fw-bold text-success'>{loading ? <MildSpiner size='sm' /> : user?.following?.length}</div>
                    <small className="tiny faint">Following</small>
                </div>
                <div className='flex-column'>
                    <div className='small fw-bold text-success'>{loadingPost ? <MildSpiner size='sm' /> : userPosts?.length}</div>
                    <small className="tiny faint">Posts</small>
                </div>
                <div className='flex-column'>
                    <div className='small fw-bold text-success'>{loading ? <MildSpiner size='sm' /> : user?.followers?.length}</div>
                    <small className="tiny faint">Followers</small>
                </div>
            </div>
        </div>
    );
}

export default Stats;