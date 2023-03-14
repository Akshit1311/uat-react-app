import { useContext } from 'react'
import { ThemeContext } from '../../config/context'
import Cells from './Cells'
import { TR } from "./styled"
import { HeaderTypes } from "./types"

// const dahsedConfig = {
//     fontWeight={true} borderStyle={"dashed"} borderColor={theme.dataTable.dashedBorder}
// }



export default function Header({ headerConfig }:HeaderTypes){
    const theme = useContext(ThemeContext)
    return (
        <thead className="w-100 py-5 ">
              <TR
                className={`d-flex flex-row justify-content-between ${theme.dataTable.headerBorder}`}
                style={{ background: "red" }}
              >
                 { headerConfig.map((header:any, index:number)=>(
                     <Cells key={index} {...header.cellConfig} fontWeight={true}>
                         {header.label}
                     </Cells>
                 ))}
                {/* <Cells fontWeight={true} borderLeft={true} borderWidth={"0px"}>
                  States
                </Cells>
                <Cells
                  fontWeight={true}
                  background="white"
                  borderStyle={"solid"}
                  borderColor={'#8A8A8A'}
                >
                  {"Total"}
                  <br />
                  Startups
                </Cells>
                <Cells fontWeight={true} borderStyle={"dashed"} borderColor={theme.dataTable.dashedBorder}>
                  Patent Startups
                </Cells>
                <Cells fontWeight={true} borderStyle={"dashed"} borderColor={theme.dataTable.dashedBorder}>
                  Seed Fund Startups
                </Cells>
                <Cells fontWeight={true} borderStyle={"dashed"} borderColor={theme.dataTable.dashedBorder}>
                  Showcased Startups
                </Cells>
                <Cells fontWeight={true} borderStyle={"dashed"} borderColor={theme.dataTable.dashedBorder}>
                  DDIIT Recognised Startups
                </Cells>
                <Cells fontWeight={true} borderStyle={"dashed"} borderColor={theme.dataTable.dashedBorder}>
                  Women Owned Startups
                </Cells>
                */}
              </TR>
            </thead>
    )
}