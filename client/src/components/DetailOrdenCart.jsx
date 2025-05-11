import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "react-use-cart";
import { FaTrash } from "react-icons/fa";
import { Image, Form } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

export default function CartItemOrder() {
  const { setObj, unicosElementosFechas, dataTickets, setPrice, quantity, setLastNames, unicosElementos, AlmacenadorDeVecesRepetidas } =
    useCart();
  
  return (
    <>
      
        return (
          <tr >
            <td data-th="Tickets">
              <div class="row">
                <div class="col-md-3 text-left">
                 
                </div>

                <div class="col-md-9 text-left mt-sm-2">
                 
                  <p class="font-weight-light">Entrada General</p>
                </div>
              </div>
            </td>
            <td data-th="Price">${ setPrice}</td>
            <td data-th="Price">{ setObj}</td>
            <td data-th="Price">{ unicosElementosFechas}</td>
            <td data-th="Price">{dataTickets}</td>
            <td data-th="Price">{ quantity}</td>
            <td data-th="Price">{ setLastNames}</td>
            <td data-th="Price">{ unicosElementos}</td>
            <td data-th="Price">{ AlmacenadorDeVecesRepetidas}</td>
            <td data-th="Quantity"></td>
            
             
            <td class="actions" data-th="">
              <div style={{ verticalAlign: "center" }}>
                {/* <button
                  onClick={() => {
                    removeItem(item.id);
                    console.log("remove item", item.id);
                  }}
                  style={{ color: "red" }}
                  class="btn btn-white bg-#979a9a btn-md mb-2 item-align-end"
                >
                  <FaTrash />
                </button> */}
              </div>
            </td>
          </tr>
        );
     
    </>
  );
}