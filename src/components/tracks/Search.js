import React, { Component } from "react";
import { Consumer } from "../../context";
import { searchTrack } from "../../services/musixmatch-service";

class Search extends Component {
  state = {
    trackTitle: ""
  };

  findTrack = async (setTrackList, e) => {
    e.preventDefault();

    const trackList = await searchTrack(this.state.trackTitle);

    setTrackList(trackList);

    this.setState({ trackTitle: "" });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <Consumer>
        {({ setTrackList }) => (
          <div className="card card-body mb-4 p-4">
            <h1 className="display-4 text-center">
              <i className="fas fa-music" /> Search For A Song
            </h1>
            <p className="lead text-center">Get the lyrics for any song</p>
            <form onSubmit={this.findTrack.bind(this, setTrackList)}>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Song title..."
                  name="trackTitle"
                  value={this.state.trackTitle}
                  onChange={this.onChange}
                />
              </div>
              <button
                className="btn btn-primary btn-lg mb-5"
                type="submit"
              >
                Get Track Lyrics
              </button>
            </form>
          </div>
        )}
      </Consumer>
    );
  }
}

export default Search;
