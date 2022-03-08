import "../styles/applications.scss";
import Modal from "./Modal";
import {useState,useEffect} from "react";
import CreateApp from "./CreateApp";
import {auth,db} from "../firebase_file";
import SettingsIcon from '@material-ui/icons/Settings';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import {useSelector,useDispatch} from "react-redux";
import {setApp} from "../features/counterSlice";
import {useHistory} from "react-router-dom";
import AddIcon from '@material-ui/icons/Add';
const moment=require("moment-timezone");
const Applications=()=>{

    const history=useHistory();
    const dispatch=useDispatch();

    const [create,set_create]=useState(false);
    const [apps,set_apps]=useState([]);
    const [loading,set_loading]=useState(false);
    const close_create=()=>{
        set_create(false);
    }


    useEffect(()=>{
        set_loading(true);
        const sub=db.collection("apps").onSnapshot((snap)=>{
            const d=[];
            snap.docs.map((doc)=>{
                const key=doc.id;
                const data=doc.data();
                const email=data.user;
                if(email==auth?.currentUser?.email){
                    data.key=key;
                d.push(data);
                }
                
            })

           set_apps(d);
           set_loading(false);
            
        })
    },[])

    const go_to_app=(key)=>{
        dispatch(setApp(key));
        history.push("/app-content");
    }

    const delete_app=async (key)=>{
        await db.collection("apps").doc(key).delete();
    }
    return(
        <div className="applications">
            <div className="top_applications">
                <button onClick={e=>set_create(true)}>
                    <AddIcon />
                    Create a new application</button>    
            </div>
            <div className="content">
                <table border="1">
                    <thead>
                        <tr>
                            <th width="5%">N°</th>
                            <th width="10%">Date</th>
                            <th style={{textAlign:"left"}}>Name</th>
                            <th width="10%">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            (apps.length==0 && loading==false) && 
                            <tr>
                                <td colSpan="4" style={{textAlign:"center",fontSize:"0.8rem"}}>No app found</td>
                            </tr>
                        }


{
                            loading==true && 
                            <tr>
                                <td colSpan="4" style={{textAlign:"center",fontSize:"0.8rem"}}>Loading...</td>
                            </tr>
                        }



                        {
                            apps.map((app,i)=>{
                                const date=moment(app.date?.seconds*1000).format("ll");
                                //const date=app.date?.seconds;
                                return <tr key={app.key}>
                                    <td align="center">{i+1}</td>
                                    <td align="center">{date}</td>
                                    <td>{app.name}</td>
                                    <td className="actions">
                                        <button onClick={go_to_app.bind(this,app.key)}>
                                            <SettingsIcon style={{fontSize:"1.2rem"}}/>
                                        </button>
                                        <button onClick={delete_app.bind(this,app.key)}>
                                            <DeleteOutlineIcon style={{color:"indianred",fontSize:"1.2rem"}}/>
                                        </button>
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>    
            </div>

            {create==true && <Modal 
            content={<CreateApp close={close_create}/>}
            close={close_create}
            />}
        </div>
    )
}
export default Applications;