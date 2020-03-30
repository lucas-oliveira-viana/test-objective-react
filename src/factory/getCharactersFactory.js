const getCharactersFactory = data => data.map(item => ({ 
    id: item.id,
    name: item.attributes.names.en,
    image: item.attributes.image === null ? "" : item.attributes.image.original,
    description: `${item.attributes.description.substring(0, 250)}`.split('<br>'),
    media: item.relationships.mediaCharacters.links.related
}))

export default getCharactersFactory