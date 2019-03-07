import React from 'react'
import { createSetFilter } from '../reducers/filterReducer'
import { connect } from 'react-redux'

const Filter = (props) => {

    const handleChange = (event) => {
        props.createSetFilter(event.target.value)
    }
    const style = {
        marginBottom: 10
    }

    return (
        <div style={style}>
            filter <input onChange={handleChange} />
        </div>
    )
}

const mapDispatchToProps = {
    createSetFilter
}

export default connect(null, mapDispatchToProps)(Filter)