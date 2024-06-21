import styled, { css } from "styled-components";

const styles = css`
  text-align: ${({ center }) => (center ? "center" : "left")};
  font-size: var(--font-size-sm);
  ${({ responsive }) =>
    responsive
      ? css`
          @media (min-width: 992px) {
            background-color: var(--white);
            display: table-cell;
            padding: 0.85rem 0.5rem;

            &:first-child {
              padding-left: 25px;
            }
            &:last-child {
              padding-right: 1.25rem;
            }
          }
        `
      : css`
          display: table-cell;
          padding: 0.8rem 0.5rem;
          &:first-child {
            padding-left: 1.25rem;
          }
          &:last-child {
            padding-right: 1.25rem;
          }
        `}
`;

export const Th = styled.th`
  ${styles}
  padding-top: 20px !important;
  padding-bottom: 20px !important;
  text-transform: capitalize;
  &:first-child {
    text-align: left;
  }
`;

export const Td = styled.td`
  ${styles}
  ${({ responsive }) =>
    responsive &&
    css`
      display: flex;
      align-items: center;
      justify-content: space-between;
      @media (max-width: 991px) {
        padding: 10px 15px;
        &:last-child {
          /* height: 0;
          padding: 0; */
        }
        &:nth-child(odd) {
          background: var(--gray-3);
          border-radius: 8px;
        }
      }
      &:before {
        content: attr(data-th);
        font-weight: bold;
        display: inline-block;
        color: var(--gray);
        padding-right: 12px;

        @media (min-width: 992px) {
          display: none;
        }
      }
    `}
`;
