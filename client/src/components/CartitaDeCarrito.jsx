import React from "react";
/* import ItemCount from "./ItemCount.js"; */
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import TotalaPagarEnCadaCartita from "./TotalAPagar";

export default function CartitaDeCarrito({ titulo, precio, stock, imagen, numerito, id, removeItemFromCart,/*  sumar, restar */  }) {
    let [contador, setContador] = useState(0)

    

    const sumar = () => {
        if (contador < stock) {
            setContador(contador + 1)
            console.log(contador, "soy el contador")
            localStorage.setItem(`cantidad ${id}`, contador);

        }
    }

    const restar = () => {
        if (contador > 1) {
            setContador(contador - 1)
        }
    }



    return (
        <div>

            <h1>key : {numerito}</h1>
            <h1>NOMBRE {titulo}</h1>
            <img src={imagen} style={{ width: "4rem" }} />
            <h2>precio {precio}</h2>
            <h3>stock {stock}</h3>

            {/* <ItemCount stock={stock} initial={0} onAdd/> */}

            <div>
                <div /* className="justify-content-md-center posCount" */>
                    <button onClick={() =>restar()}>-</button>
                    <button onClick={() => sumar()}>+</button>
                    {/* <Button variant="outline-secondary" onClick={restar()}>-</Button> */}
                    <p /* className="sepBut" */>{contador}</p>
                    {/* <Button variant="outline-secondary" onClick={sumar()}>+</Button> */}
                </div>
            </div>

            <div>
                <TotalaPagarEnCadaCartita precio={precio} cantidad={contador} />

            </div>

            <button
                onClick={() => removeItemFromCart(id)}
            >
                Remove
            </button>

        </div>
    )
}