import { useEffect, useState } from 'react';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../error/ErrorMessage';
import AppBanner from '../appBanner/AppBanner';
import { useParams, Link, useNavigate } from "react-router-dom";

const SingleCharPage = () => {
    const { charName } = useParams();
    return (
        <>
            <AppBanner />
            <h2>{charName}</h2>
        </>
    )
}

export default SingleCharPage;