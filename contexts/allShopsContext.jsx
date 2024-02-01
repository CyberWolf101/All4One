import React, { useState } from 'react';
import { createContext } from 'react';

export const AllShopsContext = createContext()


function AllShopsContextProvider({ children }) {
    const [allshops, setAllShops] = useState([])


    return (
        <AllShopsContext.Provider value={[allshops, setAllShops]} >
            {children}
        </AllShopsContext.Provider>
    );
}

export default AllShopsContextProvider;