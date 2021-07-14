import React, { FC, useEffect, useState } from "react";
import "./style.css";

type propsType = {};
export const Header: FC<propsType> = (props) => {
  return (
    <div className="Header">
      <button className="Header__logo">_citymobil</button>
    </div>
  );
};
