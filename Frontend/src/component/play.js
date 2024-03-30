import React, { useState, useEffect } from "react";
import "../css/play.css";
import { useNavigate } from "react-router-dom";
import { data } from "flickity";
import {
  createPostAPIMethod,
  getDiaryBySongAPIMethod,
  likeSongAPIMethod,
} from "../api/client";

const Play = ({ dataForm, setDataForm, setIsLoading }) => {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [showPopup2, setshowPopup2] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showPost, setShowPost] = useState(false);
  const [diaryContent, setDiaryContent] = useState(null);
  const [consolation, setConsolation] = useState(null);
  const [date, setDate] = useState(null);

  const [postDataForm, setPostDataForm] = useState("");

  const audioRef = React.useRef(null);
  const navigate = useNavigate();

  const musiclist = [dataForm.newSong, ...dataForm.allSongs];

  const handleCreatePost = async () => {
    setIsLoading(true);
    console.log("Creating post...");
    const content = postDataForm;
    //author is randomly selected from ["Biniam", "Eunewoo", "Younwoo", "Ulukbek"]
    const author = ["Biniam", "Eunewoo", "Younwoo", "Ulukbek"][
      Math.floor(Math.random() * 4)
    ];
    const song = musiclist[currentSongIndex]._id;
    const postResponse = await createPostAPIMethod(content, author, song);
    console.log("Created post:", postResponse);
    setIsLoading(false);
  };

  const handleChangePostDataForm = (e) => {
    const post = e.target.value;
    setPostDataForm(post);
  };

  const handleShowPost = () => {
    setShowPost(!showPost);
  };

  const handleHeart = async (e) => {
    setIsLoading(true);
    const songId = e.target.id;

    // toggle the like
    const likeResponse = await likeSongAPIMethod("yoki", songId);

    console.log("Liked song:", likeResponse);

    const newDataForm = { ...dataForm };

    // drop the song from the list
    const songIndex = newDataForm.allSongs.findIndex(
      (song) => song._id === songId
    );
    newDataForm.allSongs[songIndex].like =
      !newDataForm.allSongs[songIndex].like;

    // find a song in musiclist and change its like status
    const songIndex2 = musiclist.findIndex((song) => song._id === songId);

    if (songIndex2 !== -1) {
      musiclist[songIndex2].like = !musiclist[songIndex2].like;
    }

    setDataForm(newDataForm);
    setIsLoading(false);
  };

  useEffect(() => {
    const audio = audioRef.current;

    const handlePlay = () => {
      setIsPlaying(true);
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, []);

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isPlaying]);

  if (!dataForm) {
    return <div>No song...</div>;
  }

  const playNextSong = () => {
    console.log("Playing next song...");
    setCurrentTime(0);
    setCurrentSongIndex((prevIndex) =>
      prevIndex === musiclist.length - 1 ? 0 : prevIndex + 1
    );
    setIsPlaying(false);
  };

  const playPreviousSong = () => {
    console.log("Playing previous song...");
    setCurrentTime(0);
    setCurrentSongIndex((prevIndex) =>
      prevIndex === 0 ? musiclist.length - 1 : prevIndex - 1
    );
    setIsPlaying(false);
  };

  const prevSongIndex =
    currentSongIndex === 0 ? musiclist.length - 1 : currentSongIndex - 1;
  const nextSongIndex =
    currentSongIndex === musiclist.length - 1 ? 0 : currentSongIndex + 1;

  const togglePlay = () => {
    setIsPlaying((prevState) => !prevState);

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const togglePopup = async () => {
    const songId = musiclist[currentSongIndex]._id;
    const diary = await getDiaryBySongAPIMethod("yoki", songId);
    setDiaryContent(diary.diary);
    setConsolation(diary.consolation);
    setDate(diary.date);
    setShowPopup(!showPopup);
  };

  const togglePopup2 = () => {
    setshowPopup2(!showPopup2);
  };

  const back = async () => {
    navigate("/home");
  };
  const home = async () => {
    navigate("/home");
  };

  const trimQuotation = (str) => {
    return str.replace(/"/g, "");
  };

  return (
    <div className="play-page">
      <div className="header-play">
        <div>
          <img src="back.svg" className="menu" onClick={back} />
        </div>
        <div className="popup2" onClick={togglePopup2}>
          <div className="diary">Lyrics ▼</div>
          <span
            className={`popuptext2 ${showPopup2 ? "show" : ""}`}
            id="myPopup"
          >
            {musiclist[currentSongIndex].lyrics}
          </span>
        </div>
        <img src="home.svg" className="menu" onClick={home} />
      </div>
      <div className="song-info">
        {prevSongIndex !== currentSongIndex && (
          <img
            src={musiclist[prevSongIndex].image}
            alt={musiclist[prevSongIndex].title}
            className="prev-song-image"
          />
        )}
        <div className="current-song">
          <img
            src={musiclist[currentSongIndex].image}
            alt={musiclist[currentSongIndex].title}
            className="current-song-image"
          />
          <h2>{trimQuotation(musiclist[currentSongIndex].title)}</h2>
        </div>
        {nextSongIndex !== currentSongIndex && (
          <img
            src={musiclist[nextSongIndex].image}
            alt={musiclist[nextSongIndex].title}
            className="next-song-image"
          />
        )}
      </div>
      {musiclist[currentSongIndex].like ? (
        <img
          src="heart.png"
          className="heart"
          id={musiclist[currentSongIndex]._id}
          onClick={handleHeart}
        />
      ) : (
        <img
          src="heart2.png"
          className="heart"
          id={musiclist[currentSongIndex]._id}
          onClick={handleHeart}
        />
      )}
      <button className="shareButton" onClick={handleShowPost}>
        {showPost ? "Close" : "Share..."}
      </button>
      <input
        type="range"
        min="0"
        max={musiclist[currentSongIndex].duration}
        value={currentTime}
        onChange={() => {}}
        className="slider"
      />
      <div className="controls">
        <div className="time ic">
          <span>{formatTime(currentTime)}</span>
        </div>
        <div className="buttons">
          <button onClick={playPreviousSong} className="ic">
            <img src="/prev.svg" alt="Previous" />
          </button>
          {isPlaying ? (
            <button onClick={togglePlay} className="ic circle">
              <img src="/pause.svg" alt="Pause" />
            </button>
          ) : (
            <button onClick={togglePlay} className="ic circle">
              <img src="/play.svg" alt="Play" />
            </button>
          )}
          <button onClick={playNextSong} className="ic">
            <img src="/next.svg" alt="Next" />
          </button>
        </div>
        <div className="time ic">
          <span>{formatTime(musiclist[currentSongIndex].duration)}</span>
        </div>
      </div>
      <audio ref={audioRef} src={musiclist[currentSongIndex].url}></audio>
      {showPost ? (
        <div className="postContainer">
          <textarea
            style={{
              width: "100%",
              margin: "10px 0",
              padding: "10px",
              fontSize: "large",
              height: "100px",
            }}
            placeholder="create a post..."
            onChange={handleChangePostDataForm}
            value={postDataForm}
          ></textarea>
          <button style={{ width: "100%" }} onClick={handleCreatePost}>
            Post
          </button>
        </div>
      ) : null}
      <div className="popup" onClick={togglePopup}>
        <h2 style={{ color: "black" }}>♬ Diary</h2>
        <span class="dot material-symbols-outlined">
          {showPopup ? "expand_more" : "expand_less"}
        </span>
      </div>
      {showPopup ? (
        <div className="diaryPopup">
          <h1>Diary</h1>
          <h3>
            Written: {new Date(date).toLocaleDateString()}{" "}
            {new Date(date).toLocaleTimeString()}
          </h3>
          <p>{diaryContent}</p>
          <h1>Healing Message</h1>
          <p>{consolation}</p>
        </div>
      ) : null}
    </div>
  );
};

export default Play;
