import TokenHelper from '../services/TokenHelper';
import { Navigate, useLocation } from 'react-router-dom';
import React from 'react';
// import MaintenanceService from '../services/MaintenanceService';

// user auth
export const RequireAuth = ({ children }) => {
    const token = TokenHelper.getToken();
    const location = useLocation();

    console.log("hjgj", location.pathname)

    if (!token) {
        return <Navigate to="/"
            state={
                { path: location.pathname }
            }
        />
    }   

    return children;
}



export const AdminAuth = ({ children }) => {
    const token = TokenHelper.getToken();
    const location = useLocation();

    // console.log("", location.pathname)

    if (!token) {
        return <Navigate to="/admin/login"
            state={
                { path: location.pathname }
            }
        />
    }   

    return children;
}

// export const DelevaryBoyAuth = ({ children }) => {
//     const token = TokenHelper.getToken();
//     const location = useLocation();

//     // console.log("", location.pathname)

//     if (!token) {
//         return <Navigate to="/auth/login"
//             state={
//                 { path: location.pathname }
//             }
//         />
//     }   

//     return children;
// }

export const RequireAuthLogout = ({ children }) => {
    const token = TokenHelper.getToken();
    const location = useLocation();

    if ( location.pathname=='/' && token) {
        return <Navigate to="/*"
            state={
                { path: location.pathname }
            }
        />
    }
    return children;
}


export const CheckENV = ({ children }) => {
    const token = TokenHelper.getToken();
    const user = process.env.REACT_APP_PUBLIC_UNAUTHORIZED_USER;

    if (user == "true" && token != '') {
        return <Navigate to="/" />
    }
    return children;
}



