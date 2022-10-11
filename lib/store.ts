import create from "zustand";

export enum SIDEBAR_PAGE {
  NONE,
  SEARCH,
  PLAYLIST,
  TAGGING,
}

interface PageState {
  currentPage: number;
  setCurrentPage: (newPage: number) => void;
}

export const usePageStateStore = create<PageState>()((set) => ({
  currentPage: SIDEBAR_PAGE.SEARCH,
  setCurrentPage: (newPage) => set({ currentPage: newPage }),
}));

interface PlaylistState {
  currentPlaylistId: string;
  setPlaylistId: (newPage: string) => void;
}

export const usePlaylistStateStore = create<PlaylistState>()((set) => ({
  currentPlaylistId: "",
  setPlaylistId: (playlistId) => set({ currentPlaylistId: playlistId }),
}));
