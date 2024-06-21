import styled from "styled-components";

export const StyledTableHeader = styled.div`
  background: var(--white);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.9375rem 1.25rem;
  font-size: var(--font-size-xs);
  color: var(--gray);
  display: none;

  @media (min-width: 768px) {
    font-size: var(--font-size-sm);
  }
`;

export const TotalResult = styled.span``;

export const ResultPerPage = styled.div`
  display: flex;
  align-items: center;
`;

// export const StyledSelect = styled(Select)`
//   margin-left: 5px;
//   .react-select__control {
//     padding-left: 10px;
//     width: 80px;
//     height: 35px;
//     min-height: 35px;
//   }
//   .react-select__indicators {
//     transform: translateX(25px);
//   }
// `;
