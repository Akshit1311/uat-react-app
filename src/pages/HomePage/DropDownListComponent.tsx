import { useEffect } from 'react';
import { GoSearch } from 'react-icons/go';
import '../../scss/HomePageStyles/dropDownListComponent.scss';
import { Button } from '../../styles-components/Button';

const DropDownListComponent = (props: any) => {
    const { setMapMode, data, selectedState, accessor, handleClick } = props;
    let StateList;
    console.log("data :", data)
    if (data.length > 0) {
        StateList = data.map((dataObj: any) => {
            return (
                <>
                    <div
                        onClick={() => handleClick(dataObj)}
                        className={`list-card me-2 ${selectedState.length === 1 && selectedState[0][accessor] === dataObj[accessor] ? "selected-list-card" : "unselected-list-card"}`}
                    >
                        <h5 className="m-0 p-0">{dataObj[accessor]}</h5>
                    </div>
                </>
            )
        });
    }

    return (
        <div className="drop-down-list-component pe-0 me-0">
            <div className="state-search-bar me-3">
                <div className="d-flex">
                    <span className="btn my-0 me-0 pe-0"><GoSearch /></span>
                    <input
                        type="text"
                        className="ms-0 form-control me-3 border-0 shadow-none f-400"
                        placeholder="Search" />
                </div>
            </div>
            <div className="state-container">
                {StateList}
            </div>
            <div className="my-3 d-flex justify-content-between me-3">
                <Button
                    border={"2px solid #000"}
                    backgroundColor={"#fff"}
                    color={"black"}
                    boxShadow={"0px 0px 10px rgba(193, 193, 193, 0.25)"}
                >Clear</Button>
                <Button
                    marginLeft={"12px"}
                >Apply</Button>
            </div>
        </div >
    )
}

export default DropDownListComponent
