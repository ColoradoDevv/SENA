import mongoose from "mongoose";

const Schema = mongoose.Schema;

const pedidosSchema = new Schema({
    cliente: {
        type: mongoose.Schema.ObjectId,
        ref: 'Clients'
    },

    pedido: [{
        producto: {
            type: mongoose.Schema.ObjectId,
            ref: 'Producto'
        },
        cantidad: Number
    }],

    total: {
        type: Number
    }
}, {timestamps: true});

export default mongoose.model('Pedidos', pedidosSchema);