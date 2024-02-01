import React, { useContext } from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config';
import { useState } from 'react';
import LoadingPage from '../components/partials/Loading';
import All from '../components/notifications/all';
import { useSCrollToTop } from '../hooks/useSCroll';
import { UseisAuthenticated } from '../hooks/useProtectPage';
import { GeneralNotifications } from '../contexts/generalNotificationContext';
import Nav from '../components/partials/nav';

function NotificationsPage() {
    const settingsID = 'XA5eUSx0KyLCndY3TiDl';
    const [loading, setLoading] = useState(false)
    // const [genteralNotifications, setGenteralNotifications] = useState([])
    const [personalNotifications, setPersonal] = useState([])
    const [generalNotifications, setGeneralNotifications] = useContext(GeneralNotifications)

    useSCrollToTop();
    UseisAuthenticated()
    // useEffect(() => {
    //     async function getNotification() {
    //         setLoading(true)
    //         const docRef = doc(db, 'settings', settingsID)
    //         const data = await getDoc(docRef)
    //         const refinedData = data.data()
    //         setLoading(false)
    //         console.log(refinedData.general_notifications)
    //         setGenteralNotifications(refinedData.general_notifications)
    //     }
    //     getNotification();
    // }, [])

    if (loading) return <LoadingPage />
    return (
        <div>
            <Nav/>
            <br />
            <center>
                <small className='faint'> NOTIFICATIONS</small>
            </center>
            <hr />
            <All notifications={generalNotifications} />

        </div >
    );
}

export default NotificationsPage;