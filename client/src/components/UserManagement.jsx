import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaUserEdit } from "react-icons/fa";
import NavTop from "./NavBars/Nav";
import {
  Container,
  Row,
  Table,
  Col,
  Form,
  Button,
  Modal,
} from "react-bootstrap";
import { banUser, getUsers, updateUser } from "../redux/actions/actions";
import { withAuthenticationRequired } from "@auth0/auth0-react";

import Metricas from "./Metricas"

export function UserManagement() {
  const dispatch = useDispatch();
  const [modalShow, setModalShow] = useState(false);
  const [userData, setUserData] = useState({});
  const users = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch, userData, modalShow]);

  const handleOnClick = (user) => {
    setUserData(user);
    setModalShow(true);
  };

  return (
    <div style={{background: "#1C2833 "}} >
    <>
      <NavTop />
      <Container style={{background: "#f0ad4e"}} bg="white" mt={5} mb={5}>
        <Row>
          <Col>
            <div className="p-1 py-5">
              <div className="d-flex justify-content-center align-items-center mb-3">
                <h4 className="text-right">User Management</h4>
              </div>
              <Table striped hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th> </th>
                  </tr>
                </thead>
                <tbody>
                  {users?.map((user, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{user.name}</td>
                      <td>{user.lastName}</td>
                      <td>{user.email}</td>
                      <td>{user.roll === "Admin" ? "Admin" : "User"}</td>
                      <td>{user.state ? "Banned" : "Active"}</td>
                      <td>
                        <FaUserEdit
                          size={"25px"}
                          onClick={() => {
                            console.log(user);
                            handleOnClick(user);
                          }}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Col>
        </Row>
        <MyVerticallyCenteredModal
          user={userData}
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </Container>

      <div style={{marginTop: "45px"}}><Metricas/></div>
    </>
      </div>
  );
}

function MyVerticallyCenteredModal(props) {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({});

  useEffect(() => {
    setUserData(props.user);
  }, [dispatch, props.user]);

  const handleChecked = (event) => {
    dispatch(updateUser({ state: event.target.checked }, userData.externalId));
    dispatch(banUser(userData.externalId, event.target.checked));
  };

  const handleChange = (event) => {
    dispatch(
      updateUser(
        {
          [event.target.name]: event.target.value,
        },
        userData.externalId
      )
    );
  };

  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.user.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="p-1 py-1">
          <div className="d-flex justify-content-center align-items-center mb-3">
            {/* <h4 className="text-right">User Management</h4> */}
          </div>
          <Row className="d-flex justify-content-center align-items-center mb-3">
            <Col className="mr-2" md={5} border-right>
              <h5>Banned</h5>
            </Col>
            <Col md={5} border-right>
              <Form.Check
                name="isBan"
                color="yellow"
                defaultChecked={props.user.state}
                type="switch"
                id="custom-switch"
                onChange={handleChecked}
              />
            </Col>
          </Row>
          <Row className="d-flex justify-content-center align-items-center mb-3">
            <Col className="mr-2" md={5} border-right>
              <h5>Role</h5>
            </Col>
            <Col md={5} border-right>
              <Form.Select
                name="roll"
                variant={"warning"}
                defaultValue={props.user.roll}
                onChange={handleChange}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </Form.Select>
            </Col>
          </Row>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default withAuthenticationRequired(UserManagement, {
  returnTo: "/",
});
