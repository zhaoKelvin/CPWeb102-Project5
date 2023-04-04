import React from "react";
import { Link } from "react-router-dom";

const TextResult = ({name, state, type, id}) => {

  const linkStyle = {
    color: 'white'
  };

  return (
    <li key={name}><Link style={linkStyle} to={`/breweryDetails/${id}`} key={id}>
      <div>
        <b>Name:</b> {name}
        <b>State:</b> {state}
        <b>Type:</b> {type
        ? type
        : "Undefined"}
      </div>
    </Link>
    </li>
  );
};

export default TextResult;