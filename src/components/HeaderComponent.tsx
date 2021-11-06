import '../scss/headerComponent.scss';

const HeaderComponent = () => {
    return (
        <>
            <div className="mb-1 pt-3 pb-1 text-dark border-bottom" style={{ height: "58px", background: "#FFFFFF", boxShadow: "0px 4px 10px rgba(193, 193, 193, 0.25)", fontFamily: '"Montserrat", sans-serif' }}>
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md">
                            <img src="/assets/images/main-logo-white.png" alt="main-logo" width="143px" height="30.62px" />
                        </div>
                        <div className="col-12 col-md-5">
                            <ul className="list-unstyled d-flex">
                                <li className="mx-2 ms-auto nav-list-item">About</li>
                                <li className="mx-2">Resources</li>
                                <li className="mx-2">Schemes & Policies</li>
                                <li className="mx-2">Programs</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HeaderComponent
