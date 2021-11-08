import { COUNTBLOCK } from '../../shared-data/countBlockList';
import '../../scss/HomePageStyles/countBlockComponent.scss';

const CountsBlockComponent = () => {
    const data = COUNTBLOCK;
    const boxList = data.map((d1) => {
        return (
            <>
                <div key={d1._id} className="col-5 col-md count-single-card d-flex  flex-column justify-content-center" style={{
                    backgroundColor: `${d1.backgroundColor}`,
                    border: `2px solid ${d1.borderColor}`,
                    color: `${d1.color}`,
                    borderRadius: "4px",
                    height: "98px",
                    top: "43px",
                    width: "170px"
                }}>
                    <h4>{d1.count}</h4>
                    <h6>{d1.boxTitle}</h6>
                </div>
            </>
        )
    })
    return (
        <div className="container-fluid count-block-styles">
            <div className="row">
                <h5>India</h5>
            </div>
            <div className="row count-div">
                {boxList}
            </div>
        </div>
    )
}

export default CountsBlockComponent
