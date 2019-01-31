import React from 'react'

const SearchForm = ({searchTerm, handleSeachTermChange}) => {
    return (
        <div>
            haku <input value={searchTerm} onChange={handleSeachTermChange} />
        </div>
    )
}

export default SearchForm