import React, { useEffect, useState } from "react";
import LoadingScreen from "../Animation/loadingscreen.json";
import Lottie from "lottie-react";

export default function Loading({ setMode }) {
    const [opacity, setOpacity] = useState(1);

    const startRecording = () => {
        fetch('http://127.0.0.1:5000/start_recording')
            .then(response => response.text())
            .then(message => console.log(message))
            .catch(error => console.error('Error starting recording:', error));
    };

    useEffect(() => {
        const fadeOutTimer = setTimeout(() => {
            setOpacity(0); // Start fading out after 3 seconds
        }, 5500);

        const changeModeTimer = setTimeout(() => {
            setMode(3); // Change the mode after the fade-out is complete (4 seconds total)
        }, 6500);

        const startRec = setTimeout(() => {
            startRecording(); // Change the mode after the fade-out is complete (4 seconds total)
        }, 2000);

        return () => {
            clearTimeout(fadeOutTimer);
            clearTimeout(changeModeTimer);
            clearTimeout(startRec)
        };
    }, [setMode]);

    return (
        <div className="loadingScreen" style={{ opacity, transition: 'opacity 1s ease-in-out' }}>
            <Lottie animationData={LoadingScreen} className="lottie-loading-animation" loop={true} />
        </div>
    );
}