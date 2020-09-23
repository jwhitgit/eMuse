import React from "react";
import "./SongsList.css";
import SongListItem from "./SongListItem";

const SongsList = ({ songs = [] }) => (
  <div className="songs-list">
    <h2>All Songs</h2>
    {songs.map(song => (
      <SongListItem key={song.id} song={song} />
    ))}
  </div>
);

export default SongsList;
