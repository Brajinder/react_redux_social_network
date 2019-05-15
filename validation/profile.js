const validator= require('validator');
const isEmpty=require('./is-empty');

module.exports = function validateProfileInput(data) {
    let errors={};

    //data.name= !isEmpty(data.name) ? data.name : '';
    data.handle= !isEmpty(data.handle) ? data.handle : '';
    data.status= !isEmpty(data.status) ? data.status : '';
    data.skills= !isEmpty(data.skills) ? data.skills : '';

    // data.password2= !isEmpty(data.password2) ? data.password2 : '';
    if (!validator.isLength(data.handle, {min: 2, max: 40})) {
        errors.handle='Handle needs to be in 2-40';
    }
    
    if (validator.isEmpty(data.handle)) {
        errors.handle='Handle is required';
    }
    if (validator.isEmpty(data.status)) {
        errors.status='Status is required';
    }
    
    if (validator.isEmpty(data.skills)) {
        errors.skills='skills is required';
    }
    if (!isEmpty(data.website)) {
        if (!validator.isURL(data.website)) {
            errors.website='Not a valid URl';
        }
    }
    if (!isEmpty(data.youtube)) {
        if (!validator.isURL(data.youtube)) {
            errors.youtube='Nota valid URl';
        }
    }
    if (!isEmpty(data.facebook)) {
        if (!validator.isURL(data.facebook)) {
            errors.facebook='Nota valid URl';
        }
    }
    if (!isEmpty(data.linkden)) {
        if (!validator.isURL(data.linkedin)) {
            errors.linkden='Nota valid URl';
        }
    }
    if (!isEmpty(data.twitter)) {
        if (!validator.isURL(data.twitter)) {
            errors.twitter='Nota valid URl';
        }
    }
    if (!isEmpty(data.instagram)) {
        if (!validator.isURL(data.instagram)) {
            errors.instagram='Nota valid URl';
        }
    }
    return {
        errors,
        isValid : isEmpty(errors)
    };
};