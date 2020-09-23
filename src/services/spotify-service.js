import axios from "axios";

const SPOTIFY_ID = process.env.REACT_APP_SPOTIFY_ID;

const authorize = () => {
  const redirect = encodeURIComponent(`${window.location.origin}/callback`);
  window.location.href = `https://accounts.spotify.com/authorize?client_id=${SPOTIFY_ID}&response_type=token&redirect_uri=${redirect}`;
};

const isAuthorized = () => !!getToken();

const saveToken = token => {
  // TODO: Save expiration
  localStorage.setItem("access-token", token);
};

const getToken = () => {
  // TODO: Check for token expiration
  return localStorage.getItem("access-token") || "";
};

const removeToken = () => {
  localStorage.removeItem("access-token");
};

const searchTrack = async searchTerm => {
  let response;
  const token = getToken();
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  if (token) {
    try {
      response = await axios.get(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(
          searchTerm
        )}&type=track`,
        config
      );
    } catch (error) {
      console.log("Error getting the tracks", error);
    }
  }
  return response.data.tracks.items || [];
};

export {
  authorize,
  isAuthorized,
  getToken,
  searchTrack,
  saveToken,
  removeToken
};
