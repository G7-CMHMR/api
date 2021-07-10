require('dotenv').config();

module.exports = {
    api: {
        host: process.env.API_HOST || 'localhost',
        port: process.env.API_PORT || 3001
    },
    db:{
        user: process.env.DB_USER,
        pass: process.env.DB_PASS
    }
}