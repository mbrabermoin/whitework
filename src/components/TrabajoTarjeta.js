import React from 'react';
import './TrabajoTarjeta.css';

class TrabajoTarjeta extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modo: this.props.modo,
            rol: this.props.rol,
            descripcion: this.props.descripcion,
            pago: this.props.pago,
            periodo: this.props.periodo,
            categoria: this.props.categoria,
            datecomienzotrab: this.props.datecomienzotrab,
            timecomienzotrab: this.props.timecomienzotrab,
            datefintrab: this.props.datefintrab,
            timefintrab: this.props.timefintrab,
        }
    }
    render() {
        var categoria ="";
        if(this.state.categoria !== ""){
            categoria = " - Categoria: " + this.state.categoria;
        }
        var botonPostularse = "";
        if (this.state.modo === "empleado") {
            botonPostularse = <button className='postularse-btn' onClick={this.postularse}>Postularse</button>
        } else {
            botonPostularse = <button className='postularse-btn' onClick={this.editarTrabajo}>Editar</button>
        }
        return (
            <div fullwidth class="card-trabajo">
                <img class="avatar-trabajo" src="https://f1.pngfuel.com/png/1008/352/43/circle-silhouette-user-user-profile-user-interface-login-user-account-avatar-data-png-clip-art.png" alt="person1" />
                <div class="skewed bg-react"></div>
                <div class="content-trabajo">
                    <div className="trabajo-postularse"><h1>{this.props.rol}{categoria}</h1>
                        {botonPostularse}
                    </div>
                    <h3>{this.props.descripcion}</h3>
                    <h3>Comienza: {this.props.datecomienzotrab} - {this.props.timecomienzotrab}   Finaliza: {this.props.datefintrab} - {this.props.timefintrab}</h3>
                    <p class="esp text-react">{this.state.pago}$ por {this.state.periodo}</p>
                </div>
            </div>
        );
    }
}

export default TrabajoTarjeta;