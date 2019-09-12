import React, { Component } from "react"
import QrReader from "react-qr-reader"
class QrScannerModule extends Component {
  constructor(props) {
    super(props)
    this.state = {
      result: "No result",
      showScanner: false,
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
  showQrScanner = () => {
    this.setState({ showScanner: true })
  }

  componentDidMount() {}
  render() {
    return (
      <div>
        {this.state.showScanner && (
          <QrReader
            delay={300}
            onError={this.handleError}
            onScan={this.handleScan}
            style={{ width: "100%" }}
          />
        )}

        <p>{this.state.result}</p>
        <button onClick={this.showQrScanner}>Start Scanning</button>
      </div>
    )
  }
}

export default QrScannerModule
