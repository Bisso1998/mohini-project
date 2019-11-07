import React, { Component } from "react"
// import { graphql } from "gatsby"
// import axios from "axios"
import HeadCount from "./headcount-module"
class ShowQrCode extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {}

  render() {
    return (
      <div>
        <img
          src="https://i.imgur.com/OohjEpC.png"
          style={{
            height: "500px",
            width: "500px",
            margin: "auto",
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        />
      </div>
    )
  }
}

export default ShowQrCode
