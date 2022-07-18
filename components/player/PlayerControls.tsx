import styled from "styled-components";
import { FaPlayCircle, FaPauseCircle } from "react-icons/fa";
import {
  BiShuffle,
  BiRepeat,
  BiSkipNext,
  BiSkipPrevious,
} from "react-icons/bi";
import { helpers } from "../../styles";

const Wrapper = styled.div`
  height: 100%;
  ${helpers.flexCenter}
  flex-direction: column;
`;

const ControlsWrapper = styled.div`
  ${helpers.flexCenter}
`;

const PlayerBarWrapper = styled.div`
  ${helpers.flexCenter}
`;

const PlayerBar = styled.div`
  width: 40vw;
  background-color: white;
  height: 4px;
  border-radius: 4px;
  margin: 8px;
`;

const CurrentTime = styled.div``;

const TotalTime = styled.div``;

const PlayerControls = () => {
  return (
    <Wrapper>
      <ControlsWrapper>
        <BiShuffle fontSize="28px" />
        <BiSkipPrevious fontSize="48px" />
        <FaPauseCircle fontSize="48px" />
        <BiSkipNext fontSize="48px" />
        <BiRepeat fontSize="28px" />
      </ControlsWrapper>

      <PlayerBarWrapper>
        <CurrentTime>0:45</CurrentTime>
        <PlayerBar />
        <TotalTime>3:21</TotalTime>
      </PlayerBarWrapper>
    </Wrapper>
  );
};

export default PlayerControls;
