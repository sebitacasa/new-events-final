import React from "react";
import {
Box,
Container,
Row,
Column,
FooterLink,
Heading,
} from "./FooterStyles";
import ContactUsFinal from "../ContactUsFinal";
//import ContactUs from "../ContactUs";
//import ContactUsII from "../ContactModal";

const Footer = () => {
return (
	<div >
	<Box >
	<h1 style={{ color: " #f0ad4e ",
				textAlign: "center",
				marginTop: "-10px",
                marginBottom: "25px",
				fontWeight: "bold" }}>
		UnderEventsApp
	</h1>
	<Container>
		<Row>
		<Column>
			<Heading>Acerca de nosotros</Heading>
			<FooterLink href="/aboutUs">Acerca de nosotros</FooterLink>
		</Column>
		<Column>
			<Heading>Servicios</Heading>
			<FooterLink href="http://localhost:3000/cart">Ventas de Tickets</FooterLink>
			<FooterLink href="http://localhost:3000/createEvent">Publicitar artistas</FooterLink>
		</Column>
		<Column>
			<Heading>Contactenos</Heading>
			<FooterLink>
					<p>
						<ContactUsFinal />
					</p>
			</FooterLink>
		</Column>
		<Column>
			<Heading>Redes Sociales</Heading>
			<FooterLink href="https://es-la.facebook.com/">
			<i className="fab fa-facebook-f">
				<span style={{ marginLeft: "10px" }}>
				Facebook
				</span>
			</i>
			</FooterLink>
			<FooterLink href="https://www.instagram.com/">
			<i className="fab fa-instagram">
				<span style={{ marginLeft: "10px" }}>
				Instagram
				</span>
			</i>
			</FooterLink>
			<FooterLink href="https://twitter.com/?lang=es">
			<i className="fab fa-twitter">
				<span style={{ marginLeft: "10px" }}>
				Twitter
				</span>
			</i>
			</FooterLink>
			<FooterLink href="https://www.youtube.com/">
			<i className="fab fa-youtube">
				<span style={{ marginLeft: "10px" }}>
				Youtube
				</span>
			</i>
			</FooterLink>
		</Column>
		</Row>
	</Container>
	</Box>
	</div>
);
};
export default Footer;
