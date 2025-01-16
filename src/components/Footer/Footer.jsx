import React from 'react';
import './Footer.scss';
import Photos from '../../assets/photos.png';
import Collections from '../../assets/collections.png';
import Search from  '../../assets/search.png';

const Footer = () => {
    return (
        <div className="footer">
            <button className="footer__btn">
                <div className="footer__btn__img">
                    <img src={Photos} alt="Photos"/>
                </div>
                <div className="footer__btn__text">Photos</div>
            </button>
            <button className="footer__btn">
                <div className="footer__btn__img">
                    <img src={Collections} alt="Collections"/>
                </div>
                <div className="footer__btn__text">Collections</div>
            </button>
            <button className="footer__btn">
                <div className="footer__btn__img">
                    <img src={Search} alt="Search"/>
                </div>
                <div className="footer__btn__text">Search</div>
            </button>
        </div>
    );
};

export default Footer;