import { Fragment } from "react";
import { Link } from "react-router-dom";

function Cliente({ cliente, onDelete }) {
    const { _id, name, lastname, company, email, phone } = cliente;

    return (
        <Fragment>
            <li className="cliente">
                <div className="info-cliente">
                    <p className="nombre">{name} {lastname}</p>
                    <p className="empresa">{company}</p>
                    <p>{email}</p>
                    <p>Tel: {phone}</p>
                </div>
                <div className="acciones">
                    <Link to={`/clientes/editar/${_id}`} className="btn btn-azul">
                        <i className="fas fa-pen-alt"></i>
                        Editar Cliente
                    </Link>
                    <button
                        type="button"
                        className="btn btn-rojo btn-eliminar"
                        onClick={() => onDelete(_id)}
                    >
                        <i className="fas fa-times"></i>
                        Eliminar Cliente
                    </button>
                </div>
            </li>
        </Fragment>
    );
}

export default Cliente;