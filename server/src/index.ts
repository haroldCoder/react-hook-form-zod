import express from "express"
import {graphqlHTTP} from "express-graphql"
import { clients } from "./graphql/schemas/client";
import Clients from "./graphql/mutations/clients";
import ConnectPg from "./connection/connectPg";
import dotenv from "dotenv";

dotenv.config();


const app = express();
const clientsobj = new Clients();
const pgconnect = new ConnectPg();

app.use("/graphql", graphqlHTTP({
    schema: clients,
    rootValue: clientsobj,
    graphiql: true
}))

app.listen(1000)
console.log(`Server on port 1000`);
pgconnect.isConnect()
