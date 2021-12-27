import styled from "styled-components";

export const H5 = styled.h5<any>({}, (props) => {
  return {
    color: props.theme.color,
    marginTop: "0.3rem",
    fontWeight: 600,
  };
});
