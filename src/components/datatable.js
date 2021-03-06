import React from 'react';
import MUIDataTable from "mui-datatables";
import Button from "react-bootstrap/Button";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as GroupingActions from '../redux/actions/groupingActions';
import TextField from '@material-ui/core/TextField'

  const Spinner = require('react-spinkit');
  const options = {
    filterType: 'multiselect',
    responsive: 'scroll',
  };

function getColumns(data){
  var colList = Object.keys(data[0])
  var cols = colList.map(col=>{return {
   name: col,
   label: col.toLowerCase(),
   options: {
    filter: col === 'htmlbody' ? false : true,
    sort: col === 'htmlbody' ? false : true,
   }
 }});
  //add grouping column
  cols.push({
    name: "Grouping",
    label:'grouping',
    options: {
      filter: true,
      customBodyRender: (value, tableMeta, updateValue) => {

        return (<TextField
                  value={value}
                  placeholder={'Assign Group'}
                  onChange={event => {
                    updateValue(event.target.value);
                  }}
                  />)
      }
    }})
    return cols
}

class DatatablePage extends React.Component{
  renderSpinner(){
    return (
        <div className="customSpinnerDiv">
          <div><Spinner name="pacman" color="blue" /></div>
          <br/>
          <div><Spinner name="three-bounce" color="blue" /></div>
      </div>
    )
  }
  addViewButtonToData(data){
    //adding grouping field and view button
    var newData = [];
    for(let i=0;i<data.length;i++){
      let obj = data[i];
      newData.push({...obj,htmlbody:<Button color="info" onClick={()=>this.props.setViewerContent(obj.htmlbody)}>View</Button>,Grouping:''})
    }
    return newData
  }
  renderDataTable(){
    var data = this.props.groupApiResponse;
    var cols = getColumns(data)
    console.log(cols)
    data = this.addViewButtonToData(data);
    console.log(data)
    return (<MUIDataTable
      title={this.props.useCaseTitle}
      data={data}
      columns={cols}
      options={options}
      />)
  }
  render(){
    var ret;
    if (this.props.groupApiCalling){
      ret = this.renderSpinner()
    } else if (this.props.groupApiResponse) {
      ret = this.renderDataTable()
    } else {
      ret = <h5>No data to display</h5>
    }
    return(
      <div>{ret}</div>
    )
  }
}

function mapStateToProps(state) {
  return {
    groupApiCalling:state.grouper.groupApiCalling,
    groupApiResponse:state.grouper.groupApiResponse,
    useCaseTitle:state.grouper.useCaseTitle,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(GroupingActions, dispatch);
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DatatablePage);
