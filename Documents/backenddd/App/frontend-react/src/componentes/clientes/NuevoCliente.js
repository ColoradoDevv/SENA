import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { clienteAxios } from "../../config/axios";
import Alerta from "../layout/UI/Alerta.js";


function NuevoCliente() {
    const [cliente, setCliente] = useState({
        name: "",
        lastname: "",
        company: "",
        email: "",
        phone: ""
    });
    const [alerta, setAlerta] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCliente({
            ...cliente,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await clienteAxios.post("/clients", cliente);
            navigate("/", {
                state: {
                    alerta: {
                        tipo: "exito",
                        mensaje: "Cliente creado correctamente"
                    }
                }
            });
        } catch (err) {
            setAlerta({
                tipo: "error",
                mensaje: "No se pudo crear el cliente"
            });
            console.error(err);
        }
    };

    return (
        <Fragment>
            <h2>Nuevo Cliente</h2>

            <Alerta alerta={alerta} onClose={() => setAlerta(null)} autoCloseMs={5000} />

            <form onSubmit={handleSubmit}>
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input
                        type="text"
                        placeholder="Nombre Cliente"
                        name="name"
                        value={cliente.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="campo">
                    <label>Apellido:</label>
                    <input
                        type="text"
                        placeholder="Apellido Cliente"
                        name="lastname"
                        value={cliente.lastname}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="campo">
                    <label>Empresa:</label>
                    <input
                        type="text"
                        placeholder="Empresa Cliente"
                        name="company"
                        value={cliente.company}
                        onChange={handleChange}
                    />
                </div>

                <div className="campo">
                    <label>Email:</label>
                    <input
                        type="email"
                        placeholder="Email Cliente"
                        name="email"
                        value={cliente.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="campo">
                    <label>Telefono:</label>
                    <input
                        type="text"
                        placeholder="Telefono Cliente"
                        name="phone"
                        value={cliente.phone}
                        onChange={handleChange}
                    />
                </div>

                <div className="enviar">
                    <input type="submit" className="btn btn-azul" value="Agregar Cliente" />
                </div>
            </form>
        </Fragment>
    );
}

export default NuevoCliente;