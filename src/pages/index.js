import React, { Component } from "react"
// import { graphql } from "gatsby"
// import axios from "axios"
import * as faceapi from "face-api.js"

class HomePage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      imageUrl: "",
    }
  }

  componentDidMount() {
    Promise.all([
      faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
      faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
      faceapi.nets.ssdMobilenetv1.loadFromUri("/models"),
    ]).then(this.start)
  }

  start() {
    console.log("Successfully loaded all data from start")
  }

  analyzeImage() {
    const input = document.getElementById("myImg")
    let fullFaceDescriptions = faceapi.detectAllFaces(input)
    console.log("input", input)
    console.log("fullFaceDescriptions", fullFaceDescriptions)
  }
  handleChange = event => {
    console.log(event.target.value)
    this.setState({
      imageUrl: event.target.value,
    })
    async function f() {
      alert("Change Detected...")

      const imageUpload = document.getElementById("imageUpload")
      console.log("imageUpload", imageUpload)
      console.log(imageUpload.files[0])
      const analysisImage = await faceapi.bufferToImage(imageUpload.files[0])
      const detections = await faceapi.detectAllFaces(analysisImage)
      console.log("Number of people in image " + detections.length)
    }
    f()
  }

  render() {
    return (
      <div>
        <h1>Input file here...</h1>
        <img src={this.state.imageUrl} />
        <input type="file" id="imageUpload" onChange={this.handleChange} />
        <br />
      </div>
    )
  }
}

export default HomePage
