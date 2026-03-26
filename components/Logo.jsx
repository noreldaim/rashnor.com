import React, { memo } from "react";
const Logo = memo(() => {
  return (
    <div>
      <img
        src={"images/logo.svg"}
        alt="Logo"
        className="fixed z-10 w-36 left-5 top-5 cursor-pointer"
      ></img>
    </div>
  );
});

export default Logo;
