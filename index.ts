// @ts-ignore
import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";

mongoose.connect("mongodb+srv://kristjanpuusepp303:ftl1BRIz8BItD2YK@cluster0.mxusupf.mongodb.net/");
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})


const app: Express = express();

app.get('/', (req: Request, res: Response) => {
    res.send('Your web app is running on a Node');
});


app.listen(3000,() => {
    console.log(`[server]: Server is running at http://localhost:3000`);
});