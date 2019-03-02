import React, { Component } from 'react';
import NavBar from './nav/nav'
import logo from './logo.svg';
import './App.css';
import { store } from './redux/store';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as DashboardActions from './redux/actions/dashboardActions';
import DataNavigator from './pages/datanavigator';
import EmailRender, {exampleHtml} from './components/emailrender';
class App extends Component {
  render() {
    switch (this.props.activePage) {
      case "DataNavigator": {
        var page = <DataNavigator />
        break
      }
      case 'Dashboard':{
        var page = <div><p>Dashboard page</p></div>
        break
      }
      case 'Email':{
        var page = <EmailRender><div dangerouslySetInnerHTML={{ __html: exampleHtml}} /></EmailRender>
        break
      }
    }
    console.log(this.props)
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
