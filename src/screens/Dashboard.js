import "../styles/dashboard.scss";
import {auth} from "../firebase_file";
import Sidebar from "../components/Sidebar";
import Top from "../components/Top";
import Applications from "../components/Applications";

const Dashboard=()=>{
    return(
        <div className="dashboard">
            <Top />
            <Applications />
        </div>
    )
}

export default Dashboard;