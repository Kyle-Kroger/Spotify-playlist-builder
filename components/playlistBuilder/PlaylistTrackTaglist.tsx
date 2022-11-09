import { useState } from "react";
import styled from "styled-components";
import { AddTagContent, Modal } from "../modals";
import { NewTagButton, TagList } from "../tagging";
import { ITrackTag } from "../../lib/types";
import { fetcher } from "../../lib/fetcher";
import { usePlaylistStateStore } from "../../lib/store";

const PlaceholderText = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--color-text-subdued);
`;

const PlaylistTrackTaglist = ({ tagArray, trackUri }) => {
  const playlistId = usePlaylistStateStore((state) => state.currentPlaylistId);
  const [showAddTag, setShowAddTag] = useState(false);

  const [selectedTag, setSelectedTag] = useState<ITrackTag | undefined>(
    undefined
  );

  const [newTagText, setNewTagText] = useState("");
  const [newTagBgColor, setNewTagBgColor] = useState("#0d2e63");
  const [newTagTextColor, setNewTagTextColor] = useState("#ffffff");

  const [isNewTag, setIsNewTag] = useState(true);

  const handleCreateTag = async () => {
    try {
      // if a brand new tag
      if (isNewTag) {
        const { id: userId } = await fetcher(`/user`);

        console.log(`${userId} from playlistTrackTaglist`);

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
    } catch (e) {
      console.log(e.message);
    }

    setShowAddTag(false);
  };

  return (
    <>
      <NewTagButton onClick={() => setShowAddTag(true)} />
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
            onTextChanged={(e) => setNewTagText(e.target.value)}
            // is there a way to make this only fire every half second with a timer?
            // Dragging the color around in the picker causes so many state changes
            onBgColorChanged={(e) => setNewTagBgColor(e.target.value)}
            onTextColorChanged={(e) => setNewTagTextColor(e.target.value)}
          />
        </Modal>
      )}
      {tagArray.length < 1 && (
        <PlaceholderText>Click to add a Tag</PlaceholderText>
      )}
      {tagArray.length > 1 && <TagList tagArray={tagArray} />}
    </>
  );
};

export default PlaylistTrackTaglist;
