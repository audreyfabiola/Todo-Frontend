import { Navigate } from 'react-router-dom';
import { Cookies } from 'react-cookie';

const PrivateRoutes = () => {
    // Check if user is authenticated by checking if login token is present in cookies with name "session"
    const cookies = new Cookies(null, { path: '/homepage' });
    const token = cookies.get('session');

    // Redirect to /login if token is invalid
    if (!token) {
        return <Navigate to="/" />;
    } 

    return <Outlet />;
}

export default PrivateRoutes;
