const uuidv4 = require('uuid/v4');
const bcrypt = require('bcryptjs');
const User = require('~/db/models/user');
const errorHandler = require('./error');
const redis = require('redis');
const client = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_HOST, redis);

const redisKey = (token) => {
    const redisPrefix = 'token:';
    return redisPrefix + token;
};

const authentication = {};
authentication.auth = (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        
        client.get(redisKey(token), async (err, redisData) => {
            if (err) throw err;

            let user;
            if (redisData) {
                user = JSON.parse(redisData);
            } else {
                user = await User.findOneByToken(token);
                if (!user) {
                    return errorHandler.Unauthorized(res);
                }
            }
            authentication.redisUpsert(token, user);
            req.user = user;
            next();
        });
    } catch (error) {
        errorHandler.Unauthorized(res);
    }
};

authentication.checkPassword = (password, user) => {
    return bcrypt.compare(password, user.password);
};

authentication.generateToken = () => {
    return uuidv4();
};

authentication.redisUpsert = (token, data) => {
    return client.set(redisKey(token), JSON.stringify(data), 'EX', 60*60*24*(process.env.REDIS_EXPIRED || 3)); // default 3 days
};

authentication.redisDelete = (token) => {
    return client.del(redisKey(token));
};

module.exports = authentication;
