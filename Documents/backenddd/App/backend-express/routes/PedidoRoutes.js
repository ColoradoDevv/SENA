import express from "express";
import { actualizarPedido, eliminarPedido, mostrarPedido, mostrarPedidos, nuevoPedido } from "../controllers/PedidoController.js"

const router = express.Router();

router.post('/pedidos', nuevoPedido);
router.get('/pedidos', mostrarPedidos);
router.get('/pedidos/:id', mostrarPedido);
router.put('/pedidos/:id', actualizarPedido);
router.delete('/pedidos/:id', eliminarPedido);

export default router;