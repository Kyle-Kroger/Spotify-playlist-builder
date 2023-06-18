import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { QUERIES } from "../../styles";

const slideIn = keyframes`
  0% {
    height: 80px;
  }
  100% {
    height: 40%;
  }
`;

const slideOut = keyframes`
  0% {
    height: 40%;
  }
  100% {
    height: 80px;
  }
`;

interface ContainerProps {
  isOpen?: boolean;
}

const Container = styled.div<ContainerProps>`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: ${(props) => (props.isOpen ? "40%" : "80px")};
  background: var(--player-gradient);
  display: none;
  align-items: center;
  justify-content: center;
  animation: ${(props) => (props.isOpen ? slideIn : slideOut)} 0.5s ease-in-out;
  z-index: 9999;

  @media ${QUERIES.phone} {
    display: flex;
  }
`;

const MobilePlayer = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Container isOpen={isOpen}>
      <button type="button" onClick={handleButtonClick}>
        Toggle
      </button>
      <p>This is the content of the sliding div.</p>
    </Container>
  );
};

export default MobilePlayer;
