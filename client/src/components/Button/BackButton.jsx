import React from "react"
import { LinkContainer } from "react-router-bootstrap"
import { Button } from "react-bootstrap"
import { MdArrowBackIosNew } from "react-icons/md" 

export default function BackButton(){
    return(
        <div style={{backgroundColor: "#1C2833"}}>
            <LinkContainer to="/">
                <Button variant="outline-warning">
                    <MdArrowBackIosNew style={{width: "50px"}} />
                </Button>
            </LinkContainer>
        </div>
    )
}
