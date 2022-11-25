/* eslint-disable no-underscore-dangle */
import styled from "styled-components";
import { usePlaylistTags } from "../../lib/hooks";
import { ITrackTag } from "../../lib/types";
import { TagList } from "../tagging";
import { Loader, StyledButton } from "../ui";
import CreateTagContent from "./CreateTagContent";

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
  playlistId,
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
  const { playlistTags, isLoading, isError } = usePlaylistTags(playlistId);
  return (
    <Wrapper>
      {!isNewTag && (
        <>
          <h3>-- Existing Tags --</h3>
          <TagListWrapper>
            {!isLoading && !isError && (
              <TagList
                tagArray={playlistTags.map((tag): ITrackTag => {
                  return {
                    id: tag._id,
                    name: tag.name,
                    bgColor: tag.bgColor,
                    textColor: tag.textColor,
                  };
                })}
                onClick={handleNewTagClicked}
                selectedTagId={
                  typeof selectedTag !== "undefined" ? selectedTag.id : ""
                }
              />
            )}
            {isLoading && <Loader />}
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
