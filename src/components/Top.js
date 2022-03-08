import "../styles/top.scss";
import {auth} from "../firebase_file";
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
const Top=()=>{
    return(
        <div className="top">
            <div>
                logo
                <h2>jSQL</h2>
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