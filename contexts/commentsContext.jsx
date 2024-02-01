import React, { useState } from 'react';
import { createContext } from 'react';

export const CommentsContext = createContext()


function CommentsContextProvider({ children }) {
    const [theComments, setTheComments] = useState([])


    return (
        <CommentsContext.Provider value={[theComments, setTheComments]} >
            {children}
        </CommentsContext.Provider>
    );
}

export default CommentsContextProvider;