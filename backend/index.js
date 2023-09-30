import express, { request, response }  from "express";
import { PORT, mongoDBURL } from "./config.js"
import mongoose from "mongoose";
import BooksRoute from './routes/BooksRoute.js'
import cors from 'cors'

const app = express();

//middleware for parsing request body
app.use(express.json());

//Middleware for handling CORS Policy
//Option 1: Allow All Origins with Default of cors(*)
app.use(cors());

//Option 2: Allow Custom Origins
// app.use(
//     cors({
//         origin: 'http://localhost:3000',
//         methods: ['GET', 'POST', 'PUT', 'DELETE'],
//         allowedHeaders: ['Content-Type'],
//     })
// );

app.get('/', (request, response) => {
    console.log(request)
    return response.status(234).send('Welcome...!')
});

app.use('/books', BooksRoute);

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log(`App connected to database`)
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`);
        })
    })
    .catch((error) => {
        console.log(error);
    })