/**
 * @desc    Logs Req to the console
 * this is a middleware that we gonna use to perfrme our server
 */
const logger = (req, res, next) => {
    console.log(`${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl}`);
    next();
}

module.exports = logger;