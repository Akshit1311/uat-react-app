import Cells from "./Cells";
import React, { useContext } from "react";
import { BodyTypes } from "./types";
import { ThemeContext } from "../../config/context";

export default function Body({ renderedData, bodyConfig }: BodyTypes) {
  const theme = useContext(ThemeContext);
  return (
    <tbody>
      {renderedData.map((body:any, index:number) => (
        <tr key={index}
          className={`d-flex bg-white mt-2 flex-row justify-content-between radius-5 ${theme.dataTable.bodyClass}`}
        >
          <>
            {bodyConfig.map((item: any, index:number) => (
              <>
                {index === 0 ? (
                  <Cells key={index} {...item.cellConfig} maxWidth="auto" cellClass="header-cell-state" borderHeight="50px">
                    {body[item.accessor]}
                  </Cells>
                ) : (
                  <Cells key={index} {...item.cellConfig} maxWidth="70px" borderHeight="50px">
                    {body[item.defaultAccessor][item.accessor]}
                  </Cells>
                )}
              </>
            ))}
          </>
        </tr>
      ))}
    </tbody>
  );
}
