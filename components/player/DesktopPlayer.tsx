import styled from "styled-components";
import PlayerControls from "./PlayerControls";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  height: var(--player-height);
  width: 100%;
  background: var(--player-gradient);
`;

const TrackInfo = styled.div`
  display: flex;
  align-items: center;
  min-width: 300px;
`;

const TitleArtistWrapper = styled.div``;

const AlbumCover = styled.img`
  width: 74px;
  height: 74px;
  margin: 0 16px;
  background-color: blue;
`;

const DesktopPlayer = () => {
  return (
    <Wrapper>
      <TrackInfo>
        <AlbumCover />
        <TitleArtistWrapper>
          <h3>Title</h3>
          <h5>Artist</h5>
        </TitleArtistWrapper>
      </TrackInfo>
      <PlayerControls />
      <TrackInfo />
    </Wrapper>
  );
};

export default DesktopPlayer;
