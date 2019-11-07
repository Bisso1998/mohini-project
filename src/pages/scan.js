import React, { Component } from "react"
import QrReader from "react-qr-reader"
import firebase from "../firebase.js"
import Header from "../components/header"
import { Button, Form, FormGroup, Label, Input } from "reactstrap"
import { Container, Row, Col } from "reactstrap"

class QrScannerModule extends Component {
  constructor(props) {
    super(props)
    this.state = {
      result: "",
      showScanner: false,
      studentName: "",
      studentRollNumber: "",
      isAlreadyPresent: 0,
    }
  }

  componentDidMount() {}
  //

  handleScan = data => {
    if (data) {
      if (data == "k1627mlclass") {
        this.setState({
          result: data,
          showScanner: false,
          isAlreadyPresent: 0,
        })

        const students = firebase.database().ref("listOfStudents")

        students.on("value", snapshot => {
          let students = snapshot.val()
          for (let eachStudent in students) {
            if (this.state.studentRollNumber == students[eachStudent].rollNo) {
              this.setState({
                isAlreadyPresent: 1,
              })
            }
          }
        })
        if (this.state.isAlreadyPresent == 0) {
          this.markAttendance()
        } else {
          alert("Already Marked")
        }
      }
    }
  }
  showQrScanner = () => {
    this.setState({ showScanner: true })
  }

  markAttendance = () => {
    const students = firebase.database().ref("listOfStudents")
    const student = {
      name: this.state.studentName,
      rollNo: this.state.studentRollNumber,
    }
    console.log("Student Details:  ", student)
    students.push(student)
    this.setState({
      showScanner: false,
    })
    alert("Attendance successfully marked for " + this.state.studentName)
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
        <Header
          title="Mark Attendance"
          style={{ width: "100vw", margin: "0px" }}
        />
        {this.state.showScanner && (
          <QrReader
            delay={300}
            onError={this.handleError}
            onScan={this.handleScan}
            style={{ width: "100%" }}
          />
        )}
        <Container>
          <Row>
            <Col xs="12" md="6" style={{ marginTop: "30px" }}>
              <Label for="exampleEmail" className="mr-sm-2">
                Name
              </Label>
              <Input
                type="text"
                placeholder="Enter Student Name..."
                value={this.state.studentName}
                onChange={e => this.updateStudentName(e)}
              />
            </Col>

            <Col xs="12" md="6" style={{ marginTop: "30px" }}>
              <Label for="examplePassword" className="mr-sm-2">
                Roll Number
              </Label>
              <Input
                type="number"
                placeholder="Enter Student Roll Number..."
                value={this.state.studentRollNumber}
                onChange={e => this.updateStudentRollNumber(e)}
              />
            </Col>
          </Row>
          <br />

          <Col>
            <Button
              onClick={this.showQrScanner}
              style={{
                width: "100%",
                backgroundColor: "green",
                color: "white",
              }}
            >
              {" "}
              Start Scanning
            </Button>
          </Col>
        </Container>
      </div>
    )
  }
}

export default QrScannerModule
