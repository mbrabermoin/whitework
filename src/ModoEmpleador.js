import React from 'react';
import EventoTarjeta from "./components/EventoTarjeta";
import AgregarEvento from "./components/AgregarEvento";
import db from './index';

class ModoEmpleador extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eventos: [],
      estadoDeEvento: "pendiente",
      usuario: props.usuario,
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
      document.getElementById("pendientes-empleador").style.color = "black";
      document.getElementById("enproceso-empleador").style.color = "#b2bbbd";
      document.getElementById("completados-empleador").style.color = "#b2bbbd";
      document.getElementById("temporales-titulo").textContent = "Eventos Temporales - Pendientes";
      this.setState({ estadoDeEvento: "pendiente" });      
      this.buscarEventos("pendiente")
    }
    elegirEstadoEnProceso = () => {
      document.getElementById("pendientes-empleador").style.color = "#b2bbbd";
      document.getElementById("enproceso-empleador").style.color = "black";
      document.getElementById("completados-empleador").style.color = "#b2bbbd";
      document.getElementById("temporales-titulo").textContent = "Eventos Temporales - En Proceso";
      this.setState({ estadoDeEvento: "enproceso" });
      this.buscarEventos("enproceso")
    }
    elegirEstadoCompletado = () => {
      document.getElementById("pendientes-empleador").style.color = "#b2bbbd";
      document.getElementById("enproceso-empleador").style.color = "#b2bbbd";
      document.getElementById("completados-empleador").style.color = "black";
      document.getElementById("temporales-titulo").textContent = "Eventos Temporales - Completados";
      this.setState({ estadoDeEvento: "completado" });
      this.buscarEventos("completado")
    }
    render() {
      var mail = this.state.usuario.email;
      var eventos = this.state.eventos.filter(function(evento) {
        return evento.data.mail_dueño_evento === mail;
      });     
      var contenedorEventos = "";
      if (eventos.length === 0) {
        contenedorEventos = <div className="sinEventos">
          No se han encontrado eventos.
    </div>
      } else {
        contenedorEventos = <div className='library'>
          {eventos.map(evento => (<EventoTarjeta key={evento.id} titulo={evento.data.titulo} zona={evento.data.zona} privado="no" mailDueño={evento.data.mail_dueño_evento} dueñoEvento="Miguel Suarez" tiempo={evento.data.duracion} cantTrabajos={evento.data.cantidadTrabajos} descripcion={evento.data.descripcion} fechaEvento={evento.data.fecha}/>
          ))}
        </div>
      }
      return (
        <main className='grid'>
          <div className='progress-bar'>
            <span onClick={this.elegirEstadoPendiente} id="pendientes-empleador">Pendientes</span>
            <span onClick={this.elegirEstadoEnProceso} id="enproceso-empleador">En Proceso</span>
            <span onClick={this.elegirEstadoCompletado} id="completados-empleador">Completado</span>
            <div className="push-right"><AgregarEvento usuario={this.state.usuario}/></div>
          </div>
          <div className='track'>
            <div className='top'>
              <p id="temporales-titulo" className='ux'>Eventos Temporales - Pendientes</p>
            </div>
            {contenedorEventos}
          </div>
        </main>
      );
    }
  }

  export default ModoEmpleador;