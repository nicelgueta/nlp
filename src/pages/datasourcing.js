import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';


export default class DataSourcing extends React.Component{
  render(){
    const mappedTables = [{tableName:'fx_master',stage: 'parsed master',useCase: 'FX NETTING'},{tableName:'fx_groupg',stage: 'tagged data',useCase: 'FX NETTING'}]
    return(
      <div className="sectionContainer">
        <Card style={{ width: "85%", alignSelf:'center' }}>
          <Card.Body>
            <Card.Title>Email Data Analysis - Data Table Mapping</Card.Title>
            <Card.Text>
              The table mapper keeps track of the tables in the DB that we are using for a certain use case, throughout
              data analysis lifecycle from first parsing, through to training set preparation.
            </Card.Text>
          </Card.Body>
          <div className="sectionRow">
            <Card style={{ width: "50%", alignSelf:'center' }}>
              <Card.Body>
                <Card.Title>Currently mapped tables</Card.Title>
                <Card.Text>
                  Below you will find all the tables that have been currently mapped to a certain stage for each use case.
                </Card.Text>
                <div>
                  <ListGroup>
                    {mappedTables.map((o,i)=>(
                      <ListGroup.Item variant="info" key={i}>
                        {'  '+o.tableName+'  '}<Badge pill variant="info">{o.stage}</Badge><Badge pill variant="info">{o.useCase}</Badge>
                      </ListGroup.Item>))}
                  </ListGroup>
              </div>
              </Card.Body>
            </Card>
            <Card style={{ width: "50%", alignSelf:'center' }}>
              <Card.Body>
                <Card.Title>Create new table mapping</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up the bulk of
                  the card's content.
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card>
          </div>
        </Card>
      </div>
    )
  }
}
