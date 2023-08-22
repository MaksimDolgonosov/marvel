import { Component } from 'react';
import PropTypes from 'prop-types';
import './charList.scss';
import Spinner from '../spinner/Spinner';
import MarvelService from '../../services/MarvelService'
import ErrorMessage from '../error/ErrorMessage';
class CharList extends Component {

    state = {
        char: [],
        loading: true,
        error: false,
        newItemLoading: false,
        offset: 1551,
        charEnded: false
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


    render() {
        const { loading, error, newItemLoading, offset, charEnded } = this.state;
        let errorMessage = error ? <ErrorMessage /> : null;
        let spinner = loading ? <Spinner /> : null;
        let newItems = newItemLoading ? <Spinner /> : null;
        const allCharacters = this.state.char.map(item => {
            const styleObjFit = item.thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg" ? true : false;
            return (
                <li className="char__item" key={item.id} onClick={() => this.props.onCharSelected(item.id)} >
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