import React from 'react'
import SearchBarComponent from '../../components/SearchBarComponent';
import DataTable2Component from './DataTable2Component';
import '../../scss/HomePageStyles/dataTableComponent.scss';

function DataTableComponent(props: any) {
    if (props.data.length !== 0) {
        return (
            <>
                <div className="m-0 px-0 data-table-1">
                    <div className="d-flex flex-row m-0 p-0 w-100 justify-content-between" style={{ overflow: 'hidden'}}>
                        <div className="px-0 mx-0" style={{ width: '61%' }}>
                            <table>
                                <thead>
                                    <tr className="card d-flex flex-row border-dark border-end-0 mt-3 p-2" style={{ height: "85px" }}>
                                        <th>States</th>
                                        <th>Total Startups</th>
                                        <th>FFS</th>
                                        <th>Patient Startups</th>
                                        <th>Seed Fund Startups</th>
                                        <th>Showcased Startups</th>
                                        <th>DDIIT Recognised Startups</th>
                                        <th>Women Owned</th>
                                    </tr>
                                </thead>
                                <div className="row" style={{ marginTop: "16px", marginBottom: "16px" }}>
                                    <div className="col-12 col-md-5">
                                        <SearchBarComponent />
                                    </div>
                                </div>
                                <tbody>
                                    <tr className="p-2 card d-flex flex-row my-2 border-end-0">
                                        <td>Maharashtra</td>
                                        <td>12000</td>
                                        <td>12000</td>
                                        <td>12000</td>
                                        <td>12000</td>
                                        <td>12000</td>
                                        <td>12000</td>
                                        <td>12000</td>
                                    </tr>
                                    <tr className="p-2 card d-flex flex-row my-2 border-end-0">
                                        <td>Maharashtra</td>
                                        <td>12000</td>
                                        <td>12000</td>
                                        <td>12000</td>
                                        <td>12000</td>
                                        <td>12000</td>
                                        <td>12000</td>
                                        <td>12000</td>
                                    </tr>
                                    <tr className="p-2 card d-flex flex-row my-2 border-end-0">
                                        <td>Maharashtra</td>
                                        <td>12000</td>
                                        <td>12000</td>
                                        <td>12000</td>
                                        <td>12000</td>
                                        <td>12000</td>
                                        <td>12000</td>
                                        <td>12000</td>
                                    </tr>
                                    <tr className="p-2 card d-flex flex-row my-2 border-end-0">
                                        <td>Maharashtra</td>
                                        <td>12000</td>
                                        <td>12000</td>
                                        <td>12000</td>
                                        <td>12000</td>
                                        <td>12000</td>
                                        <td>12000</td>
                                        <td>12000</td>
                                    </tr>
                                    <tr className="p-2 card d-flex flex-row my-2 border-end-0">
                                        <td>Total</td>
                                        <td>12000</td>
                                        <td>12000</td>
                                        <td>12000</td>
                                        <td>12000</td>
                                        <td>12000</td>
                                        <td>12000</td>
                                        <td>12000</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div style={{ width: '39%'}}>
                            <DataTable2Component />
                        </div>
                        {/* <div className="col-12 col-md px-0 mx-0">
                        </div> */}
                    </div>
                </div>
            </>
        )
    }
    else {
        return (
            <></>
        )
    }
}

export default DataTableComponent