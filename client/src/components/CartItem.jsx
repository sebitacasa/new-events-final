import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "react-use-cart";
import { FaTrash } from "react-icons/fa";
import { Image, Form } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

export default function CartItem() {
  const { addItem, removeItem, updateItemQuantity, items, totalUniqueItems } =
    useCart();
  console.log(items);
  return (
    <>
      {items.map((item) => {
        return (
          <tr key={item.id}>
            <td data-th="Tickets">
              <div class="row">
                <div class="col-md-3 text-left">
                  <Link to={`/${item.id}`}>
                    <Image
                      style={{ width: "170px", height: "100px" }}
                      src={item.image}
                      fluid={true}
                      thumbnail={true}
                      alt="img"
                      class="img-fluid d-none d-md-block rounded mb-2 shadow "
                    />
                  </Link>
                </div>

                <div class="col-md-9 text-left mt-sm-2">
                  <h4>{item.name}</h4>
                  <p style={{fontWeight: "bold"}} class="font-weight-light">Entrada General</p>
                </div>
              </div>
            </td>
            <td style={{fontWeight: "bold"}} data-th="Price">${item.itemTotal}</td>
            <td data-th="Quantity">
              <input
                type="number"
                class="form-control form-control-lg text-center"
                defaultValue={item.quantity}
                min="1"
                max={item.stock}
                value={item.quantity}
                onChangeCapture={(e) => {
                  updateItemQuantity(item.id, e.target.value);
                }}
              />
              <Form.Text style={{ color: "black", fontWeight: "bold" }} className="text">
                {item.stock} available
              </Form.Text>
            </td>
            <td class="actions" data-th="">
              <div style={{ verticalAlign: "center" }}>
                <button
                  onClick={() => {
                    removeItem(item.id);
                    console.log("remove item", item.id);
                  }}
                  style={{ color: "red" }}
                  class="btn btn-white bg-#979a9a btn-md mb-2 item-align-end"
                >
                  <FaTrash />
                </button>
              </div>
            </td>
          </tr>
        );
      })}
    </>
  );
}
