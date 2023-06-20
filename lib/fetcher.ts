export const fetcher = async (
  url: string,
  data = undefined,
  method = "GET"
) => {
  const response = await fetch(`${window.location.origin}/api${url}`, {
    method,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const message = `An error has occured: ${response.status} ${response.statusText}`;
    throw new Error(message);
  }

  const responseData = await response.json();

  return responseData;
};

export const spotifyFetcher = async (
  endpoint: string,
  token: string,
  method = "GET",
  data = undefined
) => {
  const response = await fetch(`https://api.spotify.com/v1${endpoint}`, {
    method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    // Access the response headers
    const { headers } = response;

    // Loop through the headers
    // headers.forEach((value, name) => {
    //   console.log(`${name}: ${value}`);
    // });

    const message = `An error has occured: ${response.status} ${response.statusText}`;
    throw new Error(message);
  }

  // no json returned
  if (response.status === 204) {
    return;
  }

  const spotifyData = await response.json();

  return spotifyData;
};
