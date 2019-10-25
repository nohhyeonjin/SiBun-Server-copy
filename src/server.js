import path from "path";
import "./env";

import { GraphQLServer } from "graphql-yoga";
import logger from "morgan";
import schema from "./schema";
import passport from "passport";
import utils from "./utils";    //utils.js파일 import
import "./passport";    //passport.js파일 import

const PORT = process.env.PORT || 4000;

const server = new GraphQLServer({ schema });
server.express.use(logger("dev"));
server.start({port: PORT}, () => console.log(`Server running on http://localhost:${PORT}`) );