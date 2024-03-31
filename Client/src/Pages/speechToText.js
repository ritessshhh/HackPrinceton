import React, { useEffect } from "react";
import Bot from '../Animation/bot.json';
import Lottie from "lottie-react";
import { Button } from 'primereact/button';

export default function SpeechToText({setMode}) {

    const stopRecording = () => {
        fetch('http://127.0.0.1:5000/stop_recording')
            .then(response => response.text())
            .then(message => console.log(message))
            .catch(error => console.error('Error stopping recording:', error));
    };


    return (
        <div className='bot-animation'>
            <Lottie animationData={Bot} className='lottie-bot-animation'/>
            <Button icon="pi pi-times" severity="danger" aria-label="Cancel" onClick={()=>{stopRecording(); setMode(0);}}/>
        </div>
    );
}
