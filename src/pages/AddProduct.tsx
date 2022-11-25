import React, { useState, useEffect, ChangeEvent, useContext } from 'react'
import { v4 } from 'uuid';
import { storage } from '../firebase-config';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { useSelector, useDispatch } from 'react-redux';
import { GlobalContextProvider } from '../contextAPI/GlobalContext';
import { BsLayersHalf, BsCardList, BsCurrencyDollar } from "react-icons/bs";
import { addProduct } from '../store/reducers/productReducers';


export default function AddProduct() {
  const [inputs, setInputs] = useState<any>({});
  const [productType, setProductTyep] = useState<string>("default");
  const [productInfo, setProductInfo] = useState<string>("Write something about the product");

  const dispatch = useDispatch();


  // For Image Upload
  const [productImg, setProductImg] = useState<any>(null);
  const [imgUploadProgress, setImgUploadProgress] = useState<number>();
  const [productImgUrl, setProductImageUrl] = useState<string | null>(null)

  // Get userData
  const { currentUser }: any = useContext(GlobalContextProvider)
  const { users } = useSelector((state: any) => state.users);
  const userDetails = users.filter((user: any) => user.id === currentUser.uid)[0]

  // Combine Data for discount
  const { price, discount } = inputs;
  const discountPrice = price - (discount / 100) * price;
  const combineProductData = { ...inputs, discountPrice, productType, productInfo, productImgUrl, userDetails }

  const formHandler = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(addProduct(combineProductData))
  }
  const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    let name = e.target.name;
    let value = e.target.value;

    setInputs((prev: any) => ({ ...prev, [name]: value }));
  }

  const typeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setProductTyep(e.target.value)
  }

  const infoHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setProductInfo(e.target.value);
  }

  // Get img url form form 
  useEffect(() => {
    if (productImg === null) return;
    const imgRef = ref(storage, `/productImages/${productImg.name + v4()}`);
    const uploadTask = uploadBytesResumable(imgRef, productImg);

    uploadTask.on("state_changed", (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setImgUploadProgress(progress);

      switch (snapshot.state) {
        case "paused":
          console.log("Image Uploading is running");
          break;
        case "running":
          console.log("Imgae uploading is running");
          break;
        default:
          console.log("Image Upload is done");
      }
    }, (error) => {
      console.log(error.message)
    }, () => {
      getDownloadURL(uploadTask.snapshot.ref).then((imgUrl) => {
        setProductImageUrl(imgUrl);
      })
    })
  }, [productImg])

  return (
    <>
      <div className="container">
        <div className="row mt-4">
          <div className="col-10 col-md-8 col-lg-6 mx-auto">
            <div className="authForm p-4 rounded shadow-lg">
              <h4 className='text-capitalize mb-4'>Add your <span className='text-primary'>product</span></h4>
              <form onSubmit={formHandler}>
                <div className="row  gx-3">
                  <div className="col-12">
                    <div className="form-group mb-3">
                      <label htmlFor="name" className="form-label">Product Title :</label>
                      <div className="input-group">
                        <span className="input-group-text"><BsLayersHalf /></span>
                        <input type="text" className="form-control" id="name" name="name" placeholder="Write your product name" onChange={inputHandler} />
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-lg-6">
                    <div className="form-group mb-3">
                      <label htmlFor="type" className="form-label">Product Categories:</label>
                      <div className="input-group">
                        <span className="input-group-text"><BsCardList /></span>
                        <select className="form-select" id="type" name="type" onChange={typeHandler} value={productType} >
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
                      <label htmlFor="formFile" className="form-label">Product Image :</label>
                      <input className="form-control" type="file" id="formFile" onChange={(e: any) => setProductImg(e.target.files[0])} />
                    </div>
                  </div>
                  <div className="col-12 col-lg-6">
                    <div className="form-group mb-3">
                      <label htmlFor="price" className="form-label">Product Price :</label>
                      <div className="input-group">
                        <span className="input-group-text"><BsCurrencyDollar /></span>
                        <input type="number" className="form-control" id="price" name="price" onChange={inputHandler} />
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-lg-6">
                    <div className="form-group mb-3">
                      <label htmlFor="discount" className="form-label">Product Discount :</label>
                      <div className="input-group">
                        <span className="input-group-text"><BsCurrencyDollar /></span>
                        <input type="number" className="form-control" id="discount" name="discount" onChange={inputHandler} />
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-lg-12">
                    <div className="form-group mb-3">
                      <label htmlFor="productInfo" className="form-label">Product Details :</label>
                      <textarea className="form-control" id="productInfo" value={productInfo} onChange={infoHandler} rows={3} placeholder="Write your product details"></textarea>
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
