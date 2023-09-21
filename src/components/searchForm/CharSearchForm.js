import "./charSearchForm.scss";
import { useState, useEffect } from "react";
import useMarvelService from "../../services/MarvelService";
import { useFormik } from 'formik';
import { object, string } from 'yup';
import { Link } from 'react-router-dom';


const CharSearchForm = () => {
    const [charName, setCharName] = useState("");
    const [char, setChar] = useState(null);
    const formik = useFormik({
        initialValues: { character: '' },
        validationSchema: object({ character: string().required('This field is required'), }),
        onSubmit: values => {
            setCharName(values.character);
        },
    });

    const { loading, clearError, getCharacterByName } = useMarvelService();

    useEffect(() => {
        clearError();
        getCharacter(charName);
        // eslint-disable-next-line
    }, [charName])

    const getCharacter = (name) => {
        if (name) {
            getCharacterByName(name)
                .then(res => setChar(res));
        }
    }
    const resultTrue = char ? <ResultTrue name={char.name} decr={char.description} /> : null;
    const resultFalse = (char === undefined) ? <ResultFalse /> : null;

    return (
        <form className="char__search-form" onSubmit={formik.handleSubmit}>
            <p className="char__search-title">Or find a character by name:</p>
            <div className="char__search-wrapper">
                <input
                    className="char__search-input"
                    name="character"
                    type="text"
                    placeholder="Enter name"
                    {...formik.getFieldProps("character")}></input>
                <button disabled={loading} onClick={formik.handleSubmit} type="submit" className="button button__main"><div className="inner">find</div></button>
                {formik.touched.character && formik.errors.character ? (<div className="char__search-requared">{formik.errors.character}</div>) : null}
            </div>

            {resultTrue}
            {resultFalse}
        </form>
    )
}


const ResultTrue = (props) => {
    return (
        <div className="char__search-results">
            <div className="char__search-message-true">There is! Visit {props.name} page?</div>
            <Link to={`/character/${props.name}`}>
                <button className="button button__secondary"><div className="inner">to page</div></button>
            </Link>


        </div>
    )
}

const ResultFalse = () => {
    return (
        <div className="char__search-results">
            <div className="char__search-message-false">The character was not found. Check the name and try again</div>
        </div>
    )
}




export default CharSearchForm;