import React from "react";
import { Carousel, Container } from "react-bootstrap";
import image1 from "../images/a8ec34ed-a379-4fe2-89e6-c10f66f1f97c.jpg";
import image2 from "../images/c873bb0b-034a-47aa-a91e-1e8cfa421b1d.jpg";
import image3 from "../images/f2140f52-0ad4-4beb-916c-7ab5e8c507f2.jpg";
// import image4 from "../images/eac7c77b-a43a-454d-8b1e-be1f71baa26e.jpg";
// import image5 from "../images/4647b209-94c4-419f-b753-c8b8db66464c.jpg";
import './carousel-overrides.css';


const imageList = [image1, image2, image3];
const uniqueImages = [...new Set(imageList)];

export default function Carousely() {
  return (
<Container fluid className="d-flex justify-content-center py-3">
  <div className="carousel-outer-wrapper">
    <Carousel className="w-100">
      {uniqueImages.map((img, index) => (
        <Carousel.Item key={index}>
          <img
            src={img}
            alt={`Slide ${index + 1}`}
            className="d-block"
          />
        </Carousel.Item>
      ))}
    </Carousel>
  </div>
</Container>


  );
}