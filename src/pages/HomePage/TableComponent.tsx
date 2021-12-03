import React, { useContext } from "react";
import SearchBarComponent from "../../components/SearchDataTable";
import styled from "styled-components";
import { ThemeContext } from "../../config/context";

interface HeaderType {
  children: React.ReactNode;
  borderWidth?: string;
  borderColor?: string;
  borderStyle?: string;
  borderRight?: boolean;
  borderLeft?: boolean;
  background?: string;
  borderHeight?: string;
  fontWeight?: boolean;
}

const TH = styled.th`
  background: ${(props) => props.theme.bgCards};
  color: ${(props) => props.theme.colorCards};
`;
const TR = styled.tr`
  background: ${(props) => props.theme.bgCards};
  color: ${(props) => props.theme.colorCards};
  overflow: hidden;
  background: black !important;
`;

const Header = ({
  children,
  borderWidth,
  borderStyle,
  borderColor,
  background,
  borderHeight,
  fontWeight,
}: HeaderType) => {
  const theme = useContext(ThemeContext);
  const borderWidthA = borderWidth ? borderWidth : "0.1rem";
  const borderStyleA = borderStyle ? borderStyle : "solid";
  const borderColorA = borderColor ? borderColor : theme.dataTable.dashedBorder;
  const borderLeftA = `${borderWidthA} ${borderStyleA} ${borderColorA}`;
  return (
    <TH
      className="header-cell"
      style={{
        fontWeight: fontWeight ? 700 : 400,
      }}
    >
      <div className="d-flex">
        <div
          style={{
            height: borderHeight ? borderHeight : "63px",
            borderLeft: borderLeftA,
          }}
        />
        <p
          className="my-0 p-0 d-flex align-items-center"
          style={{
            maxWidth: "70px",
            marginLeft: "0.8rem",
          }}
        >
          {children}
        </p>
      </div>
    </TH>
  );
};

export default function DataTable(props: any) {
  const theme = useContext(ThemeContext);
  return (
    <>
      <div className="d-flex">
        <div style={{ width: "20%" }} />
        <div className="w-100 data-table p-0 m-0">
          <table className="w-100">
            <thead className="w-100 py-5 ">
              <TR
                className={`d-flex flex-row justify-content-between ${theme.dataTable.headerBorder}`}
                style={{ background: "red" }}
              >
                <Header fontWeight={true} borderLeft={true} borderWidth={"0px"}>
                  States
                </Header>
                <Header
                  fontWeight={true}
                  background="white"
                  borderStyle={"solid"}
                  borderColor={'#8A8A8A'}
                >
                  {"Total"}
                  <br />
                  Startups
                </Header>
                <Header fontWeight={true} borderStyle={"dashed"} borderColor={theme.dataTable.dashedBorder}>
                  FFS
                </Header>
                <Header fontWeight={true} borderStyle={"dashed"} borderColor={theme.dataTable.dashedBorder}>
                  Patient Startups
                </Header>
                <Header fontWeight={true} borderStyle={"dashed"} borderColor={theme.dataTable.dashedBorder}>
                  Seed Fund Startups
                </Header>
                <Header fontWeight={true} borderStyle={"dashed"} borderColor={theme.dataTable.dashedBorder}>
                  Showcased Startups
                </Header>
                <Header fontWeight={true} borderStyle={"dashed"} borderColor={theme.dataTable.dashedBorder}>
                  DDIIT Recognised Startups
                </Header>
                <Header fontWeight={true} borderStyle={"dashed"} borderColor={theme.dataTable.dashedBorder}>
                  Women Owned Startups
                </Header>
                {/* <Header
              fontWeight={true}
              borderColor={"#8a8a8a"}
              borderStyle={"solid"}
            >
              Mentors
            </Header>
            <Header
              fontWeight={true}
              borderColor={"lightgrey"}
              borderStyle={"solid"}
            >
              Incubators
            </Header>
            <Header
              fontWeight={true}
              borderColor={"lightgrey"}
              borderStyle={"solid"}
            >
              Investors
            </Header>
            <Header
              fontWeight={true}
              borderColor={"lightgrey"}
              borderStyle={"solid"}
            >
              Accelerators
            </Header>
            <Header
              borderColor={"lightgrey"}
              borderStyle={"solid"}
              borderRight={true}
              fontWeight={true}
            >
              Government */}
                {/* </Header> */}
              </TR>
            </thead>
            <div className="mt-3 mb-2" style={{ maxWidth: "22rem" }}>
              <SearchBarComponent
                background={theme.dataTable.searchBg}
                borderRadius="4px"
                placeholderClass={`search-bar-placeholder-data-table ${theme.dataTable.inputClass}`}
                inputClass={`${theme.dataTable.searchBorderClass} radius-5 me-3`}
              />
            </div>
            <tbody>
              <tr
                className={`d-flex bg-white mt-2 flex-row justify-content-between radius-5 ${theme.dataTable.bodyClass}`}
              >
                <Header
                  fontWeight={true}
                  borderHeight="50px"
                  borderLeft={true}
                  borderWidth={"0px"}
                >
                  Maharashtra
                </Header>
                <Header
                  borderHeight="50px"
                  borderColor={"lightgrey"}
                  borderStyle={"solid"}
                >
                  12000
                </Header>
                <Header borderHeight="50px" borderStyle={"dashed"}>
                  12000
                </Header>
                <Header borderHeight="50px" borderStyle={"dashed"}>
                  12000
                </Header>
                <Header borderHeight="50px" borderStyle={"dashed"}>
                  12000
                </Header>
                <Header borderHeight="50px" borderStyle={"dashed"}>
                  12000
                </Header>
                <Header borderHeight="50px" borderStyle={"dashed"}>
                  12000
                </Header>
                <Header borderHeight="50px" borderStyle={"dashed"}>
                  12000
                </Header>
                {/* <Header
              borderHeight="50px"
              borderColor={"#8a8a8a"}
              borderStyle={"solid"}
            >
              12000
            </Header>
            <Header
              borderHeight="50px"
              borderColor={"lightgrey"}
              borderStyle={"solid"}
            >
              12000
            </Header> */}
                {/* <Header
              borderHeight="50px"
              borderColor={"lightgrey"}
              borderStyle={"solid"}
            >
              12000
            </Header>
            <Header
              borderHeight="50px"
              borderColor={"lightgrey"}
              borderStyle={"solid"}
            >
              12000
            </Header>
            <Header
              borderHeight="50px"
              borderColor={"lightgrey"}
              borderStyle={"solid"}
            >
              12000
            </Header> */}
              </tr>
              <tr
                className={`d-flex bg-white mt-2 flex-row justify-content-between radius-5 ${theme.dataTable.bodyClass}`}
              >
                <Header
                  fontWeight={true}
                  borderHeight="50px"
                  borderLeft={true}
                  borderWidth={"0px"}
                >
                  Maharashtra
                </Header>
                <Header
                  borderHeight="50px"
                  borderColor={"lightgrey"}
                  borderStyle={"solid"}
                >
                  12000
                </Header>
                <Header borderHeight="50px" borderStyle={"dashed"}>
                  12000
                </Header>
                <Header borderHeight="50px" borderStyle={"dashed"}>
                  12000
                </Header>
                <Header borderHeight="50px" borderStyle={"dashed"}>
                  12000
                </Header>
                <Header borderHeight="50px" borderStyle={"dashed"}>
                  12000
                </Header>
                <Header borderHeight="50px" borderStyle={"dashed"}>
                  12000
                </Header>
                <Header borderHeight="50px" borderStyle={"dashed"}>
                  12000
                </Header>
                {/* <Header
              borderHeight="50px"
              borderColor={"#8a8a8a"}
              borderStyle={"solid"}
            >
              12000
            </Header>
            <Header
              borderHeight="50px"
              borderColor={"lightgrey"}
              borderStyle={"solid"}
            >
              12000
            </Header> */}
                {/* <Header
              borderHeight="50px"
              borderColor={"lightgrey"}
              borderStyle={"solid"}
            >
              12000
            </Header>
            <Header
              borderHeight="50px"
              borderColor={"lightgrey"}
              borderStyle={"solid"}
            >
              12000
            </Header>
            <Header
              borderHeight="50px"
              borderColor={"lightgrey"}
              borderStyle={"solid"}
            >
              12000
            </Header> */}
              </tr>
              <tr
                className={`d-flex bg-white mt-2 flex-row justify-content-between radius-5 ${theme.dataTable.bodyClass}`}
              >
                <Header
                  fontWeight={true}
                  borderHeight="50px"
                  borderLeft={true}
                  borderWidth={"0px"}
                >
                  Maharashtra
                </Header>
                <Header
                  borderHeight="50px"
                  borderColor={"lightgrey"}
                  borderStyle={"solid"}
                >
                  12000
                </Header>
                <Header borderHeight="50px" borderStyle={"dashed"}>
                  12000
                </Header>
                <Header borderHeight="50px" borderStyle={"dashed"}>
                  12000
                </Header>
                <Header borderHeight="50px" borderStyle={"dashed"}>
                  12000
                </Header>
                <Header borderHeight="50px" borderStyle={"dashed"}>
                  12000
                </Header>
                <Header borderHeight="50px" borderStyle={"dashed"}>
                  12000
                </Header>
                <Header borderHeight="50px" borderStyle={"dashed"}>
                  12000
                </Header>
                {/* <Header
              borderHeight="50px"
              borderColor={"#8a8a8a"}
              borderStyle={"solid"}
            >
              12000
            </Header>
            <Header
              borderHeight="50px"
              borderColor={"lightgrey"}
              borderStyle={"solid"}
            >
              12000
            </Header> */}
                {/* <Header
              borderHeight="50px"
              borderColor={"lightgrey"}
              borderStyle={"solid"}
            >
              12000
            </Header>
            <Header
              borderHeight="50px"
              borderColor={"lightgrey"}
              borderStyle={"solid"}
            >
              12000
            </Header>
            <Header
              borderHeight="50px"
              borderColor={"lightgrey"}
              borderStyle={"solid"}
            >
              12000
            </Header> */}
              </tr>
              <tr
                className={`d-flex bg-white mt-2 flex-row justify-content-between radius-5 ${theme.dataTable.bodyClass}`}
              >
                <Header
                  fontWeight={true}
                  borderHeight="50px"
                  borderLeft={true}
                  borderWidth={"0px"}
                >
                  Maharashtra
                </Header>
                <Header
                  borderHeight="50px"
                  borderColor={"lightgrey"}
                  borderStyle={"solid"}
                >
                  12000
                </Header>
                <Header borderHeight="50px" borderStyle={"dashed"}>
                  12000
                </Header>
                <Header borderHeight="50px" borderStyle={"dashed"}>
                  12000
                </Header>
                <Header borderHeight="50px" borderStyle={"dashed"}>
                  12000
                </Header>
                <Header borderHeight="50px" borderStyle={"dashed"}>
                  12000
                </Header>
                <Header borderHeight="50px" borderStyle={"dashed"}>
                  12000
                </Header>
                <Header borderHeight="50px" borderStyle={"dashed"}>
                  12000
                </Header>
                {/* <Header
              borderHeight="50px"
              borderColor={"#8a8a8a"}
              borderStyle={"solid"}
            >
              12000
            </Header>
            <Header
              borderHeight="50px"
              borderColor={"lightgrey"}
              borderStyle={"solid"}
            >
              12000
            </Header> */}
                {/* <Header
              borderHeight="50px"
              borderColor={"lightgrey"}
              borderStyle={"solid"}
            >
              12000
            </Header>
            <Header
              borderHeight="50px"
              borderColor={"lightgrey"}
              borderStyle={"solid"}
            >
              12000
            </Header>
            <Header
              borderHeight="50px"
              borderColor={"lightgrey"}
              borderStyle={"solid"}
            >
              12000
            </Header> */}
              </tr>
            </tbody>
          </table>
          <div style={{ color: '#0177FA', cursor: 'pointer', fontFamily: 'Montserrat', fontSize: '14px', fontWeight: 'bold' }} className="my-3 d-flex align-items-center justify-content-center">
              View More
          </div>
        </div>
      </div>
    </>
  );
}
