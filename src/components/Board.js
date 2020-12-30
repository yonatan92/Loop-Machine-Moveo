import React from "react";
import Pad from "./Pad";
import Recorder from "./Recorder";
import { connect } from "react-redux";
import { icons } from "../assets/icons/index";
import { tracks } from "../loops/index";
import { UpdatecurrBeatsStamp } from "../actions/index";

class Board extends React.Component {
  componentDidMount() {
    // Make action of update totoal beats pass every one sec.
    setInterval(() => this.props.UpdatecurrBeatsStamp(), 1000);
  }
  renderList() {
    return this.props.pads.map((pad) => {
      return (
        <Pad
          padId={pad.padId}
          soundTrack={tracks[pad.padId - 1]}
          icon={icons[pad.padId - 1]}
        ></Pad>
      );
    });
  }

  render() {
    return (
      <div className="drumkit">
        {this.renderList()}
        <Recorder />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    pads: Object.values(state.pads),
  };
};

export default connect(mapStateToProps, { UpdatecurrBeatsStamp })(Board);
