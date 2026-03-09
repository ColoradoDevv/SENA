// import mongoose from "mongoose";

// const Schema = mongoose.Schema;

// const productosSchema = new Schema({
//     producto: {
//         type: String,
//         trim: true // Elimina los espacios en blanco al inicio
//     },
//     precio: {
//         type: Number,
//         trim: true
//     },
//     imagen: {
//         type: String,
//         trim: true
//     }
// });

// export default mongoose.model('Productos', productosSchema);

import mongoose from 'mongoose';

const ProductoSchema = new mongoose.Schema( // Definimos el esquema para el modelo de Producto
{
    producto: { type: String, trim: true },
    precio:  { type: Number, min: 0 },
    imagen:  { type: String, trim: true }
},
{ timestamps: true }
);

export default mongoose.model('Productos', ProductoSchema);