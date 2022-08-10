export const sliceBaseUrl = (url: string) => {
  const baseUrl = "https://api.spotify.com/v1";
  return url.slice(baseUrl.length);
};

export const combineArtists = (artists: Array<{ name: string }>) => {
  return artists.reduce((prev, curr) => {
    return `${prev}${prev === "" ? "" : ","} ${curr.name}`;
  }, "");
};

export enum SORT_ORDER {
  ALPHA = "name",
  CREATOR = "creator",
  DEFAULT = "default",
  ARTIST = "firstArtist",
  ALBUM = "albumName",
  TRACK_TIME = "duration",
}

export const sortPlaylist = (sortBy, sortOrderASC, list) => {
  const key = sortBy;
  list.sort((a, b) =>
    sortOrderASC
      ? a[key].localeCompare(b[key])
      : -1 * a[key].localeCompare(b[key])
  );
};
