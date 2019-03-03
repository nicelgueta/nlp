import React, { Component } from 'react';
import NavBar from './nav/nav'
import './App.css';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as DashboardActions from './redux/actions/dashboardActions';
import DataNavigator from './pages/datanavigator';
import DataSourcing from './pages/datasourcing';
import AdHocCsvViewer from './pages/csvviewer';
import Example from './example';

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
      case 'DataSourcing':{
        page = <DataSourcing />
        break
      }
      case 'CsvViewer':{
        page = <Example />
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
