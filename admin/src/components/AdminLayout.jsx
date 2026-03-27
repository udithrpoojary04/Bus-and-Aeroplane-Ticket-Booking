import Sidebar from './Sidebar';

const AdminLayout = ({ children }) => {
    return (
        <div className="admin-layout">
            <Sidebar />
            <main className="main-content">
                <header className="topbar">
                    <div className="breadcrumbs">
                        <span>Admin</span> / <span>Current Page</span>
                    </div>
                    <div className="user-profile">
                        <span>Administrator</span>
                    </div>
                </header>
                <div className="content-area">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
