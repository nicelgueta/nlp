import React from 'react';
import DatatablePage from '../components/datatable';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as GroupingActions from '../redux/actions/groupingActions';
import EmailRender from '../components/emailrender';
import Button from 'react-bootstrap/Button'

class DataNavigator extends React.Component{

  getData(){
    this.props.callGroupApi()
    fetch('http://127.0.0.1:5000/get').then((response)=>{return response.json()}).then(myJson=>{this.props.setGroupResponse(myJson)})
  }
  render(){
    var emailNode;
    if (this.props.windowOpen){
      emailNode = <EmailRender><div dangerouslySetInnerHTML={{ __html: this.props.windowContent}} /></EmailRender>
    } else {
      emailNode = null
    }
    return(
      <div>
        <Button onClick={()=>this.props.toggleWindow()}>Toggle Email Viewer</Button>
        <Button onClick={()=>this.getData()}>Get data</Button>
        <DatatablePage data={this.props.groupApiResponse}/>
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
