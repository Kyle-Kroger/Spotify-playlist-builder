import styled from "styled-components";
import { ITrackTag } from "../../lib/types";

const Wrapper = styled.div<{
  bgColor: string;
  textColor: string;
  selected: boolean;
}>`
  padding: 4px var(--spacing-sm);
  background-color: ${(p) => p.bgColor};
  color: ${(p) => p.textColor};
  font-weight: bold;
  border-radius: var(--radius-subtle);
  margin-bottom: 8px;
  cursor: pointer;

  ${(p) => (p.selected ? "outline: 2px solid white" : "")}
`;

const Tag = ({ id, name, bgColor, textColor, onClick, selected = false }) => {
  const handleClick = () => {
    const tag: ITrackTag = {
      id,
      name,
      bgColor,
      textColor,
    };
    onClick(tag);
  };
  return (
    <Wrapper
      bgColor={bgColor}
      textColor={textColor}
      selected={selected}
      onClick={handleClick}
    >
      <p>{name}</p>
    </Wrapper>
  );
};

export default Tag;
