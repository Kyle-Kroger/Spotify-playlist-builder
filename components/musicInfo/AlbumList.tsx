// unneeded?
import styled from "styled-components";
import { combineArtists } from "../../lib/spotify";
import Album from "./Album";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const AlbumList = ({ showArtistName, items, className }) => {
  if (!items) {
    items = [];
  }
  return (
    <Wrapper className={className}>
      {items.map((item) => {
        const artists = combineArtists(item.artists);
        return (
          <Album
            key={item.id}
            id={item.id}
            name={item.name}
            artists={artists}
            showArtistName={showArtistName}
            imageSrc={item.images[0].url}
          />
        );
      })}
    </Wrapper>
  );
};

export default AlbumList;
