// @ts-ignore
import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";

mongoose.connect("mongodb+srv://kristjanpuusepp303:ftl1BRIz8BItD2YK@cluster0.mxusupf.mongodb.net/pood");
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})


const app: Express = express();

app.get('/', (req: Request, res: Response) => {
    res.send('<h1 style=text-align:center>Poe esileht</h1>');
});


app.listen(3000,() => {
    console.log(`[server]: Server is running at http://localhost:3000`);
});