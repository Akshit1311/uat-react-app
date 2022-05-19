import styled from "styled-components"

export const SearchBarWrapper = styled.div`
  color: ${(props) => props.theme.colorCards} !important;
  background: ${(props) => props.theme.bgCards} !important;
  box-shadow: ${(props) => props.theme.shadowCards} !important;
`;

export const SearchBarInput = styled.input`
  color: ${(props) => props.theme.sideSearch.color} !important;
  background: ${(props) => props.theme.bgCards} !important;
`;

export const SpanIcon = styled.span`
  color: ${(props) => props.theme.color};
  margin-top: 1.4px !important;
`;
