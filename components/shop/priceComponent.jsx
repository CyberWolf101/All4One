import React from 'react';

function PriceComponent({ product, fs }) {
    return (
        <div>
            <div className='control-content' style={{ fontSize: fs, fontWeight: 'bold' }}>
                {
                    product.sizes || product?.numericSizeObject ? (
                        <div>
                            {
                                product?.sizes && Object.keys(product.sizes).length !== 0 ? (
                                    <div>

                                        ₦{' '}
                                        {Number(
                                            Math.min(
                                                ...Object.values(product.sizes).filter(value => value > 0)
                                            )
                                        )?.toLocaleString()} - ₦{' '}
                                        {Number(Math.max(...Object.values(product.sizes)))?.toLocaleString()}

                                    </div>
                                ) :
                                    <div >
                                        {
                                         product?.numericSizeObject && Object.keys(product?.numericSizeObject).length !== 0 ?
                                                <span>

                                                    ₦{' '}
                                                    {Number(
                                                        Math.min(
                                                            ...Object.values(product?.numericSizeObject).filter(value => value > 0)
                                                        )
                                                    )?.toLocaleString()} - ₦{' '}
                                                    {Number(Math.max(...Object.values(product?.numericSizeObject)))?.toLocaleString()}

                                                </span> :
                                                <span>
                                                    ₦{product?.price.toLocaleString()}.00
                                                </span>
                                        }
                                    </div>
                            }
                        </div>
                    ) :
                        <div>

                            {(() => {
                                const discountPrice = parseInt(product?.price - (product?.price * product?.offPrice) / 100);
                                return '₦ ' + discountPrice.toLocaleString() + '.00';
                            })()}
                        </div>

                }
            </div>
        </div>
    );
}

export default PriceComponent;