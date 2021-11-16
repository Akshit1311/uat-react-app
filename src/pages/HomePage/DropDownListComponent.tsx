import { GoSearch } from 'react-icons/go';
import '../../scss/HomePageStyles/dropDownListComponent.scss';
const DropDownListComponent = (props: any) => {
    const { data } = props;
    const StateList = data.map((state: any) => {
        return (
            <>
                <div className="list-card me-1">
                    <h5 className="m-0 p-0">{state.state}</h5>
                </div>
            </>
        )
    });

    return (
        <div className="drop-down-list-component">
            <div className="state-search-bar me-1">
                <div className="input-grou d-flex">
                    <span className="btn my-0"><GoSearch /></span>
                    <input type="text" className="form-control me-3 border-0 shadow-none f-500" placeholder="Search" />
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
