import { GoSearch } from "react-icons/go";
import "../scss/searchBarComponent.scss";
import styled from "styled-components";
import { useContext } from "react";
import { ThemeContext } from "../config/context";

interface SearchTypes {
  background?: string;
  borderRadius?: string;
  placeholderClass?: string;
  inputClass?: string;
}

const IconSpan = styled.span`
  background: ${(props) => props.theme.searchBg};
  border-radius: 4px;
  padding-left: 1.3rem !important;
  color: ${(props) => props.theme.color};
`;

const Input = styled.input`
  background: ${(props) => props.theme.searchBg};
  border-radius: 4px;
  border: 0px;
  color: ${(props) => props.theme.color} !important;
  font-family: 'Poppins' !important;
`;

const SearchBarComponent = ({
  background,
  borderRadius,
  placeholderClass,
  inputClass,
}: SearchTypes) => {
  const theme = useContext(ThemeContext);
  const borderRadiusAll = borderRadius ? borderRadius : "0px";
  const backgroundAll = background ? background : "#f8f8f8";
  return (
    <div className="row d-flex flex-row justify-content-center align-items-center search-bar-comman-component m-0">
      <div
        className="search input-group px-0 d-flex flex-nowrap"
        style={{
          borderTopLeftRadius: borderRadiusAll,
          borderBottomLeftRadius: borderRadiusAll,
        }}
      >
        <div className={`d-flex w-60 ${inputClass}`}>
          <IconSpan
            className="btn search-icon"
            style={{ background: backgroundAll }}
          >
            <GoSearch style={{ marginTop: "-2px" }} />
          </IconSpan>
          <Input
            type="text"
            className={`form-control me-3 px-0 search-input shadow-none search-bar-placeholder ${placeholderClass}`}
            placeholder="Search"
            style={{
              background: backgroundAll,
              color: "black",
              borderTopRightRadius: borderRadiusAll,
              borderBottomRightRadius: borderRadiusAll,
            }}
          />
        </div>
        <button
          className="btn btn-primary btn-radius search-btn"
          style={{
            fontFamily: "Montserrat",
            paddingTop: "7px",
            fontWeight: 600,
          }}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBarComponent;
