import { motion } from "framer-motion";
import styled from "styled-components";

const Wrapper = styled.div`
  // padding: var(--spacing-md);
  background-color: var(--color-grey-800);
  min-width: 150px;
  border-radius: var(--radius-small);
  // prevent borders of list items from spilling over
  overflow: hidden;
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
      <List>{children}</List>
    </Wrapper>
  );
};

export default DropdownMenu;
