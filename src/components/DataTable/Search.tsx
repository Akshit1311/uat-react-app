import { GoSearch } from "react-icons/go";
import styled from "styled-components";
import { useContext } from "react";
import { ThemeContext } from "../../config/context";
import { IconSpan, Input } from "./styled";
import { SearchTypes } from "./types";
import "../../scss/searchBarComponent.scss";
import React, { useState } from "react";

export default function Search({
  background,
  borderRadius,
  placeholderClass,
  inputClass,
  onChange,
  value,
  placeholder,
}: SearchTypes) {
  const theme = useContext(ThemeContext);
  const [searchQuery, setSearchQuery] = useState<string>();
  const borderRadiusAll = borderRadius ? borderRadius : "0px";
  const backgroundAll = background ? background : "#f8f8f8";
  return (
    <div className="mt-3 mb-2" style={{ maxWidth: "22rem" }}>
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
              placeholder={placeholder ? placeholder : "Search"}
              style={{
                background: backgroundAll,
                color: "black",
                borderTopRightRadius: borderRadiusAll,
                borderBottomRightRadius: borderRadiusAll,
              }}
              onChange={(e: any) => setSearchQuery(e.target.value)}
              value={searchQuery}
            />
          </div>
          <button
            onClick={() => onChange(searchQuery)}
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
    </div>
  );
}
