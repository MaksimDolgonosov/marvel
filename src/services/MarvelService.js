

class MarvelService {
    _apiBase = `https://gateway.marvel.com:443/v1/public/`;
    _apiKey = `apikey=ce42db7a3f1a388b8377a41da89fb98d`;
    _offsetBase = 210;
    getResource = async (url) => {
        let res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`)
        }
        return await res.json();
    }

    getAllCharacters = async (offset=this._offsetBase) => {
        const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKey}`)
        return res.data.results.map(item => this._transformCharacter(item))
    }

    getCharacter = async (id) => {
        const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`)
        //  console.log(res);
        return this._transformCharacter(res.data.results[0])

    }

    _transformCharacter = (char) => {
        return {
            name: char.name,
            description: this.correctDescription(char.description),
            thumbnail: char.thumbnail.path + "." + char.thumbnail.extension,
            homepage: char.urls[0].url,
            viki: char.urls[1].url,
            id: char.id,
            comics: char.comics.items
        }
    }

    correctDescription = (descr) => {
        if (descr) {
            return descr.length > 175 ? descr.substring(0, 175) + "..." : descr;
        }
        return "No description for this character"
    }

}

export default MarvelService;