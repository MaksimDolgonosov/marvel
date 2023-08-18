import { Component } from 'react';
import './charList.scss';
import Spinner from '../spinner/Spinner';
import MarvelService from '../../services/MarvelService'
class CharList extends Component {

    state = {
        char: [],
        loading: true
    }
    marvelService = new MarvelService();

    onCharLoaded = (char) => {
        this.setState({
            char,
            loading: false
        });

    }

    getAllCharacters = () => {
        this.marvelService.getAllCharacters()
            .then(this.onCharLoaded);
    }

    componentDidMount = () => {
        this.getAllCharacters();
    }

    render() {
        const { loading } = this.state;
        let spinner = loading ? new Array(9).fill(<Spinner />)  : null;
        const allCharacters = this.state.char.map(item => {
            const styleObjFit = item.thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg" ? true : false;
            return (
                <li className="char__item" key={item.id} >
                    <img src={item.thumbnail} style={styleObjFit ? { objectFit: "contain" } : { objectFit: "cover" }} alt="character" />
                    <div className="char__name">{item.name}</div>
                </li >
            )
        })

        return (
            <div className="char__list" >
                <ul className="char__grid">
                    {spinner}
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