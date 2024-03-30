import React from "react";
import Bot from '../Animation/bot.json'
import Lottie from "lottie-react";
import { Button } from 'primereact/button';
export default function SpeechToText({setMode}) {
    const startRecording = () => {
        fetch('/start_recording')
            .then(response => response.text())
            .then(message => console.log(message))
            .catch(error => console.error('Error starting recording:', error));
    };

    const stopRecording = () => {
        fetch('/stop_recording')
            .then(response => response.text())
            .then(message => console.log(message))
            .catch(error => console.error('Error stopping recording:', error));
    };

    return (
        <div className='bot-animation'>
            <Lottie animationData={Bot} className='lottie-bot-animation'/>
            <button onClick={setMode}>Stop Recording</button>
        </div>
    );
}