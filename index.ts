// @ts-ignore
import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";
import Arve_router from "./Routers/Arve_router";
import Aadress_router from "./Routers/Aadress_router";
import arverida_router from "./Routers/Arverida_router";
import toode_router from "./Routers/Toode_router";
import Kategooria_router from "./Routers/Kategooria_router";
import klient_router from "./Routers/Klient_router";
import kontaktandmed_router from "./Routers/Kontaktandmed_router";
import maksestaatus_router from "./Routers/Maksestaatus_router";
import JobApplication_router from "./Routers/JobApplication_router";
import cors from "cors";


mongoose.connect("mongodb+srv://kristjanpuusepp303:ftl1BRIz8BItD2YK@cluster0.mxusupf.mongodb.net/pood");
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

const app: Express = express();

// use cors all roots
app.use(cors());

app.use(express.json());
app.use("/", Arve_router);
app.use("/", Aadress_router);
app.use("/", arverida_router);
app.use("/", toode_router);
app.use("/", Kategooria_router);
app.use("/", klient_router);
app.use("/", kontaktandmed_router);
app.use("/", maksestaatus_router);
app.use("/", JobApplication_router);

app.get('/', (req: Request, res: Response) => {
    res.send('Your web app is running on a Node');
});


app.listen(3000,() => {
    console.log(`[server]: Server is running at http://localhost:3000`);
});