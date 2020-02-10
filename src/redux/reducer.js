const initialState = {
    id: 0,
    username: '',
    profileImg: ''
}

const UPDATE_USER_INFO = 'UPDATE_USER_INFO'

export const updateUserInfo = (info) => {
    return {
        type: UPDATE_USER_INFO,
        payload: info
    }
}

export default function reducer(state = initialState, action) {
    const {type, payload} = action

    switch(type) {
        case UPDATE_USER_INFO:
            console.log(payload)
            return {
                ...state,
                id: payload.id,
                username: payload.username,
                profileImg: payload.profileImg
            }
        default: return state
    }
}