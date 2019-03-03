import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as DashboardActions from '../redux/actions/dashboardActions';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';;

class NavBar extends Component{
  render(){
    return(
      <Navbar bg="dark" expand="lg" variant="dark">
        <Navbar.Brand onClick={()=>this.props.setPage('Dashboard')}>BAML WF Data Tool</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <DataSourcingDrop {...this.props}/>
            <AnalyticsDrop {...this.props}/>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

class DataSourcingDrop extends Component {
  render(){
    return(
      <NavDropdown title="Data" id="data-source-nav-dropdown">
        <NavDropdown.Item onClick={()=>this.props.setPage('CsvViewer')}>CSV Viewer</NavDropdown.Item>
        <NavDropdown.Item onClick={()=>this.props.setPage('DataSourcing')}>Data Table Mapping</NavDropdown.Item>
      </NavDropdown>
    )
  }
}

class AnalyticsDrop extends Component {
  render(){
    return(
      <NavDropdown title="Training/Test SetPreparation" id="data-source-nav-dropdown">
        <NavDropdown.Item onClick={()=>this.props.setPage('DataNavigator')}>Grouping Tool</NavDropdown.Item>
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
