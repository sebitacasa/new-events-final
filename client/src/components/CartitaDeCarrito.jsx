import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa'; // Si tienes react-icons, queda mejor. Si no, usa texto.

// 1. IMPORTAR HOOK
import { useTranslation } from "react-i18next";

export default function CartitaDeCarrito({ titulo, precio, stock, imagen, numerito, id, removeItemFromCart }) {
    // 2. INICIALIZAR HOOK
    const { t } = useTranslation();

    // Nota: Inicializar con 1 suele ser mejor que 0 para un carrito, pero respeto tu lógica original
    let [contador, setContador] = useState(1); 

    const sumar = () => {
        if (contador < stock) {
            const nuevoValor = contador + 1;
            setContador(nuevoValor);
            // Actualizamos localStorage para persistencia básica
            // (Idealmente esto debería actualizar el estado global de Redux para recalcular el total general)
            localStorage.setItem(`cantidad ${id}`, nuevoValor);
        }
    }

    const restar = () => {
        if (contador > 1) {
            setContador(contador - 1);
        }
    }

    return (
        // CAMBIO IMPORTANTE: Usamos <tr> porque el padre es una <table>
        <tr className="align-middle">
            {/* COLUMNA 1: # */}
            <td>{numerito}</td>

            {/* COLUMNA 2: IMAGEN */}
            <td>
                <img 
                    src={imagen} 
                    alt={titulo} 
                    style={{ width: "60px", height: "40px", objectFit: "cover", borderRadius: "5px" }} 
                />
            </td>

            {/* COLUMNA 3: NOMBRE */}
            <td className="fw-bold text-white">
                {titulo}
            </td>

            {/* COLUMNA 4: PRECIO */}
            <td>
                ${precio}
            </td>

            {/* COLUMNA 5: CANTIDAD (CONTROLES) */}
            <td>
                <div className="d-flex justify-content-center align-items-center gap-2">
                    <Button 
                        variant="outline-warning" 
                        size="sm" 
                        onClick={restar}
                        style={{width: '30px', height: '30px', padding: '0', display: 'flex', alignItems: 'center', justifyContent: 'center'}}
                    >
                        -
                    </Button>
                    
                    <span style={{ minWidth: '20px', fontWeight: 'bold', color: 'white' }}>{contador}</span>
                    
                    <Button 
                        variant="outline-warning" 
                        size="sm" 
                        onClick={sumar}
                        style={{width: '30px', height: '30px', padding: '0', display: 'flex', alignItems: 'center', justifyContent: 'center'}}
                    >
                        +
                    </Button>
                </div>
                {/* Opcional: Mostrar stock disponible */}
                <small className="text-muted" style={{fontSize: '0.7rem'}}>
                    (Max: {stock})
                </small>
            </td>

            {/* COLUMNA 6: ELIMINAR */}
            <td>
                <Button
                    variant="danger"
                    size="sm"
                    onClick={() => removeItemFromCart(id)}
                    title={t('cart.table.remove')} // Tooltip traducido
                >
                    {/* Usamos el texto traducido o un ícono */}
                    {t('cart.table.remove')} 
                </Button>
            </td>
        </tr>
    );
}