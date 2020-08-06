import React from 'react';
import EventoTarjeta from "./components/EventoTarjeta";
import AgregarEvento from "./components/AgregarEvento";
import db from './index';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

class ModoEmpleador extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eventos: [],
      estadoDeEvento: "pendiente",
      usuario: props.usuario,
      nombreUsuario: props.nombreUsuario,
      openCortina: true,
      //staffcompleto: false,
    }
  }
  componentDidMount() {
    this.buscarEventos("pendiente");
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
  buscarStaffCompletos() {
    var mail = this.state.usuario.email;
    var filtro = db.collection("eventos").where("mail_dueño_evento", "==", mail)
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
  buscarEnProceso() {
    var mail = this.state.usuario.email;
    var filtro = db.collection("eventos").where("mail_dueño_evento", "==", mail)
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
  buscarCompletado() {
    var mail = this.state.usuario.email;
    var filtro = db.collection("eventos").where("mail_dueño_evento", "==", mail)
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
  elegirEstadoPendiente = () => {
    this.setState({ openCortina: true });
    document.getElementById("pendientes-empleador").style.color = "black";
    document.getElementById("postulaciones-empleador").style.color = "#b2bbbd";
    document.getElementById("staff-completo-empleador").style.color = "#b2bbbd";
    document.getElementById("enproceso-empleador").style.color = "#b2bbbd";
    document.getElementById("completados-empleador").style.color = "#b2bbbd";
    document.getElementById("puntuados-empleador").style.color = "#b2bbbd";
    document.getElementById("temporales-titulo").textContent = "Eventos Temporales - Pendientes";
    this.setState({ estadoDeEvento: "pendiente" });
    this.setState({ staffcompleto: false });
    this.buscarEventos("pendiente")
  }
  elegirEstadoPostulaciones = () => {
    this.setState({ openCortina: true });
    document.getElementById("pendientes-empleador").style.color = "#b2bbbd";
    document.getElementById("postulaciones-empleador").style.color = "black";
    document.getElementById("staff-completo-empleador").style.color = "#b2bbbd";
    document.getElementById("enproceso-empleador").style.color = "#b2bbbd";
    document.getElementById("completados-empleador").style.color = "#b2bbbd";
    document.getElementById("puntuados-empleador").style.color = "#b2bbbd";
    document.getElementById("temporales-titulo").textContent = "Eventos Temporales - Postulaciones";
    this.setState({ estadoDeEvento: "postulado" });
    this.setState({ staffcompleto: false });
    this.buscarEventos("postulado")
  }
  elegirEstadoStaffCompleto = () => {
    this.setState({ openCortina: true });
    document.getElementById("pendientes-empleador").style.color = "#b2bbbd";
    document.getElementById("postulaciones-empleador").style.color = "#b2bbbd";
    document.getElementById("staff-completo-empleador").style.color = "black";
    document.getElementById("enproceso-empleador").style.color = "#b2bbbd";
    document.getElementById("completados-empleador").style.color = "#b2bbbd";
    document.getElementById("puntuados-empleador").style.color = "#b2bbbd";
    document.getElementById("temporales-titulo").textContent = "Eventos Temporales - Staff Completo";
    //this.setState({ staffcompleto: true });
    this.setState({ estadoDeEvento: "staffCompleto" });
    this.buscarStaffCompletos()
  }
  elegirEstadoEnProceso = () => {
    this.setState({ openCortina: true });
    document.getElementById("pendientes-empleador").style.color = "#b2bbbd";
    document.getElementById("postulaciones-empleador").style.color = "#b2bbbd";
    document.getElementById("staff-completo-empleador").style.color = "#b2bbbd";
    document.getElementById("enproceso-empleador").style.color = "black";
    document.getElementById("completados-empleador").style.color = "#b2bbbd";
    document.getElementById("puntuados-empleador").style.color = "#b2bbbd";
    document.getElementById("temporales-titulo").textContent = "Eventos Temporales - En Proceso";
    this.setState({ staffcompleto: false });
    this.setState({ estadoDeEvento: "enproceso" });
    this.buscarEnProceso()
  }
  elegirEstadoCompletados = () => {
    this.setState({ openCortina: true });
    document.getElementById("pendientes-empleador").style.color = "#b2bbbd";
    document.getElementById("postulaciones-empleador").style.color = "#b2bbbd";
    document.getElementById("staff-completo-empleador").style.color = "#b2bbbd";
    document.getElementById("enproceso-empleador").style.color = "#b2bbbd";
    document.getElementById("completados-empleador").style.color = "black";
    document.getElementById("puntuados-empleador").style.color = "#b2bbbd";
    document.getElementById("temporales-titulo").textContent = "Eventos Temporales - Completados";
    this.setState({ staffcompleto: false });
    this.setState({ estadoDeEvento: "completado" });
    this.buscarCompletado()
  }
  elegirEstadoPuntuados = () => {
    this.setState({ openCortina: true });
    document.getElementById("pendientes-empleador").style.color = "#b2bbbd";
    document.getElementById("postulaciones-empleador").style.color = "#b2bbbd";
    document.getElementById("staff-completo-empleador").style.color = "#b2bbbd";
    document.getElementById("enproceso-empleador").style.color = "#b2bbbd";
    document.getElementById("completados-empleador").style.color = "#b2bbbd";
    document.getElementById("puntuados-empleador").style.color = "black";
    document.getElementById("temporales-titulo").textContent = "Eventos Temporales - Puntuados";
    this.setState({ estadoDeEvento: "puntuado" });
    this.setState({ staffcompleto: false });
    this.buscarCompletado()
  }

  render() {
    var today = new Date();
    var mes = "";
    if ((today.getMonth() + 1).toString().length === 2) {
      mes = (today.getMonth() + 1)
    } else {
      mes = 0 + "" + (today.getMonth() + 1)
    }
    var dia = "";
    if (today.getDate().toString().length === 2) {
      dia = today.getDate()
    } else {
      dia = 0 + "" + today.getDate()
    }
    var minutos = "";
    if (today.getMinutes().toString().length === 2) {
      minutos = today.getMinutes()
    } else {
      minutos = 0 + "" + today.getMinutes()
    }
    var hora = "";
    if (today.getHours().toString().length === 2) {
      hora = today.getHours()
    } else {
      hora = 0 + "" + today.getHours()
    }
    var date = today.getFullYear() + "" + mes + "" + dia;
    var time = hora + "" + minutos;
    var dateTime = date + time;

    console.log(dateTime)
    var mail = this.state.usuario.email;
    var eventos = "";
    if (this.state.estadoDeEvento === "pendiente") {
      eventos = this.state.eventos.filter(function (evento) {
        return evento.data.mail_dueño_evento === mail && evento.data.cantAsignados < evento.data.cantidadTrabajos && evento.data.dateComienzo.substr(0, 4) + "" + evento.data.dateComienzo.substr(5, 2) + "" + evento.data.dateComienzo.substr(8, 2) + "" + evento.data.timeComienzo.substr(0, 2) + "" + evento.data.timeComienzo.substr(3, 2) > dateTime;
      });
    } else {
      if (this.state.estadoDeEvento === "postulado") {
        eventos = this.state.eventos.filter(function (evento) {
          return evento.data.mail_dueño_evento === mail && evento.data.cantAsignados < evento.data.cantidadTrabajos && evento.data.dateComienzo.substr(0, 4) + "" + evento.data.dateComienzo.substr(5, 2) + "" + evento.data.dateComienzo.substr(8, 2) + "" + evento.data.timeComienzo.substr(0, 2) + "" + evento.data.timeComienzo.substr(3, 2) > dateTime;
        });
      } else {
        if (this.state.estadoDeEvento === "staffCompleto") {
          eventos = this.state.eventos.filter(function (evento) {
            return evento.data.mail_dueño_evento === mail && evento.data.cantAsignados === evento.data.cantidadTrabajos && evento.data.dateComienzo.substr(0, 4) + "" + evento.data.dateComienzo.substr(5, 2) + "" + evento.data.dateComienzo.substr(8, 2) + "" + evento.data.timeComienzo.substr(0, 2) + "" + evento.data.timeComienzo.substr(3, 2) > dateTime;
          });
        } else {
          if (this.state.estadoDeEvento === "enproceso") {
            eventos = this.state.eventos.filter(function (evento) {
              return evento.data.dateComienzo.substr(0, 4) + "" + evento.data.dateComienzo.substr(5, 2) + "" + evento.data.dateComienzo.substr(8, 2) + "" + evento.data.timeComienzo.substr(0, 2) + "" + evento.data.timeComienzo.substr(3, 2) < dateTime &&
                evento.data.dateFinaliza.substr(0, 4) + "" + evento.data.dateFinaliza.substr(5, 2) + "" + evento.data.dateFinaliza.substr(8, 2) + "" + evento.data.timeFinaliza.substr(0, 2) + "" + evento.data.timeFinaliza.substr(3, 2) > dateTime;
            });
          } else {
            if (this.state.estadoDeEvento === "completado") {
              eventos = this.state.eventos.filter(function (evento) {
                return evento.data.mail_dueño_evento === mail && evento.data.cantAsignados > evento.data.cantPuntuados && evento.data.dateFinaliza.substr(0, 4) + "" + evento.data.dateFinaliza.substr(5, 2) + "" + evento.data.dateFinaliza.substr(8, 2) + "" + evento.data.timeFinaliza.substr(0, 2) + "" + evento.data.timeFinaliza.substr(3, 2) < dateTime;
              });
            } else {
              if (this.state.estadoDeEvento === "puntuado") {
                eventos = this.state.eventos.filter(function (evento) {
                  return evento.data.mail_dueño_evento === mail && evento.data.cantAsignados === evento.data.cantPuntuados && evento.data.dateFinaliza.substr(0, 4) + "" + evento.data.dateFinaliza.substr(5, 2) + "" + evento.data.dateFinaliza.substr(8, 2) + "" + evento.data.timeFinaliza.substr(0, 2) + "" + evento.data.timeFinaliza.substr(3, 2) < dateTime;
                });
              }
            }
          }
        }
      }
    }
    var contenedorEventos = "";
    console.log(eventos)
    if (eventos.length === 0) {
      contenedorEventos = <div className="sinEventos">
        No se han encontrado eventos.
    </div>
    } else {
      contenedorEventos = <div className='library'>
        {eventos.map(evento => (<EventoTarjeta key={evento.id} usuario={this.state.usuario} estado={this.state.estadoDeEvento} eventoid={evento.data.id_evento} titulo={evento.data.titulo} privado="no" mailDueño={evento.data.mail_dueño_evento} nombreDueño={evento.data.nombre_dueño_evento} cantTrabajos={evento.data.cantidadTrabajos} descripcion={evento.data.descripcion} datecomienzo={evento.data.dateComienzo} datefin={evento.data.dateFinaliza} timecomienzo={evento.data.timeComienzo} timefin={evento.data.timeFinaliza} provincia={evento.data.provincia} ciudad={evento.data.ciudad} direccion={evento.data.direccion} cantPostEvento={evento.data.cantPostulados} cantPuntEvento={evento.data.cantPuntuados} cantAsignados={evento.data.cantAsignados} modo="empleador" />
        ))}
      </div>
    }
    return (
      <div>
        <main className='grid'>
          <div className='progress-bar'>
            <span onClick={this.elegirEstadoPendiente} id="pendientes-empleador">Pendientes</span>
            <span onClick={this.elegirEstadoPostulaciones} id="postulaciones-empleador">Postulaciones</span>
            <span onClick={this.elegirEstadoStaffCompleto} id="staff-completo-empleador">Staff Completo</span>
            <span onClick={this.elegirEstadoEnProceso} id="enproceso-empleador">En Proceso</span>
            <span onClick={this.elegirEstadoCompletados} id="completados-empleador">Completados</span>
            <span onClick={this.elegirEstadoPuntuados} id="puntuados-empleador">Puntuados</span>
            <div className="push-right"><AgregarEvento usuario={this.state.usuario} /></div>
          </div>
          <div className='track'>
            <div className='top'>
              <p id="temporales-titulo" className='ux'>Eventos Temporales - Pendientes</p>
            </div>
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

export default ModoEmpleador;