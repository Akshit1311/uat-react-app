import React from "react"
import styled from "styled-components"

export const Card = styled.div<any>`
padding: 20px 16px 20px 16px;
background: ${props=> props.background ? props.background : props.theme.bgCards} !important;
box-shadow: ${props=> props.theme.shadowCards} !important;
border-radius: 4px;
color: ${props=> props.theme.colorCards} !important;
border: ${ props=> props.border && props.theme.showCaseStartUpBorder};
@media (max-width:768px){
    box-shadow: ${(props:any)=> props.noShadow ? '0px 0px black' : props.theme.shadowCards } !important;
}
`

export const CountCard = styled.div<any>`
    background: ${props=> props.active ? "#0177FA" : props.theme.bgCards};
    color: ${props=> props.active ? 'white' : props.theme.bgCards}
`