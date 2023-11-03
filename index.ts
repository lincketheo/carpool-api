import express, { Express, Request, Response, Application } from 'express';
import dotenv from 'dotenv';
import UserController from "./controllers/UserController"

//For env File 
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

app.get('/', (req: Request, res: Response) => {
    res.send('Home');
});
app.use('/users', UserController)

app.listen(port, () => {
    console.log(`Server is Fire at http://localhost:${port}`);
});