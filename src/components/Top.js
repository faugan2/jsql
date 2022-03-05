import "../styles/top.scss";
import {auth} from "../firebase_file";

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
            </div>
        </div>
    )
}

export default Top;