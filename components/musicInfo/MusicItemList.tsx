import styled from "styled-components";
import { combineArtists } from "../../lib/spotify";
import MusicItem from "./MusicItem";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const MusicItemList = ({
  className,
  items,
  hasSubtitle = false,
  isRound = false,
  onClick,
}) => {
  if (!items) {
    items = [];
  }
  return (
    <Wrapper className={className}>
      {items.map((item) => {
        // Not every item has an image, if on image there is no url property thus crash
        // Give anything that doesn't have an image a url of ""
        const image = item.images[0] ? item.images[0] : { url: "" };
        let artists = "";
        if (hasSubtitle) {
          artists = combineArtists(item.artists);
        }
        return (
          <MusicItem
            key={item.id}
            id={item.id}
            title={item.name}
            subtitle={artists}
            isRound={isRound}
            imageSrc={image.url}
            onClick={onClick}
          />
        );
      })}
    </Wrapper>
  );
};

export default MusicItemList;
