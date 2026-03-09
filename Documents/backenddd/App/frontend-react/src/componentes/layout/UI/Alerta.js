import { useEffect } from "react";

function Alerta({ alerta, onClose, autoCloseMs = 5000 }) {
    useEffect(() => {
        if (!alerta) return;
        const timer = setTimeout(() => onClose?.(), autoCloseMs);
        return () => clearTimeout(timer);
    }, [alerta, autoCloseMs, onClose]);

    if (!alerta) return null;

    const iconos = {
        exito: "fas fa-check-circle",
        info: "fas fa-info-circle",
        advertencia: "fas fa-exclamation-circle",
        error: "fas fa-times-circle"
    };

    const titulos = {
        exito: "Exito",
        info: "Informacion",
        advertencia: "Advertencia",
        error: "Error"
    };

    const tipo = alerta.tipo || "info";

    return (
        <div className="alerta-overlay">
            <div className={`alerta alerta-${tipo}`} role="alert" aria-live="polite">
                <div className="alerta-icono">
                    <i className={iconos[tipo]}></i>
                </div>

                <div className="alerta-contenido">
                    <p className="alerta-titulo">{titulos[tipo]}</p>
                    <p className="alerta-mensaje">{alerta.mensaje}</p>
                </div>

                <button type="button" className="alerta-cerrar" onClick={onClose} aria-label="Cerrar alerta">
                    <i className="fas fa-times"></i>
                </button>
            </div>
        </div>
    );
}

export default Alerta;