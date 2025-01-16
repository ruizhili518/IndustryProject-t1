import React from 'react';
import Google from '../../assets/google.png';
import alarm from '../../assets/alarm.png';
import './Header.scss';

const Header = () => {
    return (
        <header className="header">
            <div className="header__logo">
                <img src={Google} alt="Google logo" className="header__logo__img"/>
                <div className="header__logo__text">Photos</div>
            </div>
            <div className="header__actions">
                <button className="header__actions__add-btn">+</button>
                <button className="header__actions__alarm-btn"><img src={alarm} alt="alarm logo"/></button>
                <div className="header__actions__profile">J</div>
            </div>
        </header>
    );
};

export default Header;