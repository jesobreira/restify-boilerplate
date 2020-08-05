import "stackup"
import corsMiddleware from 'restify-cors-middleware'
import "./framework/dotenv"
import "./framework/moduleAlias"
import restify from "restify";
import routes from "./routes";
import logging from "./logging";
import config from "./config";
import middleware from "./middleware";

const logger = logging(config.logs);

const server = restify.createServer({
  name: process.env.APP_NAME,
  log: logger,
  serializers: restify.bunyan.serializers
});

const port = process.env.PORT || 3333;

server.use(restify.plugins.queryParser())
server.use(restify.plugins.bodyParser())
server.use(restify.plugins.requestLogger())
server.use(restify.plugins.authorizationParser())
server.use(restify.plugins.requestLogger())
server.use(middleware)

server.on("after", restify.plugins.auditLogger({log: logger}))

const cors = corsMiddleware({
  preflightMaxAge: 5, //Optional
  origins: String(process.env.CORS_ALLOWED || "").split(","),
  allowHeaders: ['Authorization']
})

server.pre(cors.preflight)
server.use(cors.actual)

// Routes for the application
routes(server)

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
});
