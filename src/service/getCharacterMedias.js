import axios from "axios"

const getCharacterMedias = urlMedia => {
    return axios.get(urlMedia).then(ret =>
        ret.data.data.map(characterMedia => {
            return characterMedia.relationships.media.links.related
        })) 
}

export default getCharacterMedias