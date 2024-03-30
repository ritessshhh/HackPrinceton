import React, { useEffect, useState } from "react";
import LoadingScreen from "../Animation/loadingscreen.json";
import Lottie from "lottie-react";

export default function Loading({ setMode }) {
    const [opacity, setOpacity] = useState(1);

    useEffect(() => {
        const fadeOutTimer = setTimeout(() => {
            setOpacity(0); // Start fading out after 3 seconds
        }, 3000);

        const changeModeTimer = setTimeout(() => {
            setMode(3); // Change the mode after the fade-out is complete (4 seconds total)
        }, 4000);

        return () => {
            clearTimeout(fadeOutTimer);
            clearTimeout(changeModeTimer);
        };
    }, [setMode]);

    return (
        <div className="loadingScreen" style={{ opacity, transition: 'opacity 1s ease-in-out' }}>
            <Lottie animationData={LoadingScreen} className="lottie-loading-animation" loop={true} />
        </div>
    );
}