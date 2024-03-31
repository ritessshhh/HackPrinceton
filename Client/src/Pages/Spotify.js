import React from 'react'

export default function Spotify({setMode, playList, setPlaylist}) {
    return (
        <div className="mainContainer">
            <div className="header">
                <h2>Enjoy your custom playlist:</h2>
            </div>
            <div className="content">
                <iframe src="https://open.spotify.com/embed/playlist/5t4LmYyOn08s8ZTsf9H5py?utm_source=generator" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" className='innerSpotify'></iframe>
            </div>
        </div>
    );
}