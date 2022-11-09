import styled from "styled-components";
import Tag from "./Tag";
import { ITrackTag } from "../../lib/types";
import { helpers } from "../../styles";

const Wrapper = styled.div`
  display: flex;
  gap: var(--spacing-md);
  flex-wrap: wrap;
  // scroll for tags
  overflow: auto;
  ${helpers.spotifySearchBar}
`;

const TagList = ({ tagArray }) => {
  return (
    <Wrapper>
      {tagArray.map((tag: ITrackTag) => {
        return (
          <Tag
            key={tag.id}
            id={tag.id}
            name={tag.name}
            bgColor={tag.bgColor}
            textColor={tag.textColor}
          />
        );
      })}
    </Wrapper>
  );
};

export default TagList;
