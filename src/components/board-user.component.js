import React, { Component } from "react";
import Grilla from './Gridejemplo';
import Grilla1 from './Gridejemplo1';
import UserService from "../services/user.service";
import Tabla from './Tabla'
export default class BoardUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
      hidden: true
    };
  }

  componentDidMount() {
    UserService.getUserBoard().then(
      response => {
        this.setState({
          content: response.data,
          hidden: false
        });
      },
      error => {
        this.setState({
          hidden:true,
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  render() {
    return (
      <div className="container">
        <header className="jumbotron">
          <h3>{this.state.content}</h3>
        </header>
        <div hidden={this.state.hidden}>
        <Grilla1></Grilla1>
        </div>
      </div>
    );
  }
}
