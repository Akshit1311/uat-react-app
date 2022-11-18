import React, { useContext, useEffect, useState } from "react";
import "../../scss/HomePageStyles/countBlockComponent.scss";
import { IDType } from "./Map/variables";
import HomePageApi from "../../config/homepageApis.json";
import styled from "styled-components";
import MoonLoader from "react-spinners/MoonLoader";
import { css } from "@emotion/react";
import { ThemeContext } from "../../config/context";
import { ThemeColorIdentifier } from "../../helper-function/themeColor";
import { H5 } from "../../styles-components/Heading";
import { CountBlockModel } from ".";
import { useWindowSize } from "../../hooks/useWindowSize";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useWebQuery } from "../../hooks/useWebQuery";

const baseRoute = process.env.REACT_APP_BASE_URL || "";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

interface CountBlockTypes {
  selectedArea: IDType;
  countResource: any;
  applyRoles: any;
  setStateViewMap: React.Dispatch<boolean>;
  activeCard: string;
  setActiveCard: any;
}

interface CountCardTypes {
  name: string;
  state: any;
  acc?: string;
  activeCard: string;
  handleCardClick: any;
  borderColor: string;
  accessor?: string;
  loading: boolean;
  colorTheme: string;
}

interface CountCardWrapperTypes {
  active: boolean;
  borderColor: string;
  colorTheme: string;
}

const CountCardWrapper = styled.div<CountCardWrapperTypes>`
  border-radius: 4px;
  height: 76px;
  top: 43px;
  background-color: ${(props: any) =>
    props.active
      ? ThemeColorIdentifier(props.colorTheme)
      : props.theme.bgCards};
  border: 2px solid ${(props: any) => props.borderColor};
  color: ${(props: any) => (props.active ? "white" : props.theme.color)};
  transition: 0.5s color;
  @media (max-width: 768px) {
    border: none;
    background-color: ${(props: any) =>
      props.active ? "rgba(255,255,255,0)" : "rgba(255,255,255,0)"} !important;
    color: ${(props: any) =>
      props.active ? props.theme.color : ""} !important;
    height: 82px;
    font-weight: ${(props: any) => (props.active ? "600" : "500")};
  }
`;

const CountCard = ({
  activeCard,
  name,
  acc,
  state,
  borderColor,
  handleCardClick,
  accessor,
  loading,
  colorTheme,
}: CountCardTypes) => {
  const [windowWidth, windowHeight] = useWindowSize();
  const [currentCount, setCurrentCount] = useState<number>(0);
  const active = name === activeCard;
  const theme = useContext(ThemeContext);

  useEffect(() => {
    const count = state[accessor ? accessor : name.slice(0, -1)];
    if (count === 0) {
      setCurrentCount(0);
    }
    if (count && count > currentCount) {
      let interval: any;
      if (currentCount < count) {
        interval = setInterval(() => {
          setCurrentCount((prevState) => {
            if (prevState === Number(count) || prevState > Number(count)) {
              return count;
            }
            if (count > 1000) {
              return prevState + 500;
            }
            if (count < 1000 && count > 500) {
              return prevState + 10;
            }
            return prevState + 1;
          });
        }, 1);
      } else if (currentCount === count) {
        clearInterval(interval);
      } else {
      }
      return () => clearInterval(interval);
    } else if (count && count < currentCount) {
      let interval: any;
      if (currentCount > count) {
        interval = setInterval(() => {
          setCurrentCount((prevState) => {
            if (prevState === Number(count) || prevState < Number(count)) {
              return count;
            }
            if (currentCount - count > 10000) {
              return prevState - 500;
            }
            if (currentCount - count > 5000) {
              return prevState - 200;
            }
            if (currentCount - count > 1000) {
              return prevState - 100;
            }
            return prevState - 1;
          });
        }, 1);
      } else if (currentCount === count) {
        clearInterval(interval);
      } else {
      }
      return () => clearInterval(interval);
    }
  }, [state[accessor ? accessor : name.slice(0, -1)], loading]);

  return (
    <CountCardWrapper
      colorTheme={colorTheme}
      onClick={() => handleCardClick(name, acc)}
      active={active}
      borderColor={borderColor}
      className={`col-md count-single-card p-0 w-100`}
    >
      {loading ? (
        <div className="w-100 h-100 d-flex justify-content-center align-items-center">
          <MoonLoader
            color={active ? "white" : ThemeColorIdentifier(colorTheme)}
            loading={true}
            size={"25px"}
            css={override}
          />
        </div>
      ) : (
        <></>
      )}
      {!loading && (
        <div
          className=" d-flex flex-column h-100 justify-content-between"
          style={{ padding: "0.83rem", paddingRight: 0 }}
        >
          <h4
            className="m-0 p-0 count-number"
            style={{
              color: !active ? theme.color : "",
              visibility: windowWidth > 768 || active ? "visible" : "hidden",
            }}
          >
            {currentCount}
          </h4>
          <div>
            <h6
              style={{
                color: !active
                  ? theme.color
                  : windowWidth < 768
                  ? ThemeColorIdentifier(colorTheme)
                  : "",
              }}
              className="mx-0 mb-0 p-0"
            >
              {name}
            </h6>
            <div
              className={`count-underline d-block d-sm-none`}
              style={{
                visibility: active ? "visible" : "hidden",
                background: ThemeColorIdentifier(colorTheme),
              }}
            ></div>
          </div>
        </div>
      )}
    </CountCardWrapper>
  );
};

interface KeyValuePair {
  id: string;
  value: string;
}

const CountsBlockComponent = ({
  selectedArea,
  countResource,
  applyRoles,
  setStateViewMap,
  activeCard,
  setActiveCard,
}: CountBlockTypes) => {
  const theme = useContext(ThemeContext);
  const history = useHistory();

  const {
    getCounts,
    colorTheme,
    // countState,
    countLoading,
    setPrimaryColorTheme,
    setSelectedArea,
    tableState,
    selectedStateByMap,
    setSelectedStateByMap,
    appliedFilters,
    setStartupCount,
  } = countResource;
  const [stateCounts, setStateCounts] = useState<any>(new CountBlockModel());

  const BASE_URL = process.env.REACT_APP_BACKEND_ENDPOINT;
  const query = useWebQuery();

  const fetchCounts = async () => {
    try {
      const { data } = await axios.post(`${BASE_URL}/home/topNumbers`, {
        ...appliedFilters,
        stateId: appliedFilters.states[0],
        roles: [
          "Startup",
          "Mentor",
          "Investor",
          "GovernmentBody",
          "Incubator",
          "Accelerator",
        ],
      });

    
      // const getCountsById = (id: string) =>
      //   data.find((i: any) =>  i._id.Role === id);

      const count: any = new CountBlockModel();

      // count = {}

      Object.keys(data).forEach((item: string) => {
        count[item] = data[item];
      });

      // count.Incubator = getCountsById("Incubator")
      //   ? getCountsById("Incubator").count
      //   : 0;
      // count.Mentor = getCountsById("Mentor")
      //   ? getCountsById("Mentor").count
      //   : 0;
      // count.Accelerator = getCountsById("Accelerator")
      //   ? getCountsById("Accelerator").count
      //   : 0;
      // count.Startup = getCountsById("Startup")
      //   ? getCountsById("Startup").count
      //   : 0;
      // count.GovernmentBody = getCountsById("GovernmentBody")
      //   ? getCountsById("GovernmentBody").count
      //   : 0;
      // count.Investor = getCountsById("Investor")
      //   ? getCountsById("Investor").count
      //   : 0;
      setStateCounts(count);
      setStartupCount(count.Startup);
    } catch (error) {}
  };

  const filterStateCounts = () => {
    const state = tableState.data
      ? tableState.data.find(
          (item: any) =>
            item.text.toLowerCase() === selectedStateByMap.name.toLowerCase()
        )
      : undefined;
    if (state) {
      const count = new CountBlockModel();
      count.Incubator = state.statistics.Incubator;
      count.Mentor = state.statistics.Mentor;
      count.Accelerator = state.statistics.Accelerator;
      count.Startup = state.statistics.Startup;
      count.GovernmentBody = state.statistics.GovernmentBody;
      count.Investor = state.statistics.Investor;
      setStateCounts(count);
    }
  };

  // useEffect(() => {
  //   filterStateCounts();
  // }, [selectedStateByMap, tableState]);

  useEffect(() => {
    fetchCounts();
  }, [appliedFilters]);

  const getThemeName = (name: string) => {
    const value = name.toLowerCase();
    if (value === "startups") return "theme-1";
    if (value === "mentors") return "theme-3";
    if (value === "incubators") return "theme-4";
    if (value === "investors") return "theme-5";
    if (value === "accelerators") return "theme-6";
    if (value === "government") return "theme-7";
  };

  const handleCardClick = (name: string, accessor: string) => {
    applyRoles(accessor, name);
    setActiveCard(name);
    setPrimaryColorTheme(getThemeName(name));
  };

  const resources = {
    activeCard,
    handleCardClick,
    state: stateCounts,
    loading: countLoading,
    colorTheme,
  };

  const id = query.get("state");
  const stateSelected = id !== "india" || id ? id : null;

  return (
    <div className="container-fluid count-block-styles px-0 mx-0">
      <div className="row mx-0 px-0">
        <div className="d-flex mt-3 px-0 align-items-baseline">
          {/* <H5>{selectedArea.stateName}</H5> */}
          <H5
            active={stateSelected}
            colorTheme={colorTheme}
            onClick={() => {
              if (!stateSelected) return;
              setSelectedArea({ id: "india", stateName: "India" });
              setSelectedStateByMap({
                id: "",
                name: "",
              });
              setStateViewMap(false);
              history.push(baseRoute + "/maps/");
            }}
            className={`mb-3 ${stateSelected ? "text-theme" : ""}`}
          >
            India
          </H5>
          {stateSelected && selectedArea.stateName != "India" ? (
            <>
              <div className="d-flex ms-2 align-items-center">
                <p style={{ color: theme.color }} className="m-0 p-0 font-12px">
                  {">"}
                </p>
                <p
                  style={{ color: theme.color }}
                  className="p-0 m-0 state-label ms-2"
                >
                  {selectedArea.stateName}
                </p>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className="d-inline-flex count-div horizontal-scroll">
        <CountCard
          {...resources}
          borderColor="#0177FA"
          accessor="Startup"
          name="Startups"
          acc={"Startup"}
        />
        <CountCard
          {...resources}
          borderColor="#ED8E00"
          accessor="Mentor"
          acc={"Mentor"}
          name="Mentors"
        />
        <CountCard
          {...resources}
          borderColor="#7838e0"
          name="Incubators"
          acc="Incubator"
        />
        <CountCard
          {...resources}
          borderColor="#BDAA00"
          name="Investors"
          acc="Investor"
        />
        <CountCard
          {...resources}
          borderColor="#CB3535"
          name="Accelerators"
          acc="Accelerator"
        />
        <CountCard
          {...resources}
          borderColor="#00AD11"
          accessor="GovernmentBody"
          acc="GovernmentBody"
          name="Government"
        />
      </div>
    </div>
  );
};

export default React.memo(CountsBlockComponent);
