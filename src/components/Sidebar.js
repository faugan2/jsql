import "../styles/sidebar.scss";
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import StorageIcon from '@material-ui/icons/Storage';
import PublicIcon from '@material-ui/icons/Public';
import ComputerIcon from '@material-ui/icons/Computer';
const Sidebar=()=>{
    return(
        <ul className="sidebar">
            <li>
                <a>
                    <PeopleOutlineIcon style={{color:"gray"}} />
                    jSQL Authentification
                </a>
            </li>
            <li>
                <a>
                    <ComputerIcon style={{color:"gray"}}/>
                    jSQL Database
                </a>
            </li>
            <li>
                <a>
                    <StorageIcon style={{color:"gray"}}/>
                    jSQL Storage
                </a>
            </li>
            <li>
                <a>
                    <PublicIcon style={{color:"gray"}}/>
                    jSQL Hosting
                </a>
            </li>
        </ul>
    )
}
export default Sidebar;