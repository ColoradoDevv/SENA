import Pedidos from "../modules/Pedidos.js"

//Crear un nuevo pedido
export const nuevoPedido = async (req, res, next) => {
    const pedido = new Pedidos(req.body);
    try {
        await pedido.save(); //Almacenar el pedido
        res.json({mensaje: 'Se agregó un nuevo Pedido'});
    } catch (error) {
        console.log(error);
        next();
    }
}


//Mostrar todos los pedidos
export const mostrarPedido = async (req, res, next) => {

    try {
        const pedido = await Pedidos.find({}).populate('cliente').populate({ //populate para mostrar el
            // nombre del producto en vez del ID
            path:'pedido.producto',  //path para mostrar el producto dentro del pedido
            model: 'Producto'       //model para mostrar el producto dentro del pedido
        });
        res.json(pedido);
    } catch (error) {
        console.log(error);
        next();
    }
}


//Mostrar pedido por ID
export const mostrarPedidos = async (req, res, next) => {
    const pedido = await Pedidos.findById(req.params.idPedido).populate({ //populate para mostrar el
        // nombre del producto en vez del ID
        path:'pedido.producto',
        model: 'Producto'
    });
    if(!pedido) { //Si no existe el pedido
        res.json({mensaje: 'pedido no existe'});
        return next();
    }

    //Mostrar pedido
    res.json(pedido);
}


//Actualizar el pedido
export const actualizarPedido = async (req, res, next) => {
    try {
        //Actualizar el pedido
        let pedido = await Pedidos.findOneAndUpdate({_id : req.params.idPedido}, req.body, {
            new: true
        })
        .populate({ //populate para mostrar el nombre del producto en vez del ID
            path:'pedido.producto',
            model: 'Producto'
        });
        res.json(pedido);   // Mostrar el pedido actualizado
    } catch (error) {
        console.log(error);
        next(); //Mostrar el pedido actualizado
    }
}


//Eliminar Pedido.
export const eliminarPedido = async (req, res, next) => {
    try {
        await Pedidos.findOneAndDelete({_id : req.params.idPedido});
        res.json({mensaje: 'El Pedido se Ha eliminado correctamente'});
    } catch (error) {
        console.log(error);
        next();
    }
}