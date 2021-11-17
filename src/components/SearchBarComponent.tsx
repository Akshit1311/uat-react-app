import { GoSearch } from 'react-icons/go';
import '../scss/searchBarComponent.scss';

const SearchBarComponent = () => {
    return (
        <div className="row d-flex flex-row justify-content-center align-items-center search-bar-comman-component">
            <div className="search input-group px-0">
                <span className="btn search-icon"><GoSearch /></span>
                <input type="text" className="form-control me-3 search-input shadow-none" placeholder="Search" />
                <button className="btn btn-primary btn-radius search-btn">Search</button>
            </div>
        </div>
    )
}

export default SearchBarComponent
