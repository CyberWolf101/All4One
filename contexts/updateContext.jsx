import React, { useState, createContext } from 'react';

export const UpdateContext = createContext();

function UpdateContextProvider({ children }) {
    const [updates, setUpdates] = useState([]);

    return (
        <UpdateContext.Provider value={[updates, setUpdates]} >
            {children}
        </UpdateContext.Provider>
    );
}

export default UpdateContextProvider;
