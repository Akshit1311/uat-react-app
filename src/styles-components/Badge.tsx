import styled from "styled-components";

export const Badge = styled.div`
    border-radius: 12px;
    color: black;
    padding: 3px 6px;
    font-size: smaller;
    font-weight: 500;
    font-size: 12px;
    line-height: 150%;
    background-color: ${props=> props.theme.bgBadge} ;
    width: fit-content;
    color: ${props=> props.theme.color};
  `;

export const RoundedBadge = styled.div`
   width: 23px;
   height: 23px;
   font-size: 13px;
   display: flex;
   justify-content: center;
   align-items: center;
   color: #feffff;
  background-color: #0177fa;
   border-radius: 50%;
   position: absolute;
   right: 1rem;
   visibility: ${props=> props.hidden ? "hidden": 'visible'};
  `
// export const RoundedBadge = styled.span`
//     padding-top: 3px;
//     padding-bottom: 3px;
//     width:13.5%;
//     color: #feffff;
//     background-color: #0177fa;
//     border-radius: 50%;
//   `
