const validator = require('validator')
const isEmpty = require('./isEmpty')

module.exports = function validateEducationInput(data) {
    let errors = {}

    data.school = !isEmpty(data.school) ? data.school : '';
    data.fieldofstudy = !isEmpty(data.fieldofstudy) ? data.fieldofstudy : '';
    data.degree = !isEmpty(data.degree) ? data.degree : '';


    if (validator.isEmpty(data.school)) {
        errors.school = 'School field is required'
    }
    if (validator.isEmpty(data.fieldofstudy)) {
        errors.fieldofstudy = ' fieldofstudy field is required'
    }
    if (validator.isEmpty(data.degree)) {
        errors.degree = 'degree field is required'
    }


    return {
        errors,
        isValid: isEmpty(errors)
    }
}