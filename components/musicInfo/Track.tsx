import styled from "styled-components";
import useSWR, { useSWRConfig } from "swr";
import { BsPlusCircle } from "react-icons/bs";
import { StyledImage } from "../ui";
import { durationMSToStandard } from "../../lib/spotify";
import { usePlaylistStateStore } from "../../lib/store";
import { fetcher } from "../../lib/fetcher";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: var(--spacing-sm);
`;

const TextWrapper = styled.div`
  min-width: 0;
  flex: 1;
  padding: 0 var(--spacing-md);
  line-height: normal;
`;

const TrackTitle = styled.h3`
  margin-bottom: 6px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ArtistName = styled.p`
  color: var(--color-text-subdued);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const AddIcon = styled(BsPlusCircle)`
  color: var(--color-spotify-green);
  font-size: 30px;
  cursor: pointer;
`;

const IndexWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 50px;
`;

const Index = styled.p`
  font-size: 24px;
`;

const Duration = styled.p`
  padding: 0 var(--spacing-sm);
`;

const Track = (props) => {
  const {
    index,
    id,
    uri,
    name,
    durationMS,
    artists,
    image,
    showImage = false,
    onClick,
  } = props;
  const { mutate } = useSWRConfig();
  const currentPlaylistId = usePlaylistStateStore(
    (state) => state.currentPlaylistId
  );
  // convert durationMS to to minutes and seconds
  const standardTime = durationMSToStandard(durationMS);

  const spotifyAdd = async (trackUri) => {
    // add the track locally to the current playlist

    // add the track serverside to the playlist
    const bodyData = { trackUri };
    const response = await fetcher(
      `/playlists/${currentPlaylistId}/add`,
      bodyData,
      "POST"
    );

    // tell swr to revalidate to make sure they match up
    mutate(`/playlists/${currentPlaylistId}`);

    // move playlist to the bottom
    // this is probably a bad why to go about this but uncertain of a better way currently
    const playlistBottom = document.querySelector("#playlistBottom");
    playlistBottom.scrollIntoView({
      behavior: "smooth",
    });
  };

  const handleAddClicked = () => {
    if (currentPlaylistId !== "") {
      spotifyAdd(uri);
    }
  };

  return (
    <Wrapper>
      {showImage && (
        <StyledImage
          src={image}
          alt={artists}
          width="50px"
          height="50px"
          handleClick={() => {
            onClick(id);
          }}
          className=""
        />
      )}
      {!showImage && (
        <IndexWrapper>
          <Index>{+index + 1}</Index>
        </IndexWrapper>
      )}
      <TextWrapper>
        <TrackTitle>{name}</TrackTitle>
        <ArtistName>{artists}</ArtistName>
      </TextWrapper>
      <Duration>{standardTime}</Duration>
      <AddIcon onClick={handleAddClicked} />
    </Wrapper>
  );
};

export default Track;
