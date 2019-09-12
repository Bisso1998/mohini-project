import React, { Component } from "react"
import QrReader from "react-qr-reader"
import firebase from "../firebase.js"
// import firebase from "firebase"

import AttendanceDb from "../components/attendance-track-from-db.js"
class QrScannerModule extends Component {
  constructor(props) {
    super(props)
    this.state = {
      result: "No result",
      showScanner: false,
      studentName: "",
      studentRollNumber: "",
    }
  }

  componentDidMount() {}
  //

  handleScan = data => {
    if (data) {
      this.setState({
        result: data,
      })
      this.setState({ showScanner: false })
      document.getElementById("showAttendanceStatus").innerText =
        "Attendance Marked"
    }
  }
  showQrScanner = () => {
    this.setState({ showScanner: true })
  }

  markAttendance = () => {
    s
    const students = firebase.database().ref("listOfStudents")
    const student = {
      name: this.state.studentName,
      rollNo: this.state.studentRollNumber,
    }
    console.log("Student Details:  ", student)
    students.push(student)
  }
  updateStudentName = e => {
    this.setState({
      studentName: e.target.value,
    })
  }
  updateStudentRollNumber = e => {
    this.setState({
      studentRollNumber: e.target.value,
    })
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
        <p id="showAttendanceStatus">{this.state.result}</p>
        <input
          type="text"
          placeholder="Enter Student Name..."
          value={this.state.studentName}
          onChange={e => this.updateStudentName(e)}
        />
        <br />
        <br />
        <br />
        <input
          type="number"
          placeholder="Enter Student Roll Number..."
          value={this.state.studentRollNumber}
          onChange={e => this.updateStudentRollNumber(e)}
        />
        <br />

        <button onClick={this.markAttendance}>Mark me present</button>
        <br />

        <button onClick={this.showQrScanner}>Start Scanning</button>
        <br />
        <AttendanceDb />
      </div>
    )
  }
}

export default QrScannerModule
