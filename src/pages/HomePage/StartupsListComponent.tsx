import { FaMapMarkerAlt } from "react-icons/fa";
import React, { useContext, useEffect, useState } from "react";
import SearchBarComponent from "../../components/SearchBarComponent";
import { Badge } from "../../styles-components/Badge";
import "../../scss/HomePageStyles/startupsListComponent.scss";
import DisabledMap from "./Map/DisabledMap";
import styled from "styled-components";
import { ThemeContext } from "../../config/context";
import { useMutate } from "../../hooks/useMutate";
import UserDefault from "../../assets/user_default.jpg";
import MoonLoader from "react-spinners/MoonLoader";

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
  tagsLoading,
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
        {tagsLoading && (
          <div className="w-100 h-100 d-flex justify-content-center align-items-center">
            <MoonLoader color={"#0177FA"} loading={tagsLoading} size={"25"} />
          </div>
        )}
        {!tagsLoading && (
          <div className={`p-2 py-0  ms-0  ${form80IacStatus ? "" : "pb-0"}`}>
            <h6
              className=" my-0 py-0 company-title text-overflow"
              style={{ maxHeight: "45px !important", overflow: "hidden" }}
            >
              {company.length > 35 ? company.slice(0, 30).toUpperCase() + "..." : company}
            </h6>
            {form80IacStatus ||
            (stages && stages.length) ||
            (sectors && sectors.length) ? (
              <div className="">
                <div className="stage-sector-div ">
                  {/* {stages ? (
                    <Badge className="me-2-5 mt-2-5 d-flex">
                      <div>Stage:</div>
                      <div className="d-flex flex-wrap ms-2">
                        {stages.map((item: string) => (
                          <div className="me-1">
                            {item}
                            {", "}
                          </div>
                        ))}
                      </div>
                    </Badge>
                  ) : (
                    <></>
                  )} */}
                  <div className="d-flex mt-1 align-items-center flex-wrap">
                    <p className="font-Mont font-600 font-14px m-0 p-0 ">
                      Stage:
                    </p>
                    {Array.isArray(sectors) ? (
                      <>
                        {stages.slice(0, 6).map((item: string) => (
                          <Badge className="mx-1 my-1 pb-0 mb-0 d-flex m-1">
                            <div className="d-flex flex-wrap">{item}</div>
                          </Badge>
                        ))}
                        {stages.length > 5 ? (
                          <Badge className="mx-1 my-1 pb-0 mb-0 d-flex m-1">
                            <div>...</div>
                          </Badge>
                        ) : (
                          <></>
                        )}
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className="d-flex mt-2 align-items-center flex-wrap">
                    <p className="font-Mont font-600 font-14px m-0 p-0 ">
                      Sector:
                    </p>
                    {Array.isArray(sectors) ? (
                      <>
                        {sectors.slice(0, 5).map((item: string) => (
                          <Badge className="mx-1 my-1 pb-0 mb-0 d-flex m-1">
                            <div className="d-flex flex-wrap">{item}</div>
                          </Badge>
                        ))}
                        {sectors.length > 5 ? (
                          <Badge className="mx-1 my-1 pb-0 mb-0 d-flex m-1 px-3">
                            <div className="d-flex flex-wrap">{'...'}</div>
                          </Badge>
                        ) : (
                          <></>
                        )}
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
                {form80IacStatus ? (
                  <div>
                    <Badge className="mt-2">Tax Exempted</Badge>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            ) : (
              <></>
            )}
            <div
              className={`m-1 d-flex flex-row align-items-center ${
                form80IacStatus ? "mt-2-5" : "mt-2"
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
        style={{ maxWidth: "65%", minWidth: "65%", marginLeft: "1.5%" }}
        className={`startup-list-card-container p-4 position-relative ${
          renderedData.length !== tagsState.length ? "pb-0" : ""
        }`}
      >
        <h6 className="startup-heading p-0 m-0">STARTUPS</h6>
        <div style={{ marginTop: "1rem", marginBottom: "0.2rem" }}>
          <SearchBarComponent
            background={theme.searchBg}
            handleApply={handleApply}
            value={queryString}
            onChange={onSearch}
          />
        </div>
        <div className="d-flex flex-wrap justify-content-between">
          {startupList}
        </div>
        <div
          style={{
            display: renderedData.length !== tagsState.length ? "flex" : "none",
          }}
          className="my-4 data-table-view-more-button"
          onClick={handleViewMore}
        >
          View More
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
        <DisabledMap />
      </div>
    </div>
  );
}

export default React.memo(StartupsListComponent);
