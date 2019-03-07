const reducer = (state='', action) => {
    //console.log('state, action', state, action)
    switch (action.type) {
        case 'SET_FILTER':
        return action.filter

        case 'RESET':
        return ''
    default:
        return state
    }
} 

export const createSetFilter = (filter) => {
    return {
        type: 'SET_FILTER',
        filter
    }
}

export const createFilterReset = () => {
    return {type: 'RESET'}
}

export default (reducer)