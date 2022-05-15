import React from "react";
import Svg from "../Svg/Svg";
import { SvgProps } from "../Svg/types";

const Icon: React.FC<any> = ({ alt, ...props }) => {
  return <img src="/images/loader.gif" {...props} alt={alt} />;
};

export default Icon;
