import React, {useEffect} from 'react';
import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';

import axiosInstance from '../../axios';

export default function Logout(){

    const logout = (e) => {
        const res = axiosInstance.post('account/logout/',{
            refresh_token: localStorage.getItem('refresh_token'),
            
        });
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        axiosInstance.defaults.headers['Authorization'] = null;
        
        window.location.href = '/account/sign-in/';
        
    };

    return (
        <IconButton
            size="large"
            aria-label="account of current user"
            color="inherit"
            onClick={logout}
            >
            <LogoutIcon />
        </IconButton>
    )       
}