import axios from "axios"
import getCharactersFactory from '../factory/getCharactersFactory'

const getCharacters = reqObj => {
    const url = reqObj.name === '' ? 
        `https://kitsu.io/api/edge/characters?page[limit]=10&page[offset]=${reqObj.range}` :
        `https://kitsu.io/api/edge/characters?filter[name]=${reqObj.name}
                               &page[limit]=10&page[offset]=${reqObj.range}`
                               
    return axios.get(url)
                .then(ret => ({ 
                    characters: getCharactersFactory(ret.data.data),
                    numberOfPages: parseInt(ret.data.links.last.split('offset%5D=')[1])
                }))
}

export default getCharacters