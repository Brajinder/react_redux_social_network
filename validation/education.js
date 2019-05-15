const validator= require('validator');
const isEmpty=require('./is-empty');

module.exports = function validateEducationInput(data) {
    let errors={};

    //data.name= !isEmpty(data.name) ? data.name : '';
    data.school= !isEmpty(data.school) ? data.school : '';
    data.degree= !isEmpty(data.degree) ? data.degree : '';
    data.from= !isEmpty(data.from) ? data.from : '';

    data.fieldofstudy= !isEmpty(data.fieldofstudy) ? data.fieldofstudy : '';
   //data.password= !isEmpty(data.password) ? data.password : '';

   // data.password2= !isEmpty(data.password2) ? data.password2 : '';

    
    if (validator.isEmpty(data.degree)) {
        errors.degree='degree field is required';
    }
    if (validator.isEmpty(data.school)) {
        errors.school='school field is required';
    }
    if (validator.isEmpty(data.from)) {
        errors.from='date from is is required';
    }
    if (validator.isEmpty(data.fieldofstudy)) {
        errors.fieldofstudy='fieldofstudy field is required';
    }
  
    return {
        errors,
        isValid : isEmpty(errors)
    };
};