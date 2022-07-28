import styled from "styled-components";
import { QUERIES } from "../../styles";

const Wrapper = styled.div`
  background-color: var(--color-grey-600);
  width: var(--sidebar-width);

  @media ${QUERIES.phone} {
    width: 100vw;
  }
`;

const Sidebar = ({ className }) => {
  return <Wrapper className={className}>Sidebar</Wrapper>;
};

export default Sidebar;
