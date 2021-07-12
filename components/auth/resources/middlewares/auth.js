const jwt = require('jsonwebtoken');


const auth = async (req, res, next) => {

    const token = req.header('x-token');
    // const token = req.headers.authorization;

    if (!token) return res.status(401).json({ error: 'No autorizado - No hay token en la petición' });

        jwt.verify(
            token,
            process.env.SECRET_JWT_SEED,
            (error, decode) => {
                if (error) return res.status(401).send({ error: 'Token no válido' });
                if (decode) {
                    req.id = decode.id
                    req.name = decode.name;
                    return next();
                }
            });

}

module.exports = auth;
