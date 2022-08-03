// unneeded?
import styled from "styled-components";
import { StyledImage } from "../ui";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  padding: var(--spacing-md);
  align-items: center;
`;

const AlbumText = styled.div`
  padding-top: var(--spacing-sm);
  // margin auto centers the text in the remaining space
  margin-top: auto;
  margin-bottom: auto;
  text-align: center;
  cursor: pointer;
`;

const Album = (props) => {
  const { name, id, artists, showArtistName, imageSrc } = props;

  return (
    <Wrapper>
      <StyledImage src={imageSrc} alt={name} width="90%" />
      <AlbumText>
        <h3>{name}</h3>
        {showArtistName && <p>{artists}</p>}
      </AlbumText>
    </Wrapper>
  );
};

export default Album;
