import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const clientSchema = new Schema({
    nombre: {
        type: String,
        trim: true // Elimina los espacios en blanco al inicio
    },
    apellido: {
        type: String,
        trim: true
    },
    company: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        trim: true
    },
    phone: {
        type: String,
        trim: true
    }
})

export default mongoose.model('Clientes', clientSchema);