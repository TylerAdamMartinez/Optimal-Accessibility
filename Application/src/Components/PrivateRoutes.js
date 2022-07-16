import { Outlet, Navigate } from 'react-router-dom';

function PrivateRoutes(props) {
    let auth = false;
    if (localStorage.getItem('jwt') != null && localStorage.getItem('userId') != null) {
        auth = true;
    }
    return (
        auth ? <Outlet/> : <Navigate to="/" />
    );
}

export default PrivateRoutes;