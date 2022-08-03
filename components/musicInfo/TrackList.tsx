import styled from "styled-components";
import { combineArtists } from "../../lib/spotify";
import Track from "./Track";

const Wrapper = styled.div``;

const TrackList = ({ className, items }) => {
  if (!items) {
    items = [];
  }
  return (
    <Wrapper className={className}>
      {items.map((item) => {
        const artists = combineArtists(item.artists);
        return (
          <Track
            key={item.id}
            name={item.name}
            artists={artists}
            albumImage={item.albumImages[1].url}
          />
        );
      })}
    </Wrapper>
  );
};

export default TrackList;
