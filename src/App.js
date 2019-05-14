import React, { Component } from "react";
import "./App.css";
import zupage from "zupage";
import envelopeimage from "./Envelope.png";
import envelopeopenimage from "./EnvelopeOpen.png";

const ShowLetter = props => {
  if (props.showPaper) {
    return <div className="letter letterup">{props.body}</div>;
  } else return null;
};

export default class App extends Component {
  state = {
    post: {},
    envelope: envelopeimage,
    envAnimation: "hovering",
    showPaper: false
  };

  async componentDidMount() {
    const response = await zupage.getCurrentPost();

    this.setState({
      post: response
    });
  }

  onOpenLetter() {
    this.setState({
      envelope: envelopeopenimage,
      envAnimation: "envopen",
      showPaper: true
    });
  }

  render() {
    return (
      <div className="background">
        <div>
          <img
            className={`envelope ${this.state.envAnimation}`}
            src={this.state.envelope}
            alt="Loading..."
            onClick={this.onOpenLetter.bind(this)}
          />
        </div>
        <div>
          <ShowLetter
            showPaper={this.state.showPaper}
            body={this.state.post.body}
          />
        </div>
      </div>
    );
  }
}
