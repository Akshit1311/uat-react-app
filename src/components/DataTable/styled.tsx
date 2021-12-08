import React from "react"
import styled from "styled-components"

export const TR = styled.tr`
  background: ${(props) => props.theme.bgCards};
  color: ${(props) => props.theme.colorCards};
  overflow: hidden;
  background: black !important;
`;

export const TH = styled.th`
  background: ${(props) => props.theme.bgCards};
  color: ${(props) => props.theme.colorCards};
`;

export const IconSpan = styled.span`
background: ${(props) => props.theme.searchBg};
border-radius: 4px;
padding-left: 1.3rem !important;
color: ${(props) => props.theme.color};
`;

export const Input = styled.input`
background: ${(props) => props.theme.searchBg};
border-radius: 4px;
border: 0px;
color: ${(props) => props.theme.color} !important;
font-family: 'Poppins' !important;
`;