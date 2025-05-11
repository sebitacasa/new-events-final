import React from "react";
import { useState } from 'react';

export default function SumaTotalTotal({  }) {
    let [pagar, setPagar] = useState(0)

    let variable = JSON.parse(localStorage.getItem("carrito"));

    

    return (
        <div>

            <h1>Total a pagar en conjunto: {variable.map(o => o.cost * localStorage.getItem(`cantidad ${o.id}`))}</h1> 

        </div>
    )
}