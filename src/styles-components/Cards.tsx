import React from "react"
import styled from "styled-components"

export const Card = styled.div<any>`
padding: 20px 16px 20px 16px;
background: ${props=> props.theme.bgCards} !important;
box-shadow: ${props=> props.theme.shadowCards} !important;
border-radius: 4px;
color: ${props=> props.theme.colorCards} !important;
border: ${ props=> props.border && props.theme.showCaseStartUpBorder}
`
// width: 102%;

export const CountCard = styled.div<any>`
    background: ${props=> props.active ? "#0177FA" : props.theme.bgCards};
    color: ${props=> props.active ? 'white' : props.theme.bgCards}
`