import React from 'react';
import DatatablePage from '../components/datatable';
import { store } from '../redux/store';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as DashboardActions from '../redux/actions/dashboardActions';
import EmailRender, {exampleHtml} from '../components/emailrender';
import Button from 'react-bootstrap/Button'

class DataNavigator extends React.Component{
  constructor(props){
    super(props)
    this.state = { windowOpen:false }
  }
  componentWillUnmount(){
    this.setState({ windowOpen:false})
  }
  toggleWindow(){
    this.setState({windowOpen:!this.state.windowOpen})
  }
  render(){
    if (this.state.windowOpen){
      var emailNode = <EmailRender><div dangerouslySetInnerHTML={{ __html: exampleHtml}} /></EmailRender>
    } else {
      var emailNode = null
    }

    return(
      <div>
        <Button onClick={()=>this.toggleWindow()}>Toggle Email Viewer</Button>
        <DatatablePage />
        {emailNode}
      </div>
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
)(DataNavigator);
