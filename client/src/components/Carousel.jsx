import React from "react";
import { Carousel, Col, Row, Container } from "react-bootstrap";
import image1 from "../images/a8ec34ed-a379-4fe2-89e6-c10f66f1f97c.jpg";
import image2 from "../images/c873bb0b-034a-47aa-a91e-1e8cfa421b1d.jpg";
import image3 from "../images/f2140f52-0ad4-4beb-916c-7ab5e8c507f2.jpg";
import image4 from "../images/eac7c77b-a43a-454d-8b1e-be1f71baa26e.jpg";
import image5 from "../images/4647b209-94c4-419f-b753-c8b8db66464c.jpg";


const imageList = [image1, image2, image3, image4, image5];

// Elimina duplicados
const uniqueImages = [...new Set(imageList)];

export default function Carousely() {
  return (
    <Container fluid>
      <Row>
        <Col>
          <Carousel style={{ height: "350px", width: "auto" }}>
            {uniqueImages.map((img, index) => (
              <Carousel.Item
                key={index}
                style={{
                  marginTop: 0,
                  height: "420px",
                  width: "75%",
                  marginLeft: "12%",
                }}
              >
                <img
                  className="d-block w-100"
                  src={img}
                  alt={`Slide ${index + 1}`}
                  style={{
                    height: "85%",
                    width: "auto",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundAttachment: "fixed",
                  }}
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>
      </Row>
    </Container>
  );
}

