import React from "react";
import Link from "next/link";
import {
  useRouter,
  usePathname,
  useParams,
  useSearchParams,
} from "next/navigation";

import { Container, Navbar, Nav } from "react-bootstrap";

import { useAuthContext } from "../contexts/AuthContext";

//******************************************************************************
// MAIN COMPONENT
//******************************************************************************

const Header = (props) => {
  //-----------------------------------
  // HOOKS & VARIABLES
  // ----------------------------------

  // Props
  const { user, logout } = useAuthContext();

  // Routers and Pathnames
  const router = useRouter();
  const pathname = usePathname();
  const { macaroon } = useParams();
  const searchParams = useSearchParams();

  // Aux Variables
  const inSharedHomePath = pathname === `/share/${macaroon}` ? true : false;
  const inSharedAboutPath =
    pathname === `/share/about/${macaroon}` ? true : false;
  const inHomePath = pathname === "/" ? true : false;
  const inAboutPath = pathname === "/about" ? true : false;

  //------------------------------------------
  // HANDLERS & AUX FUNCTIONS
  //------------------------------------------

  const handleOnClickLogout = (e) => {
    logout();
  };

  const handleOnClickHome = (e) => {
    router.push("/");
  };

  const handleOnClickHomeSharedPage = (e) => {
    router.push(`/share/about/${macaroon}?email=${searchParams.get("email")}`);
  };

  const handleOnClickAboutSharedPage = (e) => {
    router.push(`/share/${macaroon}?email=${searchParams.get("email")}`);
  };

  const handleOnClickAbout = (e) => {
    router.push("/about");
  };

  //------------------------------------------
  // JSX
  //------------------------------------------

  return (
    <>
      <Navbar bg="secondary" variant="dark">
        <Container>
          <Link href="/" passHref>
            <Navbar.Brand>
              <img
                alt=""
                src={"/assets/macaroon_logo.png"}
                width={32}
                height={32}
              />
              <p className="d-inline-block my-0 mx-2 align-middle">
                Macaroon Demo
              </p>
            </Navbar.Brand>
          </Link>
          <Nav className="ms-auto">
            {inHomePath && (
              <Nav.Link active onClick={handleOnClickAbout}>
                About
              </Nav.Link>
            )}
            {inAboutPath && (
              <Nav.Link active onClick={handleOnClickHome}>
                Home
              </Nav.Link>
            )}
            {inSharedAboutPath && (
              <Nav.Link active onClick={handleOnClickAboutSharedPage}>
                Home
              </Nav.Link>
            )}
            {inSharedHomePath && (
              <Nav.Link active onClick={handleOnClickHomeSharedPage}>
                About
              </Nav.Link>
            )}
            {(inHomePath || inAboutPath) && (
              <Nav.Link active onClick={handleOnClickLogout}>
                Logout
              </Nav.Link>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
