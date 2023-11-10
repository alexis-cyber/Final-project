const express = require ("express");
const app = express();
const connection = require ("./connection");
const cors = require ("cors");

const port = 8000;


app.use(express.json());
app.use(cors());


const router = require("./Routers/router");
const userRouter = require("./Routers/userRouter")


app.use ("/", router);
app.use ("/", userRouter);
app.listen (port, () => {
    console.log (`The server is working in port ${port}`)
});