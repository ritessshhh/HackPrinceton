import React from 'react'
import homePageAnimation from '../Animation/homepage.json'
import Lottie from "lottie-react";

export default function Home({setMode}) {
    return (
        <div className="mainContainer">
            <div className="header">
                <h1>Welcome to ReLevel</h1>
            </div>
            <Lottie animationData={homePageAnimation} className='lottie-animation' loop={true}/>
            <div className="content">
                <div className="chatgpt-section homeSection" onClick={()=>{setMode(1)}}>
                    <h2 className='thearpyHeading'>Talk to Therapist</h2>
                    <p className='underText'>Engage with our top-tier language model therapist using your choice of voice for a personalized experience.</p>
                </div>
                <div className="api-section homeSection" onClick={()=>{setMode(4)}}>
                    <h2 className='diaryHeading'>Voice Diary</h2>
                    <p className='underText'>Create a voice diary that can transform your entries into songs for a unique and creative experience.</p>
                </div>
            </div>
        </div>
    );
}