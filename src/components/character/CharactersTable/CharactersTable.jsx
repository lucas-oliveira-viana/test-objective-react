import getCharacterMediasService from '../../../service/getCharacterMedias'
import getMediaInfo from '../../../service/getMediaInfo'
import Image from '../Image/Image'
import Name from '../Name/Name'
import Description from '../Description/Description'
import './CharactersTable.css'
import React from 'react'

const CharactersTable = props => {

    const handleCharacterClick = async character => {
        const ret = await getCharacterMediasService(character.media)
        character.medias = await Promise.all(ret.map(async mediaUrl => await getMediaInfo(mediaUrl)))
        props.setDetailsCharacter(character)
        props.setDetailsModal(true)
    }

    return (
        <table className="characters__table">
            <tr className="table__head">
                <th className="head__item head__item_name">Nome</th>
                <th className="head__item head__item_description">Descrição</th>
            </tr>
            {props.characters === undefined ? [] : (props.characters.map(item =>
                <tr className="table__character" onClick={() => handleCharacterClick(item)} key={item.id}>
                    <td className="character__identity" key={item.id}>
                        <div className="identity__wrapper">
                            <Image image={item.image}/>
                            <Name name={item.name} />
                        </div>
                    </td>
                    <td className="character__description">
                        <Description description={item.description} />
                    </td>
                </tr>
            ))}
        </table>
    )
}

export default CharactersTable