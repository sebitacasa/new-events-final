import React from "react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getByTitle } from "../redux/actions/actions";
import scrollToCards from "./ScrollButtom/scrollToCars";

import {  FormControl, Form, Button, Col, Container, Row } from "react-bootstrap";

export default function Searchbar() {
    const [name, setName] = useState("");
    const [buscador, setBuscador] = useState("");

    const [filterSearchbar, setFilterSearchbar] = useState("");

    const dispatch = useDispatch();

    function handleInput(e) {
        e.preventDefault(e);
        setName(e.target.value);
        window.localStorage.setItem('searchbar', e.target.value)
        window.localStorage.setItem('filtro', "searchbar")
        setBuscador("");
        /* console.log("soy el searchbar") */
    }

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(getByTitle(localStorage.getItem('searchbar')));
        /* dispatch(getByTitle(name)); */
        /* console.log("soy el handlesubmit") */
    }

    return (
        
<Form style={{gap:"5px"}} onSubmit={(e) => handleSubmit(e)} onChange={(e) => handleInput(e)} className="d-flex">
    <Form.Control style={{width: "auto", height: "37px", marginTop: "1px",}}
    type="text"
    
  /> 
            <Button style={{ height: "auto", }} type="submit" onClick={() => scrollToCards()}  variant="outline-warning">Search</Button>
        </Form>
        
    )
}