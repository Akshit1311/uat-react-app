import { useLocation } from "react-router-dom";
import React from "react";

export function useParams() {
  const {search} = useLocation();
  console.log(search);
//   return 0;
    return React.useMemo(() => new URLSearchParams(search), [search]);
}
