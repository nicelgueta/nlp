import React from 'react';
import MUIDataTable from "mui-datatables";


  const Spinner = require('react-spinkit');
  const options = {
    filterType: 'multiselect',
  };

export default class RawDataTable extends React.Component{
  renderSpinner(){
    return (
        <div className="customSpinnerDiv">
          <div><p>{this.props.loadingMsg}</p></div>
          <div><Spinner name="pacman" color="blue" /></div>
          <br/>
          <div><Spinner name="three-bounce" color="blue" /></div>
      </div>
    )
  }
  renderDataTable(){
    return (<MUIDataTable
      title={this.props.title}
      data={this.props.data}
      columns={this.props.cols}
      options={options}
      />)
  }
  render(){
    var ret = this.renderDataTable()
    return(
      <div>{ret}</div>
    )
  }
}
