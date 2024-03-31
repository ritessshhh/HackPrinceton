import React, { useState } from 'react';

export default function CustomMusic({ setMode, playList, setPlaylist }) {
    const [diaryText, setDiaryText] = useState('');
    const [consolingMessage, setConsolingMessage] = useState('');
    const [audioUrl, setAudioUrl] = useState('');

    function healDiary() {
        fetch('http://127.0.0.1:5000/heal', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ diary_text: diaryText })
        })
            .then(response => response.json())
            .then(data => {
                setConsolingMessage(data.message);
                setAudioUrl(data.audio_url);
            })
            .catch(error => {
                console.error('Error generating audio:', error);
                alert('Error generating audio. Please try again later.');
            });
    }

    return (
        <div className='heal'>
            <div className="container">
                <h1>Diary to Music Therapy</h1>
                <textarea
                    id="diaryText"
                    placeholder="Write your diary entry here..."
                    value={diaryText}
                    onChange={(e) => setDiaryText(e.target.value)}
                />
                <button onClick={healDiary}>Heal</button>
                <div>
                    <h2>Consoling Message:</h2>
                    <p id="consolingMessage">{consolingMessage}</p>
                </div>
                <div id="audioContainer">
                    {audioUrl && <audio src={audioUrl} controls />}
                </div>
            </div>
        </div>
    );
}
