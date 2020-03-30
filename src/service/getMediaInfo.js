import axios from "axios"

const getCharacterMediaInfo = urlMedia => {
    return axios.get(urlMedia).then(ret => ({
            image: ret.data.data.attributes.posterImage.original,
            name: ret.data.data.attributes.titles.en
        })
    )
}  

export default getCharacterMediaInfo