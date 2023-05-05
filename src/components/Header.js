import React from "react"
import { NavLink } from "react-router-dom"

const Header = () => {
  return (
    <header className="header">
      <nav className="header__wrapper">
        <ul className="menu">
          <li className="menu-logo">
            <NavLink to="/">UNSPLASH APP</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
