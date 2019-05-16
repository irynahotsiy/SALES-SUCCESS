import React, { Component } from "react";
import { Load } from "../Main/Style";

class Loading extends Component {
  render() {
     
    return (
      <>
        <Load>
            {Array(12).fill().map((_, idx) => (
                <div key={idx} />
            ))}
        </Load>
      </>
    );
  }
}

export default Loading;
