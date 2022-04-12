import {
  useTable,
  useSortBy,
  useFilters,
  matchSorter,
  useGlobalFilter,
} from "react-table";
import { Table } from "react-bootstrap";
import { useMemo } from "react";
import { BsSortDownAlt, BsSortUpAlt } from "react-icons/bs";
import { BiSortAlt2 } from "react-icons/bi";

import GlobalFilter from "./globalfilter";

export default function DataTable({ columns, data }) {
  fuzzyTextFilterFn.autoRemove = (val) => !val;

  function fuzzyTextFilterFn(rows, id, filterValue) {
    return matchSorter(rows, filterValue, { keys: [(row) => row.values[id]] });
  }

  const filterTypes = useMemo(() => ({
    fuzzyText: fuzzyTextFilterFn,
    text: (rows, id, filterValue) => {
      return rows.filter((row) => {
        const rowValue = row.values[id];
        return rowValue !== undefined
          ? String(rowValue)
              .toLowerCase()
              .startsWith(String(filterValue).toLowerCase())
          : true;
      });
    },
  }));

  const {
    getTableProps, // table props from react-table
    getTableBodyProps, // table body props from react-table
    headerGroups, // headerGroups, if your table has groupings
    rows, // rows for the table based on the data passed
    prepareRow, // Prepare the row (this function needs to be called for each row before getting the row props)
    state,
    preGlobalFilteredRows,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      filterTypes,
    },
    useFilters,
    useGlobalFilter,
    useSortBy
  );

  return (
    <>
      <div className="searchContainer">
        <GlobalFilter
          preGlobalFilteredRows={preGlobalFilteredRows}
          globalFilter={state.globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
      </div>

      <Table striped {...getTableProps()} variant="noBorder">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}{" "}
                  <span>
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <BsSortDownAlt size={20} />
                      ) : (
                        <BsSortUpAlt size={20} />
                      )
                    ) : (
                      <BiSortAlt2 size={20} />
                    )}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
}
