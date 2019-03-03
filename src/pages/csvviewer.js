import React from 'react';
import EmailRender from '../components/emailrender';
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import {getAsText} from '../common/readcsv';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as GroupingActions from '../redux/actions/groupingActions';
import RawDataTable from '../components/rawdatatable';

const axios = require('axios');

function handleFiles() {
  // Check for the various File API support.
  if (window.FileReader) {
    // FileReader are supported.
    var fs = document.getElementById('customFile').files;
    var f = fs[0]
    document.getElementById('fileInput').innerHTML = f.name
    getAsText(f)
  } else {
    alert('FileReader are not supported in this browser.');
  }
}
function getColumns(data,colsToView){
  var colList = Object.keys(data[0])
  var cols = colList.map(col=>{return {
   name: col,
   label: col.toLowerCase(),
   options: {
    filter: colsToView.indexOf(col) > -1 ? false : true,
    sort: colsToView.indexOf(col) > -1 ? false : true,
   }
 }})
    return cols
}
class AdHocCsvViewer extends React.Component{
  constructor(props){
    super(props)
    this.state = {ready:false,csvData:null,cols:null,title:null,uploaded:false}
  }
  addViewButtonToData(data,field){
    var newData = [];
    for(let i=0;i<data.length;i++){
      let obj = data[i];
      let newObj = {...obj};
      newObj[field] = <Button color="info" onClick={()=>this.props.setViewerContent(obj[field])}>View</Button>;
      newData.push(newObj)
    }
    return newData
  }
  csvToJson(){
    let json = this.state.csvData;
    let newValues = document.getElementById("colsSelect").selectedOptions;
      newValues = Array.prototype.slice.call(newValues)
      newValues = newValues.map(o=>o.value)
      var cols = getColumns(json,newValues)
      for (let i=0;i<newValues.length;i++){
        json = this.addViewButtonToData(json,newValues[i])
      }
    this.setState({ready:true,csvData:json,cols:cols,title:document.getElementById('fileInput').innerHTML,uploaded:true})
  }
  uploadCsv(){
    var formData = new FormData();
    formData.append('csvFile',document.getElementById('customFile').files[0]);
    axios.post('http://127.0.0.1:5000/getcsvjson',formData,{headers:{'Content-Type': 'multipart/form-data'}})
    .then(function (response) {
      // handle success
      console.log(response);
      this.setState({ready:false,csvData:JSON.parse(response.data),cols:null,title:document.getElementById('fileInput').innerHTML,uploaded:true})
    }.bind(this))
    .catch(function (error) {
      // handle error
      console.log(error);
    });
  }
  renderColumnChoice(){
    var columns = Object.keys(this.state.csvData[0]);
    console.log(columns)
    return (
      <div className="sectionElement">
        <Card>
          <Card.Body>
            <Card.Title>HTML Columns</Card.Title>
            <Form.Group controlId="colsSelect">
              <Form.Label>Please mark the columns which contain HTML bodies to view in the email viewer</Form.Label>
              <Form.Control as="select" multiple>
                {columns.map((o,i)=><option key={i}>{o}</option>)}
              </Form.Control>
            </Form.Group>
          </Card.Body>
          <Card.Footer>
            <Card.Link>
              <div className="sectionRow">
                <div className="sectionElement">
                  <Button block variant="outline-primary" onClick={()=>this.csvToJson()}>Process</Button>
                </div>
              </div>
            </Card.Link>
          </Card.Footer>
        </Card>
      </div>
    )
  }
  render(){
    var emailNode;
    var openButton;
    if (this.props.windowOpen){
      emailNode = <EmailRender><div dangerouslySetInnerHTML={{ __html: this.props.windowContent}} /></EmailRender>
      openButton = <Button block disabled variant="outline-secondary" >Email Viewer open</Button>
    } else {
      emailNode = null
      openButton = <Button block variant="outline-success" onClick={()=>this.props.toggleWindow()}>Open HTML Viewer</Button>
    }
    var choiceRender = this.state.uploaded ? this.renderColumnChoice() : null ;
    var dataTable = this.state.ready ? <RawDataTable data={this.state.csvData} cols={this.state.cols} title={this.state.title}/> : 'No data to display';
    return(
      <div className="sectionContainer">
        <div className="sectionRow">
          <div className="sectionElement">
            <Card>
              <Card.Body>
                <Card.Title>CSV Analysis</Card.Title>
                <p>This tool will help you analyse any csv that has tagged/non tagged HTML which you wish to quickly render to the viewer</p>
                Please select the CSV file you which to analyse..
                <div className="custom-file">
                  <input type="file" className="custom-file-input" id="customFile" onChange={()=>handleFiles()} accept=".csv"></input>
                  <label id="fileInput" name="filename" className="custom-file-label" htmlFor="customFile">Choose csv..</label>
                  <input name="filetxt" id="fileTextInput" hidden type="text"></input>
                </div>
              </Card.Body>
              <Card.Footer>
                <Card.Link>
                  <div className="sectionRow">
                    <div className="sectionElement">
                      <Button block variant="outline-primary" onClick={()=>this.uploadCsv()}>Upload</Button>
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
          <div className="sectionElement">
            {choiceRender}
          </div>
          <div className="sectionElement" />
      </div>
      <div>
        {dataTable}
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
)(AdHocCsvViewer);
