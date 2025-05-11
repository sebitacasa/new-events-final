import React from "react";
import { useState, useEffect } from "react";
import { putEventClient } from "../redux/actions/actions";
import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import styles from "./ClientEvent.module.css";

export default function ClientEvent({ openModal, setOpenModal, e }) {
  const [eventData, setEventData] = useState({
    title: "",
    city: "",
    date: "",
    stock: "",
    cost: "",
  });

  useEffect(() => {
    setEventData({
      title: e?.title,
      city: e?.city,
      date: e?.date,
      stock: e?.stock,
      cost: e?.cost,
    });
  }, []);

  const dispatch = useDispatch();
  function handleSubmit(event) {
    event.preventDefault();
    if (
      eventData.title ||
      eventData.city ||
      eventData.date ||
      eventData.stock ||
      eventData.cost
    ) {
      console.log("eee", e.UserId);
      dispatch(putEventClient(e.id, eventData));
      alert("se modificaron los datos");
      setOpenModal(false);
      setEventData({
        title: "",
        city: "",
        date: "",
        stock: "",
        cost: "",
      });
    } else {
      alert("debe modificar algun dato");
    }
  }

  function handleClose() {
    setOpenModal(false);
  }

  const handleChange = (event) => {
    setEventData({
      ...eventData,
      [event.target.name]: event.target.value,
    });
  };

  console.log("asd", e);

  return (
    <Modal show={openModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modifica tu evento</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className={styles.containerModal}>
          <label>nombre del evento</label>
          <input
            onChange={handleChange}
            name="title"
            value={eventData.title}
            placeholder={e?.title}
          />
          <label>ciudad</label>
          <input
            onChange={handleChange}
            name="city"
            value={eventData.city}
            placeholder={e?.city}
          />
          <label>fecha</label>
          <input
            onChange={handleChange}
            name="date"
            value={eventData.date}
            placeholder={e?.date}
          />
          <label>hora del evento</label>
          <input
            onChange={handleChange}
            name="time"
            value={eventData.time}
            placeholder={e?.time}
          />
          <label>cantidad</label>
          <input
            onChange={handleChange}
            name="stock"
            value={eventData.stock}
            placeholder={e?.stock}
          />
          <label>costo </label>
          <input
            onChange={handleChange}
            name="cost"
            value={eventData.cost}
            placeholder={e?.cost}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleSubmit}>Aceptar</Button>
        <Button onClick={handleClose}>Cancelar</Button>
      </Modal.Footer>
    </Modal>
  );
}
