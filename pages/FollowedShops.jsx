import React, { useContext, useEffect } from 'react';
import { useShops } from '../hooks/useShops';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { ConnectWithoutContact, Store } from '@mui/icons-material';
import LoadingPage from '../components/partials/Loading';
import AllFollowedShops from '../components/shop/allFollowedShops';
import FollowedShopsPost from '../components/shop/followedShopsPost';
import { userContext } from '../contexts/userContext';
import Nav from '../components/partials/nav';

function FollowedShops(props) {
    const { getShops, shops, loadingShops } = useShops();
    const [userDetails, setuserDetails] = useContext(userContext)

    useEffect(() => {
        getShops()
    }, [])
    if (loadingShops) return <LoadingPage />
    
    // this filter will no longer work as we are getting details from mongo db now
    const filteredShops = shops.filter(shop => userDetails?.followedShops && userDetails?.followedShops.includes(shop.shopName));

    return (
        <div>
            <Nav />
            <div className='mt-1'>

                <center>
                    <div className="my-1">
                        <small className="tiny">
                            Followed shops
                        </small>
                    </div>
                </center>
                < div className=''>
                    <Tabs>
                        <TabList className='subAdminTablist tiny'>
                            <Tab>shops <Store fontSize='small' /></Tab>
                            <Tab>shop posts <ConnectWithoutContact fontSize='small' /></Tab>
                        </TabList>

                        <TabPanels style={{ height: '80vh', overflowY: 'scroll' }}>
                            <TabPanel>
                                <AllFollowedShops shops={filteredShops} />
                            </TabPanel>
                            <TabPanel>
                                <FollowedShopsPost shops={filteredShops} />
                            </TabPanel>
                        </TabPanels>
                    </Tabs>


                </div>
            </div>
        </div>
    );
}

export default FollowedShops;