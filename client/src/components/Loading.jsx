import React from "react";
import Spinner from "react-bootstrap/Spinner";
import { SpinnerCircularFixed } from "spinners-react";

const Loading = () => {
  return (
<div style={{ background: "#1C2833 ", width: "2000px", height: "100vh" }}>
       <SpinnerCircularFixed
            style={{
              marginLeft: "940px",
              fontWeight: "bold",
              marginTop: "250px",
            }}
          />
    </div>
  );
};

export default Loading;
