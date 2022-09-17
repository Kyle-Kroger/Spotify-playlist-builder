import styled from "styled-components";
import { AiOutlineClockCircle } from "react-icons/ai";

const Wrapper = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  background-color: #064106;
  font-size: var(--fz-lg);
  font-weight: 800;
  padding-right: var(--spacing-xs);

  div {
    padding: var(--spacing-sm) var(--spacing-sm);
  }
`;

const TrackNumber = styled.div`
  width: 55px;
  text-align: center;
`;

const TrackTitle = styled.div`
  flex: 1;
`;

const TrackTime = styled.div`
  width: 65px;
`;

const TimeIcon = styled(AiOutlineClockCircle)`
  color: white;
  font-size: 24px;
  font-weight: 800;
  stroke-width: 40;
  display: block;
  margin: auto;
`;

const TrackRemove = styled.div`
  width: 55px;
`;

const PlaylistHeaderRow = () => {
  return (
    <Wrapper>
      <TrackNumber>#</TrackNumber>
      <TrackTitle>Title</TrackTitle>
      <TrackTime>
        <TimeIcon />
      </TrackTime>
      <TrackRemove />
    </Wrapper>
  );
};

export default PlaylistHeaderRow;
