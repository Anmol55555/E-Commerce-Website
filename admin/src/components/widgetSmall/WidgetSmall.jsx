import './widgetSmall.css';
import { Visibility } from '@material-ui/icons';
import { useState, useEffect } from 'react';
import { userRequest } from '../../requestMethods.js';

const WidgetSmall = () => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        const getUsers = async () => {
            const res = await userRequest.get('users/?new=true');
            setUsers(res.data);
        }
        getUsers();
    }, []);

    return (
        <div className="widgetSmall">
            <span className="widgetSmallTitle">New Join Members</span>
            <ul className="widgetsmallList">

                {users.map((user) => (
                     <li className="widgetSmallListItem" key={user._id}>
                        <img src={
                            user.img || 
                            "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/271deea8-e28c-41a3-aaf5-2913f5f48be6/de7834s-6515bd40-8b2c-4dc6-a843-5ac1a95a8b55.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzI3MWRlZWE4LWUyOGMtNDFhMy1hYWY1LTI5MTNmNWY0OGJlNlwvZGU3ODM0cy02NTE1YmQ0MC04YjJjLTRkYzYtYTg0My01YWMxYTk1YThiNTUuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.BopkDn1ptIwbmcKHdAOlYHyAOOACXW0Zfgbs0-6BY-E"
                            } 
                        alt="" className="widgetSmallImg" />
                        <div className="widgetSmallUser">
                            <span className="widgetSmallUsername">{user.username}</span>
                            {/* <span className="widgetSmallUserTitle">Web Developer</span> */}
                        </div>
                        <button className="widgetSmallButton">
                            <Visibility className="widgetSmallIcon"/>
                            Display
                        </button>
                    </li>
                ))}
                
            </ul>
        </div>
    );
}

export default WidgetSmall;