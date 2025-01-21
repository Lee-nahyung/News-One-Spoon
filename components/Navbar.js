import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NavbarContainer = styled.nav`
    display: flex;
    align-items: center;
    background-color: #d46618;
    padding: 40px 50px;
`;

const Logo = styled(Link)`
    color: white;
    text-decoration: none;
    font-size: 36px;
    font-weight: bold;
`;

const NavLinks = styled.ul`
    list-style: none;
    display: flex;
    gap: 1rem;
    margin-left: 2rem; 
`;

const NavLink = styled(Link)`
    color: white;
    text-decoration: none;

    &:hover {
        background-color: white;  
        color: black; 
    }
`;

const Navbar = () => {
    return (
        <NavbarContainer>
            <Logo to="/">TruckSiteFinder</Logo>
            <NavLinks>
                <li><NavLink to="/home">홈</NavLink></li>
                <li><NavLink to="/recruitments">최근 공모</NavLink></li>
                <li><NavLink to="/commercial">상권 분석 정보</NavLink></li>
                <li><NavLink to="/regulations">규제 정보</NavLink></li>
            </NavLinks>
        </NavbarContainer>
    );
};

export default Navbar;
