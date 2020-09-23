import React, { Component } from "react";
import Downshift from "downshift";
import { debounce } from "throttle-debounce";

import { searchTrack } from "../../services/spotify-service";

import "./SongInput.css";

class SongInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tracks: [],
      value: this.getItemLabel(this.props.value)
    };

    this.fetchTracks = this.fetchTracks.bind(this);
    this.inputOnChange = this.inputOnChange.bind(this);
    this.getItemLabel = this.getItemLabel.bind(this);
    this.downshiftOnChange = this.downshiftOnChange.bind(this);
    this.debouncedFetchTracks = debounce(500, this.fetchTracks);
  }

  inputOnChange(event) {
    if (event.target.value) {
      this.debouncedFetchTracks(event.target.value);
    }
    this.setState({ value: event.target.value });
  }

  downshiftOnChange(selectedTrack) {
    this.props.onSongSelect(selectedTrack);

    this.setState({ value: this.getItemLabel(selectedTrack) });
  }

  async fetchTracks(searchTerm) {
    const response = await searchTrack(searchTerm);
    this.setState({ tracks: response });
  }

  getItemLabel(item) {
    if (item && item.name) {
      const artists = item.artists
        ? item.artists.map(artist => {
            return artist.name || "";
          })
        : [];
      return `${item.name} - ${artists.join(", ")}`;
    }
    return "";
  }

  render() {
    return (
      <Downshift
        onChange={this.downshiftOnChange}
        itemToString={this.getItemLabel}
      >
        {({
          selectedItem,
          getInputProps,
          getItemProps,
          highlightedIndex,
          isOpen,
          inputValue,
          getLabelProps
        }) => (
          <div className="downshift-container">
            <input
              {...getInputProps({
                value: this.state.value,
                placeholder: "Enter song name",
                onChange: this.inputOnChange,
                className: "downshift-input"
              })}
            />
            {isOpen ? (
              <div className="downshift-dropdown">
                {this.state.tracks.map((item, index) => (
                  <div
                    className="dropdown-item"
                    {...getItemProps({ key: index, index, item })}
                    style={{
                      backgroundColor:
                        highlightedIndex === index ? "lightgray" : "white",
                      fontWeight: selectedItem === item ? "bold" : "normal"
                    }}
                  >
                    {this.getItemLabel(item)}
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        )}
      </Downshift>
    );
  }
}

export default SongInput;
