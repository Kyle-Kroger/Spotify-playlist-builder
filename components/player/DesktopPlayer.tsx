import styled from "styled-components";
import { FaPlayCircle, FaPauseCircle } from "react-icons/fa";
import { useUserPlaybackState } from "../../lib/hooks";
import { StyledImage } from "../ui";
import PlayerControls from "./PlayerControls";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  height: var(--player-height);
  width: 100%;
  background: var(--player-gradient);
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

const AlbumCover = styled.img`
  width: 74px;
  height: 74px;
  margin: 0 16px;
  background-color: blue;
`;

const PausePlayWrapper = styled.div`
  display: flex;
  justify-content: right;
  align-items: center;
  margin: 0 var(--spacing-xl);
  min-width: 15vw;
`;

const DesktopPlayer = () => {
  const { playbackState, isLoading, isError, mutateUserPlaybackState } =
    useUserPlaybackState();
  return (
    <Wrapper>
      {!isLoading && !isError && playbackState.success && (
        <>
          <TrackInfo>
            <StyledImage
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
          <PlayerControls playbackState={playbackState} />
        </>
      )}
      <TrackInfo />
    </Wrapper>
  );
};

export default DesktopPlayer;
