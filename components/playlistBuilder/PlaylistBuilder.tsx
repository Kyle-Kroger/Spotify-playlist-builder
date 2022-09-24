import styled from "styled-components";
import { usePlaylistStateStore } from "../../lib/store";
import { helpers } from "../../styles";
import PlaylistHeader from "./PlaylistHeader";
import PlaylistHeaderRow from "./PlaylistHeaderRow";
import PlaylistTrackList from "./PlaylistTrackList";

const Wrapper = styled.div`
  flex: 1;
  overflow: auto;
  background-color: var(--color-grey-900);
  ${helpers.spotifySearchBar}
`;

const PlaylistBuilder = () => {
  return (
    <Wrapper>
      <PlaylistHeader />
      <PlaylistHeaderRow />
      <PlaylistTrackList />
    </Wrapper>
  );
};

export default PlaylistBuilder;
