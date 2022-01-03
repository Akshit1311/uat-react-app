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
export const PageWrapper = styled.div`
  max-width: 1366px;
  min-width: 1080px;
  width: 100%;
  @media (max-width: 768px) {
    max-width: 768px;
    min-width: 300px;
    width: 100%;
  }
`
