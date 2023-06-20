/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable camelcase */
/* eslint no-unused-expressions: ["error", { "allowTernary": true }] */

import { useEffect, useState } from "react";
import styled from "styled-components";
import { FaPlayCircle, FaPauseCircle } from "react-icons/fa";
import { StyledImage } from "../ui";
import PlayerControls from "./PlayerControls";
import { QUERIES } from "../../styles";
import MobilePlayer from "./MobliePlayer";
import { fetcher } from "../../lib/fetcher";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  height: var(--player-height);
  width: 100%;
  background: var(--player-gradient);

  /* Keep wrapper for spacing, but not display it's children on mobile */
  * {
    @media ${QUERIES.phone} {
      display: none;
    }
  }
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

const PauseButton = styled(FaPauseCircle)`
  cursor: pointer;
  transition: color 200ms ease-in-out, transform 200ms ease-in-out;

  :hover {
    transform: scale(1.05);
    color: var(--color-spotify-green);
  }
`;

const PlayButton = styled(FaPlayCircle)`
  cursor: pointer;
  transition: color 200ms ease-in-out, transform 200ms ease-in-out;

  :hover {
    transform: scale(1.05);
    color: var(--color-spotify-green);
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

const Player = ({ token }) => {
  const [is_paused, setPaused] = useState(false);
  const [is_active, setActive] = useState(false);
  const [is_Shuffle, setShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState(0);
  const [player, setPlayer] = useState(undefined);
  const [current_track, setTrack] = useState(track);
  const [position, setPosition] = useState(0);

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

  return (
    <>
      <Wrapper>
        {current_track && (
          <TrackInfo
            onClick={() => {
              console.log(is_Shuffle, repeatMode);
            }}
          >
            <PlayerImage
              src={current_track.album.images[0].url}
              alt="currently playing image"
              width="74px"
              height="74px"
              className=""
            />
            <TitleArtistWrapper>
              <h3>{current_track.name}</h3>
              <h5>
                {current_track.artists.map((artist) => artist.name).join(", ")}
              </h5>
            </TitleArtistWrapper>
          </TrackInfo>
        )}
        {player && (
          <PlayerControls
            is_paused={is_paused}
            repeatMode={repeatMode}
            shuffle={is_Shuffle}
            handleShuffle={handleShuffle}
            duration_ms={current_track.duration_ms}
            position={position}
            player={player}
          />
        )}

        <TrackPlaceholder />
      </Wrapper>
      <MobilePlayer />
    </>
  );
};

export default Player;
