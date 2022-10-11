import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
`;

const InputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: var(--fz-lg);
`;

const StyledLabel = styled.label`
  margin-right: var(--spacing-xxl);
`;

const TitleInput = styled.input`
  font-size: var(--fz-lg);
  width: 250px;
`;

const DescField = styled.textarea`
  font-size: var(--fz-md);
  width: 250px;
  height: 60px;
  resize: none;
`;

const CheckboxInput = styled.input`
  width: 20px;
  height: 20px;
`;

const CreatePlaylistContent = ({
  title,
  description,
  isPrivate,
  onTitleChanged,
  onDescriptionChanged,
  onIsPrivateClicked,
}) => {
  return (
    <Wrapper>
      <InputWrapper>
        <StyledLabel htmlFor="title">Enter a title:</StyledLabel>
        <TitleInput
          type="text"
          id="title"
          value={title}
          placeholder="Enter a title"
          onChange={onTitleChanged}
        />
      </InputWrapper>
      <InputWrapper>
        <StyledLabel htmlFor="desc">Description:</StyledLabel>
        <DescField
          id="desc"
          value={description}
          placeholder="Enter a description"
          onChange={onDescriptionChanged}
        />
      </InputWrapper>
      <InputWrapper style={{ marginTop: "var(--spacing-sm)" }}>
        <StyledLabel htmlFor="private">Make Playlist Private?</StyledLabel>
        <CheckboxInput
          type="checkbox"
          id="private"
          checked={isPrivate}
          onChange={onIsPrivateClicked}
        />
      </InputWrapper>
    </Wrapper>
  );
};

export default CreatePlaylistContent;
