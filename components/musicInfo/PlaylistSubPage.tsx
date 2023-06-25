import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { FiArrowLeftCircle } from "react-icons/fi";
import { usePlaylistId, useUser } from "../../lib/hooks";
import { sortPlaylist, SORT_ORDER } from "../../lib/spotify";
import MusicHeadingItem from "./MusicHeadingItem";
import TrackList from "./TrackList";
import { Loader, StyledButton } from "../ui";
import { usePageStateStore, usePlaylistStateStore } from "../../lib/store";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: var(--spacing-md);
  align-items: center;
  background-color: var(--color-black);
`;

const BackButton = styled(FiArrowLeftCircle)`
  color: var(--color-spotify-green);
  font-size: 32px;
  cursor: pointer;
`;

const LoaderWrapper = styled.div`
  padding: var(--spacing-xl);
`;

const PlaylistSubPage = ({ id, filterBy, sortBy, sortASC, onGoBack }) => {
  const [filteredList, setFilteredList] = useState([]);
  const { user, isLoading: isLoadingUser, isError: isErrorUser } = useUser();
  const { playlistData, isLoading, isError } = usePlaylistId(id);
  const setIsHidden = usePageStateStore((state) => state.setIsHidden);
  const setPlaylistId = usePlaylistStateStore((state) => state.setPlaylistId);
  const [currentUserId, setCurrentUserId] = useState("");

  useEffect(() => {
    if (!isLoadingUser && !isErrorUser) {
      setCurrentUserId(user.id);
    }
  }, [isLoadingUser, isErrorUser, user]);

  // fix in case there is no image for the playlist
  let image = { url: "" };
  if (!isLoading && !isError) {
    image = playlistData.images[0] ? playlistData.images[0] : { url: "" };
  }

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
          <ButtonWrapper>
            <BackButton onClick={onGoBack} />
            <StyledButton
              state="filled"
              isDisabled={currentUserId !== playlistData.owner.id}
              onClick={() => {
                setPlaylistId(id);
                setIsHidden(true);
              }}
            >
              Edit Playlist
            </StyledButton>
          </ButtonWrapper>
          <MusicHeadingItem
            id={id}
            title={playlistData.name}
            subtitle={`${playlistData.owner.display_name} - ${playlistData.tracks.length} songs`}
            imageSrc={image.url}
            externalUrl={playlistData.external_urls.spotify}
            onImageClick={() => {}}
            width="80%"
          />

          <TrackList
            className=""
            items={filteredList}
            showImage
            onClick={() => {}}
            playlistUri={playlistData.uri}
          />
        </>
      )}
      {isLoading && (
        <LoaderWrapper>
          <Loader />
        </LoaderWrapper>
      )}
    </Wrapper>
  );
};

export default PlaylistSubPage;
