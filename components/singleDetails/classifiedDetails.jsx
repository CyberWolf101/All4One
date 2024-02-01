import React, { useEffect } from 'react';
import { UseGetSingleAd } from '../../hooks/useGetSingleAd';
import MildSpiner from '../partials/mildSpiner';
import { ArrowRightAlt, EmailOutlined, LocationOn, Phone } from '@mui/icons-material';

function ClassifiedDetails({ product, id, collection, type }) {
    const { getSingleAd, ad, Loading } = UseGetSingleAd()
const site = 'http://localhost:5174/ads-details'
    useEffect(() => {
        getSingleAd(id)
    }, [])

    if (Loading) return <MildSpiner size='lg' />
    
    const formatedDescription = ad?.description?.split('\n')?.map((line, index) => {
        return <div key={index}>{line}</div>
    })
    return (
        <div className='mx-1'>
            <div>
                {
                    ad && (
                        <div>
                            <div className='flex overflow-x-hidden'>
                                <img src={ad.product_url} alt="" />
                            </div>

                            <div className="mx-2">
                                <div className=' mt-3 flex_normal'>
                                    <div>
                                        <div className="designLine mb-2"></div>
                                        <div className="">
                                            {ad.productName}
                                        </div>
                                    </div>

                                </div>
                                <small className="tiny faint flex">
                                    <LocationOn fontSize='inherit' /> {ad.selectedLocation}
                                </small>
                                <div className="fw-bold mt-1">
                                    ₦ {ad.price?.toLocaleString()}
                                </div>
                                <hr />
                                <div className="flex_normal mb-4">
                                    <a href={`${site}/${id}`} className="btn btn-outline-success  me-1">
                                        Visit <ArrowRightAlt fontSize='small' />
                                    </a>
                                </div>

                                <div className='light py-3 px-1'>
                                    <div className="designLine mb-1"></div>
                                    <small className='fw-bold'>
                                        Description:
                                    </small>
                                    <div className='small'>{formatedDescription}</div>
                                </div>

                                <div className='' style={{ overflow: 'hidden', flexShrink: 0 }}>
                                    {
                                        ad.features && (
                                            <div >
                                                <br />
                                                {Object.keys(ad.features).length > 0 && (
                                                    <div className="faint mb-2 text-center small">FEATURES</div>
                                                )}

                                                <div className='grid_single_ad px-2'>
                                                    {Object.entries(ad.features)
                                                        .filter(([size, price]) => size !== "0" && size !== "")
                                                        .map(([key, value]) => (
                                                            <div className='flex-column border py-3' key={key}>
                                                                <div>
                                                                    {`${key}`}
                                                                </div>
                                                                <div>
                                                                    <b>{`${value}`}</b>
                                                                </div>
                                                            </div>
                                                        ))}
                                                </div>
                                            </div>
                                        )
                                    }

                                </div>
                                {
                                    ad.is_pet && (
                                        <div className='mt-3'>
                                            <div className='grid_single_ad px-2'>
                                                <div className='flex-column border py-3' >
                                                    <div>
                                                        Specie
                                                    </div>
                                                    <div>
                                                        <b>{ad.productName}</b>
                                                    </div>
                                                </div>
                                                <div className='flex-column border py-3' >
                                                    <div>
                                                        Breed
                                                    </div>
                                                    <div>
                                                        <b>{ad.title}</b>
                                                    </div>
                                                </div>
                                                <div className='flex-column border py-3' >
                                                    <div>
                                                        Age
                                                    </div>
                                                    <div>
                                                        <b>{ad.age}</b>
                                                    </div>
                                                </div>
                                                <div className='flex-column border py-3' >
                                                    <div>
                                                        Sex
                                                    </div>
                                                    <div>
                                                        <b>{ad.sex}</b>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                            <br />
                            {/* <WhiteListComponent /> */}
                        </div>
                    )
                }

            </div>
        </div>
    );
}

export default ClassifiedDetails;