import express, { Express, Request, Response, Application } from 'express';
import dotenv from 'dotenv';
import UserController from "./controllers/UserController"
import { buildSchema, GraphQLInt, GraphQLObjectType, GraphQLSchema, GraphQLString } from 'graphql';
import { createHandler } from 'graphql-http/lib/use/express';
import { provideUserService } from './services/di';
import { GetUserResultStatus } from './services/models/users/GetUserResult';
import { AddUserResultStatus } from './services/models/users/AddUserResult';

const expressPlayground = require('graphql-playground-middleware-express').default;

var schema = buildSchema(`
  type User {
    name: String
  }

  type Query {
    user(name: String): User 
  }

  type Mutation {
    newUser(name: String): User
  }
`)

var root = {
    user: async ({ name }: { name: string }) => {
        const result = await provideUserService().getUserByName(name)
        switch (result.status) {
            case GetUserResultStatus.Success: return { name: result.user!!.name }
            case GetUserResultStatus.NotFound: throw new Error("Not Found")
        }
    },
    newUser: async ({ name }: { name: string }) => {
        const result = await provideUserService().addUserByName(name)
        switch (result.status) {
            case AddUserResultStatus.Conflict: throw new Error("Conflict")
            case AddUserResultStatus.Succeeded: return { name: result.user!!.name }
        }
    }
}

//For env File 
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

app.get('/', (req: Request, res: Response) => {
    res.send('Home');
});
app.all('/graphql', createHandler({ schema: schema, rootValue: root }))
app.get('/playground', expressPlayground({ endpoint: '/graphql' }))

app.listen(port, () => {
    console.log(`Server is Fire at http://localhost:${port}`);
});