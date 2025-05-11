import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
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
import Footer from "./Footer/Footer";
import ClientEvent from "./ClientEvent.jsx";
import { useAuth0 } from "@auth0/auth0-react";

 
 
  

export function EventosCreadosPorElUsuario() {
  const objeto = useSelector((state) => state.eventClient);
  const loginUser = useSelector((state) => state.userLoged);
 
  

  const [openModal, setOpenModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [action, setAction] = useState(loginUser)
  const { user, isAuthenticated, loginWithPopup } = useAuth0();
 

  const dispatch = useDispatch();

  /* let MyUserId = "0630dcbd-136a-4045-98e8-5a473b8175ba"; */
  //let user = "68d5f8eb-9d21-4adf-89cc-00e09537d9cc";

  useEffect(() => {
    dispatch(getUserByExternalId(user.sub))
    dispatch(getEventClient(loginUser?.id));
    
    
  }, [user]); // aca escucha //

  
  return (
    <div style={{ background: "#f0ad4e", height: "100%" }}>
      <div style={{ background: "#f0ad4e" }}>
        <Container
          style={{ background: "#f0ad4e", height: "500px" }}
          bg="white"
          mt={5}
          mb={5}
        >
          <h2>Eventos que has creado</h2>
          <Table striped hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Nombre del evento</th>
                <th>Ciudad</th>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Cantidad de entradas</th>
                <th>Precio</th>
                <th>Necesitas cambiar algo?</th>
              </tr>
            </thead>
            <tbody>
              {objeto ? objeto?.map((data, index) => (
                <tr key={index}>
                  <td>{index}</td>
                  <td>{data?.title}</td>
                  <td>{data?.city}</td>
                  <td>{data?.date}</td>
                  <td>{data?.time}</td>
                  <td>{data?.stock}</td>
                  <td>$ {data?.cost}</td>
                  <td>
                    <Button
                      onClick={() => {
                        setOpenModal(true);
                        setModalData(data);
                      }}
                    >
                      modificar
                    </Button>
                  </td>
                  <ClientEvent
                    openModal={openModal}
                    setOpenModal={setOpenModal}
                    e={modalData}
                  />
                </tr>
              ))
            : <Spinner/>

            }
            </tbody>
          </Table>
        </Container>
      </div>

      <Footer />
    </div>
  );
}

export default EventosCreadosPorElUsuario;
