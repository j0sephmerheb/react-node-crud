import React, { useState } from 'react';
import { Collapse, Navbar, NavbarBrand, Nav, NavItem, NavbarToggler } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const { loginWithRedirect, logout, user, isAuthenticated, isLoading } = useAuth0();
    
    // TEMP
    const admin = "josephmerheb@gmail.com";
    //

    if (isLoading) {
        return <div className="loader"></div>;
    }

    return (
        <Navbar color="dark" dark expand="md">
            <div className="container">
                <NavbarBrand className="mr-auto">My Movie Directory</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="ml-auto" navbar>

                        {!isAuthenticated && (
                            <NavItem>
                                <button onClick={() => loginWithRedirect()}>Log In</button>
                            </NavItem>
                        )}

                        {isAuthenticated && (
                            <>
                                <NavItem>
                                    <NavLink className="nav-link" to='/profile'>
                                        Welcome <strong className="text-secondary">{user.name}</strong>
                                    </NavLink>
                                </NavItem>

                                <NavItem>
                                    <button onClick={() => logout({ returnTo: window.location.origin })}>Log Out</button>
                                </NavItem>
                            </>
                        )}

                        <NavItem>
                            <NavLink className="nav-link" to='/'>Home</NavLink>
                        </NavItem>

                        {isAuthenticated && user.name === admin && (
                            <>
                                <NavItem>
                                    <NavLink className="nav-link" to='/movies/list'>Edit</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to='/movies/create'>Create</NavLink>
                                </NavItem>
                            </>
                        )}
                    </Nav>
                </Collapse>
            </div>
        </Navbar>
    );
}


export default Header;