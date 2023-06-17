import styled from "styled-components";
import { combineArtists } from "../../lib/spotify";
import Track from "./Track";

const Wrapper = styled.div``;

const TrackList = ({
  className,
  items,
  showImage = false,
  playlistUri = "",
  onClick,
}) => {
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
            playlistUri={playlistUri}
            id={item.albumId}
            uri={item.uri}
            name={item.name}
            durationMS={item.duration}
            artistArray={item.artists}
            artists={artists}
            image={item.images[0].url}
            images={item.images}
            showImage={showImage}
            albumId={item.albumId}
            albumName={item.albumName}
            onClick={onClick}
          />
        );
      })}
    </Wrapper>
  );
};

export default TrackList;
