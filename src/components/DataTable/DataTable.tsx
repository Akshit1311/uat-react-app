import React, { useContext, useEffect, useState } from "react";
import Header from "./Header";
import Body from "./Body";
import SearchBarComponent from "./Search";
import { ThemeContext } from "../../config/context";
import "../../scss/HomePageStyles/homePage.scss";

export default function DataTable(props: any) {
  const { headerConfig, bodyData, bodyConfig, noOfItemsToRender, loop } = props;
  const [originalData, setOriginalData] = useState<any[]>([]);
  const [renderedData, setRenderedData] = useState<any>([]);

  const [noOfItemsRender, setNoOfItemRender] = useState<number>(6);

  const [searchQuery, setSearchQuery] = useState<string>("");

  const theme = useContext(ThemeContext);
   
  const calculate = () => {
    const newObj: any = new Object();
    loop.forEach((item: string) => {
      let sum = 0;
      originalData.forEach((dataValue: any) => {
        sum += Number(dataValue.stateStatistics[item]);
      });
      newObj[item] = sum;
    });
    const clone = [...originalData];
    clone.push({
      id: "Some other",
      isUnionTerritory: false,
      name: "Total",
      text: "Total",
      stateStatistics: newObj,
    });
    return clone
  };

  const memorisedValue = React.useMemo(() => {
    return calculate();
  }, [originalData]);

  const onSearch = (query: string) => {
    const value = query;
    const list = memorisedValue.filter((item) =>
      item.text.toLowerCase().includes(value.toLowerCase())
    );
    setSearchQuery(value);
    setRenderedData(list.slice(0, noOfItemsRender));
  };

 

  const handleViewMore = () => {
    const calculated = noOfItemsRender + 8;

    if (calculated > memorisedValue.length) {
      setNoOfItemRender(memorisedValue.length);
      setRenderedData(memorisedValue);
      return;
    }

    setNoOfItemRender(calculated);
    setRenderedData(memorisedValue.slice(0, calculated));
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
      <div style={{ minWidth: "1.3%" }} />
      <div className="w-100 data-table p-0 m-0">
        <table className="w-100 ">
          <Header headerConfig={headerConfig} />
          <div className="mt-3 mb-2" style={{ maxWidth: "21rem" }}>
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
        {
          <div
            style={{
              visibility:
                renderedData.length !== memorisedValue.length
                  ? "visible"
                  : "hidden",
            }}
            className="my-4 data-table-view-more-button"
            onClick={handleViewMore}
          >
            View More
          </div>
        }
      </div>
      <div style={{ minWidth: "1%" }} />
    </div>
  );
}
