import { GoSearch } from "react-icons/go";
import "../scss/searchBarComponent.scss";
import { Button } from "../styles-components/Button";

interface SearchTypes {
  background?: string;
  borderRadius?: string;
  placeholderClass?: string;
}

const SearchBarComponent = ({
  background,
  borderRadius,
  placeholderClass,
}: SearchTypes) => {
  const borderRadiusAll = borderRadius ? borderRadius : "0px";
  const backgroundAll = background ? background : "#f8f8f8";
  return (
    <div className="row d-flex flex-row justify-content-center align-items-center search-bar-comman-component m-0">
      <div
        className="search input-group px-0"
        style={{
          borderTopLeftRadius: borderRadiusAll,
          borderBottomLeftRadius: borderRadiusAll,
          overflow: "hidden",
        }}
      >
        <span className="btn search-icon" style={{ background: backgroundAll }}>
          <GoSearch style={{ marginTop: "-2px" }} />
        </span>
        <input
          type="text"
          className={`form-control me-3 px-0 search-input shadow-none search-bar-placeholder ${placeholderClass}`}
          placeholder="Search"
          style={{
            background: backgroundAll,
            color: "black",
            borderTopRightRadius: borderRadiusAll,
            borderBottomRightRadius: borderRadiusAll,
          }}
        />
        <Button width={"111px"} className="font-family-Mont btn-radius">Search</Button>
      </div>
    </div>
  );
};

export default SearchBarComponent;
