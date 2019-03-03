import React from 'react';
import Form from 'react-bootstrap/Form';


export default class SelectBar extends React.Component{
  mapOptions(){
    return this.props.options.map((item,i)=><option key={i}>{item}</option>)
  }
  render(){
    return (
      <Form.Group controlId="searchform.ControlSelect1">
        <Form.Label>{this.props.label}</Form.Label>
        <Form.Control as="select">
          {this.mapOptions()}
        </Form.Control>
      </Form.Group>
    )
  }
}
