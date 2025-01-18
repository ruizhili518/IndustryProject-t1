import React, {useState} from 'react';
import './App.scss';
import MobilePage from "./pages/MobilePage/MobilePage.jsx";
import ModalContent from "./components/ModalContent/ModalContent.jsx";

const App = () => {
    const [showWelcomeModal, setShowWelcomeModal] = useState(true);
  return (
    <div>
        {showWelcomeModal && (
            <ModalContent onComplete={() => setShowWelcomeModal(false)} />
        )}
      <MobilePage/>
    </div>
  )
}

export default App
