import React from 'react'
import DiaryArea2 from "./DiaryArea2";

export default function CustomMusic({setMode, playList, setPlaylist}) {
    return (
        <div className="mainContainer">
            <div className="header">
                <h2>Enter or upload your diary to create a song on that!</h2>
            </div>
            <div className="content">
                <div className="diaryArea">
                    <DiaryArea2 setMode={setMode} playList={playList} setPlaylist={setPlaylist}/>
                </div>
            </div>
        </div>
    );
}