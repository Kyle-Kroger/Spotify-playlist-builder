import styled from "styled-components";
import { useState, useEffect, useCallback } from "react";
import { useUserPlaylists } from "../../lib/hooks";
import { helpers } from "../../styles";
import MusicItemList from "./MusicItemList";
import PlaylistFilterSort from "./PlaylistFilterSort";
import { sortPlaylist, SORT_ORDER } from "../../lib/spotify";
import PlaylistSubPage from "./PlaylistSubPage";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  border-left: 1px solid black;
`;

const PlaylistWrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;
  flex: 1;
  padding: 0 var(--spacing-sm);

  ${helpers.spotifySearchBar}
`;

const AllPlaylistPage = () => {
  const { playlists, isLoading, isError } = useUserPlaylists();

  const [playlistId, setPlaylistId] = useState("");
  const [showPlaylistSubpage, setShowPlaylistSubpage] = useState(false);

  // First value you is the active value in the bar
  // Second value is what accually used for filtering
  // Two values so that filtering only happens when the second changes not on every keystroke
  const [filterbarValue, setFilterbarValue] = useState("");
  const [filterBy, setFilterBy] = useState("");
  const [sortBy, setSortBy] = useState(SORT_ORDER.DEFAULT);
  const [isSortingASC, setIsSortingASC] = useState(true);
  const [filteredList, setFilteredList] = useState([]);

  const memoSortPlaylist = useCallback(
    (filterSorted) => {
      sortPlaylist(sortBy, isSortingASC, filterSorted);
    },
    [sortBy, isSortingASC]
  );

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      setFilterBy(filterbarValue);
    }, 1000);
    return () => clearTimeout(timeOutId);
  }, [filterbarValue]);

  // If the filter and sort isn't in a useEffect we get an infinite loop
  useEffect(() => {
    if (!isLoading && !showPlaylistSubpage) {
      let filteredSorted = [...playlists];
      if (filterBy.trim() !== "") {
        filteredSorted = filteredSorted.filter((list) =>
          list.name.toLowerCase().includes(filterBy.toLowerCase())
        );
      }
      if (sortBy !== SORT_ORDER.DEFAULT) {
        memoSortPlaylist(filteredSorted);
      } else if (!isSortingASC) {
        filteredSorted.reverse();
      }

      setFilteredList(filteredSorted);
    }
  }, [
    filterBy,
    sortBy,
    isSortingASC,
    isLoading,
    showPlaylistSubpage,
    playlists,
    memoSortPlaylist,
  ]);

  const handleFilterChange = (value) => {
    setFilterbarValue(value);
  };

  const handleSortChange = (value) => {
    if (value === sortBy) {
      setIsSortingASC((prev) => !prev);
    } else {
      setIsSortingASC(true);
    }
    setSortBy(value);
  };

  const handlePlaylistClicked = (id) => {
    setPlaylistId(id);
    setShowPlaylistSubpage(true);
  };

  const handleBackToAllPlaylists = () => {
    setSortBy(SORT_ORDER.DEFAULT);
    setIsSortingASC(true);
    setShowPlaylistSubpage(false);
  };

  return (
    <Wrapper>
      <PlaylistFilterSort
        filterBy={filterbarValue}
        onFilter={handleFilterChange}
        sortBy={sortBy}
        sortOrderASC={isSortingASC}
        onSort={handleSortChange}
        showSubpage={showPlaylistSubpage}
      />
      <PlaylistWrapper>
        {!isLoading && !showPlaylistSubpage && (
          <MusicItemList
            className=""
            items={filteredList}
            hasSubtitle
            isPlaylist
            onClick={handlePlaylistClicked}
          />
        )}
        {!isLoading && showPlaylistSubpage && (
          <PlaylistSubPage
            id={playlistId}
            filterBy={filterBy}
            sortBy={sortBy}
            sortASC={isSortingASC}
            onGoBack={handleBackToAllPlaylists}
          />
        )}
      </PlaylistWrapper>
    </Wrapper>
  );
};

export default AllPlaylistPage;
