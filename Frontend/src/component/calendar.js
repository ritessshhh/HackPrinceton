import React, { useState } from "react";
import Calendar from "react-calendar";
import "../css/calendar.css";
import { useNavigate } from "react-router-dom";
import {
  getAllPostAPIMethod,
  getAllSongAPIMethod,
  getSongAPIMethod,
} from "../api/client";

const MyCalendar = ({
  calendarDataForm,
  setPublicDataForm,
  setIsLoading,
  setPlayDataForm,
}) => {
  const [date, setDate] = useState(new Date());
  const [dataForm, setDataForm] = useState(null);
  const [musiclist, setMusiclist] = useState(null);

  const navigate = useNavigate();

  if (!calendarDataForm) {
    return;
  }

  const handleSongClick = async (e) => {
    const songId = e.target.id;
    console.log("This Song ID:", songId);

    setIsLoading(true);
    const newSong = await getSongAPIMethod("yoki", songId);
    const allSong = await getAllSongAPIMethod("yoki");

    const newPlayDataForm = {};
    newPlayDataForm.newSong = newSong;
    newPlayDataForm.allSongs = allSong;

    setPlayDataForm(newPlayDataForm);
    setIsLoading(false);
    navigate("/play");
  };

  const onChange = (newDate) => {
    console.log("New Date:", newDate);
    setDate(newDate);

    const newDataForm = [];

    // iterate through calendarDataform and find the diary entries whose date is within same day as newDate
    for (let i = 0; i < calendarDataForm.length; i++) {
      const diaryDate = new Date(calendarDataForm[i].date);
      if (
        diaryDate.getFullYear() === newDate.getFullYear() &&
        diaryDate.getMonth() === newDate.getMonth() &&
        diaryDate.getDate() === newDate.getDate()
      ) {
        newDataForm.push(calendarDataForm[i]);
      }
    }

    console.log("New Data Form:", newDataForm);

    // iterate through newDataForm and concatenate the songs array into musiclist
    let newMusiclist = [];
    for (let i = 0; i < newDataForm.length; i++) {
      for (let j = 0; j < newDataForm[i].songs.length; j++) {
        newMusiclist.push(newDataForm[i].songs[j]);
      }
    }

    console.log("New Musiclist:", newMusiclist);
    setMusiclist(newMusiclist);

    setDataForm(newDataForm);
  };

  const navigatePublic = async () => {
    setIsLoading(true);
    console.log("Getting all posts...");
    const postsArr = await getAllPostAPIMethod();

    const newPublicDataForm = [];

    for (let i = 0; i < postsArr.length; i++) {
      let profileImage;
      const author = postsArr[i].author;

      if (author === "Eunewoo") {
        profileImage = "/tony.png";
      } else if (author === "Elissa") {
        profileImage = "/elissa.png";
      } else {
        profileImage = "/uluk.png";
      }

      newPublicDataForm.push({
        author,
        description: postsArr[i].content,
        date: postsArr[i].date,
        songId: postsArr[i].song,
        songTitle: postsArr[i].songTitle,
        mood: postsArr[i].mood,
        // randomly selecte between '/uluk.png' and '/tony.png'
        profileImage,
      });
    }

    setPublicDataForm(newPublicDataForm);
    console.log("Public Data Form:", newPublicDataForm);
    setIsLoading(false);
    navigate("/public");
  };

  const navigateHome = () => {
    navigate("/home");
  };

  const trimQuotation = (str) => {
    return str.replace(/"/g, "");
  };

  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      const diaryDate = new Date(date);
      for (let i = 0; i < calendarDataForm.length; i++) {
        const entryDate = new Date(calendarDataForm[i].date);
        if (
          entryDate.getFullYear() === diaryDate.getFullYear() &&
          entryDate.getMonth() === diaryDate.getMonth() &&
          entryDate.getDate() === diaryDate.getDate()
        ) {
          if (calendarDataForm[i].songs.length > 0) {
            if (calendarDataForm[i].songs[0].mood === "sad") {
              return "diary-sad";
            } else {
              return "diary-happy";
            }
          }
        }
      }
    }
    return "diary-disabled";
  };

  return (
    <div className="calendar-box">
      <div className="header">
        <div>
          <img
            src="back.svg"
            className="menu"
            onClick={navigateHome}
            alt="home"
          />
        </div>
        <span
          class="publicIcon material-symbols-outlined"
          onClick={navigatePublic}
        >
          groups
        </span>
      </div>
      <h3 className="cal-title">Heal Everyday</h3>
      <div className="calendar">
        <Calendar
          onChange={onChange}
          value={date}
          tileClassName={tileClassName}
        />
      </div>
      <h3 className="cal-title2">Music for you only</h3>
      <div className="list1">
        {musiclist
          ? musiclist.map((song, index) => (
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
            ))
          : null}
      </div>
    </div>
  );
};

export default MyCalendar;
