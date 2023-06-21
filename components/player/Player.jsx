/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable camelcase */
/* eslint no-unused-expressions: ["error", { "allowTernary": true }] */

import { useEffect, useState } from "react";
import styled from "styled-components";
import { StyledImage } from "../ui";
import PlayerControls from "./PlayerControls";
import { QUERIES } from "../../styles";
import { fetcher } from "../../lib/fetcher";
import PlayerWrapper from "./PlayerWrapper";
import { ExpandDownIcon, ExpandUpIcon } from "../ui/StyledIcons";

const MobileClosed = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media ${QUERIES.phone} {
    width: 100%;
    padding: 13px;
  }
`;

const PlayerImage = styled(StyledImage)`
  width: 74px;
  height: 74px;

  @media ${QUERIES.phone} {
    width: 54px;
    height: 54px;
  }
`;

const TrackInfo = styled.div`
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  margin-left: var(--spacing-md);
`;

const TitleArtistWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
`;

const MobileExpandUpIcon = styled(ExpandUpIcon)`
  display: none;
  @media ${QUERIES.phone} {
    display: block;
    padding: var(--spacing-xs);
  }
`;

const MobileExpandDownIcon = styled(ExpandDownIcon)`
  display: none;
  @media ${QUERIES.phone} {
    display: block;
    padding: var(--spacing-xs);
  }
`;

const TrackPlaceholder = styled.div`
  min-width: 250px;
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  margin: 0 var(--spacing-md);

  @media ${QUERIES.tabetAndDown} {
    min-width: 1px;
  }

  @media ${QUERIES.phone} {
    display: none;
  }
`;

const NoPlayerMessage = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  width: fit-content;
  height: fit-content;

  p {
    font-size: var(--fz-md);
    text-align: center;
    line-height: 1.8;

    @media ${QUERIES.phone} {
      font-size: var(--fz-sm);
      padding: 0 var(--spacing-md);
    }
  }
`;

const track = {
  name: "",
  album: {
    images: [{ url: "" }],
  },
  artists: [{ name: "" }],
  duration_ms: "",
};

const Player = () => {
  const [token, setToken] = useState("");
  const [is_paused, setPaused] = useState(false);
  const [is_active, setActive] = useState(false);
  const [is_Shuffle, setShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState(0);
  const [player, setPlayer] = useState(undefined);
  const [current_track, setTrack] = useState(track);
  const [position, setPosition] = useState(0);

  const [isOpen, setIsOpen] = useState(false);
  const [playAnimation, setPlayAnimation] = useState(false);

  useEffect(() => {
    async function getToken() {
      const response = await fetcher("/token");
      setToken(response.token);
    }

    // refresh token if needed
    if (!token) {
      setToken(getToken());
    }

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
        setActive(false);
      });

      player.addListener("player_state_changed", (state) => {
        if (!state) {
          return;
        }

        // refresh token if needed
        setToken(getToken());
        setTrack(state.track_window.current_track);
        setPaused(state.paused);
        setPosition(state.position);
        setShuffle(state.shuffle);
        setRepeatMode(state.repeat_mode);

        player.getCurrentState().then((pState) => {
          !pState ? setActive(false) : setActive(true);
        });
      });

      player.connect();
    };
  }, [token]);

  // needs to be in its own useEffect so it doesn't cause an infinite loop
  useEffect(() => {
    const intervalId = setInterval(() => {
      setPosition((prev) => (is_active && !is_paused ? prev + 500 : prev + 0));
    }, 500);
    return () => clearInterval(intervalId);
  }, [is_active, is_paused]);

  const handleExpand = () => {
    setIsOpen(!isOpen);
    setPlayAnimation(true);
  };

  const handleShuffle = async () => {
    // optimstic update
    setShuffle((prev) => !prev);
    try {
      const bodyData = { state: is_Shuffle };
      await fetcher("/user/player/shuffle", bodyData, "PUT");
    } catch (err) {
      console.log(err);
    }
  };

  const handleRepeat = async () => {
    // optimstic update
    const currentRepeat = repeatMode;
    setRepeatMode((prev) => (prev < 2 ? prev + 1 : 0));
    try {
      const bodyData = { state: currentRepeat };
      await fetcher("/user/player/repeat", bodyData, "PUT");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <PlayerWrapper
      isOpen={isOpen}
      playAnimation={playAnimation}
      onAnimationEnd={() => setPlayAnimation(false)}
    >
      {(!current_track || !player || !is_active) && (
        <NoPlayerMessage>
          <p>The player is currently inactive</p>
          <p>For more info click the help page in navigation</p>
        </NoPlayerMessage>
      )}
      {current_track && is_active && (
        <MobileClosed>
          <TrackInfo>
            <PlayerImage
              src={current_track.album.images[0].url}
              alt="currently playing image"
              className=""
            />
            <TitleArtistWrapper>
              <h3>{current_track.name}</h3>
              <h5>
                {current_track.artists.map((artist) => artist.name).join(", ")}
              </h5>
            </TitleArtistWrapper>
          </TrackInfo>
          {isOpen && (
            <MobileExpandDownIcon fontSize="54px" onClick={handleExpand} />
          )}
          {!isOpen && (
            <MobileExpandUpIcon fontSize="54px" onClick={handleExpand} />
          )}
        </MobileClosed>
      )}
      {player && current_track && is_active && (
        <PlayerControls
          is_paused={is_paused}
          repeatMode={repeatMode}
          handleRepeat={handleRepeat}
          shuffle={is_Shuffle}
          handleShuffle={handleShuffle}
          duration_ms={current_track.duration_ms}
          position={position}
          player={player}
        />
      )}

      <TrackPlaceholder />
    </PlayerWrapper>
  );
};

export default Player;
