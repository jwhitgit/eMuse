import React from "react";
import SongInput from "./SongInput";
import { Context } from "../../context";

import "./Songs.css";
import SongsList from "./SongsList";

const Songs = () => {
  const {
    songs,
    addNewSong,
    setSongAtIndex,
    removeSongAtIndex,
    decorateWithLyricsAndTones,
    isSaveLyricsEnabled
  } = React.useContext(Context);

  const isCapacity = songs.length >= 4;

  return (
    <>
      <div>
        <h3>How it works</h3>
        <div className="container">
        <p>
          You choose your favorite song (or songs) and we send the lyrics to IBM’s tone analyzer. IBM sends us back any number of 7 key tones that registered in those lyrics. Then we put those values through our own algorithm and output the color we feel represents the lyrics of that song! From there you can share with friends, dig more into the lyrics, or study the tones registered by the IBM tone analyzer. 
		    </p>
		
        <p>
        Your color might surprise you! A dichotomy between lyrics and music is more common than you think.    
        </p>
        </div>
      </div>
      <h3 className="choose-songs-heading">Choose your songs!</h3>

      {songs.map((el, i) => (
        <div key={el.id}>
          <div>
            <div className="form-group row" id="song-input">
              <label htmlFor="song-label" className="col-sm-2 col-form-label">
                Song #{i + 1}
              </label>
              <div className="col-sm-10">
                <div className="input-group mb-3">
                  <SongInput
                    value={el}
                    onSongSelect={value => setSongAtIndex(i, value)}
                  />
                  <div className="input-group-append">
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={() => removeSongAtIndex(i)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      {!isCapacity && (
        <input
          type="button"
          className="song-input-btn btn btn-primary"
          disabled={isCapacity}
          id="addButton"
          value="Add a song"
          onClick={addNewSong}
        />
      )}
      <input
        type="button"
        className="song-input-btn btn btn-primary"
        disabled={!isSaveLyricsEnabled}
        id="analyzeeButton"
        value="Analyze Tones"
        onClick={decorateWithLyricsAndTones}
      />
      {songs.length > 0 && songs.some(song => song.name) && (
        <SongsList songs={songs} />
      )}
    </>
  );
};

export default Songs;
