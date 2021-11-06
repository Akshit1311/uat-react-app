import React from 'react'
import SearchBarComponent from '../../components/SearchBarComponent';
import DataTable2Component from './DataTable2Component';
import '../../scss/HomePageStyles/dataTableComponent.scss';

function DataTableComponent(props: any) {
    if (props.data.length !== 0) {
        return (
            <>
                <div className="m-0">
                    <div className="row m-0 p-0">
                        <div className="col-12 col-md-7">
                            <table>
                                <thead>
                                    <tr className="card d-flex flex-row border-dark my-3 p-1">
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
                                <div className="row mb-2">
                                    <div className="col-12 col-md-5">
                                        <SearchBarComponent />
                                    </div>
                                </div>
                                <tbody>
                                    <tr className="p-2 card d-flex flex-row my-2">
                                        <td>Maharashtra</td>
                                        <td>12000</td>
                                        <td>12000</td>
                                        <td>12000</td>
                                        <td>12000</td>
                                        <td>12000</td>
                                        <td>12000</td>
                                        <td>12000</td>
                                    </tr>
                                    <tr className="p-2 card d-flex flex-row my-2">
                                        <td>Maharashtra</td>
                                        <td>12000</td>
                                        <td>12000</td>
                                        <td>12000</td>
                                        <td>12000</td>
                                        <td>12000</td>
                                        <td>12000</td>
                                        <td>12000</td>
                                    </tr>
                                    <tr className="p-2 card d-flex flex-row my-2">
                                        <td>Maharashtra</td>
                                        <td>12000</td>
                                        <td>12000</td>
                                        <td>12000</td>
                                        <td>12000</td>
                                        <td>12000</td>
                                        <td>12000</td>
                                        <td>12000</td>
                                    </tr>
                                    <tr className="p-2 card d-flex flex-row my-2">
                                        <td>Maharashtra</td>
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
                        <div className="col-12 col-md">
                            <DataTable2Component />
                        </div>
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