import { Component } from 'react';
import './randomChar.scss';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../error/ErrorMessage';
import mjolnir from '../../resources/img/mjolnir.png';
import MarvelService from "../../services/MarvelService";


class RandomChar extends Component {
    constructor(props) {
        super(props)
        console.log("constructor");
        this.state = {
            char: {},
            loading: true,
            error: false
        }
        this.updateCharacter();
    }
    marvelServise = new MarvelService();

    onCharLoaded = (char) => {
        console.log("load new character");
        this.setState({
            char,
            loading: false
        })
    }

    onErrorChange = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    updateCharacter = () => {
        const id = Math.round(Math.random() * (1011400 - 1011001) + 1011001);
        //this.marvelServise.getAllCharacters().then(res => console.log(res));
        this.marvelServise.getCharacter(id)
            .then(this.onCharLoaded)
            .catch(this.onErrorChange)
    }


    render() {
        console.log("render");
        const { char: { name, description, thumbnail, homepage, viki }, loading, error } = this.state
        const errorMessage = error ? <ErrorMessage /> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = !(loading || error) ? <View name={name} description={description} thumbnail={thumbnail} homepage={homepage} viki={viki} /> : null;
        return (
            <div className="randomchar">
                {errorMessage}
                {spinner}
                {content}
                < div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br />
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button className="button button__main">
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />

                </div >
            </div >
        )
    }

}


const View = (props) => {
    const { name, description, thumbnail, homepage, viki } = props
    return (
        <div className="randomchar__block">
            <img src={thumbnail} alt="Random character" className="randomchar__img" />
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">{description}</p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={viki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar;