import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";
import BoardReportes from "./components/board-reportes"
import {Navbar,Nav} from 'react-bootstrap'
import '@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css';
import Escuela from "./components/Escuela";
import GrillaEscuela from "./components/GrillaEscuela";
class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
  }

  logOut() {
    AuthService.logout();
  }

  render() {
    const { currentUser, showModeratorBoard, showAdminBoard } = this.state;

    return (
      
        <>
        <Navbar collapseOnSelect expand="lg" className="bg-color" variant="light">
        <Navbar.Brand href="#home">Secretaria de Educación </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
        <Nav.Link href="/home">Home</Nav.Link>
        
            {showModeratorBoard && (
              
              <Nav.Link href="/mod">Moderator Board</Nav.Link>
              
            )}

            {showAdminBoard && (
              <Nav.Link href="/admin">Admin</Nav.Link>
              
            )}

            {showAdminBoard && (
              <Nav.Link href="/user">Crear/Editar Profesor</Nav.Link>
              
            )}
             {currentUser && (
              <Nav.Link href="/reporte">Reportes Profesor</Nav.Link>
              
            )}
             {showAdminBoard && (
              <Nav.Link href="/escuela">Crear/Editar Escuela</Nav.Link>
              
            )}
            
             {currentUser && (
              <Nav.Link href="/reporteescuela">Reportes Escuela</Nav.Link>
              
            )}
    </Nav>
    
           
          {currentUser ? (
              <Nav>
                {showAdminBoard && (
              <Nav.Link href="/profile">{currentUser.username}</Nav.Link>)}
              <Nav.Link href="/login" onClick={this.logOut}>LogOut</Nav.Link>
              </Nav>
          ) : (
            <Nav>
            <Nav.Link href="/login" >Login</Nav.Link>
            <Nav.Link href="/register" >Sign Up</Nav.Link>
            </Nav>
          )}
          
    
  </Navbar.Collapse>
</Navbar>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/user" component={BoardUser} />
            <Route path="/mod" component={BoardModerator} />
            <Route path="/admin" component={BoardAdmin} />
            <Route path="/reporte" component={BoardReportes} />
            <Route path="/escuela" component={Escuela} />
            <Route path="/reporteescuela" component={GrillaEscuela} />
          </Switch>
        </div>
      </>
    );
  }
}

export default App;
