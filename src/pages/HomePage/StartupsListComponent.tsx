import { FaMapMarkerAlt } from "react-icons/fa";
import React, { useContext, useEffect } from "react";
import SearchBarComponent from "../../components/SearchBarComponent";
import { Badge } from "../../styles-components/Badge";
import "../../scss/HomePageStyles/startupsListComponent.scss";
import DisabledMap from "./Map/DisabledMap";
import styled from "styled-components";
import { ThemeContext } from "../../config/context";
import { useMutate } from "../../hooks/useMutate";
import UserDefault from "../../assets/user_default.jpg";

function EmptyStartUp() {
  return (
    <div className="container text-center p-5">
      <h1>Startup List is Empty</h1>
    </div>
  );
}

const StartUpCardContainer = styled.div`
  background: ${(props) => props.theme.bgCards};
  box-shadow: ${(props) => props.theme.shadowCards};
  border-radius: 4px;
  color: ${(props) => props.theme.color};
`;

const StartUpCardWrapper = styled.div`
  background: ${(props) => props.theme.bgStartupCard};
`;

function StartUpCard({
  _id,
  img_url,
  sectors,
  name: company,
  city,
  state,
  stages,
  form80IacStatus,
}: any) {
  return (
    <>
      <StartUpCardWrapper
        key={_id}
        className="mb-0 d-flex flex-row start-up-card"
        style={{ marginTop: "1.3rem" }}
      >
        <div>
          <img
            src={UserDefault}
            className="rounded-circle border w-60-h-60"
            alt="main-logo"
          />
        </div>
        <div
          className={`p-2 py-0  ms-0 row d-flex justify-content-left ${
            form80IacStatus ? "" : "pb-0"
          }`}
        >
          <h6 className=" my-0 py-0 company-title">
            {company.length > 35 ? company.slice(0, 35) + "..." : company}
          </h6>
          <div className="">
            <div className="stage-sector-div d-flex  flex-wrap">
              {stages ? (
                <Badge className="me-2-5 mt-2-5">Stage: {stages}</Badge>
              ) : (
                <></>
              )}
              {Array.isArray(sectors) ? (
                <Badge className="mt-2-5">
                  Sector: {Array.isArray(sectors) ? sectors[0] : ""}
                </Badge>
              ) : (
                <></>
              )}
            </div>
            {form80IacStatus ? (
              <div>
                <Badge className="mt-2">Tax Exempted</Badge>
              </div>
            ) : (
              <></>
            )}
          </div>
          <div
            className={`m-1 d-flex flex-row align-items-center ${
              form80IacStatus ? "mt-2-5" : "mt-0"
            }`}
          >
            <FaMapMarkerAlt size={13} style={{ marginTop: "-1.5px" }} />
            <h6 className="ms-1 my-0 py-0  start-up-location">
              {city + ", " + state}
            </h6>
          </div>
        </div>
      </StartUpCardWrapper>
    </>
  );
}

function StartupsListComponent(props: any) {
  const theme = useContext(ThemeContext);
  const [fetchTags, tagsState, tagsLoading] = useMutate("/startup/filter", []);

  const [screenWidth, setScreenWidth] = React.useState<number>(0);
  const extraSpacing: number = screenWidth - 1150;
  const windowResize = (event: any) => {
    const windowWidth: number = window.innerWidth;
    setScreenWidth(windowWidth);
  };
  
  React.useEffect(() => {
    if (screenWidth === 0) setScreenWidth(window.innerWidth);
    window.addEventListener("resize", windowResize, false);
  }, [screenWidth]);

  const startupList = tagsState.map((startUp: any) => (
    <StartUpCard {...startUp} />
  ));

  useEffect(() => {
    fetchTags(props.appliedFilters);
  }, [props.appliedFilters]);

  if (!tagsState.length) return <EmptyStartUp />;
  return (
    <div className="mb-5 startup-list-styles d-flex">
      <div
        style={{ minWidth: "0", maxWidth: "15%", width: extraSpacing + "px" }}
      />
      <StartUpCardContainer
        style={{ maxWidth: "55%", minWidth: "764px" }}
        className="startup-list-card-container p-4"
      >
        <h6 className="startup-heading p-0 m-0">STARTUPS</h6>
        <div style={{ marginTop: "1rem", marginBottom: "0.2rem" }}>
          <SearchBarComponent background={theme.searchBg} />
        </div>
        {/* {console.log(screenWidth)} */}
        <div className="d-flex flex-wrap justify-content-between">
          {startupList}
        </div>
      </StartUpCardContainer>
      <div
        style={{ minWidth: "0", width: "35%", marginTop: "6.5rem" }}
        className="ps-4"
      >
        <DisabledMap />
      </div>
    </div>
  );
}

export default StartupsListComponent;
