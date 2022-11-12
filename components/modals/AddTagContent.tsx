import styled from "styled-components";
import { ITrackTag } from "../../lib/types";
import { TagList } from "../tagging";
import { StyledButton } from "../ui";
import CreateTagContent from "./CreateTagContent";

const dummyTags: ITrackTag[] = [
  {
    id: "1",
    name: "1999",
    bgColor: "red",
    textColor: "white",
  },
  {
    id: "3",
    name: "soundtrack",
    bgColor: "green",
    textColor: "white",
  },
  {
    id: "5",
    name: "soft",
    bgColor: "blue",
    textColor: "white",
  },
  {
    id: "7",
    name: "1999",
    bgColor: "red",
    textColor: "white",
  },
  {
    id: "9",
    name: "soundtrack",
    bgColor: "green",
    textColor: "white",
  },
  {
    id: "11",
    name: "soft",
    bgColor: "blue",
    textColor: "white",
  },
];

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: var(--spacing-sm);
`;

const TagListWrapper = styled.div`
  padding: var(--spacing-sm);
  border: 1px solid var(--color-grey-600);
  border-radius: var(--radius-subtle);
`;

const AddTagContent = ({
  tagText,
  tagBgColor,
  tagTextColor,
  isNewTag,
  setIsNewTag,
  handleNewTagClicked,
  selectedTag,
  onTextChanged,
  onBgColorChanged,
  onTextColorChanged,
}) => {
  return (
    <Wrapper>
      {!isNewTag && (
        <>
          <h3>-- Existing Tags --</h3>
          <TagListWrapper>
            <TagList
              tagArray={dummyTags}
              onClick={handleNewTagClicked}
              selectedTagId={
                typeof selectedTag !== "undefined" ? selectedTag.id : ""
              }
            />
          </TagListWrapper>
        </>
      )}

      {isNewTag && (
        <CreateTagContent
          tagText={tagText}
          tagBgColor={tagBgColor}
          tagTextColor={tagTextColor}
          onTextChanged={onTextChanged}
          onBgColorChanged={onBgColorChanged}
          onTextColorChanged={onTextColorChanged}
        />
      )}

      <StyledButton
        state="filled"
        onClick={() => {
          setIsNewTag((state) => !state);
        }}
      >
        {!isNewTag ? "Create a New Tag" : "Use an Existing Tag"}
      </StyledButton>
    </Wrapper>
  );
};

export default AddTagContent;
