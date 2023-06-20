/* eslint-disable camelcase */
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
`;

const PlayerBarWrapper = styled.div`
  ${helpers.flexCenter}
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

const PlayerControls = ({ is_paused, duration_ms, position, player }) => {
  const convertPercent = (currentTime, totalTime) => {
    const percent = Math.floor((currentTime / totalTime) * 100);
    return `${percent <= 100 ? percent : 100}%`;
  };

  return (
    <Wrapper>
      <ControlsWrapper>
        {!is_paused && (
          <PauseButton fontSize="50px" onClick={() => player.togglePlay()} />
        )}
        {is_paused && (
          <PlayButton fontSize="50px" onClick={() => player.togglePlay()} />
        )}
      </ControlsWrapper>

      <PlayerBarWrapper>
        <CurrentTime>{durationMSToStandard(position)}</CurrentTime>
        <PlayerBarTrack>
          <ActiveBar width={convertPercent(position, duration_ms)} />
        </PlayerBarTrack>
        <TotalTime>{durationMSToStandard(duration_ms)}</TotalTime>
      </PlayerBarWrapper>
    </Wrapper>
  );
};

export default PlayerControls;
