import styled from "styled-components";
import { useAlbumId } from "../../lib/hooks";
import { combineArtists } from "../../lib/spotify";
import MusicHeadingItem from "./MusicHeadingItem";
import TrackList from "./TrackList";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: var(--spacing-md);
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
  return (
    <Wrapper className={className}>
      {!isLoading && (
        <>
          <MusicHeadingItem
            title={album.name}
            subtitle={artists}
            imageSrc={image.url}
            externalUrl={album.externalUrl}
            id={album.id}
            width="90%"
            onImageClick={handleAlbumClicked}
          />
          <TrackList
            className=""
            items={album.tracks.map((track) => {
              const newTrack = track;
              newTrack.images = album.images;
              return newTrack;
            })}
            onClick={handleTrackedClicked}
            playlistUri={album.uri}
          />
        </>
      )}
    </Wrapper>
  );
};

export default AlbumPage;
