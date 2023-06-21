import create from "zustand";

export enum SIDEBAR_PAGE {
  NONE,
  SEARCH,
  PLAYLIST,
  TAGGING,
  HELP,
}

interface PageState {
  currentPage: number;
  isHidden: boolean;
  setCurrentPage: (newPage: number) => void;
  setIsHidden: (state) => void;
}

export const usePageStateStore = create<PageState>()((set) => ({
  currentPage: SIDEBAR_PAGE.SEARCH,
  isHidden: false,
  setCurrentPage: (newPage) => set({ currentPage: newPage }),
  setIsHidden: (state) => set({ isHidden: state }),
}));

interface PlaylistState {
  currentPlaylistId: string;
  setPlaylistId: (newPage: string) => void;
}

export const usePlaylistStateStore = create<PlaylistState>()((set) => ({
  currentPlaylistId: "",
  setPlaylistId: (playlistId) => set({ currentPlaylistId: playlistId }),
}));

interface UserState {
  currentUserId: string;
  setCurrentUserId: (newId: string) => void;
}

export const useUserStateStore = create<UserState>()((set) => ({
  currentUserId: "",
  setCurrentUserId: (id) => set({ currentUserId: id }),
}));
