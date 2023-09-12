import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import AppHeader from "../appHeader/AppHeader";
import MainPage from "../pages/MainPage";
//import ComicsPage from "../pages/ComicsPage";
import Page404 from "../pages/404";
import SingleComicPage from "../pages/SingleComicPage";
import Spinner from "../spinner/Spinner";

const ComicsPage = lazy(() => import("../pages/ComicsPage"))

const App = () => {
    return (
        <Router>
            <div className="app">
                <AppHeader />
                <main>
                    <Suspense fallback={<Spinner />}>
                        <Routes>
                            <Route path="/" element={<MainPage />} />
                            <Route path="/comics" element={<ComicsPage />} />
                            <Route path="/comics/:comicId" element={<SingleComicPage />}></Route>
                            <Route path="*" element={<Page404 />}>
                            </Route>
                        </Routes>
                    </Suspense>

                </main>
            </div>
        </Router>
    )


}



export default App;