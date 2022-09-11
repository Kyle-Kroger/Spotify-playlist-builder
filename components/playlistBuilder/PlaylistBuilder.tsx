import styled from "styled-components";
import { usePlaylistStateStore } from "../../lib/store";
import PlaylistHeader from "./PlaylistHeader";

const Wrapper = styled.div`
  flex: 1;
`;

const PlaylistBuilder = () => {
  return (
    <Wrapper>
      <PlaylistHeader />
    </Wrapper>
  );
};

export default PlaylistBuilder;
