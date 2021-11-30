import { Navbar, NavbarToggler, Collapse } from "reactstrap";
import { useState } from "react";
import "../scss/headerComponent.scss";
import { useContext } from "react";
import { ThemeContext } from "../config/context";
import { NAVBAR_HEIGHT } from "../config/context";

interface HeaderComponentProps {}

function HeaderComponent(props: HeaderComponentProps) {
  const [isNavOpen, setNavOpen] = useState(false);
  const theme = useContext(ThemeContext);
  const toggleNav = () => setNavOpen(!isNavOpen);
  const themeStyle = {
    background: theme.bgColorStart,
    boxShadow:
      theme.dropDownColorCode === 1
        ? "0px 0px 10px rgba(193, 193, 193, 0.25)"
        : "none",
    color: theme.color,
    height: NAVBAR_HEIGHT,
  };
  return (
    <>
      <Navbar
        dark
        expand="md"
        className="header-component-styles"
        style={themeStyle}
      >
        <div className="container-fluid d-md-flex navbar">
          <div className="d-flex my-1 my-md-0chrome">
            <NavbarToggler onClick={toggleNav} className="toggler" />
            <div className="navbar-brand ms-md-1 mt-1">
              <img
                src="/assets/images/main-logo-white.png"
                alt="main-logo"
                width="143px"
                height="30.62px"
              />
            </div>
          </div>
          <Collapse navbar isOpen={isNavOpen}>
            <ul className="navbar-nav ms-auto pb-0">
              <li className="mx-3 my-2 nav-item">About</li>
              <li className="mx-3 my-2 nav-item">Resources</li>
              <li className="mx-3 my-2 nav-item">Schemes & Policies</li>
              <li className="mx-3 my-2 nav-item">Programs</li>
            </ul>
          </Collapse>
        </div>
      </Navbar>
    </>
  );
}

export default HeaderComponent;
