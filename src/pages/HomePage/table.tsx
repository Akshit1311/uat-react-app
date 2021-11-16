import React from "react";
import SearchBarComponent from "../../components/SearchBarComponent";

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

const Header = ({
  children,
  borderWidth,
  borderStyle,
  borderColor,
  borderRight,
  borderLeft,
  background,
  borderHeight,
  fontWeight,
}: HeaderType) => {
  const borderWidthA = borderWidth ? borderWidth : "0.1rem";
  const borderStyleA = borderStyle ? borderStyle : "solid";
  const borderColorA = borderColor ? borderColor : "black";
  const borderLeftA = `${borderWidthA} ${borderStyleA} ${borderColorA}`;
  return (
    <th
      className="header-cell"
      style={{
        fontWeight: fontWeight ? 700 : 400,
        background: background ? background : "none",
      }}
    >
      <div className="d-flex">
        <div
          style={{
            height: borderHeight ? borderHeight : "63px",
            borderLeft: borderLeftA,
          }}
        />
        <p className="my-0 p-0 d-flex align-items-center" style={{marginLeft:'0.4rem'}}>{children}</p>
      </div>
    </th>
  );
};

export default function DataTable(props: any) {
  return (
    <div className="w-100 data-table p-0 m-0">
      <table className="w-100">
        <thead className="w-100 py-5">
          <tr
            className="card d-flex flex-row justify-content-between"
            style={{ background: "white" }}
          >
            <Header fontWeight={true}  borderLeft={true} borderWidth={"0px"}>
              States
            </Header>
            <Header fontWeight={true}  borderColor={"lightgrey"} borderStyle={"solid"}>
              {'Total'}<br />Startups
            </Header>
            <Header fontWeight={true}  borderStyle={"dashed"}>FFS</Header>
            <Header fontWeight={true}  borderStyle={"dashed"}>Patient Startups</Header>
            <Header fontWeight={true}  borderStyle={"dashed"}>Seed Fund Startups</Header>
            <Header fontWeight={true}  borderStyle={"dashed"}>Showcased Startups</Header>
            <Header fontWeight={true}  borderStyle={"dashed"}>DDIIT Recognised Startups</Header>
            <Header fontWeight={true}  borderStyle={"dashed"}>Women Owned</Header>
            <Header fontWeight={true}  borderColor={"#8a8a8a"} borderStyle={"solid"}>
              Mentors
            </Header>
            <Header fontWeight={true}  borderColor={"lightgrey"} borderStyle={"solid"}>
              Incubators
            </Header>
            <Header fontWeight={true}  borderColor={"lightgrey"} borderStyle={"solid"}>
              Investors
            </Header>
            <Header fontWeight={true}  borderColor={"lightgrey"} borderStyle={"solid"}>
              Accelerators
            </Header>
            <Header
              borderColor={"lightgrey"}
              borderStyle={"solid"}
              borderRight={true}
              fontWeight={true}
            >
              Government
            </Header>
          </tr>
        </thead>
        <div className="mt-3 mb-2" style={{ maxWidth: '22rem' }}>
          <SearchBarComponent background="white" borderRadius="4px" placeholderClass="search-bar-placeholder-data-table" />
        </div>
        <tbody>
          <tr className="d-flex bg-grey mt-2 flex-row justify-content-between">
            <Header
              fontWeight={true}
              borderHeight="50px"
              background="white"
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
            <Header
              borderHeight="50px"
              background={"white"}
              borderColor={"#8a8a8a"}
              borderStyle={"solid"}
            >
              12000
            </Header>
            <Header
              background={"white"}
              borderHeight="50px"
              borderColor={"lightgrey"}
              borderStyle={"solid"}
            >
              12000
            </Header>
            <Header
              background={"white"}
              borderHeight="50px"
              borderColor={"lightgrey"}
              borderStyle={"solid"}
            >
              12000
            </Header>
            <Header
              background={"white"}
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
              background={"white"}
            >
              12000
            </Header>
          </tr>
          <tr className="d-flex bg-grey mt-2 flex-row justify-content-between">
            <Header
              fontWeight={true}
              borderHeight="50px"
              background="white"
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
            <Header
              borderHeight="50px"
              background={"white"}
              borderColor={"#8a8a8a"}
              borderStyle={"solid"}
            >
              12000
            </Header>
            <Header
              background={"white"}
              borderHeight="50px"
              borderColor={"lightgrey"}
              borderStyle={"solid"}
            >
              12000
            </Header>
            <Header
              background={"white"}
              borderHeight="50px"
              borderColor={"lightgrey"}
              borderStyle={"solid"}
            >
              12000
            </Header>
            <Header
              background={"white"}
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
              background={"white"}
            >
              12000
            </Header>
          </tr>
          <tr className="d-flex bg-grey mt-2 flex-row justify-content-between">
            <Header
              borderHeight="50px"
              background="white"
              borderLeft={true}
              borderWidth={"0px"}
              fontWeight={true}
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
            <Header
              borderHeight="50px"
              background={"white"}
              borderColor={"#8a8a8a"}
              borderStyle={"solid"}
            >
              12000
            </Header>
            <Header
              background={"white"}
              borderHeight="50px"
              borderColor={"lightgrey"}
              borderStyle={"solid"}
            >
              12000
            </Header>
            <Header
              background={"white"}
              borderHeight="50px"
              borderColor={"lightgrey"}
              borderStyle={"solid"}
            >
              12000
            </Header>
            <Header
              background={"white"}
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
              background={"white"}
            >
              12000
            </Header>
          </tr>
          <tr className="d-flex bg-grey mt-2 flex-row justify-content-between">
            <Header
              borderHeight="50px"
              background="white"
              borderLeft={true}
              fontWeight={true}
              borderWidth={"0px"}
            >
              Total
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
            <Header
              borderHeight="50px"
              background={"white"}
              borderColor={"#8a8a8a"}
              borderStyle={"solid"}
            >
              12000
            </Header>
            <Header
              background={"white"}
              borderHeight="50px"
              borderColor={"lightgrey"}
              borderStyle={"solid"}
            >
              12000
            </Header>
            <Header
              background={"white"}
              borderHeight="50px"
              borderColor={"lightgrey"}
              borderStyle={"solid"}
            >
              12000
            </Header>
            <Header
              background={"white"}
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
              background={"white"}
            >
              12000
            </Header>
          </tr>
        </tbody>
      </table>
      <div className="my-5"></div>
    </div>
  );
}
