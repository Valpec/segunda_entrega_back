import express from 'express';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import mongoose from 'mongoose';
// import { Server } from 'socket.io';
import dotenv from 'dotenv';

import viewsRouter from "./routes/views.routes.js";
import cartsRouter from './routes/carts.routes.js'
import productsRouter from './routes/products.routes.js'

dotenv.config()

const app = express();
const PORT = 8080;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + "/views");
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + "/public"));


app.use('/', viewsRouter)
app.use('/api/carts', cartsRouter)
app.use('/api/products', productsRouter)


// const httpServer = app.listen(PORT, () => {
//     console.log(`Server run on port: ${PORT}`);
// })

app.listen(PORT, () => {
    console.log(`Server run on port: ${PORT}`);})
const connectMongoDB = async ()=>{
    try {
        await mongoose.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER_NAME}.joeky3o.mongodb.net/${process.env.MONGO_DB_NAME}`)
        console.log("Conectado con exito a MongoDB usando Moongose.");
        // initializeSocket(httpServer)


    } catch (error) {
        console.error("No se pudo conectar a la BD usando Moongose: " + error);
        process.exit();
    }
};
connectMongoDB();
// const socketServer = new Server(httpServer);
