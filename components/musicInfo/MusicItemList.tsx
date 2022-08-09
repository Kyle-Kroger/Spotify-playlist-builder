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
  isPlaylist = false,
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
        let subtitle = "";
        if (hasSubtitle && "artists" in item) {
          subtitle = combineArtists(item.artists);
        }
        if (isPlaylist) {
          subtitle = `${item.owner.display_name}`;
          // temperary fix for blended playlist images being broken
          if (
            image.url ===
            "https://blend-playlist-covers.spotifycdn.com/v2/blend_LARGE-forest-seafoam-*.jpg"
          ) {
            image.url = image.url.replace("-*", "-en");
          }
        }
        return (
          <MusicItem
            key={item.id}
            id={item.id}
            title={item.name}
            subtitle={subtitle}
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
