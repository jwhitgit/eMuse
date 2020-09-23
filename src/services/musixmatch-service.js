import axios from "axios";

const REACT_APP_MM_KEY = process.env.REACT_APP_MM_KEY;

const searchTrack = async trackTitle => {
  let response;
  let trackList;
  try {
    response = await axios.get(
      `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.search?q_track=${trackTitle}&page_size=100&page=1&s_track_rating=desc&apikey=${REACT_APP_MM_KEY}`
    );
    trackList = response.data.message.body.track_list;
  } catch (error) {
    console.log("Error getting the tracks", error);
  }
  return trackList;
};

const getLyrics = async id => {
  let response;
  let lyricsBody;
  try {
    response = await axios.get(
      `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${id}&apikey=${REACT_APP_MM_KEY}`
    );
    lyricsBody = response.data.message.body.lyrics.lyrics_body;
  } catch (error) {
    console.log("Error getting the lyrics", error);
    return "";
  }
  return lyricsBody;
};

const getTrack = async id => {
  let response;
  let track;
  try {
    response = await axios.get(
      `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.get?track_id=${id}&apikey=${REACT_APP_MM_KEY}`
    );
    track = response.data.message.body.track;
  } catch (error) {
    console.log("Error getting the track", error);
  }
  return track;
};
export { searchTrack, getTrack, getLyrics };
