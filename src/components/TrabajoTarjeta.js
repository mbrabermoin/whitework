import React from 'react';
import './TrabajoTarjeta.css';
import Eliminar from './DB/Eliminar';
import Editar from './DB/Editar';
import Agregar from './DB/Agregar';

class TrabajoTarjeta extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modo: this.props.modo,
            rol: this.props.rol,
            evento: this.props.evento,
            trabajo: this.props.trabajo,
            descripcion: this.props.descripcion,
            cantTrabajos: this.props.cantTrabajos,
            pago: this.props.pago,
            periodo: this.props.periodo,
            categoria: this.props.categoria,
            datecomienzotrab: this.props.datecomienzotrab,
            timecomienzotrab: this.props.timecomienzotrab,
            datefintrab: this.props.datefintrab,
            timefintrab: this.props.timefintrab,
            usuario: this.props.usuario,
        }
    }
    eliminarTrabajo = () => {
        var trabajo=this.state.trabajo;
        var evento=this.state.evento;
        var cantTrabajos=this.state.cantTrabajos;
        Eliminar.eliminarTrabajo(trabajo);
        Editar.restarTrabajo(evento, cantTrabajos);
    }
    postularse = () => {
        var mail=this.state.usuario.email;
        var trabajo=this.state.trabajo;
        var evento=this.state.evento;
        Agregar.agregarPostulacion(mail, trabajo);
        Editar.cambiarEstadoEvento(evento,"postulado");
        Editar.cambiarEstadoTrabajo(trabajo,"postulado");
    }
    render() {
        var categoria = "";
        if (this.state.categoria !== "") {
            categoria = " - Categoria: " + this.state.categoria;
        }
        var botonPostularse = "";
        if (this.state.modo === "empleado") {
            botonPostularse = <button className='postularse-btn' onClick={this.postularse}>Postularse</button>
        } else {
            botonPostularse = <div><button className='eliminartrabajo-btn' onClick={this.eliminarTrabajo}>Eliminar</button>
                <button className='editar-btn' onClick={this.editarTrabajo}>Editar</button>
            </div>
        }
        return (
            <div fullwidth class="card-trabajo">
                <img class="avatar-trabajo" src="https://f1.pngfuel.com/png/1008/352/43/circle-silhouette-user-user-profile-user-interface-login-user-account-avatar-data-png-clip-art.png" alt="persona" />
                <div class="skewed bg-react"></div>
                <div class="content-trabajo">
                    <div className="trabajo-postularse"><h1>{this.state.rol}{categoria}</h1>
                        {botonPostularse}
                    </div>
                    <h3>{this.props.descripcion}</h3>
                    <h3>Comienza: {this.state.datecomienzotrab} - {this.state.timecomienzotrab}   Finaliza: {this.state.datefintrab} - {this.state.timefintrab}</h3>
                    <p class="esp text-react">{this.state.pago}$ por {this.state.periodo}</p>
                </div>
            </div>
        );
    }
}

export default TrabajoTarjeta;