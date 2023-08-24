import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './charList.scss';
import Spinner from '../spinner/Spinner';
import MarvelService from '../../services/MarvelService'
import ErrorMessage from '../error/ErrorMessage';
class CharList extends Component {
    myRef = React.createRef();

    state = {
        char: [],
        loading: true,
        error: false,
        newItemLoading: false,
        offset: 1551,
        charEnded: false,
        checkedId: null
    }
    marvelService = new MarvelService();

    onCharLoaded = (newChar) => {
        let ended = false;
        if (newChar.length < 9) {
            ended = true;
        }

        this.setState(({ offset, char, charEnded }) => (
            {
                char: [...char, ...newChar],
                loading: false,
                newItemLoading: false,
                offset: offset + 9,
                charEnded: ended
            }
        ));

    }

    onErrorChange = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    getAllCharacters = (offset) => {
        this.marvelService.getAllCharacters(offset)
            .then(this.onCharLoaded)
            .catch(this.onErrorChange)
    }

    componentDidMount = () => {
        this.getAllCharacters();
        window.addEventListener("scroll", this.onScroll);
    }

    componentWillUnmount = () => {
        window.removeEventListener("scroll", this.onScroll);
    }

    onScroll = () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
            if (!this.state.charEnded) {
                document.querySelector(".button__long").click();
            }
        }

    }

    onRequest = (offset) => {
        this.setState({
            newItemLoading: true
        })
        this.getAllCharacters(offset);

    }
    onCheckChar = (itemId) => {
        this.props.onCharSelected(itemId)
        this.setState({
            checkedId: itemId
        })
    }

    render() {
        const { loading, error, newItemLoading, offset, charEnded, checkedId } = this.state;
        let errorMessage = error ? <ErrorMessage /> : null;
        let spinner = loading ? <Spinner /> : null;
        let newItems = newItemLoading ? <Spinner /> : null;
    
        const allCharacters = this.state.char.map(item => {
            const styleObjFit = item.thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg" ? true : false;
            return (
                <li className={"char__item" + (item.id === checkedId ? " char__item_selected" : "")} key={item.id} onClick={() => this.onCheckChar(item.id)} ref={this.myRef} tabIndex={0}>
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
                    onClick={() => this.onRequest(offset)}
                    disabled={newItemLoading}
                    style={{ display: charEnded ? "none" : "block" }}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }

}
CharList.propTypes = {
    onCharSelected: PropTypes.func
};

export default CharList;