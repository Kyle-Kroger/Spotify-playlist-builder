import styled from "styled-components";

const ListItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-sm);
  text-align: center;
  width: 100%;
  cursor: pointer;
  transition: all 200ms ease-in-out;
  &:hover {
    background-color: var(--color-grey-600);
    font-weight: 700;
  }
`;

const DropdownItem = ({ children, onClick }) => {
  return <ListItem onClick={onClick}>{children}</ListItem>;
};

export default DropdownItem;
