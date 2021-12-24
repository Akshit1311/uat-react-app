import styled from "styled-components";
import {
  ThemeColorIdentifier,
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
  border: 2px solid ${(props) => ThemeColorIdentifier(props.colorTheme)};
  box-shadow: ${(props) => ThemeShadowIdentifier(props.colorTheme)} !important;
  &:hover {
    color: ${(props) => (props.active ? "white" : props.theme.color2)};
  }
`;
