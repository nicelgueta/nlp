import React, { Component } from 'react';
import NavBar from './nav/nav'
import './App.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as DashboardActions from './redux/actions/dashboardActions';
import DataNavigator from './pages/datanavigator';

class App extends Component {
  render() {
    var page
    switch (this.props.activePage) {
      case "DataNavigator": {
        page = <DataNavigator />
        break
      }
      case 'Dashboard':{
        page = <div><p>Dashboard page</p></div>
        break
      }
      default:{
        page = <div><p>Dashboard page</p></div>
      }
    }
    return (
      <div className="App">
        <NavBar />
        {page}
      </div>
    );
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
)(App);
