import React from "react";
import {Card, ListGroup} from 'react-bootstrap'

export default function OrderCard ({email, externalId}) {
    <Card style={{ width: '18rem' }}>
 
  <ListGroup variant="flush">
    <ListGroup.Item>{email}</ListGroup.Item>
    <ListGroup.Item>{externalId}</ListGroup.Item>
    
  </ListGroup>
</Card>
}