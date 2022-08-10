import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
`;

const PlaylistSubPage = ({ id }) => {
  return <Wrapper>Playlist Subpage {id}</Wrapper>;
};

export default PlaylistSubPage;
