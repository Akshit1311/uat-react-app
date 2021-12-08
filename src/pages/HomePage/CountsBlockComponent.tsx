import React, { useEffect, useState } from "react";
import "../../scss/HomePageStyles/countBlockComponent.scss";
import { IDType } from "./Map/variables";
import { useQuery } from "../../hooks/useQuery";
import HomePageApi from "../../config/homepageApis.json";
import styled from "styled-components";
import FadeLoader from "react-spinners/FadeLoader";
import { css } from "@emotion/react";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

interface CountBlockTypes {
  selectedArea: IDType;
  countResource: any;
}

interface CountCardTypes {
  name: string;
  state: any;
  activeCard: string;
  setActiveCard: React.Dispatch<React.SetStateAction<string>>;
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
    height: "98px",
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
  name,
  state,
  setActiveCard,
  borderColor,
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
        onClick={() => setActiveCard(name)}
        active={active}
        borderColor={borderColor}
        className="col-5 col-md count-single-card p-0"
      >
        {loading && (
          <FadeLoader
            color={"#0177FA"}
            loading={loading}
            radius={"2px"}
            css={override}
          />
        )}
        {!loading && (
          <div className=" d-flex flex-column h-100 p-3 justify-content-between">
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
  };
});

const CountsBlockComponent = ({
  selectedArea,
  countResource,
}: CountBlockTypes) => {
  // const [getCounts, state, loading] = useQuery(HomePageApi.countBlockEndPoint);
  const [activeCard, setActiveCard] = useState<string>("Startups");
  const { getCounts, countState, countLoading, setSelectedArea } = countResource;

  const [fetchInitialCount, initialCountState] = useQuery(
    HomePageApi.countBlockEndPoint
  );
  useEffect(() => {
    getCounts();
    fetchInitialCount();
  }, []);

  const resources = {
    activeCard,
    setActiveCard,
    state: countState,
    loading: countLoading,
  };

  return (
    <div className="container-fluid count-block-styles px-0 mx-0">
      <div className="row mx-0 px-0">
        <H5>{selectedArea.stateName}</H5>
      </div>
      <div className="row count-div">
        <CountCard
          {...resources}
          borderColor="#0177FA"
          accessor="Startup"
          name="Startups"
        />
        <CountCard
          {...resources}
          borderColor="#ED8E00"
          accessor="Mentor"
          name="Mentors"
        />
        <CountCard {...resources} borderColor="#7838e0" name="Incubator" />
        <CountCard {...resources} borderColor="#BDAA00" name="Investor" />
        <CountCard {...resources} borderColor="#CB3535" name="Accelerator" />
        <CountCard
          {...resources}
          borderColor="#00AD11"
          accessor="GovernmentBody"
          name="Government"
        />
      </div>
      {selectedArea.id !== "india" ? (
        <div className="row mx-0 px-0 m-0 p-0 position-relative w-25 d-flex">
          {/* <p className="m-0 p-0">India</p> */}
          <p
            className="my-0 p-0 font-bold font-Mont font-12px mt-2 position-absolute"
            style={{ marginLeft: "22px" }}
          >
            <a
              onClick={() => setSelectedArea({ id: 'india', stateName: 'India' })}
              style={{ color: "#0177FA", textDecoration: "underline", cursor: 'pointer' }}
            >
              {"India"}
            </a>{" "}
            | Startups {" " + initialCountState.Startup}
          </p>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default CountsBlockComponent;
