import React from "react";
import image from "../images/image.js";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <div>
      <Link to="/">
        <img src={image.img} alt="logo" width="75px" height="60" />
      </Link>
    </div>
  );
};

export default Logo;
