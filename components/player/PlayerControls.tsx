import styled from "styled-components";
import { useState } from "react";
import { IconContext } from "react-icons";
import { FaPlayCircle, FaPauseCircle } from "react-icons/fa";
import { helpers } from "../../styles";
import { durationMSToStandard } from "../../lib/spotify";

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
`;

const PlayButton = styled(FaPlayCircle)`
  cursor: pointer;
`;

const CurrentTime = styled.div`
  min-width: 45px;
  text-align: right;
`;

const TotalTime = styled.div``;

const PlayerControls = ({ playbackState }) => {
  const convertPercent = (currentTime, totalTime) => {
    const percent = Math.floor((currentTime / totalTime) * 100);
    return `${percent}%`;
  };
  return (
    <Wrapper>
      <ControlsWrapper>
        {playbackState.is_playing && <PauseButton fontSize="50px" />}
        {!playbackState.is_playing && (
          <PlayButton
            fontSize="50px"
            onClick={() => {
              console.log(playbackState);
            }}
          />
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
