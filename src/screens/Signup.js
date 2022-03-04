import "../styles/login.scss";
import {useState,useEffect,useRef} from "react";
import 'firebaseui/dist/firebaseui.css'
import firebase from "firebase";
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import CheckIcon from '@material-ui/icons/Check';
import {useHistory} from "react-router-dom";
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import {ui,auth,db} from "../firebase_file";

import CircularProgress from '@material-ui/core/CircularProgress';
  

const Login=()=>{
    const history=useHistory();
    
    const btn_create=useRef(null);
  
    const [username,set_username]=useState("");
    const [email,set_email]=useState("");
    const [password,set_password]=useState("");
    const [creating,set_creating]=useState(false);
    const [alerte,set_alerte]=useState("");

    const create_account_with_google=()=>{
        var provider=new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider).then((res)=>{
            console.log("the res is ",res.user.email);
            const user_email=res.user.email;
            const user_username=res.user.displayName;
            const photo=res.user.photoURL;

            //check if user is in db 
            db.collection("users").where("email","==",email).get().then((snap)=>{
                if(snap.docs.length==0){
                    //user not found
                    db.collection("users").add({
                        email:user_email,
                        username:user_username,
                        password:user_email,
                        date:firebase.firestore.FieldValue.serverTimestamp(),
                        photo
                    }).then(()=>{
                        history.replace("/dashboard");
                    }).catch((err)=>{
                        auth.signOut();
                        set_alerte(err.message);
                    })
                }else{
                    //user found 
                    auth.signOut();
                    set_alerte("Cette adresse google est utilisée");
                }
            }).catch((err)=>{
                auth.signOut();
                set_alerte(err.message);
            })
            set_alerte("ok with google account for user",user_email);
        }).catch((err)=>{
            set_alerte(err.message);
        })
    }
    const create_account_with_email_and_password=async ()=>{
        set_alerte("");
        if(username==""){
            set_alerte("The username is empty");
            return;
        }
        if(email==""){
            set_alerte("The email is empty");
            return;
        }
        if(password==""){
            set_alerte("The password is empty");
            return;
        }

        set_creating(true);
        btn_create.current.disabled=true;
        
        //check if account already exist in db
        db.collection("users").where("email","==",email).get().then((snap)=>{
            if(snap.docs.length==0){
                db.collection("users").add({
                    username,
                    email,
                    password,
                    date:firebase.firestore.FieldValue.serverTimestamp(),
                    photo:null
                }).then((res)=>{
                    //user inserted in db 
                    //insert now in auth service
                    auth.createUserWithEmailAndPassword(email,password).then(()=>{
                        // all good
                        set_creating(false);
                        history.replace("/dashboard");
                    }).catch(async (err)=>{
                        const key=res.id;
                        await db.collection("users").doc(key).delete();
                        set_alerte(err.message);
                        btn_create.current.disabled=false;
                        set_creating(false);
                        return;
                    })
                }).catch((err)=>{
                    set_alerte(err.message);
                    btn_create.current.disabled=false;
                    set_creating(false);
                    return;
                })
            }else{
                set_alerte("User with this email  already exists");
                btn_create.current.disabled=false;
                set_creating(false);
                return;
            }
        }).catch((err)=>{
            set_alerte(err.message);
            btn_create.current.disabled=false;
            set_creating(false);
            return;
        });

        // insert in db

        // insert in auth
        
    }
    return(
        <div className="login">
           <div className="left">left</div>
           <div className="right">
               <h2>Create a jSQL account</h2>

               <div className="form">
               <div className="line">
                        <label>Username</label>
                        <div>
                            <input type="text" 
                            value={username}
                            onChange={e=>set_username(e.target.value)}
                            />
                            <PermIdentityIcon style={{fontSize:"1.2rem",color:"gray"}} />
                        </div>
                        
                   </div>
                   <div className="line">
                        <label>Email</label>
                        <div>
                            <input type="email"
                            value={email}
                            onChange={e=>set_email(e.target.value)}
                            />
                            <MailOutlineIcon style={{fontSize:"1.2rem",color:"gray"}} />
                        </div>
                        
                   </div>
                   <div className="line">
                       <label>Password</label>
                       <div>
                           <input type="password" 
                           value={password}
                           onChange={e=>set_password(e.target.value)}
                           />
                           <LockOpenIcon style={{fontSize:"1.2rem",color:"gray"}} />
                       </div>
                   </div>
                   <div className="line">
                       <button onClick={create_account_with_email_and_password} ref={btn_create}>
                           {creating==false && <CheckIcon  style={{fontSize:"1.2rem"}} />}
                           {creating==true && <CircularProgress size={15} style={{fontSize:"1.2rem",color:"var(--color)"}} />}
                           Sign up</button>
                   </div>

                   <div className="line">
                       <p>{alerte}</p>
                   </div>

                  
               </div>
               <div className="or_zone">
                   <p></p>
                    <p>OR</p>
                    <p></p>
               </div>
               <div className="zone_google">
                    <button onClick={create_account_with_google}>Sign up with Google</button>
               </div>

                <div className="not_account_zone">
                    <p>Already signed up ? <span onClick={e=>{
                        history.push("/login")
                    }}>Sign In</span></p>
                </div>
           </div>
        </div>
    )
}

export default Login;