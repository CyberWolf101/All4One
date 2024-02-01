import React, { useState } from 'react';
import { createContext } from 'react';

export const ShopWigetContext = createContext()


function ShopWigetContextProvider({ children }) {
    const [shops, setShops] = useState([])


    return (
        <ShopWigetContext.Provider value={[shops, setShops]} >
            {children}
        </ShopWigetContext.Provider>
    );
}

export default ShopWigetContextProvider;