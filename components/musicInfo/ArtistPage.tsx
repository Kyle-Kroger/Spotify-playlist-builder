import styled from "styled-components";
import { useArtistId } from "../../lib/hooks";
import { StyledButton } from "../ui";
import MusicItem from "./MusicItem";
import MusicItemList from "./MusicItemList";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MusicItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--color-grey-700);
  margin-bottom: var(--spacing-sm);
  // border-radius: var(--radius-small);
  border: 2px solid var(--color-spotify-green);
`;

const PositionedButton = styled(StyledButton)`
  margin: var(--spacing-lg) 0;
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
          <MusicItemWrapper>
            <MusicItem
              key={id}
              title={artist.name}
              imageSrc={image.url}
              isRound
              isHeading
              width="85%"
              onClick={handleArtistClicked}
            />
            <PositionedButton state="filled" onClick={() => {}} className="">
              Open on Spotify
            </PositionedButton>
          </MusicItemWrapper>

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
