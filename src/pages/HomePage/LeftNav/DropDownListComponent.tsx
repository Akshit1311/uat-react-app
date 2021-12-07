import { GoSearch } from "react-icons/go";
import "../../../scss/HomePageStyles/dropDownListComponent.scss";
import { Button } from "../../../styles-components/Button";
import FadeLoader from "react-spinners/FadeLoader";
import { css } from "@emotion/react";
import { useEffect, useState } from "react";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const DropDownListComponent = (props: any) => {
  let {
    originalData,
    accessor,
    handleClick,
    selectedItem,
    handleApplyClick,
    loading,
    handleClearClick,
    dropDownId,
    noSort,
  } = props;

  const [data, setData] = useState<any>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const findSelectedState = (dataObj: any) =>
    selectedItem.find((item: any) => item.id === dataObj.id);

  const list: any[] = data.map((dataObj: any) => {
    return (
      <div
        onClick={() => handleClick(dataObj)}
        className={`list-card me-2 ${
          findSelectedState(dataObj)
            ? "selected-list-card"
            : "unselected-list-card"
        }`}
      >
        {console.log("SelectedItem", dataObj)}
        <h5 className="m-0 p-0">{dataObj["value"]}</h5>
      </div>
    );
  });

  const noData: boolean = Boolean(data.length === 0 && !loading);

  const onSearch = (changeEvent: any) => {
    const changedValue: string = changeEvent.target.value;
    setSearchQuery(changedValue);
    const filteredList: any[] = originalData.filter((item: any) =>
      item["value"].toLowerCase().includes(changedValue.toLowerCase())
    );
    setData(filteredList);
  };

  useEffect(() => {
    console.log("Original Data", originalData)
    const sort = originalData.sort((a: any, b: any) => a.value.localeCompare(b.value));
    setData(sort)
  }, [originalData.length,loading]);
  return (
    <div className="drop-down-list-component">
      <div className="state-search-bar me-3">
        <div className="d-flex">
          <span className="btn my-0 me-0 pe-0">
            <GoSearch />
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={onSearch}
            className="ms-0 form-control me-3 border-0 shadow-none f-400"
            placeholder="Search"
          />
        </div>
      </div>

      <div className="state-container">
        <div
          className={`d-flex flex-column justify-content-center align-items-center ${
            noData && "h-100"
          }`}
        >
          <FadeLoader
            color={"#0177FA"}
            loading={loading}
            radius={"2px"}
            css={override}
          />
          {noData ? (
            <p
              className="p-0 m-0"
              style={{ fontSize: "14px", fontFamily: "Poppins" }}
            >
              No Data Found
            </p>
          ) : (
            ""
          )}
        </div>
        {list}
        {/* {data.length && !loading ?  : ""} */}
      </div>
      <div className="my-3 d-flex justify-content-between me-3">
        <Button
          border={"2px solid #000"}
          backgroundColor={"#fff"}
          color={"black"}
          noBorder={true}
          onClick={handleClearClick}
        >
          Clear
        </Button>
        <Button
          data-bs-toggle="collapse"
          data-bs-target={dropDownId.toString()}
          marginLeft={"12px"}
          onClick={handleApplyClick}
        >
          Apply
        </Button>
      </div>
    </div>
  );
};

export default DropDownListComponent;
