import React from 'react';
import './Header.css';
import FS_Logo from '../../assets/images/farmstack_logo.png';

function Header() {
    return (
        <>
            <div className="header-container">
                <div className="header-left">
                    <img src={FS_Logo} alt="logo" className="header-logo" />
                </div>
                <div className="header-right">
                    
                </div>
            </div>
        </>
    )
}

export default Header;