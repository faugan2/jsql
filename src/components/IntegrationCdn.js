import "../styles/integration_cdn.scss";
const IntegrationCdn=({app_key})=>{
    return(
        <div className="integration_cdn">
            <p>Copy and paste this code at the bottom of your body tag before start using jSQL
                in your project.
            </p>

            <div>
                <pre>
                &lt;script src='https://jsql.org/app/1.0.0/jsql-app.js'&gt;&lt;/script&gt;<br /><br />
               
                   
                &lt;script type="module"&gt;<br />
                    import init, &#123;Jsql&#125;  from "jsql2";<br /><br />

                    init().then(()=&#62;&#123;<br /><br />
                    const app=new Jsql('{app_key}');<br /><br />
                    const db=app.database();<br />
                    const auth=app.auth();<br />
                    const storage=app.storate();<br /><br />
                &#125;)<br />
                &lt;/script&gt;

                </pre>
            </div>
        </div>
    )
}
export default IntegrationCdn;