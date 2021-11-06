import { Input } from 'reactstrap';
import { IoMapSharp } from 'react-icons/io5';
import { RiDropFill } from 'react-icons/ri';
import { MdOutlineLocationCity } from 'react-icons/md';
import '../../scss/HomePageStyles/viewChangerComponent.scss';

function ViewChangerComponent() {
    return (
        <div className="container-fluid">
            <div className="row d-flex align-items-center flex-row mt-2">
                <div className="col-12 col-md d-flex flex-row">
                    <span className="data-range-text">Data Range</span>
                    <Input id="exampleSelect" name="select" type="select" className="Input-Select-Box" style={{ border: "2px solid #0177FA" }}>
                        <option>Select </option>
                        <option>     2 </option>
                        <option>     3 </option>
                        <option>     4 </option>
                        <option>     5 </option>
                    </Input>
                </div>
            </div>
            <div className="row mt-3">
                <div className="col-md-10 col-10">
                    <button className="bg-primary btn btn-outline btn-icon-handler text-white m-1"><IoMapSharp /></button>
                    <button className="bg-white text-dark btn btn-icon-handler border-primary m-1"><MdOutlineLocationCity /></button>
                    <button className="bg-white text-dark btn btn-icon-handler border-primary m-1"><IoMapSharp /></button>
                </div>
                <div className="col-md-2 col-2">
                    <button className="bg-white text-dark btn btn-icon-handler border-primary m-1"><RiDropFill /></button>
                </div>
            </div>
            <div className="card row mt-3 select-type-card">
                <h5 className="">INDIAN STARTUPS</h5>
                <label style={{ fontWeight: "bold", fontSize: '14px' }}>Select Type</label>
                <div className="mt-2 px-2">
                    <Input id="exampleSelect" name="select" type="select" className="Input-Select-Box" style={{ border: "2px solid #0177FA" }}>
                        <option>Select </option>
                        <option>     2 </option>
                        <option>     3 </option>
                        <option>     4 </option>
                        <option>     5 </option>
                    </Input>
                </div>
                <div className="p-2 px-2">
                    <div className="card mt-2 mb-1 px-3 py-2 d-flex flex-row align-items-center">
                        <h3>400</h3><span className="ms-3 selected-startups">Showcased Startups</span>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default ViewChangerComponent
