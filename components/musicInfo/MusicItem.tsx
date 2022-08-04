import styled from "styled-components";
import { StyledImage } from "../ui";

const Wrapper = styled.div<{ width: string }>`
  display: flex;
  flex-direction: column;
  width: ${(p) => p.width};
  padding: var(--spacing-md);
  align-items: center;
`;

const Text = styled.div`
  padding-top: var(--spacing-sm);
  // margin auto centers the text in the remaining space
  margin-top: auto;
  margin-bottom: auto;
  text-align: center;
  cursor: pointer;

  p {
    margin-top: var(--spacing-xs);
  }
`;

const MusicItem = (props) => {
  const {
    title,
    subtitle = "",
    isRound,
    imageSrc,
    id,
    width = "50%",
    onClick,
  } = props;
  const handleClick = () => {
    onClick(id);
  };
  return (
    <Wrapper width={width}>
      <StyledImage
        src={imageSrc}
        alt={title}
        isRound={isRound}
        width="90%"
        handleClick={handleClick}
      />
      <Text>
        <h3>{title}</h3>
        {subtitle !== "" && <p>{subtitle}</p>}
      </Text>
    </Wrapper>
  );
};

export default MusicItem;
