import { GoSearch } from 'react-icons/go';
import '../../scss/HomePageStyles/dropDownListComponent.scss';
import { Button } from '../../styles-components/Button';


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
                    <input
                        type="text"
                        className="ms-0 form-control me-3 border-0 shadow-none f-400"
                        placeholder="Search" />
                </div>
            </div>
            <div className="state-container">
                {StateList}
            </div>
            <div className="my-3 d-flex justify-content-between">
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
