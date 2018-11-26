const commonValidators = require('./common');

authValidator = {};

authValidator.signUp = (userData) => {
    return commonValidators.email(userData.email) &&
           commonValidators.password(userData.password);
};

authValidator.signIn = (userData) => {
    return commonValidators.email(userData.email) &&
        commonValidators.password(userData.password);
};



module.exports = authValidator;