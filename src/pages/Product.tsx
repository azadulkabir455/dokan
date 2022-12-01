import React, { ChangeEvent, useEffect, useState } from 'react'
import { BsSearch, BsThreeDotsVertical, BsLayersHalf, BsCardList, BsCurrencyDollar } from "react-icons/bs";
import currencyFormatter from 'currency-formatter';
import { useDispatch, useSelector } from 'react-redux';
import { editProduct, deleteProduct } from '../store/reducers/productReducers';
import { getProducts } from '../store/action/productAction';
import { Link } from 'react-router-dom';
import "../assets/css/product.scss"

export default function Product() {
  const [inputs, setInputs] = useState<any>({});
  const [productType, setProductTyep] = useState<string>("default");
  const [productInfo, setProductInfo] = useState<string>("Write something about the product");
  const [id, setId] = useState<number | null>(null)

  const { price, discount } = inputs;

  const dispatch = useDispatch();
  // Get Products Item
  const { products, loading } = useSelector((state: any) => state.products)
  useEffect(() => {
    dispatch(getProducts());
  }, [getProducts])

  // Function For Prefill product
  const preFillProduct = (name: string, type: string, price: number, discount: number, info: string, id: number) => {
    setInputs({ name: name, price: price, discount: discount });
    setProductTyep(type);
    setProductInfo(info)
    setId(id);
  }


  // Combine Data for Editing
  const discountPrice = price - (discount / 100) * price
  const combineDataForEditing = { ...inputs, productType, productInfo, discountPrice, id }

  // Get Data from Modal Form
  const submitHandler = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
  }

  const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    let name = e.target.name;
    let value = e.target.value;

    setInputs((prev: any) => ({ ...prev, [name]: value }))
  }

  // Fucntion for data update
  const updateProductData = () => {
    dispatch(editProduct(combineDataForEditing))
  }

  // Function for data delete
  const deleteProductData = (id: number) => {
    dispatch(deleteProduct(id))
  }
  return (
    <>
      <div className="container blogContainer ">
        <div className="row  g-4 mt-4">
          <div className="col-12 col-lg-3">
            <div className="searchProduct">
              <div className="searchBlog p-4 shadow rounded">
                <h6 className='text-uppercase mb-2'>Search your <span className='text-primary'>product</span></h6>
                <form>
                  <div className="form-group">
                    <div className="input-group">
                      <input type="email" className="form-control rounded-start" id="email" name="email" placeholder="Write your email"/>
                      <span className="input-group-text"><BsSearch /></span>
                    </div>
                  </div>
                </form>
              </div>
              <div className="filterByCategories p-4 shadow rounded mt-4">
                <h6 className='text-uppercase mb-2'>Filter by <span className='text-primary'>Categories</span></h6>
                <form>
                  <div className="form-check mb-2">
                    <input className="form-check-input" type="checkbox" id="education" />
                    <label className="form-check-label" htmlFor="education"> Education</label>
                  </div>
                  <div className="form-check mb-2">
                    <input className="form-check-input" type="checkbox" id="education" />
                    <label className="form-check-label" htmlFor="education"> Education</label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="education" />
                    <label className="form-check-label" htmlFor="education"> Education</label>
                  </div>
                </form>
              </div>
              <div className="filterByAuthor p-4 shadow rounded mt-4">
                <h6 className='text-uppercase mb-2'>Filter by <span className='text-primary'>Author</span></h6>
                <form>
                  <div className="form-check mb-2">
                    <input className="form-check-input" type="checkbox" id="education" />
                    <label className="form-check-label" htmlFor="education"> Education</label>
                  </div>
                  <div className="form-check mb-2">
                    <input className="form-check-input" type="checkbox" id="education" />
                    <label className="form-check-label" htmlFor="education"> Education</label>
                  </div>
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="education" />
                    <label className="form-check-label" htmlFor="education"> Education</label>
                  </div>
                </form>
              </div>
              <div className="filterByRange p-4 shadow rounded mt-4">
                <h6 className='text-uppercase mb-2'>Filter by <span className='text-primary'>Price range</span></h6>
                <form>
                  <div className="form-group">
                    <label htmlFor="range" className="form-label">Price</label>
                    <input type="range" className="form-range" min="0" max="5" value="0" step="0.5" id="range" />
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-6">
            <div className="row g-3">
              {
                loading ?
                  <>
                    <h1>Loading Products...</h1>
                  </> :
                  products.map((product: any) =>
                    <div className="col-12 col-lg-6" key={product.id}>
                      <div className="singleProduct p-4 shadow rounded">
                        <img src={product.productImgUrl} alt="" className='rounded mb-4' />
                        <h5 className='m-0 text-capitalize'>{product.name}</h5>
                        <small className='d-block pb-2'>Shop Owner: <span className='text-warning'> {product.userDetails.name}</span></small>
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
                          <div className="blogAction">
                            <div className="dropdown">
                              <span data-bs-toggle="dropdown"><BsThreeDotsVertical /></span>
                              <ul className="dropdown-menu">
                                <li><span className="dropdown-item" data-bs-toggle="modal" data-bs-target="#editModal" onClick={() => preFillProduct(product.name, product.productType, product.price, product.discount, product.productInfo, product.id)}>Edit</span></li>
                                <li><span className="dropdown-item" onClick={() => deleteProductData(product.id)}>Delete</span></li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
              }
            </div>
          </div>
          <div className="col-12 col-lg-3">
            <div className="chatContainer p-3 rounded shadow">
              <h6>Chat app</h6>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <div className="modal fade" id="editModal">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Product</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={submitHandler}>
                <div className="row  gx-3">
                  <div className="col-12">
                    <div className="form-group mb-3">
                      <label htmlFor="name" className="form-label">Product Title :</label>
                      <div className="input-group">
                        <span className="input-group-text"><BsLayersHalf /></span>
                        <input type="text" className="form-control" id="name" name="name" placeholder="Write your product name" value={inputs.name} onChange={inputHandler} />
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group mb-3">
                      <label htmlFor="role" className="form-label">Product Categories:</label>
                      <div className="input-group">
                        <span className="input-group-text"><BsCardList /></span>
                        <select className="form-select" id="role" name="role" value={productType} onChange={(e) => setProductTyep(e.target.value)}>
                          <option value="default">Select Categories</option>
                          <option value="cloth">Cloth</option>
                          <option value="groceries">Groceries</option>
                          <option value="electronics">Electronics Device</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-lg-6">
                    <div className="form-group mb-3">
                      <label htmlFor="price" className="form-label">Product Price :</label>
                      <div className="input-group">
                        <span className="input-group-text"><BsCurrencyDollar /></span>
                        <input type="number" className="form-control" id="price" name="price" value={inputs.price} onChange={inputHandler} />
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-lg-6">
                    <div className="form-group mb-3">
                      <label htmlFor="discount" className="form-label">Product Discount :</label>
                      <div className="input-group">
                        <span className="input-group-text"><BsCurrencyDollar /></span>
                        <input type="number" className="form-control" id="discount" name="discount" value={inputs.discount} onChange={inputHandler} />
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-lg-12">
                    <div className="form-group mb-3">
                      <label htmlFor="postexerpt" className="form-label">Product Details :</label>
                      <textarea className="form-control" id="postexerpt" rows={3} placeholder="Write your product details" value={productInfo} onChange={(e) => setProductInfo(e.target.value)} />
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="submit" className="btn btn-primary" data-bs-dismiss="modal" onClick={updateProductData}>Save changes</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
