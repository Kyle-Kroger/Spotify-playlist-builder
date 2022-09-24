import styled from "styled-components";
import { StyledButton } from "../ui";
import ClientOnlyPortal from "./ClientOnlyPortal";

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-800);
  border-radius: var(--radius-small);
  min-width: 400px;
  z-index: 1000;
  // needed for the top borders to have radius
  overflow: hidden;
`;

const Heading = styled.div`
  width: 100%;
  background-color: var(--color-grey-900);
  padding: var(--spacing-lg) var(--spacing-xl);
`;

const Content = styled.section`
  width: 100%;
  padding: var(--spacing-lg) var(--spacing-xl);
  flex: 1;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 24px;
  padding: var(--spacing-lg) var(--spacing-xl);
  padding-top: 0;
  justify-content: flex-end;
`;

const Modal = ({ children, onClose, title, onConfirm, buttonText }) => {
  return (
    <ClientOnlyPortal selector="#portal">
      <Backdrop onClick={onClose} />
      <Wrapper>
        <Heading>
          <h2>{title}</h2>
        </Heading>
        <Content>{children}</Content>
        <ButtonWrapper>
          <StyledButton state="outline" onClick={onClose}>
            Cancel
          </StyledButton>
          <StyledButton state="filled" onClick={onConfirm}>
            {buttonText}
          </StyledButton>
        </ButtonWrapper>
      </Wrapper>
    </ClientOnlyPortal>
  );
};

export default Modal;
