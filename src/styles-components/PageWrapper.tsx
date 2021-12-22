import styled from "styled-components";

export const PageWrapperContainer = styled.div`
  display: flex;
  justify-content: center;
  background-color: none !important;
  background: linear-gradient(
    180deg,
    ${(props) => props.theme.bgColorStart} 0%,
    ${(props) => props.theme.bgColorEnd} 100%
  ) !important;
  background-size: cover;
  background-repeat: no-repeat !important;
`;
export const PageWrapper = styled.div({
  maxWidth: "1366px",
  minWidth: "1080px",
});
