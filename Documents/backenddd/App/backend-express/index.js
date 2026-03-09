import cors from 'cors';
import express from 'express';
import fs from 'fs';
import ClienteRoutes from './routes/ClienteRoutes.js';
import ProductoRoutes from './routes/ProductoRoutes.js';
import PedidoRoutes from './routes/PedidoRoutes.js'
import mongoose from 'mongoose';
import path from 'path';
import bodyParser from 'body-parser';

mongoose.set('strictQuery', true) //Permite evitar advertencias de moongose
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/almacen')
.then(() => {
    console.log('Conecto exitosamente la base de datos!')
})
.catch((err) => {
    console.error('Error al conectar el MongoDB. ', err)
})

// Middleware servidor (end-points), rutas (Router)

const app = express();

app.use(bodyParser.json());// Permite leer datos en modo json
app.use(bodyParser.urlencoded({extented: true}));

app.use(cors());

app.use('/', ClienteRoutes);
app.use('/', ProductoRoutes);
app.use('/', PedidoRoutes);


const port = 6000;

app.listen(port, () =>{
    console.log(`Servidor Corriendo en.. Puerto ${port}`)
})

const uploadsPath = path.resolve('uploads');
if(!fs.existsSync(uploadsPath)) {
    fs.mkdirSync(uploadsPath, {recursive: true});
}

app.use('/uploads', express.static(uploadsPath));