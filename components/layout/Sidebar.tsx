import styled from "styled-components";

const Wrapper = styled.div`
  background-color: var(--color-grey-600);
  width: var(--sidebar-width);
`;

const Sidebar = ({ className }) => {
  return <Wrapper className={className}>Sidebar</Wrapper>;
};

export default Sidebar;
