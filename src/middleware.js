// Request preprocessor
// You can also populate the first argument of the routes calls
// and get any defined property from 'req' (not only req.path)
async function middleware(req, res, next) {
    let proceed = true

    if (process.env.IP_HEADER && req.header(process.env.IP_HEADER))
        req.ipAddr = req.header(process.env.IP_HEADER).split(",")[0]
    else
        req.ipAddr = req.connection.remoteAddress

    // for example, we can test request body schema	
    if (req.route.schema) {
        if (!req.body || typeof req.body != 'object')
            req.body = {}

        req.body = req.route.schema.stripUnknownProperties(req.body)
        req.body = req.route.schema.cast(req.body)

        try {
            await req.route.schema.validate(req.body)
        } catch (e) {
            proceed = false
            res.json(new BadDigestError(e))
        }
    }

    proceed && next()
}

export default middleware