import styled, { css } from "styled-components";
import { useEffect, useState } from "react";
import { BsSearch, BsHouseDoor } from "react-icons/bs";
import { BiSolidPlaylist } from "react-icons/bi";
import { QUERIES } from "../../styles";
import {
  usePageStateStore,
  SIDEBAR_PAGE,
  usePlaylistStateStore,
} from "../../lib/store";
import CreatePlaylistNav from "./CreatePlaylistNav";
import { useUser } from "../../lib/hooks";

const Wrapper = styled.div`
  height: var(--mobile-nav-height);
  background-color: var(--color-black);
  width: 100%;
  display: none;

  @media ${QUERIES.phone} {
    display: flex;
  }
`;

interface navLinkProps {
  isActive: boolean;
}

const NavLink = styled.div<navLinkProps>`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: color 300ms ease-in-out;
  padding: 0 var(--spacing-sm);

  background-color: ${(p) =>
    p.isActive ? "var(--color-grey-800)" : "var(--color-black)"};

  ${(p) =>
    p.isActive &&
    css`
      border-top: 4px solid var(--color-spotify-green);
    `}

  p {
    font-size: var(--fz-xs);
    padding-top: 4px;
  }

  :hover {
    color: var(--color-spotify-green);
  }
`;

const MoblieNav = () => {
  const { user, isLoading, isError } = useUser();
  const isHidden = usePageStateStore((state) => state.isHidden);
  const setIsHidden = usePageStateStore((state) => state.setIsHidden);
  const currentPage = usePageStateStore((state) => state.currentPage);
  const setCurrentPage = usePageStateStore((state) => state.setCurrentPage);
  const playlistId = usePlaylistStateStore((state) => state.currentPlaylistId);
  const setPlaylistId = usePlaylistStateStore((state) => state.setPlaylistId);
  const [currentUserId, setCurrentUserId] = useState("");

  useEffect(() => {
    if (!isLoading && !isError) {
      setCurrentUserId(user.id);
    }
  }, [isLoading, isError, user]);

  const handleSidebarChange = (page) => {
    setIsHidden(page === currentPage && !isHidden);
    setCurrentPage(page);
  };

  const handleHomeClicked = () => {
    setPlaylistId("");
  };
  return (
    <Wrapper>
      <NavLink
        onClick={() => handleSidebarChange(SIDEBAR_PAGE.SEARCH)}
        isActive={!isHidden && currentPage === SIDEBAR_PAGE.SEARCH}
      >
        <BsSearch size="24px" />
        <p>Search</p>
      </NavLink>
      <NavLink
        onClick={() => handleSidebarChange(SIDEBAR_PAGE.PLAYLIST)}
        isActive={!isHidden && currentPage === SIDEBAR_PAGE.PLAYLIST}
      >
        <BiSolidPlaylist size="24px" />
        <p>Playlists</p>
      </NavLink>
      <NavLink
        onClick={handleHomeClicked}
        isActive={isHidden && playlistId === ""}
      >
        <BsHouseDoor size="24px" />
        <p>Home</p>
      </NavLink>
      <NavLink isActive={false}>
        <CreatePlaylistNav
          userId={currentUserId}
          setPlaylistId={setPlaylistId}
        />
      </NavLink>
    </Wrapper>
  );
};

export default MoblieNav;
