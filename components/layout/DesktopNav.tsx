import styled from "styled-components";
import Image from "next/image";
import { useEffect, useState } from "react";
import { BsSearch, BsTag } from "react-icons/bs";
import { CgPlayListAdd } from "react-icons/cg";
import { helpers } from "../../styles";
import {
  usePageStateStore,
  SIDEBAR_PAGE,
  usePlaylistStateStore,
} from "../../lib/store";
import { useUser } from "../../lib/hooks";
import CreatePlaylistNav from "./CreatePlaylistNav";
import NavPlaylist from "./NavPlaylist";
import spotifyLogo from "../../public/images/Spotify_Logo_RGB_Green.png";

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

const LogoHeading = styled.h5`
  margin-bottom: var(--spacing-sm);
  text-align: center;
`;

const NavLinkList = styled.ul`
  font-style: bold;
`;

const NavLink = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: var(--spacing-md);
  color: var(--color-text-subdued);
  font-weight: 700;
  cursor: pointer;
  transition: all 300ms ease-in-out;

  :hover {
    color: white;
  }
`;

const NavText = styled.span`
  margin-left: var(--spacing-sm);
  font-size: var(--fz-xs);
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

const Playlist = styled.li<{ isDisabled: boolean }>`
  padding: var(--spacing-xs) 0;
  cursor: pointer;
  pointer-events: ${(p) => (p.isDisabled ? "none" : "all")};
  transition: color 200ms;
  color: ${(p) => (p.isDisabled ? "#424242" : "var(--color-text-subdued)")};

  :hover {
    color: white;
  }
`;

const Divider = styled.div`
  width: 100%;
  min-height: 1px;
  background-color: var(--color-grey-300);
  margin-bottom: var(--spacing-md);
`;

const ImageWrapper = styled.div`
  width: 60%;
  margin: 0 auto;
  margin-bottom: var(--spacing-md);
`;

const DesktopNav = (props) => {
  const { playlists } = props;
  const { user, isLoading, isError } = useUser();
  const setCurrentPage = usePageStateStore((state) => state.setCurrentPage);
  const setPlaylistId = usePlaylistStateStore((state) => state.setPlaylistId);
  const [currentUserId, setCurrentUserId] = useState("");

  useEffect(() => {
    if (!isLoading && !isError) {
      setCurrentUserId(user.id);
    }
  }, [isLoading, isError, user]);

  return (
    <Wrapper>
      <StyledNav>
        {/* REMOVE THIS onCLICK! FOR TESTING ONLY */}
        <LogoHeading onClick={() => setCurrentPage(SIDEBAR_PAGE.NONE)}>
          Powered by
        </LogoHeading>
        <ImageWrapper>
          <Image src={spotifyLogo} alt="Spotify Logo" />
        </ImageWrapper>
        <Divider />
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
            <NavText>Manage Tags</NavText>
          </NavLink>
        </NavLinkList>
        <Divider />
        <CreatePlaylistNav
          userId={currentUserId}
          setPlaylistId={setPlaylistId}
        />
      </StyledNav>
      <PlaylistWrapper>
        {playlists.map((playlist) => (
          <NavPlaylist
            key={playlist.id}
            id={playlist.id}
            name={playlist.name}
            isDisabled={playlist.owner.id !== currentUserId}
            setPlaylistId={setPlaylistId}
          />
        ))}
      </PlaylistWrapper>
    </Wrapper>
  );
};

export default DesktopNav;
