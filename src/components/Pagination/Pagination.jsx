import React from 'react'
import './Pagination.css'

const Pagination = props => {
    const CHARACTERS_PER_PAGE = 10

    const handleClickChevronNext = async () => {
        if (props.currentPage < props.numberOfPages) {
            const charactersListRange = parseToKitsuPageIndex(props.currentPage + 1)
            const ret = await props.getCharactersReq(charactersListRange, props.name)
            props.setCharacters(ret.characters)
            props.setCurrentPage(props.currentPage + 1)
            
            if (props.currentPage + 1 >= props.pagesIndexQuantity[props.pagesIndexQuantity.length - 1]) {
                props.setPagesIndexQuantity(props.pagesIndexQuantity.map(pageIndex =>
                    parseInt(pageIndex) + props.pagesIndexQuantity.length))
            }
        }
    }

    const handleClickChevronPrevious = async () => {
        if (props.currentPage >= 1) {
            const charactersListRange = (props.currentPage - 1) * CHARACTERS_PER_PAGE
            const ret = await props.getCharactersReq(charactersListRange, props.name)
            props.setCharacters(ret.characters)
            props.setCurrentPage(props.currentPage - 1)

            if (props.currentPage + 1 <= props.pagesIndexQuantity[0]) {
                props.setPagesIndexQuantity(props.pagesIndexQuantity.map(pageIndex => 
                    parseInt(pageIndex) - props.pagesIndexQuantity.length))
            }
        }
    }

    return (
    <div className="main__pagination">
        <div className="pagination__chevron pagination__chevron_prev"
            onClick={() => handleClickChevronPrevious()}></div>
            <ul className="pagination__indexes">
                    {props.pagesIndexQuantity.map(pageIndex => renderItem(pageIndex, props))}
            </ul>
        <div className="pagination__chevron pagination__chevron_next"
            onClick={() => handleClickChevronNext()}></div>
    </div> 
    )
}

const renderItem = (pageIndex, props) => {
    const handleClickChevronNumberIndex = async (e) => {
        const pageClicked = parseInt(e.target.innerHTML)
        const charactersListRange = (pageClicked - 1) * 10;
        const ret = await props.getCharactersReq(charactersListRange, props.name)
        props.setCharacters(ret.characters)
        props.setCurrentPage(pageClicked - 1)
    }

    const isCurrentPage = pageIndex === (props.currentPage + 1)

    if (pageIndex <= parseFromKitsuPageIndex(props.numberOfPages)) {
        return (
        <li className="indexes__item" key={pageIndex}
            style={ isCurrentPage ? { backgroundColor: '#D42026', color: 'white' } : {} }>
            <span key={pageIndex} 
            onClick={handleClickChevronNumberIndex} 
            className='item__index'>{pageIndex}</span>
        </li>)
    }
}

const parseToKitsuPageIndex = index => index * 10
const parseFromKitsuPageIndex = index => (index / 10) + 1

export default Pagination