import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  padding: var(--spacing-md);
  align-items: center;
`;

const ImageWrapper = styled.figure`
  border-radius: 50%;
  width: 90%;
  aspect-ratio: 1/1;
  overflow: hidden;
  margin-bottom: var(--spacing-sm);
`;

const ArtistImage = styled.img`
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

const ArtistText = styled.h3`
  text-align: center;
`;

const Artist = (props) => {
  const { name, imageSrc } = props;
  return (
    <Wrapper>
      <ImageWrapper>
        {imageSrc !== "" && <ArtistImage src={imageSrc} />}
        {imageSrc === "" && (
          <ImagePlaceholder>
            <h3>No Image</h3>
          </ImagePlaceholder>
        )}
      </ImageWrapper>
      <ArtistText>{name}</ArtistText>
    </Wrapper>
  );
};

export default Artist;
