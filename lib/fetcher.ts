export const fetcher = (url: string, method = "GET", data = undefined) => {
  return fetch(`${window.location.origin}/api${url}`, {
    // method = method in the parameters if one is not passed in the its a get request
    method,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => {
    if (res.status > 399 && res.status < 200) {
      throw new Error();
    }
    return res.json();
  });
};

export const spotifyFetcher = async (
  endpoint: string,
  token: string,
  method: string = "GET",
  data = undefined
) => {
  const response = await fetch(`https://api.spotify.com/v1${endpoint}`, {
    // method = method in the parameters if one is not passed in the its a get request
    method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const message = `An error has occured: ${response.status} ${response.statusText}`;
    throw new Error(message);
  }

  const spotifyData = await response.json();

  return spotifyData;
};
