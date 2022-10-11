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
    padding-top: var(--spacing-xs);
  }
`;

const ItemHeading = styled.div`
  padding-bottom: var(--spacing-md);
  text-align: center;
  cursor: pointer;

  h4 {
    padding-top: var(--spacing-sm);
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
    isHeading,
    onClick,
  } = props;
  const handleClick = () => {
    onClick(id);
  };
  if (isHeading) {
    return (
      <Wrapper width={width}>
        <ItemHeading>
          <h2>{title}</h2>
          {subtitle !== "" && <h4>{subtitle}</h4>}
        </ItemHeading>
        <StyledImage
          src={imageSrc}
          alt={title}
          isRound={isRound}
          width={width}
          handleClick={handleClick}
          className=""
        />
      </Wrapper>
    );
  }
  return (
    <Wrapper width={width}>
      <StyledImage
        src={imageSrc}
        alt={title}
        isRound={isRound}
        width="95%"
        handleClick={handleClick}
        className=""
      />
      <Text>
        <h4>{title}</h4>
        {subtitle !== "" && <p>{subtitle}</p>}
      </Text>
    </Wrapper>
  );
};

export default MusicItem;
