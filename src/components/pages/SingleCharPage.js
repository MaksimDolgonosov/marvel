import "./singleCharPage.scss";
import { useEffect, useState } from 'react';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../error/ErrorMessage';
import AppBanner from '../appBanner/AppBanner';
import { useParams, Link } from "react-router-dom";

const SingleCharPage = () => {
    const { charName } = useParams();
    const [char, setChar] = useState({});

    const { loading, error, clearError, getCharacterByName } = useMarvelService();

    const getCharacter = (name) => {
        getCharacterByName(name)
            .then(setChar);
    }

    useEffect(() => {
        clearError();
        getCharacter(charName)
        // eslint-disable-next-line
    }, [])

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    return (
        <>
            <AppBanner />
            {spinner}
            {errorMessage}
            <div className='single-char'>
                <div className='single-char__img'>
                    <img src={char.thumbnail} alt={char.name} />
                </div>
                <div className='single-char__descr'>
                    <h2 className='single-char__descr-title'>{char.name}</h2>
                    <div className='single-char__descr-text'>{char.description}</div>
                </div>
            </div>
            <Link to="/" className="single-char__back">Back to main page</Link>
        </>
    )
}

export default SingleCharPage;