import { useEffect, useRef, useState } from "react";
import useSWR from "swr";
import { fetcher } from "./fetcher";

// SWR hooks

export const useUser = () => {
  const { data, error } = useSWR("/user", fetcher);

  return {
    user: data || {},
    isLoading: !data && !error,
    isError: error,
  };
};

export const useUserPlaybackState = () => {
  const {
    data,
    error,
    mutate: mutateUserPlaybackState,
  } = useSWR("/user/player", fetcher, {
    refreshInterval: 1000,
  });

  return {
    playbackState: data || {},
    isLoading: !data && !error,
    isError: error,
    mutateUserPlaybackState,
  };
};

export const useUserPlaylists = () => {
  const {
    data,
    error,
    mutate: mutateUserPlaylists,
  } = useSWR("/playlists/userPlaylists", fetcher);

  return {
    playlists: data || [],
    isLoading: !data && !error,
    isError: error,
    mutateUserPlaylists,
  };
};

export const usePlaylistId = (id) => {
  const {
    data,
    error,
    mutate: mutatePlaylist,
  } = useSWR(`/playlists/${id}`, fetcher, {
    refreshInterval: 1000,
  });

  return {
    playlistData: data || {},
    isLoading: !data && !error,
    isError: error,
    mutatePlaylist,
  };
};

export const usePlaylistTags = (id) => {
  const { data, error } = useSWR(`/tags/${id}`, fetcher);

  return {
    playlistTags: data || [],
    isLoading: !data && !error,
    isError: error,
  };
};

export const useSearch = (SearchTerm) => {
  const { data, error } = useSWR(`/search/${SearchTerm}`, fetcher);

  return {
    searchData: data || [],
    isLoading: !data && !error,
    isError: error,
  };
};

export const useArtistId = (id) => {
  const { data, error } = useSWR(`/artists/${id}`, fetcher);

  return {
    artist: data || [],
    isLoading: !data && !error,
    isError: error,
  };
};

export const useAlbumId = (id) => {
  const { data, error } = useSWR(`/albums/${id}`, fetcher);

  return {
    album: data || [],
    isLoading: !data && !error,
    isError: error,
  };
};

// Dynamic height and width hook
export const useDynamicSize = (isLoading = false, isError = false) => {
  const [width, setWidth] = useState();
  const [height, setHeight] = useState();

  // useRef allows us to "store" the div in a constant,
  // and to access it via observedDiv.current
  const observedDiv = useRef(null);

  useEffect(() => {
    const handleElementResized = () => {
      if (observedDiv.current.offsetWidth !== width) {
        setWidth(observedDiv.current.offsetWidth);
      }
      if (observedDiv.current.offsetHeight !== height) {
        setHeight(observedDiv.current.offsetHeight);
      }
    };
    // we also instantiate the resizeObserver and we pass
    // the event handler to the constructor
    const resizeObserver = new ResizeObserver(handleElementResized);
    // the code in useEffect will be executed when the component
    // has mounted, so we are certain observedDiv.current will contain
    // the div we want to observe
    if (!isLoading && !isError) {
      resizeObserver.observe(observedDiv.current);
    }

    // if useEffect returns a function, it is called right before the
    // component unmounts, so it is the right place to stop observing
    // the div
    return function cleanup() {
      resizeObserver.disconnect();
    };
  }, [height, width, isLoading, isError]);
  return { width, height, observedDiv };
};
