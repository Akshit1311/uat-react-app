import { GoSearch } from "react-icons/go";
import "../../../scss/HomePageStyles/dropDownListComponent.scss";
import { Button } from "../../../styles-components/Button";
import FadeLoader from "react-spinners/FadeLoader";
import { css } from "@emotion/react";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const DropDownListComponent = (props: any) => {
  let {
    data,
    accessor,
    handleClick,
    selectedItem,
    handleApplyClick,
    loading,
    handleClearClick,
    dropDownId,
  } = props;
  console.log("loading");
  const stateList = data.map((dataObj: any) => {
    return (
      <div
        onClick={() => handleClick(dataObj)}
        className={`list-card me-2 ${
          selectedItem === dataObj[accessor]
            ? "selected-list-card"
            : "unselected-list-card"
        }`}
      >
        <h5 className="m-0 p-0">{dataObj[accessor]}</h5>
      </div>
    );
  });
  const noData = Boolean(data.length === 0 && !loading)
  return (
    <div className="drop-down-list-component pe-0 me-0">
      <div className="state-search-bar me-3">
        <div className="d-flex">
          <span className="btn my-0 me-0 pe-0">
            <GoSearch />
          </span>
          <input
            type="text"
            className="ms-0 form-control me-3 border-0 shadow-none f-400"
            placeholder="Search"
          />
        </div>
      </div>

      <div className="state-container">
        <div className={`d-flex flex-column justify-content-center align-items-center ${noData && 'h-100'}`}>
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
        {data.length && !loading ? stateList : ""}
      </div>
      <div className="my-3 d-flex justify-content-between me-3">
        <Button
          border={"2px solid #000"}
          backgroundColor={"#fff"}
          color={"black"}
          boxShadow={"0px 0px 10px rgba(193, 193, 193, 0.25)"}
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
