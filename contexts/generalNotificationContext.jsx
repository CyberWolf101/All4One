import React, { useState } from 'react';
import { createContext } from 'react';

export const GeneralNotifications = createContext()


function GeneralNotificationProvider({ children }) {
    const [generalNotifications, setGeneralNotifications] = useState([])
    return (
        <GeneralNotifications.Provider value={[generalNotifications, setGeneralNotifications]} >
            {children}
        </GeneralNotifications.Provider>
    );
}

export default GeneralNotificationProvider;