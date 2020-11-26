import React, { Component } from "react";
import Grilla from './Gridejemplo';
import Grilla1 from './Gridejemplo1';
import Grilla2 from './TablaAbono'
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
 
   /* UserService.getUserBoard().then(
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
    );*/
  } 

  render() {
    return (
    
        <div hidden={false}>
        
        <Grilla2></Grilla2>
        </div>
     
    );
  }
}
