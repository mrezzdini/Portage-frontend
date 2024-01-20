import './Cv.css';

import React, { useState } from 'react';

import Button from '../../../components/lib/form/Button';
import Certification from './Certification';
import Education from './Education';
import Experience from './Experience';
import Skills from './Skills';

const Cv = () => {
    const [activeButton, setActiveButton] = useState(0);

    const handleClick = (buttonIndex) => {
        setActiveButton(buttonIndex);
    };

    const renderComponent = () => {
        switch (activeButton) {
            case 0:
                return <Education />;
            case 1:
                return <Experience />;
            case 2:
                return <Skills />;
            case 3:
                return <Certification />;
            default:
                return null;
        }
    };

    return (
        <div className="flex min-h-screen flex-col">
            <div className="button-container">
                <Button
                    className={`cv-button ${activeButton === 0 ? 'active' : ''}`}
                    onClick={() => handleClick(0)}
                >
                    Formations
                </Button>
                <Button
                    className={`cv-button ${activeButton === 1 ? 'active' : ''}`}
                    onClick={() => handleClick(1)}
                >
                    Experience
                </Button>
                <Button
                    className={`cv-button ${activeButton === 2 ? 'active' : ''}`}
                    onClick={() => handleClick(2)}
                >
                    Compétences
                </Button>
                <Button
                    className={`cv-button ${activeButton === 3 ? 'active' : ''}`}
                    onClick={() => handleClick(3)}
                >
                    Certificats
                </Button>
            </div>
            <div className="header-container ml-4 mt-8 flex">
                <div className="cv-title">
                    <p>Génération du CV</p>
                </div>
            </div>
            <div className="component-container mt-24 flex">{renderComponent()}</div>
        </div>
    );
};

export default Cv;
