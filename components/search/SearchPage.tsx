import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { StyledButton } from "../ui";
import { AlbumList, ArtistList, ArtistPage, TrackList } from "../musicInfo";
import { useSearch } from "../../lib/hooks";
import { helpers } from "../../styles";

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
  padding-bottom: 0;

  ${helpers.spotifySearchBar}
`;

const PositionedTrackList = styled(TrackList)`
  flex: 1;
`;

const PositionedArtistList = styled(ArtistList)`
  flex: 1;
`;

const PositionedArtistPage = styled(ArtistPage)`
  flex: 1;
`;

const PositionedAlbumList = styled(AlbumList)`
  flex: 1;
`;

const Loading = styled.div`
  flex: 1;
`;

const FooterWrapper = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 80px;
  // border-top: 1px solid white;
  background-color: var(--color-grey-800);
  margin-left: -12px;
  margin-right: -12px;
  padding: var(--spacing-lg);
`;

const SEARCH_TYPE = {
  SONG: "track",
  ARTIST: "artist",
  ALBUM: "album",
};

const Search = () => {
  const [currentSearch, setCurrentSearch] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currSearchType, setCurrSearchType] = useState(SEARCH_TYPE.SONG);
  const [offset, setOffset] = useState("0");

  const [showSubPage, setShowSubPage] = useState(false);
  const [artistId, setArtistId] = useState("");
  const [albumId, setAlbumId] = useState("");

  const searchListTopRef = useRef(null);

  const { searchData, isLoading, isError } = useSearch(
    `${
      searchTerm !== "" ? searchTerm : " "
    }?type=${currSearchType}&offset=${offset}`
  );

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      setShowSubPage(false);
      setOffset("0");
      setSearchTerm(encodeURIComponent(currentSearch));
    }, 1000);
    return () => clearTimeout(timeOutId);
  }, [currentSearch]);

  const handleSearchBarChange = (e) => {
    setCurrentSearch(e.target.value);
  };

  const handleSearchTypeClick = (searchType) => {
    setShowSubPage(false);
    setOffset("0");
    setCurrSearchType(searchType);
  };

  const handleArtistClicked = (id) => {
    setShowSubPage(true);
    setArtistId(id);
  };

  return (
    <Wrapper>
      <SearchBarWrapper>
        <SearchBar
          type="text"
          placeholder="Search Spotify..."
          value={currentSearch}
          onChange={handleSearchBarChange}
        />
        <CloseIcon size="24px" />
      </SearchBarWrapper>
      <HeaderButtonWrapper>
        <StyledButton
          state={currSearchType === SEARCH_TYPE.SONG ? "filled" : "outline"}
          onClick={() => handleSearchTypeClick(SEARCH_TYPE.SONG)}
        >
          Song
        </StyledButton>
        <StyledButton
          state={currSearchType === SEARCH_TYPE.ARTIST ? "filled" : "outline"}
          onClick={() => handleSearchTypeClick(SEARCH_TYPE.ARTIST)}
        >
          Artist
        </StyledButton>
        <StyledButton
          state={currSearchType === SEARCH_TYPE.ALBUM ? "filled" : "outline"}
          onClick={() => handleSearchTypeClick(SEARCH_TYPE.ALBUM)}
        >
          Album
        </StyledButton>
      </HeaderButtonWrapper>
      <SearchListWrapper>
        <div ref={searchListTopRef} />
        {currSearchType === SEARCH_TYPE.SONG && !isLoading && (
          <PositionedTrackList className="" items={searchData.items} />
        )}
        {currSearchType === SEARCH_TYPE.ARTIST &&
          !isLoading &&
          !showSubPage && (
            <PositionedArtistList
              className=""
              items={searchData.items}
              onArtistClicked={handleArtistClicked}
            />
          )}
        {currSearchType === SEARCH_TYPE.ARTIST && !isLoading && showSubPage && (
          <PositionedArtistPage className="" id={artistId} />
        )}
        {currSearchType === SEARCH_TYPE.ALBUM && !isLoading && !showSubPage && (
          <PositionedAlbumList
            className=""
            items={searchData.items}
            showArtistName
          />
        )}
        {isLoading && <Loading>Loading...</Loading>}
        <FooterWrapper>
          <StyledButton
            state={searchData.prev ? "filled" : "outline"}
            isDisabled={!searchData.prev}
            onClick={() => {
              setOffset((prev) => (+prev - 50).toString());
              searchListTopRef.current.scrollIntoView();
            }}
          >
            Last Page
          </StyledButton>
          <StyledButton
            state={searchData.next ? "filled" : "outline"}
            isDisabled={!searchData.next}
            onClick={() => {
              setOffset((prev) => (+prev + 50).toString());
              searchListTopRef.current.scrollIntoView();
            }}
          >
            Next Page
          </StyledButton>
        </FooterWrapper>
      </SearchListWrapper>
    </Wrapper>
  );
};

export default Search;
