import styled from "styled-components";
import { StyledButton } from "../ui";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--spacing-md);
`;

const StyledInput = styled.input`
  font-size: var(--fz-lg);
  text-align: center;
  width: 100px;

  ::-webkit-inner-spin-button,
  ::-webkit-outer-spin-button {
    opacity: 1;
  }
`;

const SquareButton = styled(StyledButton)`
  border-radius: 4px;
  background-color: var(--color-primary-900);
  border: 2px solid var(--color-primary-500);
`;

const ReorderPlaylistTrack = ({
  index,
  newIndex,
  max,
  setNewIndex,
  onIndexChanged,
}) => {
  return (
    <Wrapper>
      <SquareButton
        state="filled"
        onClick={() => {
          setNewIndex(1);
        }}
      >
        Min
      </SquareButton>
      <StyledInput
        type="number"
        max={max}
        min="1"
        onChange={onIndexChanged}
        value={newIndex}
      />
      <SquareButton
        state="filled"
        onClick={() => {
          setNewIndex(max);
        }}
      >
        Max
      </SquareButton>
    </Wrapper>
  );
};

export default ReorderPlaylistTrack;
