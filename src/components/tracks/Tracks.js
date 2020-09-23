import React from "react";
import { Context } from "../../context";
import Track from "../tracks/Track";

const Tracks = () => {
  const { track_list, heading } = React.useContext(Context);

  return track_list && track_list.length ? (
    <>
      <h3 className="text-center mb-4">{heading}</h3>
      <div className="row">
        {track_list.map(item => (
          <Track key={item.track.track_id} track={item.track} />
        ))}
      </div>
    </>
  ) : (
    ""
  );
};

export default Tracks;
