// unneeded
import styled from "styled-components";
import { StyledImage } from "../ui";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  padding: var(--spacing-md);
  align-items: center;
`;

const ArtistText = styled.h3`
  padding-top: var(--spacing-sm);
  // margin auto centers the text in the remaining space
  margin-top: auto;
  margin-bottom: auto;
  text-align: center;
  cursor: pointer;
`;

const Artist = (props) => {
  const { name, imageSrc, id, onArtistClicked } = props;
  const handleClick = () => {
    onArtistClicked(id);
  };
  return (
    <Wrapper>
      <StyledImage
        src={imageSrc}
        alt="name"
        isRound
        width="90%"
        handleClick={handleClick}
      />
      <ArtistText>{name}</ArtistText>
    </Wrapper>
  );
};

export default Artist;
