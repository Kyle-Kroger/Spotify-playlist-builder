import styled from "styled-components";

const Wrapper = styled.div`
  padding: var(--spacing-xl);

  h1 {
    text-align: center;
    margin-bottom: var(--spacing-xxl);
  }

  h2 {
    margin-bottom: var(--spacing-sm);
    width: fit-content;
  }

  p {
    line-height: 1.5;
    font-size: var(--fz-md);
    margin-bottom: var(--spacing-xl);
  }
`;

const Divider = styled.div`
  width: 100%;
  min-height: 1px;
  background-color: var(--color-grey-300);
  margin-bottom: var(--spacing-md);
`;

const PlaylistHome = () => {
  return (
    <Wrapper>
      <h1>A Playlist Builder for Spotify</h1>
      <h2>Getting Started</h2>
      <Divider />
      <p>
        To edit a playlist select an existing one from the navigation bar or the
        playlist sidebar. You can also create a new playlist using the Create
        Playlist button!
      </p>
      <h2>Note on the Player</h2>
      <Divider />
      <p>
        Due to how the Spotify api works the player for this app will only
        function if you have Spotify premium.
      </p>
    </Wrapper>
  );
};

export default PlaylistHome;
