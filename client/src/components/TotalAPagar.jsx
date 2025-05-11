import React from "react";
import { useState } from 'react';

export default function TotalaPagarEnCadaCartita({ precio, cantidad }) {

    let suma= precio * cantidad


    return (
        <div>

            <h1>Total a pagar por este evento: {suma}</h1>

        </div>
    )
}