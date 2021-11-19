import React, { useEffect, useState } from "react";
import "../../scss/HomePageStyles/countBlockComponent.scss";
import { IDType } from "./Map/variables";
import { useQuery } from "../../hooks/useQuery";
import HomePageApi from "../../config/homepageApis.json";
import styled from "styled-components";

interface CountBlockTypes {
  mapMode: IDType;
}

interface CountCardTypes {
  name: string;
  state: any;
  activeCard: string;
  setActiveCard: React.Dispatch<React.SetStateAction<string>>;
  borderColor: string;
  accessor?: string;
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
      backgroundColor: props.active ? "#0177FA" : "white",
      border: props.active
        ? "2px solid #0177FA"
        : `2px solid ${props.borderColor}`,
      color: props.active ? "white" : "black",
    };
  }
);

const CountCard = ({ activeCard, name, state, setActiveCard, borderColor, accessor }: CountCardTypes) => {
  const active = name === activeCard;
  return (
    <>
      <CountCardWrapper
        onClick={() => setActiveCard(name)}
        active={active}
        borderColor={borderColor}
        className="col-5 col-md count-single-card p-0"
      >
        <div className=" d-flex flex-column h-100 p-3 justify-content-between">
          <h4 className="m-0 p-0">{state[accessor ? accessor : name]}</h4>
          <h6 className="mx-0 mb-0 p-0">{name}</h6>
        </div>
      </CountCardWrapper>
    </>
  );
};

const CountsBlockComponent = ({ mapMode }: CountBlockTypes) => {
  const [fetch, state] = useQuery(HomePageApi.countBlockEndPoint);
  const [activeCard, setActiveCard] = useState<string>("Startups");

  useEffect(() => {
    fetch();
  }, []);

  const resources = {
    activeCard,
    setActiveCard,
    state,
  };
  return (
    <div className="container-fluid count-block-styles px-0 mx-0">
      <div className="row mx-0 px-0">
        <h5>{mapMode.name}</h5>
      </div>
      <div className="row count-div">
        <CountCard {...resources} borderColor="#0177FA" accessor="Startup" name="Startups" />
        <CountCard {...resources} borderColor="#ED8E00" accessor="Mentor" name="Mentors" />
        <CountCard {...resources} borderColor="#7838e0" name="Incubator" />
        <CountCard {...resources} borderColor="#BDAA00" name="Investor" />
        <CountCard {...resources} borderColor="#CB3535" name="Accelerator" />
        <CountCard {...resources} borderColor="#00AD11" accessor="GovernmentBody" name="Government" />
      </div>
    </div>
  );
};

export default CountsBlockComponent;
