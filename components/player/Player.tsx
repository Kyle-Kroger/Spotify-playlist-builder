import styled from "styled-components";
import { useUserPlaybackState } from "../../lib/hooks";
import { StyledImage } from "../ui";
import PlayerControls from "./PlayerControls";
import { QUERIES } from "../../styles";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  height: var(--player-height);
  width: 100%;
  background: var(--player-gradient);
`;

const PlayerImage = styled(StyledImage)`
  @media ${QUERIES.phone} {
    width: 54px;
    height: 54px;
  }
`;

const TrackInfo = styled.div`
  min-width: 250px;
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  margin: 0 var(--spacing-md);
`;

const TitleArtistWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
`;

const TrackPlaceholder = styled.div`
  min-width: 250px;
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  margin: 0 var(--spacing-md);

  @media ${QUERIES.phone} {
    display: none;
  }
`;

const Player = () => {
  const { playbackState, isLoading, isError, mutateUserPlaybackState } =
    useUserPlaybackState();
  return (
    <Wrapper>
      {!isLoading && !isError && playbackState.success && (
        <>
          <TrackInfo>
            <PlayerImage
              src={playbackState.item.album.images[0].url}
              alt={playbackState.item.album.name}
              width="74px"
              height="74px"
              className=""
            />
            <TitleArtistWrapper>
              <h3>{playbackState.item.name}</h3>
              <h5>
                {playbackState.item.artists
                  .map((artist) => artist.name)
                  .join(", ")}
              </h5>
            </TitleArtistWrapper>
          </TrackInfo>
          <PlayerControls
            playbackState={playbackState}
            mutateUserPlaybackState={mutateUserPlaybackState}
          />
        </>
      )}
      <TrackPlaceholder />
    </Wrapper>
  );
};

export default Player;
