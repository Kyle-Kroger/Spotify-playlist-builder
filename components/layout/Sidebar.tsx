import styled from "styled-components";
import { QUERIES } from "../../styles";
import { SearchPage } from "../search";

const Wrapper = styled.div`
  background-color: var(--color-grey-600);
  width: var(--sidebar-width);

  @media ${QUERIES.phone} {
    width: 100vw;
  }
`;

const Sidebar = ({ className }) => {
  const isSearching = true;
  return (
    <Wrapper className={className}>{isSearching && <SearchPage />}</Wrapper>
  );
};

export default Sidebar;
