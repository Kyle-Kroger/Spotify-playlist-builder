import styled from "styled-components";
import { useState } from "react";
import { BsDashCircle } from "react-icons/bs";
import { combineArtists, durationMSToStandard } from "../../lib/spotify";
import { StyledImage } from "../ui";
import { Modal, ReorderPlaylistTrack } from "../modals";
import { NewTagButton, TagList } from "../tagging";
import { ITrackTag } from "../../lib/types";
import PlaylistTrackTaglist from "./PlaylistTrackTaglist";

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
  margin-bottom: 4px;
  background-color: var(--color-grey-800);
`;

const TrackWrapper = styled.div`
  display: flex;
  align-items: center;
  padding-right: var(--spacing-xs);

  div {
    padding: var(--spacing-sm) var(--spacing-sm);
    padding-bottom: var(--spacing-xs);
  }
`;

const TrackNumber = styled.div`
  width: 55px;
  text-align: center;
  cursor: pointer;
`;

const TrackTitle = styled.div`
  /* Min-width of 0 is needed to properly clip text */
  min-width: 0;
  flex: 1;
  display: flex;
  align-items: center;
  padding-left: 0;
`;

const TrackText = styled.div`
  /* Min-width of 0 is needed to properly clip text */
  min-width: 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  line-height: normal;

  h3 {
    margin-bottom: 6px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: default;
  }

  h5 {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: var(--color-text-subdued);
  }
`;

const TrackTime = styled.div`
  width: 65px;
  text-align: center;
`;

const TrackRemove = styled.div`
  width: 55px;
  cursor: pointer;
`;

const RemoveIcon = styled(BsDashCircle)`
  color: var(--color-spotify-green);
  font-size: 30px;
  display: block;
  margin: auto;
  cursor: pointer;
`;

const TagWrapper = styled.div`
  display: flex;
  gap: var(--spacing-md);
  padding: 0 var(--spacing-md);
  padding-bottom: var(--spacing-xs);
`;

const PlaylistTrack = ({
  track,
  index,
  playlistLength,
  handleReorderModal,
  handleRemoveTrack,
}) => {
  const [showReorderModal, setShowReorderModal] = useState(false);
  const [newIndex, setNewIndex] = useState(index);
  const standardTime = durationMSToStandard(track.duration);
  const artists = combineArtists(track.artists);

  const handleRemoveClick = () => {
    handleRemoveTrack(index, track.uri);
  };

  const handleNewIndexChanged = (e) => {
    let inputIndex = e.target.value;
    if (inputIndex > playlistLength) {
      inputIndex = playlistLength;
    }
    if (inputIndex < 1 && inputIndex !== "") {
      inputIndex = 1;
    }
    setNewIndex(inputIndex);
  };

  const handleTrackReordered = () => {
    // Arrays are at zero, but we display starting at 1
    // therefore the index that is displayed is 1 off from the actual index
    handleReorderModal(index, newIndex - 1);
    setShowReorderModal(false);
  };
  return (
    <Wrapper>
      <TrackWrapper>
        <TrackNumber
          onClick={() => {
            setNewIndex(index + 1);
            setShowReorderModal(true);
          }}
        >
          {index + 1}
        </TrackNumber>
        {showReorderModal && (
          <Modal
            title="Move to Position:"
            buttonText="Reorder"
            onClose={() => {
              setShowReorderModal(false);
            }}
            onConfirm={handleTrackReordered}
          >
            <ReorderPlaylistTrack
              index={index}
              newIndex={newIndex}
              max={playlistLength}
              setNewIndex={setNewIndex}
              onIndexChanged={handleNewIndexChanged}
            />
          </Modal>
        )}
        <TrackTitle>
          <StyledImage
            src={track.images[0].url}
            alt={track.albumName}
            width="55px"
            height="55px"
            className=""
          />
          <TrackText>
            <h3 title={track.name}>{track.name}</h3>
            <h5>
              {artists} / {track.albumName}
            </h5>
          </TrackText>
        </TrackTitle>
        <TrackTime>{standardTime}</TrackTime>
        <TrackRemove onClick={handleRemoveClick}>
          <RemoveIcon />
        </TrackRemove>
      </TrackWrapper>
      <TagWrapper>
        <PlaylistTrackTaglist tagArray={track.tagArray} trackUri={track.uri} />
      </TagWrapper>
    </Wrapper>
  );
};

export default PlaylistTrack;
