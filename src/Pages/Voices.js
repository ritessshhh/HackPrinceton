import React from 'react'
import voices from '../Animation/voices.json'
import Lottie from "lottie-react";

export default function Voices({setMode}) {
    return (
        <div className="mainContainer">
            <div className="header">
                <h1>Voice Diary</h1>
            </div>
            <Lottie animationData={voices} className='lottie-animation' loop={true}/>
            <div className="content">
                <div className="api-section homeSection" onClick={()=>{setMode(5)}}>
                    <h2 className='thearpyHeading'>Create a playlist</h2>
                    <p className='underText'>Create a personalized playlist based on the contents of your diary note.</p>
                </div>
                <div className="chatgpt-section homeSection" onClick={()=>{setMode(6)}}>
                    <h2 className='diaryHeading'>Create a song</h2>
                    <p className='underText'>Create a personalized song based on the contents of your diary note.</p>
                </div>
            </div>
        </div>
    );
}