import useSWR from "swr";
import { fetcher } from "./fetcher";

export const useUserPlaylists = () => {
  const { data, error } = useSWR("/playlists/userPlaylists", fetcher);

  return {
    playlists: data || [],
    isLoading: !data && !error,
    isError: error,
  };
};

export const usePlaylistId = (id) => {
  const { data, error } = useSWR(`/playlists/${id}`, fetcher);

  return {
    playlistData: data || {},
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
