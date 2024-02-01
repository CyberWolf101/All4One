import React, { useState } from 'react';
import { createContext } from 'react';

export const userContext = createContext()


function UserContextProvider({ children }) {
    const [userDetails, setuserDetails] = useState({})


    return (
        <userContext.Provider value={[userDetails, setuserDetails]} >
            {children}
        </userContext.Provider>
    );
}

export default UserContextProvider;