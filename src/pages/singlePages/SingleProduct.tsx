import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"
import { getSingleProduct } from '../../store/reducers/productReducers';
import { useDispatch, useSelector } from 'react-redux';
import currencyFormatter from 'currency-formatter';
import { BsPlus,BsDash } from "react-icons/bs";

export default function SingleProduct() {
    const [quantity, setQuantity] = useState<number>(1);
    const { id } = useParams();
    const dispatch = useDispatch();
    const { product } = useSelector((state: any) => state.products)

    useEffect(() => {
        dispatch(getSingleProduct(id))
    }, [])

    // Function for Decrement Quantity
    const decQuantity = () => {
        if(quantity > 1) {
            setQuantity(quantity - 1)
        }
    }
    return (
        <>
            <div className="container mt-5">
                <div className="row offset-1 pt-5">
                    <div className="col-12 col-lg-4">
                        <img src={product.productImgUrl} alt="" className='image-fluid' style={{ width: "100%" }} />
                    </div>
                    <div className="col-12 col-lg-6 ps-4">
                        <h4 className='m-0'>{product.name}</h4>
                        <div className="priceDetails d-flex mb-3">
                            <div className="actualPrice text-decoration-line-through text-danger">
                                {currencyFormatter.format(product.price, { code: 'USD' })}
                            </div>
                            <div className="discountPrice ms-3">
                                {currencyFormatter.format(product.discountPrice, { code: 'USD' })}
                            </div>
                        </div>
                        <div className="addtoCart d-flex mb-4">
                            <div className="incDec">
                                <div className="btn-group" role="group" aria-label="Basic example">
                                    <button type="button" className="btn btn-outline-primary btn-md rounded-0" style={{width:"44px"}} onClick={decQuantity}><BsDash /></button>
                                    <button type="button" className="btn btn-outline-primary btn-md rounded-0" style={{width:"44px"}}>{quantity}</button>
                                    <button type="button" className="btn btn-outline-primary btn-md rounded-0" style={{width:"44px"}} onClick={() => setQuantity(quantity + 1)}><BsPlus /></button>
                                </div>
                            </div>
                            <div className="cartButton">
                                <button className="btn btn-md btn-primary rounded-0 ms-2">Add to cart</button>
                            </div>
                        </div>
                        <div className="productDetails">
                            <h5 className='text-secondary'><b>Details</b></h5>
                            {product.productInfo}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
