import { useState } from "react";
import styled from "styled-components";
import { Tag } from "../tagging";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
`;

const InputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledLabel = styled.label`
  margin-right: var(--spacing-xxl);
  font-size: var(--fz-lg);
`;

const StyledInput = styled.input`
  font-size: var(--fz-lg);
  width: 250px;
`;

const ColorInput = styled.input`
  width: 250px;
  border: 1px solid black;
  border-radius: var(--radius-subtle);

  ::-webkit-color-swatch-wrapper {
    padding: 2px;
  }
`;

const TagPreview = styled.div`
  width: 150px;
  height: 36px;
  border-radius: var(--radius-subtle);
  background-color: "red";
`;

const TagPreviewText = styled.p``;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  width: 100%;
  padding: var(--spacing-sm);
  margin: var(--spacing-sm) 0;
  border: 1px solid var(--color-grey-600);
  border-radius: var(--radius-subtle);
`;

const CreateTagContent = ({
  tagText,
  tagBgColor,
  tagTextColor,
  onTextChanged,
  onBgColorChanged,
  onTextColorChanged,
}) => {
  return (
    <StyledForm>
      <InputWrapper>
        <StyledLabel>Tag Name:</StyledLabel>
        <StyledInput type="text" value={tagText} onChange={onTextChanged} />
      </InputWrapper>
      <InputWrapper>
        <StyledLabel>Text Color:</StyledLabel>
        <ColorInput
          type="color"
          value={tagTextColor}
          onChange={onTextColorChanged}
        />
      </InputWrapper>
      <InputWrapper>
        <StyledLabel>Tag Color:</StyledLabel>
        <ColorInput
          type="color"
          value={tagBgColor}
          onChange={onBgColorChanged}
        />
      </InputWrapper>
      <InputWrapper>
        <StyledLabel>Tag Preview:</StyledLabel>
        <Tag
          id={0}
          name={tagText}
          bgColor={tagBgColor}
          textColor={tagTextColor}
        />
      </InputWrapper>
    </StyledForm>
  );
};

export default CreateTagContent;
