import axios from 'axios'
import * as actions from '../actions/actionTypes'


// GET current user profile
export const getCurrentProfile =() =>dispatch =>{
    dispatch(setProfileLoading())
    axios.get('/api/profile').then(res =>{
        dispatch({
            type:actions.GET_PROFILE,
            payload:res.data
        })
    })
    .catch(err =>{
        dispatch({
            type: actions.GET_PROFILE,
            payload: {}
        })
    })
}

// profile loading
export const setProfileLoading =()=>{
    return{
        type:actions.PROFILE_LOADING
    }
}

// clear profile
export const clearCurrentProfile = () => {
    return {
        type: actions.CLEAR_CURRENT_PROFILE
    }
}