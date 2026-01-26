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
        <td colSpan="4" className="text-center py-4 text-white">
          <h5>Tu carrito está vacío 😢</h5>
          <Link to="/" style={{ color: "#f0ad4e" }}>Ir a buscar eventos</Link>
        </td>
      </tr>
    );
  }

  return (
    <>
      {items.map((item) => {
        return (
          <tr key={item.id} style={{ borderBottom: "1px solid #444" }}>
            
            {/* 1. PRODUCTO (Imagen + Nombre) */}
            <td className="py-4">
              <div className="d-flex align-items-center">
                <Link to={`/${item.id}`}>
                  <Image
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: "100px",
                      height: "70px",
                      objectFit: "cover",
                      borderRadius: "5px",
                      marginRight: "15px",
                      border: "1px solid #f0ad4e"
                    }}
                  />
                </Link>
                <div>
                  <h5 className="mb-0 text-white" style={{fontSize: '1rem', fontWeight: 'bold'}}>
                    {item.name}
                  </h5>
                  <small className="text-muted">Entrada General</small>
                </div>
              </div>
            </td>

            {/* 2. PRECIO */}
            <td className="text-center py-4 text-white align-middle fw-bold">
               ${item.itemTotal}
            </td>

            {/* 3. CANTIDAD */}
            <td className="text-center py-4 align-middle">
              <div className="d-flex flex-column align-items-center">
                <input
                    type="number"
                    className="form-control text-center"
                    style={{ 
                        width: "70px", 
                        background: "#1C2833", 
                        color: "#f0ad4e",
                        border: "1px solid #555"
                    }}
                    value={item.quantity}
                    min="1"
                    // max={item.stock} // Descomenta si traes el stock real
                    onChange={(e) => {
                        const val = parseInt(e.target.value);
                        if(val > 0) updateItemQuantity(item.id, val);
                    }}
                />
                {/* <small className="text-muted mt-1">{item.stock} disp.</small> */}
              </div>
            </td>

            {/* 4. ELIMINAR */}
            <td className="text-center py-4 align-middle">
              <button
                onClick={() => removeItem(item.id)}
                className="btn btn-outline-danger btn-sm"
                title="Eliminar"
              >
                <FaTrash />
              </button>
            </td>
          </tr>
        );
      })}
    </>
  );
}