import React, { useContext, useEffect } from 'react';
import { useGetShops, useShops } from '../../hooks/useShops';
import MildSpiner from '../partials/mildSpiner';
import { Avatar } from '@chakra-ui/react';
import { Image } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { ShopWigetContext } from '../../contexts/shopWigetContext';

function ShopWigets({ shop }) {
    const { getShops, loadingShops } = useGetShops()
    const [shops, setShops] = useContext(ShopWigetContext)

    const nav = useNavigate()
    useEffect(() => {
        getShops()
    }, [])
    

    if (loadingShops) return <MildSpiner size='md'/>
    return (
        <div>
            <div className='shop-widget py-2 shadow-sm border-bottom border-success' >
                {
                    shops
                    ?.slice()
                    ?.sort((a,b)=> b.created_at - a.created_at)
                    .map((shop, index) => (
                        <div key={index}>
                            <div 
                            className="flex-column"
                            onClick={()=> nav(`/search/single-shop/${shop.id}`)}
                            >
                                <Avatar src={shop.bannerUrl} icon={<Image />} className='shadow-sm mb-2 border border shadow border-success' />
                                <small className="tiny text-success fw-bold">
                                    {shop?.shopName?.length > 9 ? shop?.shopName?.slice(0, 9) + '...' : shop?.shopName}
                                </small>
                            </div>
                        </div>
                    ))
                }
               
            </div>
        </div>
    );
}

export default ShopWigets;