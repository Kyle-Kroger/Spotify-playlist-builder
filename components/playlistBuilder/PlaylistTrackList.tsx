/* eslint-disable @typescript-eslint/no-shadow */
import { useEffect, useState } from "react";
import styled from "styled-components";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { usePlaylistStateStore } from "../../lib/store";
import { usePlaylistId } from "../../lib/hooks";
import PlaylistTrack from "./PlaylistTrack";

const Wrapper = styled.ul``;

const PlaylistTrackList = () => {
  const playlistId = usePlaylistStateStore((state) => state.currentPlaylistId);
  const { playlistData, isLoading, isError } = usePlaylistId(playlistId);
  const [displayedPlaylist, setDisplayedPlaylist] = useState([]);

  useEffect(() => {
    console.log("test");
    if (!isLoading && !isError && Object.keys(playlistData).length !== 0) {
      setDisplayedPlaylist(playlistData.tracks);
    }
  }, [isLoading, isError, playlistData]);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(displayedPlaylist);
    // start and end index = result.source.index, result.destination.index
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    // update spotify with the moved song
    setDisplayedPlaylist(items);
  };

  return (
    <div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="Tracklist">
          {(provided) => (
            <ul {...provided.droppableProps} ref={provided.innerRef}>
              {displayedPlaylist.map((track, i) => {
                return (
                  <Draggable key={track.id} draggableId={track.id} index={i}>
                    {(provided) => (
                      <li
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >
                        <PlaylistTrack track={track} />
                      </li>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default PlaylistTrackList;
