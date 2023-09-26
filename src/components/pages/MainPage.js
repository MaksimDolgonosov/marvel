import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import CharSearchForm from "../searchForm/CharSearchForm";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import { useState } from "react";
import SearchMain from "../searchMain/SearchMain";
import decoration from '../../resources/img/vision.png';
import { Helmet } from "react-helmet";

const MainPage = () => {
    const [charId, setCharId] = useState(null);
    const onCharSelected = (id) => {
        setCharId(id);
    }
    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content="Marvel information portal"
                />
                <title>Marvel information portal</title>
            </Helmet>
            <ErrorBoundary>
                <RandomChar />
            </ErrorBoundary>
            <SearchMain />
            <div className="char__content">
                <ErrorBoundary>
                    <CharList onCharSelected={onCharSelected} />
                </ErrorBoundary>
                <div>
                    <ErrorBoundary>
                        <CharInfo charId={charId} />
                    </ErrorBoundary>
                    <ErrorBoundary>
                        <CharSearchForm />
                    </ErrorBoundary>
                </div>

            </div>

            <img className="bg-decoration" src={decoration} alt="vision" />
        </>
    )
}

export default MainPage;