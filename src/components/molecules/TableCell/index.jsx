import React, { useContext } from "react";

import Skeleton from "react-loading-skeleton";
import { Th, Td } from "./TableCell.styles";

function TableCell({ heading, children, ...rest }) {
  // const { isLoading } = useContext(LoadingContext);
  const isLoading = false;
  const CellType = (props) => (heading ? <Th {...props} /> : <Td {...props} />);

  return (
    <CellType {...rest}>
      {isLoading ? <Skeleton width={100} height={15} /> : children}
    </CellType>
  );
}

export default TableCell;
