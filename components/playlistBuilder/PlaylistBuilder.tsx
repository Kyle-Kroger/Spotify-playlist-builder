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
  ${helpers.spotifyScrollBar}
`;

const PlaylistBuilder = () => {
  const currentPlaylistId = usePlaylistStateStore(
    (store) => store.currentPlaylistId
  );
  return (
    <Wrapper>
      {currentPlaylistId && (
        <>
          <PlaylistHeader />
          <PlaylistHeaderRow />
          <PlaylistTrackList />
        </>
      )}
      {!currentPlaylistId && (
        <div>current playlist id: {currentPlaylistId}</div>
      )}
    </Wrapper>
  );
};

export default PlaylistBuilder;
