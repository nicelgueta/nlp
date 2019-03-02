import React from 'react';
import MUIDataTable from "mui-datatables";
import Button from "react-bootstrap/Button";
import { store } from '../redux/store';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as GroupingActions from '../redux/actions/groupingActions';


  const columns = [
    {
     name: "view",
     label: "View",
     options: {
      filter: false,
      sort: false,
     }
   },
     {
    name: "name",
    label: "Name",
    options: {
     filter: true,
     sort: true,
    }
   },
   {
    name: "company",
    label: "Company",
    options: {
     filter: true,
     sort: false,
    }
   },
   {
    name: "city",
    label: "City",
    options: {
     filter: true,
     sort: false,
    }
   },
   {
    name: "state",
    label: "State",
    options: {
     filter: true,
     sort: false,
    }
   },
  ];

  const options = {
    filterType: 'checkbox',
  };

class DatatablePage extends React.Component{
  render(){
    var data = [
     {view:<Button color="info" onClick={()=>this.props.setViewerContent('<p>email1</p>')}>View</Button>, name: "John Walsh", company: "Test Corp", city: "Hartford", state: "CT" },
     {view:<Button color="info" onClick={()=>this.props.setViewerContent('<p>email2</p>')}>View</Button>, name: "Bob Herm", company: "Test Corp", city: "Tampa", state: "FL" },
     {view:<Button color="info" onClick={()=>this.props.setViewerContent('<p>email3</p>')}>View</Button>, name: "Joe James", company: "Test Corp", city: "Yonkers", state: "NY" },
     {view:<Button color="info" onClick={()=>this.props.setViewerContent('<p>email4</p>')}>View</Button>, name: "James Houston", company: "Test Corp", city: "Dallas", state: "TX" },
    ]
    return(
      <MUIDataTable
        title={"Employee List"}
        data={data}
        columns={columns}
        options={options}
        />
    )
  }
}

function mapStateToProps(state) {
  return {
    activePage: state.dashboard.activePage,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(GroupingActions, dispatch);
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DatatablePage);
