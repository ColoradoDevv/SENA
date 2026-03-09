import Clientes from "../modules/Clients.js";

export const nuevoCliente = async(req, res, next) => {
    //console.log(req.body);
    try {
        const cliente = await Clientes.create(req.body);
        res.status(201).json({mensaje: "Cliente creado.", cliente})

    } catch (error) {
        res.status(400).json({error: error.message})
        
    }
}

export const mostrarClientes = async(req, res, next) => {
    //console.log(req.body);
    try {
        const clientes = await Clientes.find().sort({nombre: 1}); // Busqueda desde el primer registro.
        res.json(clientes) // Si encuentra el registro/os las muestra en formato json.

    } catch (error) {
        res.status(400).json({error: error.message})
        
    }
}

export const mostrarCliente = async(req, res, next) => {
    try {
        const cliente = await Clientes.findById(req.params.id);
        if(!cliente) return res.status(404).json({mensaje: "Cliente no encontrado."});
        res.json(cliente)

    } catch (error) {
        res.status(400).json({error: "ID Invalido"})
    }
}

export const updateCliente = async(req, res, next) => {
    try {
        const cliente = await Clientes.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
        if(!cliente) return res.status(404).json({error: 'Cliente no encontrado'})
        res.json({msg: 'Cliente actualizado!', cliente});

    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

export const eliminarCliente = async(req, res, next) => {
    try {
        const eliminado = await Clientes.findByIdAndDelete(req.params.id);
        if(!eliminado) return res.status(404).json({error: 'Cliente no encontrado'})
        res.json({msg: 'Cliente eliminado.'})
    } catch (error) {
        res.status(400).json({error: "ID Invalido"})
    }
}