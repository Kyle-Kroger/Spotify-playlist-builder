import styled from "styled-components";
import { FaPlayCircle, FaPauseCircle } from "react-icons/fa";
import { QUERIES, helpers } from "../../styles";
import { durationMSToStandard } from "../../lib/spotify";
import { fetcher } from "../../lib/fetcher";

const Wrapper = styled.div`
  height: 100%;
  ${helpers.flexCenter}
  flex-direction: column;
`;

const ControlsWrapper = styled.div`
  ${helpers.flexCenter}
  margin-bottom: 4px;

  * {
    margin: 0 var(--spacing-xs);
  }

  @media ${QUERIES.phone} {
    padding-right: 16px;
  }
`;

const PlayerBarWrapper = styled.div`
  ${helpers.flexCenter}

  @media ${QUERIES.phone} {
    display: none;
  }
`;

const PlayerBarTrack = styled.div`
  position: relative;
  width: 40vw;
  background-color: white;
  height: 4px;
  border-radius: 4px;
  margin: 8px;
`;

const ActiveBar = styled.div<{ width: string }>`
  position: absolute;
  top: 0;
  width: ${(p) => p.width};
  background-color: var(--color-spotify-green);
  border-radius: 4px;
  height: 4px;
`;

const PauseButton = styled(FaPauseCircle)`
  cursor: pointer;
  transition: color 200ms ease-in-out, transform 200ms ease-in-out;

  :hover {
    transform: scale(1.05);
    color: var(--color-spotify-green);
  }
`;

const PlayButton = styled(FaPlayCircle)`
  cursor: pointer;
  transition: color 200ms ease-in-out, transform 200ms ease-in-out;

  :hover {
    transform: scale(1.05);
    color: var(--color-spotify-green);
  }
`;

const CurrentTime = styled.div`
  min-width: 45px;
  text-align: right;
`;

const TotalTime = styled.div``;

const PlayerControls = ({ playbackState, mutateUserPlaybackState }) => {
  const convertPercent = (currentTime, totalTime) => {
    const percent = Math.floor((currentTime / totalTime) * 100);
    return `${percent}%`;
  };

  const handleTrackPaused = async () => {
    try {
      // optimistic updating
      await mutateUserPlaybackState((data) => {
        return {
          ...data,
          is_playing: false,
        };
      }, false);

      await fetcher("/user/player/pause", {}, "PUT");
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleTrackPlayed = async () => {
    try {
      // optimistic updating
      await mutateUserPlaybackState((data) => {
        return {
          ...data,
          is_playing: true,
        };
      }, false);

      await fetcher("/user/player/play", {}, "PUT");
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <Wrapper>
      <ControlsWrapper>
        {playbackState.is_playing && (
          <PauseButton fontSize="50px" onClick={handleTrackPaused} />
        )}
        {!playbackState.is_playing && (
          <PlayButton fontSize="50px" onClick={handleTrackPlayed} />
        )}
      </ControlsWrapper>

      <PlayerBarWrapper>
        <CurrentTime>
          {durationMSToStandard(playbackState.progress_ms)}
        </CurrentTime>
        <PlayerBarTrack>
          <ActiveBar
            width={convertPercent(
              playbackState.progress_ms,
              playbackState.item.duration_ms
            )}
          />
        </PlayerBarTrack>
        <TotalTime>
          {durationMSToStandard(playbackState.item.duration_ms)}
        </TotalTime>
      </PlayerBarWrapper>
    </Wrapper>
  );
};

export default PlayerControls;
