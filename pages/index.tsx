import styled from "styled-components";
import { DesktopPlayer } from "../components/player";

const StyledMain = styled.div`
  background: var(--player-gradient);
  height: var(--content-height);
`;

const Wrapper = styled.div`
  width: 100%;
`;

const Home = () => {
  return (
    <Wrapper>
      <StyledMain></StyledMain>
      <DesktopPlayer />
    </Wrapper>
  );
};

export default Home;
