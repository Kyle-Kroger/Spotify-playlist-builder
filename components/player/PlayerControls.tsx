/* eslint-disable camelcase */
import styled from "styled-components";
import { QUERIES, helpers } from "../../styles";
import { durationMSToStandard } from "../../lib/spotify";
import {
  PauseIcon,
  PlayIcon,
  ForwardIcon,
  BackIcon,
  RepeatIcon,
  Repeat1Icon,
  ShuffleIcon,
} from "../ui/StyledIcons";

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

const CurrentTime = styled.div`
  min-width: 45px;
  text-align: right;
`;

const TotalTime = styled.div``;

const PlayerControls = ({
  is_paused,
  repeatMode,
  shuffle,
  duration_ms,
  position,
  player,
}) => {
  const convertPercent = (currentTime, totalTime) => {
    const percent = Math.floor((currentTime / totalTime) * 100);
    return `${percent <= 100 ? percent : 100}%`;
  };

  return (
    <Wrapper>
      <ControlsWrapper>
        <ShuffleIcon fontSize="28px" />
        <BackIcon fontSize="32px" onClick={() => player.previousTrack()} />
        {!is_paused && (
          <PauseIcon fontSize="50px" onClick={() => player.togglePlay()} />
        )}
        {is_paused && (
          <PlayIcon fontSize="50px" onClick={() => player.togglePlqy()} />
        )}
        <ForwardIcon fontSize="32px" onClick={() => player.nextTrack()} />
        {repeatMode !== 2 && <RepeatIcon fontSize="28px" />}
        {repeatMode === 2 && <Repeat1Icon fontSize="28px" />}
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
