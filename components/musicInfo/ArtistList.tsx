import styled from "styled-components";
import Artist from "./Artist";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const ArtistList = ({ className, items }) => {
  if (!items) {
    items = [];
  }
  return (
    <Wrapper className={className}>
      {items.map((item) => {
        // Not every artist has an image, if on image there is no url property thus crash
        // Give anything that doesn't have an image a url of ""
        const image = item.images[0] ? item.images[0] : { url: "" };
        return <Artist name={item.name} imageSrc={image.url} />;
      })}
    </Wrapper>
  );
};

export default ArtistList;
