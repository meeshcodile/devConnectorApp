const validator = require('validator')
const isEmpty = require('./isEmpty')

module.exports = function validateProfileInput(data) {
    let errors = {}

    data.handle = !isEmpty(data.handle) ? data.handle : '';
    data.status = !isEmpty(data.status) ? data.status : '';
    data.skills = !isEmpty(data.skills) ? data.skills : '';

    if(!validator.isLength(data.handle,{min:2, max:30})){
        errors.handle ='handle needs to be between 2 and 30 characters'
    }

    if(validator.isEmpty(data.handle)){
        errors.handle = 'profile handle is required'
    }

    if (validator.isEmpty(data.status)) {
        errors.status  = 'profile handle is required'
    }

    if (validator.isEmpty(data.skills)) {
        errors.skills = 'profile handle is required'
    }

    if(!isEmpty(data.website)){
        if(!validator.isURL(data.website)){
            errors.website ="not a valid URL"
        }
    }

    if (!isEmpty(data.youtube)) {
        if (!validator.isURL(data.youtube)) {
            errors.youtube = "not a valid URL"
        }
    }

    if (!isEmpty(data.facebook)) {
        if (!validator.isURL(data.facebook)) {
            errors.facebook = "not a valid URL"
        }
    } 

    if (!isEmpty(data.instagram)) {
        if (!validator.isURL(data.instagram)) {
            errors.instagram = "not a valid URL"
        }
    }

    if (!isEmpty(data.linkedin)) {
        if (!validator.isURL(data.linkedin)) {
            errors.linkedin = "not a valid URL"
        }
    }

    if (!isEmpty(data.twitter)) {
        if (!validator.isURL(data.twitter)) {
            errors.twitter = "not a valid URL"
        }
    }
    

    return {
        errors,
        isValid: isEmpty(errors)
    }
}