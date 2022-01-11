import styled from "styled-components";

// export const H5 = styled.h5<any>({}, (props) => {
//   return {
//     color: props.theme.color,
//     marginTop: "0.3rem",
//     fontWeight: 600,
//   };
// });

export const H5 = styled.h5<any>`
  color: ${(props:any)=> props.theme.color};
  margin-top: 0.3rem;
  font-weight: 600;

  @media (max-width: 768px){
    color: rgba(0,0,0, 0.7);
  }
`