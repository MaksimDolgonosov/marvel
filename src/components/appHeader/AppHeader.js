import './appHeader.scss';
import {  NavLink } from 'react-router-dom';
const AppHeader = () => {
    return (
        <header className="app__header">
            <h1 className="app__title">
                <NavLink exact to="/">
                    <span>Marvel</span> information portal
                </NavLink>
            </h1>
            <nav className="app__menu">
                <ul>
                    <li><NavLink exact to="/" activeStyle={{ "color": "red" }}>Characters</NavLink></li>
                    /
                    <li><NavLink exact to="/comics" activeStyle={{ "color": "red" }}>Comics</NavLink></li>
                </ul>
            </nav>
        </header>
    )
}

export default AppHeader;