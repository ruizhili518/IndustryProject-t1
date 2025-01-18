import React ,{ useState, useEffect } from 'react';
import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import ScreenShot from  "../../assets/screenshot.jpg";
import ScreenShotD from "../../assets/screenshot_d.png";
import './MobilePage.scss'

const MobilePage = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const getImageSource = () => {
        return windowWidth < 1280 ? ScreenShot : ScreenShotD;
    };

    return (
        <div className="mobile-page">
            <Header />
        <div className="mobile-page__container">
            <img src={getImageSource()} alt="Screenshot" className="mobile-page__screenshot"/>
            <Footer />
        </div>
    </div>
    );
};

export default MobilePage;