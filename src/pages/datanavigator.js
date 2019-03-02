import React from 'react';
import DatatablePage from '../components/datatable';
import { store } from '../redux/store';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as GroupingActions from '../redux/actions/groupingActions';
import EmailRender from '../components/emailrender';
import Button from 'react-bootstrap/Button'

class DataNavigator extends React.Component{
  render(){
    if (this.props.windowOpen){
      var emailNode = <EmailRender><div dangerouslySetInnerHTML={{ __html: this.props.windowContent}} /></EmailRender>
    } else {
      var emailNode = null
    }

    return(
      <div>
        <Button onClick={()=>this.props.toggleWindow()}>Toggle Email Viewer</Button>
        <DatatablePage />
        {emailNode}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    windowOpen: state.grouper.windowOpen,
    windowContent:state.grouper.windowContent
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(GroupingActions, dispatch);
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DataNavigator);
