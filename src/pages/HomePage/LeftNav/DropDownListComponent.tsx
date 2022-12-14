import { css } from "@emotion/react";
import React, { useContext, useEffect, useState } from "react";
import { GoSearch } from "react-icons/go";
import MoonLoader from "react-spinners/MoonLoader";
import styled from "styled-components";
import { ThemeContext } from "../../../config/context";
import { ThemeColorIdentifier } from "../../../helper-function/themeColor";
import "../../../scss/HomePageStyles/dropDownListComponent.scss";
import { Button } from "../../../styles-components/Button";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const SearchWrapper = styled.div`
  background: ${(props) => props.theme.dropDown.searchBackground} !important;
  border: 1px solid ${(props) => props.theme.dropDown.searchBorder} !important;
  color: ${(props) => props.theme.color} !important;
`;
const Input = styled.input`
  background: ${(props) => props.theme.dropDown.searchBackground} !important;
  color: ${(props) => props.theme.color} !important;
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
    colorTheme,
  } = props;

  const theme = useContext(ThemeContext);

  const [data, setData] = useState<any>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [tempSelectedItem, setTempSelectedItem] = useState<number>(-1);

  const findSelectedState = (dataObj: any) =>
    selectedItem.find((item: any) => item.id === dataObj.id);

  const bgUnSelected = () => {
    if (theme.theme === "dark") return "unselected-list-card-dark";
    if (theme.theme === "light") return "unselected-list-card-light";
  };

  const list: any[] = data.map((dataObj: any, index:number) => {
    return (
      <div
        key={dataObj.id}
        onClick={() => handleClick(dataObj)}
        id={dataObj.id}
        className={`list-card me-2 ${
          findSelectedState(dataObj) ? "selected-list-card" : bgUnSelected()
        } ${tempSelectedItem === index ? "list-card-color" : ""}`}
      >
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
    if (noSort) {
      setData(originalData);
    } else {
      const sort = originalData.sort((a: any, b: any) =>
        a.value.localeCompare(b.value)
      );
      setData(sort);
    }
  }, [originalData.length, loading]);

  const onKeyUp = (e: any) => {
    const keyCode = e.keyCode;

    if (keyCode === 40) {

      setTempSelectedItem((prev) => {
        document
          .getElementById(data[prev === data.length - 1 ? 0 : prev + 1]?.id)
          ?.scrollIntoView({ behavior: "smooth" });
        return prev === data.length - 1 ? 0 : prev + 1;
      });
    }
    if (keyCode === 38) {
      setTempSelectedItem((prev) => {
        document
        .getElementById(data[prev === 0 ? data.length - 1 : prev - 1]?.id)
        ?.scrollIntoView({ behavior: "smooth" });
        return (prev === 0 ? data.length - 1 : prev - 1)
      }
      
      );
    }
    if (keyCode === 13) {
      handleClick(data[tempSelectedItem]);
    }
  };

  return (
    <div className="drop-down-list-component">
      <SearchWrapper
        className={`state-search-bar me-3`}
        style={{ marginTop: "6px" }}
      >
        <div className="d-flex">
          <span className="btn my-0 me-0 pe-0" style={{ color: theme.color }}>
            <GoSearch />
          </span>
          <Input
            type="text"
            value={searchQuery}
            onChange={onSearch}
            onKeyUp={onKeyUp}
            className={`ms-0 form-control me-3 border-0 shadow-none f-400 font-Mont`}
            placeholder="Search"
          />
        </div>
      </SearchWrapper>

      <div className="state-container">
        {loading ? (
          <div className="w-100 h-100 d-flex justify-content-center align-items-center">
            <MoonLoader
              color={"#0177FA"}
              loading={loading}
              size={"25px"}
              css={override}
            />
          </div>
        ) : (
          <></>
        )}

        <div
          className={`d-flex flex-column justify-content-center align-items-center ${
            noData && "h-100"
          }`}
        >
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
      <div className="my-3 mt-2 d-flex justify-content-between me-3">
        <Button
          colorTheme={colorTheme}
          border={`2px solid ${theme.dropDown.cancelBorder}`}
          backgroundColor={theme.dropDown.cancel}
          color={theme.dropDown.cancelColor}
          noBorder={true}
          onClick={handleClearClick}
        >
          Clear
        </Button>
        <Button
          colorTheme={colorTheme}
          data-bs-toggle="collapse"
          data-bs-target={dropDownId.toString()}
          marginLeft={"12px"}
          backgroundColor={ThemeColorIdentifier(colorTheme)}
          onClick={handleApplyClick}
        >
          Apply
        </Button>
      </div>
    </div>
  );
};

export default React.memo(DropDownListComponent);
