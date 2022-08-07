import { motion } from "framer-motion";
import styled from "styled-components";

const Wrapper = styled.div`
  padding: var(--spacing-sm);
  background-color: var(--color-grey-800);
  width: 300px;
`;

const DropdownMenu = ({ children, className }) => {
  return (
    <Wrapper
      as={motion.div}
      className={className}
      key="modal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </Wrapper>
  );
};

export default DropdownMenu;
