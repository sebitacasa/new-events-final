import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "react-use-cart";
import { FaTrash } from "react-icons/fa";
import { Image } from "react-bootstrap";

// 1. IMPORTAR HOOK
import { useTranslation } from "react-i18next";

export default function CartItem() {
  // 2. INICIALIZAR HOOK
  const { t } = useTranslation();
  
  const { removeItem, updateItemQuantity, items } = useCart();

  if (items.length === 0) {
    return (
      <tr>
        <td colSpan="4" className="text-center py-4 text-white">
          {/* TRADUCCIÓN: Carrito Vacío */}
          <h5>{t('cart.empty')}</h5>
          <Link to="/" style={{ color: "#f0ad4e" }}>
            {t('cart.goShop')}
          </Link>
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
                  {/* El nombre del evento NO se traduce (viene de DB) */}
                  <h5 className="mb-0 text-white" style={{fontSize: '1rem', fontWeight: 'bold'}}>
                    {item.name}
                  </h5>
                  {/* TRADUCCIÓN: Tipo de entrada */}
                  <small className="text-muted">{t('cart.generalTicket')}</small>
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
                    onChange={(e) => {
                        const val = parseInt(e.target.value);
                        if(val > 0) updateItemQuantity(item.id, val);
                    }}
                />
              </div>
            </td>

            {/* 4. ELIMINAR */}
            <td className="text-center py-4 align-middle">
              <button
                onClick={() => removeItem(item.id)}
                className="btn btn-outline-danger btn-sm"
                title={t('cart.remove')} // Tooltip traducido
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