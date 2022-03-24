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
                    
                    import init, &#123;Jsql&#125;  from "jsql2";<br /><br />

                    init().then(()=&#62;&#123;<br /><br />
                    const app=new Jsql('{app_key}');<br /><br />
                    const db=app.database();<br />
                    const auth=app.auth();<br />
                    const storage=app.storate();<br /><br />
                    &#125;)<br />
                    
                   


                 </pre>
                
            </div>
        </div>
    )
}

export default IntegrationNpm;