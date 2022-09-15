import styled from "styled-components";

const Wrapper = styled.div`
  background-color: #1f441f;
  margin: var(--spacing-sm);
  height: 90px;
`;

const PlaylistTrack = ({ track }) => {
  return (
    <Wrapper>
      {track.name} - {track.id}
    </Wrapper>
  );
};

export default PlaylistTrack;
