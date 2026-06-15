import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "react-use-cart";
import { FaTrash } from "react-icons/fa";
import { Image } from "react-bootstrap";

// 🔥 ESTA ES LA LÍNEA QUE FALTABA Y ROMPÍA TODO:
import { useTranslation } from "react-i18next";
import fallbackImage from "../images/imagen-set.jpg";

export default function CartItem() {
  // Inicializamos el hook
  const { t } = useTranslation();
  
  const { removeItem, updateItemQuantity, items } = useCart();

  if (items.length === 0) {
    return (
      <tr>
        {/* Texto oscuro para que se vea en fondo amarillo */}
        <td colSpan="4" className="text-center py-4 text-dark">
          <h5>{t('cart.empty')}</h5>
          <Link to="/" className="btn btn-dark mt-2" style={{ color: "#f0ad4e" }}>
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
          <tr key={item.id} style={{ borderBottom: "1px solid rgba(0,0,0,0.2)" }}> 
            
            {/* 1. PRODUCTO */}
            <td className="py-4">
              <div className="d-flex align-items-center">
                <Link to={`/${item.id}`}>
                  <Image
                    src={item.image}
                    alt={item.name}
                    onError={(e) => { e.target.onerror = null; e.target.src = fallbackImage; }}
                    style={{
                      width: "100px",
                      height: "70px",
                      objectFit: "cover",
                      borderRadius: "10px",
                      marginRight: "15px",
                      border: "2px solid #212529"
                    }}
                  />
                </Link>
                <div>
                  {/* Color negro explícito para el nombre */}
                  <h5 className="mb-0" style={{fontSize: '1rem', fontWeight: 'bold', color: '#212529'}}>
                    {item.name}
                  </h5>
                  <small className="text-muted" style={{color: '#444', fontWeight: 'bold'}}>
                    {t('cart.generalTicket')}
                  </small>
                </div>
              </div>
            </td>

            {/* 2. PRECIO (Texto negro) */}
            <td className="text-center py-4 align-middle fw-bold" style={{color: '#212529', fontSize: '1.2rem'}}>
               ${item.itemTotal}
            </td>

            {/* 3. CANTIDAD */}
            <td className="text-center py-4 align-middle">
              <div className="d-flex flex-column align-items-center">
                <input
                    type="number"
                    className="form-control text-center"
                    // Input oscuro para contraste elegante
                    style={{ 
                        width: "70px", 
                        background: "#212529", 
                        color: "#f0ad4e",
                        border: "1px solid #555",
                        fontWeight: 'bold'
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
                className="btn btn-danger btn-sm"
                title={t('cart.remove')}
                style={{
                    borderRadius: '50%', 
                    width: '35px', 
                    height: '35px', 
                    padding: 0, 
                    display:'flex', 
                    alignItems:'center', 
                    justifyContent:'center'
                }}
              >
                <FaTrash color="white"/>
              </button>
            </td>
          </tr>
        );
      })}
    </>
  );
}