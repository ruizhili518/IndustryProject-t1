import React, { useState, useEffect } from 'react';
import './ModalContent.scss';
import googlePhotosLogo from '../../assets/google-photos-logo.png';
import greenPerson from '../../assets/green-person.svg';
import greenPersonM from '../../assets/green-person-m.svg';
import bluePerson from '../../assets/blue-person.svg';
import bluePersonM from '../../assets/blue-person-m.svg';
import pair from '../../assets/pair.png';
import group from '../../assets/group.png';
import finish from '../../assets/finish.png';
import eye from '../../assets/eye.png';


const WelcomeModal = ({ onComplete }) => {
    const [currentState, setCurrentState] = useState('welcome');
    const [cards, setCards] = useState([]);
    const [flippedCards, setFlippedCards] = useState([]);
    const [matchedPairs, setMatchedPairs] = useState([]);
    const [isChecking, setIsChecking] = useState(false);
    const [resultStep, setResultStep] = useState(0);


    // Initialize cards
    useEffect(() => {
        const cardTypes = [
            { id: 1, type: 'person1' ,image: bluePerson },
            { id: 2, type: 'person1' ,image: bluePersonM },
            { id: 3, type: 'person2' ,image: greenPerson },
            { id: 4, type: 'person2' ,image: greenPersonM }
        ];

        const shuffledCards = cardTypes.sort(() => Math.random() - 0.5);
        setCards(shuffledCards);
    }, []);

    const handleContinue = () => {
        setCurrentState('game');
    };

    const handleCardClick = (cardIndex) => {
        if (
            isChecking ||
            flippedCards.includes(cardIndex) ||
            matchedPairs.includes(cardIndex)
        ) {
            return;
        }

        const newFlippedCards = [...flippedCards, cardIndex];
        setFlippedCards(newFlippedCards);

        if (newFlippedCards.length === 2) {
            setIsChecking(true);

            const [firstCard, secondCard] = newFlippedCards;
            if (cards[firstCard].type === cards[secondCard].type) {
                // Match found
                setMatchedPairs([...matchedPairs, firstCard, secondCard]);
                setFlippedCards([]);
                setIsChecking(false);

                if (matchedPairs.length + 2 === cards.length) {
                    handleMatchComplete();
                }
            } else {
                // No match
                setTimeout(() => {
                    setFlippedCards([]);
                    setIsChecking(false);
                }, 1500);
            }
        }
    };

    const handleMatchComplete = () => {
        setTimeout(() => {
            setCurrentState('result');
            setResultStep(0);
        }, 1500);
    };

    useEffect(() => {
        let timer;
        if (currentState === 'result' && resultStep < 3) {
            timer = setTimeout(() => {
                setResultStep(prev => prev + 1);
            }, 2000);
        }
        return () => clearTimeout(timer);
    }, [currentState, resultStep]);

    // When all pairs are matched
    useEffect(() => {
        if (matchedPairs.length === cards.length && cards.length > 0) {
            setCurrentState('result');
        }
    }, [matchedPairs, cards]);

    const handleNextStep = () => {
        if (resultStep === 3) {
            setCurrentState('final');
        }
    };


    const renderResult = () => {
        switch (resultStep) {
            case 0:
                return (
                    <div className="welcome-modal__result">
                        <div className="welcome-modal__matched-pair">
                            <img src={pair} alt="Pair faces" />
                        </div>
                        <h2>Great Work!</h2>
                    </div>
                );
            case 1:
                return (
                    <div className="welcome-modal__result">
                        <div className="welcome-modal__dotted-container">
                            <img src={group} alt="Matched one" />
                        </div>
                        <h2>Google Photos</h2>
                    </div>
                );
            case 2:
                return (
                    <div className="welcome-modal__result">
                        <div className="welcome-modal__dotted-container">
                            <div className="welcome-modal__matched-pairs">
                                <img src={finish} alt="Match finish" />
                            </div>
                        </div>
                        <h2>Google Photos</h2>
                        <h3>organises your photos by faces</h3>
                    </div>
                );
            case 3:
                return (
                    <div className="welcome-modal__result">
                        <div className="welcome-modal__dotted-container">
                            <div className="welcome-modal__matched-pairs">
                                <img src={finish} alt="Match finish" />
                            </div>
                        </div>
                        <h2>Google Photos</h2>
                        <h3>organises your photos by faces</h3>
                        <p className="welcome-modal__description">
                            Your photos are automatically grouped based on similar faces.
                            This helps you find photos of your loved ones faster and
                            give you access to certain features.
                        </p>
                        <button
                            className="welcome-modal__button"
                            onClick={handleNextStep}
                        >
                            Continue
                        </button>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="welcome-modal">
            <div className="welcome-modal__content">
                {currentState === 'welcome' && (
                    <div className="welcome-modal__welcome">
                        <img
                            src={googlePhotosLogo}
                            alt="Google Photos"
                            className="welcome-modal__logo"
                        />
                        <h1>Google Photos</h1>
                        <h2>One home for all your photos - organized and easy to find</h2>
                        <button
                            className="welcome-modal__button"
                            onClick={handleContinue}
                        >
                            Continue
                        </button>
                    </div>
                )}

                {currentState === 'game' && (
                    <div className="welcome-modal__game">
                        <h2>Match Cards to Continue</h2>
                        <div className="welcome-modal__cards">
                            {cards.map((card, index) => (
                                <div
                                    key={index}
                                    className={`welcome-modal__card ${
                                        flippedCards.includes(index) || matchedPairs.includes(index)
                                            ? 'welcome-modal__card--flipped'
                                            : ''
                                    } ${
                                        matchedPairs.includes(index)
                                            ? 'welcome-modal__card--matched'
                                            : ''
                                    }`}
                                    onClick={() => handleCardClick(index)}
                                >
                                    <div className="welcome-modal__card-inner">
                                        <div className="welcome-modal__card-front">
                                            <img src={googlePhotosLogo} alt="Google Photos" />
                                        </div>
                                        <div className="welcome-modal__card-back">
                                            <img src={card.image} alt={card.type} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {currentState === 'result' && (
                    <div className="welcome-modal__result-container" onClick={handleNextStep}>
                        {renderResult()}
                    </div>
                )}

                {currentState === 'final' && (
                    <div className="welcome-modal__final">
                        <img src={eye} alt="Eye" />
                        <h2>Face Grouping -</h2>
                        <h3>a setting you control anytime</h3>
                        <p>
                            Face groups ad labels are only visible to you and you can
                            turn this setting on or off at any time.&nbsp;
                            <a href="#">Learn more</a>
                        </p>
                        <p>
                            By continuing, you agree to using information about
                            faces in your photos for these features.
                        </p>
                        <div className="welcome-modal__final__actions">
                            <button
                                className="welcome-modal__button"
                                onClick={() => onComplete(false)}
                            >
                                Don't allow
                            </button>
                            <button
                                className="welcome-modal__button"
                                onClick={() => onComplete(true)}
                            >
                                Allow
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WelcomeModal;