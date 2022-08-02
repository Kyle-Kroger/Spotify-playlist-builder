import styled from "styled-components";

const ImageWrapper = styled.figure<{
  width: string;
  height: string;
  isRound: boolean;
}>`
  border-radius: ${(p) => (p.isRound ? "50%" : 0)};
  width: ${(p) => (p.width ? p.width : "auto")};
  height: ${(p) => (p.height ? p.height : "auto")};
  aspect-ratio: 1/1;
  overflow: hidden;
  margin-bottom: var(--spacing-sm);
  cursor: pointer;
`;

const StyledImg = styled.img`
  width: 100%;
  height: 100%;
`;

const ImagePlaceholder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: var(--color-black);
`;
const StyledImage = (props) => {
  const { src, alt, width, height, isRound, handleClick } = props;

  return (
    <ImageWrapper
      onClick={() => handleClick()}
      width={width}
      height={height}
      isRound={isRound}
    >
      {src !== "" && <StyledImg src={src} alt={alt} />}
      {src === "" && (
        <ImagePlaceholder>
          <h3>No Image</h3>
        </ImagePlaceholder>
      )}
    </ImageWrapper>
  );
};

export default StyledImage;
