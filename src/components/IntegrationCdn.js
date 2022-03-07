import "../styles/integration_cdn.scss";
const IntegrationCdn=({app_key})=>{
    return(
        <div className="integration_cdn">
            <p>Copy and paste this code at the bottom of your body tag before start using jSQL
                in your project.
            </p>

            <div>
                <pre>
                &lt;script src='https://jsql.org/app/1.0.0/jsql-app.js'&gt;&lt;/script&gt;<br />
                    
                    const app=jsql.init('{app_key}');
                </pre>
            </div>
        </div>
    )
}
export default IntegrationCdn;