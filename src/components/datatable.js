import React from 'react';
import MUIDataTable from "mui-datatables";
import Button from "react-bootstrap/Button";

  const columns = [
    {
     name: "view",
     label: "View"
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

  const data = [
   {view:<Button color="info">View</Button>, name: "John Walsh", company: "Test Corp", city: "Hartford", state: "CT" },
   {view:<Button color="info">View</Button>, name: "Bob Herm", company: "Test Corp", city: "Tampa", state: "FL" },
   {view:<Button color="info">View</Button>, name: "Joe James", company: "Test Corp", city: "Yonkers", state: "NY" },
   {view:<Button color="info">View</Button>, name: "James Houston", company: "Test Corp", city: "Dallas", state: "TX" },
  ];

  const options = {
    filterType: 'checkbox',
  };

class DatatablePage extends React.Component{
  render(){
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

export default DatatablePage;
