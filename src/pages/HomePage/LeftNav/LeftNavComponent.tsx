import React, { useState, useEffect, useContext } from "react";
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

const INITIAL_SELECTED_STATE = {
  id: "none",
  name: "none",
};

const INITIAL_SELECTED_SECTOR = {
  id: "",
  sector: "none",
  industryCount: 0,
  sectorCount: 0,
  totalCount: 0,
};

const INITIAL_SELECTED_STAGES = {
  stateName: "none",
  ideation: 0,
  validation: 0,
  earlyTraction: 0,
  scaling: 0,
  total: 0,
  id: "",
};
const INITIAL_SELECTED_INDUSTRY = {
  id: "",
  name: "",
  text: "",
};

const INITIAL_SELECTED_BADGES = {
  id: "",
  title: "",
  description: "",
  iconName: "",
  iconLink: null,
  createdDate: 0,
  lastUpdatedDate: 0,
  deleted: false,
};

const INITIAL_FILTER_STATE = {
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

const DropDown = styled.button`
  color: ${(props) => props.theme.colorCards} !important;
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
  const { setSelectedArea, selectedArea, tagsResources, appliedFilters, setAppliedFilters } = props;

  const [fetchFilterList, filterState, filterLoading] = useMutate(
    "/startup/filter/defaults",
    INITIAL_FILTER_STATE2
  );
  
  const theme = useContext(ThemeContext);

  const [selectedState, setSelectedState] = useState<any[]>([]);
  const [selectedSector, setSelectedSector] = useState<any[]>([]);
  const [selectedStages, setSelectedStages] = useState<any[]>([]);
  const [selectedIndustry, setSelectedIndustry] = useState<any[]>([]);
  const [selectedBadges, setSelectedBadges] = useState<any[]>([]);

  const [fetchBadges, badgesState, badgesLoading] = useQuery(
    HomePageApi.badges
  );

  const generateUrl = (a: string, b: string) => {
    return a + "/" + b.toLowerCase();
  };

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
    if(stateIndex !== -1){
      return setSelectedState([])
    }
    setSelectedState([state])

  };
  const onApplyState = () => {
    const stateIdsForAPiRequest = new Array();
    selectedState.forEach((state: any) => stateIdsForAPiRequest.push(state.id));

    setAppliedFilters((prevState: any) => ({
      ...prevState,
      states: stateIdsForAPiRequest,
    }));
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
  return (
    <>
      <div className="left-side-nav-styles">
        <div className="px-2">
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
          <Card
            className="row mb-3 ps-2 pe-0 py-0 bg-white accordion accordion-flush dropdown-card p-16px"
            id="flush1"
          >
            <div className={` ${theme.dropDownBorder} pt-2 px-0`}>
              <DropDown
                className="btn shadow-none d-flex w-100 mx-0 px-0 align-items-center mt-1 collapsed px-0 position-relative"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapse1"
                aria-expanded="false"
                aria-controls="collapse1"
              >
                <FiChevronDown className="me-2" size={15} />
                States
                {appliedFilters.states.length !== 0 && (
                  <RoundedBadge className="ms-auto me-3">
                    {appliedFilters.states.length}
                  </RoundedBadge>
                )}
                {/* {stateApplied && (
                  <span className="count-text">{statesStates.length}</span>
                )} */}
                {
                  <span className="count-text ms-auto">
                    {filterState.states.length}
                  </span>
                }
              </DropDown>
              <div
                className="collapse mt-2"
                id="collapse1"
                data-bs-parent="flush1"
              >
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
              </div>
            </div>
            <div className={` ${theme.dropDownBorder} pt-1 px-0`}>
              <DropDown
                className="btn shadow-none collapsed d-flex w-100 mx-0 px-0 align-items-center mt-1 px-0 position-relative"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapse2"
                aria-expanded="false"
                aria-controls="collapse2"
              >
                <FiChevronDown className="me-2" size={15} />
                Sector
                {
                  <RoundedBadge
                    hidden={appliedFilters.sectors.length === 0}
                    className="ms-auto me-3"
                  >
                    {appliedFilters.sectors.length}
                  </RoundedBadge>
                }
                {
                  <span className="count-text ms-auto">
                    {filterState.sectors.length}
                  </span>
                }
              </DropDown>
              <div
                className="collapse mt-2"
                id="collapse2"
                data-bs-parent="flush1"
              >
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
                    setAppliedFilters((prevState: FilterType) => ({
                      ...prevState,
                      sector: false,
                    }));
                  }}
                />
              </div>
            </div>
            <div className={` ${theme.dropDownBorder} pt-1 px-0`}>
              <DropDown
                className="btn shadow-none collapsed d-flex w-100 mx-0 px-0 align-items-center mt-1 px-0 position-relative"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapse3"
                aria-expanded="false"
                aria-controls="collapse3"
              >
                <FiChevronDown className="me-2" size={15} />
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
              <div
                className="collapse mt-2"
                id="collapse3"
                data-bs-parent="flush1"
              >
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
              </div>
            </div>

            <div className={` ${theme.dropDownBorder} pt-1 px-0`}>
              <DropDown
                className="btn shadow-none d-flex collapsed w-100 mx-0 px-0 align-items-center mt-1 px-0 position-relative"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapse4"
                aria-expanded="false"
                aria-controls="collapse4"
              >
                <FiChevronDown className="me-2" size={15} />
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
              <div className="collapse mt-2" id="collapse4">
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
              </div>
            </div>
            <div className="border-bottom-filter-last-element pt-1 pb-2 px-0">
              <DropDown
                className="btn shadow-none d-flex w-100 collapsed mx-0 px-0 align-items-center position-relative"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapse5"
                aria-expanded="false"
                aria-controls="collapse5"
              >
                <FiChevronDown className="me-2" size={15} />
                Winner Badges
                {appliedFilters.badges.length > 0 && (
                  <RoundedBadge className="ms-auto me-3">
                    {appliedFilters.badges.length}
                  </RoundedBadge>
                )}
                <span className="count-text ms-auto">{badgesState.length}</span>
              </DropDown>
              <div className="collapse mt-2" id="collapse5">
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
              </div>
            </div>
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

export default LeftNavComponent;
