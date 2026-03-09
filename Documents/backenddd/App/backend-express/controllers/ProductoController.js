import multer from 'multer'; // Para manejo de archivos
import path from 'path';
import Producto from '../modules/Producto.js';

// Configuración de Multer
const storage = multer.diskStorage({ // Configura el almacenamiento de archivos
    destination: (req, file, cb) => { // Define la carpeta de destino para las imágenes
        cb(null, path.resolve('uploads'));
    },
    filename: (req, file, cb) => { // Genera un nombre único para cada archivo
        const unique = Date.now() + '_' + Math.round(Math.random() * 1e9); // Genera un identificador único
        const ext = path.extname(file.originalname); // Obtiene la extensión del archivo original
        const base = path.basename(file.originalname, ext).replace(/[^\s\w.-]/g, '_'); 
        cb(null, `${base}_${unique}${ext}`); // Combina el nombre base, el identificador único y
    }                                          // la extensión para formar el nombre final
});

const fileFilter = (req, file, cb) => { // Filtra los archivos permitidos por tipo MIME
    const permitidos = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']; // Define los tipos de archivos permitidos
    if (permitidos.includes(file.mimetype)) cb(null, true); // Acepta el archivo si su tipo MIME está
    // en la lista de permitidos
    else cb(new Error('Tipo de archivo no permitido'), false);
};

export const upload = multer({ // Configura Multer con el almacenamiento, filtro de archivos y límites de tamaño
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }
});

export const nuevoProducto = async (req, res) => {
    try {
        const data = { ...req.body }; // Crea un objeto con los datos del cuerpo de la solicitud
        if (req.file) data.imagen = `/uploads/${req.file.filename}`; // Si se ha subido un archivo,
        // agrega la ruta de la imagen al objeto de datos
        const producto = await Producto.create(data); // Crea un nuevo producto en la base de datos con
        // los datos proporcionados
        res.status(201).json(producto);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const mostrarProducto = async (req, res) => {
    try {
        const producto = await Producto.findById(req.params.id);
        if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });
        res.json(producto);
    } catch {
        res.status(400).json({ error: 'ID inválido' });
    }
};

export const mostrarProductos = async (req, res) => {
    try {
        const productos = await Producto.find().sort({ producto: 1 });
        res.json(productos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateProducto = async (req, res) => {
    try {
        const updates = { ...req.body };
        if (req.file) updates.imagen = `/uploads/${req.file.filename}`; // Si se ha subido un nuevo archivo,
        // actualiza la ruta de la imagen en los datos de actualización
        const producto = await Producto.findByIdAndUpdate(
            req.params.id, // Busca el producto por ID y lo actualiza con los nuevos datos
            updates,
            { new: true, runValidators: true } // Devuelve el documento actualizado y ejecuta validaciones
        );
        if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });
        res.json(producto);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const eliminarProducto = async (req, res) => {
    try {
        const eliminado = await Producto.findByIdAndDelete(req.params.id);
        if (!eliminado) return res.status(404).json({ error: 'Producto no encontrado' });
        res.json({ mensaje: 'Producto eliminado' });
    } catch {
        res.status(400).json({ error: 'ID inválido' });
    }
};