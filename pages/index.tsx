import styled from "styled-components";
import { useEffect, useState } from "react";
import { DesktopNav, MobileNav, Sidebar } from "../components/layout";
import { MobilePlayer, Player } from "../components/player";
import { PlaylistBuilder } from "../components/playlistBuilder";
import { useUserPlaylists } from "../lib/hooks";
import { SIDEBAR_PAGE, usePageStateStore } from "../lib/store";
import { QUERIES } from "../styles";
import { fetcher } from "../lib/fetcher";

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

const PlaceholderPlayer = styled.div`
  display: flex;
  justify-content: space-between;
  height: var(--player-height);
  width: 100%;
  background: var(--player-gradient);
`;

const Home = () => {
  const { playlists, isLoading, isError } = useUserPlaylists();
  const currentPage = usePageStateStore((state) => state.currentPage);
  const [token, setToken] = useState("");

  useEffect(() => {
    async function getToken() {
      const response = await fetcher("/token");
      console.log(response);
      setToken(response.token);
    }

    getToken();
  }, []);

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
      <MobileNav />
      {token && <Player token={token} />}
      {!token && <PlaceholderPlayer />}
    </Wrapper>
  );
};

export default Home;
