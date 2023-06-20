/* eslint-disable camelcase */
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
  playAnimation?: boolean;
}

const Container = styled.div<ContainerProps>`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: ${(props) => (props.isOpen ? "40%" : "80px")};
  background: var(--player-gradient);
  display: none;
  align-items: flex-start;
  justify-content: center;
  animation: ${(p) =>
      p.playAnimation ? (p.isOpen ? slideIn : slideOut) : "none"}
    0.5s ease-in-out;
  animation-fill-mode: both;
  z-index: 9999;

  @media ${QUERIES.phone} {
    display: flex;
  }
`;

const MobilePlayer = ({ current_track }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [playAnimation, setPlayAnimation] = useState(false);

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
    setPlayAnimation(true);
  };

  return (
    <Container
      isOpen={isOpen}
      playAnimation={playAnimation}
      onAnimationEnd={() => setPlayAnimation(false)}
    >
      <button type="button" onClick={handleButtonClick}>
        Toggle
      </button>
      <p>This is the content of the sliding div.</p>
    </Container>
  );
};

export default MobilePlayer;
