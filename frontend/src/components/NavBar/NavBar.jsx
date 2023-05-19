import { Navbar } from "flowbite-react";
import { useState } from "react";
import Auth from "../Auth/Auth";

const NavBar = () => {
  const [displayAuth, setDisplayAuth] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <>
      {!isLoggedIn && displayAuth && <Auth setIsLoggedIn={setIsLoggedIn} />}
      <Navbar fluid={true} rounded={true}>
        <Navbar.Brand to="/">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="mr-3 h-6 sm:h-9"
            alt="Flowbite Logo"
          />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Smash or Naw
          </span>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Navbar.Link
            className="text-black md:hover:text-red-400 md:active:text-red-400"
            href="/"
            active={true}
          >
            Home
          </Navbar.Link>
          <Navbar.Link className="text-black md:hover:text-red-400" href="/">
            About
          </Navbar.Link>
          <Navbar.Link className="text-black md:hover:text-red-400" href="/">
            Services
          </Navbar.Link>
          <Navbar.Link className="text-black md:hover:text-red-400" href="/">
            Pricing
          </Navbar.Link>
          <Navbar.Link className="text-black md:hover:text-red-400" href="/">
            Contact
          </Navbar.Link>
          <Navbar.Link
            className="text-black md:hover:text-red-400 hover:cursor-pointer"
            onClick={() => setDisplayAuth(!displayAuth)}
          >
            Login
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default NavBar;
