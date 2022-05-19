import { useState, useEffect, useContext } from "react";
import DropDownListComponent from "./DropDownListComponent";
import "../../../scss/HomePageStyles/leftNavComponent.scss";
import { RoundedBadge } from "../../../styles-components/Badge";
import HomePageApi from "../../../config/homepageApis.json";
import { useQuery } from "../../../hooks/useQuery";
import * as MapVariables from "../Map/variables";
import { Card } from "../../../styles-components/Cards";
import styled from "styled-components";
import { ThemeContext } from "../../../config/context";
import * as React from "react";
import { styled as MaterialStyled } from "@mui/material/styles";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useHistory } from "react-router-dom";
import SearchBar from "../AllSearch";
import ViewInsight from "../ViewInsight";

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

const LeftNavComponent = (props: any) => {
  const {
    setSelectedArea,
    selectedArea,
    tagsResources,
    appliedFilters,
    setAppliedFilters,
    colorTheme,
    fetchFilterList,
    filterState,
    filterLoading,
    noShadow,
    insight,
    search: searchVisible,
    dateRange,
    dateRangeState,
    dateRangeLoading,
    selectedState,
    setSelectedState,
    handleToggle,
  } = props;

  const [expanded, setExpanded] = React.useState<string | false>("");
  const [searchBarExpanded, setSearchBarExpanded] = useState<boolean>(false);

  const theme = useContext(ThemeContext);
  const history = useHistory();

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
    if (stateIndex !== -1) {
      return setSelectedState([]);
    }
    console.log("Selected State12", state);
    setSelectedState([state]);
  };

  const closeModal = () => {
    if (handleToggle) {
      handleToggle();
    }
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
    setExpanded(false);
    history.push(`/?id=${area.id}&state=${area.stateName}`);
    closeModal();
  };

  const handleSectorClick = (sectorObj: any) => {
    const sectorIndex = findSelectedIndex(selectedSector, sectorObj);
    let sectors: any[] = [];
    if (sectorIndex !== -1) {
      setSelectedSector((prevState: any) => {
        const newSectors = [...prevState];
        newSectors.splice(sectorIndex, 1);
        sectors = newSectors;
        return newSectors;
      });
      return sectors;
    }
    setSelectedSector((prevState: any) => {
      const newSectors = [...prevState, sectorObj];
      sectors = newSectors;
      return newSectors;
    });

    return sectors;
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
    setExpanded(false);
    closeModal();
  };

  const onSectorClear = () => {
    setSelectedSector([]);
    setAppliedFilters((prev: any) => ({ ...prev, sectors: [] }));
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
    setExpanded(false);
    closeModal();
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
    setExpanded(false);
    closeModal();
  };

  const onIndustryClear = () => {
    setSelectedIndustry([]);
    setAppliedFilters((prev: any) => ({ ...prev, industries: [] }));
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
    setExpanded(false);
    closeModal();
  };

  const onClearBadges = () => {
    setSelectedBadges([]);
    setAppliedFilters((prev: any) => ({ ...prev, badges: [] }));
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

  const viewInsightUrl = `/view-insight?id=${
    selectedState[0] ? selectedState[0].id : ""
  }&state=${selectedState[0] ? selectedState[0].value : ""}`;
  const actions = {
    handleStateClick,
    closeModal,
    onApplyState,
    handleSectorClick,
    onApplySector,
    handleStagesClick,
    onApplyStages,
    handleIndustryClick,
    onApplyIndustry,
    setAppliedFilters,
    appliedFilters
  };
  return (
    <>
      <div
        className="left-side-nav-styles"
        style={{
          position: "sticky",
          top: "96px",
          zIndex: 10,
        }}
      >
        <div className="px-2">
          {!expanded && searchVisible ? (
            <SearchBar
              filterState={filterState}
              actions={actions}
              searchBarExpanded={searchBarExpanded}
              colorTheme={colorTheme}
              setSearchBarExpanded={setSearchBarExpanded}
            />
          ) : (
            <></>
          )}
          {!searchBarExpanded ? (
            <>
              <Card
                noShadow={noShadow}
                className={`row mb-3 ps-2 pe-0 py-0 bg-white pb-2 dropdown-card p-16px ${
                  !searchVisible && "mt-0"
                }`}
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
                        <RoundedBadge className="ms-auto me-3 background-color-theme">
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
                      colorTheme={colorTheme}
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
                        <RoundedBadge className="ms-auto me-3 background-color-theme">
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
                      colorTheme={colorTheme}
                      originalData={filterState.industries}
                      loading={filterLoading}
                      selectedItem={selectedIndustry}
                      handleClick={handleIndustryClick}
                      handleApplyClick={onApplyIndustry}
                      dropDownId={"#collapse3"}
                      handleClearClick={onIndustryClear}
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
                        <RoundedBadge className="ms-auto me-3 background-color-theme">
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
                      colorTheme={colorTheme}
                      originalData={filterState.sectors}
                      loading={filterLoading}
                      selectedItem={selectedSector}
                      handleClick={handleSectorClick}
                      handleApplyClick={onApplySector}
                      dropDownId={"#collapse2"}
                      handleClearClick={onSectorClear}
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
                        <RoundedBadge className="ms-auto me-3 background-color-theme">
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
                      colorTheme={colorTheme}
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
                        <RoundedBadge className="ms-auto me-3 background-color-theme">
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
                      colorTheme={colorTheme}
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
                {dateRange && (
                  <Accordion
                    expanded={expanded === "panel6"}
                    onChange={handleChange("panel6")}
                  >
                    <AccordionSummary
                      aria-controls="panel1d-content"
                      id="panel1d-header"
                    >
                      <DropDown
                        className={`btn shadow-none d-flex w-100 mx-0 px-0 align-items-center mt-1 collapsed px-0 position-relative p-`}
                        type="button"
                      >
                        Date Range
                      </DropDown>
                    </AccordionSummary>
                    <AccordionDetails>
                      <DropDownListComponent
                        accessor={"value"}
                        colorTheme={colorTheme}
                        originalData={dateRangeState}
                        loading={dateRangeLoading}
                        selectedItem={selectedBadges}
                        handleClick={handleBadgesClick}
                        handleApplyClick={onApplyBadges}
                        noSort={true}
                        dropDownId={"#collapse6"}
                        handleClearClick={onClearBadges}
                      />
                    </AccordionDetails>
                  </Accordion>
                )}
              </Card>
            </>
          ) : (
            <></>
          )}
          {insight && (
            <ViewInsight
              colorTheme={colorTheme}
              viewInsightUrl={viewInsightUrl}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default React.memo(LeftNavComponent);
