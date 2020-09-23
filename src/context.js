import React, { Component } from "react";
import { map as asyncMap } from "awaity";
import { searchTrack, getLyrics } from "./services/musixmatch-service";
import { fetchTones } from "./services/watson-service";

export const Context = React.createContext();

export class Provider extends Component {
  state = {
    songs: [1],
    track_list: [],
    heading: "Top 10 Tracks"
  };

  /**
   * Adds a new blank song in the State
   */
  addNewSong = () => {
    this.setState(prevState => ({
      songs: [...prevState.songs, { id: new Date().getTime() }]
    }));
  };

  /**
   * Helper function to tokenize strings before comparing
   * Helps to remove comparison of punctuation.
   */
  tokenize = str =>
    str
      .toLowerCase()
      .replace("(", " ")
      .replace(")", " ")
      .replace("-", " ")
      .replace(",", " ")
      .replace(".", " ")
      .replace("'", "")
      .replace('"', "")
      .replace("  ", " ")
      .split(" ")
      .map(token => token.trim());

  /**
   * Helper function to find out if the names are  equal in song and lyric response.
   * Tokenizes each name and compares tokens-to-tokens
   */
  areNamesMatching = (songName, lyricName) => {
    const songNameTokens = this.tokenize(songName);
    const lyricNameTokens = this.tokenize(lyricName);

    return songNameTokens.every(songNameToken =>
      lyricNameTokens.includes(songNameToken)
    );
  };

  /**
   * This function is doing the following:
   * 1. Get the lyrics for each of the song in state
   * 2. Add lyrics in the respective song object
   * 3. If lyrics are found, get the tonees for each song
   * 4. Add tone response in  each song objeect
   *
   * At the  end this function updates the state by adding lyrics and tones for each song in the state
   * note that it will try to get the lyrics and tones only for new songs.
   */
  decorateWithLyricsAndTones = async () => {
    const { songs } = this.state;

    const songsWithLyricsTrack = await asyncMap(songs, async song => {
      let { lyrics = "" } = song;
      let { tones = [] } = song;

      if (!lyrics) {
        const tracks = await searchTrack(song.name);
        const matchingTrack = tracks.find(trackItem => {
          const { track } = trackItem;
          return (
            this.areNamesMatching(song.name, track.track_name) &&
            track.artist_name
              .toLowerCase()
              .replace("ft", ",")
              .replace("feat", ",")
              .replace("&", ",")
              .split(",")
              .some(artistName =>
                song.artists.some(
                  artist =>
                    artist.name.toLowerCase().trim() === artistName.trim()
                )
              )
          );
        });

        if (
          matchingTrack &&
          matchingTrack.track &&
          matchingTrack.track.track_id
        ) {
          lyrics = await getLyrics(matchingTrack.track.track_id);
        }
      }

      // If no lyrics found, add it in the object

      if (lyrics && (!tones || !tones.length)) {
        tones = await fetchTones(lyrics);
      }

      return {
        ...song,
        lyrics,
        tones,
        failedToGetLyrics: !lyrics,
        failedToGetTones: !tones || !tones.length
      };
    });

    this.setState({ songs: songsWithLyricsTrack });
  };

  /**
   * Replaces a song at particular index. (when user changes the song for existing input)
   */
  setSongAtIndex = (index, value) => {
    let songs = [...this.state.songs];
    songs[index] = value;
    this.setState({ songs });
  };

  /**
   * Removes a song at particular index. (when user deletes a song input)
   */
  removeSongAtIndex = index => {
    let songs = [...this.state.songs];
    songs.splice(index, 1);
    this.setState({ songs });
  };

  /**
   * Set the track_list (lyrics tracks) in the state
   * This is only used by the 'search lyrics' tab
   */
  setTrackList = tracks => {
    this.setState({ track_list: tracks });
  };

  render() {
    const { songs, track_list, heading } = this.state;
    const isSaveLyricsEnabled =
      songs && songs.length && songs.every(song => song.name);

    const context = {
      songs,
      track_list,
      heading,
      addNewSong: this.addNewSong,
      setSongAtIndex: this.setSongAtIndex,
      removeSongAtIndex: this.removeSongAtIndex,
      setTrackList: this.setTrackList,
      decorateWithLyricsAndTones: this.decorateWithLyricsAndTones,
      isSaveLyricsEnabled
    };

    return (
      <Context.Provider value={context}>{this.props.children}</Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;
