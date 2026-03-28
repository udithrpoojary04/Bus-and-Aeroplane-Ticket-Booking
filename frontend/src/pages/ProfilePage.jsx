import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const ProfilePage = () => {
    const { user } = useContext(AuthContext);

    return (
        <div className="card profile-container">
            <h1>Profile</h1>
            <div className="profile-detail">
                <span>Name:</span>
                <span>{user.name}</span>
            </div>
            <div className="profile-detail">
                <span>Email:</span>
                <span>{user.email}</span>
            </div>
        </div>
    );
};

export default ProfilePage;
