import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useDynamicSize, usePlaylistId } from "../../lib/hooks";
import { durationMSToStandard } from "../../lib/spotify";
import { usePlaylistStateStore } from "../../lib/store";
import { StyledImage } from "../ui";

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  background: #106b30;
  padding: var(--spacing-lg);
  justify-content: center;
  align-items: center;
  gap: var(--spacing-md);
`;

const TextWrapper = styled.div<{
  isWrapped: boolean;
}>`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 400px;
  text-align: ${(p) => (p.isWrapped ? "center" : "left")};

  h1 {
    margin-bottom: var(--spacing-md);
  }

  p {
    margin-bottom: var(--spacing-xs);
  }
`;

const PlaylistHeader = () => {
  const playlistId = usePlaylistStateStore((state) => state.currentPlaylistId);
  const { playlistData, isLoading, isError } = usePlaylistId(playlistId);
  const { width, height, observedDiv } = useDynamicSize(isLoading, isError);
  const {
    width: textWidth,
    height: textHeight,
    observedDiv: observedText,
  } = useDynamicSize(isLoading, isError);

  // if no playlist id is found
  if (!isLoading && !isError && Object.keys(playlistData).length === 0) {
    return <div>{`no playlist with id ${playlistId} was found`}</div>;
  }

  // Give anything that doesn't have an image a url of ""
  let image = { url: "" };
  if (!isLoading && !isError) {
    image = playlistData.images[0] ? playlistData.images[0] : { url: "" };
  }

  // temperary fix for blended playlist images being broken
  if (
    image.url ===
    "https://blend-playlist-covers.spotifycdn.com/v2/blend_LARGE-forest-seafoam-*.jpg"
  ) {
    image.url = image.url.replace("-*", "-en");
  }

  // calculate song time
  let timeMS = 0;
  let displayTime = "";
  if (!isLoading && !isError) {
    playlistData.tracks.forEach((playlist) => {
      timeMS += +playlist.duration;
    });
    const timeArr = durationMSToStandard(timeMS).split(":");
    if (+timeArr[0] >= 60) {
      const hours = Math.round(+timeArr[0] / 60);
      displayTime = `about ${hours} ${hours === 1 ? "hour" : "hours"}`;
    } else {
      const minutes = +timeArr[0];
      const seconds = +timeArr[1];
      displayTime = `${minutes} ${
        minutes === 1 ? "minute" : "minutes"
      } and ${seconds} ${seconds === 1 ? "second" : "seconds"}`;
    }
  }

  return (
    <div>
      {!isLoading && !isError && (
        <Wrapper ref={observedDiv}>
          <TextWrapper
            ref={observedText}
            isWrapped={width && textWidth === width - 48 /* padding */}
          >
            <h1>{playlistData.name}</h1>
            <p>
              {playlistData.owner.display_name} - {playlistData.tracks.length}{" "}
              {playlistData.tracks.length === 1 ? "song" : "songs"} -{" "}
              {displayTime}
            </p>
          </TextWrapper>
          <StyledImage
            src={image.url}
            alt={playlistData.name}
            width="250px"
            className=""
            // onclick should open on spotify, hover effect to mention this
          />
        </Wrapper>
      )}
    </div>
  );
};

export default PlaylistHeader;
