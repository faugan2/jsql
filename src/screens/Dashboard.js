import "../styles/dashboard.scss";
import {auth} from "../firebase_file";

const Dashboard=()=>{
    return(
        <div className="dashboard">
            this is my dashboard
            <button
            onClick={e=>{
                auth.signOut();
                
            }}
            >logout</button>
        </div>
    )
}

export default Dashboard;