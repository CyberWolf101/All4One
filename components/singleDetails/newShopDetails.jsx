import React, { useContext, useEffect } from 'react';
import { UseFollowShop, UseUnfollowShop, useGetSpecificShop } from '../../hooks/useShops';
import { userContext } from '../../contexts/userContext';
import { Spinner, useToast } from '@chakra-ui/react';
import { Fade } from 'react-reveal';
import { CallMadeOutlined, EmailOutlined, PersonAddAlt1Outlined, PersonRemoveAlt1Outlined } from '@mui/icons-material';

function NewShopDetails({ product, id, collection, type }) {
    const toast = useToast()
    const { handleFollowShop, Loading } = UseFollowShop()
    const [userDetails, setuserDetails] = useContext(userContext)
    const { handleUnfollowShop, Loading: unfollowing } = UseUnfollowShop()
    const site = 'http://localhost:5174/single-shop'
    const { getSpecificShop, theShop, loading } = useGetSpecificShop()
    // we need specific shop in order to follow and unfollow


    useEffect(() => {
        if (type === 'new-shop') {
            getSpecificShop(id)
            console.log('the shop:', theShop)
        }else{
            console.log('not new shop')
        }
    }, [])

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
        <div>
            <br />
            <div className={Date.now() > product.subscriptionDue ? 'box-shadow p-2 out mx-2' : "rounded shadow2 p-2 mx-2"} >
                <Fade>
                    <div className='flex_normal shop_top p-1' >
                        <small className="faint straight small">
                            <span className='mx-1'> {product?.shopFollowers ? product?.shopFollowers?.length : 0} </span><PersonAddAlt1Outlined fontSize='inherit' />
                        </small>

                    </div>
                    <center className="mx-2 my-2" style={{ cursor: 'pointer' }}>
                        <div className="img-div" >
                            <img src={product.bannerUrl} alt="" className='rounded' />
                        </div>
                        <div className="period mt-2" style={{ textTransform: 'uppercase', fontSize: '14px' }}>
                            <div>
                                <b> {product?.shopName?.length > 12 ? product.shopName?.slice(0, 12) + '...' : product.shopName}</b>
                            </div>
                            <small className='faint' style={{ fontSize: '9px' }} >category: {product.category} </small>
                        </div>
                        <div className="flex">
                            <div className='w-100'>
                                <a
                                    className="btn btn-sm btn-outline-success w-100 mt-2 straight"
                                    href={`${site}/${id}`}
                                >
                                    Visit  <CallMadeOutlined />
                                </a>
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
                                            userDetails?.followedShops?.map((dets) => dets).includes(product.shopName) ?
                                                <button
                                                    className="btn btn-sm btn-outline-danger w-100 mt-2 ms-1 straight"
                                                    onClick={() => handleUnfollowShop({ ...theShop, id: id })}
                                                    disabled={loading}

                                                >
                                                    Unfollow <PersonRemoveAlt1Outlined />
                                                </button>
                                                :
                                                <button
                                                    className="btn btn-sm btn-outline-danger w-100 mt-2 ms-1 straight"
                                                    onClick={() => handleFollow({ ...theShop, id: id })}
                                                    disabled={loading}
                                                >
                                                    Follow   <PersonAddAlt1Outlined />
                                                </button>
                                        }

                                    </div>
                                )
                            }

                        </div>

                        <div className='tiny text-success mt-3'>
                            {type === 'new-shop' && <span>check out the <b>new shop</b> that was created ({product.shopName})</span>}

                        </div>
                    </center>
                </Fade>

            </div>
        </div>
    );
}

export default NewShopDetails;