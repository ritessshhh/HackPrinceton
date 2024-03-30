import React, { useRef } from "react";
import "../css/list.css";
import { useNavigate } from "react-router-dom";
import { getAllSongAPIMethod } from "../api/client";

export default function List({ dataForm, setPlayDataForm, setIsLoading }) {
  const recentListRef = useRef(null);
  const likesListRef = useRef(null);
  const navigate = useNavigate();

  if (!dataForm) {
    return <div>No song...</div>;
  }

  let musiclist = dataForm.songs;

  console.log("Music List:", musiclist);

  const likeMusicList = musiclist.filter((song) => song.like);

  const handleSongClick = async (e) => {
    setIsLoading(true);
    const songId = e.target.id;

    // find a song in musiclist whose _id matches songId
    const song = musiclist.find((song) => song._id === songId);
    console.log("This Song ID:", songId);

    const musicArr = await getAllSongAPIMethod("yoki");

    const newPlayDataForm = {};
    newPlayDataForm.newSong = song;
    newPlayDataForm.allSongs = musicArr;
    setPlayDataForm(newPlayDataForm);
    setIsLoading(false);
    navigate("/play");
  };

  const scrollLeftRecent = () => {
    if (recentListRef.current) {
      recentListRef.current.scrollBy({
        left: -150,
        behavior: "smooth",
      });
    }
  };

  const scrollRightRecent = () => {
    if (recentListRef.current) {
      recentListRef.current.scrollBy({
        left: 150,
        behavior: "smooth",
      });
    }
  };

  const scrollLeftLikes = () => {
    if (likesListRef.current) {
      likesListRef.current.scrollBy({
        left: -150,
        behavior: "smooth",
      });
    }
  };

  const scrollRightLikes = () => {
    if (likesListRef.current) {
      likesListRef.current.scrollBy({
        left: 150,
        behavior: "smooth",
      });
    }
  };

  const navigateHome = () => {
    navigate("/home");
  };

  const trimQuotation = (str) => {
    return str.replace(/"/g, "");
  };

  return (
    <div className="list">
      <div className="header">
        <div>
          <img src="person.png" className="person" />
        </div>
        <img src="home.svg" className="menu" onClick={navigateHome} />
      </div>
      <div className="body">
        <h2 className="title"> Heal Your Heart with Music</h2>
        <img src="hand.png" className="hand" />
      </div>
      <div className="recent">
        <div className="like-title">
          <h2 className="rs">Recent Songs</h2>
        </div>
        <div className="list-container">
          <div className="arrow arrow-left" onClick={scrollLeftRecent}>
            <img src="prev.svg" className="arrow" alt="Previous" />
          </div>
          <div className="list2" ref={recentListRef}>
            {musiclist.map((song, index) => (
              <div className="list1songs" key={index}>
                <img
                  className="img-sqr"
                  src={song.image}
                  alt={song.title}
                  id={song._id}
                  onClick={handleSongClick}
                />
                <h3 className="songTitle">{trimQuotation(song.title)}</h3>
                <span className="songMood">{song.mood}</span>
              </div>
            ))}
          </div>
          <div className="arrow arrow-right" onClick={scrollRightRecent}>
            <img src="next.svg" className="arrow" alt="Next" />
          </div>
        </div>
      </div>
      <div className="likes">
        <div className="like-title">
          <h2 className="rs">Likes</h2>
        </div>
        <div className="list-container">
          <div className="arrow arrow-left" onClick={scrollLeftLikes}>
            <img src="prev.svg" className="arrow" alt="Previous" />
          </div>
          <div className="list2" ref={likesListRef}>
            {likeMusicList.map((song, index) => (
              <div className="list1songs" key={index}>
                <img
                  className="img-sqr"
                  src={song.image}
                  alt={song.title}
                  id={song._id}
                  onClick={handleSongClick}
                />
                <h3 className="songTitle">{trimQuotation(song.title)}</h3>
                <span className="songMood">{song.mood}</span>
              </div>
            ))}
          </div>
          <div className="arrow arrow-right" onClick={scrollRightLikes}>
            <img src="next.svg" className="arrow" alt="Next" />
          </div>
        </div>
      </div>
    </div>
  );
}
