import React from "react";
import { Link } from "react-router-dom";
import "./SongDetails.css";


const tweetLinks = {
  anger:
    "https://twitter.com/intent/tweet?text=Im%20feeling%20angry.%20Discover%20your%20feelings%20at%20emuse.net%pic.twitter.com/CyewpXE5rJ", //anger
  joy:
    "https://twitter.com/intent/tweet?text=Im%20feeling%20joyful.%20Discover%20your%20feelings%20at%20emuse.net%20pic.twitter.com/caLTYPREcb", //joy
  sadness:
    "https://twitter.com/intent/tweet?text=Im%20feeling%20sad.%20Discover%20your%20feelings%20at%20emuse.net%20pic.twitter.com/EUqGGOE8gv", //sadness
  aalytical:
    "https://twitter.com/intent/tweet?text=Im%20feeling%20analytical.%20Discover%20your%20feelings%20at%20emuse.net%20pic.twitter.com/2xHScn1uJd", //aalytical
  fear:
    "https://twitter.com/intent/tweet?text=Im%20feeling%20fearful.%20Discover%20your%20feelings%20at%20emuse.net%20pic.twitter.com/Dgs4T2fGFb", //fear
  tentative:
    "https://twitter.com/intent/tweet?text=Im%20feeling%20tentative.%20Discover%20your%20feelings%20at%20emuse.net%20pic.twitter.com/kn2aDn6uGn", //tentative
  confident:
    "https://twitter.com/intent/tweet?text=Im%20feeling%20confident.%20Discover%20your%20feelings%20at%20emuse.net%pic.twitter.com/AeQNiI1rNk" //confident
};

// Gets the highest emotion from tones;
const getHighestEmotion = tones => {
  // first check for emotions:
  const highestEmotion = tones.reduce(
    (highestEmotion, tone) => {
      if (
        tone.tone_id !== "tentative" &&
        tone.tone_id !== "confident" &&
        tone.score > highestEmotion.score
      ) {
        return tone;
      }
      return highestEmotion;
    },
    { score: 0 }
  );

  if (highestEmotion.score > 0) {
    // highest emotion was found, return it.
    return highestEmotion;
  } else {
    // no highest emotion was found, return either the confident OR tentative emotion (if existing)
    return tones.reduce(
      (highestEmotion, tone) => {
        if (
          (tone.tone_id === "tentative" || tone.tone_id === "confident") &&
          tone.score > highestEmotion.score
        ) {
          return tone;
        }
        return highestEmotion;
      },
      { score: 0 }
    );
  }
};

const SongDetails = ({ song }) => {
  //get the highest emotion from all tones for this song
  const highestEmotion = getHighestEmotion(song.tones);
  return (
    <div className="song-details">
      <div className="container">
        <h4>Scores:</h4>
        {song.tones.map(tone => (
          <div key={tone.tone_id}>
            <p className="container song-details-tones">
              <span>Tone Name : {tone.tone_name},</span>
              <span>Score: {tone.score}</span>
            </p>
          </div>
        ))}
      </div>
      <div className="container">
        <h4>Lyrics:</h4>
        <div className="container">
          <p>{song.lyrics}</p>
        </div>
      </div>
      {/* Show tweet button only when the highest emotion is found in the song tones */}
      {highestEmotion.score > 0 && (
        <div className="container">
          <div className="row">
              <div className="col">
              <p><h4 className="more-colors-info" id="colors-test">For more information on our colors: </h4></p>
              </div>
              <div className="col">
              </div>
            </div>
            <div className="row">
              <div className="col">
                <Link className="nav-link" to="/about">
                    <button className="btn btn-primary">
                      Click Here!
                    </button>
                </Link>
              </div>
              <div className="col">
              </div>
              <div className="col">
              <a
                  type="button"
                  className="btn btn-primary"
                  id="twitter-button"
                  href={tweetLinks[highestEmotion.tone_id]}
                >
                  Share on Twitter
                </a>
              </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default SongDetails;
