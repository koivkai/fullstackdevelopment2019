const reducer = (state = null, action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return action.notification
        default: 
            return state
    }
}

export const createSetNotification = (notification, time) => {
    return async dispatch => {
        dispatch({
            type: 'SET_NOTIFICATION',
            notification
        })
        setTimeout(()=> {
            dispatch({
                type: 'SET_NOTIFICATION',
                notification: ''
            })
        },time)
    }
}


export default reducer