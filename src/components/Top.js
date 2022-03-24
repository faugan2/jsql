import "../styles/top.scss";
import {auth,jsql_auth,jsql_db,jsql_storage} from "../firebase_file";
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import { useEffect } from "react";
import init,{Jsql} from "jsql2";
import logo from "./img/logo3.png";
import {useHistory} from "react-router-dom";

const Top=()=>{

    const history=useHistory();

    const go_to_home=async()=>{
      

        console.log("jsql_auth is ",jsql_auth,jsql_db,jsql_storage);
        history.push("/");
    }
    
  
    return(
        <div className="top">
            <div onClick={go_to_home}>
                <img src={logo} />
            </div>
            <div>
                <a>Accéder à la documentation</a>
                <img src={auth?.currentUser?.photoURL} />
                <button onClick={e=>{
                    auth.signOut();
                }}>
                    <PowerSettingsNewIcon />
                </button>
            </div>
            
        </div>
    )
}

export default Top;