import React from "react";
import styled from "styled-components";
import LogoIcon from "./LogoIcon";
import { SpinnerProps } from "./types";

const Container = styled.div`
  position: relative;
`;

const Spinner: React.FC<SpinnerProps> = ({ size = 128 }) => {
  return (
    <Container>
      <LogoIcon width={`${size}px`} />
    </Container>
  );
};

export default Spinner;
