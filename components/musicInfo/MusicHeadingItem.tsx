import styled from "styled-components";
import { StyledButton, StyledImage } from "../ui";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: var(--page-gradient);
  margin-bottom: var(--spacing-sm);
  margin-top: -12px;
  margin-left: -12px;
  margin-right: -12px;
`;

const ItemWrapper = styled.div<{ width: string }>`
  display: flex;
  flex-direction: column;
  width: ${(p) => p.width};
  padding: var(--spacing-md);
  align-items: center;
`;

const ItemHeading = styled.div`
  padding-bottom: var(--spacing-md);
  text-align: center;
  cursor: pointer;

  h4 {
    padding-top: var(--spacing-sm);
  }
`;

const PositionedButton = styled(StyledButton)`
  margin: var(--spacing-lg) 0;
`;

const MusicHeadingItem = ({
  title,
  subtitle = "",
  isRound = false,
  imageSrc,
  id,
  width = "50%",
  externalUrl,
  onImageClick,
}) => {
  const handleImageClick = () => {
    onImageClick(id);
  };
  const openInNewTab = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };
  return (
    <Wrapper>
      <ItemWrapper width={width}>
        <ItemHeading>
          <h2>{title}</h2>
          {subtitle !== "" && <h4>{subtitle}</h4>}
        </ItemHeading>
        <StyledImage
          src={imageSrc}
          alt={title}
          isRound={isRound}
          width={width}
          handleClick={handleImageClick}
        />
      </ItemWrapper>
      <PositionedButton
        state="filled"
        onClick={() => openInNewTab(externalUrl)}
        className=""
      >
        Open on Spotify
      </PositionedButton>
    </Wrapper>
  );
};

export default MusicHeadingItem;
