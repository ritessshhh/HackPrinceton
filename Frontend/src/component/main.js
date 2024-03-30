import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./login";
import Home from "./home";
import Play from "./play";
import List from "./list";
import Public from "./public";
import MyCalendar from "./calendar";
import SignUp from "./signup";

export default function Main() {
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("yoki");
  const [homeDataForm, setHomeDataForm] = useState(null);
  const [playDataForm, setPlayDataForm] = useState(null);
  const [listDataForm, setListDataForm] = useState(null);
  const [publicDataForm, setPublicDataForm] = useState(null);
  const [calendarDataForm, setCalendarDataForm] = useState(null);

  const musiclist = [
    // {
    //   title: "Song 1",
    //   image: "song1.jpeg",
    //   audio: "song1.mp3",
    //   duration: 240,
    //   lyrics: "Lyrics for Song 1...",
    // },
    {
      title: "Song 2",
      image: "song2.jpg",
      audio: "song2.mp3",
      duration: 180,
      lyrics:
        "For you, I could pretend like I was happy when I was sad For you, I could pretend like I was strong when I was hurt I wish love was perfect as love itself I wish all my weaknesses could be hidden I grew a flower that can’t be bloomed in a dream that can’t come true",
    },
    {
      title: "Song 3",
      image: "song3.jpeg",
      audio: "song3.mp3",
      duration: 300,
      lyrics: "Lyrics for Song 3...",
    },
    {
      title: "Song 4",
      image: "song4.jpg",
      audio: "song4.mp3",
      duration: 210,
      lyrics: "Lyrics for Song 4...",
    },
    {
      title: "Song 5",
      image: "song5.webp",
      audio: "song5.mp3",
      duration: 270,
      lyrics: "Lyrics for Song 5...",
    },
    {
      title: "Song 6",
      image: "song6.jpeg",
      audio: "song6.mp3",
      duration: 320,
      lyrics: "Lyrics for Song 6...",
    },
  ];

  return (
    <Router>
      <div className="main">
        {isLoading ? (
          <div className="loadingScreen">
            <div class="lds-ellipsis">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <h1 style={{ color: "white" }}>Please Wait...</h1>
          </div>
        ) : null}
        <Routes>
          <Route
            path="/"
            element={
              <SignUp
                username={username}
                setUsername={setUsername}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
              />
            }
          />
          <Route
            path="/login"
            element={
              <Login
                username={username}
                setUsername={setUsername}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
              />
            }
          />
          <Route
            path="/public"
            element={
              <Public
                dataForm={publicDataForm}
                listDataForm={listDataForm}
                setListDataForm={setListDataForm}
                setPlayDataForm={setPlayDataForm}
              />
            }
          />
          <Route
            path="/calendar"
            element={
              <MyCalendar
                musiclist={musiclist}
                calendarDataForm={calendarDataForm}
                setPublicDataForm={setPublicDataForm}
                setIsLoading={setIsLoading}
                setPlayDataForm={setPlayDataForm}
              />
            }
          />
          <Route
            path="/home"
            element={
              <Home
                dataForm={homeDataForm}
                setDataForm={setHomeDataForm}
                setPlayDataForm={setPlayDataForm}
                setListDataForm={setListDataForm}
                username={username}
                setUsername={setUsername}
                setIsLoading={setIsLoading}
                setCalendarDataForm={setCalendarDataForm}
              />
            }
          />
          <Route
            path="/play"
            element={
              <Play
                dataForm={playDataForm}
                setDataForm={setPlayDataForm}
                setIsLoading={setIsLoading}
              />
            }
          />
          <Route
            path="/list"
            element={
              <List
                dataForm={listDataForm}
                setPlayDataForm={setPlayDataForm}
                setIsLoading={setIsLoading}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}
