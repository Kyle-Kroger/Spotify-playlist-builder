import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { usePlaylistId } from "../../lib/hooks";
import { sortPlaylist, SORT_ORDER } from "../../lib/spotify";
import MusicHeadingItem from "./MusicHeadingItem";
import TrackList from "./TrackList";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const PlaylistSubPage = ({ id, filterBy, sortBy, sortASC, onGoBack }) => {
  const [filteredList, setFilteredList] = useState([]);
  const { playlistData, isLoading, isError } = usePlaylistId(id);

  // filter and sort
  const memoSortPlaylist = useCallback(
    (filterSorted) => {
      sortPlaylist(sortBy, sortASC, filterSorted);
    },
    [sortBy, sortASC]
  );

  useEffect(() => {
    if (!isLoading) {
      let filteredSorted = [...playlistData.tracks];
      if (filterBy.trim() !== "") {
        filteredSorted = filteredSorted.filter((list) =>
          list.name.toLowerCase().includes(filterBy.toLowerCase())
        );
      }
      if (sortBy !== SORT_ORDER.DEFAULT) {
        memoSortPlaylist(filteredSorted);
      } else if (!sortASC) {
        filteredSorted.reverse();
      }

      setFilteredList(filteredSorted);
    }
  }, [
    isLoading,
    filterBy,
    sortBy,
    sortASC,
    playlistData.tracks,
    memoSortPlaylist,
  ]);

  return (
    <Wrapper>
      {!isLoading && (
        <>
          <MusicHeadingItem
            id={id}
            title={playlistData.name}
            subtitle={`${playlistData.owner.display_name} - ${playlistData.tracks.length} songs`}
            imageSrc={playlistData.images[0].url}
            externalUrl={playlistData.external_urls.spotify}
            onImageClick={() => {}}
            width="80%"
          />
          <TrackList
            className=""
            items={filteredList}
            showImage
            onClick={() => {}}
          />
        </>
      )}
    </Wrapper>
  );
};

export default PlaylistSubPage;
