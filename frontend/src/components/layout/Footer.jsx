import React from 'react';

import './footer.css';


export default function Footer(){

    return(
        <footer className="main-footer">
            <div className="footer">&copy; {new Date().getFullYear()} All Rights Reserved - Donation </div>
        </footer>
    )
}