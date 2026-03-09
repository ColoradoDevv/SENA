import { useEffect, useState } from "react";
import { clienteAxios } from "../../config/axios.js";
import { Fragment } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Cliente from "./Cliente";
import Alerta from "../layout/UI/Alerta.js";


function Clientes() {
    const [clientes, guardarClientes] = useState([]);
    const [alerta, setAlerta] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();

    const consultarApi = async  () => {
        try {
            const consultarCliente = await clienteAxios.get("/clients");
            guardarClientes(consultarCliente.data);
        } catch (err) {
            setAlerta({
                tipo: "error",
                mensaje: "No se pudieron cargar los clientes"
            });
            console.error(err);
        }
    };

    const eliminarCliente = async (id) => {
        const confirmar = window.confirm("Deseas eliminar este cliente?");
        if (!confirmar) return;

        try {
            await clienteAxios.delete(`/clients/${id}`);
            guardarClientes((prevClientes) =>
                prevClientes.filter((cliente) => cliente._id !== id)
            );
            setAlerta({
                tipo: "exito",
                mensaje: "Cliente eliminado correctamente"
            });
        } catch (err) {
            setAlerta({
                tipo: "error",
                mensaje: "No se pudo eliminar el cliente"
            });
            console.error(err);
        }
    };

    useEffect(() => {
        consultarApi();
    }, []);

    useEffect(() => {
        if (location.state?.alerta) {
            setAlerta(location.state.alerta);
            navigate(location.pathname, { replace: true });
        }
    }, [location.state, location.pathname, navigate]);

    return (
        <Fragment>
            <h2>Clientes</h2>
            <Link to="/clientes/nuevo" className="btn btn-verde nvo-cliente">
                <i className="fas fa-plus-circle"></i>
                Nuevo Cliente
            </Link>
            <Alerta alerta={alerta} onClose={() => setAlerta(null)} autoCloseMs={5000} />
            <ul className="listado-clientes">
                {clientes.map((cliente) => (
                    <Cliente
                        key={cliente._id}
                        cliente={cliente}
                        onDelete={eliminarCliente}
                    />
                ))}
            </ul>
        </Fragment>
    )
};

export default Clientes;