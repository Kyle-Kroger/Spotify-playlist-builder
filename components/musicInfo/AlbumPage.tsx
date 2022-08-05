import styled from "styled-components";
import { useAlbumId } from "../../lib/hooks";
import { combineArtists } from "../../lib/spotify";
import { StyledButton } from "../ui";
import MusicItem from "./MusicItem";
import TrackList from "./TrackList";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const MusicItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: var(--page-gradient);
  margin-bottom: var(--spacing-sm);
  margin-top: -12px;
  margin-left: -12px;
  margin-right: -12px;
  // border-radius: var(--radius-small);
  // border: 1px solid var(--color-text-subdued);
`;

const PositionedButton = styled(StyledButton)`
  margin: var(--spacing-lg) 0;
`;

const AlbumPage = ({ id, className }) => {
  const { album, isLoading, isError } = useAlbumId(id);
  let image = { url: "" };
  let artists = "";
  if (!isLoading) {
    image = album.images[0] ? album.images[0] : { url: "" };
    artists = combineArtists(album.artists);
  }
  const handleAlbumClicked = (albumId) => {};
  const handleTrackedClicked = (trackId) => {};
  const openInNewTab = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };
  return (
    <Wrapper className={className}>
      {!isLoading && (
        <>
          <MusicItemWrapper>
            <MusicItem
              title={album.name}
              subtitle={artists}
              imageSrc={image.url}
              id={album.id}
              width="90%"
              isHeading
              onclick={handleAlbumClicked}
            />
            <PositionedButton
              state="filled"
              onClick={() => openInNewTab(album.externalUrl)}
              className=""
            >
              Open on Spotify
            </PositionedButton>
          </MusicItemWrapper>

          <TrackList
            className=""
            items={album.tracks.map((track) => {
              const newTrack = track;
              newTrack.images = album.images;
              return newTrack;
            })}
            onClick={handleTrackedClicked}
          />
        </>
      )}
    </Wrapper>
  );
};

export default AlbumPage;
