import React from 'react'
import homePageAnimation from '../Animation/homepage.json'
import Lottie from "lottie-react";
import DiaryArea from "./DiaryArea";

export default function creatingPlaylist({setMode, playList, setPlaylist}) {
    return (
        <div className="mainContainer">
            <div className="header">
                <h2>Enter or upload your diary.</h2>
            </div>
            <div className="content">
                <div className="diaryArea">
                    <DiaryArea setMode={setMode} playList={playList} setPlaylist={setPlaylist}/>
                </div>
            </div>
        </div>
    );
}