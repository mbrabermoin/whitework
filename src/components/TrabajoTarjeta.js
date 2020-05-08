import React from 'react';
import './TrabajoTarjeta.css';

class TrabajoTarjeta extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modo: "empleado",
            estadoDeEvento: "busqueda",
        }
    }
    render() {
        return (
            <div fullwidth class="card-trabajo">
                <img class="avatar-trabajo" src="https://f1.pngfuel.com/png/1008/352/43/circle-silhouette-user-user-profile-user-interface-login-user-account-avatar-data-png-clip-art.png" alt="person1" />
                <div class="skewed bg-react"></div>

                <div class="content-trabajo">
                    <div className="trabajo-postularse"><h1>Asistente</h1> 
                     <button className='postularse-btn' onClick={this.postularse}>Postularse</button></div>
                    <h3>Las tareas a realizar serian: llevar cajas pesadas(50kgs) desde oficina al camion, llevar las mismas cajas a la nueva oficina a la que nos estamos mudando, y poder acomodar siendo cuidadoso con cada mueble, ya que nuestro lugar es importante que este sano.</h3>
                    <p class="esp text-react">300$ por hora</p>
                </div>
            </div>
        );
    }
}

export default TrabajoTarjeta;