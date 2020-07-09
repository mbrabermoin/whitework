import React from 'react';
import EventoTarjeta from "./components/EventoTarjeta";
import { auth } from "./firebase";
import db from './index';

class ModoEmpleado extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      estadoDeEvento: "busqueda",
      usuario: null,
      eventos: [],
    }
  }
  componentDidMount() {
    var user = auth.currentUser;
    var docRef = db.collection("usuarios").doc(user.email);
    let component = this;
    docRef.get().then(function (doc) {
      if (doc.exists) {
        console.log("Document data:", doc.data());
        component.setState({ usuario: doc.data() });
      } else {
        alert("Ha ocurrido un error. Actualice la página.");
      }
    }).catch(function (error) {
      console.log(error);
      alert("Ha ocurrido un error. Actualice la página.");
    });
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
    document.getElementById("busqueda").style.color = "#b2bbbd";
    document.getElementById("postulaciones").style.color = "black";
    document.getElementById("enproceso").style.color = "#b2bbbd";
    document.getElementById("completados").style.color = "#b2bbbd";
    document.getElementById("temporales-titulo").textContent = "Eventos Temporales - Postulaciones";
    this.setState({ estadoDeEvento: "postulaciones" });
    this.buscarEventos("postulaciones")
  }
  elegirEstadoEnProceso = () => {
    document.getElementById("busqueda").style.color = "#b2bbbd";
    document.getElementById("postulaciones").style.color = "#b2bbbd";
    document.getElementById("enproceso").style.color = "black";
    document.getElementById("completados").style.color = "#b2bbbd";
    document.getElementById("temporales-titulo").textContent = "Eventos Temporales - En Proceso";
    this.setState({ estadoDeEvento: "enproceso" });
    this.buscarEventos("enproceso")
  }
  elegirEstadoCompletado = () => {
    document.getElementById("busqueda").style.color = "#b2bbbd";
    document.getElementById("postulaciones").style.color = "#b2bbbd";
    document.getElementById("enproceso").style.color = "#b2bbbd";
    document.getElementById("completados").style.color = "black";
    document.getElementById("temporales-titulo").textContent = "Eventos Temporales - Completados";
    this.setState({ estadoDeEvento: "completados" });
    this.buscarEventos("completado")
  }
  elegirEstadoBusqueda = () => {
    document.getElementById("busqueda").style.color = "black";
    document.getElementById("postulaciones").style.color = "#b2bbbd";
    document.getElementById("enproceso").style.color = "#b2bbbd";
    document.getElementById("completados").style.color = "#b2bbbd";
    document.getElementById("temporales-titulo").textContent = "Eventos Temporales - Busqueda";
    this.setState({ estadoDeEvento: "busqueda" });
    this.buscarEventos("pendiente")
  }
  filtrarBusqueda = () => {
    this.buscarEventos("pendiente")
  }

  render() {
    var filtros = "";
    if (this.state.estadoDeEvento === "busqueda") {
      filtros = <div className="filters-container">
        <label>Desde: </label>
        <input id="desde" type="date" text="desde" className="filtro-busqueda" />
        <label>Hasta: </label>
        <input id="hasta" type="date" text="hasta" className="filtro-busqueda" />
        <label>Dueño: </label>
        <input id="dueño" type="" text="Dueño" className="filtro-busqueda" />
        <button id="filter_button" onClick={this.filtrarBusqueda} className="filter-button">Filtrar</button>
      </div>
    }
    var mail = "";
    var contenedorEventos = "";
    if (this.state.usuario !== null) {
      mail = this.state.usuario.email;
      var eventos = this.state.eventos.filter(function (evento) {
        return evento.data.mail_dueño_evento !== mail;
      });
      if (eventos.length === 0) {
        contenedorEventos = <div className="sinEventos">
          No se han encontrado eventos.
      </div>
      } else {
        contenedorEventos = <div className='library'>
          {eventos.map(evento => (<EventoTarjeta key={evento.id} usuario={this.state.usuario} eventoid={evento.data.id_evento} titulo={evento.data.titulo} privado="no" mailDueño={evento.data.mail_dueño_evento} nombreDueño={evento.data.nombre_dueño_evento} cantTrabajos={evento.data.cantidadTrabajos} descripcion={evento.data.descripcion} datecomienzo={evento.data.dateComienzo} datefin={evento.data.dateFinaliza} timecomienzo={evento.data.timeComienzo} timefin={evento.data.timeFinaliza} zona={evento.data.zona} direccion={evento.data.direccion} modo="empleado" />
          ))}
        </div>
      }
    }
    return (
      <main className='grid'>
        <div className='progress-bar'>
          <span onClick={this.elegirEstadoBusqueda} className="estados" id="busqueda">Busqueda</span>
          <span onClick={this.elegirEstadoPendiente} className="estados" id="postulaciones">Postulaciones</span>
          <span onClick={this.elegirEstadoEnProceso} className="estados" id="enproceso">En Proceso</span>
          <span onClick={this.elegirEstadoCompletado} className="estados" id="completados">Completados</span>
        </div>
        <div className='track'>
          <div className='top'>
            <p id="temporales-titulo" className='ux'>Eventos Temporales - Busqueda</p>
          </div>
          {filtros}
          {contenedorEventos}
        </div>
      </main>
    );
  }
}

export default ModoEmpleado;