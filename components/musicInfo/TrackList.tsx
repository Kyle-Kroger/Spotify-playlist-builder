import styled from "styled-components";
import Track from "./Track";

const Wrapper = styled.div``;

const TrackList = ({ className, items }) => {
  if (!items) {
    items = [];
  }
  return (
    <Wrapper className={className}>
      {items.map((item) => (
        <Track
          key={item.id}
          name={item.name}
          // Need to update artists to use all artists
          artists={item.artists[0].name}
          albumImage={item.albumImages[1].url}
        />
      ))}
    </Wrapper>
  );
};

export default TrackList;
