import styled from "styled-components";
import { DesktopNav, Sidebar } from "../components/layout";
import { DesktopPlayer } from "../components/player";
import { PlaylistBuilder } from "../components/playlistBuilder";
import { useUserPlaylists } from "../lib/hooks";
import { SIDEBAR_PAGE, usePageStateStore } from "../lib/store";
import { QUERIES } from "../styles";

const StyledMain = styled.div`
  background: var(--player-gradient);
  height: var(--content-height);
  display: flex;
  position: relative;
`;

const Wrapper = styled.div`
  width: 100%;
`;

const SidebarPlaceholder = styled.div`
  width: var(--sidebar-width);
  @media ${QUERIES.tabetAndDown} {
    display: none;
  }
`;

const PositionedSidebar = styled(Sidebar)`
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
`;

const Home = () => {
  const { playlists, isLoading, isError } = useUserPlaylists();
  const currentPage = usePageStateStore((state) => state.currentPage);
  return (
    <Wrapper>
      <StyledMain>
        <DesktopNav playlists={playlists} />
        <PlaylistBuilder />
        {currentPage !== SIDEBAR_PAGE.NONE && (
          <>
            <SidebarPlaceholder />
            <PositionedSidebar className="" />
          </>
        )}
      </StyledMain>
      <DesktopPlayer />
    </Wrapper>
  );
};

export default Home;
