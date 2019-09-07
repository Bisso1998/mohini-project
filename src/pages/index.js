import React, { Component } from "react"
// import { graphql } from "gatsby"
// import axios from "axios"
import * as faceapi from "face-api.js"
import Header from "../components/header"
class HomePage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      imageUrl: "",
      numberOfPeople: null,
      isModuleLoaded: false,
      imageProcessingLoader: false,
      imageProcessingStage: "not_started",
    }
  }

  componentDidMount() {
    Promise.all([
      faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
      faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
      faceapi.nets.ssdMobilenetv1.loadFromUri("/models"),
    ]).then(this.start)
  }

  start = () => {
    console.log("Successfully loaded all data from start")
    this.setState({
      isModuleLoaded: true,
    })
  }

  analyzeImage() {
    const input = document.getElementById("myImg")
    let fullFaceDescriptions = faceapi.detectAllFaces(input)
    console.log("input", input)
    console.log("fullFaceDescriptions", fullFaceDescriptions)
  }
  handleChange = event => {
    let tmpAddress = URL.createObjectURL(event.target.files[0])
    this.setState({
      imageUrl: tmpAddress,
      imageProcessingStage: "image_processing",
    })
    let that = this
    async function f() {
      const imageUpload = document.getElementById("imageUpload")
      console.log("imageUpload", imageUpload)
      console.log(imageUpload.files[0])
      const analysisImage = await faceapi.bufferToImage(imageUpload.files[0])
      const detections = await faceapi.detectAllFaces(analysisImage)
      console.log("Number of people in image " + detections.length)
      that.setState({
        numberOfPeople: detections.length,
        imageProcessingStage: "image_processing_complete",
      })
    }
    f()
  }

  render() {
    return (
      <div>
        {this.state.isModuleLoaded && (
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
            <h1>Analyze photo here</h1>
            <img src={this.state.imageUrl} />
            <input type="file" id="imageUpload" onChange={this.handleChange} />
            <br />
            {this.state.imageProcessingStage == "image_processing_complete" && (
              <h1> Number of people detected {this.state.numberOfPeople} </h1>
            )}
            {this.state.imageProcessingStage == "image_processing" && (
              <h1> Processing the image... </h1>
            )}
          </div>
        )}
        {!this.state.isModuleLoaded && <h1>Loading all modules...</h1>}
      </div>
    )
  }
}

export default HomePage
