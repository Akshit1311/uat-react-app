import { GoSearch } from "react-icons/go";
import "../scss/searchBarComponent.scss";
import styled from "styled-components";
import { useContext } from "react";
import { ThemeContext } from "../config/context";



const SearchBarComponent = ({
  background,
  borderRadius,
  placeholderClass,
  inputClass,
}: any) => {
  const theme = useContext(ThemeContext);
  const borderRadiusAll = borderRadius ? borderRadius : "0px";
  const backgroundAll = background ? background : "#f8f8f8";
  return (
    <div />
  );
};

export default SearchBarComponent;
