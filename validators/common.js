const commonValidators = {};

commonValidators.email = (email) => {
    // TODO Improve this validator
    return typeof email === 'string' && email.length >= 6;
};

commonValidators.password = (password) => {
    return typeof password === 'string' && password.length >= 6;
};




module.exports = commonValidators;