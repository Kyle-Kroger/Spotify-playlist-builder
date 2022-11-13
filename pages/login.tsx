import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import spotifyLogo from "../public/images/Spotify_Logo_RGB_Green.png";

const Wrapper = styled.div`
  min-height: 100%;
  background: var(--player-gradient);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: var(--spacing-xl);
  padding-bottom: var(--spacing-xl);
`;

const LoginButton = styled.a`
  display: inline-block;
  background-color: var(--color-spotify-green);
  border: 2px solid var(--color-spotify-outline);
  border-radius: var(--radius-pill);
  padding: var(--spacing-md);
  min-width: 178px;
  text-align: center;
`;

const ImageWrapper = styled.div`
  width: 300px;
  margin: 0 auto;
`;

const Login = () => {
  return (
    <Wrapper>
      <h1>A Playlist Organizer for</h1>
      <ImageWrapper>
        <Image src={spotifyLogo} alt="spotify logo" />
      </ImageWrapper>
      <p>Please sign in with your spotify account to continue</p>
      <Link href="/api/login" passHref>
        <LoginButton>Login</LoginButton>
      </Link>
    </Wrapper>
  );
};

export default Login;
