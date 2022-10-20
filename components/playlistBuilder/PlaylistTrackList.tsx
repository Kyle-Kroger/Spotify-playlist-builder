/* eslint-disable react/no-array-index-key */
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
  const { playlistData, isLoading, isError, mutatePlaylist } =
    usePlaylistId(playlistId);
  const [displayedPlaylist, setDisplayedPlaylist] = useState([]);
  const [snapshotId, setSnapshotId] = useState("");

  useEffect(() => {
    if (!isLoading && !isError && Object.keys(playlistData).length !== 0) {
      setSnapshotId(playlistData.snapshot_id);
      setDisplayedPlaylist(playlistData.tracks);
    }
  }, [isLoading, isError, playlistData]);

  const reorderSpotify = async (trackStartIndex, trackEndIndex, snapshotId) => {
    // optimistic update
    await mutatePlaylist((data) => {
      // reorder the item to its new location
      const newTracks = [...data.tracks];
      const [reorderedItem] = newTracks.splice(trackStartIndex, 1);
      newTracks.splice(trackEndIndex, 0, reorderedItem);

      return {
        ...data,
        tracks: newTracks,
      };
    }, false);

    // Need to adjust end index because spotify doesn't replace it adds before
    const spotifyEndIndex =
      trackEndIndex > trackStartIndex ? trackEndIndex + 1 : trackEndIndex;

    const bodyData = {
      trackStartIndex,
      trackEndIndex: spotifyEndIndex,
      snapshotId,
    };
    const response = await fetcher(
      `/playlists/${playlistId}/reorder`,
      bodyData,
      "PUT"
    );

    // tell swr to revalidate to make sure they match up
    await mutatePlaylist();

    setSnapshotId(response.snapshot_id);
  };

  const removeSpotify = async (trackUri, index, snapshotId) => {
    // optimistic update
    await mutatePlaylist((data) => {
      // remove the item from playlist
      const newTracks = [...data.tracks];
      newTracks.splice(index, 1);
      return {
        ...data,
        tracks: newTracks,
      };
    }, false);

    // Update serverside
    const bodyData = {
      trackUri,
      index,
      snapshotId,
    };
    const response = await fetcher(
      `/playlists/${playlistId}/remove`,
      bodyData,
      "DELETE"
    );

    // tell swr to revalidate to make sure they match up
    await mutatePlaylist();

    setSnapshotId(response.snapshot_id);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    // Without updating here as well a quick flicker happens when moving tracks
    const items = Array.from(displayedPlaylist);

    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    // start and end index = result.source.index, result.destination.index
    reorderSpotify(result.source.index, result.destination.index, snapshotId);
    setDisplayedPlaylist(items);
  };

  const handleRemoveTrack = (index, trackUri) => {
    removeSpotify(trackUri, index, snapshotId);
  };

  const handleReorderModal = (startIndex, newIndex) => {
    // Without updating here as well a quick flicker happens when moving tracks
    const items = Array.from(displayedPlaylist);

    const [reorderedItem] = items.splice(startIndex, 1);
    items.splice(newIndex, 0, reorderedItem);

    reorderSpotify(startIndex, newIndex, snapshotId);
    setDisplayedPlaylist(items);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="Tracklist">
        {(provided) => (
          <Wrapper {...provided.droppableProps} ref={provided.innerRef}>
            {displayedPlaylist.map((track, i) => {
              return (
                <Draggable
                  key={`${track.id}-${i}`}
                  draggableId={`${track.id}-${i}`}
                  index={i}
                >
                  {(provided) => (
                    <ListItem
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                    >
                      <PlaylistTrack
                        track={track}
                        index={i}
                        playlistLength={displayedPlaylist.length}
                        handleReorderModal={handleReorderModal}
                        handleRemoveTrack={handleRemoveTrack}
                      />
                    </ListItem>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
            <div id="playlistBottom" />
          </Wrapper>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default PlaylistTrackList;
