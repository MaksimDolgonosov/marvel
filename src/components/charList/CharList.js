import { Component } from 'react';
import './charList.scss';
import Spinner from '../spinner/Spinner';
import MarvelService from '../../services/MarvelService'
import ErrorMessage from '../error/ErrorMessage';
class CharList extends Component {

    state = {
        char: [],
        loading: true,
        error: false,
        newItemLoading: false
    }
    marvelService = new MarvelService();

    onCharLoaded = (newChar) => {
        this.setState(({ char }) => (
            {
                char: [...char, ...newChar],
                loading: false,
                newItemLoading: false
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
    }

    onRequest = (offset) => {
        this.getAllCharacters(offset);
        this.setState({
            newItemLoading: true
        })
    }


    render() {
        const { loading, error } = this.state;
        let errorMessage = error ? <ErrorMessage /> : null;
        let spinner = loading ? <Spinner /> : null;
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

                    {/* <li className="char__item">
                        <img src={abyss} alt="abyss" />
                        <div className="char__name">Abyss</div>
                    </li>
                    <li className="char__item char__item_selected">
                        <img src={abyss} alt="abyss" />
                        <div className="char__name">Abyss</div>
                    </li>
                    <li className="char__item">
                        <img src={abyss} alt="abyss" />
                        <div className="char__name">Abyss</div>
                    </li>
                    <li className="char__item">
                        <img src={abyss} alt="abyss" />
                        <div className="char__name">Abyss</div>
                    </li>
                    <li className="char__item">
                        <img src={abyss} alt="abyss" />
                        <div className="char__name">Abyss</div>
                    </li>
                    <li className="char__item">
                        <img src={abyss} alt="abyss" />
                        <div className="char__name">Abyss</div>
                    </li>
                    <li className="char__item">
                        <img src={abyss} alt="abyss" />
                        <div className="char__name">Abyss</div>
                    </li>
                    <li className="char__item">
                        <img src={abyss} alt="abyss" />
                        <div className="char__name">Abyss</div>
                    </li>
                    <li className="char__item">
                        <img src={abyss} alt="abyss" />
                        <div className="char__name">Abyss</div>
                    </li> */}
                </ul>
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }

}

export default CharList;