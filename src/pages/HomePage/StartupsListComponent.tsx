import { FaMapMarkerAlt } from "react-icons/fa";
import React, { useContext, useEffect, useState } from "react";
import SearchBarComponent from "../../components/SearchBarComponent";
import { Badge } from "../../styles-components/Badge";
import "../../scss/HomePageStyles/startupsListComponent.scss";
import DisabledMap from "./Map/DisabledMap";
import styled from "styled-components";
import { ThemeContext } from "../../config/context";
import { useMutate } from "../../hooks/useMutate";
import UserDefault from "../../assets/unknown.png";
import MoonLoader from "react-spinners/MoonLoader";
import { States } from "./Map/states";

const StartUpCardContainer = styled.div`
  background: ${(props) => props.theme.bgCards};
  box-shadow: ${(props) => props.theme.shadowCards};
  border-radius: 4px;
  color: ${(props) => props.theme.color};
  height: fit-content;
  max-width: 65%;
  min-width: 65%;
  margin-left: 1.5%;
`;

const StartUpCardWrapper = styled.div`
  background: ${(props) => props.theme.bgStartupCard};
`;

function StartUpCard({
  _id,

  sectors,
  name: company,
  city,
  state,
  stages,
  form80IacStatus,
  tagsLoading,
  logo,
}: any) {
  function htmlDecode(input: any) {
    var doc = new DOMParser().parseFromString(input, "text/html");
    return doc.documentElement.textContent;
  }

  const [capitalizeText, setCapitalizeText] = useState<string>("");
  const redirect = () => {
    // window.location.href =
    //   "https://www.startupindia.gov.in/content/sih/en/profile.Startup.61c03e7ae4b041b4edd317ce.html";
  };

  const tagsLoader = tagsLoading && (
    <div className="w-100 h-100 d-flex justify-content-center align-items-center">
      <MoonLoader color={"#0177FA"} loading={tagsLoading} size={"25"} />
    </div>
  );

  const stagesBadge =
    Array.isArray(stages) && States.length > 0 ? (
      <div className="d-flex mt-1">
        <p className="font-Mont font-600 font-14px m-0 p-0 ">Stage:</p>
        <div className="d-flex align-items-center flex-wrap" style={{ marginLeft: '0.75rem' }}>
          {stages.slice(0, 6).map((item: string) => (
            <Badge className="pb-0 d-flex m-1 me-0 mt-0">
              <div className="d-flex flex-wrap">{item}</div>
            </Badge>
          ))}
        </div>
      </div>
    ) : (
      <></>
    );

  const sectorBadge =
    Array.isArray(sectors) && sectors.length ? (
      <div
        className="d-flex mt-2"
        style={{ maxHeight: "50px", overflow: "hidden" }}
      >
        <p className="font-Mont font-600 font-14px m-0 p-0 ">Sector:</p>
        <div className="d-flex flex-wrap ms-2">
          {sectors.slice(0, 5).map((item: string) => (
            <Badge
              className="pb-0 d-flex m-1 me-0 mt-0"
              style={{ width: "fit-content" }}
            >
              <div className="d-flex flex-wrap">{item}</div>
            </Badge>
          ))}
          {sectors.length > 5 ? (
            <Badge className="pb-0 d-flex m-1 me-0 mt-0 px-3">
              <div className="d-flex flex-wrap">{"..."}</div>
            </Badge>
          ) : (
            <></>
          )}
        </div>
      </div>
    ) : (
      <></>
    );

  const taxExempted = form80IacStatus ? (
    <div>
      <Badge className="mt-2">Tax Exempted</Badge>
    </div>
  ) : (
    <></>
  );
  const decodedText: string | null =
    company.length > 35
      ? htmlDecode(company.slice(0, 30))
      : htmlDecode(company);

  function textCapitalise(decodedText: string | null): string {
    if (decodedText) {
      const split: any[] = decodedText.split(" ");
      let text: string = "";
      split.forEach((title: string, index: number) => {
        if (index == 0) {
          const capitalLetter = title.charAt(0).toUpperCase();
          text = capitalLetter + title.slice(1, title.length).toLowerCase();
          console.log("Capitabl Letter", text);
        } else {
          const capitalLetter = title.charAt(0).toUpperCase();
          text =
            text +
            " " +
            capitalLetter +
            title.slice(1, title.length).toLowerCase();
          console.log("Small Letter", text);
        }
        console.log("Normal Text", text);
      });
      return text;
    } else return "";
  }
  return (
    <>
      <StartUpCardWrapper
        onClick={redirect}
        key={_id}
        className="mb-0 d-flex flex-row start-up-card flex-column"
        style={{ marginTop: "1.3rem" }}
      >
        <div className="d-flex align-items-center">
          <img
            src={logo ? logo : UserDefault}
            className="rounded-circle border w-60-h-60 bg-white "
            alt="main-logo"
          />
          <h6
            className=" my-0 py-0 company-title text-overflow ms-3"
            id="company"
          >
            {textCapitalise(decodedText)}
          </h6>
        </div>
        {tagsLoader}
        {!tagsLoading && (
          <div
            className={`p-2 px-0 py-0 d-flex flex-column justify-content-end ms-0 ${form80IacStatus ? "" : "pb-0"}`}
          >
            {form80IacStatus ||
            (stages && stages.length) ||
            (sectors && sectors.length) ? (
              <div className="">
                <div className="stage-sector-div pb-0 mb-0 ">
                  {stagesBadge}
                  {sectorBadge}
                </div>
                {taxExempted}
              </div>
            ) : (
              <></>
            )}
            <div
              className={`m-1 d-flex flex-row align-items-center ${
                form80IacStatus ? "mt-2-5" : "mt-1"
              }`} 
            >
              <FaMapMarkerAlt size={13} style={{ marginTop: "-1.5px" }} />
              <h6 className="ms-1 my-0 py-0  start-up-location w-100">
                {city + ", " + state}
              </h6>
            </div>
          </div>
        )}
      </StartUpCardWrapper>
    </>
  );
}

function StartupsListComponent(props: any) {
  const theme = useContext(ThemeContext);
  const [fetchTags, tagsState, tagsLoading] = useMutate("/startup/filter", []);
  const [renderedData, setRenderedData] = useState<any[]>([]);

  const [queryString, setQueryString] = useState<string>("");

  const startupList = React.useMemo(() => {
    return renderedData.map((startUp: any) => (
      <StartUpCard {...startUp} tagsLoading={tagsLoading} />
    ));
  }, [renderedData]);

  const handleViewMore = () => {
    setRenderedData(tagsState);
  };

  const onSearch = (changeEvent: any) => {
    const value = changeEvent.target.value;
    console.log(value);
    setQueryString(value);
  };

  const handleApply = () => {
    const filteredList = tagsState.filter((item: any) =>
      item.name.toLowerCase().includes(queryString.toLowerCase())
    );
    setRenderedData(filteredList);
  };

  useEffect(() => {
    setRenderedData(tagsState.slice(0, 6));
  }, [tagsState]);

  useEffect(() => {
    fetchTags(props.appliedFilters);
  }, [props.appliedFilters]);

  return (
    <div className="mb-5  startup-list-styles d-flex">
      {/* <div style={{ minWidth: "19.66%" }} /> */}
      <StartUpCardContainer
        className={`startup-list-card-container p-4 position-relative ${
          renderedData.length !== tagsState.length ? "pb-0" : ""
        }`}
      >
        <h6 className="startup-heading p-0 m-0 text-uppercase">
          {props.selectedCountBlock}
        </h6>
        <div style={{ marginTop: "1rem", marginBottom: "0.2rem" }}>
          <SearchBarComponent
            background={theme.searchBg}
            handleApply={handleApply}
            value={queryString}
            onChange={onSearch}
          />
        </div>
        <div className="d-flex flex-wrap justify-content-between h-100">
          {!tagsLoading && !tagsState.length ? (
            <div className="d-flex justify-content-center w-100">
              <p
                className="font-Mont text-grey"
                style={{ fontSize: "14px", fontFamily: "Poppins" }}
              >
                No Data Available
              </p>
            </div>
          ) : (
            <>{startupList}</>
          )}
          {/* {startupList} */}
        </div>
        <div
          style={{
            display: renderedData.length !== tagsState.length ? "flex" : "none",
          }}
          className="my-4 data-table-view-more-button text-theme"
          onClick={handleViewMore}
        >
          {queryString.length > 0 ? "View All" : "View More"}
        </div>
        {tagsLoading && (
          <div className="w-100 h-100 d-flex justify-content-center align-items-center position-absolute">
            <MoonLoader color={"#0177FA"} loading={tagsLoading} size={"25"} />
          </div>
        )}
      </StartUpCardContainer>
      <div
        style={{ minWidth: "0", width: "35%", marginTop: "6.5rem" }}
        className="ps-4"
      >
        <DisabledMap mapViewResource={props.mapViewResource} />
      </div>
    </div>
  );
}

export default React.memo(StartupsListComponent);
