import { Component } from 'react';
import './charInfo.scss';
import MarvelService from '../../services/MarvelService';
import Skeleton from '../skeleton/Skeleton';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../error/ErrorMessage';

class CharInfo extends Component {
    state = {
        char: null,
        loading: false,
        error: false
    }

    marvelServise = new MarvelService();

    onCharLoaded = (char) => {
        this.setState({
            char,
            loading: false
        })
        
    }
    onCharLoading = () => {
        this.setState({
            char: null,
            loading: true
        })
    }

    componentDidMount = () => {

        this.updateCharacter();
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (this.props.charId !== prevProps.charId) {
            this.updateCharacter();
        }
    }



    onErrorChange = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    updateCharacter = () => {

        //this.marvelServise.getAllCharacters().then(res => console.log(res));
        if (this.props.charId) {
            this.onCharLoading();
            this.marvelServise.getCharacter(this.props.charId)
                .then(this.onCharLoaded)
                .catch(this.onErrorChange)
        }

    }



    render() {

        const { char, loading, error } = this.state
        const errorMessage = error ? <ErrorMessage /> : null;
        const spinner = loading ? <Spinner /> : null;
        const skeleton = !loading && !error && !char ? <Skeleton /> : null;
        const content = char ? <View char={char} /> : null;
        return (
            <div className="char__info">
                {skeleton}
                {spinner}
                {errorMessage}
                {content}
            </div>
        )

    }



}
const View = ({ char }) => {
    const { name, description, thumbnail, homepage, wiki, comics } = char;
    const styleObjFit = thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg" ? true : false;
    const comicsList = comics.map((item, i) => {
        return (
            <li className="char__comics-item" key={i}>{item.name}</li>
        )
    })
    const emptyList = comicsList.length === 0 ? "No comics with this character" : null;
    const longList = comicsList.length > 10 ? comicsList.slice(0, 10) : null;
    const viewList = !emptyList && !longList ? comicsList : null;
    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={styleObjFit ? { objectFit: "contain" } : { objectFit: "cover" }} />
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {emptyList}
                {longList}
                {viewList}
            </ul>
        </>
    )
}

export default CharInfo;