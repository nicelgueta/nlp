import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as DashboardActions from '../redux/actions/dashboardActions';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import FormControl from 'react-bootstrap/FormControl';
import Button from "react-bootstrap/Button";

class NavBar extends Component{
  render(){
    console.log('navprops ')
    console.log(this.props)
    return(
      <Navbar bg="dark" expand="lg" variant="dark">
        <Navbar.Brand onClick={()=>this.props.setPage('Dashboard')}>BAML WF Data Tool</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <DataSourcingDrop {...this.props}/>
            <AnalyticsDrop {...this.props}/>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button color="info">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

class DataSourcingDrop extends Component {
  render(){
    return(
      <NavDropdown title="Data" id="data-source-nav-dropdown">
        <NavDropdown.Item href="#action/3.1">Use Cases</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Data Table Mapping</NavDropdown.Item>
        <NavDropdown.Item onClick={()=>this.props.setPage('DataNavigator')} href="#datanavigator">Data Navigator</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item>Data Management Preferences</NavDropdown.Item>
      </NavDropdown>
    )
  }
}

class AnalyticsDrop extends Component {
  render(){
    return(
      <NavDropdown title="Training Preparation" id="data-source-nav-dropdown">
        <NavDropdown.Item href="#action/3.1">Grouping Tool</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Tagging Validation</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Iteration Manager</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">Preferences</NavDropdown.Item>
      </NavDropdown>
    )
  }
}

function mapStateToProps(state) {
  return {
    activePage: state.dashboard.activePage,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(DashboardActions, dispatch);
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar);
