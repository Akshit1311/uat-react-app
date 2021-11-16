import { COUNTBLOCK } from "../../shared-data/countBlockList";
import "../../scss/HomePageStyles/countBlockComponent.scss";

const CountsBlockComponent = () => {
  const data = COUNTBLOCK;
  const boxList = data.map((d1) => {
    return (
      <>
        <div
          key={d1._id}
          className="col-5 col-md count-single-card p-0"
          style={{
            backgroundColor: `${d1.backgroundColor}`,
            border: `2px solid ${d1.borderColor}`,
            color: `${d1.color}`,
            borderRadius: "4px",
            height: "98px",
            top: "43px",
            width: "170px",
          }}
        >
          <div className=" d-flex flex-column h-100 p-3 justify-content-between">
            <h4 className="m-0 p-0">{d1.count}</h4>
            <h6 className="mx-0 mb-0 p-0">
              {d1.boxTitle}
            </h6>
          </div>
        </div>
      </>
    );
  });
  return (
    <div className="container-fluid count-block-styles px-0 mx-0">
      <div className="row mx-0 px-0">
        <h5>India</h5>
      </div>
      <div className="row count-div">{boxList}</div>
    </div>
  );
};

export default CountsBlockComponent;
