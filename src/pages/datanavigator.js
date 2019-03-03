import React from 'react';
import DatatablePage from '../components/datatable';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as GroupingActions from '../redux/actions/groupingActions';
import EmailRender from '../components/emailrender';
import Button from 'react-bootstrap/Button'
import SelectBar from '../components/selectbar';
import Card from 'react-bootstrap/Card';


class DataNavigator extends React.Component{

  getData(){
    this.props.callGroupApi()
    fetch('http://127.0.0.1:5000/get2').then((response)=>{return response.json()}).then(myJson=>{this.props.setGroupResponse(myJson)})
  }
  render(){
    var emailNode;
    var viewerStatus;
    var toggleColour;
    if (this.props.windowOpen){
      emailNode = <EmailRender><div dangerouslySetInnerHTML={{ __html: this.props.windowContent}} /></EmailRender>
    } else {
      emailNode = null
    }
    viewerStatus = this.props.windowOpen ? "Close" : "Open";
    toggleColour = this.props.windowOpen ? "danger" : "success";
    return(
      <div className="sectionContainer">
        <div className="sectionRow">
          <div className="sectionElement">
            <Card>
              <Card.Body>
                <Card.Title>Select use case data...</Card.Title>
                <SelectBar options={['datasource1','datasource2','datasource3']} />
              </Card.Body>
              <Card.Footer>
                <Card.Link>
                  <Button variant="outline-primary" onClick={()=>this.getData()}>Get Data</Button>
                </Card.Link>
                <Card.Link>
                  <Button variant={"outline-"+toggleColour} onClick={()=>this.props.toggleWindow()}>{viewerStatus+' Email Viewer'}</Button>
                </Card.Link>  
              </Card.Footer>
            </Card>
          </div>
          <div className="sectionElement" />
          <div className="sectionElement" />
      </div>
      <div>
        <DatatablePage data={this.props.groupApiResponse}/>
      </div>
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
