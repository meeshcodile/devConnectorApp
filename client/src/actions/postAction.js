import axios from 'axios'
import * as actions from './actionTypes'

// add post
export const addPost = postData => dispatch =>{
    axios.post('/api/posts', postData).then(res=> dispatch({
        type:actions.ADD_POST,
        payload:res.data
    }))
    .catch(err => dispatch({
        type:actions.GET_ERRORS,
        payload:err.response.data
    }))
}

// get post from the database
export const getPost = () => dispatch => {
    dispatch(setPostLoading())
    axios.get('/api/posts').then(res => dispatch({
        type: actions.GET_POSTS,
        payload: res.data
    }))
        .catch(err => dispatch({
            type: actions.GET_POSTS,
            payload: null
        }))
}

// set loading state
export const setPostLoading =() =>{
    return{
        type:actions.POST_LOADING
    }
}

// delete post
export const deletePost = id => dispatch => {
    axios.delete(`/api/posts/${id}`).then(res => dispatch({
        type: actions.DELETE_POST,
        payload: id
    }))
        .catch(err => dispatch({
            type: actions.GET_ERRORS,
            payload: err.response.data
        }))
}

// add like
export const likePost = id => dispatch => {
    axios.post(`/api/posts/like/${id}`).then(res => dispatch(getPost()))
        .catch(err => dispatch({
            type: actions.GET_ERRORS,
            payload: err.response.data
        }))
}

// remove like
export const unLikePost = id => dispatch => {
    axios.post(`/api/posts/unlike/${id}`).then(res => dispatch(getPost()))
        .catch(err => dispatch({
            type: actions.GET_ERRORS,
            payload: err.response.data
        }))
}