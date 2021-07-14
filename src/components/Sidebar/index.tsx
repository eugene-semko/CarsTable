import React, { FC, useEffect, useState } from "react";
import "./style.css";

type propsType = {};
const menuButtons = ["/career", "/about", "/faq"];
export const Sidebar: FC<propsType> = (props) => {
  return (
    <div className="Sidebar">
      <div className="Sidebar__buttons-wrapper">
        {menuButtons.map((item) => {
          return (
            <button key={item} className="Sidebar__button">
              {item}
            </button>
          );
        })}
      </div>
    </div>
  );
};
