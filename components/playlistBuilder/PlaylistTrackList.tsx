/* eslint-disable @typescript-eslint/no-shadow */
import { useEffect, useState } from "react";
import styled from "styled-components";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { usePlaylistStateStore } from "../../lib/store";
import { usePlaylistId } from "../../lib/hooks";
import PlaylistTrack from "./PlaylistTrack";
import { fetcher } from "../../lib/fetcher";

const Wrapper = styled.ul``;

const ListItem = styled.li``;

const PlaylistTrackList = () => {
  const playlistId = usePlaylistStateStore((state) => state.currentPlaylistId);
  const { playlistData, isLoading, isError } = usePlaylistId(playlistId);
  const [displayedPlaylist, setDisplayedPlaylist] = useState([]);
  const [snapshotId, setSnapshotId] = useState("");

  useEffect(() => {
    if (!isLoading && !isError && Object.keys(playlistData).length !== 0) {
      setSnapshotId(playlistData.snapshot_id);
      setDisplayedPlaylist(playlistData.tracks);
    }
  }, [isLoading, isError, playlistData]);

  const reorderSpotify = async (trackStartIndex, trackEndIndex, snapshotId) => {
    const bodyData = {
      trackStartIndex,
      trackEndIndex,
      snapshotId,
    };
    const response = await fetcher(
      `/playlists/${playlistId}/reorder`,
      bodyData,
      "PUT"
    );

    setSnapshotId(response.snapshot_id);
  };

  const removeSpotify = async (trackUri, snapshotId) => {
    const bodyData = {
      trackUri,
      snapshotId,
    };
    const response = await fetcher(
      `/playlists/${playlistId}/remove`,
      bodyData,
      "DELETE"
    );

    setSnapshotId(response.snapshot_id);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(displayedPlaylist);
    // start and end index = result.source.index, result.destination.index
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    // update spotify with the moved song
    reorderSpotify(result.source.index, result.destination.index, snapshotId);
    setDisplayedPlaylist(items);
  };

  const handleRemoveTrack = (index, trackUri) => {
    // create a new array from displayedPlaylist and remove the item at 'index' from it
    const items = Array.from(displayedPlaylist);
    items.splice(index, 1);

    removeSpotify(trackUri, snapshotId);
    setDisplayedPlaylist(items);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="Tracklist">
        {(provided) => (
          <Wrapper {...provided.droppableProps} ref={provided.innerRef}>
            {displayedPlaylist.map((track, i) => {
              return (
                <Draggable key={track.id} draggableId={track.id} index={i}>
                  {(provided) => (
                    <ListItem
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                    >
                      <PlaylistTrack
                        track={track}
                        index={i}
                        handleRemoveTrack={handleRemoveTrack}
                      />
                    </ListItem>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </Wrapper>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default PlaylistTrackList;
