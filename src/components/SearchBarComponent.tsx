import { GoSearch } from "react-icons/go";
import "../scss/searchBarComponent.scss";
import { Button } from "../styles-components/Button";
import styled from "styled-components";
import React from "react"

interface SearchTypes {
  background?: string;
  borderRadius?: string;
  placeholderClass?: string;
  onChange?:any;
  value?:string;
  handleApply:any
}

const IconSpan = styled.span`
  background: ${(props) => props.theme.searchBg};
  border-radius: 4px;
  padding-left: 1.3rem !important;
  color: ${(props) => props.theme.color};
`;

const Input = styled.input`
  background: ${(props) => props.theme.searchBg} !important;
  border-radius: 4px;
  border: 0px;
  color: ${(props) => props.theme.color} !important;
  font-family: 'Poppins';
`;

const SearchBarComponent = ({
  background,
  borderRadius,
  placeholderClass,
  onChange,
  value,
  handleApply
}: SearchTypes) => {

  console.log('background', background)
  const borderRadiusAll = borderRadius ? borderRadius : "0px";
  const backgroundAll = background ? background : "#f8f8f8";
  return (
    <div className="row d-flex flex-row justify-content-center align-items-center search-bar-comman-component m-0">
      <div
        className="search input-group px-0 d-flex flex-nowrap"
        style={{
          borderTopLeftRadius: borderRadiusAll,
          borderBottomLeftRadius: borderRadiusAll,
          overflow: "hidden",
        }}
      >
        <div className="d-flex w-100">
          <IconSpan
            className="btn search-icon"
            style={{ background: backgroundAll }}
          >
            <GoSearch style={{ marginTop: "-2px" }} />
          </IconSpan>
          <Input
            type="text" value={value}
            className={`form-control me-3 px-0 search-input shadow-none search-bar-placeholder ${placeholderClass}`}
            placeholder="Search"
            onChange={(e)=> onChange(e)}
            style={{
              background: backgroundAll,
              color: "black",
              borderTopRightRadius: borderRadiusAll,
              borderBottomRightRadius: borderRadiusAll,
            }}
          />
        </div>
        <button 
          onClick={handleApply}
          className="btn btn-primary btn-radius search-btn background-color-theme"
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

export default React.memo(SearchBarComponent);
