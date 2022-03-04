import "../styles/splash.scss";
import {auth,db} from "../firebase_file";
import {useEffect} from "react";
import CircularProgress from '@material-ui/core/CircularProgress';
import {useHistory} from "react-router-dom";
const Splash=()=>{
    const history=useHistory();
    useEffect(()=>{
        auth.onAuthStateChanged((res)=>{
            if(res==null){
                history.replace("/login")
            }else{
                history.replace("/dashboard");
            }
        })
    },[auth])
    return(
        <div className="splash">
           <div>
               <CircularProgress size={20} style={{color:"var(--color)"}}/>
           </div>
        </div>
    )
}

export default Splash;