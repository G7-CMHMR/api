// const Color = require('color');

exports.sucess = (req, res, status, message) => {
    console.log('ESTOY EN RESPONSE :', message)
    res.status(status).json(message)
}
exports.error = (req, res, status, message, error) => {
    console.log(error)
    res.status(status).json(message)
}
