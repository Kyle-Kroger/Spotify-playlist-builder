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

export const useSearch = (SearchTerm) => {
  const { data, error } = useSWR(`/search/${SearchTerm}`, fetcher);

  return {
    searchData: data || [],
    isLoading: !data && !error,
    isError: error,
  };
};
