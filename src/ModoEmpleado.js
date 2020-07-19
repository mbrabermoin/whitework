import React from 'react';
import EventoTarjeta from "./components/EventoTarjeta";
import { auth } from "./firebase";
import db from './index';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});
export default class ModoEmpleado extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      estadoDeEvento: "pendiente",
      usuario: null,
      eventos: [],
      openCortina: true,
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
    this.setState({ openCortina: false });       
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
    setTimeout(() => {
      this.setState({ openCortina: false });
  }, 1000);
  }
  buscarPostulaciones(){
    var post = [];
    var events = [];
    var mailUsuario = this.state.usuario.email;
    db.collection("postulaciones").where("mail_postulante", "==", mailUsuario).get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {         
          post.push(doc.data().id_evento);
        });
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
    db.collection("eventos").get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          const found = post.find(element => element === doc.data().id_evento);
          if (found === doc.data().id_evento) {  
             return events.push({ id: doc.id, data: doc.data() });
          }
        });
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
     setTimeout(() => {
        this.setState({eventos: events })
        this.setState({ openCortina: false });
    }, 1000);
  }
  buscarAsignados(){
    var trab = [];
    var events = [];
    var mailUsuario = this.state.usuario.email;
    db.collection("trabajos").where("mail_trabajador", "==", mailUsuario).get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {         
          trab.push(doc.data().id_evento);
        });
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
    db.collection("eventos").get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          const found = trab.find(element => element === doc.data().id_evento);
          if (found === doc.data().id_evento) {  
             return events.push({ id: doc.id, data: doc.data() });
          }
        });
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
     setTimeout(() => {
        this.setState({eventos: events })
        this.setState({ openCortina: false });
    }, 1000);
  }
  elegirEstadoBusqueda = () => {
    this.setState({eventos: [] })
    document.getElementById("busqueda").style.color = "black";
    document.getElementById("postulaciones").style.color = "#b2bbbd";
    document.getElementById("aceptados").style.color = "#b2bbbd";
    document.getElementById("enproceso").style.color = "#b2bbbd";
    document.getElementById("completados").style.color = "#b2bbbd";
    document.getElementById("puntuados").style.color = "#b2bbbd";
    document.getElementById("temporales-titulo").textContent = "Eventos Temporales - Busqueda";
    this.setState({ estadoDeEvento: "pendiente" });
    this.buscarEventos("pendiente")
  }
  elegirEstadoPendiente = () => {
    this.setState({ openCortina: true });
    this.setState({eventos: [] })
    document.getElementById("busqueda").style.color = "#b2bbbd";
    document.getElementById("postulaciones").style.color = "black";
    document.getElementById("aceptados").style.color = "#b2bbbd";
    document.getElementById("enproceso").style.color = "#b2bbbd";
    document.getElementById("completados").style.color = "#b2bbbd";
    document.getElementById("puntuados").style.color = "#b2bbbd";
    document.getElementById("temporales-titulo").textContent = "Eventos Temporales - Postulaciones";
    this.setState({ estadoDeEvento: "postulaciones" });
    this.buscarPostulaciones()
  }
  elegirEstadoAceptado = () => {
    this.setState({ openCortina: true });
    this.setState({eventos: [] })
    document.getElementById("busqueda").style.color = "#b2bbbd";
    document.getElementById("postulaciones").style.color = "#b2bbbd";
    document.getElementById("aceptados").style.color = "black";
    document.getElementById("enproceso").style.color = "#b2bbbd";
    document.getElementById("completados").style.color = "#b2bbbd";
    document.getElementById("puntuados").style.color = "#b2bbbd";
    document.getElementById("temporales-titulo").textContent = "Eventos Temporales - Aceptados";
    this.setState({ estadoDeEvento: "aceptados" });
    this.buscarAsignados()
  }
  elegirEstadoEnProceso = () => {
    this.setState({ openCortina: true });
    this.setState({eventos: [] })
    document.getElementById("busqueda").style.color = "#b2bbbd";
    document.getElementById("postulaciones").style.color = "#b2bbbd";
    document.getElementById("aceptados").style.color = "#b2bbbd";
    document.getElementById("enproceso").style.color = "black";
    document.getElementById("completados").style.color = "#b2bbbd";
    document.getElementById("puntuados").style.color = "#b2bbbd";
    document.getElementById("temporales-titulo").textContent = "Eventos Temporales - En Proceso";
    this.setState({ estadoDeEvento: "enproceso" });
    this.buscarEventos("enproceso")
  }
  elegirEstadoCompletado = () => {
    this.setState({ openCortina: true });
    this.setState({eventos: [] })
    document.getElementById("busqueda").style.color = "#b2bbbd";
    document.getElementById("postulaciones").style.color = "#b2bbbd";
    document.getElementById("aceptados").style.color = "#b2bbbd";
    document.getElementById("enproceso").style.color = "#b2bbbd";
    document.getElementById("completados").style.color = "black";
    document.getElementById("puntuados").style.color = "#b2bbbd";
    document.getElementById("temporales-titulo").textContent = "Eventos Temporales - Completados";
    this.setState({ estadoDeEvento: "completados" });
    this.buscarEventos("completado")
  }
  elegirEstadoPuntuados = () => {
    this.setState({ openCortina: true });
    this.setState({eventos: [] })
    document.getElementById("busqueda").style.color = "#b2bbbd";
    document.getElementById("postulaciones").style.color = "#b2bbbd";
    document.getElementById("aceptados").style.color = "#b2bbbd";
    document.getElementById("enproceso").style.color = "#b2bbbd";
    document.getElementById("completados").style.color = "#b2bbbd";
    document.getElementById("puntuados").style.color = "black";
    document.getElementById("temporales-titulo").textContent = "Eventos Temporales - Puntuados";
    this.setState({ estadoDeEvento: "enproceso" });
    this.buscarEventos("enproceso")
  }
 
  filtrarBusqueda = () => {
    this.setState({ openCortina: true });
    this.buscarEventos("pendiente")
  }

  render() {
    var filtros = "";
    if (this.state.estadoDeEvento === "pendiente") {
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
      var eventos = this.state.eventos.filter(function(evento) {
        return evento.data.mail_dueño_evento !== mail;
      });  
      if (eventos.length === 0) {
        contenedorEventos = <div className="sinEventos">
          No se han encontrado eventos.
      </div>
      } else {
        contenedorEventos = <div className='library'>
          {eventos.map(evento => (<EventoTarjeta key={evento.id} usuario={this.state.usuario} estado={this.state.estadoDeEvento} eventoid={evento.data.id_evento} titulo={evento.data.titulo} privado="no" mailDueño={evento.data.mail_dueño_evento} nombreDueño={evento.data.nombre_dueño_evento} cantTrabajos={evento.data.cantidadTrabajos} descripcion={evento.data.descripcion} datecomienzo={evento.data.dateComienzo} datefin={evento.data.dateFinaliza} timecomienzo={evento.data.timeComienzo} timefin={evento.data.timeFinaliza} zona={evento.data.zona} direccion={evento.data.direccion} cantPostEvento={evento.data.cantPostulados} cantAsignados={evento.data.cantAsignados} modo="empleado" />
          ))}
        </div>
      }
    }
    return (
      <div>
      <main className='grid'>
        <div className='progress-bar'>
          <span onClick={this.elegirEstadoBusqueda} className="estados" id="busqueda">Busqueda</span>
          <span onClick={this.elegirEstadoPendiente} className="estados" id="postulaciones">Postulaciones</span>
          <span onClick={this.elegirEstadoAceptado} className="estados" id="aceptados">Aceptados</span>
          <span onClick={this.elegirEstadoEnProceso} className="estados" id="enproceso">En Proceso</span>
          <span onClick={this.elegirEstadoCompletado} className="estados" id="completados">Completados</span>
          <span onClick={this.elegirEstadoPuntuados} className="estados" id="puntuados">Puntuados</span>
        </div>
        <div className='track'>
          <div className='top'>
            <p id="temporales-titulo" className='ux'>Eventos Temporales - Busqueda</p>
          </div>
          {filtros}
          {contenedorEventos}
        </div>
      </main>
      <Dialog
      open={this.state.openCortina}
      TransitionComponent={Transition}
      aria-labelledby="form-dialog-title"
  >  
  </Dialog>
  </div>
    );
  }
}
