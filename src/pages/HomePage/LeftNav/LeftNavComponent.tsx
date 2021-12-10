import { useState, useEffect, useContext } from "react";
import DropDownListComponent from "./DropDownListComponent";
import "../../../scss/HomePageStyles/leftNavComponent.scss";
import { BiSearchAlt2 } from "react-icons/bi";
import { FiChevronDown } from "react-icons/fi";
import { Button } from "../../../styles-components/Button";
import { RoundedBadge } from "../../../styles-components/Badge";
import HomePageApi from "../../../config/homepageApis.json";
import { useQuery } from "../../../hooks/useQuery";
import { MapVariablesArray as IndiaStates } from "../Map/variables";
import * as MapVariables from "../Map/variables";
import { Card } from "../../../styles-components/Cards";
import styled from "styled-components";
import { ThemeContext } from "../../../config/context";
import { useMutate } from "../../../hooks/useMutate";
import * as React from "react";
import { styled as MaterialStyled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const INITIAL_TOGGLE_STATE = {
  state: false,
  industry: false,
  badges: false,
  stages: false,
  sector: false,
  id: "",
};

interface FilterType {
  industries: any[];
  sectors: any[];
  states: any[];
  stages: any[];
  badges: any[];
}

const Accordion = MaterialStyled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `0px solid ${theme.palette.divider}`,
  background: theme.palette.mode === "dark" ? "rgba(37, 40, 58, 1)" : "white",
  "&:not(:last-child)": {
    borderBottom: `1px solid ${theme.palette.divider}`,
    paddingLeft: 0,
    paddingRight: 0,
  },
  "&:last-child": {
    paddingLeft: 0,
    paddingRight: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = MaterialStyled((props: AccordionSummaryProps) => {
  const theme = useContext(ThemeContext);
  return (
    <MuiAccordionSummary
      expandIcon={
        <KeyboardArrowDownIcon sx={{ fontSize: "18px", color: theme.color }} />
      }
      {...props}
    />
  );
})(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? "rgba(37, 40, 58, 1)" : "white",
  flexDirection: "row-reverse",
  border: "0px",
  paddingLeft: 0,
  paddingRight: 0,
  alignItems: "flex-end",
  paddingBottom: "5px",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(-180deg)",
    marginRight: "10px",
    marginBottom: "4px",
  },
  "& .MuiAccordionSummary-expandIconWrapper": {
    marginRight: "10px",
    marginBottom: "4px",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: "0px",
    margin: 0,
    padding: 0,
  },
}));

const AccordionDetails = MaterialStyled(MuiAccordionDetails)(({ theme }) => ({
  padding: 0,
  background: theme.palette.mode === "dark" ? "rgba(37, 40, 58, 1)" : "white",
}));

const DropDown = styled.button`
  color: ${(props) => props.theme.colorCards} !important;
  padding: 0px !important;
`;
const SearchBarWrapper = styled.div`
  color: ${(props) => props.theme.colorCards} !important;
  background: ${(props) => props.theme.bgCards} !important;
  box-shadow: ${(props) => props.theme.shadowCards} !important;
`;

const SearchBarInput = styled.input`
  color: ${(props) => props.theme.colorCards} !important;
  background: ${(props) => props.theme.bgCards} !important;
`;

const SpanIcon = styled.span`
  color: ${(props) => props.theme.color};
  margin-top: 1.4px !important;
`;

const INITIAL_FILTER_STATE2 = {
  industries: [],
  sectors: [],
  states: [],
  stages: [],
  badges: [],
};

const LeftNavComponent = (props: any) => {
  const {
    setSelectedArea,
    selectedArea,
    tagsResources,
    appliedFilters,
    setAppliedFilters,
  } = props;

  const [fetchFilterList, filterState, filterLoading] = useMutate(
    "/startup/filter/defaults",
    INITIAL_FILTER_STATE2
  );

  const [expanded, setExpanded] = React.useState<string | false>("");

  const theme = useContext(ThemeContext);

  const [selectedState, setSelectedState] = useState<any[]>([]);
  const [selectedSector, setSelectedSector] = useState<any[]>([]);
  const [selectedStages, setSelectedStages] = useState<any[]>([]);
  const [selectedIndustry, setSelectedIndustry] = useState<any[]>([]);
  const [selectedBadges, setSelectedBadges] = useState<any[]>([]);

  const [leftNavWidth, setLeftNavWidth] = useState<number>(0);

  const [fetchBadges, badgesState, badgesLoading] = useQuery(
    HomePageApi.badges
  );

  const findSelectedIndex = (array: any[], obj: any) =>
    array.findIndex((item: any) => item.id === obj.id);

  const handleStateClick = (state: any) => {
    const stateIndex = findSelectedIndex(selectedState, state);
    // if (stateIndex !== -1) {
    //   // setSelectedArea({ id: "india", stateName: "India" });
    //   return setSelectedState((prevState: any) => {
    //     const newArray = [...prevState];
    //     newArray.splice(stateIndex, 1);
    //     return newArray;
    //   });
    // }
    // return setSelectedState((prevState: any) => {
    //   const newArray = [...prevState, state];
    //   return newArray;
    // });
    if (stateIndex !== -1) {
      return setSelectedState([]);
    }
    setSelectedState([state]);
    setExpanded(false)
  };
  const onApplyState = () => {
    const stateIdsForAPiRequest = new Array();
    selectedState.forEach((state: any) => stateIdsForAPiRequest.push(state.id));

    setAppliedFilters((prevState: any) => ({
      ...prevState,
      states: stateIdsForAPiRequest,
    }));
    const area = {
      id: selectedState[0].id,
      stateName: selectedState[0].value,
    };
    setSelectedArea(area);
  };

  const handleSectorClick = (sectorObj: any) => {
    const sectorIndex = findSelectedIndex(selectedSector, sectorObj);
    if (sectorIndex !== -1) {
      return setSelectedSector((prevState: any) => {
        const newSectors = [...prevState];
        newSectors.splice(sectorIndex, 1);
        return newSectors;
      });
    }
    return setSelectedSector((prevState: any) => {
      const newSectors = [...prevState, sectorObj];
      return newSectors;
    });
  };
  const onApplySector = () => {
    const sectorIdsForAPiRequest = new Array();
    selectedSector.forEach((sector: any) =>
    sectorIdsForAPiRequest.push(sector.id)
    );
    
    setAppliedFilters((prevState: any) => ({
      ...prevState,
      sectors: sectorIdsForAPiRequest,
    }));
    setExpanded(false)
  };
  
  const handleStagesClick = (stage: any) => {
    const stagesIndex = findSelectedIndex(selectedStages, stage);
    if (stagesIndex !== -1) {
      return setSelectedStages((prevState: any) => {
        const newStages = [...prevState];
        newStages.splice(stagesIndex, 1);
        return newStages;
      });
    }
    return setSelectedStages((prevState: any) => {
      const newStages = [...prevState, stage];
      return newStages;
    });
  };
  const onApplyStages = () => {
    const stagesIdsForApiRequest = new Array();
    selectedStages.forEach((sector: any) =>
      stagesIdsForApiRequest.push(sector.id)
    );

    setAppliedFilters((prevState: any) => ({
      ...prevState,
      stages: stagesIdsForApiRequest,
    }));
    setExpanded(false)
  };
  
  const handleIndustryClick = (industry: any) => {
    const industryIndex = findSelectedIndex(selectedIndustry, industry);
    if (industryIndex !== -1) {
      return setSelectedIndustry((prevState: any) => {
        const newIndustry = [...prevState];
        newIndustry.splice(industryIndex, 1);
        return newIndustry;
      });
    }
    return setSelectedIndustry((prevState: any) => {
      const newIndustry = [...prevState, industry];
      return newIndustry;
    });
  };
  const onApplyIndustry = () => {
    const stagesIdsForApiRequest = new Array();
    selectedIndustry.forEach((sector: any) =>
      stagesIdsForApiRequest.push(sector.id)
    );

    setAppliedFilters((prevState: any) => ({
      ...prevState,
      industries: stagesIdsForApiRequest,
    }));
    setExpanded(false)
  };
  
  const handleBadgesClick = (badges: any) => {
    const badgesIndex = findSelectedIndex(selectedBadges, badges);
    if (badgesIndex !== -1) {
      return setSelectedBadges((prevState: any) => {
        const newsBadges = [...prevState];
        newsBadges.splice(badgesIndex, 1);
        return newsBadges;
      });
    }
    return setSelectedBadges((prevState: any) => {
      const newsBadges = [...prevState, badges];
      return newsBadges;
    });
  };
  const onApplyBadges = () => {
    const badgesIdsForApiRequest = new Array();
    selectedBadges.forEach((sector: any) =>
    badgesIdsForApiRequest.push(sector.id)
    );
    
    setAppliedFilters((prevState: any) => ({
      ...prevState,
      badges: badgesIdsForApiRequest,
    }));
    setExpanded(false)
  };

  const trimBadges = (badges: any[]) => {
    const newBadgesList = new Array();
    badges.forEach((badge: any) =>
      newBadgesList.push({ id: badge.id, value: badge.title })
    );
    return newBadgesList;
  };

  useEffect(() => {
    fetchBadges();
    fetchFilterList();
  }, []);

  useEffect(() => {
    if (selectedArea.id !== "india") {
      setSelectedState([
        { id: selectedArea.id, value: selectedArea.stateName },
      ]);
      setAppliedFilters((prevState: any) => ({
        ...prevState,
        states: [selectedArea.id],
      }));
    } else {
      setSelectedState([]);
      setAppliedFilters((prevState: any) => ({ ...prevState, states: [] }));
    }
  }, [selectedArea]);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };
  // window.addEventListener("resize", () => setLeftNavWidth(window.innerWidth));
  return (
    <>
      <div
        className="left-side-nav-styles"
        style={{
          position: "sticky",
          // width: "18.666667%",
          // left: 0,
          // maxWidth: '250px',
          top: "96px",
          zIndex: 10,
        }}
      >
        <div className="px-2">
          {!expanded ? (
            <div className="row search-bar-row">
              <SearchBarWrapper className="rounded h-100 d-flex mx-0 px-0 search-bar">
                <SpanIcon
                  className="btn shadow-none border-0 m-0 pe-1 ps-4 "
                  id="search-addon"
                >
                  <BiSearchAlt2 size={17.06} />
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
          ) : (
            <></>
          )}
          <Card
            className="row mb-3 ps-2 pe-0 py-0 bg-white pb-2 dropdown-card p-16px"
            id="flush1"
          >
            <Accordion
              expanded={expanded === "panel1"}
              onChange={handleChange("panel1")}
            >
              <AccordionSummary
                aria-controls="panel1d-content"
                id="panel1d-header"
              >
                <DropDown
                  className={`btn shadow-none d-flex w-100 mx-0 px-0 align-items-center mt-1 collapsed px-0 position-relative p-`}
                  type="button"
                >
                  States
                  {appliedFilters.states.length !== 0 && (
                    <RoundedBadge className="ms-auto me-3">
                      {appliedFilters.states.length}
                    </RoundedBadge>
                  )}
                  {
                    <span className="count-text ms-auto">
                      {filterState.states.length}
                    </span>
                  }
                </DropDown>
              </AccordionSummary>
              <AccordionDetails>
                <DropDownListComponent
                  accessor={"states"}
                  originalData={filterState.states}
                  loading={filterLoading}
                  handleClick={handleStateClick}
                  selectedItem={selectedState}
                  handleApplyClick={onApplyState}
                  dropDownId={"#collapse1"}
                  handleClearClick={() => {
                    setSelectedState([]);
                    setSelectedArea(MapVariables.INDIA);
                  }}
                />
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === "panel2"}
              onChange={handleChange("panel2")}
            >
              <AccordionSummary
                aria-controls="panel1d-content"
                id="panel1d-header"
              >
                <DropDown
                  className={`btn shadow-none d-flex w-100 mx-0 px-0 align-items-center mt-1 collapsed px-0 position-relative p-`}
                  type="button"
                >
                  Sector
                  {appliedFilters.sectors.length !== 0 && (
                    <RoundedBadge className="ms-auto me-3">
                      {appliedFilters.sectors.length}
                    </RoundedBadge>
                  )}
                  {
                    <span className="count-text ms-auto">
                      {filterState.sectors.length}
                    </span>
                  }
                </DropDown>
              </AccordionSummary>
              <AccordionDetails>
                <DropDownListComponent
                  accessor={"sectors"}
                  originalData={filterState.sectors}
                  loading={filterLoading}
                  selectedItem={selectedSector}
                  handleClick={handleSectorClick}
                  handleApplyClick={onApplySector}
                  dropDownId={"#collapse2"}
                  handleClearClick={() => {
                    setSelectedSector([]);
                  }}
                />
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === "panel3"}
              onChange={handleChange("panel3")}
            >
              <AccordionSummary
                aria-controls="panel1d-content"
                id="panel1d-header"
              >
                <DropDown
                  className={`btn shadow-none d-flex w-100 mx-0 px-0 align-items-center mt-1 collapsed px-0 position-relative p-`}
                  type="button"
                >
                  Industry
                  {appliedFilters.industries.length !== 0 && (
                    <RoundedBadge className="ms-auto me-3">
                      {appliedFilters.industries.length}
                    </RoundedBadge>
                  )}
                  {
                    <span className="count-text ms-auto">
                      {filterState.industries.length}
                    </span>
                  }
                </DropDown>
              </AccordionSummary>
              <AccordionDetails>
                <DropDownListComponent
                  accessor={"industries"}
                  originalData={filterState.industries}
                  loading={filterLoading}
                  selectedItem={selectedIndustry}
                  handleClick={handleIndustryClick}
                  handleApplyClick={onApplyIndustry}
                  dropDownId={"#collapse3"}
                  handleClearClick={() => {
                    setSelectedIndustry([]);
                  }}
                />
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === "panel4"}
              onChange={handleChange("panel4")}
            >
              <AccordionSummary
                aria-controls="panel1d-content"
                id="panel1d-header"
              >
                <DropDown
                  className={`btn shadow-none d-flex w-100 mx-0 px-0 align-items-center mt-1 collapsed px-0 position-relative p-`}
                  type="button"
                >
                  Stages
                  {appliedFilters.stages.length !== 0 && (
                    <RoundedBadge className="ms-auto me-3">
                      {appliedFilters.stages.length}
                    </RoundedBadge>
                  )}
                  {
                    <span className="count-text ms-auto">
                      {filterState.stages.length}
                    </span>
                  }
                </DropDown>
              </AccordionSummary>
              <AccordionDetails>
                <DropDownListComponent
                  accessor={"stages"}
                  originalData={filterState.stages}
                  loading={filterLoading}
                  selectedItem={selectedStages}
                  handleClick={handleStagesClick}
                  handleApplyClick={onApplyStages}
                  dropDownId={"#collapse4"}
                  handleClearClick={() => setSelectedStages([])}
                />
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === "panel5"}
              onChange={handleChange("panel5")}
            >
              <AccordionSummary
                aria-controls="panel1d-content"
                id="panel1d-header"
              >
                <DropDown
                  className={`btn shadow-none d-flex w-100 mx-0 px-0 align-items-center mt-1 collapsed px-0 position-relative p-`}
                  type="button"
                >
                  Winner Badges
                  {appliedFilters.badges.length > 0 && (
                    <RoundedBadge className="ms-auto me-3">
                      {appliedFilters.badges.length}
                    </RoundedBadge>
                  )}
                  <span className="count-text ms-auto">
                    {badgesState.length}
                  </span>
                </DropDown>
              </AccordionSummary>
              <AccordionDetails>
                <DropDownListComponent
                  accessor={"value"}
                  originalData={trimBadges(badgesState)}
                  loading={badgesLoading}
                  selectedItem={selectedBadges}
                  handleClick={handleBadgesClick}
                  handleApplyClick={onApplyBadges}
                  noSort={true}
                  dropDownId={"#collapse5"}
                  handleClearClick={() => {
                    setSelectedBadges([]);
                  }}
                />
              </AccordionDetails>
            </Accordion>
          </Card>
          <Card className="left-nav-bottom-card row pt-3 pb-0">
            <h6 className="px-0 card-heading-left-bottom">
              {" "}
              VIEW STARTUP ECOSYSTEM INSIGHTS OF INDIA
            </h6>
            <span className="sub-heading px-0 mb-2 font-500">
              You can View Insights of India
            </span>
            <div className="btn-view-project mx-0 px-0">
              <Button>View Insights</Button>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default React.memo(LeftNavComponent);
