/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable camelcase */
/* eslint no-unused-expressions: ["error", { "allowTernary": true }] */

import { useEffect, useState } from "react";
import styled from "styled-components";
import { StyledImage } from "../ui";
import PlayerControls from "./PlayerControls";
import { QUERIES } from "../../styles";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  height: var(--player-height);
  width: 100%;
  background: var(--player-gradient);
`;

const PlayerImage = styled(StyledImage)`
  @media ${QUERIES.phone} {
    width: 54px;
    height: 54px;
  }
`;

const TrackInfo = styled.div`
  min-width: 250px;
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  margin: 0 var(--spacing-md);
`;

const TitleArtistWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
`;

const TrackPlaceholder = styled.div`
  min-width: 250px;
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  margin: 0 var(--spacing-md);

  @media ${QUERIES.phone} {
    display: none;
  }
`;

const track = {
  name: "",
  album: {
    images: [{ url: "" }],
  },
  artists: [{ name: "" }],
};

const Player = ({ token }) => {
  const [is_paused, setPaused] = useState(false);
  const [is_active, setActive] = useState(false);
  const [player, setPlayer] = useState(undefined);
  const [current_track, setTrack] = useState(track);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;

    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: "Web Playback SDK",
        getOAuthToken: (cb) => {
          cb(token);
        },
        volume: 0.5,
      });

      setPlayer(player);

      player.addListener("ready", ({ device_id }) => {
        console.log("Ready with Device ID", device_id);
      });

      player.addListener("not_ready", ({ device_id }) => {
        console.log("Device ID has gone offline", device_id);
      });

      player.addListener("player_state_changed", (state) => {
        if (!state) {
          return;
        }

        setTrack(state.track_window.current_track);
        setPaused(state.paused);

        player.getCurrentState().then((pState) => {
          !pState ? setActive(false) : setActive(true);
        });
      });

      player.connect();
    };
  }, [token]);
  return (
    <Wrapper>
      {/* {!isLoading && !isError && playbackState.success && (
        <>
          <TrackInfo>
            <PlayerImage
              src={playbackState.item.album.images[0].url}
              alt={playbackState.item.album.name}
              width="74px"
              height="74px"
              className=""
            />
            <TitleArtistWrapper>
              <h3>{playbackState.item.name}</h3>
              <h5>
                {playbackState.item.artists
                  .map((artist) => artist.name)
                  .join(", ")}
              </h5>
            </TitleArtistWrapper>
          </TrackInfo>
          <PlayerControls
            playbackState={playbackState}
            mutateUserPlaybackState={mutateUserPlaybackState}
          />
        </>
      )}
      <TrackPlaceholder /> */}
    </Wrapper>
  );
};

export default Player;
