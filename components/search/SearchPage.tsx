import styled from "styled-components";
import { AiOutlineClose } from "react-icons/ai";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const SearchBarWrapper = styled.div`
  background-color: var(--color-grey-900);
  padding: var(--spacing-sm) var(--spacing-md);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SearchBar = styled.input`
  font-size: var(--fz-md);
  background-color: var(--color-grey-600);
  width: 80%;
  color: white;
  -webkit-appearance: none;
  outline: none;
  border: 1px solid transparent;
  padding: var(--spacing-xs);

  ::placeholder {
    color: var(--sidebar-text-color);
  }
`;

const CloseIcon = styled(AiOutlineClose)`
  color: var(--sidebar-text-color);
`;

const HeaderButtonWrapper = styled.div``;

const SearchListWrapper = styled.div`
  overflow: auto;
  flex: 1;
`;

const FooterWrapper = styled.footer``;

const Search = () => {
  return (
    <Wrapper>
      <SearchBarWrapper>
        <SearchBar placeholder="Search..." />
        <CloseIcon size="24px" />
      </SearchBarWrapper>
      <HeaderButtonWrapper>Some Buttons</HeaderButtonWrapper>
      <SearchListWrapper>Some Songs</SearchListWrapper>
      <FooterWrapper>Footer</FooterWrapper>
    </Wrapper>
  );
};

export default Search;
