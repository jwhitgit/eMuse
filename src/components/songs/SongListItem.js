import React, { useState } from "react";
import SongToneSwatch from "./SongToneSwatch";
import SongDetails from "./SongDetails";
import "./SongListItem.css";

const SongListItem = ({ song }) => {
  const [isDetailsShowing, setIsDetailsShowing] = useState(false);

  const toggleDetailDisplay = () => setIsDetailsShowing(!isDetailsShowing);
  return (
    <div>
      <div className="song-item">
        <SongToneSwatch song={song} />

        {/* Show details toggler only when tones and lyrics are present for the song */}
        {song.name &&
          (song.failedToGetLyrics || song.failedToGetTones || song.tones) && (
            <span className="details-toggler" onClick={toggleDetailDisplay}>
              {isDetailsShowing ? `Hide` : `Show`} Details
            </span>
          )}

        {song.name &&
          !song.failedToGetLyrics &&
          !song.failedToGetTones &&
          (!song.tones || !song.tones.length) && (
            <span className="text-instruction text-muted">
              Click `Analyze Tones` to see tones
            </span>
          )}
      </div>
      {/* Show or hide the details based on state value */}
      {isDetailsShowing && (
        <>
          {song.name &&
            !song.failedToGetLyrics &&
            !song.failedToGetTones &&
            song.tones &&
            song.tones.length > 0 && <SongDetails song={song} />}

          {song.name && song.failedToGetLyrics && (
            <span className="text-muted">
              Failed to get the lyrics for `{song.name}`.
            </span>
          )}
          {song.name && !song.failedToGetLyrics && song.failedToGetTones && (
            <span className="text-muted">
              Failed to get the tones for `{song.name}`.
            </span>
          )}
        </>
      )}
    </div>
  );
};

export default SongListItem;
