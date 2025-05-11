import React from "react";
import { Card } from "react-bootstrap"
import { BsGithub, BsLinkedin } from "react-icons/bs"
import styles from "./AboutUs.module.css"

export default function AboutUsCard({ name, birthDay, description, image, github, linkedIn }){
    console.log(linkedIn)
    return(
        <div>
            <Card bg="dark" text="light" style={{ width: '18rem' }}>
            <Card.Img variant="top" src="https://static.vecteezy.com/system/resources/previews/002/318/271/original/user-profile-icon-free-vector.jpg" />
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Text>
                    {description}
                </Card.Text>
                <Card.Text>
                    {birthDay}
                </Card.Text>
            </Card.Body>
            <Card.Body>
            <div className={styles.icon}>
                <a href={"https://github.com/" + github}>
                    <BsGithub />
                </a>
                <a href={"https://www.linkedin.com/in/" + linkedIn} className={styles.icon}>
                    <BsLinkedin />
                </a>
            </div>
            </Card.Body>
            </Card>
        </div>
    )
}