import React from 'react'

export default function AddBlog() {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-10 col-md-8 col-lg-6 mx-auto">
            <div className="authForm p-4 rounded shadow-lg">
              <h4 className='text-capitalize mb-4'>Creat Your <span className='text-primary'>Post</span></h4>
              <form>
                <div className="row  gx-3">
                  <div className="col-12">
                    <div className="form-group mb-3">
                      <label htmlFor="name" className="form-label">Post Title :</label>
                      <div className="input-group">
                        <span className="input-group-text">@</span>
                        <input type="text" className="form-control" id="name" name="name" placeholder="Write your blog name" />
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-lg-6">
                    <div className="form-group mb-3">
                      <label htmlFor="role" className="form-label">Post Categories :</label>
                      <div className="input-group">
                        <span className="input-group-text">@</span>
                        <select className="form-select" id="role" name="role" >
                          <option value="default">Select Categories</option>
                          <option value="admin">Travel</option>
                          <option value="admin">Science</option>
                          <option value="user">Education</option>
                          <option value="moderator">Technology</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-lg-6">
                    <div className="form-group mb-3">
                      <label htmlFor="formFile" className="form-label">Post Image :</label>
                      <input className="form-control" type="file" id="formFile" />
                    </div>
                  </div>
                  <div className="col-12 col-lg-12">
                    <div className="form-group mb-3">
                      <label htmlFor="postexerpt" className="form-label">Post :</label>
                      <textarea className="form-control" id="postexerpt" rows={5}  placeholder="Write your post"></textarea>
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
