import { buildSchema } from "graphql";


export const clients = buildSchema(`
    type Clients{
        id: Int
        name: String,
        email: String,
        password: String,
        weight: Float,
        plan: String
    }

    input ClientInput{
        name: String,
        email: String,
        password: String,
        weight: Float,
        plan: String
    }

    type Query{
       getClients: [Clients],
    }

    type Mutation{
        saveClient(client: ClientInput): String
        deleteClient(id: Int): String
        updateClient(id: Int, client: ClientInput): String
    }
`)