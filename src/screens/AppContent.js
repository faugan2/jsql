import "../styles/app_content.scss";
import {auth} from "../firebase_file";
import Sidebar from "../components/Sidebar";
import Top from "../components/Top";
import {useSelector,useDispatch} from "react-redux";
import {selectApp} from "../features/counterSlice";

const AppContent=()=>{
    const app_key=useSelector(selectApp);
    return(
        <div className="app_content">
            <Top />
            <Sidebar />
            <div style={{marginTop:"60px"}}>
               {app_key}
            </div>
        </div>
    )
}

export default AppContent;