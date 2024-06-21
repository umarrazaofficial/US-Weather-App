import styled from "styled-components";

export const ActionBtnList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  gap: 5px;

  li {
    margin: 0;
  }

  .btn {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px;
    text-transform: capitalize;

    @media only screen and (max-width: 992px) {
      flex-wrap: wrap;
    }
  }
`;
