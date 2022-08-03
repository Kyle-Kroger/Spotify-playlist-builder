import styled from "styled-components";
import { BsPlusCircle } from "react-icons/bs";
import { StyledImage } from "../ui";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: var(--spacing-sm);
`;

const ImageWrapper = styled.figure`
  background-color: black;
  width: 50px;
  height: 50px;
`;

const AlbumIcon = styled.img`
  width: 100%;
  height: 100%;
`;

const TextWrapper = styled.div`
  flex: 1;
  padding: 0 var(--spacing-md);
`;

const TrackTitle = styled.h3``;

const ArtistName = styled.p``;

const AddIcon = styled(BsPlusCircle)`
  color: var(--color-spotify-green);
  font-size: 32px;
`;

const Track = (props) => {
  const { name, artists, albumImage } = props;
  return (
    <Wrapper>
      <StyledImage src={albumImage} alt={artists} width="50px" height="50px" />
      <TextWrapper>
        <TrackTitle>{name}</TrackTitle>
        <ArtistName>{artists}</ArtistName>
      </TextWrapper>
      <AddIcon />
    </Wrapper>
  );
};

export default Track;
