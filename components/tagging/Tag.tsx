import styled from "styled-components";

const Wrapper = styled.div<{ bgColor: string; textColor: string }>`
  padding: 4px var(--spacing-sm);
  background-color: ${(p) => p.bgColor};
  color: ${(p) => p.textColor};
  font-weight: bold;
  border-radius: var(--radius-subtle);
  margin-bottom: 8px;
`;

const Tag = ({ id, name, bgColor, textColor }) => {
  return (
    <Wrapper bgColor={bgColor} textColor={textColor}>
      <p>{name}</p>
    </Wrapper>
  );
};

export default Tag;
