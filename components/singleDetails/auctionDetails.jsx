import React from 'react';
import { UseGetSingleAuction } from '../../hooks/usegetAuction';
import MildSpiner from '../partials/mildSpiner';
import { DeleteForeverOutlined, ZoomIn } from '@mui/icons-material';
import { Avatar, Button } from '@chakra-ui/react';
import { formatDistanceToNow } from 'date-fns';

function AuctionDetails({ product, id, collection, type }) {
    const site = 'http://localhost:5174/auction-details'

    const { auction, loadingProduct } = UseGetSingleAuction(id)

    if (loadingProduct) return <MildSpiner size='lg' />
    return (
        <div>
            <div>
                {
                    auction && (
                        <div>
                            {/* IMAGE MODAL */}

                            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className='flex_normal auction_details_img_div'>
                                            <img src={auction.product_url} alt="" className='img-fluid ' />
                                            <img src={auction.product_url1} alt="" className='img-fluid mx-2 me-2' />
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>

                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className='auctions_resonsive_details mx-2'>
                                <div className=' shadow2 px-3 py-3 my-4 rounded content_responsive'>
                                    <div className=''>

                                        <div className="cart-contents">
                                            <div className='cart-img first-item' data-bs-toggle="modal" data-bs-target="#staticBackdrop" style={{ position: 'relative' }}>
                                                <img src={auction?.product_url} alt="" className='' />
                                                {/* <Avatar src={auction?.product_url}/> */}
                                                <div className='zoomIn rounded' >
                                                    <ZoomIn />
                                                </div>
                                            </div>
                                            <div>
                                            </div>
                                            <div className='second-item' >
                                                <div>
                                                    <small>{auction?.productName?.length > 19 ? auction.productName?.slice(0, 19) + "..." : auction.productName}</small>
                                                </div>

                                                <div className='fw-bold'>
                                                    <div>
                                                        <small>  ₦{auction?.price?.toLocaleString()}.00</small>
                                                    </div>

                                                </div>
                                                <div>
                                                    <small className='faint tiny'>
                                                        highest bid: ₦{auction?.highestBid?.toLocaleString()}
                                                    </small>
                                                </div>

                                            </div>
                                            <div >
                                                <div className='d-flex' style={{ justifyContent: 'flex-end' }} >
                                                    <a href={`${site}/${id}`}>
                                                        <Button
                                                            className=''

                                                            colorScheme='green'
                                                            size='sm'
                                                        >
                                                            <small>VISIT</small>
                                                        </Button>
                                                    </a>
                                                </div>

                                                <small className='faint mt-3 tiny'>
                                                    {auction?.created_at && formatDistanceToNow(auction?.created_at)} ago
                                                </small>

                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <hr />
                                <div className='bg-light '>
                                    <small className='faint text-uppercase ms-2'>All bids:</small>
                                </div>
                                {
                                    auction.biders.length == 0 && (
                                        <div className='text-center'>
                                            <small className='faint mt-3'>No bids yet</small>
                                        </div>
                                    )
                                }
                                <div className='bidders-display'>
                                    {
                                        auction.biders
                                            ?.slice().sort((a, b) => b.amount - a.amount)
                                            .map((bider, index) => (
                                                <div className='shadow2 py-4 px-2 mx-2 my-4 mt-2 rounded flex_normal' key={index}>

                                                    <div>
                                                        <div className='flex'>
                                                            <Avatar size='xs' />
                                                            <small className='faint tiny ms-1'>
                                                                {/* {bider.name} */}
                                                                Bidder {index + 1}
                                                            </small>
                                                        </div>
                                                        {
                                                            index == 0 && (
                                                                <div>
                                                                    <Star fontSize='string' className='text-custom' />
                                                                    <small className='faint tiny'>highest bidder</small>
                                                                </div>
                                                            )
                                                        }
                                                    </div>

                                                    {
                                                        user.id === auction.userID && (
                                                            <div>
                                                                {
                                                                    bider.email === auction.acceptedFor && bider.amount === auction.accepted_amount ? (

                                                                        <small className='tiny'>ACCCEPTED</small>
                                                                    ) : (
                                                                        <Button
                                                                            className=''
                                                                            onClick={() => { accept({ ...clickedItem, ...auction }, bider) }}
                                                                            colorScheme='green'
                                                                            size='xs'
                                                                            isLoading={loadingAcceptance}
                                                                        >
                                                                            <small>ACCCEPT</small>
                                                                        </Button>
                                                                    )
                                                                }
                                                            </div>
                                                        )
                                                    }

                                                    <div className='small'>
                                                        <div className='d-flex' style={{ justifyContent: 'flex-end' }} >
                                                            ₦{bider?.amount?.toLocaleString()}
                                                        </div>
                                                        <div className='faint tiny'>
                                                            {bider?.timeOfBid && formatDistanceToNow(bider?.timeOfBid)} ago
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                    }
                                </div>


                            </div>
                        </div>
                    )
                }


            </div>
        </div>
    );
}

export default AuctionDetails;