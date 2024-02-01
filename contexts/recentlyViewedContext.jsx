import React, { useState } from 'react';
import { createContext } from 'react';

export const recentContext = createContext()


function RecentlyViewedContextProvider({ children }) {
    const [recents, setRecents] = useState([])


    return (
        <recentContext.Provider value={[recents, setRecents]} >
            {children}
        </recentContext.Provider>
    );
}

export default RecentlyViewedContextProvider;