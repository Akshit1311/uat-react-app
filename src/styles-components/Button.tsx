import styled from "styled-components";
import {
  ThemeColorIdentifier,
  ThemeShadowColorIdentifier,
  ThemeShadowIdentifier,
} from "../helper-function/themeColor";

interface ButtonTypes {
  width?: any;
  border?: string;
  backgroundColor?: string;
  color?: string;
  marginRight?: string;
  marginLeft?: string;
  flex?: string;
  boxShadow?: string;
  opacity?: string;
  theme: any;
  noBorder?: boolean;
  colorTheme: string;
}

export const Button = styled.button<ButtonTypes>(
  {
    padding: "0.375rem 0.75rem",
    display: "inline-block",
    color: "white",
    textAlign: "center",
    textDecoration: "none",
    cursor: "pointer",
    borderRadius: "4px",
    width: "100%",
    boxSizing: "border-box",
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: 600,
    lineHeight: "150% !important",
  },
  (props: ButtonTypes) => {
    return {
      border: `2px solid ${ThemeColorIdentifier(props.colorTheme)}`,
      width: `${props.width} !important`,
      backgroundColor: `${
        props.backgroundColor
          ? props.backgroundColor
          : ThemeColorIdentifier(props.colorTheme)
      }`,
      color: `${props.color}`,
      flex: `${props.flex}`,
      marginRight: `${props.marginRight}`,
      marginLeft: `${props.marginLeft}`,
      boxShadow: `${
        props.noBorder ? "" : ThemeShadowIdentifier(props.colorTheme)
      }`,
      opacity: `${props.opacity}`,
    };
  }
);

export const IconButton = styled.button<any>`
  color: ${(props) => (props.active ? "white" : props.theme.color2)};
  background: ${(props) =>
    props.active
      ? ThemeColorIdentifier(props.colorTheme)
      : props.theme.iconButtonBackground};
  box-shadow: 0px 0px 20px ${(props) => ThemeShadowColorIdentifier(props.colorTheme)} !important;
  border: 2px solid ${(props) => ThemeColorIdentifier(props.colorTheme)};
  &:hover {
    color: ${(props) => (props.active ? "white" : props.theme.color2)};
  }
  @media (max-width: 768px){
    box-shadow: 0px 0px 16px ${(props) => ThemeShadowColorIdentifier(props.colorTheme)} !important;
  }
  `;


export const ThemeButton = styled.button<any>`
  width: 50px;
  height: 50px;
  border-radius: 100px;
  font-size: ${(props:any)=> props.fontSize || '15px' };
  position: fixed;
  bottom: ${(props:any)=> props.bottom};
  right: 30px;
  background: ${(props) => props.theme.bgCards};
  color: ${(props) => props.theme.color};
  border: 2px solid ${(props:any)=> ThemeColorIdentifier(props.colorTheme|| '')};
  z-index: 100;
`;