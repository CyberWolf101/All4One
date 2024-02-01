import { ArrowRightAlt, Store } from '@mui/icons-material';
import React from 'react';
import { Fade } from 'react-reveal';
import { Link, useNavigate } from 'react-router-dom';

function ShopProductDetails({ product, id, collection, type }) {
    const site = 'http://localhost:5174/product-detail'
    const formatedDescription = product?.description?.split('\n')?.map((line, index) => {
        return <div key={index}>{line}</div>
    })
    const nav = useNavigate()

    // function movement(id) {
    //     nav()
    // }
    return (
        <div>
            <div className="singleProduct overflow mt-2">
                <div className="product_display">
                    <div className='img-div straight'>
                        <img src={product?.product_url} alt="" className="img-fluid" />
                    </div>
                </div>
                <div className='tiny mt-2 px-1 text-center'>
                    {type === 'shop_product' && <span>A <b>new product</b> was posted by <b>{product.shop}</b> ({product.productName})</span>}
                </div>
                <div className='ms-2 mt-4 pad-resposive'>
                    <Fade left duration={2000}> <div className="designLine mb-1"></div></Fade>
                    <div className="flex_normal text-success">
                        <div>
                            <div>{product?.productName}</div>
                        </div>

                    </div>
                    {/* <small>shop: <Link to={`/single-shop/${product.shopID}`}>{product.shop} <Store fontSize='inherit' /></Link></small> */}
                    <small>shop: <span className='text-success'>{product.shop} <Store fontSize='inherit' /></span></small>
                    <div className="flex_normal ">
                        <div className='mt-2 small'>
                            {
                                product?.offPrice > 0 ? (
                                    <div>
                                        <b>
                                            {(() => {
                                                const discountPrice = parseInt(product?.price - (product?.price * product?.offPrice) / 100);
                                                return '₦ ' + parseInt(discountPrice)?.toLocaleString() + '.00';
                                            })()}
                                        </b>

                                        <div className="faint">
                                            <strike>₦ {product?.price?.toLocaleString()}.00</strike>
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        {
                                            product.sizes && (
                                                <div>
                                                    {
                                                        Object.keys(product?.sizes).length !== 0 ? (
                                                            <div>
                                                                <b>
                                                                    ₦{' '}
                                                                    {Number(
                                                                        Math.min(
                                                                            ...Object.values(product?.sizes).filter(value => value > 0)
                                                                        )
                                                                    )?.toLocaleString()} - ₦{' '}
                                                                    {Number(Math.max(...Object.values(product.sizes)))?.toLocaleString()}
                                                                </b>
                                                            </div>
                                                        ) :
                                                            <div>
                                                                {
                                                                    Object.keys(product?.numericSizeObject).length !== 0 ?
                                                                        <span>
                                                                            <b>
                                                                                ₦{' '}
                                                                                {Number(
                                                                                    Math.min(
                                                                                        ...Object.values(product?.numericSizeObject).filter(value => value > 0)
                                                                                    )
                                                                                )?.toLocaleString()} - ₦{' '}
                                                                                {Number(Math.max(...Object.values(product?.numericSizeObject)))?.toLocaleString()}
                                                                            </b>
                                                                        </span> :
                                                                        <span>
                                                                            <b>  ₦{product?.price.toLocaleString()}.00</b>
                                                                        </span>
                                                                }
                                                            </div>
                                                    }
                                                </div>
                                            )
                                        }
                                    </div>
                                )
                            }
                        </div>
                        <div>
                            <a
                                href={`${site}/${id}`}
                                target='_blank'
                                className='btn btn-outline-success btn-sm me-2 flex '
                            >
                                Check <ArrowRightAlt fontSize='small' />
                            </a>
                        </div>
                    </div>

                    <hr />

                    <div className='mt-2 '>

                        {product.description !== '' && (
                            <div className='bg-light py-3'>
                                <Fade left duration={2000}> <div className="designLine mb-1"></div></Fade>
                                <b>Description:</b>
                                <div style={{ fontSize: '13px' }}>{formatedDescription}</div>
                            </div>
                        )}
                    </div>
                </div>
                <br />
            </div>

        </div>
    );
}

export default ShopProductDetails;