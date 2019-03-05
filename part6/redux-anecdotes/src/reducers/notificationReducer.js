const reducer = (state = null, action) => {
    switch (action.type) {
        case 'RESET':
            return ''
        case 'SET_NOTIFICATION':
            return action.notification
        default: 
            return state
    }
}

export const createSetNotification = (notification) => {
    return {
        type: 'SET_NOTIFICATION',
        notification
    }
}

export const createResetNotification = (notification) => {
    return {
        type: 'RESET'
        
    }
}


export default reducer