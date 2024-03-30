import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5001/api",
});

// POST /login
// body: { username: string }
export const loginAPIMethod = async (username) => {
  const response = await api.post("/login", { username });
  return response.data;
};

// POST /create
// body: {username:string, diary:string}
export const createDiaryAPIMethod = async (username, diary) => {
  const response = await api.post("/create", { username, diary });
  return response.data;
};

// GET /song
// body: {username:string}
export const getAllSongAPIMethod = async (username) => {
  const response = await api.post("/allSong", { username });
  return response.data;
};

// POST /song
// body: {username:string, id:string}
export const getSongAPIMethod = async (username, id) => {
  const response = await api.post("/song", { username, id });
  return response.data;
};

// POST /multipleSongs
// body: {username:string, songs:array}
export const getMultipleSongsAPIMethod = async (username, songs) => {
  const response = await api.post("/multipleSongs", { username, songs });
  return response.data;
};

// POST /like
// body: {username:string, id:string}
export const likeSongAPIMethod = async (username, id) => {
  const response = await api.post("/like", { username, id });
  return response.data;
};

// POST /diaryBySong
// body: {username:string, id:string}
export const getDiaryBySongAPIMethod = async (username, id) => {
  const response = await api.post("/diaryBySong", { username, id });
  return response.data;
};

// POST /createPost
// body: {title:string, content:string, author:string, diaryId:string, songId:string}
export const createPostAPIMethod = async (content, author, songId) => {
  const response = await api.post("/createPost", {
    content,
    author,
    song: songId,
  });
  return response.data;
};

// GET /post
export const getAllPostAPIMethod = async () => {
  const response = await api.post("/getPost");
  console.log("Got all posts:", response.data);
  return response.data;
};

// POST /postByMood
// body: {mood:string}
export const getPostByMoodAPIMethod = async (mood) => {
  const response = await api.post("/postByMood", { mood });
  return response.data;
};

// POST /diary
export const getAllDiaryAPIMethod = async () => {
  const response = await api.post("/diary");
  return response.data;
};
