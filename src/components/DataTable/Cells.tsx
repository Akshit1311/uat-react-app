import styled from "styled-components";
import React, { useContext } from "react";
import { ThemeContext } from "../../config/context";
import { TH } from "./styled"
import { CellsType } from "./types"

const Cells = ({
  children,
  borderWidth,
  borderStyle,
  borderColor,
  background,
  borderHeight,
  fontWeight,
  cellClass, 
  maxWidth
}: CellsType) => {
  const theme = useContext(ThemeContext);
  const borderWidthA = borderWidth ? borderWidth : "0.1rem";
  const borderStyleA = borderStyle ? 'solid' : "solid";
  const borderColorA = borderColor ? borderColor : theme.dataTable.dashedBorder;
  const borderLeftA = `${borderWidthA} ${borderStyleA} ${borderColorA}`;
  return (
    <TH
      className={cellClass}
      style={{
        fontWeight: fontWeight ? 700 : 400,
      }}
    >
      <div className="d-flex h-100">
        <div
          style={{
            height: '100%',
            minHeight: borderHeight ? borderHeight : "63px",
            borderLeft: borderLeftA,
            maxWidth: '100%'
          }}
        />
        <p
          className="my-0 p-0 d-flex align-items-center"
          style={{
            maxWidth: maxWidth ? maxWidth: '70px',
            marginLeft: "0.8rem",
          }}
        >
          {children}
        </p>
      </div>
    </TH>
  );
};

export default Cells;
