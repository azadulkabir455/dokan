import React from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { useParams } from "react-router-dom"
export default function SingleProduct() {
    const { id } = useParams();
    const {products} = useSelector((state:any) => state.products);

    const singleProduct = products.find((product:any) => product.id === id);

    return (
       <>
            <div className="container mt-5">
                <div className="row offset-2">
                    <div className="col-12 col-lg-3">
                        <img src={singleProduct.productImgUrl} alt="" className='image-fluid'/>
                    </div>
                    <div className="col-12 col-lg-5 ps-2">
                        <h4>{singleProduct.name}</h4>
                    </div>
                </div>
            </div>
       </>
    )
}
