import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {
    const { loading, error, request, clearError } = useHttp();
    const _apiBase = `https://gateway.marvel.com:443/v1/public/`;
    const _apiKey = `apikey=ce42db7a3f1a388b8377a41da89fb98d`;
    const _offsetBase = 210;
    // getResource = async (url) => {
    //     let res = await fetch(url);
    //     if (!res.ok) {
    //         throw new Error(`Could not fetch ${url}, status: ${res.status}`)
    //     }
    //     return await res.json();
    // }

    const getAllCharacters = async (offset = _offsetBase) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`)
        // console.log(res.data.results.map(item => _transformCharacter(item)));
        return res.data.results.map(item => _transformCharacter(item))

    }

    const getAllComics = async (offset = 100) => {
        const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`)

        // return res.data.results;
        //console.log(res.data.results.map(item => _transformComics(item)));
        return res.data.results.map(item => _transformComics(item))

    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`)
        //  console.log(res);
        return _transformCharacter(res.data.results[0])

    }

    const _transformCharacter = (char) => {
        return {
            name: char.name,
            description: correctDescription(char.description),
            thumbnail: char.thumbnail.path + "." + char.thumbnail.extension,
            homepage: char.urls[0].url,
            viki: char.urls[1].url,
            id: char.id,
            comics: char.comics.items
        }
    }
    const _transformComics = (comics) => {
        return {
            title: comics.title,
            thumbnail: comics.thumbnail.path + "." + comics.thumbnail.extension,
            id: comics.id,
            link: comics.urls[0].url,
            price: comics.prices[0].price
        }
    }

    const correctDescription = (descr) => {
        if (descr) {
            return descr.length > 175 ? descr.substring(0, 175) + "..." : descr;
        }
        return "No description for this character"
    }
    return { loading, error, clearError, getAllCharacters, getCharacter, getAllComics }
}

export default useMarvelService;