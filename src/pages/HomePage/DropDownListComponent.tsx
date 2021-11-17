import { GoSearch } from 'react-icons/go';
import '../../scss/HomePageStyles/dropDownListComponent.scss';


const DropDownListComponent = (props: any) => {
    const { data, setStateHandler } = props;
    const StateList = data.map((state: any, index: string) => {
        return (
            <>
                <div className="list-card me-2">
                    <h5 className="m-0 p-0" onClick={() => setStateHandler(index + 1)}>{state.state}</h5>
                </div>
            </>
        )
    });

    return (
        <div className="drop-down-list-component">
            <div className="state-search-bar me-1">
                <div className="input-grou d-flex">
                    <span className="btn my-0 me-0 pe-0"><GoSearch /></span>
                    <input type="text" className="ms-0 form-control me-3 border-0 shadow-none f-400" placeholder="Search" />
                </div>
            </div>
            <div className="state-container">
                {StateList}
            </div>
            <div className="my-3 d-flex justify-content-between">
                <span className="btn btn-white border-dark text-dark me-2" style={{ flex: "48%" }}>Clear</span>
                <span className="btn btn-primary text-white" style={{ flex: "48%" }}>Apply</span>
            </div>
        </div >
    )
}

export default DropDownListComponent
