const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).send('Unauthorized Access...Please Login First');
        }

        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.JWT_SECRETKEY1, function (err, decoded) {
            if (err) {
                return res.status(401).send('Unauthorized Access...Please Login First');
            }
            if (decoded) {
                console.log(decoded);
                req.user = decoded;
                next();
            }
        });

    } catch (error) {
        res.status(401).json({ message: 'Unauthorized' });
    }
};


module.exports = auth;
