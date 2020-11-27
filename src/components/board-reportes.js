import React, { Component } from "react";
import Grilla from './Gridejemplo';

import Grilla2 from './Gridejemplo2'
import UserService from "../services/user.service";
import Tabla from './Tabla'
export default class BoardReportes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
      hidden: true
    };
  }

  componentDidMount() {
 
   
  } 

  render() {
    return (
    
        <div hidden={false}>
        
        <Grilla2></Grilla2>
        </div>
     
    );
  }
}