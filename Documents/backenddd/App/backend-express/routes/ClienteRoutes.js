// Middleware servidor (end-point), rutas(Router)
import express from "express";
import { nuevoCliente, mostrarCliente, mostrarClientes, updateCliente, eliminarCliente } from "../controllers/ClientController.js"

const router = express.Router();
/*
router.get("/", (req, res) => {
    res.json({msg: "FUAAAAAAAA"})
});

router.get("/Clientes", (req, res) => {
    res.send("Sebastian")
});
*/

// Crea un nuevo registro
router.post('/clientes', nuevoCliente);

// Muestra todos los registros
router.get('/clientes', mostrarClientes);

// Muestra 1 solo por código
router.get('/clientes/:id', mostrarCliente);

// Actualiza un registro
router.put('/clientes/:id', updateCliente);

// Eliminar un registro
router.delete('/clientes/:id', eliminarCliente);

export default router;