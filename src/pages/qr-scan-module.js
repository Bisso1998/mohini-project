import React, { Component } from "react"
import QrReader from "react-qr-reader"
class QrScanner extends Component {
  constructor(props) {
    super(props)
    this.state = {
      result: "No result",
    }
  }

  componentDidMount() {}
  //
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
    return <div></div>
  }
}

export default QrScanner
