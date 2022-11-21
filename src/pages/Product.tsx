import React, { useContext } from 'react'
import { GlobalContextProvider } from '../contextAPI/GlobalContext'
import { BsSearch, BsThreeDotsVertical,BsLayersHalf,BsCardList, BsCurrencyDollar  } from "react-icons/bs";
import "../assets/css/product.scss"

export default function Product() {
  const { logout }: any = useContext(GlobalContextProvider);
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
                      <input type="email" className="form-control rounded-start" id="email" name="email" placeholder="Write your email" />
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
              <div className="col-12 col-lg-6">
                <div className="singleProduct p-4 shadow rounded">
                  <img src="./user.png" alt="" className='rounded mb-4' />
                  <h5>Demo Product</h5>
                  <div className="productDetails d-flex justify-content-between">
                    <div className="actualPrice">
                      <span className='text-decoration-line-through '><b className='text-info '>Prcie:</b> 20</span>
                      <span className='text-primary ps-3'>3%</span>
                    </div>
                    <div className="discountPrice">
                      <span><b className='text-danger '>Now: </b> 18</span>
                    </div>
                  </div>
                  <hr />
                  <div className="blogActivity d-flex justify-content-between">
                    <div className="likeComment">
                      <button className="btn btn-info btn-sm rounded-pill">Add to Cart</button>
                    </div>
                    <div className="blogAction">
                      <div className="dropdown">
                        <span data-bs-toggle="dropdown"><BsThreeDotsVertical /></span>
                        <ul className="dropdown-menu">
                          <li><a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#editModal">Edit</a></li>
                          <li><a className="dropdown-item" href="#">Delete</a></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-6">
                <div className="singleProduct p-4 shadow rounded">
                  <img src="./user.png" alt="" className='rounded mb-4' />
                  <h5>Demo Product</h5>
                  <div className="productDetails d-flex justify-content-between">
                    <div className="actualPrice">
                      <span className='text-decoration-line-through '><b className='text-info '>Prcie:</b> 20</span>
                      <span className='text-primary ps-3'>3%</span>
                    </div>
                    <div className="discountPrice">
                      <span><b className='text-danger '>Now: </b> 18</span>
                    </div>
                  </div>
                  <hr />
                  <div className="blogActivity d-flex justify-content-between">
                    <div className="likeComment">
                      <button className="btn btn-info btn-sm rounded-pill">Add to Cart</button>
                    </div>
                    <div className="blogAction">
                      <div className="dropdown">
                        <span data-bs-toggle="dropdown"><BsThreeDotsVertical /></span>
                        <ul className="dropdown-menu">
                          <li><a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#editModal">Edit</a></li>
                          <li><a className="dropdown-item" href="#">Delete</a></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-6">
                <div className="singleProduct p-4 mb-4 shadow rounded">
                  <img src="./user.png" alt="" className='rounded mb-4' />
                  <h5>Demo Product</h5>
                  <div className="productDetails d-flex justify-content-between">
                    <div className="actualPrice">
                      <span className='text-decoration-line-through '><b className='text-info '>Prcie:</b> 20</span>
                      <span className='text-primary ps-3'>3%</span>
                    </div>
                    <div className="discountPrice">
                      <span><b className='text-danger '>Now: </b> 18</span>
                    </div>
                  </div>
                  <hr />
                  <div className="blogActivity d-flex justify-content-between">
                    <div className="likeComment">
                      <button className="btn btn-info btn-sm rounded-pill">Add to Cart</button>
                    </div>
                    <div className="blogAction">
                      <div className="dropdown">
                        <span data-bs-toggle="dropdown"><BsThreeDotsVertical /></span>
                        <ul className="dropdown-menu">
                          <li><a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#editModal">Edit</a></li>
                          <li><a className="dropdown-item" href="#">Delete</a></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-6">
                <div className="singleProduct p-4 mb-4 shadow rounded">
                  <img src="./user.png" alt="" className='rounded mb-4' />
                  <h5>Demo Product</h5>
                  <div className="productDetails d-flex justify-content-between">
                    <div className="actualPrice">
                      <span className='text-decoration-line-through '><b className='text-info '>Prcie:</b> 20</span>
                      <span className='text-primary ps-3'>3%</span>
                    </div>
                    <div className="discountPrice">
                      <span><b className='text-danger '>Now: </b> 18</span>
                    </div>
                  </div>
                  <hr />
                  <div className="blogActivity d-flex justify-content-between">
                    <div className="likeComment">
                      <button className="btn btn-info btn-sm rounded-pill">Add to Cart</button>
                    </div>
                    <div className="blogAction">
                      <div className="dropdown">
                        <span data-bs-toggle="dropdown"><BsThreeDotsVertical /></span>
                        <ul className="dropdown-menu">
                          <li><a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#editModal">Edit</a></li>
                          <li><a className="dropdown-item" href="#">Delete</a></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
              <form>
                <div className="row  gx-3">
                  <div className="col-12">
                    <div className="form-group mb-3">
                      <label htmlFor="name" className="form-label">Product Title :</label>
                      <div className="input-group">
                        <span className="input-group-text"><BsLayersHalf /></span>
                        <input type="text" className="form-control" id="name" name="name" placeholder="Write your product name" />
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-lg-6">
                    <div className="form-group mb-3">
                      <label htmlFor="role" className="form-label">Product Categories:</label>
                      <div className="input-group">
                        <span className="input-group-text"><BsCardList /></span>
                        <select className="form-select" id="role" name="role" >
                          <option value="default">Select Categories</option>
                          <option value="admin">Cloth</option>
                          <option value="user">Groceries</option>
                          <option value="admin">Electronics Device</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-lg-6">
                    <div className="form-group mb-3">
                      <label htmlFor="formFile" className="form-label">Product Image :</label>
                      <input className="form-control" type="file" id="formFile" />
                    </div>
                  </div>
                  <div className="col-12 col-lg-6">
                    <div className="form-group mb-3">
                      <label htmlFor="name" className="form-label">Product Price :</label>
                      <div className="input-group">
                        <span className="input-group-text"><BsCurrencyDollar /></span>
                        <input type="number" className="form-control" id="name" name="name" />
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-lg-6">
                    <div className="form-group mb-3">
                      <label htmlFor="name" className="form-label">Product Discount :</label>
                      <div className="input-group">
                        <span className="input-group-text"><BsCurrencyDollar /></span>
                        <input type="number" className="form-control" id="name" name="name" />
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-lg-12">
                    <div className="form-group mb-3">
                      <label htmlFor="postexerpt" className="form-label">Product Details :</label>
                      <textarea className="form-control" id="postexerpt" rows={3} placeholder="Write your product details"></textarea>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
