import styled from "styled-components";

import { BsSearch, BsTag } from "react-icons/bs";
import { CgPlayListAdd } from "react-icons/cg";
import { helpers } from "../../styles";
import { usePageStateStore, SIDEBAR_PAGE } from "../../lib/store";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: var(--color-black);
  width: var(--desktop-nav-width);
  height: 100%;
`;

const StyledNav = styled.nav`
  padding: 24px 16px;
`;

const LogoHeading = styled.div`
  margin-bottom: var(--spacing-lg);
  text-align: center;
`;

const NavLinkList = styled.ul`
  font-style: bold;
`;

const NavLink = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: var(--spacing-md);
  cursor: pointer;
`;

const NavText = styled.span`
  margin-left: var(--spacing-sm);
`;

const PlaylistWrapper = styled.ul`
  flex: 1;
  background: var(--color-grey-900);
  overflow: auto;
  padding: var(--spacing-md);
  font-size: 15px;
  font-weight: 600;
  color: var(--color-text-subdued);

  ${helpers.spotifySearchBar}
`;

const Playlist = styled.li`
  padding: var(--spacing-xs) 0;
`;

const DesktopNav = (props) => {
  const { playlists } = props;
  const setCurrentPage = usePageStateStore((state) => state.setCurrentPage);

  return (
    <Wrapper>
      <StyledNav>
        {/* REMOVE THIS onCLICK! FOR TESTING ONLY */}
        <LogoHeading onClick={() => setCurrentPage(SIDEBAR_PAGE.NONE)}>
          Playlist Builder
        </LogoHeading>
        <NavLinkList>
          <NavLink onClick={() => setCurrentPage(SIDEBAR_PAGE.SEARCH)}>
            <BsSearch size="28px" />
            <NavText>Search</NavText>
          </NavLink>
          <NavLink onClick={() => setCurrentPage(SIDEBAR_PAGE.PLAYLIST)}>
            <CgPlayListAdd size="28px" />
            <NavText>Playlists</NavText>
          </NavLink>
          <NavLink onClick={() => setCurrentPage(SIDEBAR_PAGE.TAGGING)}>
            <BsTag size="28px" />
            <NavText>Edit Tags</NavText>
          </NavLink>
        </NavLinkList>
      </StyledNav>
      <PlaylistWrapper>
        {playlists.map((playlist) => (
          <Playlist id={playlist.id} key={playlist.id}>
            {playlist.name}
          </Playlist>
        ))}
      </PlaylistWrapper>
    </Wrapper>
  );
};

export default DesktopNav;
