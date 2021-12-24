import React, { useContext, useEffect, useState } from "react";
import "../../scss/HomePageStyles/countBlockComponent.scss";
import { IDType } from "./Map/variables";
import { useQuery } from "../../hooks/useQuery";
import HomePageApi from "../../config/homepageApis.json";
import styled from "styled-components";
import MoonLoader from "react-spinners/MoonLoader";
import { css } from "@emotion/react";
import { ThemeContext } from "../../config/context";
import { ThemeColorIdentifier } from "../../helper-function/themeColor";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

interface CountBlockTypes {
  selectedArea: IDType;
  countResource: any;
  applyRoles: any;
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

const CountCardWrapper = styled.div<CountCardWrapperTypes>(
  {
    borderRadius: "4px",
    height: "76px",
    top: "43px",
    width: "170px",
  },
  (props: any) => {
    return {
      backgroundColor: props.active
        ? ThemeColorIdentifier(props.colorTheme)
        : props.theme.bgCards,
      border: `2px solid ${props.borderColor}`,
      color: props.active ? "white" : props.theme.color,
      transition: "0.5s color",
    };
  }
);

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
  console.log("CountBlock Child", state);
  const [currentCount, setCurrentCount] = useState<number>(0);
  const active = name === activeCard;

  useEffect(() => {
    
    const count = state[accessor ? accessor : name.slice(0, -1)];
    console.log("Count Children Before starting count", count);
    
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
        console.log("SOmeethig Went Wrong")
      }
      return () => clearInterval(interval);
    } else if(count && count <  currentCount) {
      let interval: any;
      if (currentCount > count) {
        interval = setInterval(() => {
          setCurrentCount((prevState) => {
            if (prevState === Number(count) || prevState < Number(count)) {
              return count;
            }
            if((currentCount - count) > 1000){
              return prevState - 100
            }
            return prevState - 1;
          });
        }, 1);
      } else if (currentCount === count) {
        clearInterval(interval);
      } else {
        console.log("SOmeethig Went Wrong")
      }
      return () => clearInterval(interval);
    }
    console.log("End Interval");
  }, [state[accessor ? accessor : name.slice(0, -1)], loading]);
  return (
    <>
      <CountCardWrapper
        colorTheme={colorTheme}
        onClick={() => handleCardClick(name, acc)}
        active={active}
        borderColor={borderColor}
        className="col-5 col-md count-single-card p-0"
      >
        {" "}
        {console.log("Count From Children", currentCount)}
        {loading ? (
          <div className="w-100 h-100 d-flex justify-content-center align-items-center">
            <MoonLoader
              color={active ? "white" : "#0177FA"}
              loading={loading}
              size={"25"}
              css={override}
            />
          </div>
        ) : (
          <></>
        )}
        {!loading && (
          <div
            className=" d-flex flex-column h-100 justify-content-between"
            style={{ padding: "0.83rem" }}
          >
            <h4 className="m-0 p-0">{currentCount}</h4>
            <h6 className="mx-0 mb-0 p-0">{name}</h6>
          </div>
        )}
      </CountCardWrapper>
    </>
  );
};

const H5 = styled.h5<any>({}, (props) => {
  return {
    color: props.theme.color,
    marginTop: "0.3rem",
  };
});

export class CountBlockModel {
  Exploring: number = 0;
  Incubator: number = 0;
  Corporate: number = 0;
  SIH_Admin: number = 0;
  Mentor: number = 0;
  Academia: number = 0;
  GovernmentBody: number = 0;
  ConnectToPotentialPartner: number = 0;
  IndiaMarketEntry: number = 0;
  Individual: number = 0;
  ServiceProvider: number = 0;
  Investor: number = 0;
  Startup: number = 0;
  Accelerator: number = 0;
  maxRange: number = 0;
}

const CountsBlockComponent = ({
  selectedArea,
  countResource,
  applyRoles,
}: CountBlockTypes) => {
  const theme = useContext(ThemeContext);
  const [activeCard, setActiveCard] = useState<string>("Startups");
  const {
    getCounts,
    colorTheme,
    countState,
    countLoading,
    setPrimaryColorTheme,
    setSelectedArea,
    tableState,
    selectedStateByMap,
    setSelectedStateByMap,
  } = countResource;

  const [stateCounts, setStateCounts] = useState<any>(new CountBlockModel());

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
      console.log("Counts From Filter", count);
      setStateCounts(count);
    }
  };

  useEffect(() => {
    filterStateCounts();
  }, [selectedStateByMap, tableState]);

  useEffect(() => {
    getCounts();
  }, []);

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
    state:
      selectedStateByMap.name && selectedStateByMap.name.length
        ? stateCounts
        : countState,
    loading: countLoading,
    colorTheme,
  };

  return (
    <div className="container-fluid count-block-styles px-0 mx-0">
      <div className="row mx-0 px-0">
        <div className="d-flex mt-3 px-0">
          <H5>{selectedArea.stateName}</H5>
          {selectedArea.id !== "india" ? (
            <>
              <div className="ms-3" />
              <div className="font-bold" style={{ marginTop: "-2px" }}>
                |
              </div>
              <div className="ms-3" />
              <div className="row mx-0 px-0 m-0 p-0 position-relative w-25 d-flex">
                {/* <p className="m-0 p-0">India</p> */}
                <p className="my-0 p-0  font-bold d-flex font-Mont font-12px mt-0">
                  <div
                    onClick={() => {
                      setSelectedArea({ id: "india", stateName: "India" });
                      setSelectedStateByMap({
                        id: "",
                        name: "",
                      });
                    }}
                    style={{
                      textDecoration: "none",
                      color: "#0177FA",
                      cursor: "pointer",
                      width: "fit-content",
                    }}
                    className="d-flex flex-column"
                  >
                    <div className="text-theme">{"India"}</div>
                    <div
                      className="background-color-theme"
                      style={{ height: "1px" }}
                    ></div>
                  </div>{" "}
                  <div className="ms-1" style={{ color: theme.color }}>
                    | Startups {" " + countState.Startup}
                  </div>
                </p>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className="row count-div">
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
