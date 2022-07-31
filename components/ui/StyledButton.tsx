import styled from "styled-components";

const StandardButton = styled.button`
  border-radius: var(--radius-pill);
  font-size: var(--fz-sm);
  color: white;
  padding: 6px var(--spacing-md);
  cursor: pointer;
`;

const OutlineButton = styled(StandardButton)`
  border: 2px solid white;
  background-color: transparent;
`;

const FilledButton = styled(StandardButton)`
  border: 2px solid var(--color-spotify-outline);
  background-color: var(--color-spotify-green);
`;

const StyledButton = ({ state, onClick, children }) => {
  if (state === "outline") {
    return (
      <OutlineButton type="button" onClick={onClick}>
        {children}
      </OutlineButton>
    );
  }

  if (state === "filled") {
    return (
      <FilledButton type="button" onClick={onClick}>
        {children}
      </FilledButton>
    );
  }

  return (
    <StandardButton type="button" onClick={onClick}>
      {children}
    </StandardButton>
  );
};

export default StyledButton;
