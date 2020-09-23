import React from "react";
import "./SongToneSwatch.css";

const colors = {
  anger: {
    tentative: ["FFCB9A", "FFCCCC", "FF7C7F"],
    midTentative: ["FFCC66", "FFCB9A", "FF504F"],
    neutral: ["FF9967", "FF9933", "FF0400"],
    midConfident: ["FF9900", "FF6500", "FF3301"],
    confident: ["CC3300", "CC6600", "990100"]
  },
  joy: {
    tentative: ["FFCCCC", "FAC2EB", "FEC2ED"],
    midTentative: ["FF99CC", "F49AE7", "F89AD1"],
    neutral: ["FF659A", "FF65CC", "FF04FF"],
    midConfident: ["F949A4", "F43ED0", "ED4DB4"],
    confident: ["CC0B87", "C52AA0", "E8239E"]
  },
  sadness: {
    tentative: ["CCFFFF", "CCECFF", "99CCFE"],
    midTentative: ["65FFFF", "66CCFF", "97BFFB"],
    neutral: ["01FFFF", "3399FE", "638EFA"],
    midConfident: ["03CDFF", "0499FE", "155BE4"],
    confident: ["0299CC", "0366CC", "134CA8"]
  },
  analytical: {
    tentative: ["D99BFE", "D9B3FF", "D0BDFF"],
    midTentative: ["C15FFD", "C489FF", "AB8AFE"],
    neutral: ["B134FD", "9933FF", "6E35FC"],
    midConfident: ["9304EC", "8409FF", "4803F8"],
    confident: ["7503BE", "5C02B9", "3A05C2"]
  },
  fear: {
    tentative: ["A6FCD3", "98FEB2", "EDFBC5"],
    midTentative: ["37FB7C", "2CFE8B", "DEF78D"],
    neutral: ["07ADA1", "00B04F", "C6F13E"],
    midConfident: ["0BC97E", "059643", "95BE0F"],
    confident: ["027870", "007634", "7A9D0B"]
  },
  tentative: ["FFFFFF", "FFFECC", "FFFF9A", "FFFF67", "FFFF00"],
  confident: ["C6ABEE", "9668E3", "854EDE", "7C40DC", "6927D3"]
};

const addConfidenceOrTentative = (selectedEmotion, tones) => {
  const confidenceOrTentative = tones.reduce(
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
  return { ...selectedEmotion, confidenceOrTentative };
};

const getHighestEmotion = tones => {
  return tones.reduce(
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
};

const getConfidenceName = ({ tone_id, score }) => {
  if (tone_id) {
    if (tone_id === "tentative") {
      return score > 0.75 ? "midTentative" : "tentative";
    }

    if (tone_id === "confident") {
      return score > 0.75 ? "confident" : "midConfident";
    }
  }
  return "neutral";
};

const getEmotionScore = score => {
  if (score <= 0.67) {
    return 0;
  }
  if (score <= 0.84) {
    return 1;
  }
  return 2;
};

const getConfidenceScore = score => {
  if (score <= 0.59) {
    return 0;
  }
  if (score <= 0.69) {
    return 1;
  }
  if (score <= 0.79) {
    return 2;
  }
  if (score <= 0.89) {
    return 3;
  }
  return 4;
};

const SongToneSwatch = ({ song }) => {
  // If no lyrics found for song, return a gray box
  if (song.failedToGetLyrics) {
    return (
      <span className="color-swatch" style={{ background: `#999999` }}>
        {song.name}
      </span>
    );
  }

  // If no tones found for song, return a gray box
  if (song.failedToGetTones) {
    return (
      <span className="color-swatch" style={{ background: `#dadada` }}>
        {song.name}
      </span>
    );
  }

  if (!song.tones || !song.tones.length) {
    // song is not yet analysed, return just the name
    return <span>{song.name}</span>;
  }

  const highestEmotion = getHighestEmotion(song.tones);
  const withConfidence = addConfidenceOrTentative(highestEmotion, song.tones);

  let colorValue = "";

  if (withConfidence.tone_id) {
    //an emotion is matched
    const confidenceName = getConfidenceName(
      withConfidence.confidenceOrTentative
    );
    const emotionScore = getEmotionScore(withConfidence.score);
    colorValue = colors[withConfidence.tone_id][confidenceName][emotionScore];
  } else {
    // there are no matched emaotion, just get confidence or tentative value
    const confidenceScore = getConfidenceScore(
      withConfidence.confidenceOrTentative.score
    );
    colorValue =
      colors[withConfidence.confidenceOrTentative.tone_id][confidenceScore];
  }

  return (
    <span className="color-swatch" style={{ background: `#${colorValue}`}}>
      {song.name}
    </span>
  );
};

export default SongToneSwatch;
