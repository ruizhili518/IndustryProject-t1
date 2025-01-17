import React from 'react';
import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import ScreenShot from  "../../assets/screenshot.jpg";
import './MobilePage.scss'

const MobilePage = () => {
    return (
        <div className="mobile-page">
            <Header />
        <div className="mobile-page__container">
            <img src={ScreenShot} alt="Screenshot" className="mobile-page__screenshot"/>
            <Footer />
        </div>
    </div>
    );
};

export default MobilePage;