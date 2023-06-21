import {
  FaPlayCircle,
  FaPauseCircle,
  FaStepForward,
  FaStepBackward,
} from "react-icons/fa";
import { BsShuffle, BsRepeat, BsRepeat1 } from "react-icons/bs";
import { HiChevronDoubleUp, HiChevronDoubleDown } from "react-icons/hi";
import styled, { css } from "styled-components";
import { QUERIES } from "../../styles";

export const PauseIcon = styled(FaPauseCircle)`
  cursor: pointer;
  transition: color 200ms ease-in-out, transform 200ms ease-in-out;

  :hover {
    transform: scale(1.05);
    color: var(--color-spotify-green);
  }
`;

export const PlayIcon = styled(FaPlayCircle)`
  cursor: pointer;
  transition: color 200ms ease-in-out, transform 200ms ease-in-out;

  :hover {
    transform: scale(1.05);
    color: var(--color-spotify-green);
  }
`;

export const ForwardIcon = styled(FaStepForward)`
  cursor: pointer;
  transition: color 200ms ease-in-out, transform 200ms ease-in-out;

  :hover {
    transform: scale(1.15);
    color: var(--color-spotify-green);
  }
`;

export const BackIcon = styled(FaStepBackward)`
  cursor: pointer;
  transition: color 200ms ease-in-out, transform 200ms ease-in-out;

  :hover {
    transform: scale(1.15);
    color: var(--color-spotify-green);
  }
`;

interface IconProps {
  $active?: boolean;
}

export const Repeat1Icon = styled(BsRepeat1)`
  cursor: pointer;
  transition: color 200ms ease-in-out, transform 200ms ease-in-out;
  color: var(--color-spotify-green);

  :hover {
    transform: scale(1.15);
    color: var(--color-spotify-green);
  }
`;

export const RepeatIcon = styled(BsRepeat)<IconProps>`
  cursor: pointer;
  transition: color 200ms ease-in-out, transform 200ms ease-in-out;

  ${(p) =>
    p.$active &&
    css`
      color: var(--color-spotify-green);
    `}

  :hover {
    transform: scale(1.15);
    color: var(--color-spotify-green);
  }
`;

export const ShuffleIcon = styled(BsShuffle)<IconProps>`
  cursor: pointer;
  transition: color 200ms ease-in-out, transform 200ms ease-in-out;

  ${(p) =>
    p.$active &&
    css`
      color: var(--color-spotify-green);
    `}

  :hover {
    transform: scale(1.15);
    color: var(--color-spotify-green);
  }
`;

export const ExpandUpIcon = styled(HiChevronDoubleUp)`
  cursor: pointer;
  transition: color 200ms ease-in-out, transform 200ms ease-in-out;

  :hover {
    transform: scale(1.15);
    color: var(--color-spotify-green);
  }
`;

export const ExpandDownIcon = styled(HiChevronDoubleDown)`
  cursor: pointer;
  transition: color 200ms ease-in-out, transform 200ms ease-in-out;

  :hover {
    transform: scale(1.15);
    color: var(--color-spotify-green);
  }
`;
