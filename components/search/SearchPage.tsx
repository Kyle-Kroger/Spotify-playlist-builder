import styled from "styled-components";
import { AiOutlineClose } from "react-icons/ai";
import { StyledButton } from "../ui";
import { TrackList } from "../musicInfo";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  border-left: 1px solid black;
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

const HeaderButtonWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: var(--spacing-md) var(--spacing-sm);
  background-color: var(--color-grey-800);
`;

const SearchListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;
  flex: 1;
  padding: var(--spacing-sm);

  /* width */
  ::-webkit-scrollbar {
    width: 10px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: var(--color-grey-900);
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: var(--color-text-subdued);
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

const PositionedTrackList = styled(TrackList)`
  flex: 1;
`;

const FooterWrapper = styled.footer`
  min-height: 80px;
`;

const Search = () => {
  return (
    <Wrapper>
      <SearchBarWrapper>
        <SearchBar placeholder="Search..." />
        <CloseIcon size="24px" />
      </SearchBarWrapper>
      <HeaderButtonWrapper>
        <StyledButton state="filled">Song</StyledButton>
        <StyledButton state="outline">Artist</StyledButton>
        <StyledButton state="outline">Album</StyledButton>
      </HeaderButtonWrapper>
      <SearchListWrapper>
        <PositionedTrackList className="" />
        <FooterWrapper>Footer</FooterWrapper>
      </SearchListWrapper>
    </Wrapper>
  );
};

export default Search;
