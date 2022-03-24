import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import * as firebaseui from 'firebaseui'

import init, {Jsql} from "jsql2";

const firebaseConfig = {

  apiKey: "AIzaSyD79gtdKuoWnLw6Iy6leX6hIIJMIBKKmLc",
  authDomain: "jsql-project.firebaseapp.com",
  projectId: "jsql-project",
  storageBucket: "jsql-project.appspot.com",
  messagingSenderId: "222597198649",
  appId: "1:222597198649:web:a44c8e7c8120996ddd6ee8"

};


let app;
if(firebase.apps.length==0){
  app=firebase.initializeApp(firebaseConfig);
}else{
  app=firebase.app();
}

let ui;
if(new firebaseui.auth.AuthUI.getInstance()==null){
  ui=new firebaseui.auth.AuthUI(firebase.auth());
}else{
  ui=new firebaseui.auth.AuthUI.getInstance();
}

const auth=app.auth();
const db=app.firestore();
const storage=app.storage();

let jsql_app;
let jsql_auth;
let jsql_db;
let jsql_storage;

(async ()=>{
  await init();
  jsql_app=new Jsql("slfjsflsjfslkfjlk");
  jsql_auth=jsql_app.auth();
  jsql_db=jsql_app.database();
  jsql_storage=jsql_app.storage();
})()




export {auth,db,storage,ui,jsql_auth,jsql_db,jsql_storage};





