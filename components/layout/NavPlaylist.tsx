import { motion } from "framer-motion";
import styled from "styled-components";

const tooltipMotion = {
  rest: { opacity: 0, ease: "easeOut", duration: 0.2, type: "tween" },
  hover: {
    opacity: 1,
    transition: {
      duration: 0.4,
      type: "tween",
      ease: "easeIn",
    },
  },
};

const MotionWrapper = styled(motion.li)`
  position: relative;
`;

const Tooltip = styled(motion.div)`
  position: absolute;
  top: 0;
  text-align: center;
  padding: var(--spacing-xs);
  background-color: var(--color-grey-300);
  border-radius: 4px;
  color: white;
`;

const Playlist = styled.div<{ isDisabled: boolean }>`
  padding: var(--spacing-xs) 0;
  cursor: pointer;
  pointer-events: ${(p) => (p.isDisabled ? "none" : "all")};
  transition: color 200ms;
  color: ${(p) => (p.isDisabled ? "#424242" : "var(--color-text-subdued)")};

  :hover {
    color: white;
  }
`;

const NavPlaylist = ({ id, name, isDisabled, setPlaylistId }) => {
  const tooltipText = "Can't edit - unowned";
  return (
    <MotionWrapper initial="rest" whileHover="hover" animate="rest">
      <Playlist
        id={id}
        key={id}
        onClick={() => setPlaylistId(id)}
        isDisabled={isDisabled}
      >
        {name}
      </Playlist>
      {isDisabled && <Tooltip variants={tooltipMotion}>{tooltipText}</Tooltip>}
    </MotionWrapper>
  );
};

export default NavPlaylist;
