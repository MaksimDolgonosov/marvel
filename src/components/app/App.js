import { useState } from "react";
import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";


import decoration from '../../resources/img/vision.png';



const App = () => {
    const [charId, setCharId] = useState(null);



    const onCharSelected = (id) => {
        setCharId(id);
    }

        return (
            <div className="app">
                <AppHeader />
                <main>
                    <ErrorBoundary>
                        <RandomChar />
                    </ErrorBoundary>
                    {/* <div className="char__content">
                        <ErrorBoundary>
                            <CharList onCharSelected={onCharSelected} />
                        </ErrorBoundary>
                        <ErrorBoundary>
                            <CharInfo charId={charId} />
                        </ErrorBoundary>

                    </div> */}
                    <img className="bg-decoration" src={decoration} alt="vision" />
                </main>
            </div>
        )
    

}



export default App;