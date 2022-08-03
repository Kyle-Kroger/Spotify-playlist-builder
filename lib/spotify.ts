export const sliceBaseUrl = (url: string) => {
  const baseUrl = "https://api.spotify.com/v1";
  return url.slice(baseUrl.length);
};

export const combineArtists = (artists: Array<{ name: string }>) => {
  return artists.reduce((prev, curr) => {
    return `${prev}${prev === "" ? "" : ","} ${curr.name}`;
  }, "");
};
