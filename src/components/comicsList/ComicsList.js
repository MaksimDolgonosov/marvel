import './comicsList.scss';
import useMarvelService from '../../services/MarvelService';
import { useEffect, useState } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../error/ErrorMessage';


const ComicsList = () => {
    const [comics, setComics] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(120);
    const { getAllComics, loading, error, clearError } = useMarvelService();

    useEffect(() => {
        getComics();
        // eslint-disable-next-line
    }, [])

    const getComics = () => {
        getAllComics().then(res => setComics(res));

    }

    const onComLoaded = (newComics) => {
        clearError();
        setComics(comics => [...comics, ...newComics]);
        setNewItemLoading(false);
        setOffset(offset => offset + 9);
    }

    const onRequest = () => {
        setNewItemLoading(true);
        getAllComics(offset)
            .then(onComLoaded)

    }

    let errorMessage = error ? <ErrorMessage /> : null;
    let spinner = loading ? <Spinner /> : null;

    const comicsArr = comics.map((item, i) => {
        return (
            <li key={i} className="comics__item">
                <a href={item.link}>
                    <img src={item.thumbnail} alt="ultimate war" className="comics__item-img" />
                    <div className="comics__item-name">{item.title}</div>
                    <div className="comics__item-price">{item.price === 0 ? "Not avaliable" : `${item.price}$`}</div>
                </a>
            </li>
        )
    })
    console.log("render");
    return (
        <div className="comics__list">
            <ul className="comics__grid">
                {comicsArr}
                {errorMessage}
                {/* <li className="comics__item">
                    <a href="#">
                        <img src={uw} alt="ultimate war" className="comics__item-img" />
                        <div className="comics__item-name">ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB</div>
                        <div className="comics__item-price">9.99$</div>
                    </a>
                </li>
                <li className="comics__item">
                    <a href="#">
                        <img src={xMen} alt="x-men" className="comics__item-img" />
                        <div className="comics__item-name">X-Men: Days of Future Past</div>
                        <div className="comics__item-price">NOT AVAILABLE</div>
                    </a>
                </li>
                <li className="comics__item">
                    <a href="#">
                        <img src={uw} alt="ultimate war" className="comics__item-img" />
                        <div className="comics__item-name">ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB</div>
                        <div className="comics__item-price">9.99$</div>
                    </a>
                </li>
                <li className="comics__item">
                    <a href="#">
                        <img src={xMen} alt="x-men" className="comics__item-img" />
                        <div className="comics__item-name">X-Men: Days of Future Past</div>
                        <div className="comics__item-price">NOT AVAILABLE</div>
                    </a>
                </li>
                <li className="comics__item">
                    <a href="#">
                        <img src={uw} alt="ultimate war" className="comics__item-img" />
                        <div className="comics__item-name">ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB</div>
                        <div className="comics__item-price">9.99$</div>
                    </a>
                </li>
                <li className="comics__item">
                    <a href="#">
                        <img src={xMen} alt="x-men" className="comics__item-img" />
                        <div className="comics__item-name">X-Men: Days of Future Past</div>
                        <div className="comics__item-price">NOT AVAILABLE</div>
                    </a>
                </li>
                <li className="comics__item">
                    <a href="#">
                        <img src={uw} alt="ultimate war" className="comics__item-img" />
                        <div className="comics__item-name">ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB</div>
                        <div className="comics__item-price">9.99$</div>
                    </a>
                </li>
                <li className="comics__item">
                    <a href="#">
                        <img src={xMen} alt="x-men" className="comics__item-img" />
                        <div className="comics__item-name">X-Men: Days of Future Past</div>
                        <div className="comics__item-price">NOT AVAILABLE</div>
                    </a>
                </li> */}
            </ul>
            {spinner}
            <button
                className="button button__main button__long"
                disabled={newItemLoading}
                onClick={onRequest}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;