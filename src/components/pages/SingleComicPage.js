import "./singleComicPage.scss";
//import xMen from '../../resources/img/x-men.png';

import { useEffect, useState } from 'react';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../error/ErrorMessage';
import { Helmet } from "react-helmet";
import { useParams, Link } from "react-router-dom";

const SingleComicPage = () => {
    const { comicId } = useParams();
    const [comic, setComic] = useState(null);
    const { loading, error, clearError, getComic } = useMarvelService()

    const onCharLoaded = (char) => {
        setComic(char);
    }
    const onCharLoading = () => {
        setComic(null);

    }
    useEffect(() => {
        updateCharacter();
        // eslint-disable-next-line
    }, [])

    // useEffect(() => {
    //     clearError();
    //     updateCharacter();
    //     // eslint-disable-next-line
    // }, [comicId])

    const updateCharacter = () => {
        clearError()
        if (comicId) {
            onCharLoading();
            getComic(comicId)
                .then(onCharLoaded)

        }

    }

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = comic ? <View char={comic} /> : null;
    return (
        <>

            {spinner}
            {errorMessage}
            <div className="single-comic">
                <Helmet>
                    <meta
                        name="description"
                        content="Marvel comic information"
                    />
                    <title>Comic</title>
                </Helmet>
                {content}
                <Link to="/comics/" className="single-comic__back">Back to all</Link>
            </div>
        </>
    )
}


const View = ({ char }) => {
    const { title, description, image, price, pageCount, language } = char;

    return (
        <>
            <img src={image} alt="x-men" className="single-comic__img" />
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount} pages</p>
                <p className="single-comic__descr">Language: {language}</p>
                <div className="single-comic__price">{price}$</div>
            </div>


        </>
    )
}

export default SingleComicPage;