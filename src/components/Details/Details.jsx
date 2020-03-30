import Image from '../character/Image/Image'
import './Details.css'
import React from 'react'

const Details = props => {

    const handleCloseClick = () => props.setDetailsModal(false)

    return (<div className="modal">
        <div className="modal__details">
            <div className="modal__close" onClick={handleCloseClick}></div>
            <div className="details__character">
                <span className="character__name">{props.character.name}</span>
                <Image image={props.character.image}/>
            </div>
            <div className="medias__wrapper">
                <span className="medias__text">Aparece em:</span>
                <div className="details__medias">
                    {props.character.medias.map(media => (
                        <div className="medias__media">
                            <img className="media__poster" alt="" src={media.image} />
                            <span className="media__name">{media.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        <div className="modal__overlay" onClick={handleCloseClick}></div>
    </div>
    )
}

export default Details