import React, { useState } from 'react';
import { createContext } from 'react';

export const PostContext = createContext()


function PostContextProvider({ children }) {
    const [allPosts, setAllPosts] = useState([])


    return (
        <PostContext.Provider value={[allPosts, setAllPosts]} >
            {children}
        </PostContext.Provider>
    );
}

export default PostContextProvider;