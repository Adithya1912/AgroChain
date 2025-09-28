const Profile = ({ user, onLogout }) => {
    return (
        <div className="glass-card">
            <h2 className="component-title">👤 My Profile</h2>
            <div className="profile-details">
                <p>Name: <span>{user.name}</span></p>
                <p>Role: <span>{user.role}</span></p>
                <p>ID: <span>{user.public_id}</span></p>
            </div>
            <button onClick={onLogout} className="button-danger">
                Logout
            </button>
        </div>
    );
};

export default Profile;