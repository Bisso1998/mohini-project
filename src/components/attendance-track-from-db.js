import React, { Component } from "react"
import firebase from "../firebase.js"
import { Button } from "reactstrap"

class AttendanceDb extends Component {
  constructor(props) {
    super(props)
    this.state = {
      listOfStudents: [],
      numberOfStudents: 0,
      verifyResult: "",
    }
  }
  componentDidMount() {
    if (typeof window != "undefined") {
      this.showAttendance()
    }
  }

  markAttendance = () => {
    console.log(localStorage.getItem("studentCountFromImage"))
    console.log("Number of students in DB: " + this.state.listOfStudents.length)
    let imageCount = localStorage.getItem("studentCountFromImage")
    let studentCount = this.state.listOfStudents.length
    if (imageCount == studentCount) {
      this.setState({
        verifyResult:
          "Attendance matched and saved! Total count it: " + imageCount,
      })
    } else {
      alert("Attendance mismatch! Please mark attendance manually.")
      window.open("https://ums.lpu.in")
    }
  }

  clearAll = () => {
    const students = firebase.database().ref("listOfStudents")
    students.remove()
  }

  showAttendance = () => {
    const students = firebase.database().ref("listOfStudents")
    students.on("value", snapshot => {
      let students = snapshot.val()

      let newState = []
      for (let eachStudent in students) {
        console.log(students[eachStudent].name)
        newState.push({
          name: students[eachStudent].name,
          rollNo: students[eachStudent].rollNo,
        })
      }
      this.setState({
        listOfStudents: newState,
      })
      // console.log("VAL FROM FIREBASE: ", this.state.listOfStudents)
    })
  }

  render() {
    let studentList = this.state.listOfStudents.map((eachStudent, index) => (
      <tr style={{ padding: "30px", textAlign: "center" }}>
        <td>{index + 1}</td>
        <td>{eachStudent.name}</td>
        <td>{eachStudent.rollNo}</td>
      </tr>
    ))
    return (
      <div>
        <h3 id="showResults">{this.state.verifyResult}</h3>
        <Button onClick={this.clearAll} color="primary">
          Clear attendance
        </Button>{" "}
        &nbsp;&nbsp;&nbsp;
        <Button onClick={this.markAttendance} color="success">
          Verify Attendance
        </Button>
        &nbsp;&nbsp;&nbsp;
        <Button color="info" style={{ color: "white" }}>
          <a href="/qr-code" target="_BLANK" style={{ color: "white" }}>
            Show QR
          </a>
        </Button>
        &nbsp;&nbsp;&nbsp;
        <Button color="warning" style={{ color: "white" }}>
          <a href="/scan" target="_BLANK" style={{ color: "white" }}>
            Scan
          </a>
        </Button>
        &nbsp;&nbsp;&nbsp;
        <div>
          <table>
            <tr>
              <th>Serial Number</th>
              <th>Name</th>
              <th>Registration Number</th>
            </tr>
            {studentList}
          </table>
        </div>
      </div>
    )
  }
}

export default AttendanceDb
