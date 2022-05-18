import * as React from "react";
import {
  SearchBarWrapper,
  SpanIcon,
  SearchBarInput,
} from "../../styles-components/SearchBar";
import { BiSearchAlt2 } from "react-icons/bi";
import styled from "styled-components";
import { ThemeColorIdentifier } from "../../helper-function/themeColor";

export interface SearchBarTypes {
  filterState: any;
  setSearchBarExpanded: any;
  colorTheme: string;
  searchBarExpanded: boolean;
}

const Badges = styled.div<any>(
  {
    borderRadius: "20px",
    padding: "0.5rem 1rem 0.5rem 1rem",
    width: "fit-content",
    fontFamily: "Poppins",
    fontWeight: "600",
    transition: "All 0.3s",
  },
  (props) => {
    return {
      transition: "All 0.3s",
      color: props.active ? "white" : "balck",
      background: props.active
        ? ThemeColorIdentifier(props.colorTheme)
        : "white",
    };
  }
);

const ScrollableDiv = styled.div({
  width: "100%",
  overflowX: "scroll",
  overflowY: "hidden",
  cursor: "pointer",
  "&::-webkit-scrollbar": {
    height: '5px',
    display: 'none'
  },
  "&::-webkit-scrollbar-track": {
  boxShadow: "inset 0 0 0px grey",
    borderRadius: '10px',
    height: '45px',
  },
  "&::-webkit-scrollbar-thumb": {
    background: '#c4c4c4',
    borderRadius: '7px'
  }
});

const Hr = styled.div({
  width: "100%",
  height: "1px",
  background: "#DDDDDD",
});

const TYPES = ["All", "Sectors", "States", "Industries", "Stages"];

interface SelectorType {
  label: string;
  type: string;
}

function Selector({ label, type }: SelectorType) {
  return (
    <div className="d-flex justify-content-between">
      <p className="font-500">{label}</p>
      <p className="opacity-5">{type.toUpperCase()}</p>
    </div>
  );
}

interface KeyValuePair {
  id: string;
  value: string;
}

const VeriticallyScrollableDiv = styled.div({
  height: "400px",
  overflowY: "scroll",
  overflowX: "hidden",
  "&::-webkit-scrollbar": {
    width: '5px',
    display: 'none'
  },
  "&::-webkit-scrollbar-track": {
  boxShadow: "inset 0 0 0px grey",
    borderRadius: '10px',
    height: '45px',
  },
  "&::-webkit-scrollbar-thumb": {
    background: '#c4c4c4',
    borderRadius: '7px'
  }
})

export default function SearchBar({
  searchBarExpanded,
  filterState,
  colorTheme,setSearchBarExpanded
}: SearchBarTypes) {
  const [searchText, setSearchText] = React.useState<string>("");
  const [activeFilterType, setActiveFilterType] = React.useState<string>(
    TYPES[0]
  );
  const [allTypeDisplayLimit, setAllTypeDisplayLimit] = React.useState(3);

  const handleSearchTextChange = (changeEvent:any) =>{
    const value = changeEvent.target.value
    setSearchBarExpanded(value.length > 0);
    setSearchText(value)
  }

  const states = filterState.states
    .filter(
      (i: KeyValuePair) =>
        i.value.toLowerCase().includes(searchText.toLowerCase()) ||
        i.id == searchText
    )
    .slice(0, allTypeDisplayLimit)
    .sort((a: KeyValuePair, b: KeyValuePair) => a.value.localeCompare(b.value));

  const sectors = filterState.sectors
    .filter(
      (i: KeyValuePair) =>
        i.value.toLowerCase().includes(searchText.toLowerCase()) ||
        i.id == searchText
    )
    .slice(0, allTypeDisplayLimit)
    .sort((a: KeyValuePair, b: KeyValuePair) => a.value.localeCompare(b.value));

  const industries = filterState.industries
    .filter(
      (i: KeyValuePair) =>
        i.value.toLowerCase().includes(searchText.toLowerCase()) ||
        i.id == searchText
    )
    .slice(0, allTypeDisplayLimit)
    .sort((a: KeyValuePair, b: KeyValuePair) => a.value.localeCompare(b.value));
  const stages = filterState.stages
    .filter(
      (i: KeyValuePair) =>
        i.value.toLowerCase().includes(searchText.toLowerCase()) ||
        i.id == searchText
    )
    .slice(0, allTypeDisplayLimit)
    .sort((a: KeyValuePair, b: KeyValuePair) => a.value.localeCompare(b.value));

  const handleTabClick = (name: string) => {
    if (name === "All") setAllTypeDisplayLimit(3);
    else setAllTypeDisplayLimit(filterState[name.toLowerCase()].length);
    setActiveFilterType(name);
  };

  return (
    <div
      className="row search-bar-row bg-white"
      style={{ boxShadow: "0px 0px 10px rgb(193 193 193 / 25%)" }}
    >
      <SearchBarWrapper className="rounded h-100 d-flex mx-0 px-0 search-bar">
        <SpanIcon
          className="btn shadow-none border-0 m-0 pe-1 ps-4 "
          id="search-addon"
        >
          <BiSearchAlt2 size={17.06} style={{ marginBottom: "3px" }} />
        </SpanIcon>
        <SearchBarInput
          type="search"
          value={searchText}
          className="form-control ps-2 search-bar-left"
          placeholder="Search"
          aria-label="Search"
          aria-describedby="search-addon"
          onChange={handleSearchTextChange}
        />
      </SearchBarWrapper>
      {searchBarExpanded ? (
        <ScrollableDiv className="bg-white d-inline-flex p-3">
          {TYPES.map((name) => (
            <Badges
              colorTheme={colorTheme}
              onClick={() => handleTabClick(name)}
              active={activeFilterType === name}
            >
              {name}
            </Badges>
          ))}
        </ScrollableDiv>
      ) : (
        <></>
      )}
          <Hr />
      {searchBarExpanded && activeFilterType === TYPES[0] ? (
        <div className="px-3">
      

          <div className="pt-3 bg-white">
            {states.map((i: any) => (
              <Selector label={i.value} type="State" key={i.id} />
            ))}
          </div>

          <Hr />
          <div className="pt-3 bg-white">
            {sectors.map((i: any) => (
              <Selector label={i.value} type="Sectors" key={i.id} />
            ))}
          </div>
          <Hr />
          <div className="pt-3 bg-white">
            {industries.map((i: any) => (
              <Selector label={i.value} type="Industries" key={i.id} />
            ))}
          </div>
        </div>
      ) : (
        <></>
      )}

      {searchBarExpanded && activeFilterType === "Sectors" ? (
        <VeriticallyScrollableDiv className="pt-3 bg-white">
          {sectors.map((i: any) => (
            <Selector label={i.value} type="Sector" key={i.id} />
          ))}
        </VeriticallyScrollableDiv>
      ) : (
        <></>
      )}

      {searchBarExpanded && activeFilterType === "States" ? (
        <VeriticallyScrollableDiv className="pt-3 bg-white">
          {states.map((i: any) => (
            <Selector label={i.value} type="State" key={i.id} />
          ))}
        </VeriticallyScrollableDiv>
      ) : (
        <></>
      )}

      {searchBarExpanded && activeFilterType === "Industries" ? (
        <VeriticallyScrollableDiv className="pt-3 bg-white">
          {industries.map((i: any) => (
            <Selector label={i.value} type="Industry" key={i.id} />
          ))}
        </VeriticallyScrollableDiv>
      ) : (
        <></>
      )}
      {searchBarExpanded && activeFilterType === "Stages" ? (
        <VeriticallyScrollableDiv className="pt-3 bg-white">
          {stages.map((i: any) => (
            <Selector label={i.value} type="Stage" key={i.id} />
          ))}
        </VeriticallyScrollableDiv>
      ) : (
        <></>
      )}
    </div>
  );
}
