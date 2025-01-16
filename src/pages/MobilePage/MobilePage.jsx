import React from 'react';
import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import ScreenShot from  "../../assets/screenshot.jpg";
import './MobilePage.scss'

const MobilePage = () => {
    return (
        <div className="mobilepage">
            <Header/>
            <img src={ScreenShot} alt="Screenshot"/>
            <Footer/>
        </div>
    );
};

export default MobilePage;