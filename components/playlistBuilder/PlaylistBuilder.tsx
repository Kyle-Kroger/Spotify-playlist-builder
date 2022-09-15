import styled from "styled-components";
import { usePlaylistStateStore } from "../../lib/store";
import PlaylistHeader from "./PlaylistHeader";
import PlaylistTrackList from "./PlaylistTrackList";

const Wrapper = styled.div`
  flex: 1;
  overflow: auto;
`;

const PlaylistBuilder = () => {
  return (
    <Wrapper>
      <PlaylistHeader />
      <PlaylistTrackList />
    </Wrapper>
  );
};

export default PlaylistBuilder;
