import styled from "styled-components";
import { ThemeColorIdentifier, ThemeShadowColorIdentifier } from "../helper-function/themeColor";

export const SelectBox = styled.select<any>`
border: 2px solid ${(props:any)=> ThemeColorIdentifier(props.colorTheme)} !important;
box-sizing: border-box;
border-radius: 4px;
font-style: normal;
font-weight: 500;
font-size: 14px;
margin-bottom: ${props=> props.marginBottom};
width:100%;
color: ${props=> props.theme.colorSelect};
background-color: ${props=> props.theme.bgCards};
padding: 0.35rem 0.55rem;
background-position: right 0.75rem center;
background-size: 16px 12px;
background-repeat: no-repeat;
appearance: none;
&:focus{
    border: 2px solid ${(props:any)=> ThemeColorIdentifier(props.colorTheme)} !important;
}
&:active{
    border: 2px solid ${(props:any)=> ThemeColorIdentifier(props.colorTheme)} !important;
}
`
// box-shadow: ${props=> props.theme.shadowSelect + ThemeShadowColorIdentifier(props.colorTheme)};

export const SelectBoxLabel = styled.label<any>`
font-style: normal;
font-weight: 600;
font-size: 14px;
line-height: 150%;
color: ${props=> props.theme.color};
margin-bottom: ${props=> props.marginBottom || '12px'};
white-space: nowrap;
`
// background-image: url() !important;