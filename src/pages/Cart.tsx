import React from 'react'
import { inc, dec, remove } from '../store/reducers/cartReducers';
import { useDispatch, useSelector } from 'react-redux';
import currencyFormatter from 'currency-formatter';
import { BsPlus, BsDash, BsXLg } from "react-icons/bs";

export default function Cart() {
  const dispatch = useDispatch();
  const { products,totalPrice,totalQuantity } = useSelector((state: any) => state.cart)

  // Function For increment, decrement and remove product

  const incProduct = (id:number,quantity:number) => {
    dispatch(inc({id,quantity}))
  }
  const decProduct = (id:number) => {
    dispatch(dec(id))
  }
  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col-12 col-lg-9">
            <table className="table table-striped table-hover">
              <thead>
                <tr className='table-primary text-center'>
                  <th className='text-center'>Product Pic</th>
                  <th>Product Name</th>
                  <th>Product Price</th>
                  <th>Inc / Dec</th>
                  <th>Total Quantity</th>
                  <th>Total Price</th>
                  <th>Remove product</th>
                </tr>
              </thead>
              <tbody>
                {
                  products.map((product: any) =>
                    <tr key={product.id} className='text-center align-middle'>
                      <td>
                        <img src={product.productImgUrl} alt="" className='img-thumbnail' style={{width:"70px"}}/>
                      </td>
                      <td >
                        <p><b>{product.name}</b></p>
                      </td>
                      <td >
                        <p className='text-info'> {currencyFormatter.format(product.discountPrice, { code: 'USD' })}</p>
                      </td>
                      <td className='text-center'>
                        <div className="incDec">
                          <div className="btn-group" role="group" aria-label="Basic example">
                            <button type="button" className="btn btn-outline-primary btn-md rounded-0" style={{ width: "38px" }} onClick={() => decProduct(product.id)}><BsDash /></button>
                            <button type="button" className="btn btn-outline-primary btn-md rounded-0" style={{ width: "38px" }}>{product.quantity}</button>
                            <button type="button" className="btn btn-outline-primary btn-md rounded-0" style={{ width: "38px" }} onClick={() => incProduct(product.id, product.quantity)}><BsPlus /></button>
                          </div>
                        </div>
                      </td>
                      <td >
                        <p>{product.quantity  }</p>
                      </td>
                      <td >
                      <p > {currencyFormatter.format(Math.floor(product.discountPrice * product.quantity), { code: 'USD' })}</p>
                      </td>
                      <td className='text-center'>
                        <button className="btn btn-sm btn-primary rounded-pill"><BsXLg /></button>
                      </td>
                    </tr>
                  )
                }
              </tbody>
            </table>
          </div>
          <div className="col-12 col-lg-3">
            <div className="p-4 shadow rounded d-grid">
              <p><b>Total Product:</b> {totalQuantity}</p>
              <p><b>Total Price:</b>  {currencyFormatter.format(totalPrice, { code: 'USD' })}</p>
              <button className='btn btn-primary rounded-1 mt-2 btn-md'>Check Out</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
