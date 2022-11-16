import styled from "styled-components";
import Tag from "./Tag";
import { ITrackTag } from "../../lib/types";
import { helpers } from "../../styles";

const Wrapper = styled.div`
  display: flex;
  gap: var(--spacing-md);
  flex-wrap: wrap;
  padding: 0 var(--spacing-sm);
  ${helpers.spotifySearchBar}
`;

const TagList = ({ tagArray, onClick, selectedTagId = "" }) => {
  return (
    <Wrapper>
      {tagArray.map((tag: ITrackTag) => {
        const isSelected = selectedTagId === tag.id;
        return (
          <Tag
            key={tag.id}
            id={tag.id}
            name={tag.name}
            bgColor={tag.bgColor}
            textColor={tag.textColor}
            onClick={onClick}
            selected={isSelected}
          />
        );
      })}
    </Wrapper>
  );
};

export default TagList;
