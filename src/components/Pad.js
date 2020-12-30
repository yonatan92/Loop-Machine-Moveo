import React, { Component } from "react";
import { connect } from "react-redux";
import {
  updatePadBeatsPerSec,
  addActivePadCount,
  subActivePadCount,
} from "../actions";
import { Howl, Howler } from "howler";

export class Pad extends Component {
  constructor(props) {
    super(props);
    const audio = { sound: props.soundTrack };
    const src = audio.sound;
    const sound = new Howl({
      src,
      loop: true,
      sprite: { start: null },
    });
    this.state = {
      sound,
      isOn: false,
    };
  }
  componentDidMount() {
    //After mp3 is loaded the component update his beats per sec.
    this.state.sound.on("load", () =>
      this.props.updatePadBeatsPerSec(
        this.props.padId,
        120 / this.state.sound.duration() / this.state.sound.duration()
      )
    );
  }

  soundPlay() {
    //calculate the starting point of the track(depends the other track are on)
    let startingPoint =
      (((this.props.machineState.totalBeatsPass /
        this.props.padState.beatsPerSec) *
        1000) %
        this.state.sound.duration()) *
      1000;
    //add active pad to App state
    this.props.addActivePadCount(this.props.padState.beatsPerSec);
    const track = this.state.sound;
    //Setting the starting point of the mp3.
    track._sprite.start = [startingPoint];

    track.play("start");
    this.setState({ isOn: true });
  }

  soundStop() {
    this.state.sound.stop();
    this.setState({ isOn: false });
    this.props.subActivePadCount();
  }
  render() {
    Howler.volume(1.0);
    const padState = this.props.padState.state;

    return (
      <div
        className="pad"
        style={{
          background: this.state.isOn
            ? "radial-gradient(#74e18c, #14a15b)"
            : "radial-gradient(#e18174, #d15746)",
        }}
        onClick={
          this.state.isOn ? () => this.soundStop() : () => this.soundPlay()
        }
      >
        <img src={this.props.icon} />
        <i className={` ${this.state.isOn ? "stop" : "play"} icon large`}></i>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    padState: state.pads[ownProps.padId],
    machineState: state.machine,
  };
};

// const mapDispatchToProps = () => {
//   return { pressOff, pressOn };
// };

export default connect(mapStateToProps, {
  updatePadBeatsPerSec,
  addActivePadCount,
  subActivePadCount,
})(Pad);
