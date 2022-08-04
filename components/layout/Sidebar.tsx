import styled from "styled-components";
import { SIDEBAR_PAGE, usePageStateStore } from "../../lib/store";
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
  const currentPage = usePageStateStore((state) => state.currentPage);
  return (
    <Wrapper className={className}>
      {currentPage === SIDEBAR_PAGE.SEARCH && <SearchPage />}
    </Wrapper>
  );
};

export default Sidebar;
