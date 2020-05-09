import React from 'react';
import EventoTarjeta from "./components/EventoTarjeta";
import AgregarEvento from "./components/AgregarEvento";


class ModoEmpleado extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modo: "empleado",
      estadoDeEvento: "busqueda",
    }
  }
  elegirEstadoPendiente = () => {
    if (this.state.modo === "empleado") {
      document.getElementById("busqueda").style.color = "#b2bbbd";
    }
    document.getElementById("pendientes").style.color = "black";
    document.getElementById("enproceso").style.color = "#b2bbbd";
    document.getElementById("completados").style.color = "#b2bbbd";
    this.setState({ estadoDeEvento: "pendientes" });
  }
  elegirEstadoEnProceso = () => {
    if (this.state.modo === "empleado") {
      document.getElementById("busqueda").style.color = "#b2bbbd";
    }
    document.getElementById("pendientes").style.color = "#b2bbbd";
    document.getElementById("enproceso").style.color = "black";
    document.getElementById("completados").style.color = "#b2bbbd";
    this.setState({ estadoDeEvento: "enproceso" });
  }
  elegirEstadoCompletado = () => {
    if (this.state.modo === "empleado") {
      document.getElementById("busqueda").style.color = "#b2bbbd";
    }
    document.getElementById("pendientes").style.color = "#b2bbbd";
    document.getElementById("enproceso").style.color = "#b2bbbd";
    document.getElementById("completados").style.color = "black";
    this.setState({ estadoDeEvento: "completados" });
  }
  elegirEstadoBusqueda = () => {
    document.getElementById("busqueda").style.color = "black";
    document.getElementById("pendientes").style.color = "#b2bbbd";
    document.getElementById("enproceso").style.color = "#b2bbbd";
    document.getElementById("completados").style.color = "#b2bbbd";
    this.setState({ estadoDeEvento: "busqueda" });
  }

  render() {
    var eventos = "";
    if (this.state.estadoDeEvento === "completados") {
      eventos = <div className="sinEventos">
        No se han encontrado eventos.
    </div>
    } else {
      eventos = <div className='library'>
        <EventoTarjeta titulo="Mudanza Simple" zona="Quilmes" tipo="dia" privado="yes" tipoDueño="empresa" mailDueño="mail@mail.com.ar" telefonoDueño="15 4566 3456" dueñoEvento="Carlos Rodriguez" tiempo="3 horas" cantTrabajos="2" descripcion="Me estoy mudando estoy necesitando gente que me ayude con las cajas..." />
        <EventoTarjeta titulo="Mudanza Complicada" zona="Burzaco" tipo="semana" privado="yes" tipoDueño="empresa" mailDueño="mail@mail.com.ar" telefonoDueño="15 4566 3456" dueñoEvento="Miguel Suarez" tiempo="4 dias" cantTrabajos="1" descripcion="Mudando mi empresa se nos complica..." />
        <EventoTarjeta titulo="Mudanza Simple" zona="Quilmes" tipo="dia" tiempo="3 horas" tipoDueño="empresa" privado="yes" mailDueño="mail@mail.com.ar" telefonoDueño="15 4566 3456" dueñoEvento="Carlos Perez" cantTrabajos="3" descripcion="Me estoy mudando estoy necesitando gente que me ayude con las cajas..." />
        <EventoTarjeta titulo="Mudanza Complicada" zona="Burzaco" tipo="semana" tipoDueño="empresa" tiempo="4 dias" privado="yes" mailDueño="mail@mail.com.ar" telefonoDueño="15 4566 3456" dueñoEvento="Carlos Rodriguez" cantTrabajos="2" descripcion="Mudando mi empresa se nos complica..." />
      </div>
    }
    if (this.state.modo === "empleado") {
      var busqueda = <span onClick={this.elegirEstadoBusqueda} className="estados" id="busqueda">Busqueda</span>
    } else {
      var botonAgregarEvento = <div className="push-right"><AgregarEvento /></div>
    }
    return (
      <main className='grid'>
        <div className='progress-bar'>
          {busqueda}
          <span onClick={this.elegirEstadoPendiente} className="estados" id="pendientes">Pendientes</span>
          <span onClick={this.elegirEstadoEnProceso} className="estados" id="enproceso">En Proceso</span>
          <span onClick={this.elegirEstadoCompletado} className="estados" id="completados">Completados</span>
          {botonAgregarEvento}
        </div>
        <div className='track'>
          <div className='top'>
            <p className='ux'>Eventos Temporales</p>
          </div>
          {eventos}
        </div>
      </main>
    );
  }
}

export default ModoEmpleado;