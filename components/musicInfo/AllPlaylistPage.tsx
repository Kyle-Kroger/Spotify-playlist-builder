import styled from "styled-components";
import { useState, useEffect } from "react";
import { useUserPlaylists } from "../../lib/hooks";
import { helpers } from "../../styles";
import MusicItemList from "./MusicItemList";
import PlaylistFilterSort from "./PlaylistFilterSort";

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
  const [filteredList, setFilteredList] = useState([]);

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      setFilterBy(filterbarValue);
    }, 1000);
    return () => clearTimeout(timeOutId);
  }, [filterbarValue]);

  // If the filter isn't in a useEffect we get an infinite loop
  useEffect(() => {
    if (!isLoading) {
      if (filterBy.trim() !== "") {
        setFilteredList(
          playlists.filter((list) =>
            list.name.toLowerCase().includes(filterBy.toLowerCase())
          )
        );
      } else {
        setFilteredList([...playlists]);
      }
    }
  }, [filterBy, isLoading, playlists]);

  const handleFilterChange = (value) => {
    setFilterbarValue(value);
  };

  return (
    <Wrapper>
      <PlaylistFilterSort
        filterBy={filterbarValue}
        onFilter={handleFilterChange}
      />
      <PlaylistWrapper>
        {!isLoading && !showPlaylistSubpage && (
          <MusicItemList
            className=""
            items={filteredList}
            hasSubtitle
            isPlaylist
            onClick={() => {}}
          />
        )}
      </PlaylistWrapper>
    </Wrapper>
  );
};

export default AllPlaylistPage;
