import getCharactersService from '../../service/getCharacters'
import './Main.css'
import Header from '../Header/Header'
import Input from '../Input/Input'
import Pagination from '../Pagination/Pagination'
import Details from '../Details/Details'
import CharactersTable from '../character/CharactersTable/CharactersTable'
import React, { useState, useEffect } from 'react'

const Main = () => {
    const [characters, setCharacters] = useState([]);
    const [name, setName] = useState('');
    const [numberOfPages, setNumberOfPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(0);
    const [pagesIndexQuantity, setPagesIndexQuantity] = useState([])
    const [loading, setLoading] = useState(false)
    const [detailsModal, setDetailsModal] = useState(false)
    const [detailsCharacter, setDetailsCharacter] = useState({})

    const MOBILE_WIDTH_PIXELS = 500

    useEffect( () => {
        (async () => {
            const ret = await getCharactersReq(0, '')
            setCharacters(ret.characters)
            setNumberOfPages(ret.numberOfPages)

            const setIndexQuantityByScreenSize = numberOfPages => window.outerWidth > MOBILE_WIDTH_PIXELS 
            && numberOfPages > 3 ? setPagesIndexQuantity(createArrayKeysByNumber(6)) : 
                                   setPagesIndexQuantity(createArrayKeysByNumber(3))

            setIndexQuantityByScreenSize(ret.numberOfPages);
        })()
    }, [])

    const getCharactersReq = async (range, name) => {
        setLoading(true)
        const ret = await getCharactersService({ range: range, name: name })
        setLoading(false)
        return ret;
    }

    const characterUpdateActions = async (range, name = '') => {
        const ret = await getCharactersReq(range, name)
        setCharacters(ret.characters)
    }

    const createArrayKeysByNumber = number => [...Array(number).keys()].map(item => item + 1)

    const restartPageIndex = () => {
        setPagesIndexQuantity(createArrayKeysByNumber(pagesIndexQuantity.length))
        setCurrentPage(0)
    }

    return (
        <section className="main">
            { detailsModal ? <Details setDetailsModal={setDetailsModal} character={detailsCharacter} /> : <div></div> }
            <Header />
            <Input
                label={"Nome do Personagem"}
                setCharacters={setCharacters}
                setNumberOfPages={setNumberOfPages}
                setName={setName}
                restartPageIndex={restartPageIndex}
                getCharactersReq={getCharactersReq}
            />
            <div className="characters">
                { loading ? <div className="characters__loading"></div> : 
                    <CharactersTable
                        setDetailsModal={setDetailsModal}
                        setDetailsCharacter={setDetailsCharacter}
                        characters={characters} />
                }
            </div>
            <footer>
                <Pagination
                    name={name}
                    setPagesIndexQuantity={setPagesIndexQuantity}
                    setCharacters={setCharacters}
                    setCurrentPage={setCurrentPage}
                    setNumberOfPages={setNumberOfPages}
                    setName={setName}
                    characterUpdateActions={characterUpdateActions}
                    currentPage={currentPage}
                    numberOfPages={numberOfPages}
                    getCharactersReq={getCharactersReq}
                    pagesIndexQuantity={pagesIndexQuantity}
                />      
            </footer>
        </section>
    )
}

export default Main