import * as React from "react";
import { SearchBarWrapper,SpanIcon,SearchBarInput  } from "../../styles-components/SearchBar"
import { BiSearchAlt2 } from "react-icons/bi"

export interface SearchBarTypes {
    filterState: any[];
    // setSearchBarExpanded: React.Dispatch<boolean>;
    searchBarExpanded: boolean;
  }
  
export default function SearchBar({
    searchBarExpanded,
    filterState,
  }: SearchBarTypes) {
    return (
      <div className="row search-bar-row">
        <SearchBarWrapper className="rounded h-100 d-flex mx-0 px-0 search-bar">
          <SpanIcon
            className="btn shadow-none border-0 m-0 pe-1 ps-4 "
            id="search-addon"
          >
            <BiSearchAlt2 size={17.06} style={{ marginBottom: '3px' }} />
          </SpanIcon>
          <SearchBarInput
            type="search"
            className="form-control ps-2 search-bar-left"
            placeholder="Search"
            aria-label="Search"
            aria-describedby="search-addon"
          />
        </SearchBarWrapper>
      </div>
    );
  }
  