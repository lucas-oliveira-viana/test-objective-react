import React, { useState } from 'react'
import './Input.css'

const Input = props => {
    const [target, setTarget] = useState({})

    const WAIT_INTERVAL = 1000

    const handleBlurInput = async (e) => {
        const characterName = target.value
        const ret = await props.getCharactersReq(0, characterName)
        props.setCharacters(ret.characters)
        props.setNumberOfPages(ret.numberOfPages)
        props.setName(characterName)
        props.restartPageIndex()
    }

    const typeDelay = (() => {
        let timer = 0;
        return (callback, interval) => {
            clearTimeout (timer);
            timer = setTimeout(callback, interval);
       };
    })();

    const handleChange = e => {
        setTarget(e.target)
        typeDelay(() => {
            handleBlurInput(e)
        }, WAIT_INTERVAL)
    }

    return (
        <div className="input__wrapper">
            <label htmlFor="input__content" className="input__label">{props.label}</label>
            <input className="input__content" onChange={handleChange}></input>
        </div>
    )
}

export default Input