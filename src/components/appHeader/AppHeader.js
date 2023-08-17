import './appHeader.scss';

const AppHeader = () => {
    return (
        <header className="app__header">
            <h1 className="app__title">
                <a href="#sdss">
                    <span>Marvel</span> information portal
                </a>
            </h1>
            <nav className="app__menu">
                <ul>
                    <li><a href="#ssss">Characters</a></li>
                    /
                    <li><a href="#ssss">Comics</a></li>
                </ul>
            </nav>
        </header>
    )
}

export default AppHeader;