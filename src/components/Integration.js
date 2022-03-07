import "../styles/integration.scss";
import IntegrationNpm from "./IntegrationNpm";
import IntegrationCdn from "./IntegrationCdn";
import IntegrationConfiguration from "./IntegrationConfiguration";  
import {useState,useEffect} from "react";

const Integration=({app_key})=>{
    const [index,set_index]=useState(0);
    const set_option=(index)=>{
        set_index(index);
        const options=document.querySelectorAll(".options input");
        const input=options[index];
        input.checked=true;
    }
    return(
        <div className="integration">
           <div className="options">
                <button className="option" onClick={set_option.bind(this,0)}>
                    <input type="radio" name="option" /> 
                    <label>nmp</label>    
                </button>

                 <button className="option" onClick={set_option.bind(this,1)}>
                    <input type="radio" name="option" /> 
                    <label>CDN</label>    
                </button>   

                 <button className="option" onClick={set_option.bind(this,2)}>
                    <input type="radio" name="option" /> 
                    <label>Configuration</label>    
                </button>    
            </div>

            {index==0 && <IntegrationNpm app_key={app_key}/>}
            {index==1 && <IntegrationCdn app_key={app_key}/>}
            {index==2 && <IntegrationConfiguration app_key={app_key}/>}
        </div>
    )
}

export default Integration;