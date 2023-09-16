import { useState, useEffect } from 'react';
import './randomChar.scss';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../error/ErrorMessage';
import mjolnir from '../../resources/img/mjolnir.png';
//import MarvelService from "../../services/MarvelService";
import useMarvelService from '../../services/MarvelService';
//import { ThreeDots } from 'react-loader-spinner'
//import { CSSTransition, SwitchTransition, TransitionGroup } from 'react-transition-group';
//import { motion } from "framer-motion";
import { motion } from "framer-motion"
const RandomChar = (props) => {
    const [char, setChar] = useState({});

    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(false);

    // state = {
    //     char: {},
    //     loading: true,
    //     error: false
    // }
    const { loading, error, clearError, getCharacter } = useMarvelService();

    const onTryIt = () => {
        clearError();
        updateCharacter();
    }

    // const onCharLoaded = (char) => {
    //     setChar(char);

    // }

    // const componentDidMount = () => {
    //     // this.timerId = setInterval(this.updateCharacter, 3000);
    //     updateCharacter();
    // }
    useEffect(() => {
        updateCharacter();
        const timerId = setInterval(updateCharacter, 3000);
        return clearInterval(timerId);
        // eslint-disable-next-line
    }, []);

    // componentWillUnmount = () => {
    //     // clearInterval(this.timerId);
    // }




    const updateCharacter = () => {
        const id = Math.round(Math.random() * (1011400 - 1011001) + 1011001);
        //this.marvelServise.getAllCharacters().then(res => console.log(res));
        getCharacter(id)
            .then(char => setChar(char))

    }

    // const { name, description, thumbnail, homepage, viki } = char;
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error) ? <View name={char.name} description={char.description} thumbnail={char.thumbnail} homepage={char.homepage} viki={char.viki} id={char.id} /> : null;
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
                    <div onClick={onTryIt} className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />

            </div >
        </div >
    )
}


const View = (props) => {
    const { name, description, thumbnail, homepage, viki } = props;
    const styleObjFit = thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg" ? true : false;
    return (




        <motion.div
            className="randomchar__block"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
        >
            <img src={thumbnail} alt="Random character" style={styleObjFit ? { objectFit: "contain" } : { objectFit: "cover" }} className="randomchar__img" />
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
        </motion.div>

    )
}

export default RandomChar;