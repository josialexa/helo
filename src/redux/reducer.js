const initialState = {
    id: 0,
    username: '',
    profileImg: ''
}

const UPDATE_USER_INFO = 'UPDATE_USER_INFO'
const CLEAR_USER_INFO = 'CLEAR_USER_INFO'

export const updateUserInfo = (info) => {
    return {
        type: UPDATE_USER_INFO,
        payload: info
    }
}

export const clearUserInfo = () => {
    return {
        type: CLEAR_USER_INFO
    }
}

export default function reducer(state = initialState, action) {
    const {type, payload} = action

    switch(type) {
        case UPDATE_USER_INFO:
            // console.log(payload)
            return {
                ...state,
                id: payload.id,
                username: payload.username,
                profileImg: payload.profileImg
            }
        case CLEAR_USER_INFO:
            return {
                ...state,
                id: 0,
                username: '',
                profileImg: ''
            }
        default: return state
    }
}