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

// CCreate profile
export const createProfile =(profileData, history) =>dispatch =>{
    axios.post('/api/profile', profileData)
        .then(res => history.push('/dashboard'))
        .catch(err => dispatch({
            type:actions.GET_ERRORS,
            payload:err.response.data
        }))
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
// delete account and profile
export const deleteAccount = () => dispatch=>{
    if(window.confirm("Are you sure? this cannot be undone")){
        axios.delete('/api/profile').then(res => dispatch({
            type:actions.SET_CURRENT_USER,
            payload:{}
        }))
        .catch(err => dispatch({
            type:actions.GET_ERRORS,
            payload:err.response.data
        }))
    }
}

// add user experience
export const addExperience =(experienceData, history) => dispatch =>{
    axios
      .post("/api/profile/experience", experienceData)
      .then(res=> {
        //   console.log(res)
        history.push("/dashboard");
      })
      .catch((err) =>
        dispatch({
          type: actions.GET_ERRORS,
          payload: err.response.data,
        })
      );
}

// add user education
export const addEducation =(educationData, history) => dispatch =>{
    axios
      .post("/api/profile/education", educationData)
      .then(res=> {
          console.log(res)
        history.push("/dashboard");
      })
      .catch((err) =>
        dispatch({
          type: actions.GET_ERRORS,
          payload: err.response.data,
        })
      );
}

// delete experience
export const deleteExperience = (id) => (dispatch) => {
  axios
    .delete(`/api/profile/experience/${id}`)
    .then(res=> dispatch({
        type:actions.GET_PROFILE,
        payload:res.data
    })
      
      
    )
    .catch((err) =>
      dispatch({
        type: actions.GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// delete education
export const deleteEducation = (id) => (dispatch) => {
  axios
    .delete(`/api/profile/education/${id}`)
    .then((res) =>
      dispatch({
        type: actions.GET_PROFILE,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: actions.GET_ERRORS,
        payload: err.response.data,
      })
    );
};