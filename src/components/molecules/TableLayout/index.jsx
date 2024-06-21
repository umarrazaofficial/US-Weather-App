import React, { useState } from "react";
// import Filters from "common/filters";
import TableHeader from "../TableHeader";
import { StyledTableLayout } from "./TableLayout.styles";
// import Pagination from "../Pagination";

function TableLayout({
  children,
  currentPage = 1,
  pageSize = 10,
  totalCount = 0,
  onChangeFilters,
  customFilterKey = "",
  exportBtn,
  createBtn,
  extraFilters,
  filters = false,
  noNegativeMargin,
  onOptionClick,
  resetFilter = false,
  tableHeading,
  noPagination,
  setResetFilter = () => { },
}) {
  const [filterState, setFilterState] = useState("");
  return (
    <>
      {/* {filters && (
        <Filters
          resetFilter={resetFilter}
          setResetFilter={setResetFilter}
          onChangeFilters={(_) => {
            onChangeFilters({ ..._, page: 1 });
            setFilterState(_);
          }}
          customFilterKey={customFilterKey}
          extraFilters={extraFilters}
          onOptionClick={onOptionClick}
        />
      )} */}
      <StyledTableLayout
        noNegativeMargin={noNegativeMargin}
        noPagination={noPagination}
      >
        {tableHeading && (
          <strong className="table-heading">{tableHeading}</strong>
        )}
        <div className="inner-wrap">
          <TableHeader
            total={totalCount}
            page={currentPage}
            resultPerPage={pageSize}
            setPageSize={(_) => onChangeFilters({ pageSize: _, page: 1 })}
            exportBtn={exportBtn}
            createBtn={createBtn}
          />
          {children}
          {/* <div className="pagination">
            <Pagination
              currentPage={currentPage}
              totalCount={totalCount}
              pageSize={pageSize}
              // onPageChange={_ => onChangeFilters({ page: _ })}
              onPageChange={(_) =>
                onChangeFilters({ filter: filterState.filter, page: _ })
              }
            />
          </div> */}
        </div>
      </StyledTableLayout>
    </>
  );
}

export default TableLayout;
