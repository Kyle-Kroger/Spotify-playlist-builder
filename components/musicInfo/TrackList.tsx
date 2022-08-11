import styled from "styled-components";
import { combineArtists } from "../../lib/spotify";
import Track from "./Track";

const Wrapper = styled.div``;

const TrackList = ({ className, items, showImage = false, onClick }) => {
  if (!items) {
    items = [];
  }
  return (
    <Wrapper className={className}>
      {items.map((item, i) => {
        const artists = combineArtists(item.artists);
        return (
          <Track
            key={item.id}
            index={i}
            id={item.albumId}
            name={item.name}
            durationMS={item.duration}
            artists={artists}
            image={item.images[0].url}
            showImage={showImage}
            onClick={onClick}
          />
        );
      })}
    </Wrapper>
  );
};

export default TrackList;
