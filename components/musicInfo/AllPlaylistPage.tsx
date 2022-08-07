import styled from "styled-components";
import { useState } from "react";
import { useUserPlaylists } from "../../lib/hooks";
import { helpers } from "../../styles";
import MusicItemList from "./MusicItemList";
import PlaylistFilterSort from "./PlaylistFilterSort";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  border-left: 1px solid black;
`;

const PlaylistWrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow: auto;
  flex: 1;
  padding: 0 var(--spacing-sm);

  ${helpers.spotifySearchBar}
`;

const AllPlaylistPage = () => {
  const { playlists, isLoading, isError } = useUserPlaylists();
  const [playlistId, setPlaylistId] = useState("");
  const [showPlaylistSubpage, setShowPlaylistSubpage] = useState(false);
  return (
    <Wrapper>
      <PlaylistFilterSort />
      <PlaylistWrapper>
        {!isLoading && !showPlaylistSubpage && (
          <MusicItemList
            className=""
            items={playlists}
            hasSubtitle
            isPlaylist
            onClick={() => {}}
          />
        )}
      </PlaylistWrapper>
    </Wrapper>
  );
};

export default AllPlaylistPage;
