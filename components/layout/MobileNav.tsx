import styled from "styled-components";
import { QUERIES } from "../../styles";

const Wrapper = styled.div`
  height: var(--mobile-nav-height);
  background-color: var(--color-black);
  width: 100%;
  display: none;

  @media ${QUERIES.phone} {
    display: flex;
  }
`;

const MoblieNav = () => {
  return <Wrapper>Test</Wrapper>;
};

export default MoblieNav;
