import styled, { css } from "styled-components";
// import { PaginationList } from "../Pagination/Pagination.styles";

export const StyledTableLayout = styled.div`
  width: 100%;
  border-radius: 20px;
  margin: ${({ noNegativeMargin }) => (noNegativeMargin ? "" : "0 0 0")};
  background: var(--white);


  .table-heading {
    display: block;
    margin-bottom: 15px;
    font-size: 16px;
    font-weight: 400;
    line-height: 20.16px;
  }

  .inner-wrap {
    @media (max-width: 992px) {
      padding: 5px 20px 20px;
      border-radius: 10px;
      background: var(--gray-4);
      border-radius: 10px;
    }
    @media (max-width: 768px) {
      padding: 5px 10px 10px;
      overflow: hidden;
    }
    .pagination {
      background: var(--white);
      border-radius: 0 0 10px 10px;
      padding-bottom: 20px;
    }
  }
`;
