import "../styles/app_content.scss";
import {auth} from "../firebase_file";
import Sidebar from "../components/Sidebar";
import Top from "../components/Top";
import {useSelector,useDispatch} from "react-redux";
import {selectApp} from "../features/counterSlice";
import Integration from "../components/Integration";
import {useState,useEffect} from "react";

const AppContent=()=>{
    const [index,set_index]=useState(0);
    const app_key=useSelector(selectApp);

    return(
        <div className="app_content">
            <Top />
            <Sidebar />
            <div style={{marginTop:"60px"}}>
               {index==0 && <Integration app_key={app_key}/> }
            </div>
        </div>
    )
}

export default AppContent;