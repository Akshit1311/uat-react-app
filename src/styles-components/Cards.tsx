import React from "react"
import styled from "styled-components"

export const Card = styled.div`
padding: 20px 16px 20px 16px;
background: ${props=> props.theme.bgCards} !important;
box-shadow: 0px 0px 6px rgba(193, 193, 193, 0.25);
border-radius: 4px;
color: ${props=> props.theme.colorCards} !important;
`
// width: 102%;

export const CountCard = styled.div<any>`
    background: ${props=> props.active ? "#0177FA" : props.theme.bgCards};
    color: ${props=> props.active ? 'white' : props.theme.bgCards}
`