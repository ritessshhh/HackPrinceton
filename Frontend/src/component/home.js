import React, { useRef, useState } from "react";
import "../css/home.css";
import { useNavigate } from "react-router-dom";
import {
  createDiaryAPIMethod,
  getAllDiaryAPIMethod,
  getAllSongAPIMethod,
  getMultipleSongsAPIMethod,
  getSongAPIMethod,
} from "../api/client";

const Home = ({
  dataForm,
  setDataForm,
  setPlayDataForm,
  setListDataForm,
  username,
  setUsername,
  setIsLoading,
  setCalendarDataForm,
}) => {
  const listRef = useRef(null);

  const [inputValue, setInputValue] = useState("");

  const navigate = useNavigate();

  const handleSongClick = async (e) => {
    setIsLoading(true);
    const songId = e.target.id;
    const newPlayDataForm = {};
    console.log("This Song ID:", songId);
    newPlayDataForm.newSong = await getSongAPIMethod(username, songId);
    newPlayDataForm.allSongs = await getAllSongAPIMethod(username);
    console.log("Got newSong:", newPlayDataForm.newSong);
    console.log("Got allSongs:", newPlayDataForm.allSongs);
    setPlayDataForm(newPlayDataForm);
    setIsLoading(false);
    navigate("/play");
  };

  const navigateList = async () => {
    setIsLoading(true);
    console.log("Getting all songs...");
    const songs = await getAllSongAPIMethod(username);

    // reverse the order of songs
    songs.reverse();

    console.log("Got all songs:", songs);
    const newListDataForm = {};
    newListDataForm.songs = songs;
    setListDataForm(newListDataForm);
    setIsLoading(false);
    navigate("/list");
  };
  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const navigateCalendar = async () => {
    setIsLoading(true);
    console.log("Getting all diaries...");
    const diaries = await getAllDiaryAPIMethod();
    console.log("Got all diaries:", diaries);
    setCalendarDataForm(diaries);
    setIsLoading(false);
    navigate("/calendar");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Submitted value:", inputValue);
    setIsLoading(true);
    console.log("Creating diary...");
    const createDiaryResponse = await createDiaryAPIMethod("yoki", inputValue);
    console.log("Diary created!", createDiaryResponse);
    const songIds = Array.from(createDiaryResponse.songs);
    console.log("Song IDs:", songIds);
    const songs = await getMultipleSongsAPIMethod("yoki", songIds);
    console.log("Songs:", songs);
    let newDataForm = {};
    newDataForm.diary = createDiaryResponse;
    newDataForm.songs = songs;
    setDataForm(newDataForm);
    setIsLoading(false);
    setInputValue("");
  };

  const dateMMDDYYYY = (date) => {
    const d = new Date(date);
    return d.getMonth() + 1 + "/" + d.getDate() + "/" + d.getFullYear();
  };

  return (
    <div className="home">
      <div className="header">
        <div>
          <img
            src="calendar.svg"
            className="person"
            alt="Profile"
            onClick={navigateCalendar}
          />
        </div>
        <img src="menu.svg" className="menu" onClick={navigateList} />
      </div>
      <div className="dear">
        <h2 className="dear-h">Music Diary {dateMMDDYYYY(new Date())}</h2>
      </div>
      <div className="text">
        <form onSubmit={handleSubmit}>
          <textarea
            value={inputValue}
            onChange={handleChange}
            placeholder="How do you feel today?"
            className="input-box"
          />
          <div className="heal-box">
            <button className="heal" type="submit">
              Heal ♪♫♬
            </button>
          </div>
        </form>
      </div>
      <div className="dear">
        <h2 className="dear-h">Dear Anthony</h2>
      </div>
      <div className="result">
        <p>{dataForm ? dataForm.diary.consolation : "No worries"}</p>
        <div>
          <img src="person.png" className="person" />
        </div>
      </div>
      <h2> Music for you only</h2>
      <div className="list-container">
        <div className="list1" ref={listRef}>
          {dataForm
            ? dataForm.songs.map((song, index) => (
                <div className="list1songs" key={index}>
                  <img
                    className="img-sqr"
                    src={song.image}
                    alt={song.title}
                    id={song._id}
                    onClick={handleSongClick}
                  />
                  <h3 className="songTitle">{song.title}</h3>
                  <span className="songMood">{song.mood}</span>
                </div>
              ))
            : null}
        </div>
      </div>
    </div>
  );
};

export default Home;
