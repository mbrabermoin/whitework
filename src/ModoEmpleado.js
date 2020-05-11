import React from 'react';
import EventoTarjeta from "./components/EventoTarjeta";
import AgregarEvento from "./components/AgregarEvento";
import db from './index';

class ModoEmpleado extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modo: "empleado",
      estadoDeEvento: "busqueda",
      usuario: props.usuario,
      eventos: [],
    }
  }
  buscarEventos(estado) {
    var filtro = db.collection("eventos").where("estado", "==", estado)
    filtro.onSnapshot((snapShots) => {
      this.setState({
        eventos: snapShots.docs.map(doc => {
          return { id: doc.id, data: doc.data() }
        })
      })
    }, error => {
      console.log(error)
    });
  }

  elegirEstadoPendiente = () => {
    if (this.state.modo === "empleado") {
      document.getElementById("busqueda").style.color = "#b2bbbd";
    }
    document.getElementById("pendientes").style.color = "black";
    document.getElementById("enproceso").style.color = "#b2bbbd";
    document.getElementById("completados").style.color = "#b2bbbd";
    this.setState({ estadoDeEvento: "pendientes" });
    this.buscarEventos("pendiente")
  }
  elegirEstadoEnProceso = () => {
    if (this.state.modo === "empleado") {
      document.getElementById("busqueda").style.color = "#b2bbbd";
    }
    document.getElementById("pendientes").style.color = "#b2bbbd";
    document.getElementById("enproceso").style.color = "black";
    document.getElementById("completados").style.color = "#b2bbbd";
    this.setState({ estadoDeEvento: "enproceso" });
    this.buscarEventos("enproceso")
  }
  elegirEstadoCompletado = () => {
    if (this.state.modo === "empleado") {
      document.getElementById("busqueda").style.color = "#b2bbbd";
    }
    document.getElementById("pendientes").style.color = "#b2bbbd";
    document.getElementById("enproceso").style.color = "#b2bbbd";
    document.getElementById("completados").style.color = "black";
    this.setState({ estadoDeEvento: "completados" });
    this.buscarEventos("completado")
  }
  elegirEstadoBusqueda = () => {
    document.getElementById("busqueda").style.color = "black";
    document.getElementById("pendientes").style.color = "#b2bbbd";
    document.getElementById("enproceso").style.color = "#b2bbbd";
    document.getElementById("completados").style.color = "#b2bbbd";
    this.setState({ estadoDeEvento: "busqueda" });
    this.buscarEventos("busqueda")
  }

  render() {
    var mail = "this.state.usuario.email";    
    var eventos = this.state.eventos.filter(function(evento) {
      return evento.data.dueño !== mail;
    });
    var contenedorEventos = "";
    if (eventos.length === 0) {
      contenedorEventos = <div className="sinEventos">
        No se han encontrado eventos.
    </div>
    } else {
      contenedorEventos = <div className='library'>
         {eventos.map(evento => (<EventoTarjeta key={evento.id} titulo={evento.data.nombre} zona="Quilmes" privado="no" mailDueño="mail@mail.com.ar" telefonoDueño="15 4566 3456" tipoDueño="particular" tipo="dia" dueñoEvento="Miguel Suarez" tiempo={evento.data.duracion} cantTrabajos="2" descripcion="Me estoy mudando estoy necesitando gente que me ayude con las cajas..." fechaEvento={evento.data.fecha}/>
          ))}
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
          {contenedorEventos}
        </div>
      </main>
    );
  }
}

export default ModoEmpleado;