import React from "react";
import {Card, ListGroup, ListGroupItem} from "react-bootstrap"

const DetailCard = ({  description, rating, name }) => {
  return (
    
    <Card  style={{ width: "100%", background: "#f0ad4e", height: "auto",  }}>
      <ListGroup  style={{ width: "100%", background: "#f0ad4e", height: "100%"}} variant="dark">
        <ListGroup.Item style={{ width: "100%", background: "#f0ad4e", color:"#292b2c", fontWeight: "bold" }}>Nombre: {name}</ListGroup.Item>
       
        <ListGroup.Item style={{ width: "100%", background: "#f0ad4e", color:"#292b2c" , fontWeight: "bold" }} >Reseña: {description}</ListGroup.Item>
      </ListGroup>
    </Card>
    
  );
}

export default DetailCard;