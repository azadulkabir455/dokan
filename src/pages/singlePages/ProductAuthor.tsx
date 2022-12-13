import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getProducts } from '../../store/action/productAction'
import { getUsers } from '../../store/action/userAction'
import { Link } from 'react-router-dom'
import currencyFormatter from 'currency-formatter';

export default function ProductAuthor() {
  const { name } = useParams()
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state: any) => state.products)
  const { users } = useSelector((state: any) => state.users)

  const getUserProducts = products && products.filter((item: any) => item.userDetails.name == name);
  const singleUser = users && users.find((item:any) => item.name == name);
  console.log(singleUser)

  useEffect(() => {
    dispatch(getProducts());
  }, [getProducts])
  
  useEffect(() => {
    dispatch(getUsers());
  }, [getUsers])

  return (
    <>
      <div className="banner p-5 bg-danger mb-5 text-center">
        {
          singleUser && 
          <>
            <img src={singleUser.userImgUrl} alt="" className='img-thumbnail rounded-pill' style={{width: "80px"}}/>
            <h5 className='text-white m-0 mt-3'>{name}</h5>
            <small className='text-warning'>{singleUser.email}</small>
          </>
        }
      </div>
      <div className="container">
        <div className="row ">
          {
            getUserProducts.map((product: any) =>
              <>
                <div className="col-12 col-lg-3">
                  <div className="singleProduct p-4 shadow rounded">
                    <img src={product.productImgUrl} alt="" className='rounded mb-4'  style={{width:"100%"}}/>
                    <h5 className='m-0 text-capitalize'>{product.name}</h5>
                    <small className='d-block pb-2'>Shop Owner: <span className='text-warning'> <Link to={`/author/${product.userDetails.name}`} className='text-decoration-none'>{product.userDetails.name}</Link> </span></small>
                    <div className="productDetails d-flex justify-content-between">
                      <div className="actualPrice">
                        <span className='text-decoration-line-through '><b className='text-info '>Prcie:</b> {currencyFormatter.format(product.price, { code: 'USD' })}</span>
                        <small className='text-danger ps-2'>{product.discount}%</small>
                      </div>
                      <div className="discountPrice">
                        <span><b className='text-info '>Now: </b> {currencyFormatter.format(product.discountPrice, { code: 'USD' })}</span>
                      </div>
                    </div>
                    <hr />
                    <div className="blogActivity d-flex justify-content-between">
                      <div className="likeComment">
                        <button className="btn btn-info btn-sm rounded-pill"><Link to={`/products/${product.id}`} className="text-white text-decoration-none">Add to Cart</Link></button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )
          }
        </div>
      </div>
    </>
  )
}
