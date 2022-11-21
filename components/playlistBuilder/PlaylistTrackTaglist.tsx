import { useState } from "react";
import styled from "styled-components";
import { AddTagContent, Modal } from "../modals";
import { NewTagButton, Tag, TagList } from "../tagging";
import { ITrackTag } from "../../lib/types";
import { fetcher } from "../../lib/fetcher";
import { usePlaylistStateStore } from "../../lib/store";

const PlaceholderText = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--color-text-subdued);
  padding-left: var(--spacing-sm);
`;

const RemoveTagWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: var(--spacing-lg);
`;

const PlaylistTrackTaglist = ({ tagArray, trackUri }) => {
  const playlistId = usePlaylistStateStore((state) => state.currentPlaylistId);
  const [showAddTag, setShowAddTag] = useState(false);
  const [showRemoveTag, setShowRemoveTag] = useState(false);
  const [tagToRemove, setTagToRemove] = useState<ITrackTag | undefined>(
    undefined
  );

  const [selectedTag, setSelectedTag] = useState<ITrackTag | undefined>(
    undefined
  );

  const [newTagText, setNewTagText] = useState("");
  const [newTagBgColor, setNewTagBgColor] = useState("#0d2e63");
  const [newTagTextColor, setNewTagTextColor] = useState("#ffffff");

  const [isNewTag, setIsNewTag] = useState(false);

  const handleNewTagClicked = (tag: ITrackTag) => {
    const newTag: ITrackTag = {
      id: tag.id,
      name: tag.name,
      bgColor: tag.bgColor,
      textColor: tag.textColor,
    };
    setSelectedTag(newTag);
    console.log(selectedTag);
  };

  const handleTagClicked = (tag: ITrackTag) => {
    setTagToRemove(tag);
    setShowRemoveTag(true);
  };

  const handleRemoveTag = async () => {
    try {
      if (typeof tagToRemove !== "undefined") {
        await fetcher(
          `/tags/${playlistId}`,
          { id: tagToRemove.id, trackUri },
          "DELETE"
        );
      }
    } catch (e) {
      console.log(e.message);
    }

    setShowRemoveTag(false);
    setTagToRemove(undefined);
  };

  const handleCreateTag = async () => {
    try {
      const { id: userId } = await fetcher(`/user`);

      // if a brand new tag
      if (isNewTag) {
        await fetcher(
          `/tags/${playlistId}`,
          {
            name: newTagText,
            textColor: newTagTextColor,
            bgColor: newTagBgColor,
            userId,
            trackUri,
          },
          "POST"
        );
      }

      // if existing tag
      if (!isNewTag && typeof selectedTag !== "undefined") {
        await fetcher(
          `/tags/${playlistId}`,
          {
            name: selectedTag.name,
            textColor: selectedTag.textColor,
            bgColor: selectedTag.bgColor,
            userId,
            trackUri,
          },
          "POST"
        );
      }
    } catch (e) {
      console.log(e.message);
    }

    setShowAddTag(false);
    setNewTagText("");
  };

  return (
    <>
      <NewTagButton
        onClick={() => {
          setShowAddTag(true);
        }}
      />
      {showAddTag && (
        <Modal
          title="Add a Tag"
          buttonText="Add"
          onClose={() => {
            setShowAddTag(false);
          }}
          onConfirm={handleCreateTag}
        >
          <AddTagContent
            tagText={newTagText}
            tagBgColor={newTagBgColor}
            tagTextColor={newTagTextColor}
            isNewTag={isNewTag}
            setIsNewTag={setIsNewTag}
            handleNewTagClicked={handleNewTagClicked}
            selectedTag={selectedTag}
            onTextChanged={(e) => setNewTagText(e.target.value)}
            // is there a way to make this only fire every half second with a timer?
            // Dragging the color around in the picker causes so many state changes
            onBgColorChanged={(e) => setNewTagBgColor(e.target.value)}
            onTextColorChanged={(e) => setNewTagTextColor(e.target.value)}
          />
        </Modal>
      )}
      {showRemoveTag && (
        <Modal
          title="Remove a Tag"
          buttonText="Remove"
          onClose={() => {
            setShowRemoveTag(false);
          }}
          onConfirm={handleRemoveTag}
        >
          <RemoveTagWrapper>
            <p>Remove the following tag?</p>
            {typeof tagToRemove !== "undefined" && (
              <Tag
                id={tagToRemove.id}
                name={tagToRemove.name}
                bgColor={tagToRemove.bgColor}
                textColor={tagToRemove.textColor}
                onClick={() => {}}
              />
            )}
          </RemoveTagWrapper>
        </Modal>
      )}
      {tagArray.length < 1 && (
        <PlaceholderText>Click to add a Tag</PlaceholderText>
      )}
      {tagArray.length > 0 && (
        <TagList tagArray={tagArray} onClick={handleTagClicked} />
      )}
    </>
  );
};

export default PlaylistTrackTaglist;
