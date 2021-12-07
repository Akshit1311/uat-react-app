import React, { useContext, useEffect, useState } from "react";
import Header from "./Header";
import Body from "./Body";
import SearchBarComponent from "./Search";
import { ThemeContext } from "../../config/context";
import "../../scss/HomePageStyles/homePage.scss";

export default function DataTable(props: any) {
  const { headerConfig, bodyData, bodyConfig, noOfItemsToRender } = props;
  const [originalData, setOriginalData] = useState<any[]>([]);
  const [renderedData, setRenderedData] = useState<any>([]);

  const [noOfItemsRender, setNoOfItemRender] = useState<number>(4);

  const [searchQuery, setSearchQuery] = useState<string>("");

  const theme = useContext(ThemeContext);

  const onSearch = (changeEvent: any) => {
    const value = changeEvent.target.value;
    const list = originalData.filter((item) =>
      item.text.toLowerCase().includes(value.toLowerCase())
    );
    setSearchQuery(value);
    setRenderedData(list.slice(0, noOfItemsRender));
  };

  const handleViewMore = () => {
    const calculated = noOfItemsRender + 8;

    if (calculated > originalData.length) {
      setNoOfItemRender(originalData.length);
      setRenderedData(originalData);
      return;
    }

    setNoOfItemRender(calculated);
    setRenderedData(originalData.slice(0, calculated));
  };

  useEffect(() => {
    setOriginalData(bodyData);
    setRenderedData(bodyData.slice(0, noOfItemsRender));
    if (noOfItemsToRender) {
      setNoOfItemRender(noOfItemsToRender);
    }
  }, [bodyData]);

  return (
    <div className="d-flex">
      <div className="w-20" />
      <div className="w-100 data-table p-0 m-0">
        <table className="w-100">
          <Header headerConfig={headerConfig} />
          <div className="mt-3 mb-2" style={{ maxWidth: "22rem" }}>
            <SearchBarComponent
              background={theme.dataTable.searchBg}
              borderRadius="4px"
              onChange={onSearch}
              value={searchQuery}
              placeholderClass={`search-bar-placeholder-data-table ${theme.dataTable.inputClass}`}
              inputClass={`${theme.dataTable.searchBorderClass} radius-5 me-3`}
            />
          </div>
          <Body renderedData={renderedData} bodyConfig={bodyConfig} />
        </table>
        {renderedData.length !== originalData.length && (
          <div
            className="my-4 data-table-view-more-button"
            onClick={handleViewMore}
          >
            View More
          </div>
        )}
      </div>
    </div>
  );
}
