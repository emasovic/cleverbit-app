import React from "react";
import { Link } from "react-router-dom";

import { HOME, COMMENTS } from "../lib/routes";

import "./Nav.css";

const CLASS = "Nav";

export default function Nav() {
  return (
    <div className={CLASS}>
      <Link to={HOME}>Posts</Link>
      <Link to={COMMENTS}>Comments</Link>
    </div>
  );
}
