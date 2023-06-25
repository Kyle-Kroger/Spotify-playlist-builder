import styled from "styled-components";
import { useEffect, useState } from "react";
import { DesktopNav, MobileNav, Sidebar } from "../components/layout";
import { Player } from "../components/player";
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
  overflow: hidden;
`;

const Wrapper = styled.div`
  width: 100%;
`;

interface SidebarProps {
  isHidden: boolean;
}

const SidebarPlaceholder = styled.div<SidebarProps>`
  min-width: ${(p) => (p.isHidden ? 0 : "var(--sidebar-width)")};
  transition: min-width 600ms ease-in-out;
  @media ${QUERIES.tabetAndDown} {
    display: none;
  }
`;

const PositionedSidebar = styled(Sidebar)<SidebarProps>`
  position: absolute;
  top: 0;
  right: ${(p) => (p.isHidden ? "calc(var(--sidebar-width) * -1)" : 0)};
  height: 100%;

  transition: right 600ms ease-in-out;

  @media ${QUERIES.phone} {
    right: ${(p) => (p.isHidden ? "-100%" : 0)};
  }
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
  const isHidden = usePageStateStore((state) => state.isHidden);
  const [token, setToken] = useState("");

  useEffect(() => {
    async function getToken() {
      const response = await fetcher("/token");
      setToken(response.token);
    }

    getToken();
  }, []);

  return (
    <Wrapper>
      <StyledMain>
        <DesktopNav playlists={playlists} />
        <PlaylistBuilder />
        <SidebarPlaceholder isHidden={isHidden} />
        <PositionedSidebar className="" isHidden={isHidden} />
      </StyledMain>
      <MobileNav />
      {token && <Player token={token} setToken={setToken} />}
      {!token && <PlaceholderPlayer />}
    </Wrapper>
  );
};

export default Home;
