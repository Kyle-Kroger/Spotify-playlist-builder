import styled from "styled-components";
import { BsPlus } from "react-icons/bs";

const Wrapper = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: var(--color-spotify-green);
  width: 24px;
  height: 24px;
  /* Having a padding here makes the svg big? */
  padding: 1px;
  border-radius: var(--radius-subtle);
  /* Better way to remove border on a button? */
  border: 0px solid transparent;
  cursor: pointer;
`;

const NewTagButton = ({ onClick }) => {
  return (
    <Wrapper onClick={onClick}>
      <BsPlus size="20px" color="white" />
    </Wrapper>
  );
};

export default NewTagButton;
