import "../styles/login.scss";
import {useState,useEffect,useRef} from "react";
import 'firebaseui/dist/firebaseui.css'
import firebase from "firebase";
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import CheckIcon from '@material-ui/icons/Check';
import {useHistory} from "react-router-dom";
import {ui,db,auth} from "../firebase_file";
import CircularProgress from '@material-ui/core/CircularProgress';

const Login=()=>{

    const history=useHistory();
    const btn_ref=useRef(null);

    const [email,set_email]=useState("");
    const [password,set_password]=useState("");
    const [loging,set_loging]=useState(false);
    const [loging_google,set_loging_google]=useState(false);
    const [alerte,set_alerte]=useState("");

    const login_with_google=async ()=>{
        set_loging_google(true);
        var provider=new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider).then((res)=>{
            const user_email=res.user.email;
            db.collection("users").where("email","==",user_email).get().then(async (snap)=>{
                if(snap.docs.length==0){
                    set_alerte("Ce compte google n'existe pas dans notre base");
                    await auth.currentUser.delete();
                    await auth.signOut();
                    
                }else{
                    history.replace("/dashboard")
                }
            }).catch((err)=>{
                auth.signOut();
                set_alerte(err.message);
            })
            
        }).catch((err)=>{
            set_alerte(err.message);
        })
    }

    const login_with_email_and_password=async()=>{
        set_alerte("");
        if(email==""){
            set_alerte("The email is empty");
            return;
        }
        if(password==""){
            set_alerte("The password is empty");
            return;
        }
        set_loging(true);
        btn_ref.current.disabled=true;
        //check if user in db

        db.collection("users").where("email","==",email).get().then((snap)=>{
            if(snap.docs.length==0){
                //user not found
                set_alerte("This email does not exist in our database");
                btn_ref.current.disabled=false;
                set_loging(false);
            }else{
                //user  found
                auth.signInWithEmailAndPassword(email,password).then(()=>{
                    //well signed in
                    history.replace("/dashboard");
                }).catch((err)=>{
                    set_alerte(err.message);
                    btn_ref.current.disabled=false;
                    set_loging(false);
                })
            }
        }).catch((err)=>{
            set_alerte(err.message);
            btn_ref.current.disabled=false;
            set_loging(false);
        })

        // authentificate the user

    }

    return(
        <div className="login">
           <div className="left">left</div>
           <div className="right">
               <h2>Sign In</h2>

               <div className="form">
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
                       <button onClick={login_with_email_and_password} ref={btn_ref}>
                           {loging==false && <CheckIcon  style={{fontSize:"1.2rem"}} />}
                           {loging==true && <CircularProgress size={15} style={{color:"var(--color)"}}/> }
                           Login
                       </button>
                   </div>

                   <div className="line">
                       <p>{alerte}</p>
                   </div>

                   <div className="line">
                       <p>Forget your login details ? <span>Get help signing in.</span></p>
                   </div>
               </div>
               <div className="or_zone">
                   <p></p>
                    <p>OR</p>
                    <p></p>
               </div>
               <div className="zone_google">
                   {loging_google==true && <CircularProgress size={15} style={{color:"var(--color)"}}/> }
                    <button onClick={login_with_google}>Sing in with Google</button>
               </div>

                <div className="not_account_zone">
                    <p>Don't have an account ? <span onClick={e=>{
                        history.push("/signup");
                    }}>Sign Up</span></p>
                </div>
           </div>
        </div>
    )
}

export default Login;