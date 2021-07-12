// require('colors');

exports.sucess = (req, res, status, message) => {
    res.status(status).json(message)
}
exports.error = (req, res, status, message, error) => {
    res.status(status).json({ error: message })
}
