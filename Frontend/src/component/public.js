import React, { useState } from "react";
import "../css/public.css";
import { useNavigate } from "react-router-dom";
import { getSongAPIMethod } from "../api/client";

const Public = ({
  dataForm,
  listDataForm,
  setListDataForm,
  setPlayDataForm,
}) => {
  const posts = dataForm;

  const categories = [
    "all",
    "consolation",
    "delightful",
    "positivity",
    "empathy",
    "hope",
  ];
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  const navigate = useNavigate();

  if (!posts) {
    return <div>No posts...</div>;
  }

  let filteredPosts = posts;

  if (selectedCategory !== "all") {
    filteredPosts = posts.filter(
      (post) => post.mood.toLowerCase() === selectedCategory.toLowerCase()
    );
  }

  const handleSongClick = async (e) => {
    const songId = e.target.id;
    console.log("This Song ID:", songId);

    const song = await getSongAPIMethod("yoki", songId);

    const newPlayDataForm = {};
    newPlayDataForm.newSong = song;
    newPlayDataForm.allSongs = listDataForm ? listDataForm.songs : [];
    setPlayDataForm(newPlayDataForm);
    navigate("/play");
  };

  const handleCalendar = () => {
    navigate("/calendar");
  };

  const navigateHome = () => {
    navigate("/home");
  };

  const trimQuotation = (str) => {
    return str.replace(/"/g, "");
  };

  return (
    <div className="public">
      <div className="header">
        <div>
          <img
            src="calendar.svg"
            className="person"
            alt="Profile"
            onClick={handleCalendar}
          />
        </div>
        <img
          src="home.svg"
          className="menu"
          onClick={navigateHome}
          alt="homebutton"
        />
      </div>
      <div className="categories">
        {categories.map((category, index) => (
          <button
            key={index}
            onClick={() => setSelectedCategory(category)}
            className={`category ${
              category === selectedCategory ? "active" : ""
            }`}
          >
            {category[0].toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>
      <div className="public-posts">
        {filteredPosts.map((post, index) => (
          <div className={`post ${post.type}`} key={index}>
            <div className="profile">
              <div className="profile-circle">
                <img
                  className="profile-img"
                  src={post.profileImage}
                  alt="Profile"
                />
                <div className="profile-name">{post.author}</div>
              </div>
              <p className="post-title">{post.title}</p>
            </div>
            <div className="post-content">
              <h3 style={{ textAlign: "left" }}>
                ♬ {trimQuotation(post.songTitle)}
              </h3>
              <hr />
              <p style={{ textAlign: "left" }}>{post.description}</p>
              <div className="play-button">
                <img
                  className="public-play-img"
                  src="/play.svg"
                  id={post.songId}
                  alt={post.songTitle}
                  onClick={handleSongClick}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Public;
