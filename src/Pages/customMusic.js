import React from 'react'
import DiaryArea from "./DiaryArea";

export default function CustomMusic({setMode, playList, setPlaylist}) {
    return (
        <div className="mainContainer">
            <div className="header">
                <h2>Enter or upload your diary to create a song on that!</h2>
            </div>
            <div className="content">
                <div className="diaryArea">
                    <DiaryArea setMode={setMode} playList={playList} setPlaylist={setPlaylist}/>
                </div>
            </div>
        </div>
    );
}