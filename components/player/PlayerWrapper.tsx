import styled, { keyframes } from "styled-components";
import { QUERIES } from "../../styles";

const slideIn = keyframes`
  0% {
    height: var(--player-height);
  }
  100% {
    height: var(--player-expand-height);
  }
`;

const slideOut = keyframes`
  0% {
    height: var(--player-expand-height);
    
  }
  100% {
    height: var(--player-height);
  }
`;

interface WrapperProps {
  isOpen?: boolean;
  playAnimation?: boolean;
}

const PlayerWrapper = styled.div<WrapperProps>`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: var(--player-height);
  background: var(--player-gradient);
  display: flex;
  justify-content: space-between;
  animation: ${(p) =>
      p.playAnimation ? (p.isOpen ? slideIn : slideOut) : "none"}
    0.8s ease-in-out;
  animation-fill-mode: both;
  z-index: 9999;

  @media ${QUERIES.phone} {
    height: ${(props) =>
      props.isOpen ? "var(--player-expand-height)" : "var(--player-height)"};
    flex-direction: column;
    align-items: center;
  }
`;

export default PlayerWrapper;
