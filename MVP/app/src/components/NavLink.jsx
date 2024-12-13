import React from "react";

const NavLink = ({ children, href, className, ...props }) => (
  <a
    href={href}
    {...props}
    className={`py-2.5 px-4 text-center rounded-lg duration-150 ${className || ""}`}
  >
    {children}
  </a>
);

export default NavLink;
