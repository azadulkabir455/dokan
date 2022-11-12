
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyC_s5pnx8Lf3_0xSG1NNfALk19XACkk_5A",
  authDomain: "dokan-d0835.firebaseapp.com",
  projectId: "dokan-d0835",
  storageBucket: "dokan-d0835.appspot.com",
  messagingSenderId: "76474984117",
  appId: "1:76474984117:web:21f59879ac847b4d9200fc"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const database = getFirestore(app);
const storage = getStorage(app);

export {
    auth, 
    database, 
    storage
}
