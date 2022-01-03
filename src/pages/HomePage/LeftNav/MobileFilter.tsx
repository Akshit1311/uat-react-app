import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import * as React from "react";
import LeftNav from "./LeftNavComponent";

interface MobileViewProps {
  filterProps: any;
  handleToggle: any;
  isVisible: boolean;
  fetchDateRange: any;
  dateRangeState: any[];
  dateRangeLoading: boolean;
}

type Anchor = "bottom";

export default function MobileView(props: MobileViewProps) {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: true,
    right: false,
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

    const trimDateRangeData = (array:any[]) =>{
      if(array && array.length){
        const newList = new Array();
        array.forEach((item)=>{
          newList.push({ id: item.from + '/' + item.to, value: item.text })
        })
        return newList
      } else return []
    }

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <LeftNav
        {...props.filterProps}
        dateRangeState={trimDateRangeData(props.dateRangeState).reverse()}
        dateRangeLoading={props.dateRangeLoading}
        insight={false}
        search={false}
        downIconAlignment
        dateRange={true}
        noShadow={true}
      />
    </Box>
  );

  React.useEffect(() => {
    props.fetchDateRange();
  }, []);

  return (
    <div>
      <React.Fragment>
        <Drawer
          anchor={"bottom"}
          open={props.isVisible}
          onClose={() => props.handleToggle()}
        >
          <p className="font-Mont font-16px font-600 pt-4 ps-3 mb-0">FILTERS</p>
          {list("bottom")}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
