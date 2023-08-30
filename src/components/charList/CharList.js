import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './charList.scss';
import Spinner from '../spinner/Spinner';
import MarvelService from '../../services/MarvelService'
import ErrorMessage from '../error/ErrorMessage';


const CharList = (props) => {
    const myRef = React.createRef();

    const [char, setChar] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(1551);
    const [charEnded, setCharEnded] = useState(false);
    const [checkedId, setcheckedId] = useState(null);

    const marvelService = new MarvelService();

    function onCharLoaded(newChar) {
        let ended = false;
        console.log(newChar.length)
        if (newChar.length < 9) {
            ended = true;
        }

        setChar(char => [...char, ...newChar]);
        setLoading(false);
        setNewItemLoading(false);
        setOffset(offset => offset + 9);
        setCharEnded(charEnded => ended);
        // this.setState(({ offset, char, charEnded }) => (
        //     {
        //         char: [...char, ...newChar],
        //         loading: false,
        //         newItemLoading: false,
        //         offset: offset + 9,
        //         charEnded: ended
        //     }
        // ));

    }

    const onErrorChange = () => {
        setError(true);
        setLoading(false);
    }

    const getAllCharacters = (offset) => {
        marvelService.getAllCharacters(offset)
            .then(onCharLoaded)
            .catch(onErrorChange)
    }

    useEffect(() => {
        getAllCharacters();
        window.addEventListener("scroll", onScroll);
        return () => {
            window.removeEventListener("scroll", onScroll);
        }
        // eslint-disable-next-line
    }, [])



    function onScroll() {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
            console.log(charEnded)
            document.querySelector(".button__long").click();
            if (charEnded) {
                document.querySelector(".button__long").click();
            }
        }

    }

    const onRequest = (offset) => {
        setNewItemLoading(true);
        getAllCharacters(offset);

    }
    const onCheckChar = (itemId) => {
        props.onCharSelected(itemId)
        setcheckedId(itemId)
    }



    let errorMessage = error ? <ErrorMessage /> : null;
    let spinner = loading ? <Spinner /> : null;
    let newItems = newItemLoading ? <Spinner /> : null;

    const allCharacters = char.map(item => {
        const styleObjFit = item.thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg" ? true : false;
        return (
            <li className={"char__item" + (item.id === checkedId ? " char__item_selected" : "")} key={item.id} onClick={() => onCheckChar(item.id)} ref={myRef} tabIndex={0}>
                <img src={item.thumbnail} style={styleObjFit ? { objectFit: "contain" } : { objectFit: "cover" }} alt="character" />
                <div className="char__name">{item.name}</div>
            </li >
        )
    })

    return (
        <div className="char__list" >
            {spinner}
            {errorMessage}
            <ul className="char__grid">
                {allCharacters}
            </ul>
            {newItems}
            <button className="button button__main button__long"
                onClick={() => onRequest(offset)}
                disabled={newItemLoading}
                style={{ display: charEnded ? "none" : "block" }}>
                <div className="inner">load more</div>
            </button>
        </div>
    )


}
CharList.propTypes = {
    onCharSelected: PropTypes.func
};

export default CharList;