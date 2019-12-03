import React, { Component } from "react"
// import { graphql } from "gatsby"
// import axios from "axios"
import "bootstrap/dist/css/bootstrap.min.css"
import {
  Container,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap"
import HeadCount from "./headcount-module"
class HomePage extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  validate = () => {
    let userId = document.getElementById("exampleNumber").value
    let userPassword = document.getElementById("examplePassword").value
    if (userId == "1160" && userPassword == "pass123") {
      window.location = "/headcount-module"
    } else {
      alert("Incorrect Password")
    }
  }
  componentDidMount() {}

  render() {
    return (
      <div style={{ margin: "30px", padding: "30px" }}>
        <Container className="App">
          <h2>Teacher Login In</h2>
          <Form className="form">
            <Col>
              <FormGroup>
                <Label>Registration Number</Label>
                <Input
                  type="number"
                  name="number"
                  id="exampleNumber"
                  placeholder="Enter your registration number..."
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for="examplePassword">Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="examplePassword"
                  placeholder="********"
                />
              </FormGroup>
            </Col>
            <Button onClick={this.validate}>Submit</Button>
          </Form>
        </Container>{" "}
      </div>
    )
  }
}

export default HomePage
