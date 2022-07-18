import styled from "styled-components";
import { DesktopNav } from "../components/layout";
import { DesktopPlayer } from "../components/player";
import { useUserPlaylists } from "../lib/hooks";

const StyledMain = styled.div`
  background: var(--player-gradient);
  height: var(--content-height);
  display: flex;
`;

const Wrapper = styled.div`
  width: 100%;
`;

const Home = () => {
  const { playlists, isLoading, isError } = useUserPlaylists();
  return (
    <Wrapper>
      <StyledMain>
        <DesktopNav playlists={playlists} />
      </StyledMain>
      <DesktopPlayer />
    </Wrapper>
  );
};

export default Home;
