import React, { useContext, useEffect, useState } from "react";
import "../../scss/HomePageStyles/countBlockComponent.scss";
import { IDType } from "./Map/variables";
import { useQuery } from "../../hooks/useQuery";
import HomePageApi from "../../config/homepageApis.json";
import styled from "styled-components";
import MoonLoader from "react-spinners/MoonLoader";
import { css } from "@emotion/react";
import { ThemeContext } from "../../config/context";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

interface CountBlockTypes {
  selectedArea: IDType;
  countResource: any;
  applyRoles:any;
}

interface CountCardTypes {
  name: string;
  state: any;
  acc? :string;
  activeCard: string;
  handleCardClick:any;
  borderColor: string;
  accessor?: string;
  loading: boolean;
}

interface CountCardWrapperTypes {
  active: boolean;
  borderColor: string;
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
      backgroundColor: props.active ? "#0177FA" : props.theme.bgCards,
      border: props.active
        ? "2px solid #0177FA"
        : `2px solid ${props.borderColor}`,
      color: props.active ? "white" : props.theme.color,
      transition: "0.5s color",
    };
  }
);

const CountCard = ({
  activeCard,
  name,acc,
  state,
  borderColor,handleCardClick,
  accessor,
  loading,
}: CountCardTypes) => {
  const [currentCount, setCurrentCount] = useState<number>(0);
  const active = name === activeCard;

  useEffect(() => {
    setCurrentCount(0);
    const count = state[accessor ? accessor : name];
    if (count && count > 0) {
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
      }
      return () => clearInterval(interval);
    }
    console.log("End Interval");
  }, [state, loading]);
  return (
    <>
      <CountCardWrapper
        onClick={() => handleCardClick(name, acc)}
        active={active}
        borderColor={borderColor}
        className="col-5 col-md count-single-card p-0"
      >
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
    marginTop: '2px'
  };
});

const CountsBlockComponent = ({
  selectedArea,
  countResource,applyRoles
}: CountBlockTypes) => {
  const theme = useContext(ThemeContext);
  // const [getCounts, state, loading] = useQuery(HomePageApi.countBlockEndPoint);
  const [activeCard, setActiveCard] = useState<string>("Startups");
  const { getCounts, countState, countLoading, setSelectedArea } =
    countResource;

  const [fetchInitialCount, initialCountState] = useQuery(
    HomePageApi.countBlockEndPoint
  );
  useEffect(() => {
    getCounts();
    fetchInitialCount();
  }, []);

  const handleCardClick = (name:string, accessor:string) =>{
    console.log("Accessor",accessor)
    applyRoles(accessor)
    setActiveCard(name)
  }

  const resources = {
    activeCard,
    handleCardClick,
    state: countState,
    loading: countLoading,
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
                    onClick={() =>
                      setSelectedArea({ id: "india", stateName: "India" })
                    }
                    style={{
                      textDecoration: "none",
                      color: "#0177FA",
                      cursor: "pointer",
                      width: "fit-content",
                    }}
                    className="d-flex flex-column"
                  >
                    <div>{"India"}</div>
                    <div style={{ background: "#0177FA", height: "1px" }}></div>
                  </div>{" "}
                  <div className="ms-1" style={{ color: theme.color }}>
                    | Startups {" " + initialCountState.Startup}
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
        <CountCard {...resources} borderColor="#7838e0" name="Incubator" acc="Incubator" />
        <CountCard {...resources} borderColor="#BDAA00" name="Investor" acc="Investor" />
        <CountCard {...resources} borderColor="#CB3535" name="Accelerator" acc="Accelerator" />
        <CountCard
          {...resources}
          borderColor="#00AD11"
          accessor="GovernmentBody"
          name="Government"
        />
      </div>
    </div>
  );
};

export default React.memo(CountsBlockComponent);
