import React, { FC, useEffect, useState } from "react";
import "./style.css";

type propsType = {};
export const Footer: FC<propsType> = (props) => {
  return (
    <div className="Footer">
      <a
        href={"https://github.com/eugene-semko"}
        target="_blank"
        className="Footer__title"
      >
        github.com/eugene-semko
      </a>
    </div>
  );
};
