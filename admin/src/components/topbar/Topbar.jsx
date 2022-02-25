import './topbar.css';
import { NotificationsNone, Language, Settings } from '@material-ui/icons';


const Topbar = () => {
    return (
        <div className="topbar">
            <div className="topbarWrapper">
                <div className="topLeft">
                    <span className="logo">lamaAdmin</span>
                </div>
                <div className="topRight">
                    <div className="topbarIconContainer">
                        <NotificationsNone />
                        <span className="topIconBadge">2</span>
                    </div>
                    <div className="topbarIconContainer">
                        <Language />
                        <span className="topIconBadge">2</span>
                    </div>
                    <div className="topbarIconContainer">
                        <Settings />
                    </div>
                    <img className="topAvatar" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGzdDWf3n4SspAc6ABZblZ7JnZ3gA9S0d3lg&usqp=CAU" alt="" />
                </div>
            </div>
        </div>
    );
}

export default Topbar;