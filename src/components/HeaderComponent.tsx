import { Navbar, NavbarToggler, Collapse } from 'reactstrap';
import { useState } from 'react';
import '../scss/headerComponent.scss';

function HeaderComponent() {
    const [isNavOpen, setNavOpen] = useState(false);
    function toggleNav() {
        setNavOpen(!isNavOpen);
    }

    return (
        <>
            <Navbar light expand="md">
                <div className="container d-md-flex">
                    <div className="d-flex">
                        <NavbarToggler onClick={toggleNav} className="border-dark" style={{ padding: "1px 0px", margin: "3px" }} />
                        <div className="navbar-brand ms-md-1">
                            <img src="/assets/images/main-logo-white.png" alt="main-logo" width="143px" height="30.62px" />
                        </div>
                    </div>
                    <Collapse navbar isOpen={isNavOpen}>
                        <ul className="navbar-nav ms-auto pb-0">
                            <li className="mx-2 my-2 nav-item">About</li>
                            <li className="mx-2 my-2 nav-item">Resources</li>
                            <li className="mx-2 my-2 nav-item">Schemes & Policies</li>
                            <li className="mx-2 my-2 nav-item">Programs</li>
                        </ul>
                    </Collapse>
                </div>
            </Navbar>
        </>
    )
}

export default HeaderComponent
