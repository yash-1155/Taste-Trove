import React from "react";
import { Link } from "react-router-dom";

function FirstCont() {
  return (
    <div className="grid w-full h-auto font-semibold text-slate-600 text-xl gap-3 ">
      <Link>Services</Link>
      <Link>Address</Link>
      <Link to="/cart">Wishlisst</Link>
      <Link>About</Link>
      <Link to="/login">Profile</Link>
      <Link>Help</Link>
    </div>
  );
}

export default FirstCont;
