import React, { useContext, useEffect, useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import MoonLoader from "react-spinners/MoonLoader";
import styled from "styled-components";
import UserDefault from "../../assets/unknown.png";
import SearchBarComponent from "../../components/SearchBarComponent";
import { ThemeContext } from "../../config/context";
import { ThemeColorIdentifier } from "../../helper-function/themeColor";
import { useMutate } from "../../hooks/useMutate";
import { useWindowSize } from "../../hooks/useWindowSize";
import "../../scss/HomePageStyles/startupsListComponent.scss";
import { Badge } from "../../styles-components/Badge";
import DisabledMap from "./Map/DisabledMap";
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
  @media (max-width: 768px) {
    width: 100%;
    max-width: 100%;
    margin-left: 0%;
  }
`;

const StartUpCardWrapper = styled.div`
  background: ${(props) => props.theme.bgStartupCard};
`;

function StartUpCard({
  _id,
  index,
  sectors,
  name: company,
  city,
  state,
  stages,
  form80IacStatus,
  tagsLoading,
  logo,
  colorTheme,
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
      <MoonLoader
        color={ThemeColorIdentifier(colorTheme)}
        loading={tagsLoading}
        size={"25px"}
      />
    </div>
  );

  const stagesBadge =
    Array.isArray(stages) && States.length > 0 ? (
      <div key={index} className="d-flex" style={{ marginTop: "9px" }}>
        <p className="font-Mont font-600 font-14px m-0 p-0 ">Stage:</p>
        <div
          className="d-flex align-items-center flex-wrap"
          style={{ marginLeft: "0.75rem" }}
        >
          {stages.slice(0, 6).map((item: string, index: number) => (
            <Badge className="pb-0 d-flex mb-2 me-2 mt-0 ms-0" key={index}>
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
        className="d-flex"
        style={{ maxHeight: "53px", overflow: "hidden", marginTop: "7px" }}
      >
        <p className="font-Mont font-600 font-14px m-0 p-0 ">Sector:</p>
        <div className="d-flex flex-wrap ms-2">
          {sectors.slice(0, 5).map((item: string, index: number) => (
            <Badge
              key={index}
              className="pb-0 d-flex mb-2 me-2 mt-0 ms-0"
              style={{ width: "fit-content" }}
            >
              <div className="d-flex flex-wrap">{item}</div>
            </Badge>
          ))}
          {sectors.length > 5 ? (
            <Badge className="pb-0 d-flex mb-2 me-2 mt-0 ms-0 px-3">
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
    <div style={{ marginTop: "17px" }}>
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
        } else {
          const capitalLetter = title.charAt(0).toUpperCase();
          text =
            text +
            " " +
            capitalLetter +
            title.slice(1, title.length).toLowerCase();
        }
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
            className=" my-0 py-0 company-title text-overflow ms-2"
            id="company"
          >
            {textCapitalise(decodedText)}
          </h6>
        </div>
        {tagsLoader}
        {!tagsLoading && (
          <div
            className={`p-2 px-0 py-0 d-flex flex-column justify-content-between h-100 ms-0 ${
              form80IacStatus ? "" : "pb-0"
            }`}
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
            <div className={`m-1 d-flex flex-row align-items-center mt-6`}>
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
  const [windowWidth, windowHeight] = useWindowSize();
  const BASE_URL = process.env.REACT_APP_BACKEND_ENDPOINT;
  const [page, setPage] = useState<number>(0);

  const [fetchTags, tagsState, tagsLoading] = useMutate(
    `${BASE_URL}/startup/filter`,
    []
  );  

  const [renderedData, setRenderedData] = useState<any[]>([]);
  const [isDataRemaining, setRemaining] = useState<boolean>(true);  
  const [queryString, setQueryString] = useState<string>("");

  const startupList = React.useMemo(() => {
    return renderedData.map((startUp: any, index: number) => (
      <StartUpCard
        {...startUp}
        index={index}
        tagsLoading={tagsLoading}
        colorTheme={props.colorTheme}
      />
    ));
  }, [renderedData]);

  const handleViewMore = async () => {
    let num = page+1;
    setPage(num);  
    fetchTags({...props.appliedFilters, page});   
    
  };

  const handleViewLess = async () => {
    let num = page-1;
    setPage(num);  
    fetchTags({...props.appliedFilters, page});   
    
  };

  const onSearch = (changeEvent: any) => {
    const value = changeEvent.target.value;
    setQueryString(value);
  };
 
  const handleApply = () => {
    const filteredList = tagsState.filter((item: any) =>
      item.name.toLowerCase().includes(queryString.toLowerCase())
    );
    setRenderedData(filteredList);
  };

  useEffect(() => {    
    if(tagsState.length > 0){
      setRenderedData(tagsState.slice(0, 9)); 
      setRemaining(true)     
    } else{
      setRemaining(false)
    }  
  }, [tagsState]);

  useEffect(() => {
    fetchTags(props.appliedFilters);
  }, [props.appliedFilters]);

  return (
    <div className="mb-5 startup-list-styles d-flex mx-0 w-100 h-100">
      <StartUpCardContainer
        className={`startup-list-card-container p-4 position-relative mx-0 ${
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
        <div className="d-flex flex-wrap flex-column flex-sm-row justify-content-between " style={{height:'50vh',overflowY:'scroll', alignItems: 'start'}}>
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
        <div className="d-flex flex-wrap flex-column flex-sm-row justify-content-between align-items-center">
        <div
          style={{
            display: page > 0 ? "flex" : "none",
          }}
          className="my-4 data-table-view-more-button text-theme"
          onClick={handleViewLess}
        >
          {"View Less"}
        </div>
       
        <div
          style={{
            display: isDataRemaining ? "flex" : "none",
          }}
          className="my-4 data-table-view-more-button text-theme"
          onClick={handleViewMore}
        >         
          {queryString.length > 0 ? "View All" : tagsState.length < 9 ? "" :"View More"}
        </div>
        </div>
        {tagsLoading && (
          <div className="w-100 h-100 d-flex justify-content-center align-items-center position-absolute">
            <MoonLoader color={"#0177FA"} loading={tagsLoading} size={"25px"} />
          </div>
        )}
      </StartUpCardContainer>
      <div className="ps-4 disabled-map" style={{height:'64vh'}}>
        <DisabledMap
          startupType={props.startupType}
          mapViewResource={props.mapViewResource}
          countResource={props.countResource}
        />
      </div>
    </div>
  );
}

export default React.memo(StartupsListComponent);
