import styled from "styled-components";
import { ThemeColorIdentifier } from "../helper-function/themeColor";

export const H5 = styled.h5<any>`
  color: ${(props:any)=> props.active ? '#0177FA' : props.theme.color};
  margin-top: 0.3rem;
  font-weight: 600;
  text-decoration: ${props=> props.active ? 'underline' : 'none' };
  text-underline-offset: 2px;
  transition: 0.5s;
  cursor: ${(props:any)=> props.active ? 'pointer' : ''};
  @media (max-width: 768px){
    color: ${ props=>  props.active ? ThemeColorIdentifier(props.colorTheme) :props.theme.headingColor };
  }
`