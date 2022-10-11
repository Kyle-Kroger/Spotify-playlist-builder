import { useState } from "react";
import styled from "styled-components";
import { fetcher } from "../../lib/fetcher";
import { useUserPlaylists } from "../../lib/hooks";
import CreatePlaylistContent from "../modals/CreatePlaylistContent";
import Modal from "../modals/Modal";
import { StyledButton } from "../ui";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CreatePlaylistNav = ({ userId, setPlaylistId }) => {
  const { mutateUserPlaylists } = useUserPlaylists();
  const [isOpen, setIsOpen] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);

  const createPlaylist = async () => {
    const endpoint = "/playlists/createNew";
    const bodyData = { userId, name: title, description, isPrivate };
    let newPlaylistData;

    try {
      // creates and gets the new playlist id
      newPlaylistData = await fetcher(endpoint, bodyData, "POST");

      // need to wait for the backend to update before doing this
      // set the new playlist as the active one
      setPlaylistId(newPlaylistData.id);
      // refresh user's playlists
      mutateUserPlaylists();
    } catch (err) {
      console.warn(err);
    }

    return newPlaylistData;
  };

  const handleCreateClicked = () => {
    console.log(title, description, isPrivate);
    const newPlaylistData = createPlaylist();
    setIsOpen(false);

    // clear the form
    setTitle("");
    setDescription("");
    setIsPrivate(false);
  };

  const handleTitleChanged = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChanged = (e) => {
    setDescription(e.target.value);
  };

  const handleIsPrivateClicked = (e) => {
    if (e.target.checked) {
      setIsPrivate(true);
    } else {
      setIsPrivate(false);
    }
  };

  return (
    <Wrapper>
      <StyledButton
        state="filled"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        Create Playlist
      </StyledButton>
      {isOpen && (
        <Modal
          title="Create a New Playlist"
          buttonText="Create"
          onConfirm={handleCreateClicked}
          onClose={() => {
            setIsOpen(false);
          }}
        >
          <CreatePlaylistContent
            title={title}
            description={description}
            isPrivate={isPrivate}
            onTitleChanged={handleTitleChanged}
            onDescriptionChanged={handleDescriptionChanged}
            onIsPrivateClicked={handleIsPrivateClicked}
          />
        </Modal>
      )}
    </Wrapper>
  );
};

export default CreatePlaylistNav;
