import React from 'react';
import EventoTarjeta from "./components/EventoTarjeta";
import AgregarEvento from "./components/AgregarEvento";


class ModoEmpleador extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      estadoDeEvento: "pendientes",
    }
  }
  elegirEstadoPendiente = () => {
    document.getElementById("pendientes-empleador").style.color = "black";
    document.getElementById("enproceso-empleador").style.color = "#b2bbbd";
    document.getElementById("completados-empleador").style.color = "#b2bbbd";
    document.getElementById("temporales-titulo").textContent = "Eventos Temporales - Pendientes";
    this.setState({ estadoDeEvento: "pendientes" });
  }
  elegirEstadoEnProceso = () => {
    document.getElementById("pendientes-empleador").style.color = "#b2bbbd";
    document.getElementById("enproceso-empleador").style.color = "black";
    document.getElementById("completados-empleador").style.color = "#b2bbbd";
    document.getElementById("temporales-titulo").textContent = "Eventos Temporales - En Progreso";
    this.setState({ estadoDeEvento: "enproceso" });
  }
  elegirEstadoCompletado = () => {
    document.getElementById("pendientes-empleador").style.color = "#b2bbbd";
    document.getElementById("enproceso-empleador").style.color = "#b2bbbd";
    document.getElementById("completados-empleador").style.color = "black";
    document.getElementById("temporales-titulo").textContent = "Eventos Temporales - Completados";
    this.setState({ estadoDeEvento: "completados" });
  }
  render() {
    var eventos = "";
    if (this.state.estadoDeEvento === "completados") {
      eventos = <div className="sinEventos">
        No se han encontrado eventos.
    </div>
    } else {
      eventos = <div className='library'>
        <EventoTarjeta titulo="Mudanza Simple" zona="Quilmes" privado="no" mailDueño="mail@mail.com.ar" telefonoDueño="15 4566 3456" tipoDueño="particular" tipo="dia" dueñoEvento="Miguel Suarez" tiempo="3 horas" cantTrabajos="2" descripcion="Me estoy mudando estoy necesitando gente que me ayude con las cajas..." />
        <EventoTarjeta titulo="Mudanza Complicada" zona="Burzaco" privado="no" tipo="semana" mailDueño="mail@mail.com.ar" telefonoDueño="15 4566 3456" tipoDueño="particular" dueñoEvento="Miguel Suarez" tiempo="4 dias" cantTrabajos="1" descripcion="Mudando mi empresa se nos complica..." />
        <EventoTarjeta titulo="Mudanza Simple" zona="Quilmes" privado="no" tipo="dia" tiempo="3 horas" mailDueño="mail@mail.com.ar" telefonoDueño="15 4566 3456" tipoDueño="particular" dueñoEvento="Miguel Suarez" cantTrabajos="3" descripcion="Me estoy mudando estoy necesitando gente que me ayude con las cajas..." />
        <EventoTarjeta titulo="Mudanza Complicada" zona="Burzaco" privado="no" tipo="semana" mailDueño="mail@mail.com.ar" telefonoDueño="15 4566 3456" tipoDueño="particular" dueñoEvento="Miguel Suarez" tiempo="4 dias" cantTrabajos="2" descripcion="Mudando mi empresa se nos complica..." />
      </div>
    }
    return (
      <main className='grid'>
        <div className='progress-bar'>
          <span onClick={this.elegirEstadoPendiente} id="pendientes-empleador">Pendientes</span>
          <span onClick={this.elegirEstadoEnProceso} id="enproceso-empleador">En Proceso</span>
          <span onClick={this.elegirEstadoCompletado} id="completados-empleador">Completado</span>
          <div className="push-right"><AgregarEvento/></div>
        </div>
        <div className='track'>
          <div className='top'>
            <p id="temporales-titulo" className='ux'>Eventos Temporales - Pendientes</p>
          </div>
          {eventos}
        </div>
      </main>
    );
  }
}

export default ModoEmpleador;