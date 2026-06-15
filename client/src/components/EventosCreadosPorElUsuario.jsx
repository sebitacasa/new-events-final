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
import { useTranslation } from "react-i18next";

import ClientEvent from "./ClientEvent.jsx";
import styles from "./EventosCreados.module.css"; // Importar CSS nuevo

export default function EventosCreadosPorElUsuario() {
  const { t } = useTranslation();
  const objeto = useSelector((state) => state.eventClient);
  const loginUser = useSelector((state) => state.userLoged);

  const [openModal, setOpenModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const { user } = useAuth0();
  const dispatch = useDispatch();

  useEffect(() => {
    if(user?.sub) {
        dispatch(getUserByExternalId(user.sub));
    }
  }, [user, dispatch]);

  useEffect(() => {
    if(loginUser?.id) {
        dispatch(getEventClient(loginUser.id)).finally(() => setLoaded(true));
        return;
    }
    // Si tras unos segundos no hay usuario logueado, dejamos de mostrar el spinner.
    const timeout = setTimeout(() => setLoaded(true), 8000);
    return () => clearTimeout(timeout);
  }, [loginUser?.id, dispatch]);

  return (
    <div className={styles.containerTable}>
      <Container>
        
        {/* Título Estilizado */}
        <h2 className={styles.title}>{t('profile.createdEvents')}</h2>

        {/* Tarjeta Oscura Contenedora */}
        <div className={styles.tableCard}>
            <Table responsive hover className={styles.customTable}>
            <thead>
                <tr>
                <th>{t('profile.table.number')}</th>
                <th>{t('profile.table.name')}</th>
                <th>{t('profile.table.city')}</th>
                <th>{t('profile.table.date')}</th>
                <th>{t('profile.table.time')}</th>
                <th>{t('profile.table.stock')}</th>
                <th>{t('profile.table.price')}</th>
                <th>{t('profile.table.actions')}</th>
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
                                {t('profile.edit')}
                            </Button>
                        </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="8" className="text-center py-5">
                            {loaded ? (
                                <h5 className="text-muted">{t('profile.noEvents')}</h5>
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