import "./searchMain.scss";
import { useState } from "react";
import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import { Link } from 'react-router-dom';

const SearchMain = () => {
    const [char, setChar] = useState("");
    const [charInput, setCharInput] = useState("");

    const { loading, clearError, getCharacterByNameStartWidth } = useMarvelService();

    // useEffect(() => {
    //     getCharacterByNameStartWidth(char)
    //     .then(res=>console.log(res))
    // }, [char])

    const onGetChar = (name) => {
        setCharInput(name.target.value);
        if (name.target.value) { }
        getCharacterByNameStartWidth(name.target.value)
            .then(res => {
                clearError();
                if (res) {
                    setChar(res)
                }
            })
    }
    const spinner = loading ? <Spinner /> : null;
    const content = char ? <View charArr={char} /> : null;
    return (
        <>
            <input value={charInput} onChange={onGetChar} className="search-main__input" type="text" placeholder="Or find character by name..."></input>
            {spinner}
            {content}
        </>

    )
}


const View = ({ charArr }) => {
    const styleContent = charArr.length === 0 ? { 'borderBottom': 'none' } : { 'borderBottom': '2px solid $main-color' };
    const content = charArr.map(item => {
        return (
            <Link to={`/character/${item.name}`} key={item.id} className="founded-char">
                <img src={item.thumbnail} alt={item.name} />
                <div className="founded-char-name">{item.name}</div>
            </Link>
        )
    })

    return (
        <div style={styleContent} className="founded-chars">
            {content}
        </div>
    )
}

export default SearchMain;