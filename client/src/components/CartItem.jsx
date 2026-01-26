import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "react-use-cart";
import { FaTrash } from "react-icons/fa";
import { Image } from "react-bootstrap";

export default function CartItem() {
  const { removeItem, updateItemQuantity, items } = useCart();

  if (items.length === 0) {
    return (
      <tr>
        <td colSpan="4" className="text-center py-4 text-dark">
          <h5>Tu carrito está vacío 😢</h5>
          <Link to="/" className="fw-bold text-dark" style={{textDecoration: 'underline'}}>
            Ir a buscar eventos
          </Link>
        </td>
      </tr>
    );
  }

  return (
    <>
      {items.map((item) => {
        return (
          <tr key={item.id} style={{ borderBottom: "1px solid rgba(0,0,0,0.2)" }}>
            
            {/* 1. PRODUCTO */}
            <td className="py-3">
              <div className="d-flex align-items-center">
                <Link to={`/${item.id}`}>
                  <Image
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: "80px",
                      height: "60px",
                      objectFit: "cover",
                      borderRadius: "5px",
                      marginRight: "15px",
                      border: "1px solid black"
                    }}
                  />
                </Link>
                <div>
                  {/* Texto NEGRO para fondo AMARILLO */}
                  <h6 className="mb-0 text-dark fw-bold text-uppercase">
                    {item.name}
                  </h6>
                  <small className="text-dark">Entrada General</small>
                </div>
              </div>
            </td>

            {/* 2. PRECIO (Negro) */}
            <td className="text-center py-3 text-dark align-middle fw-bold">
               ${item.itemTotal}
            </td>

            {/* 3. CANTIDAD */}
            <td className="text-center py-3 align-middle">
              <div className="d-flex justify-content-center">
                <input
                    type="number"
                    className="form-control text-center"
                    // 🔥 INPUT OSCURO CON NUMERO BLANCO
                    style={{ 
                        width: "60px", 
                        background: "#212529", 
                        color: "white", 
                        border: "1px solid black",
                        fontWeight: "bold"
                    }}
                    value={item.quantity}
                    min="1"
                    onChange={(e) => {
                        const val = parseInt(e.target.value);
                        if(val > 0) updateItemQuantity(item.id, val);
                    }}
                />
              </div>
            </td>

            {/* 4. ELIMINAR */}
            <td className="text-center py-3 align-middle">
              <button
                onClick={() => removeItem(item.id)}
                className="btn btn-sm btn-danger"
                title="Eliminar"
                style={{border: "1px solid black"}}
              >
                <FaTrash color="white" />
              </button>
            </td>
          </tr>
        );
      })}
    </>
  );
}