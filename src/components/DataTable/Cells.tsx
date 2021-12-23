import React, { useContext } from "react";
import { ThemeContext } from "../../config/context";
import { TH } from "./styled";
import { CellsType } from "./types";

const Cells = ({
  children,
  borderWidth,
  borderStyle,
  borderColor,
  background,
  borderHeight,
  fontWeight,
  cellClass,
  maxWidth,
  onClick,
  textRight,
}: CellsType) => {
  const theme = useContext(ThemeContext);
  const borderWidthA = borderWidth ? borderWidth : "0.1rem";
  const borderStyleA = borderStyle ? "solid" : "solid";
  const borderColorA = borderColor ? borderColor : theme.dataTable.dashedBorder;
  const borderLeftA = `${borderWidthA} ${borderStyleA} ${borderColorA}`;
  return (
    <TH onClick={onClick} className={cellClass}>
      <div
        style={{
          minHeight: borderHeight ? borderHeight : "63px",
          borderLeft: borderLeftA,
          position: "absolute",
        }}
      />
      <div
        style={{ minHeight: borderHeight ? borderHeight : "43px" }}
        className={`d-flex h-100 ${
          textRight && !fontWeight ? "justify-content-end" : ""
        }`}
      >
        <p
          className="my-0 p-0 d-flex align-items-center font-mont-data-table pe-3"
          style={{
            marginLeft: "0.8rem",
            color: "black",
            fontWeight: fontWeight ? 700 : 500,
          }}
        >
          {children}
        </p>
      </div>
    </TH>
  );
};

export default Cells;
