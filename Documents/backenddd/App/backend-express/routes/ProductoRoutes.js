import express from "express";
import { eliminarProducto, mostrarProducto, mostrarProductos, nuevoProducto, updateProducto, upload } from "../controllers/ProductoController.js"

const router = express.Router();

router.post('/productos', upload.single('imagen'), nuevoProducto);
router.get('/productos', mostrarProductos);
router.get('/productos/:id', mostrarProducto);
router.put('/productos/:id', upload.single('imagen'), updateProducto);
router.delete('/productos/:id', eliminarProducto);

export default router;