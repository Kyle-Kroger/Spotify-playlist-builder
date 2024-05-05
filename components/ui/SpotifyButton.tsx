import Image from "next/image";
import styled from "styled-components";
import StyledButton from "./StyledButton";
import spotifyLogo from "../../public/images/Spotify_Icon_RGB_White.png";

const Wrapper = styled.span`
  display: flex;
  flex-direction: row;
  gap: var(--spacing-xs);
  align-items: center;
`;

const ImageWrapper = styled.span`
  display: flex;
  width: 24px;
`;

const SpotifyButton = ({ children, externalUrl, className = "" }) => {
  const onClick = () => {
    window.open(externalUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <StyledButton state="filled" onClick={onClick} className={className}>
      <Wrapper>
        <ImageWrapper>
          <Image src={spotifyLogo} alt="Spotify Logo" />
        </ImageWrapper>
        {children}
      </Wrapper>
    </StyledButton>
  );
};

export default SpotifyButton;
