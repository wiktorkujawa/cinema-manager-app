import "reflect-metadata";
import * as dotenv from "dotenv";
import path from 'path';
dotenv.config({ path: path.join(__dirname,'../.env' )});
import {createConnection} from "typeorm";

import express from 'express';
const cors = require('cors');

import { Movie } from './entities/Movie';
import { Hall } from './entities/Hall';
import { User } from './entities/User';
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hell";
import { HallResolver } from "./resolvers/hall";
import { Session } from "./entities/Session";
import { SessionResolver } from "./resolvers/session";

const main = async () => {
  console.log("hello");
  console.log(process.env.mongoURI);

  await createConnection(
    {
    type: "postgres",
    // url: "postgresql://postgres@localhost:5432/cinema",
    host:"localhost",
    database:"cinema",
    port:5432,
    password:"newPassword",
    username:"postgres",
    logging: true,
    synchronize: true,
    // migrations: [path.join(__dirname, "./migrations/*")],
    entities: [ User, Movie, Hall, Session]}
  );

  
  // await conn.runMigrations();

  const app = express();

  app.use(
    cors({
      origin: 'http://localhost:4000',
      credentials: true,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, HallResolver, SessionResolver],
      validate: false,
    })
  });

  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  app.use(express.static(path.join(__dirname, '../dist')));

  app.get('*', (_, res) => { 
      res.sendFile(path.join(__dirname, '../dist/index.html')) 
  }); 

  const PORT = process.env.PORT || 4000; 
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

}


  main().catch((err) => {
    console.error(err);
  });

