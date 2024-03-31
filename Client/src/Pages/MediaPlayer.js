import React from 'react';

const MediaPlayer = () => {
    let audioUrl = [
        'https://audiopipe.suno.ai/?item_id=37e0ff1c-43d3-47e5-ba8e-14069b7ed51',
        'https://audiopipe.suno.ai/?item_id=527c27e6-5169-4f71-8349-6c899f084ba',
        'https://audiopipe.suno.ai/?item_id=4e4950e9-96f9-41cf-bc48-8f78bee139d',
        'https://audiopipe.suno.ai/?item_id=9abcdf55-4420-4b88-931c-13d30d576b7',
        'https://audiopipe.suno.ai/?item_id=edeb3c6e-da52-489c-aece-42d5a1bc514'
    ]
    return (
        <div>
            <audio controls src={audioUrl[Math.floor(Math.random() * 4)]}>
                Your browser does not support the audio element.
            </audio>
        </div>
    );
};

export default MediaPlayer;
