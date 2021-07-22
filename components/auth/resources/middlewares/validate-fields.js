
const { validationResult } = require("express-validator");


  const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
    // return `${param}: ${msg}`;
    return `${msg}`;
  };


const validateFields = (req, res, next) => {

    const error = validationResult(req).formatWith(errorFormatter);;

    if (!error.isEmpty()) {
        return res.status(400).json({
            error: error.mapped()
        })
    }

    next();    
}


module.exports = validateFields;