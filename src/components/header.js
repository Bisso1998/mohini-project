import { Link } from "gatsby"
import PropTypes from "prop-types"
import React, { Component } from "react"

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: "Default",
    }
  }

  componentDidMount() {}

  render() {
    return (
      <header
        style={{
          background: `rebeccapurple`,
        }}
      >
        <div>
          <h1>
            <Link
              to="/"
              style={{
                color: `white`,
                textDecoration: `none`,
              }}
            >
              {this.props.title}
            </Link>
          </h1>
        </div>
      </header>
    )
  }
}

export default Header
