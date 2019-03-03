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
    fetch('http://127.0.0.1:5000/getd').then((response)=>{return response.json()}).then(myJson=>{this.props.setGroupResponse(myJson)})
    this.props.setUseCaseTitle('FX Emails')
  }
  render(){
    var emailNode;
    var openButton;
    if (this.props.windowOpen){
      emailNode = <EmailRender><div dangerouslySetInnerHTML={{ __html: this.props.windowContent}} /></EmailRender>
      openButton = <Button block disabled variant="outline-secondary" >Email Viewer open</Button>
    } else {
      emailNode = null
      openButton = <Button block variant="outline-success" onClick={()=>this.props.toggleWindow()}>Open Email Viewer</Button>
    }

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
                  <div className="sectionRow">
                    <div className="sectionElement">
                      <Button block variant="outline-primary" onClick={()=>this.getData()}>Get Data</Button>
                    </div>
                    <div className="sectionElement">
                      {openButton}
                    </div>
                  </div>
                </Card.Link>
                <Card.Link>
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
