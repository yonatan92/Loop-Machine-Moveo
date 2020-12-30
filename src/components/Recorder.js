import React, { Component } from "react";
import MicRecorder from "mic-recorder-to-mp3";

export class Recorder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRecording: false,
      blobURL: "",
      isBlocked: false,
      Mp3Recorder: new MicRecorder({ bitRate: 128 }),
      playSession: false,
    };
  }
  componentDidMount() {
    navigator.getUserMedia(
      { audio: true },
      () => {
        console.log("Permission Granted");
        this.setState({ isBlocked: false });
      },
      () => {
        console.log("Permission Denied");
        this.setState({ isBlocked: true });
      }
    );
  }
  start = () => {
    if (this.state.isBlocked) {
      console.log("Permission Denied");
    } else {
      this.state.Mp3Recorder.start()
        .then(() => {
          this.setState({ isRecording: true, playSession: false });
        })
        .catch((e) => console.error(e));
    }
  };
  stop = () => {
    this.state.Mp3Recorder.stop()
      .getMp3()
      .then(([buffer, blob]) => {
        const blobURL = URL.createObjectURL(blob);
        this.setState({ blobURL, isRecording: false, playSession: true });
      })
      .catch((e) => console.log(e));
  };
  render() {
    return (
      <div class="ui equal width center aligned padded grid">
        <div class="row">
          <button
            onClick={this.start}
            class="ui labeled icon button"
            disabled={this.state.isRecording}
          >
            <i class="circle red icon"></i>
            Record
          </button>
          <button
            onClick={this.stop}
            class="ui right labeled icon button"
            disabled={!this.state.isRecording}
          >
            <i class="stop icon"></i>
            Next
          </button>
        </div>
        <div class="row">
          <audio
            src={this.state.blobURL}
            controls="controls"
            hidden={this.state.playSession ? false : true}
          />
        </div>
      </div>
    );
  }
}

export default Recorder;
