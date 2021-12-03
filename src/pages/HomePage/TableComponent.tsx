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
  const borderWidthA = borderWidth ? borderWidth : "0.1rem";
  const borderStyleA = borderStyle ? borderStyle : "solid";
  const borderColorA = borderColor ? borderColor : "black";
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
            marginLeft: "0.4rem",
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
            <thead className="w-100 py-5">
              <TR className="card d-flex flex-row justify-content-between">
                <Header fontWeight={true} borderLeft={true} borderWidth={"0px"}>
                  States
                </Header>
                <Header
                  fontWeight={true}
                  borderColor={"lightgrey"}
                  borderStyle={"solid"}
                >
                  {"Total"}
                  <br />
                  Startups
                </Header>
                <Header fontWeight={true} borderStyle={"dashed"}>
                  FFS
                </Header>
                <Header fontWeight={true} borderStyle={"dashed"}>
                  Patient Startups
                </Header>
                <Header fontWeight={true} borderStyle={"dashed"}>
                  Seed Fund Startups
                </Header>
                <Header fontWeight={true} borderStyle={"dashed"}>
                  Showcased Startups
                </Header>
                <Header fontWeight={true} borderStyle={"dashed"}>
                  DDIIT Recognised Startups
                </Header>
                <Header fontWeight={true} borderStyle={"dashed"}>
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
                background={theme.searchBg}
                borderRadius="4px"
                placeholderClass="search-bar-placeholder-data-table"
              />
            </div>
            <tbody>
              <tr className="d-flex bg-white mt-2 flex-row border justify-content-between  card shadow-sm">
                <Header
                  fontWeight={true}
                  borderHeight="50px"
                  borderLeft={true}
                  borderWidth={"0px"}
                >
                  Maharashtra
                </Header>
                <Header borderHeight="50px" borderStyle={"solid"}>
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
          <div className="my-5"></div>
        </div>
      </div>
    </>
  );
}
