import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useAuth0 } from "@auth0/auth0-react";
import {
  getEventClient,
  getUserByExternalId
} from "../redux/actions/actions";
import {
  Container,
  Button,
  Table,
  Spinner
} from "react-bootstrap";

import ClientEvent from "./ClientEvent.jsx";
import styles from "./EventosCreados.module.css"; // Importar CSS nuevo

export default function EventosCreadosPorElUsuario() {
  const objeto = useSelector((state) => state.eventClient);
  const loginUser = useSelector((state) => state.userLoged);
  
  const [openModal, setOpenModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  const { user } = useAuth0();
  const dispatch = useDispatch();

  useEffect(() => {
    if(user?.sub) {
        dispatch(getUserByExternalId(user.sub));
    }
    if(loginUser?.id) {
        dispatch(getEventClient(loginUser.id));
    }
  }, [user, loginUser?.id, dispatch]);

  return (
    <div className={styles.containerTable}>
      <Container>
        
        {/* Título Estilizado */}
        <h2 className={styles.title}>Eventos que has creado</h2>
        
        {/* Tarjeta Oscura Contenedora */}
        <div className={styles.tableCard}>
            <Table responsive hover className={styles.customTable}>
            <thead>
                <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Ciudad</th>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Stock</th>
                <th>Precio</th>
                <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {objeto && objeto.length > 0 ? (
                    objeto.map((data, index) => (
                        <tr key={index}>
                        <td>{index + 1}</td>
                        <td style={{fontWeight: 'bold', color: '#f0ad4e'}}>{data?.title}</td>
                        <td>{data?.city}</td>
                        <td>{data?.date}</td>
                        <td>{data?.time}</td>
                        <td>{data?.stock}</td>
                        <td>${data?.cost}</td>
                        <td>
                            <Button
                                className={styles.btnEdit}
                                size="sm"
                                onClick={() => {
                                    setOpenModal(true);
                                    setModalData(data);
                                }}
                            >
                                Modificar
                            </Button>
                        </td>
                        
                        {/* El componente ClientEvent debe estar fuera del loop o controlado */}
                        {/* NOTA: ClientEvent (el modal) debería renderizarse una sola vez fuera del map, 
                            pasándole 'modalData'. Si lo pones aquí, renderizas N modales invisibles.
                            Lo moveré abajo del Table para optimizar.
                        */}
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="8" className="text-center py-5">
                            {objeto ? (
                                <h5 className="text-muted">Aún no has creado eventos.</h5>
                            ) : (
                                <div className={styles.spinnerContainer}>
                                    <Spinner animation="border" variant="warning" />
                                </div>
                            )}
                        </td>
                    </tr>
                )}
            </tbody>
            </Table>
        </div>

        {/* Modal de Edición (Renderizado condicional una sola vez) */}
        {openModal && (
            <ClientEvent
                openModal={openModal}
                setOpenModal={setOpenModal}
                e={modalData}
            />
        )}

      </Container>
    </div>
  );
}