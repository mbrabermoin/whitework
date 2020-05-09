import React from 'react';
import EventoTarjeta from "./components/EventoTarjeta";
import AgregarEvento from "./components/AgregarEvento";
import db from './index';

class ModoEmpleador extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eventos: [],
      estadoDeEvento: "pendientes",
    }
  }
  buscarEventos() {
    var filtro = db.collection("eventos")
    filtro.onSnapshot((snapShots) => {
      this.setState({
        eventos: snapShots.docs.map(doc => {
          console.log(doc.data())
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
      this.setState({ estadoDeEvento: "pendientes" });
      this.buscarEventos()
    }
    elegirEstadoEnProceso = () => {
      document.getElementById("pendientes-empleador").style.color = "#b2bbbd";
      document.getElementById("enproceso-empleador").style.color = "black";
      document.getElementById("completados-empleador").style.color = "#b2bbbd";
      document.getElementById("temporales-titulo").textContent = "Eventos Temporales - En Progreso";
      this.setState({ estadoDeEvento: "enproceso" });
      this.buscarEventos()
    }
    elegirEstadoCompletado = () => {
      document.getElementById("pendientes-empleador").style.color = "#b2bbbd";
      document.getElementById("enproceso-empleador").style.color = "#b2bbbd";
      document.getElementById("completados-empleador").style.color = "black";
      document.getElementById("temporales-titulo").textContent = "Eventos Temporales - Completados";
      this.setState({ estadoDeEvento: "completados" });
      this.buscarEventos()
    }
    render() {
      const eventos = this.state.eventos;
      var cotenedorEventos = "";
      if (this.state.estadoDeEvento === "completados") {
        cotenedorEventos = <div className="sinEventos">
          No se han encontrado eventos.
    </div>
      } else {
        cotenedorEventos = <div className='library'>
          {eventos.map(evento => (<EventoTarjeta titulo={evento.data.nombre} zona="Quilmes" privado="no" mailDueño="mail@mail.com.ar" telefonoDueño="15 4566 3456" tipoDueño="particular" tipo="dia" dueñoEvento="Miguel Suarez" tiempo={evento.data.duracion} cantTrabajos="2" descripcion="Me estoy mudando estoy necesitando gente que me ayude con las cajas..." fechaEvento={evento.data.fecha}/>
          ))}
        </div>
      }
      return (
        <main className='grid'>
          <div className='progress-bar'>
            <span onClick={this.elegirEstadoPendiente} id="pendientes-empleador">Pendientes</span>
            <span onClick={this.elegirEstadoEnProceso} id="enproceso-empleador">En Proceso</span>
            <span onClick={this.elegirEstadoCompletado} id="completados-empleador">Completado</span>
            <div className="push-right"><AgregarEvento /></div>
          </div>
          <div className='track'>
            <div className='top'>
              <p id="temporales-titulo" className='ux'>Eventos Temporales - Pendientes</p>
            </div>
            {cotenedorEventos}
          </div>
        </main>
      );
    }
  }

  export default ModoEmpleador;