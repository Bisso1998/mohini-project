import React, { Component } from "react"
import firebase from "../firebase.js"

class AttendanceDb extends Component {
  constructor(props) {
    super(props)
    this.state = {
      listOfStudents: [],
      numberOfStudents: 0,
    }
  }

  showAttendance = () => {
    const students = firebase.database().ref("listOfStudents")
    students.on("value", snapshot => {
      let items = snapshot.val()
      console.log("VAL FROM FIREBASE: ", items)
      // let newState = []
      // for (let item in items) {
      //   newState.push({
      //     id: item,
      //     title: items[item].title,
      //     user: items[item].user,
      //   })
      // }
      // this.setState({
      //   items: newState,
      // })
    })
  }

  render() {
    return (
      <div>
        <button onClick={this.showAttendance}>Load attendance</button>
        <h1>
          Number of students whose attendance are marked:{" "}
          {this.state.numberOfStudents}
        </h1>
      </div>
    )
  }
}

export default AttendanceDb
