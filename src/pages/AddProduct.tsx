import React from 'react'

export default function AddProduct() {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-10 col-md-8 col-lg-6 mx-auto">
            <div className="authForm p-4 rounded shadow-lg">
              <h4 className='text-capitalize mb-4'>Add your <span className='text-primary'>product</span></h4>
              <form>
                <div className="row  gx-3">
                  <div className="col-12">
                    <div className="form-group mb-3">
                      <label htmlFor="name" className="form-label">Product Title :</label>
                      <div className="input-group">
                        <span className="input-group-text">@</span>
                        <input type="text" className="form-control" id="name" name="name" placeholder="Write your product name" />
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-lg-6">
                    <div className="form-group mb-3">
                      <label htmlFor="role" className="form-label">Product Categories:</label>
                      <div className="input-group">
                        <span className="input-group-text">@</span>
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
                        <span className="input-group-text">@</span>
                        <input type="number" className="form-control" id="name" name="name" />
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-lg-6">
                    <div className="form-group mb-3">
                      <label htmlFor="name" className="form-label">Product Discount :</label>
                      <div className="input-group">
                        <span className="input-group-text">@</span>
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
                  <div className="col-12">
                    <div className="form-group mb-3 mt-2">
                      <input type="submit"
                        className="btn btn-primary form-control"
                        value="Create Post"
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
