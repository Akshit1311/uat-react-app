import React, { useContext, useEffect, useState } from "react";
import { useTable, useSortBy } from "react-table";
import SearchBarComponent from "../../../components/DataTable/Search";
// /DataTable/Search";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { ThemeContext } from "../../../config/context";
import Cells from "../../../components/DataTable/Cells";
import { TR } from "../../../components/DataTable/styled";

interface ReactTableType {
  columns: any[];
  data: any[];
}

const TableContainer = (props: any) => {
  const { columns, bodyData, noOfItemsToRender, loop, mentorsTable } = props;
  const [searchQuery, setSearchQuery] = props.searchObj;

  const [originalData, setOriginalData] = useState<any[]>([]);
  const [renderedData, setRenderedData] = useState<any>([]);

  const [noOfItemsRender, setNoOfItemRender] = useState<number>(100);

  const theme = useContext(ThemeContext);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data: renderedData,
      },
      useSortBy
    );

  // const calculate = () => {
  //   const newObj: any = new Object();
  //   loop.forEach((item: string) => {
  //     let sum = 0;
  //     originalData.forEach((dataValue: any) => {
  //       sum += Number(dataValue.statistics[item]);
  //     });
  //     newObj[item] = sum;
  //   });
  //   const clone = [...originalData];
  //   clone.push({
  //     id: "Some other",
  //     isUnionTerritory: false,
  //     name: "Total",
  //     text: "Total",
  //     statistics: newObj,
  //   });
  //   return clone;
  // };

  const memorisedValue = React.useMemo(() => {
    return originalData;
  }, [originalData]);

  const handleViewMore = () => {
    const calculated = noOfItemsRender + 8;

    if (calculated > memorisedValue.length) {
      setNoOfItemRender(memorisedValue.length);
      setRenderedData(memorisedValue);
      return;
    }

    setNoOfItemRender(calculated);
    // setRenderedData(memorisedValue.slice(0, calculated));
  };

  useEffect(() => {
    const removedEmptyData: any[] = [];
    bodyData.forEach((item: any) => {
      if (item.district && item.district.length > 3)
        removedEmptyData.push(item);
    });
    setOriginalData(bodyData);
    setRenderedData(bodyData);

    if (noOfItemsToRender) {
      setNoOfItemRender(noOfItemsToRender);
    }
  }, [bodyData]);

  function getHeaderCellClass(index: number) {
    if (index === 0 && mentorsTable) return "header-cell-state-2";
    if (index === 0 && !mentorsTable) return "header-cell-state w-50";
    if (index !== 0 && mentorsTable) return "header-cell-2 w-50";
    if (index !== 0 && !mentorsTable) return "header-cell w-50";
  }

  return (
    <div className="data-table-overflow-scroll">
      <table {...getTableProps()} className="w-100">
        <thead className="w-100 py-5 ">
          {headerGroups.map((headerGroup) => (
            <TR
              {...headerGroup.getHeaderGroupProps()}
              className={`d-flex flex-row ${theme.dataTable.headerBorder}`}
            >
              {headerGroup.headers.map((column: any, index: number) => (
                <Cells
                  {...column.getSortByToggleProps()}
                  cellClass={getHeaderCellClass(index)}
                  {...column.getHeaderProps()}
                  borderWidth={index === 0 ? "0px" : "1px"}
                  fontWeight={true}
                  borderColor="#e5e5e5"
                  borderHeight="48px"
                >
                  <div
                    {...column.getSortByToggleProps()}
                    className="d-flex align-items-center w-100"
                  >
                    <div>
                      {index === 0 ||
                      column.render("Header").toLowerCase() ===
                        "seed fund startups"
                        ? column.render("Header")
                        : column
                            .render("Header")
                            .split(" ")
                            .map((item: string) => <div>{item}</div>)}
                    </div>
                    <div>
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <ArrowDropDownIcon fontSize="small" />
                        ) : (
                          <ArrowDropUpIcon fontSize="small" />
                        )
                      ) : (
                        <span className="d-flex flex-column p-0">
                          <ArrowDropUpIcon
                            fontSize="small"
                            style={{ marginBottom: "-7px" }}
                          />
                          <ArrowDropDownIcon
                            fontSize="small"
                            style={{ marginTop: "-7px" }}
                          />
                        </span>
                      )}
                    </div>
                  </div>
                </Cells>
              ))}
            </TR>
          ))}
        </thead>

        <div
          className="mt-3 mb-2"
          style={{
            maxWidth: "21rem",
            visibility: props.search ? "visible" : "hidden",
          }}
        >
          <SearchBarComponent
            background={theme.dataTable.searchBg}
            borderRadius="4px"
            onChange={setSearchQuery}
            value={searchQuery}
            placeholderClass={`search-bar-placeholder-data-table ${theme.dataTable.inputClass}`}
            inputClass={`${theme.dataTable.searchBorderClass} radius-5 me-3`}
          />
        </div>
        <tbody {...getTableBodyProps()}>
          {rows.slice(0, noOfItemsRender).map((row) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                className={`d-flex bg-white mt-2 flex-row justify-content-between radius-5 w-100 ${theme.dataTable.bodyClass}`}
              >
                {row.cells.map((cell: any, index: number) => {
                  return (
                    <>
                      <Cells
                        {...cell.getCellProps()}
                        maxWidth="auto"
                        cellClass={getHeaderCellClass(index)}
                        borderHeight="2.5rem"
                        borderWidth={index !== 0 ? "1px" : "0px"}
                        fontWeight={index === 0}
                        borderColor="#e5e5e5"
                        textRight={true}
                      >
                        {cell.render("Cell")}
                      </Cells>
                    </>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      {
        <div
          style={{
            visibility:
              renderedData.length !== memorisedValue.length
                ? "visible"
                : "hidden",
          }}
          className="my-4 data-table-view-more-button text-theme"
          onClick={handleViewMore}
        >
          View More
        </div>
      }
    </div>
  );
};

export default TableContainer;
