import { useState } from "react";
import styled from "styled-components";
import { AddTagContent, Modal } from "../modals";
import { NewTagButton, Tag, TagList } from "../tagging";
import { ITrackTag } from "../../lib/types";
import { fetcher } from "../../lib/fetcher";
import { usePlaylistId } from "../../lib/hooks";
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
  const { playlistData, isLoading, isError, mutatePlaylist } =
    usePlaylistId(playlistId);

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
  };

  const handleTagClicked = (tag: ITrackTag) => {
    setTagToRemove(tag);
    setShowRemoveTag(true);

    console.log(tag.id);
  };

  const handleRemoveTag = async () => {
    try {
      if (typeof tagToRemove !== "undefined") {
        // optimistic update
        await mutatePlaylist((data) => {
          const newTracks = [...data.tracks];

          // track index to delete tag to
          const index = newTracks.findIndex((track) => track.uri === trackUri);
          console.log(newTracks[index].tagArray);
          const tagIndex = newTracks[index].tagArray.findIndex(
            (tag) => tag.id === tagToRemove.id
          );

          // delete tag

          // return new data with edited tracks
          return {
            ...data,
            tracks: newTracks,
          };
        }, false);

        // backend update
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

    await mutatePlaylist();
  };

  const handleCreateTag = async () => {
    try {
      const { id: userId } = await fetcher(`/user`);

      // new tag or existing tag
      let newTag: ITrackTag = { id: "", name: "", bgColor: "", textColor: "" };
      if (isNewTag) {
        newTag = {
          id: "updating",
          name: newTagText,
          bgColor: newTagBgColor,
          textColor: newTagTextColor,
        };
      } else if (!isNewTag && typeof selectedTag !== "undefined") {
        newTag = {
          id: selectedTag.id,
          name: selectedTag.name,
          bgColor: selectedTag.bgColor,
          textColor: selectedTag.textColor,
        };
      }

      // optimistic update
      await mutatePlaylist((data) => {
        const newTracks = [...data.tracks];

        // track index to add tag to
        const index = newTracks.findIndex((track) => track.uri === trackUri);

        // add tag
        newTracks[index].tagArray.push(newTag);

        // return new data with edited tracks
        return {
          ...data,
          tracks: newTracks,
        };
      }, false);

      // backend update
      await fetcher(
        `/tags/${playlistId}`,
        {
          name: newTag.name,
          textColor: newTag.textColor,
          bgColor: newTag.bgColor,
          userId,
          trackUri,
        },
        "POST"
      );
    } catch (e) {
      console.log(e.message);
    }

    setShowAddTag(false);
    setNewTagText("");

    await mutatePlaylist();
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
            playlistId={playlistId}
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
