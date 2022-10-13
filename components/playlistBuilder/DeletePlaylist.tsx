import { useState } from "react";
import styled from "styled-components";
import { fetcher } from "../../lib/fetcher";
import { useUserPlaylists } from "../../lib/hooks";
import { usePlaylistStateStore } from "../../lib/store";
import Modal from "../modals/Modal";
import { StyledButton } from "../ui";

const Wrapper = styled.div``;

const DeletePlaylist = ({ playlistId }) => {
  const { mutateUserPlaylists } = useUserPlaylists();
  const setPlaylistId = usePlaylistStateStore((state) => state.setPlaylistId);
  const [openDelete, setOpenDelete] = useState(false);

  const deletePlaylist = async () => {
    const endpoint = `/playlists/${playlistId}/delete`;
    let wasDeleted;

    try {
      // Attempt to delete the playlist
      wasDeleted = await fetcher(endpoint, {}, "DELETE");
    } catch (err) {
      console.warn(err);
    }

    // need to wait for the backend to update before doing this
    // set the new playlist as nothing
    setPlaylistId("");
    // refresh user's playlists
    mutateUserPlaylists();
    console.log(wasDeleted);
    return wasDeleted;
  };

  const handleDeleteClicked = () => {
    deletePlaylist();
    setOpenDelete(false);
  };

  return (
    <Wrapper>
      <StyledButton
        state="filled"
        onClick={() => {
          setOpenDelete(true);
        }}
      >
        Delete Playlist
      </StyledButton>
      {openDelete && (
        <Modal
          title="Delete Playlist"
          buttonText="Delete"
          onClose={() => {
            setOpenDelete(false);
          }}
          onConfirm={handleDeleteClicked}
        >
          Are you sure you want to delete this playlist? This action is
          irreversible.
        </Modal>
      )}
    </Wrapper>
  );
};

export default DeletePlaylist;
