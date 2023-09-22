import "./searchMain.scss";
import { useState, useEffect } from "react";
import useMarvelService from "../../services/MarvelService";
import { useFormik } from 'formik';
import { object, string } from 'yup';
import { Link } from 'react-router-dom';

const SearchMain = () => {


    return (
        <form>
            <input className="search-main__input" type="text" placeholder="Or find character by name..."></input>
        </form>

    )
}

export default SearchMain;