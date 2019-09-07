import React, { Component } from "react"
// import { graphql } from "gatsby"
// import axios from "axios"
import QrReader from "react-qr-reader"

import Header from "../components/header"
class QrScanner extends Component {
  constructor(props) {
    super(props)
    this.state = {
      result: "No result",
    }
  }

  componentDidMount() {}

  handleScan = data => {
    if (data) {
      this.setState({
        result: data,
      })
    }
  }
  handleError = err => {
    console.error(err)
  }
  render() {
    return (
      <div
        style={{
          margin: "0px",
          padding: "0px",
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <h1>Scan the QR</h1>
        <QrReader
          delay={300}
          onError={this.handleError}
          onScan={this.handleScan}
          style={{ width: "30%" }}
        />
        <p>{this.state.result}</p>
      </div>
    )
  }
}

export default QrScanner
