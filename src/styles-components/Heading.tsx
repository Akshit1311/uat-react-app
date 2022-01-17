import styled from "styled-components";

export const H5 = styled.h5<any>`
  color: ${(props:any)=> props.active ? '#0177FA' : props.theme.color};
  margin-top: 0.3rem;
  font-weight: 600;
  text-decoration: ${props=> props.active ? 'underline' : 'none' };
  text-underline-offset: 2px;
  transition: 0.5s;
  @media (max-width: 768px){
    color: rgba(0,0,0, 0.7);
  }
`