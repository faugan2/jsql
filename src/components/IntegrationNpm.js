import "../styles/integration_npm.scss";
const IntegrationNpm=({app_key})=>{
    return (
        <div className="integration_npm">
            <h2>Installation</h2>
            <div>
                <pre>npm install jsql</pre>
            </div>

            <h2>Initialisation of jSQL</h2>
            <div>
                <pre>
                    
                    import jsql from "jsql";<br /><br />

                    const app=jsql.init('{app_key}');<br /><br />
                    const db=app.database();<br />
                    const auth=app.auth();<br />
                    const storage=app.storate();<br />


                 </pre>
                
            </div>
        </div>
    )
}

export default IntegrationNpm;