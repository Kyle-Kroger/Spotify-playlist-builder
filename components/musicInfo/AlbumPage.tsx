import styled from "styled-components";
import { useAlbumId } from "../../lib/hooks";
import { combineArtists } from "../../lib/spotify";
import MusicItem from "./MusicItem";
import TrackList from "./TrackList";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const AlbumPage = ({ id, className }) => {
  const { album, isLoading, isError } = useAlbumId(id);
  let image = { url: "" };
  let artists = "";
  if (!isLoading) {
    console.log(id);
    image = album.images[0] ? album.images[0] : { url: "" };
    artists = combineArtists(album.artists);
  }
  const handleAlbumClicked = (albumId) => {};
  const handleTrackedClicked = (trackId) => {};
  return (
    <Wrapper className={className}>
      {!isLoading && (
        <>
          <MusicItem
            title={album.name}
            subtitle={artists}
            imageSrc={image.url}
            id={album.id}
            width="100%"
            onclick={handleAlbumClicked}
          />
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
