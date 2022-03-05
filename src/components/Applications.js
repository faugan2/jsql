import "../styles/applications.scss";
import Modal from "./Modal";
import {useState,useEffect} from "react";

const Applications=()=>{

    const [create,set_create]=useState(false);
    const close_create=()=>{
        set_create(false);
    }

    return(
        <div className="applications">
            <div className="top_applications">
                <button onClick={e=>set_create(true)}>Create a new application</button>    
            </div>
            <div className="content">
                <table border="1">
                    <thead>
                        <tr>
                            <th>N°</th>
                            <th>Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>

                    </tbody>
                </table>    
            </div>

            {create==true && <Modal 
            content="je suis le contenu du modal"
            close={close_create}
            />}
        </div>
    )
}
export default Applications;