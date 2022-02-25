import './user.css';
import { PermIdentity, CalendarToday, PhoneAndroid, LocationSearching, Email } from '@material-ui/icons';
import { Publish } from '@material-ui/icons';
import { Link } from 'react-router-dom';

const User = () => {
    return (
        <div className="user">
            <div className="userTitleContainer">
                <h1 className="userTitle">Edit User</h1>
                <Link to='/newUser'>
                    <button className="userAddButton">Create</button>
                </Link>
            </div>
            <div className="userContainer">
                {/* Left Side */}
                <div className="userShow">
                    <div className="userShowTop">
                        <img 
                            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmVzc2lvbmFsJTIwd29tYW58ZW58MHx8MHx8&w=1000&q=80" alt="" 
                            className="userShowImg" 

                        />
                        <div className="userShowTopTitle">
                            <span className="userShowUsername">Scarlet Johanson</span>
                            <span className="userShowUserTitle">Software Developer</span>
                        </div>
                    </div>
                    <div className="userShowBottom">
                        <span className="userShowTitle">Account Details</span>
                        <div className="userShowInfo">
                            <PermIdentity className="userShowIcon"/>
                            <span className="userShowInfoTitle">scarlet9955</span>
                        </div>
                        <div className="userShowInfo">
                            <CalendarToday className="userShowIcon"/>
                            <span className="userShowInfoTitle">08.06.2000</span>
                        </div>
                        <span className="userShowTitle">Contact Details</span>
                        <div className="userShowInfo">
                            <PhoneAndroid className="userShowIcon"/>
                            <span className="userShowInfoTitle">+91 94569 84695</span>
                        </div>
                        <div className="userShowInfo">
                            <Email className="userShowIcon"/>
                            <span className="userShowInfoTitle">scarlet@gmail.com</span>
                        </div>
                        <div className="userShowInfo">
                            <LocationSearching className="userShowIcon"/>
                            <span className="userShowInfoTitle">Madhya Pradesh, India</span>
                        </div>

                    </div>
                </div>

                {/* Right Side */}
                <div className="userUpdate">                    
                    <span className="userUpdateTitle">Edit</span>
                    <form className="userUpdateForm">
                        <div className="userUpdateLeft">
                            <div className="userUpdateItem">
                                <label>Username</label>
                                <input 
                                    type="text" 
                                    placeholder="scarlet9955" 
                                    className="userUpdateInput" 
                                />
                            </div>
                            <div className="userUpdateItem">
                                <label>Full Name</label>
                                <input 
                                    type="text" 
                                    placeholder="Scarlet Johanson" 
                                    className="userUpdateInput" 
                                />
                            </div>
                            <div className="userUpdateItem">
                                <label>Email</label>
                                <input 
                                    type="text" 
                                    placeholder="scarlet@gmail.com" 
                                    className="userUpdateInput" 
                                />
                            </div>
                            <div className="userUpdateItem">
                                <label>Phone</label>
                                <input 
                                    type="text" 
                                    placeholder="+91 94569 84695" 
                                    className="userUpdateInput" 
                                />
                            </div>
                            <div className="userUpdateItem">
                                <label>Address</label>
                                <input 
                                    type="text" 
                                    placeholder="Madhya Pradesh, India" 
                                    className="userUpdateInput" 
                                />
                            </div>
                        </div>
                        <div className="userUpdateRight">
                            <div className="userUpdateUpload">
                            <img 
                                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmVzc2lvbmFsJTIwd29tYW58ZW58MHx8MHx8&w=1000&q=80" 
                                alt="" 
                                className="userUpdateImg" 
                            />
                            {/* To Upload User Profile Img,  type="file" => upload File button, & htmlFor="file" => corresponds for id = "file"  */}
                            <label htmlFor="file">
                                <Publish className="userUpdateIcon" />
                            </label>
                            <input type="file" id="file" style={{display: "none"}}/>                  
                            </div>
                            <button className="userUpdateButton">Update</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default User;