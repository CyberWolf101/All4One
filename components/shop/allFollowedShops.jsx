import { Spinner, useDisclosure, useToast } from '@chakra-ui/react';
import { EmailOutlined, PersonAddAlt1Outlined, PersonRemoveAlt1Outlined, SearchOff } from '@mui/icons-material';
import React, { useContext, useState } from 'react';
import { Fade } from 'react-reveal';
import { UseFollowShop, UseUnfollowShop } from '../../hooks/useShops';
import { userContext } from '../../contexts/userContext';
import { useNavigate } from 'react-router-dom';
import NewMessageModal from './newMessageModal';
import { UseGetChatRoom } from '../../hooks/useSendMessage';

const AllFollowedShops = ({ shops }) => {
    const [searchShop, setSearchShop] = useState('');
    const [displayList, setDisplayList] = useState(false);
    const toast = useToast()
    const { handleFollowShop, Loading } = UseFollowShop()
    const [userDetails, setuserDetails] = useContext(userContext)
    const { handleUnfollowShop, Loading: unfollowing } = UseUnfollowShop()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [mssg, setMssg] = useState('')
    const { getRoom, loadingRoom } = UseGetChatRoom()
    const [shop, setShop] = useState({})


    const nav = useNavigate()

    function sendTheMessage() {
        if (mssg.trim() < 2) {
            swal('Enter a valid message!')
            return
        }
        getRoom(userDetails.id, shop.id, shop.shopName, shop, mssg)
    }

    function handleClick(shop) {
        if (!userDetails.id) {
            mustLogin()
            return
        }
        if (Date.now() > shop.subscriptionDue) {
            toast({
                title: shop.shopName + ' unavailable!',
                description: 'Shop is temporarily unavailable.',
                position: 'top-left',
                duration: 2000,
                status: 'error',
                variant: 'subtle',
                isClosable: true
            })
            return;
        }
        else {
            onOpen()
        }
    }
    function handleFollow(shop) {
        if (Date.now() > shop.subscriptionDue) {

            toast({
                title: shop.shopName + ' unavailable!',
                description: 'Shop is temporarily unavailable.',
                position: 'top-left',
                duration: 2000,
                status: 'error',
                variant: 'subtle',
                isClosable: true
            })
            return;
        }
        else {
            handleFollowShop(shop)

        }
    }

    return (
        <div className=''>
            <div className="home_Shops_display mt-3">
                {
                    shops?.map((shop, index) => (
                        <div key={index} className={Date.now() > shop.subscriptionDue ? 'box-shadow p-2 out' : "rounded shadow2 p-2"} >
                            <Fade>
                                <div className='flex_normal shop_top p-1' >
                                    <small className="faint straight small">
                                        <span className='mx-1'> {shop?.shopFollowers ? shop?.shopFollowers?.length : 0} </span><PersonAddAlt1Outlined fontSize='inherit' />
                                    </small>
                                </div>
                                <center className="mx-2 my-2" style={{ cursor: 'pointer' }}>
                                    <div className="img-div" onClick={() => nav(`/search/single-shop/${shop.id}`)}>
                                        <img src={shop.bannerUrl} alt="" />
                                    </div>
                                    <div className="period mt-2" style={{ textTransform: 'uppercase', fontSize: '14px' }}>
                                        <div>
                                            <b> {shop.shopName.length > 12 ? shop.shopName?.slice(0, 12) + '...' : shop.shopName}</b>
                                        </div>
                                        <small className='faint' style={{ fontSize: '9px' }} >category: {shop.category} </small>
                                    </div>
                                    <div className="flex">
                                        <div className='w-100'>
                                            <button
                                                className="btn btn-sm btn-outline-success w-100 mt-2"
                                                onClick={() => {handleClick(shop); setShop(shop)}}
                                            >
                                                <EmailOutlined />
                                            </button>
                                        </div>
                                        {
                                            Loading || unfollowing ? (
                                                <div
                                                    className="btn btn-sm btn-outline-danger w-100 mt-2 ms-1"
                                                >
                                                    <Spinner thickness='2px' size='sm' color='red.600' emptyColor='gray.300' />
                                                </div>
                                            ) : (
                                                <div className='w-100'>
                                                    {
                                                        userDetails?.followedShops?.map((dets) => dets).includes(shop.shopName) ?
                                                            <button
                                                                className="btn btn-sm btn-outline-danger w-100 mt-2 ms-1"
                                                                onClick={() => handleUnfollowShop(shop)}
                                                            >
                                                                <PersonRemoveAlt1Outlined />
                                                            </button>
                                                            :
                                                            <button
                                                                className="btn btn-sm btn-outline-danger w-100 mt-2 ms-1"
                                                                onClick={() => handleFollow(shop)}
                                                            >
                                                                <PersonAddAlt1Outlined />
                                                            </button>
                                                    }

                                                </div>
                                            )
                                        }

                                    </div>
                                </center>
                            </Fade>

                        </div>
                    ))
                }
            </div>
            <NewMessageModal onClose={onClose} isOpen={isOpen} mssg={mssg} setMssg={setMssg} sendTheMessage={sendTheMessage} loadingRoom={loadingRoom} shop={shop} />

            {
                shops?.length < 1 && <center className='mt-5 faint small'>You're currently not following an shop.</center>
            }
            <br />
<br />
<br />
<br />
        </div>
    );
};

export default AllFollowedShops;