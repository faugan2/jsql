import "../styles/create_app.scss";
import {useState,useEffect,useRef} from "react";
import {auth,db} from "../firebase_file";
import firebase from "firebase";

const CreateApp=({close})=>{
    const [alerte,set_alerte]=useState( "");
    const [name,set_name]=useState("");
    const [creating,set_creating]=useState(false);
    const btn=useRef(null);


    const create_app=(e)=>{
        set_alerte("");
        if(name==""){
            set_alerte("The name is empty");
            return;
        }

        btn.current.disabled=true;
        set_alerte("Please wait...");
        set_creating(true);

        db.collection("apps").add({
            name,
            user:auth?.currentUser?.email,
            date:firebase.firestore.FieldValue.serverTimestamp(),
        }).then(()=>{
            set_name("");
            set_alerte("");
            set_creating(false);
            btn.current.disabled=false;
            close();
        }).catch((err)=>{
            set_creating(false);
            set_alerte(err.message);
            btn.current.disabled=false;
        })

    }
    return(
        <div className="create_app">
            <div className="line">
                <label>Application name</label>
                <div>
                    <input type="text" 
                    value={name}
                    onChange={e=>set_name(e.target.value)}
                    />
                </div>
            </div>

            <div className="line">
                <button onClick={create_app} ref={btn}>Create</button>    
            </div>
            
          <p>{alerte}</p>
            
        </div>
    )
}

export default CreateApp;