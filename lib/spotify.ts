export const sliceBaseUrl = (url: string) => {
  const baseUrl = "https://api.spotify.com/v1";
  return url.slice(baseUrl.length);
};
