// Request preprocessor
// You can also populate the first argument of the routes calls
// and get any defined property from 'req' (not only req.path)

async function middleware(req, res, next) {
  if (process.env.IP_HEADER && req.header(process.env.IP_HEADER))
    req.ipAddr = req.header(process.env.IP_HEADER).split(",")[0]
  else
    req.ipAddr = req.connection.remoteAddress

  next()
}

export default middleware