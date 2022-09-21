import styled from "styled-components";

interface ButtonProps {
  isDisabled?: boolean;
}

const StandardButton = styled.a<ButtonProps>`
  border-radius: var(--radius-pill);
  font-size: var(--fz-sm);
  color: ${(p) => (p.isDisabled ? "var(--color-grey-300)" : "white")};
  padding: 6px var(--spacing-md);
  cursor: ${(p) => (p.isDisabled ? "auto" : "pointer")};
  pointer-events: ${(p) => (p.isDisabled ? "none" : "auto")};
`;

const OutlineButton = styled(StandardButton)`
  border: 2px solid ${(p) => (p.isDisabled ? "var(--color-grey-300)" : "white")};
  background-color: transparent;
`;

const FilledButton = styled(StandardButton)`
  font-weight: 600;
  border: 2px solid
    ${(p) =>
      p.isDisabled ? "var(--color-grey-300)" : "var(--color-spotify-outline)"};
  background-color: ${(p) =>
    p.isDisabled ? "transparent" : "var(--color-spotify-green)"};
`;

interface Props {
  state: string;
  onClick: any;
  isDisabled?: boolean;
  className?: any;
  children: any;
}

const StyledButton = ({
  state,
  onClick,
  isDisabled = false,
  className = "",
  children,
}: Props) => {
  if (state === "outline") {
    return (
      <OutlineButton
        type="button"
        onClick={onClick}
        isDisabled={isDisabled}
        className={className}
      >
        {children}
      </OutlineButton>
    );
  }

  if (state === "filled") {
    return (
      <FilledButton
        type="button"
        onClick={onClick}
        isDisabled={isDisabled}
        className={className}
      >
        {children}
      </FilledButton>
    );
  }

  return (
    <StandardButton
      type="button"
      onClick={onClick}
      isDisabled={isDisabled}
      className={className}
    >
      {children}
    </StandardButton>
  );
};

export default StyledButton;
