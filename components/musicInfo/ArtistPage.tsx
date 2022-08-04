import styled from "styled-components";
import { useArtistId } from "../../lib/hooks";
import Artist from "./Artist";
import MusicItemList from "./MusicItemList";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ArtistPage = (props) => {
  const { id, onAlbumClick, className } = props;
  const { artist, isLoading, isError } = useArtistId(id);
  let image = { url: "" };
  if (!isLoading) {
    image = artist.images[0] ? artist.images[0] : { url: "" };
  }

  const handleArtistClicked = () => {};

  const handleAlbumClicked = (albumId) => {
    onAlbumClick(albumId);
  };

  return (
    <Wrapper className={className}>
      {!isLoading && (
        <>
          <Artist
            key={id}
            name={artist.name}
            imageSrc={image.url}
            onArtistClicked={handleArtistClicked}
          />
          <MusicItemList
            items={artist.albums}
            className=""
            onClick={handleAlbumClicked}
          />
        </>
        // open on spotify button
        // show artist popular tracks or albums button
        // component of tracklist or album list based on button above
      )}
    </Wrapper>
  );
};

export default ArtistPage;
